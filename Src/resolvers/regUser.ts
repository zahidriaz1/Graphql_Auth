import GQLAuthUser from "../models/user.model"
import { ApolloError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const privateKey = process.env.PRIVATEKEY!
export const regUser = async (args: any) => {
    try {
        const { email, userName, password, userType } = args.user
        let encryptedhash = await bcrypt.hash(password, 10)
        let userexist = await GQLAuthUser.findOne({ email: email })
        if (userexist) {
            return new ApolloError("User email already registered with email" + email, "USER_ALREADY_EXISTS")
        }
        let newUser = new GQLAuthUser({ email, userName, password: encryptedhash, userType })
        let token = jwt.sign({ user_id: newUser._id, email },
            privateKey, { expiresIn: "2h" });
        newUser.token = token
        const res = await newUser.save()
        return res
        } catch (e) {
        console.log("Error while registering user", e);

    }
}