import mongoose from "mongoose"; 
const dbUri:string = process.env.DBURI !;

export const connectDb=async()=>{
    try{
        await mongoose.connect(dbUri)
        console.log("DB connected Successfully")
    }catch(e){
        console.log("Error while connecting to db ", e);
    }
}