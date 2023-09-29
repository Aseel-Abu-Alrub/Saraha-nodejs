import mongoose from "mongoose";

const connectDB=async()=>{
    return await mongoose.connect("mongodb+srv://aseel:aseel123@cluster0.jpifjev.mongodb.net/sarahaa")
    .then(()=>{
        console.log("connct to DB");
    }).catch((err)=>{
        console.log("error to  connct  DB");

    })
}

export default connectDB