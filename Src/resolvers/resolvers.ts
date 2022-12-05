import { regUser } from "./regUser"
import { loginUser } from "./loginUser"
import { getAllUsers } from "./getAllUsers"
export const resolvers = {
    Query: {
        hello: async (parent: any, args: any, context: any, info: any) => {
            return `Querry performed by user `
        },
        getUsers: async (parent: any, args: any, context: any, info: any) =>
            await getAllUsers(context)
    },
    Mutation: {
        registerUser: async (parent: any, args: any, context: any, info: any) =>
            await regUser(args),
        loginUser: async (parent: any, args: any, context: any, info: any) =>
            await loginUser(args)
    }
}