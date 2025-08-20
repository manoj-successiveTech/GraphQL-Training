// src/modules/assignment-1/blogs/messages/mutation.js

import { posts, comments } from './dataSource.js';

const blogMutationResolvers = {
  Mutation: {
    createPost: (parent, { title, content, authorId }) => {
      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        authorId,
        createdAt: new Date().toISOString(),
      };
      posts.push(newPost);
      return newPost;
    },

    createComment: (parent, { text, postId, authorId }) => {
      const newComment = {
        id: String(comments.length + 1),
        text,
        postId,
        authorId,
        createdAt: new Date().toISOString(),
      };
      comments.push(newComment);
      return newComment;
    },
  },
};

export default blogMutationResolvers;
