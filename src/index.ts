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

const startServer = async () => {
  const { em } = await MikroORM.init(mikroOrmConfig);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "keyboard cat",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: () => ({ em }),
  });

  apolloServer.applyMiddleware({ app });

  const port = 5055;
  app.listen({ port }, () => {
    console.info(`\n😁 Server is now ready at http://localhost:${port} 👍🏻\n`);
  });
};

startServer();
