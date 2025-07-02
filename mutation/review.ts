import { gql} from "@apollo/client";

export const ADD_REVIEW = gql`
 mutation AddProductReview($productId: ID!,$rating: Int!,$content: String!,$name: String!,$email: String!,) {
  addProductReview(input: {
    productId: $productId,
    rating: $rating,
    content: $content,
    name: $name,
    email: $email
  }) {
    success
    commentId
  }
}
`;
