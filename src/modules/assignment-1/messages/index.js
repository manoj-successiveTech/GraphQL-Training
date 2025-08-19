// 3.Write a series of GraphQL queries to retrieve specific fields from a sample schema. Include queries for nested objects and fields with arguments.- index.js

import { messageQueryResolvers } from "./query.js";
import { messageMutationResolvers } from "./mutation.js";

export const messageModule = {
  Query: messageQueryResolvers,
  Mutation: messageMutationResolvers,
};