import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Ingredient } from "./entities/Ingredient";
import { Recipe } from "./entities/Recipe";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { UsersResolver } from "./resolvers/users";
import Redis from "ioredis";
import { Fridge } from "./entities/Fridge";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "fridgeTime",
    username: "lucas",
    logging: true,
    synchronize: true,
    entities: [User, Recipe, Ingredient, Fridge],
  });
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    session({
      name: "qid",
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: "hello",
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 jours
      },
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UsersResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
