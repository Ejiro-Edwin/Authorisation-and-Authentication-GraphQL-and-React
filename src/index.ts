import "reflect-metadata";
 import {createConnection} from "typeorm";
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
  })
    });
    apolloServer.applyMiddleware({app});
    app.listen(4000, ()=>{console.log("express server started")});
})();

