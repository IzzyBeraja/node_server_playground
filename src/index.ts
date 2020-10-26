import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
// import { Post } from "./entities/Post";

const startServer = async () => {
  const app = express();

  const orm = await MikroORM.init(mikroOrmConfig);

  //   const post = orm.em.create(Post, { title: "my first post" });
  //   await orm.em.persistAndFlush(post);

  const port = 5234;
  app.listen({ port }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:${port} 👍🏻\n`);
  });
};

startServer();
