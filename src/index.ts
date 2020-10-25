import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { __dbName__, __dbURL__, __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";

const startServer = async () => {
  const app = express();

  await MikroORM.init(mikroOrmConfig);

  /* const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post); */

  app.listen({ port: 4000 }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:4000 👍🏻\n`);
  });
};

startServer();
