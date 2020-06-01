import { gql } from 'apollo-server-express';

export const typeDefs = gql`
 type Query {
     user: User!
 }

 type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    createdPosts: [Post!]
  }

 type Post {
    _id: ID!
    title: String!
    description: String!
    createdAt: String!
    creator: User!
  }

  type AuthData {
      token: String!
      tokenExpire: Int!
  }

  type Mutation {
      signup(name: String, email: String, password: String): User
      login(email: String, password: String): AuthData
  }

`;
