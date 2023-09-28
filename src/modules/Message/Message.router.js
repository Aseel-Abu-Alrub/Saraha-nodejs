import express from "express";
import * as messageController from './Controller/Message.controller.js'
import { asyncHandler } from "../../middleware/errorHandling.js";
import { auth } from "../../middleware/Auth.middleware.js";
const app=express();

app.post('/sendMessage/:recieverId',asyncHandler(messageController.sendMessage))
app.get('/',auth,asyncHandler(messageController.getMessages))

export default app