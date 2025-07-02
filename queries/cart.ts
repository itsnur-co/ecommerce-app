import { gql } from "@apollo/client";

export const GET_CART_PRODUCTS= gql`
query GET_CART {
  cart {
    contents {
      itemCount
      nodes {
        key
        quantity
        subtotal
        total
        product {
          node {
            id
            databaseId
            name
            slug
           averageRating
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
            }
            ... on VariableProduct {
              price
            }
          }
        }
        variation {
          node {
            id
            name
            price
            image {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    subtotal
    total
  }
}

`