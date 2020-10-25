import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { __dbName__, __dbURL__, __prod__ } from "./constants";
import { Post } from "./entities/Post";

const startServer = async () => {
  const app = express();

  const orm = await MikroORM.init({
    entities: [Post],
    dbName: __dbName__,
    type: "mongo",
    debug: !__prod__,
    clientUrl: __dbURL__,
  });

  /* const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post); */

  app.listen({ port: 4000 }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:4000 👍🏻\n`);
  });
};

startServer();
