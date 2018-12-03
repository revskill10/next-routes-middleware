const http = require('http');
const express = require("express");
const { ApolloServer, gql, PubSub  } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
  type Subscription {
    hello: String
  }
  type Mutation {
    hello(test: String): Boolean
  }
`;
const pubsub = new PubSub();
const HELLO = 'HELLO';

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world from ApolloServer on Now 2.0!"
  },
  Subscription: {
    hello: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([HELLO]),
    },
  },
  Mutation: {
    hello(root, args, context) {
      pubsub.publish(HELLO, { hello: args });
      return true
    },
  },
};


const PORT = 4000;
const app = express();
const path = '/'
const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });

server.applyMiddleware({app, path})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})