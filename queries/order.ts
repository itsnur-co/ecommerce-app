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

export const GET_MY_ORDERS = gql`
  query GetMyOrders($first: Int = 10) {
    customer {
      orders(first: $first) {
        nodes {
          id
          orderNumber
          date
          status
          total
          lineItems {
            nodes {
              product {
                node {
                  name
                  image {
                    sourceUrl
                  }
                }
              }
              quantity
              total
            }
          }
        }
      }
    }
  }
`;
