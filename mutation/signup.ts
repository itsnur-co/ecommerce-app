import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation RegisterUser2($name: String!, $username: String!, $email: String!, $password: String!) {
    registerUserWithFullDetails(input: {
    name: $name,
    username: $username,
      email: $email,
      password: $password
    }) {
      user {
        id
        email
      }
    }
  }
`;



