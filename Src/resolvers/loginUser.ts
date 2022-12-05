import GQLAuthUser from "../models/user.model"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const privateKey = process.env.PRIVATEKEY!
export const loginUser = async (args: any) => {

    const { email, password } = args.user
    let userexist = await GQLAuthUser.findOne({ email: email })
    if (!userexist) {
        throw new Error("No Found against this email ")
    }
    if (userexist && await bcrypt.compare(password, userexist.password)) {
        let token = jwt.sign({ user_id: userexist._id, email },
            privateKey, { expiresIn: "5h" });
        userexist.token = token
        return userexist
    }
    throw new Error("Incorrect Password")

}