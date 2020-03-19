import "reflect-metadata";
 import {createConnection} from "typeorm";
 import "dotenv/config"
import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import { UserResolver } from './UserResolver'
import {buildSchema} from 'type-graphql'

(async () => {
    const app = express();
    app.get('/', (_req,res) => res.send("hello Ejiro"));
    await createConnection();
    const apolloServer = new ApolloServer({
  schema: await buildSchema({
      resolvers:[UserResolver]
  }),
  context: ({req,res}) => ({req,res})
    });
    apolloServer.applyMiddleware({app});
    app.listen(4000, ()=>{console.log("express server started")});
})();

