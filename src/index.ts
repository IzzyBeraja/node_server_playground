import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers/allResolvers";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, __redisSecret__ } from "./constants";
import { Context } from "./types";

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https
      },
      secret: __redisSecret__ || "redis secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: ({ req, res }): Context => ({ em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  const port = 5055;
  app.listen({ port }, () => {
    console.info(
      `\n😁 Server is now ready at http://localhost:${port}/graphql 👍🏻\n`
    );
  });
};

startServer();
