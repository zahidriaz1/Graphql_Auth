import { gql } from "apollo-server-express"
export const typeDefs = gql`

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
    hello:String
    getUsers:[User]
}

directive @auth(
    requires: USERTYPES!,
  ) on FIELD_DEFINITION

type Mutation {
    registerUser(user:signupInput):User
    loginUser(user:loginInput):User
}   
`