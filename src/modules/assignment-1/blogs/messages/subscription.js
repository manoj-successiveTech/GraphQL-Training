import { pubsub } from "../../../../server/pubsub.js";

export const blogSubscriptionResolvers = {
  commentPosted: {
    subscribe: () => pubsub.asyncIterableIterator(["COMMENT_POSTED"]),
  },

  userJoined: {
    subscribe: () => pubsub.asyncIterableIterator(["USER_JOINED"]),
  },

  userLeft: {
    subscribe: () =>  pubsub.asyncIterableIterator(["USER_LEFT"]),
  },
};


//import { pubsub } from "../../../../server/pubsub.js";
// This imports a PubSub instance, which is used to publish and subscribe to real-time events in your GraphQL server.

// subscribe: () => pubsub.asyncIterableIterator(["EVENT_NAME"])
// This sets up a subscription resolver for each event (COMMENT_POSTED, USER_JOINED, USER_LEFT).
// When a client subscribes, it returns an async iterator that listens for those events.
// When the event is published (e.g., a new comment is added), all subscribed clients receive the update in real time.

/*Summary:This pattern enables real-time communication between your server and clients using GraphQL subscriptions, powered by the PubSub system. 
Each resolver listens for a specific event and pushes updates to clients when those events occur.*/

//  In summary: `subscription.js` connects your GraphQL server to real-time events, allowing clients to receive updates instantly when something changes.