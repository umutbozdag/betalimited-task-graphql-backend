import { gql } from "graphql-tag";

export const typeDefs = gql`
  type ProductItem {
    id: ID!
    name: String!
    price: Float!
    originalPrice: Float!
    rating: Float!
    image: String!
    discount: String!
  }

  type CartItem {
    productId: ID!
    quantity: Int!
    name: String!
    price: Float!
  }

  type Session {
    sessionId: String!
  }

  type Query {
    products: [ProductItem]
    search(query: String!): [ProductItem]
    cartItems: [CartItem]
    session: Session
  }

  type Mutation {
    addToCart(productId: ID!): Boolean!
    subtractFromCart(productId: ID!): Boolean!
  }
`;
