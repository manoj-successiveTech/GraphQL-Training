// src/modules/assignment-1/blogs/messages/dataSource.js

export const users = [
  { id: "1", name: "Anany", email: "anany@example.com"},
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
    title: "Frontend Integration",
    content: "Connecting Apollo Client with React.",
    authorId: "3",
    createdAt: "2025-08-17T08:45:00Z",
  },
  {
    id: "4",
    title: "GraphQL vs REST",
    content: "Why choose GraphQL over REST APIs?",
    authorId: "4",
    createdAt: "2025-08-20T09:00:00Z",
  },
  {
    id: "5",
    title: "Authentication in GraphQL",
    content: "Securing your GraphQL endpoints.",
    authorId: "5",
    createdAt: "2025-08-20T10:00:00Z",
  },
  {
    id: "6",
    title: "GraphQL Subscriptions",
    content: "Real-time data with GraphQL subscriptions.",
    authorId: "6",
    createdAt: "2025-08-21T11:15:00Z",
  },
  {
    id: "7",
    title: "Pagination Techniques",
    content: "Cursor vs offset pagination in GraphQL.",
    authorId: "7",
    createdAt: "2025-08-21T13:00:00Z",
  },
  {
    id: "8",
    title: "GraphQL Error Handling",
    content: "Best practices for handling errors in GraphQL.",
    authorId: "8",
    createdAt: "2025-08-21T15:20:00Z",
  },
    {
    id: "9",
    title: "Performance Optimization",
    content: "Improving GraphQL query performance.",
    authorId: "2",
    createdAt: "2025-08-22T09:40:00Z",
  },
  {
    id: "10",
    title: "Schema Design Principles",
    content: "Tips for designing an effective GraphQL schema.",
    authorId: "1",
    createdAt: "2025-08-22T10:10:00Z",
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
