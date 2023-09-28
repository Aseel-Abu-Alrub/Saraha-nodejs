import userModel from "../../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signinSchema, signupSchema } from "../Auth.validation.js";
import sendmail from "../../../services/sendEmail.js";

export const signup=async(req,res,next)=>{
    
// const validation=signupSchema.validate(req.body,{abortEarly:false})
// if(validation?.error){
//     return res.json(validation.error.details)

// }
const{userName,email,password,gender}=req.body;
const user=await userModel.findOne({email});
if(user){
    return res.status(409).json({message:"Email exists"})
}
const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALTROUND))

const createUser=await userModel.create({userName,email,password:hashedPassword,gender})
const token=jwt.sign({email},process.env.EMAILTOKEN)
const refreshToken=jwt.sign({email},process.env.EMAILTOKEN)

const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
const refreshLink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`

const html=`<a href=${link}>verify email </a> <br /> <br /> or <a href=${refreshLink}> request new email to verify your email</a> `
sendmail(email,"confirm email",html)
return res.status(201).json({message:'success',user:createUser})


}

export const signin=async(req,res)=>{
    // const validation=signinSchema.validate(req.body,{abortEarly:false})
    // if(validation?.error){
    //     return res.json(validation.error.details)

    // }
const{email,password}=req.body

const user=await userModel.findOne({email})
if(!user){
    return res.json({message:"Invalid data"})
}
if(!user.confirmEmail){
    return res.status(400).json("plz confirm your email")
}
const match=bcrypt.compareSync(password,user.password)

if(!match){
 return res.json({message:"Invalid data"}) 

}
const token=jwt.sign({id:user._id},process.env.LOGINTOKEN)
return res.json({message:"success",token})



}

export const confirmEmail=async(req,res,next)=>{
    // return res.json(req.params.email)
    const {token}=req.params
    const decoded=jwt.verify(token,process.env.EMAILTOKEN)
    const user=await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true})

// return res.json({message:"your email is confirmed, plz login"})

if(!user){
    return res.status(400).json({message:"your email is verified"})
}
else{
    return res.redirect(process.env.FRONTEND_LOGIN)
}
}

export const confirmNewEmail=async(req,res,next)=>{
    const{refreshToken}=req.params
    const decoded=jwt.verify(refreshToken,process.env.EMAILTOKEN)
    const token=jwt.sign({email:decoded.email},process.env.EMAILTOKEN)

const link=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`

const html=`<a href=${link}>verify email</a>  `
sendmail(decoded.email,"confirm email",html)
 return res.json({message:"new email is sent succsefuly"})

}