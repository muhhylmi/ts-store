import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    roleId: Int!
    roleName: String!
    created_at: String!,
    image: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, password: String!, roleId: Int!): User!
  }
`;
