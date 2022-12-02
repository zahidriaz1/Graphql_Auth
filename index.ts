// require ('dotenv').config()
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDb } from "./Src/connectDb/connectDb";
import { typeDefs } from "./Src/typeDefs/typeDefs";
import { Request, Response } from "express"

import { resolvers } from "./Src/resolvers/resolvers"
import { Auth } from "./Src/middleware/auth";
const app = express()
app.use(express.json())
const port = process.env.PORT!
const startServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        debug:false,
        context: ({req})=>{
            Auth(req)
            return {
            // @ts-ignore
            userId: req.user_id || null
            }
        }
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })

    app.listen(port, () => {
        connectDb()
        console.log(`App is running on ${port}`)
    })
}
startServer()


