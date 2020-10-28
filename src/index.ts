import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: () => ({ em }),
  });

  apolloServer.applyMiddleware({ app });

  const port = 4000;
  app.listen({ port }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:${port} 👍🏻\n`);
  });
};

startServer();
