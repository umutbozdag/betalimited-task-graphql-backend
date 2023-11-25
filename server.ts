import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/graphql/schema";
import resolvers from "./src/graphql/resolvers";
import { RestAPI } from "./src/datasources/api";

async function startApolloServer() {
  // @ts-ignore-next-line
  const port = Number(process.env.PORT) || 4000;
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
      const sessionId: any = req.headers["session-id"] || null;
      return {
        dataSources: {
          restAPI: new RestAPI({ cache, sessionId }),
        },
      };
    },
  });
  console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
}

startApolloServer();
