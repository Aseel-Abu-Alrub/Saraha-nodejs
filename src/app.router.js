import connectDB from '../DB/connection.js'
import AuthRouter from './modules/Auth/Auth.router.js'
import MessageRouter from './modules/Message/Message.router.js'
import UserRouter from './modules/User/User.router.js'
import cors from 'cors'



const Appinit=(app,express)=>{
    app.use(express.json())
    connectDB()
    app.use(cors())
    app.use('/auth',AuthRouter)
    app.use('/message',MessageRouter)
    app.use('/user',UserRouter)
    app.use('*',(req,res)=>{
         return res.json({message:"page not found"})
    })
}

export default Appinit