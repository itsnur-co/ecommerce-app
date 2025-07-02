import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
 mutation ADD_TO_CART($input: AddToCartInput!) {
      addToCart(input: $input) {
        cartItem {
          key
          product {
            node {
              id
              productId: databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                altText
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  altText
                }
              }
            }
          }
          variation {
            node {
              id
              variationId: databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                altText
              }
            }
            attributes {
              id
              attributeId
              name
              value
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
    }
		
`;


export const REMOVE_ITEM_FROM_CART = gql`
  mutation REMOVE_ITEM_FROM_CART($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        contents {
          itemCount
        }
      }
    }
  }
`;

export const UPDATE_QUANTITY_FROM_CART=gql`

mutation UpdateCartItem($input: UpdateItemQuantitiesInput!) {
  updateItemQuantities(input: $input) {
    cart {
      contents {
        nodes {
          key
          quantity
          product {
            node {
              name
              id
            }
          }
        }
      }
    }
  }
}
`