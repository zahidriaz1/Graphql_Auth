import GQLAuthUser from "../models/user.model"

export const getAllUsers = async (context: any) => {
    // let currentUser = context.userId
    // if (!currentUser) {
    //     throw new Error("oops not logged in")
    // }
    const allUsers = await GQLAuthUser.find({})
    return allUsers
}