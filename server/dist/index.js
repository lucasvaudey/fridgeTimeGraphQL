"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./entities/Ingredient");
const Recipe_1 = require("./entities/Recipe");
const User_1 = require("./entities/User");
const hello_1 = require("./resolvers/hello");
const users_1 = require("./resolvers/users");
const ioredis_1 = __importDefault(require("ioredis"));
const Fridge_1 = require("./entities/Fridge");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "fridgeTime",
        username: "lucas",
        logging: true,
        synchronize: true,
        entities: [User_1.User, Recipe_1.Recipe, Ingredient_1.Ingredient, Fridge_1.Fridge],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(express_session_1.default({
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
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, users_1.UsersResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map