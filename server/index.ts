import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
require("dotenv").config();

const startServer = async () => {
  const app = express();

  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cpets.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`
    😁 Server is now ready at http://localhost:4000${server.graphqlPath} 👍🏻
  `);
  });
};

startServer();
