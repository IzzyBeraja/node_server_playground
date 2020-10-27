import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();
  //   const post = orm.em.create(Post, { title: "my first post", random: 19 });
  //   await orm.em.persistAndFlush(post);
  const posts = await em.find(Post, {});

  console.log(posts);

  const port = 5234;
  app.listen({ port }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:${port} 👍🏻\n`);
  });
};

startServer();
