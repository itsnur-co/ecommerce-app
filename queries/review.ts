import { gql } from "@apollo/client";

export const GET_REVIEWS= gql`
query review($id: ID!) {
  product(id: $id) {
   name
    reviews {
      averageRating
      edges {
        node {
          author {
            name
            email
          }
          content
					date
        }
        rating
      }
    }
    description
    shortDescription
  }
}`