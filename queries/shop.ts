import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORY = gql`
query GetHierarchicalCategories {
  productCategories(first: 100, where: {hideEmpty: true, parent: null}) {
    nodes {
      id
      name
      slug
      count
      children {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  }
}
`;

export const GET_FILTERED_PRODUCTS = gql`
query GetFilteredProducts(
  $categorySlugs: [String!]
  $minPrice: Float
  $maxPrice: Float
  $first: Int = 20
  $after: String
) {
  products(
    where: {
      categoryIn: $categorySlugs
      minPrice: $minPrice
      maxPrice: $maxPrice
    }
    first: $first
    after: $after
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      name
      slug
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
      averageRating
    }
  }
}

`;