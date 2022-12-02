import GQLAuthUser from "../models/user.model"
import { regUser } from "./regUser"
import { loginUser } from "./loginUser"
import { getAllUsers } from "./getAllUsers"

export const resolvers = {
    Query: {
        hello: async(parent:any, args:any, context:any, info:any) => {
            let currentUser = context.userId
            if (currentUser){
                currentUser = await GQLAuthUser.findById({_id:currentUser})
            return `Querry performed by user ${currentUser.email}`
            }
            return "User Not Logged In"
        },
        getUsers:async(parent:any, args:any, context:any, info:any)=>
        await getAllUsers(context)
            
        
    },
    Mutation: {
        registerUser: async (parent: any, args: any, context: any, info: any) =>
            await regUser(args),
        loginUser: async (parent: any, args: any, context: any, info: any) => 
            await loginUser(args)

        
    }
}