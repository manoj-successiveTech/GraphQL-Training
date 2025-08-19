import { posts, comments } from './dataSource';

// Mutations to create Post and Comment
const resolvers = {
  Mutation: {
    // Mutation to create a new post
    createPost: (parent, { title, content, authorId }) => {
      const newPost = {
        id: String(posts.length + 1),  // Mock ID generator
        title,
        content,
        authorId,
        createdAt: new Date().toISOString(),  // Current timestamp
      };
      posts.push(newPost);
      return newPost;
    },

    // Mutation to create a new comment
    createComment: (parent, { text, postId, authorId }) => {
      const newComment = {
        id: String(comments.length + 1),  // Mock ID generator
        text,
        postId,
        authorId,
        createdAt: new Date().toISOString(),  // Current timestamp
      };
      comments.push(newComment);
      return newComment;
    },
  },
};

export default resolvers;
