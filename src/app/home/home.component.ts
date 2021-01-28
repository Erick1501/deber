import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { MessageModel } from '../models/message.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  GET_MESSAGES,
  ADD_MESSAGE,
  DELETE_MESSAGE,
} from '../services/message.graphql';
import { Response } from '../models/responseMessage.model';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  messages: Observable<MessageModel[]> | undefined;
  form: FormGroup;
  message: MessageModel;
  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });

    this.message = {};
  }

  ngOnInit(): void {
    this.sync();
  }
  sync(): void {
    this.messages = this.apollo
      .watchQuery<Response>({
        query: GET_MESSAGES,
      })
      .valueChanges.pipe(map((result) => result.data.getMessages));
  }

  createMessage(): void {
    this.apollo
      .mutate({
        mutation: ADD_MESSAGE,
        variables: this.message,
      })
      .subscribe(({ data }) => {
        console.log(data);
      }),
      () => alert('los datos enviados no son los correctos');
  }
  deleteMessage(idMessage: String): void {
    const dataSend = { id: idMessage };
    this.apollo
      .mutate({
        mutation: DELETE_MESSAGE,
        variables: dataSend,
      })
      .subscribe(
        ({ data }) => {
          this.sync();
        },
        (error) => console.log(JSON.stringify(error))
      );
  }
}
