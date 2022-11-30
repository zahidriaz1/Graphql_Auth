import {gql} from "apollo-server-express"
export const typeDefs =gql`

type User {
    email:String 
    userName:String 
    password: String 
    userType :String
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
}
type Mutation {
    registerUser(user:signupInput):String
    loginUser(user:loginInput):String
}

`