### GraphQL: Addressing Over-fetching and Under-fetching of Data

GraphQL offers a modern and efficient approach to data querying that solves common problems inherent in traditional RESTful APIs, specifically over-fetching and under-fetching of data. These issues affect performance, bandwidth, and user experience, especially in complex applications.

## 1. Understanding Over-fetching and Under-fetching

Over-fetching

Occurs when the client receives more data than it actually needs. This is typical in REST APIs where endpoints return a fixed data structure. For example, requesting user details might return the full user profile, including fields irrelevant for the current view, like address or phone number, increasing payload size unnecessarily.

Under-fetching

Happens when the data returned by an API endpoint is insufficient for the client’s needs, forcing multiple additional requests to retrieve related data. For example, to show a user’s posts and comments, a REST client might need to make separate requests to /users/{id}, /users/{id}/posts, and /posts/{postId}/comments.

## 2. How GraphQL Solves These Problems

Precise Data Selection
GraphQL lets clients request exactly the fields they need—no more, no less. The query explicitly defines the shape and depth of the data.

Nested Data Fetching in a Single Request
GraphQL queries can traverse relationships, fetching nested objects (e.g., user → posts → comments) in one request, eliminating the need for multiple round trips.

Reduced Network Overhead
By minimizing payload size and number of requests, GraphQL reduces bandwidth usage and improves application responsiveness.

## 3. Measurable Metrics and Examples
Example Scenario: Fetch User Information

Assume a user object contains the following fields:

{
  "id": "1",
  "name": "Alice",
  "email": "alice@example.com",
  "address": "123 Main St",
  "phone": "555-1234",
  "profilePicture": "url_to_image",
  "preferences": {...}
}

Over-fetching Example

REST Request: GET /users/1

Response Payload Size: ~1 KB (includes all fields above)

Client Needs: Only name and email (approx. 200 bytes)

Result: Over-fetching ~800 bytes of unnecessary data.

GraphQL Query:

query {
  user(id: "1") {
    name
    email
  }
}


Response Payload Size: ~200 bytes (only requested fields)

Benefit

Bandwidth Reduction: ~80% less data transferred

Faster Response Time: Smaller payloads lead to quicker responses and rendering

Lower Mobile Data Usage: Critical for mobile clients with limited bandwidth

Under-fetching Example

Suppose you want to display a user's posts along with comments for each post.

REST Approach:

GET /users/1 → fetch user details

GET /users/1/posts → fetch posts by the user

For each post, GET /posts/{postId}/comments → fetch comments

Total Requests: 2 + (number of posts)

Latency: Multiple round trips increase latency significantly.

GraphQL Query (single request):

query {
  user(id: "1") {
    name
    posts {
      id
      title
      comments {
        id
        content
        author {
          name
        }
      }
    }
  }
}


Total Requests: 1

Latency: One network call reduces overhead and speeds up data retrieval.

# Summary Table of Benefits:-

Issue	                REST Behavior	                            GraphQL Solution	                         Measurable Benefit
Over-fetching	    Returns unnecessary data fields	            Selective field queries	                    Up to 80% payload size reduction
Under-fetching	    Multiple sequential API calls needed	    Nested queries in single call	        Reduces request count from N to 1
Network Usage	    High due to extra data and calls	        Optimized payload and requests	            Faster response and better UX


# Conclusion

GraphQL’s ability to let clients specify precisely what data they want dramatically reduces wasted data transfer (over-fetching) and eliminates the need for multiple sequential requests (under-fetching). This leads to improved app performance, lower bandwidth consumption, and a better user experience — especially important in mobile and bandwidth-constrained environments.