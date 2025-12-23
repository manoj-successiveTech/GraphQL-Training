// src/modules/assignment-1/blogs/messages/query.js

import { delay } from "../../../../utils/delay.js";
import User from "../../../../models/user.js";
import Post from "../../../../models/post.js";
import Comment from "../../../../models/comment.js";
import Message from "../../../../models/message.js";

// Resolvers for Query and nested relationships
const queryResolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      await delay(3000);
      return User.find();
    },

    // Fetch a single user by ID
    user: async (_, { id }) => {
      await delay(3000);
      return User.findById(id);
    },

    // Fetch all posts
    posts: async () => {
      await delay(2000);
      return Post.find();
    },

    // Fetch a single post by ID
    post: async (_, { id }) => {
      await delay(2000);
      return Post.findById(id);
    },

    // Fetch posts by authorId
    postsByAuthor: async (_, { authorId }) => {
      await delay(3000);
      return Post.find({ authorId });
    },

    // Fetch all comments
    comments: async () => {
      await delay(2000);
      return Comment.find();
    },

    // Fetch comments by post ID
    commentsByPost: async (_, { postId }) => {
      await delay(2000);
      return Comment.find({ postId });
    },

    // Fetch comments by user ID
    commentsByUser: async (_, { userId }) => {
      await delay(2000);
      return Comment.find({ author: userId });
    },

    // fetch all messages (optional if you are using messages)
    messages: async () => {
      const messages = await Message.find();
      if (!messages.length) return { code: 404, message: "No messages found" };
      return messages;
    },

    // Fetch message history for a user
    getMessageHistory: async (_, { userId }) => {
      const messages = await Message.find({ author: userId });
      if (!messages.length)
        return { code: 404, message: "No message history found for this user" };
      return messages;
    },

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
      return Post.find({ authorId: parent.id });
    },
  },

  // Nested resolvers for Post type
  Post: {
    author: async (parent) => {
      await delay(2000);
      return User.findById(parent.authorId);
    },
    comments: async (parent) => {
      await delay(2000);
      return Comment.find({ postId: parent.id });
    },
  },

  // Nested resolvers for Comment type
  Comment: {
    post: (parent) => Post.findById(parent.postId),
    author: (parent) => User.findById(parent.authorId),
  },
};

export default queryResolvers;
