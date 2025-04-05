import express from 'express';
import { loginUser,registerUser,adminLogin,subscribe,resetPassword,forgotPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/subscribe',subscribe)
userRouter.post('/forgotpassword',forgotPassword)
userRouter.post('/resetpassword',resetPassword)

export default userRouter;