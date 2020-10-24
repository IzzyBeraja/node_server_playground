import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { schema } from "./schema/schema";

const app = express();

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

//app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = 4000;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}...`);
});
