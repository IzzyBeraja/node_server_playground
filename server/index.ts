require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cpets.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}...`);
});
