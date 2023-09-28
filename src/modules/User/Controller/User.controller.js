export const profile=(req,res)=>{
    return res.json({message:"success",user:req.user})
}