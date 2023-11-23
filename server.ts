import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/graphql/schema";
import resolvers from "./src/graphql/resolvers";
import { RestAPI } from "./src/datasources/api";

async function startApolloServer() {
  // @ts-ignore-next-line
  const port = Number.parseInt(process.env.PORT) || 4000;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: {
      port,
    },
    context: async ({ req }) => {
      const { cache } = server;
      return {
        dataSources: {
          restAPI: new RestAPI(),
        },
        request: req,
      };
    },
  });
  console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
}

startApolloServer();
