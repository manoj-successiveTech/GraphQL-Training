// src/modules/assignment-1/blogs/messages/mutation.js

import { posts, comments, users } from './dataSource.js';

const blogMutationResolvers = {
  Mutation: {
    // Create a new post
    createPost: (parent, { title, content, authorId }) => {
      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        author:authorId,
        authorId,
        createdAt: new Date().toISOString(),
      };
      // console.log(posts, "svsdv", newPost);
      
      posts.push(newPost);
      return newPost;
    },

    // Create a new comment
    createComment: (parent, { text, postId, authorId }) => {
      const newComment = {
        id: String(comments.length + 1),
        text,
        postId,
        author:authorId,
        createdAt: new Date().toISOString(),
      };
      comments.push(newComment);
      return newComment;
    },

    // Post a message (extra functionality added)
    postMessage: (parent, { content, author }) => {
      const newMessage = {
        id: String(posts.length + 1),  // Reusing post ID for messages, or you can create a separate counter
        content,
        author,
        createdAt: new Date().toISOString(),
      };
      posts.push(newMessage);
      return newMessage;
    },

    // Update user information
    
    // Erroe Handling
    updateUser: (_, { id, name }) => {
      const user = users.find((user) => user.id === id);
      if (!user) {
        return {
          code:404,
          message:"no user exist with this id"
        }
      }
      if (user) user.name = name;
      return user;
    },

    // Delete a comment
    deleteComment: (_, { id }) => {
      const index = comments.findIndex((comment) => comment.id === id);
      if (index === -1) {
        throw new Error("Comment not found");
      }
      const deletedComment = comments.splice(index, 1)[0];  // Remove the comment from the array
      return deletedComment;                               
    },
  },
};

export default blogMutationResolvers;
