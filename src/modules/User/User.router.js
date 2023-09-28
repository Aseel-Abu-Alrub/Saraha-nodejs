import express from "express";
import * as userController from './Controller/User.controller.js'
import { auth } from "../../middleware/Auth.middleware.js";
import { asyncHandler } from "../../middleware/errorHandling.js";
const app=express();

app.get('/',auth,asyncHandler(userController.profile))

export default app   