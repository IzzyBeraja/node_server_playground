import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/helloResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { PassageResolver } from "./resolvers/PassageResolver";

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();
  //   const post = em.create(Passage, {
  //     author: "Izzy",
  //     contributor: "Izzy B",
  //     text: "Sup Fam this is a passage",
  //   });
  //   await em.persistAndFlush(post);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, PassageResolver],
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
