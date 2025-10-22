import express from 'express';
import { protect } from '../common/middlewares/protect.middleware';
import { uploadCloud } from '../common/multer/cloud.multer';
import { userController } from '../controllers/user.controller';

const userRouter = express.Router();

// Upload ảnh đại diện người dùng lên Cloudinary
userRouter.post('/avatar-cloud', protect, uploadCloud.single('anh_dai_dien'), userController.avatarCloud);

// Lấy danh sách tất cả user
userRouter.get('/', userController.findAll);

// Lấy thông tin 1 user theo id
userRouter.get('/:id', userController.findOne);

// Cập nhật thông tin cá nhân
userRouter.put('/:id', userController.update);

// Xóa tài khoản người dùng
userRouter.delete('/:id', userController.remove);

export default userRouter;