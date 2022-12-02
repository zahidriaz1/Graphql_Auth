import { model, Schema } from "mongoose";

 const userSchema = new Schema({
    email:{type:String, unique:true, required:true} ,
    userName:{type:String, unique:true},
    password: {type:String, required:true},
    userType :{type:String, required:true},
    token :{type:String}
})

const GQLAuthUser= model("GQLAuthUser", userSchema)
export default GQLAuthUser