import GQLAuthUser from "../models/user.model"
import { ApolloError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const privateKey = process.env.PRIVATEKEY!
export const loginUser = async (args: any) => {
        console.log("Any Args", args)
        const { email, password, userType } = args.user
        
        console.log("password",password)
        let userexist = await GQLAuthUser.findOne({ email: email })
        console.log("userexist", userexist)

        if (!userexist) {
            console.log("No User");
            throw new Error("No Found against this email ")
        }
        if(userexist && await bcrypt.compare(password,userexist.password)){
            let token = jwt.sign({ user_id: userexist._id, email },
                privateKey, { expiresIn: "2h" });
            console.log("token", token)
            let decoded = jwt.verify(token, privateKey)
            console.log("Decoded", decoded)
            userexist.token=token
            return userexist
        }
        throw new Error("No Found against this email ")
        // console.log("user Exists",userexist);
        // let newUser = new GQLAuthUser({ email, userName, password: encryptedhash, userType })
        // let token = jwt.sign({ user_id: newUser._id, email },
        //     privateKey, { expiresIn: "2h" });
        // console.log("token", token)
        // newUser.token = token
        // const res = await newUser.save()
        // console.log("New user ", res)
}