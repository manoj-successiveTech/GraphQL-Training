// src/modules/assignment-1/blogs/messages/index.js

import queryResolvers from './query.js';
import blogMutationResolvers from './mutation.js';

const resolvers = {
  ...queryResolvers,
  ...blogMutationResolvers,
};

export default resolvers;