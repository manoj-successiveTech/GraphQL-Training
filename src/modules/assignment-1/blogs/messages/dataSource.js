// src/modules/assignment-1/blogs/messages/dataSource.js

export const users = [
  { id: "1", name: "Anany", email: "anany@example.com" },
  { id: "2", name: "Manoj", email: "manoj@example.com" },
  { id: "3", name: "Aryan", email: "aryan@example.com" },
  { id: "4", name: "Vishal", email: "vishal@example.com" },
  { id: "5", name: "Yash", email: "yash@example.com" },
  { id: "6", name: "Sneha", email: "sneha@example.com" },
  { id: "7", name: "Ravi", email: "ravi@example.com" },
  { id: "8", name: "Neha", email: "neha@example.com" },
  
];

export const posts = [
  {
    id: "1",
    title: "GraphQL Basics",
    content: "Hello GraphQL!",
    authorId: "1",
    createdAt: "2025-08-19T10:00:00Z",
  },
  {
    id: "2",
    title: "Basic Apollo Server",
    content: "Easy GraphQL setup",
    authorId: "2",
    createdAt: "2025-08-18T14:30:00Z",
  },
  {
    id: "3",
    title: "Advanced GraphQL",
    content: "Deep dive into resolvers",
    authorId: "3",
    createdAt: "2025-08-17T08:45:00Z",
  },
  {
    id: "4",
    title: "GraphQL Subscriptions",
    content: "Real-time updates made simple.",
    authorId: "6",
    createdAt: "2025-08-20T09:00:00Z",
  },
  {
    id: "5",
    title: "Authentication with GraphQL",
    content: "Secure your GraphQL API.",
    authorId: "7",
    createdAt: "2025-08-20T10:15:00Z",
  },
];

export const comments = [
  {
    id: "1",
    text: "Great post!",
    author: "2",
    postId: "1",
    createdAt: "2025-08-19T11:00:00Z",
  },
  {
    id: "2",
    text: "Thanks for sharing!",
    author: "1",
    postId: "2",
    createdAt: "2025-08-18T15:00:00Z",
  },
  {
    id: "3",
    text: "Very informative.",
    author: "3",
    postId: "1",
    createdAt: "2025-08-19T12:30:00Z",
  },
  {
    id: "4",
    text: "Can't wait for more!",
    author: "1",
    postId: "3",
    createdAt: "2025-08-17T09:00:00Z",
  },
  {
    id: "5",
    text: "Helpful content, thank you!",
    author: "8",
    postId: "4",
    createdAt: "2025-08-20T09:30:00Z",
  },
  {
    id: "6",
    text: "Exactly what I needed!",
    author: "5",
    postId: "5",
    createdAt: "2025-08-20T10:45:00Z",
  },
];

// Utility functions for data retrieval

export const getUserById = (id) => users.find((user) => user.id === id);
export const getPostById = (id) => posts.find((post) => post.id === id);
export const getPostsByUserId = (userId) => posts.filter((post) => post.authorId === userId);
export const getCommentsByPostId = (postId) => comments.filter((comment) => comment.postId === postId);
export const getCommentsByUserId = (userId) => comments.filter((comment) => comment.author === userId);
