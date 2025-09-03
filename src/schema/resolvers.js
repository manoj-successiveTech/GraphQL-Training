
import { messageQueryResolvers } from "../modules/assignment-1/books/messages/query.js";
import { messageMutationResolvers } from "../modules/assignment-1/books/messages/mutation.js";
import queryResolvers from "../modules/assignment-1/blogs/messages/query.js";
import blogMutationResolvers from "../modules/assignment-1/blogs/messages/mutation.js";
import { users, posts, comments } from "../modules/assignment-1/blogs/messages/dataSource.js"

export const resolvers = {
  Query: {
    ...messageQueryResolvers,
    ...queryResolvers.Query,
  },
  Mutation: {
    ...messageMutationResolvers,
    ...blogMutationResolvers.Mutation,
  },

  Comment:{
    author:(parent,args,context)=>{
      const userId=parent.author;
      return users.find((user)=>user.id===userId);
    }
  }
}