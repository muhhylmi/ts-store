export const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
  }
`;
