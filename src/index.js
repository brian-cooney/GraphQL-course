import { GraphQLServer } from "graphql-yoga";
// String, Boolean, Int, Float, ID

const typeDefs = `
    type Query {
        add(numbers: [Float]!): Float!
        grades: [Int!]!
        greeting(name: String, position: String!): String!
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
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `hello, ${args.name}! you are my favourite ${args.position}`;
      } else {
        return "args";
      }
    },
    grades(parent, args, ctx, info) {
      return [99, 33, 58, 45];
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
