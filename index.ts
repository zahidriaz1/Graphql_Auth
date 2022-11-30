// require ('dotenv').config()
import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDb } from "./Src/connectDb/connectDb";
import { typeDefs } from "./Src/typeDefs/typeDefs";
import {resolvers} from "./Src/resolvers/resolvers"
const app = express()
app.use(express.json())
const port = process.env.PORT !
console.log("port = ", port, typeof(port))


const startServer = async()=>{
const apolloServer = new ApolloServer ({
    typeDefs, 
    resolvers
})
await apolloServer.start()
apolloServer.applyMiddleware({app:app})
 
app.listen(port, ()=>{
    connectDb()
    console.log(`App is running on ${port}`)
})
}
startServer()

    