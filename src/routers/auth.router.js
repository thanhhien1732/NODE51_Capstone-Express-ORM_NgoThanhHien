import express from 'express';
import { authController } from '../controllers/auth.controller';
import { protect } from '../common/middlewares/protect.middleware';
import { checkPermission } from '../common/middlewares/check-permission.middleware';

const authRouter = express.Router();

// Đăng ký
authRouter.post('/register', authController.register);

//Đăng nhập
authRouter.post('/login', authController.login);

// Refesh Token
authRouter.post('/refresh-token', authController.refreshToken);

export default authRouter;