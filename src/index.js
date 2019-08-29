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
    published: true
  },
  {
    id: "2",
    title: "Why do we care so much about...",
    body:
      "And there were so many left on the field when john came back to pick up the..",
    published: false
  },
  {
    id: "3",
    title: "Why do we care so much about...",
    body:
      "And there were so many left on the field when john came back to pick up the..",
    published: true
  }
];

const typeDefs = `
    type Query {
        posts(query: String): [Post!]!
        users(query: String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: String!
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
