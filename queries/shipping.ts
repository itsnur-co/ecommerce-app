import { gql } from "@apollo/client";

export const GET_SHIPPING_METHODS= gql`
query shippingMethods{
  publicShippingMethods {
    id
    method_id
    label
    cost
  }
}`

export const UPDATED_SHIPPING_METHODS= gql`
mutation UpdateShipping($shippingMethods: [String]!) {
  updateShippingMethod(input: {
    shippingMethods: $shippingMethods
  }) {
    cart {
      chosenShippingMethods
      shippingTotal
      total
    }
  }
}`