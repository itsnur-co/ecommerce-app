import { gql } from "@apollo/client";

export const GET_FEATURED_PRODUCTS= gql`
query GetFeaturedProducts {
  products(first: 20, where: {featured: true}) {
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