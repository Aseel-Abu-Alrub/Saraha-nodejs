import mongoose from "mongoose";

const connectDB=async()=>{
    return await mongoose.connect(process.env.LOCAL_DB)
    .then(()=>{
        console.log("connct to DB");
    }).catch((err)=>{
        console.log("error to  connct  DB");

    })
}

export default connectDB