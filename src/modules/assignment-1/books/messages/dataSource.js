// books/messages/dataSource.js

export const messages = [
  {
    id: "1",
    content: "Welcome to the GraphQL API",
    author: "System",
    createdAt: new Date().toISOString(),
    title: "GraphQL API Introduction",
  },
  {
    id: "2",
    content: "You can run queries and mutations now!",
    author: "System",
    createdAt: new Date().toISOString(),
    title: "Query and Mutation Ready",
  },
  {
    id: "3",
    content: "Explore how to use fragments for cleaner queries.",
    author: "Admin",
    createdAt: new Date().toISOString(),
    title: "Using GraphQL Fragments",
  },
  {
    id: "4",
    content: "Don't forget to check the schema documentation.",
    author: "DocBot",
    createdAt: new Date().toISOString(),
    title: "Schema Docs Reminder",
  },
  {
    id: "5",
    content: "Subscriptions are now available for real-time updates.",
    author: "System",
    createdAt: new Date().toISOString(),
    title: "Real-time Subscriptions",
  },
  {
    id: "6",
    content: "GraphQL Playground is ready for testing.",
    author: "ToolBot",
    createdAt: new Date().toISOString(),
    title: "Playground Activated",
  },
];
