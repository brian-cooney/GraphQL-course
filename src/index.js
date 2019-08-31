import { GraphQLServer } from "graphql-yoga";
// String, Boolean, Int, Float, ID

const users = [
  {
    id: "1",
    name: "Brian Cooney",
    email: "brian@gmail.com"
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@gmail.com"
  },
  {
    id: "3",
    name: "Jack",
    email: "jack@gmail.com"
  }
];

const posts = [
  {
    id: "1",
    title: "Why do we care so much about...",
    body:
      "And there were so many left on the field when john came back to pick up the..",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Why do we care so much about...",
    body:
      "And there were so many left on the field when john came back to pick up the..",
    published: false,
    author: "1"
  },
  {
    id: "3",
    title: "Why do we care so much about...",
    body:
      "And there were so many left on the field when john came back to pick up the..",
    published: true,
    author: "3"
  }
];

const comments = [
  {
    id: "5",
    text: "He has a point but I would suggest you read more on ...."
  },
  {
    id: "6",
    text:
      "On Saturday I will go to the stoke newignton library and study graphQL"
  },
  {
    id: "7",
    text: "On Saturday evening, I will meet Deirdre for drinks"
  },
  {
    id: "8",
    text: "On Saturday evening, I will meet Deirdre for drinks"
  }
];

const typeDefs = `
    type Query {
        posts(query: String): [Post!]!
        users(query: String): [User!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String
        age: Int
        posts: [Post!]! 
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    type Comment {
      id: ID!
      text: String!
    }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return post.title
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase());
      });
    },
    me() {
      return {
        id: "234qrwqe",
        name: "Mike",
        email: "Mike@gmail.com",
        age: 32
      };
    },
    post() {
      return {
        id: "234qrwqe",
        title: "How to get ahead",
        body:
          "Marketing examples dot com provided weekly growth hacking tips into your inbox",
        published: "23-2-19"
      };
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("the server is up");
});
