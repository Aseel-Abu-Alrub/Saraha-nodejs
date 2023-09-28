import messageModel from "../../../../DB/Models/Message.model.js"
import userModel from "../../../../DB/Models/User.model.js"

export const getMessages=async(req,res)=>{
const messageList=await messageModel.find({recieverId:req.user._id})
    return res.json({message:"success",messageList})
}

export const sendMessage=async(req,res)=>{
const{recieverId}=req.params
const{message}=req.body

const user=await userModel.findById(recieverId)
if(!user){
    return res.status(404).json({message:"user not found"})

}
else{
    const createMessage=await messageModel.create({message,recieverId}) 
     return res.status(400).json({message:"success"})

}
}