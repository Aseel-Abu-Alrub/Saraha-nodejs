import mongoose,{Schema,Types,model} from "mongoose";

const messageSchema=new Schema({
message:{
  type:String,
  required:true  
},
recieverId:{
    type:Types.ObjectId,
    required:true,
    ref:'User'
}
},{
    timestamps:true
})

const messageModel=mongoose.models.Message || model('Message',messageSchema)
export default messageModel