import { gql } from "apollo-server-express"

export const typeDefs = gql`
directive @auth (role:String) on FIELD_DEFINITION
type User {
    email:String 
    userName:String 
    password: String 
    userType :USERTYPES 
    token :String 

}
input loginInput {
    email:String 
    password: String
    userType :USERTYPES

}
input signupInput {
    email:String 
    userName:String 
    password: String 
    userType :USERTYPES
}
enum USERTYPES {
    Admin 
    Boother
}
type Query {
    hello:String @auth (role :"Admin")
    getUsers:[User] @auth (role :"Admin")
}
type Mutation {
    registerUser(user:signupInput):User
    loginUser(user:loginInput):User
}   
`