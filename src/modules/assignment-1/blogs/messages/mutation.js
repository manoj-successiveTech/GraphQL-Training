// src/modules/assignment-1/blogs/messages/mutation.js

import { posts, comments, users } from './dataSource.js';
import { pubsub } from '../../../../server/pubsub.js';

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

    // Create a new comment-ass3
    createComment: (parent, { text, postId, authorId }) => {
      const newComment = {
        id: String(comments.length + 1),
        text,
        postId,
        author:authorId,
        createdAt: new Date().toISOString(),
      };
      comments.push(newComment);// pubsub publish listen comment y
      pubsub.publish("COMMENT_POSTED",{commentPosted : newComment})
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

     // loginUser- 
  loginUser: (_, { email, password }) => {
    if (!email || !password) {
      return {
        message: "Incorrect email or password",
        code: 401,
      }; // matches Error type
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return {
        message: "User does not exist, create account",
        code: 404,
      };
    }
    user.isOnline = true;
    pubsub.publish("USER_JOINED", { userJoined: user });
    return user; // matched User type
    // In GraphQL schema matters a lot
    // It has to be return the way it was defined in the schema.gql file
  },
  
  // logoutUser
  logoutUser: (_, { email }) => {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return {
        message: "User does not exist",
        code: 404,
      };
    }
    user.isOnline = false;
    pubsub.publish("USER_LEFT", { userLeft: user });
    return user;
  },

    // register user

  registerUser: (_, { name, email }) => {
    // const { name, email } = args;
    if (!name || !email) {
      return {
        message: "Name or Email is missing",
        status: 400,
      };
    }
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      isOnline: false,
      createdAt: new Date().toISOString,
    };

    users.push(newUser);
    return newUser;
  },
 // assignment-3 setUserPresence

   setUserPresence: (_, { userId, isOnline }) => {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return {
        message: "User not found",
        code: 404,
      };
    }

    // Add or update the user's presence
    user.isOnline = isOnline;

    // Publish subscription events
    if (isOnline) {
      pubsub.publish("USER_JOINED", { userJoined: user });
    } else {
      pubsub.publish("USER_LEFT", { userLeft: user });
    }

    return {
      userId,
      isOnline,
    };
  },
},

};
export default blogMutationResolvers;
