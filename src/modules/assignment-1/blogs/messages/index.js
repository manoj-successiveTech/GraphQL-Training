import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import resolvers from './query';  // Import resolvers
import { users, posts, comments } from '../messages/dataSource';

// Read the schema from type.gql
const typeDefs = gql(readFileSync('./type.gql', { encoding: 'utf-8' }));

// Initialize ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
