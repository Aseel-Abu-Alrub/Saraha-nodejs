import jwt from 'jsonwebtoken'
import userModel from '../../DB/Models/User.model.js'

export const auth=async(req,res,next)=>{

const{authorization}=req.headers
if(!authorization?.startsWith(process.env.BEARERKEY)){
    return res.json({message:"invalidd authorization"})
}

const token=authorization.split(process.env.BEARERKEY)[1]

if(!token){
    return res.json({message:"invalid authorization"})
  
}
const decoded=jwt.verify(token,process.env.LOGINTOKEN)

const authUser= await userModel.findById(decoded.id).select('userName email ')
req.user=authUser

next();

}