// src/modules/assignment-1/blogs/messages/query.js

import { delay } from "../../../../utils/delay.js";
import { users, posts, comments } from "./dataSource.js";

// Resolvers for Query and nested relationships
const queryResolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      await delay(3000);
      return users;
    },

    // Fetch a single user by ID
    user: async (_, { id }) => {
      await delay(3000);
      return users.find((user) => user.id === id);
    },

    // Fetch all posts
    posts: async () => {
      await delay(2000);
      return posts;
    },

    // Fetch a single post by ID
    post: async (_, { id }) => {
      await delay(2000);
      return posts.find((post) => post.id === id);
    },

    // Fetch posts by authorId
    postsByAuthor: async (_, { authorId }) => {
      await delay(3000);
      return posts.filter((post) => post.authorId === authorId);
    },

    // Fetch all comments
    comments: async () => {
      await delay(2000);
      return comments;
    },

    // Fetch comments by post ID
    commentsByPost: async (_, { postId }) => {
      await delay(2000);
      return comments.filter((comment) => comment.postId === postId);
    },

    // Fetch comments by user ID
    commentsByUser: async (_, { userId }) => {
      await delay(2000);
      return comments.filter((comment) => comment.author === userId);
    },

    // fetch all messages (optional if you are using messages)
    messages: () => [], 


   // Fetch paginated posts (2.6)
   paginatedPosts: async (_, { page = 1, pageSize = 5 }) => {
      // Calculate starting and ending indices for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      // Slice the posts array to return only the items for the current page
      return posts.slice(startIndex, endIndex);
    },
    
  },

  // nested resolvers for User type
  User: {
    posts: async (parent) => {
      await delay(2000);
      return posts.filter((post) => post.authorId === parent.id);
    },
  },

  // Nested resolvers for Post type
  Post: {
    author: async (parent) => {
      await delay(2000);
      return users.find((user) => user.id === parent.authorId);
    },
    comments: async (parent) => {
      await delay(2000);
      return comments.filter((comment) => comment.postId === parent.id);
    },
  },

  // Nested resolvers for Comment type
  Comment: {
    post: (parent) => posts.find((post) => post.id === parent.postId),
    author: (parent) => users.find((user) => user.id === parent.authorId),
  },
};

export default queryResolvers;
