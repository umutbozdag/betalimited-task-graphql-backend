import { Resolvers, CartItem } from "../types";

const resolvers: Resolvers = {
  Query: {
    products: async (_, __, { dataSources }) =>
      await dataSources.restAPI.getProducts(),
    search: async (_, { query }, { dataSources, request }) => {
      const sessionId = request?.headers["session-id"] || null;

      if (!sessionId) {
        throw new Error("Session ID not provided");
      }
      console.log("query", query);
      return await dataSources.restAPI.searchProduct(query, sessionId);
    },
    cartItems: async (_, __, { dataSources, request }) => {
      const sessionId = request?.headers["session-id"] || null;

      if (!sessionId) {
        throw new Error("Session ID not provided");
      }

      return await dataSources.restAPI.getCartItems(sessionId);
    },
    session: async (_, __, { dataSources }) => {
      const { sessionId } = await dataSources.restAPI.createSession();
      return { sessionId };
    },
  },
  Mutation: {
    addToCart: async (
      _,
      { productId }: Pick<CartItem, "productId">,
      { dataSources, request }
    ) => {
      const sessionId = request?.headers["session-id"] || null;

      if (!sessionId) {
        throw new Error("Session ID not provided");
      }
      const addToCartResponse = await dataSources.restAPI.addToCart(
        productId,
        sessionId
      );

      return addToCartResponse;
    },
  },
};

export default resolvers;
