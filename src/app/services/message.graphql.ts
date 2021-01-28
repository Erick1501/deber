import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  {
    getMessages {
      _id
      name
      email
      age
      address
      phone
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation AddMessage($name: String!, $email: String!, $age: String!,$address: String!,$phone: String!) {
    createMessage(name: $name, email: $email, age: $age, address: $address, phone: $phone) {
      _id
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: String!) {
    deleteMessage(id: $id) {
      _id
    }
  }
`;
