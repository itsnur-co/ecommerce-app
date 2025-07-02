import { gql } from "@apollo/client";

export const GET_PUBLIC_ORDER = gql`
  query GetPublicOrder($orderKey: String!) {
    publicOrderSummary(orderKey: $orderKey) {
      products {
        name
        quantity
        total
      }
      shippingMethod
      paymentMethod
      shippingTotal
      total
    }
  }
`;