import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
   login( input: {
      username: $username,           
      password: $password         
    } ) {
      authToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;



