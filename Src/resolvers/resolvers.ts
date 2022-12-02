import GQLAuthUser from "../models/user.model"
import { ApolloError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { regUser } from "./regUser"
import { loginUser } from "./loginUser"
const privateKey = process.env.PRIVATEKEY!
export const resolvers = {
    Query: {
        hello: async(parent:any, args:any, context:any, info:any) => {
            let currentUser = context.userId
            currentUser = await GQLAuthUser.findById({_id:currentUser})
            console.log("current user", currentUser)
            console.log("Context here in hello resolver  = ",typeof currentUser)
            if (currentUser){
            return `Querry performed by user ${currentUser.email}`
            }
            return "User Not Logged In"
        }
    },
    Mutation: {
        registerUser: async (parent: any, args: any, context: any, info: any) =>
            await regUser(args),
        loginUser: async (parent: any, args: any, context: any, info: any) => 
            await loginUser(args)

        
    }
}