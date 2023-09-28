import joi from 'joi';

export const signupSchema=joi.object({
        userName:joi.string().required().alphanum(),
        email:joi.string().email().required(),
        gender:joi.string().valid('Male','Female'),
        age:joi.number().integer().min(20).max(40),
        password:joi.string().required(),
        confirmPassword:joi.string().valid(joi.ref('password')).required().messages({'any.only':"incorrect confirm password"})
    })
    // query:joi.object({
    //    test:joi.boolean().required() 
    // })


 
export const signinSchema=joi.object({
    email:joi.string().email().required().messages({
    'string.empty':"email is required",
    'string.email':"plz enter a valid email"
}),
    password:joi.string().required().messages({
        'string.empty':"password is required",
    })
})