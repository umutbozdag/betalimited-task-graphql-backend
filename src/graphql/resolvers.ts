import { Resolvers, CartItem } from "../__generated__/types";

const resolvers: Resolvers = {
  Query: {
    products: async (_, __, { dataSources }) =>
      await dataSources.restAPI.getProducts(),
    search: async (_, { query }, { dataSources }) => {
      return await dataSources.restAPI.searchProduct(query);
    },
    cartItems: async (_, __, { dataSources }) => {
      const cartItemsData = await dataSources.restAPI.getCartItems();
      return cartItemsData;
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
      { dataSources }
    ) => {
      const addToCartResponse = await dataSources.restAPI.addToCart(productId);
      return addToCartResponse;
    },
    subtractFromCart: async (
      _,
      { productId }: Pick<CartItem, "productId">,
      { dataSources }
    ) => {
      const subtractFromCartResponse =
        await dataSources.restAPI.subtractFromCart(productId);

      return subtractFromCartResponse;
    },
  },
};

export default resolvers;
