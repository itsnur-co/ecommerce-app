import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query AllProducts {
  products(first: 100) {
    nodes {
      id
      slug
      name
      averageRating
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
    }
  }
}

`;

export const GET_PRODUCT_BY_SLUG = gql`
query ProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    id
    slug
    name
    description
    shortDescription

    ... on SimpleProduct {
      price
      regularPrice
    }

    ... on VariableProduct {
      price
      regularPrice

      variations(first: 100) {
        nodes {
          id
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
    }

    image {
      sourceUrl
      altText
    }

    galleryImages {
      nodes {
        sourceUrl
        altText
      }
    }

    attributes {
      nodes {
        name
        options
      }
    }

    reviews {
      nodes {
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        content
      }
    }
  }
}

`;
