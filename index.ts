import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDb } from "./Src/connectDb/connectDb";
import { typeDefs } from "./Src/typeDefs/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./Src/resolvers/resolvers"
import authDirectiveTransformer from "./Src/middleware/AuthDirective";
const app = express()
app.use(express.json())
const port = process.env.PORT!
let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
schema = authDirectiveTransformer(schema, "auth")
const startServer = async () => {
    const apolloServer = new ApolloServer({
        schema,
        debug: false,
        context: ({ req }) => ({
            request: req
        })
        // context: ({req})=>{
        //     Auth(req)
        //     return {
        //     // @ts-ignore    
        //     userId: req.user_id || null
        //     }
        // }
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })

    app.listen(port, () => {
        connectDb()
        console.log(`App is running on ${port}`)
    })
}

startServer()


