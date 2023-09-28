import { signinSchema } from "../modules/Auth/Auth.validation.js"
const dataMethod=['body','query','params','headers']
 const validation=(schema)=>{
    return(req,res,next)=>{
       const validationArray=[]
        // const validationSchema=schema.body.validate(req.body,{abortEarly:false})
        // const validationQuery=schema.query.validate(req.body,{abortEarly:false})

        // if(validationSchema?.error){
        //    validationArray.push(validationSchema.error.details)

        // }
        // if(validationQuery?.error){
        //     validationArray.push(validationQuery.error.details)
 
        //  }
        dataMethod.forEach((key)=>{
            if(schema[key]){
                const validationSchema=schema[key].validate(req[key],{abortEarly:false}) 
                if(validationSchema?.error){
                    validationArray.push(validationSchema.error.details)
    
                }
            }
           

        })
         if(validationArray.length>0){
            return res.json({message:"validation error",validationArray})
         }
        else{
           return next()
        }


    }
}

export default validation