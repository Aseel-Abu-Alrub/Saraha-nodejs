import express from "express";
import * as AuthController from './Controller/Auth.controller.js'
import { asyncHandler } from "../../middleware/errorHandling.js";
import { signinSchema, signupSchema } from "./Auth.validation.js";
import validation from "../../middleware/validation.js";
const app=express();

app.post('/signup',validation(signupSchema),asyncHandler(AuthController.signup))
app.post('/signin',validation(signinSchema),asyncHandler(AuthController.signin))
app.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))
app.put('/newConfirmEmail/:refreshToken',asyncHandler(AuthController.confirmNewEmail))


export default app