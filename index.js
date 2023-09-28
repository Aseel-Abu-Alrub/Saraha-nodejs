import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import Appinit from "./src/app.router.js";
const app=express()
const PORT=process.env.PORT || 4000;

Appinit(app,express)
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} `);
})