// src/modules/assignment-1/blogs/messages/query.js

import { users, posts, comments } from './dataSource.js';

// Resolvers for Query and nested relationships
const queryResolvers = {
  Query: {
    // Fetch all users
    users: () => users,

    // Fetch a single user by ID
    user: (_, { id }) => users.find(user => user.id === id),

    // Fetch all posts
    posts: (_, {autherId}) => posts.fin(post => post.authorId === autherId),

    // Fetch a single post by ID
    post: (_, { id }) => posts.find(post => post.id === id),

    // Fetch all comments
    comments: () => comments,

    // Fetch comments by post ID
    commentsByPost: (_, { postId }) =>
      comments.filter(comment => comment.postId === postId),

    // Fetch comments by user ID
    commentsByUser: (_, { userId }) =>
      comments.filter(comment => comment.authorId === userId),
  },

  // Nested resolvers for User type
  User: {
    posts: (parent) => posts.filter(post => post.authorId === parent.id),
  },

  // Nested resolvers for Post type
  Post: {
    author: (parent) => users.find(user => user.id === parent.authorId),
    comments: (parent) => comments.filter(comment => comment.postId === parent.id),
  },

  // Nested resolvers for Comment type
  Comment: {
    post: (parent) => posts.find(post => post.id === parent.postId),
    author: (parent) => users.find(user => user.id === parent.authorId),
  },
};

export default queryResolvers;
