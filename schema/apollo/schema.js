const { ApolloServer, gql } = require('apollo-server');
const axios = require("axios");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: ID
    firstName: String
    age: Int
  }

  type Company {
      id: ID
      name: String
      description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    companies: [Company]
  }
`;


// FETCH THE DATA
const resolvers = {
    Query: {
        users: () => axios.get(`http://localhost:3000/users/`)
        .then(resp => resp.data),
        companies: () => axios.get(`http://localhost:3000/companies/`).then(resp => resp.data),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});