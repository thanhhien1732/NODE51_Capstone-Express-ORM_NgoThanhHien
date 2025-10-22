import express from 'express';
import { commentController } from '../controllers/comment.controller';
import { protect } from '../common/middlewares/protect.middleware';

const commentRouter = express.Router();

// Thêm bình luận (yêu cầu đăng nhập)
commentRouter.post("/", protect, commentController.create);

// Lấy danh sách bình luận theo hình ảnh
commentRouter.get("/:hinh_id", commentController.findByImage);

// Xem tất cả bình luận của 1 người dùng
commentRouter.get("/user/:nguoi_dung_id", commentController.findByUser);

// Sửa nội dung bình luận (chỉ người viết được sửa)
commentRouter.put("/:id", protect, commentController.update);

// Xoá bình luận (chỉ người viết được xoá)
commentRouter.delete("/:id", protect, commentController.remove);

export default commentRouter;