import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers} from "./graphql/resolvers";
import app from './express';


const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers:  resolvers,
  context: (req) => {
    return {
      ...req
    }
  },
  introspection: true,
  playground: true
});

server.applyMiddleware({ app });

app.get('/', function (req, res) {
  res.send('trying to heroku!')
})
  

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);