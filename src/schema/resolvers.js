
import { messageQueryResolvers } from "../modules/assignment-1/messages/query.js";
import { messageMutationResolvers } from "../modules/assignment-1/messages/mutation.js";
// import { users, posts, comments } from "../modules/assignment-1/blogs/messages/dataSource.js"

export const resolvers = {
  Query: {
    ...messageQueryResolvers
  },
  Mutation: {
    ...messageMutationResolvers
  },
}