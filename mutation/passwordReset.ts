import { gql } from "@apollo/client";

export const SEND_RESET_CODE = gql`
  mutation RequestPasswordResetCode($input: SendPasswordResetCodeInput!) {
    sendPasswordResetCode(input: $input) {
      success
      message
    }
  }
`;

export const VERIFY_RESET_CODE = gql`
  mutation VerifyPasswordResetCode($input: VerifyResetCodeInput!) {
    verifyResetCode(input: $input) {
      verified
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation CustomResetUserPassword($input: CustomResetUserPasswordInput!) {
    customResetUserPassword(input: $input) {
      changed
      message
    }
  }
`;
