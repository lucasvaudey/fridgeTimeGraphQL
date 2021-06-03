import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Users } from "./entities/Users";
import { HelloResolver } from "./resolvers/hello";
import { UsersResolver } from "./resolvers/users";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "fridgeTime",
    username: "lucas",
    logging: true,
    synchronize: true,
    entities: [Users],
  });
  const app = express();
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
