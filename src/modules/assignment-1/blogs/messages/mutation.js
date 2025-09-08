// src/modules/assignment-1/blogs/messages/mutation.js

// Import MongoDB models
import User from "../../../../models/user.js";
import Comment from "../../../../models/comment.js";
import Post from "../../../../models/post.js";
import Message from "../../../../models/message.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const blogMutationResolvers = {
  Mutation: {
    // Create a new post (requires authentication and admin role)
    createPost: async (parent, args, context) => {
      if (!context.user) throw new Error("Authentication required");
      const finduser = await User.findById(context.user.id);
      // console.log(finduser)
      if (!finduser || finduser.role !== "ADMIN")
        throw new Error("Only admins can add posts");
      const { title, content, authorId } = args;
      const newPost = new Post({
        title,
        content,
        authorId:finduser._id,
        createdAt: new Date().toISOString(),
      });
      await newPost.save();
      return newPost;
    },

    // Create a new comment (requires authentication)
    createComment: async (parent, args, context) => {
      if (!context.user) throw new Error("Authentication required");
      const { text, postId, authorId } = args;
      const post = await Post.findById(postId);
      if (!post) throw new Error(`Post with id ${postId} not found`);
      const newComment = new Comment({
        text,
        postId,
        authorId,
        createdAt: new Date().toISOString(),
      });
      await newComment.save();
      context.pubsub.publish("COMMENT_POSTED", { commentPosted: newComment });
      return newComment;
    },

    // Post a message (requires authentication)
    postMessage: async (parent, args, context) => {
      if (!context.user) throw new Error("Authentication required");
      const { content, authorId, title } = args;
      const newMessage = new Message({
        content,
        author: authorId,
        title,
        createdAt: new Date().toISOString(),
      });
      await newMessage.save();
      return newMessage;
    },

    // Update user information (requires authentication and admin role)
    updateUser: async (_, args, context) => {
      if (!context.user) throw new Error("Authentication required");
      if (context.user.role !== "ADMIN")
        throw new Error("Not authorized: ADMIN role required");
      const { id, name } = args;
      const user = await User.findById(id);
      if (!user) {
        return {
          code: 404,
          message: "No user exists with this ID",
        };
      }
      user.name = name;
      await user.save();
      return user;
    },

    // Delete a comment (requires authentication and admin role)
    deleteComment: async (_, args, context) => {
      if (!context.user) throw new Error("Authentication required");
      if (context.user.role !== "ADMIN")
        throw new Error("Not authorized: ADMIN role required");
      const { id } = args;
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) throw new Error("Comment not found");
      return comment;
    },

    // Login user with password and JWT (publishes event)
    loginUser: async (_, { email, password }, context) => {

      if (!email || !password) {
        return {
          message: "Incorrect email or password",
          code: 401,
        };
      }


      const user = await User.findOne({email});
      if (!user) {
        return {
          message: "Invalid credentials",
          code: 404,
        };
      }

      const isAuthenticated=await bcrypt.compare(password,user.password);

      if(!isAuthenticated){
        return{
          message:"Wrong credentials",
          code:401
        }
      }
      user.isOnline = true;
      await user.save();
      context.pubsub.publish("USER_PRESENCE_CHANGED", {
        userPresenceChanged: user,
      });
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "your_secret_key",
        { expiresIn: "24h" }
      );
      return { token, user };
    },

    // Logout user (publishes event)
    logoutUser: async (_, __, context) => {
      if (!context.user) throw new Error("Not authenticated");
      const existingUser = await User.findById(context.user.id);
      if (!existingUser) throw new Error("User not found");
      existingUser.isOnline = false;
      await existingUser.save();
      context.pubsub.publish("USER_PRESENCE_CHANGED", {
        userPresenceChanged: existingUser,
      });
      return { message: "Logged out" };
    },

    // Register new user
    registerUser: async (_, { name, email, password,role }) => {
      if (!name || !email || !password) {
        return {
          message: "Name, Email, or Password is missing",
          status: 400,
        };
      }
      const existingUser = await User.findOne({ email });
      const hashedPassword=await bcrypt.hash(password,12);
      if (existingUser) throw new Error("Email already registered");
      const newUser = new User({
        name,
        email,
        password:hashedPassword,
        isOnline: false,
        role,
        createdAt: new Date().toISOString(),
      });
      await newUser.save();
      return newUser;
    },

    // Set user presence (Online/Offline) (publishes event)
    setUserPresence: async (_, { userId, isOnline }, context) => {
      const user = await User.findById(userId);
      if (!user) {
        return {
          message: "User not found",
          code: 404,
        };
      }
      user.isOnline = isOnline;
      await user.save();
      context.pubsub.publish("USER_PRESENCE_CHANGED", {
        userPresenceChanged: user,
      });
      if (isOnline) {
        context.pubsub.publish("USER_JOINED", { userJoined: user });
      } else {
        context.pubsub.publish("USER_LEFT", { userLeft: user });
      }
      return {
        userId,
        isOnline,
      };
    },
    // Set user online (publishes event)
    setUserOnline: async (_, { userId }, context) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      user.isOnline = true;
      await user.save();
      context.pubsub.publish("USER_PRESENCE_CHANGED", {
        userPresenceChanged: user,
      });
      context.pubsub.publish("USER_JOINED", { userJoined: user });
      return user;
    },
    // Set user offline (publishes event)
    setUserOffline: async (_, { userId }, context) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      user.isOnline = false;
      await user.save();
      context.pubsub.publish("USER_PRESENCE_CHANGED", {
        userPresenceChanged: user,
      });
      context.pubsub.publish("USER_LEFT", { userLeft: user });
      return user;
    },
  },
};
export default blogMutationResolvers;
