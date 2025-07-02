import { gql } from "@apollo/client";

export const GET_WISHLIST_PRODUCTS= gql`
query wishlistPro{
  wishlistProducts {
    id
    name
    image {
      sourceUrl
    }
    ... on SimpleProduct {
    price
    regularPrice
    salePrice
    }

  }
}`