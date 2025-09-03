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

    paginatedPosts: async (
      _,
      { page = 1, pageSize = 5, sortBy = "id", order = "asc" }
    ) => {
      // Calculate starting and ending indices for pagination

      const sortedPosts = [...posts];

      if (sortBy === "id") {
        sortedPosts.sort((a, b) =>
          order === "asc"
            ? Number(a.id) - Number(b.id)
            : Number(b.id) - Number(a.id)
        );
      } else if (sortBy === "date") {
        sortedPosts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          order === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return sortedPosts.slice(start, end);
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

  //  Include a query for fetching message history ass3.5

  getMessageHistory: (_, { userId }) => {
    const userMessageHistory = messages.filter(
      (message) => message.author === userId || message.recipient === userId
    );
    return userMessageHistory;
  },
};

export default queryResolvers;
