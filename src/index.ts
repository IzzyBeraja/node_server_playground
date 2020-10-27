import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();
  //   const post = orm.em.create(Post, { title: "my first post", random: 19 });
  //   await orm.em.persistAndFlush(post);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  const port = 4000;
  app.listen({ port }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:${port} 👍🏻\n`);
  });
};

startServer();
