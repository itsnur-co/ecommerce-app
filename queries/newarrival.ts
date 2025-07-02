import { gql } from "@apollo/client";

export const GET_NEW_ARRIVAL_PRODUCTS= gql`
query GetNewArrivalProducts {
  products(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      id
      name
      slug
      image {
        sourceUrl
        altText
      }
      averageRating
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
  }
}`