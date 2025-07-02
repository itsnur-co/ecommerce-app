import { gql } from "@apollo/client";

export const ADD_TO_WISHLIST = gql`
mutation AddToWishlist($productId: ID!) {
  addProductToWishlist(input: { productId: $productId }) {
    success
  }
}`


export const REMOVE_PRODUCT_FROM_WISHLIST = gql`
mutation RemoveFromWishlist($productId: ID!) {
  removeProductFromWishlist(input: { productId: $productId }) {
    success
  }
}`