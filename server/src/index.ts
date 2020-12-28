import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';

// GraphQL
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});