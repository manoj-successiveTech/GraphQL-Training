import { users, posts, comments } from './dataSource';

// Resolvers for Query type
const resolvers = {
  Query: {
    // Fetch all users
    users: () => users,

    // Fetch a user by ID
    user: (parent, { id }) => users.find(user => user.id === id),

    // Fetch all posts
    posts: () => posts,

    // Fetch a post by ID
    post: (parent, { id }) => posts.find(post => post.id === id),

    // Fetch all comments
    comments: () => comments,

    // Fetch comments by Post ID
    commentsByPost: (parent, { postId }) => comments.filter(comment => comment.postId === postId),

    // Fetch comments by User ID
    commentsByUser: (parent, { userId }) => comments.filter(comment => comment.authorId === userId),
  },

  // Resolvers for relationships (Nested objects)
  User: {
    posts: (parent) => posts.filter(post => post.authorId === parent.id),
  },

  Post: {
    author: (parent) => users.find(user => user.id === parent.authorId),
    comments: (parent) => comments.filter(comment => comment.postId === parent.id),
  },

  Comment: {
    post: (parent) => posts.find(post => post.id === parent.postId),
    author: (parent) => users.find(user => user.id === parent.authorId),
  },
};

export default resolvers;
