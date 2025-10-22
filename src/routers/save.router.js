import express from 'express';
import { saveController } from '../controllers/save.controller';
import { protect } from '../common/middlewares/protect.middleware';

const saveRouter = express.Router();

// Lưu 1 ảnh vào tài khoản người dùng
saveRouter.post("/:hinh_id", protect, saveController.create);

// Bỏ lưu 1 ảnh đã lưu
saveRouter.delete("/:hinh_id", protect, saveController.remove);

// Xem tất cả ảnh mà user đã lưu
saveRouter.get("/user/:nguoi_dung_id", saveController.findByUser);

// Xem danh sách user đã lưu ảnh đó
saveRouter.get("/image/:hinh_id", saveController.findByImage);

// Kiểm tra xem người dùng hiện tại đã lưu ảnh đó chưa
saveRouter.get("/check/:hinh_id", protect, saveController.checkSaved);

export default saveRouter;