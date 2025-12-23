// src/modules/assignment-1/blogs/messages/index.js

import queryResolvers from "./query.js";
import blogMutationResolvers from "./mutation.js";
import { subscriptionResolver } from "./subscription.js";

const resolvers = {
  ...queryResolvers,
  ...blogMutationResolvers,
  ...subscriptionResolver,
};

export default resolvers;
