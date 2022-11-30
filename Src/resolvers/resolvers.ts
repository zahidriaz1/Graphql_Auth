import GQLAuthUser from "../models/user.model"
import {ApolloError} from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const privateKey = process.env.PRIVATEKEY!
export const resolvers ={
    Query:{
        hello:()=>{
            return "Query Woking fine"
        }
    },
    Mutation:{
        registerUser: async(parent:any ,args:any, context:any ,  info:any)=>{
            try{
                const {email, userName, password, userType} = args.user
                let encryptedhash =await bcrypt.hash(password,10)
                console.log("ARGS", encryptedhash)


                let userexist = await GQLAuthUser.findOne({email:email})
                if(userexist){
                    return new ApolloError("User email already registered with email"+email, "USER_ALREADY_EXISTS")
                    // return "User email already registered"
                }

                let newUser = new GQLAuthUser({email, userName, password: encryptedhash, userType})
                let token = jwt.sign({user_id: newUser._id, email},
                    privateKey, {expiresIn:"2h"});
                    console.log("token", token)
                    newUser.token = token
                    const res= await newUser.save()
                    console.log("New user ", newUser)
                    return token
               
            }catch(e){
                console.log("Error while registering user",e);
                
            }
         
        },
        loginUser:async (parent:any,args:any,context:any,info:any) => {
            console.log("Args = ", args)
            const {email, password} = args.user;
            console.log("email = ", email);
            const isUser = await GQLAuthUser.findOne({email:email});
            console.log("isUser", isUser)
            if (!isUser){
                return new ApolloError("No user found with this email")
            }
            if (isUser&& await bcrypt.compare(password, isUser.password)){
            console.log("here");
            
                let token = jwt.sign({user_id: isUser._id, email},
                    privateKey, {expiresIn:"2h"});
                    isUser.token = token
                    console.log("User logged = ", isUser)
                return "User logged in successfully"
            }
            return "Invalid Password"
        }
    }
}