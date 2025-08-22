// src/modules/schema/resolvers.js
import { messageQueryResolvers } from "../modules/assignment-1/books/messages/query.js";
import { messageMutationResolvers } from "../modules/assignment-1/books/messages/mutation.js";
import queryResolvers from "../modules/assignment-1/blogs/messages/query.js";
import blogMutationResolvers from "../modules/assignment-1/blogs/messages/mutation.js";
import { comments, posts, users } from "../modules/assignment-1/blogs/messages/dataSource.js";

export const resolvers = {
  Query: {
    ...messageQueryResolvers,
    ...queryResolvers.Query,
  },
  Mutation: {
    ...messageMutationResolvers,
    ...blogMutationResolvers.Mutation,
  },
  Comment: {
    author: (parent) => {
      const userId = parent.author;
      return users.find((user) => user.id === userId)
    },
  },

  User:{
    posts:(parent)=>{
      const userPosts=posts.filter((post)=>post.authorId===parent.id);
      return userPosts;
    }
  }
,
  Post:{
    comments:(parent)=>{
      const postComments=comments.filter((comment)=>comment.postId===parent.id);
      return postComments;
    }
  },

  UserResult : {
    __resolveType(obj){
      if(obj.code) return "Error"
      return "User"
    }
  }

};
