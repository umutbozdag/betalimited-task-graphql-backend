import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { RestAPI } from "./datasources/api";

async function startApolloServer() {
  // @ts-ignore
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

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     return {
//       dataSources: {
//         restAPI: new RestAPI(),
//       },
//       request: req,
//     };
//   },
// });
