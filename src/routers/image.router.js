import express from "express";
import { protect } from "../common/middlewares/protect.middleware";
import { uploadCloud } from "../common/multer/cloud.multer";
import { imageController } from "../controllers/image.controller";

const imageRouter = express.Router();

// Upload ảnh mới (yêu cầu login)
imageRouter.post("/", protect, uploadCloud.single("hinh_anh"), imageController.create);

// Danh sách ảnh 
imageRouter.get("/", imageController.findAll);

// Danh sách ảnh đã tạo theo user id
imageRouter.get("/user/:nguoi_dung_id", imageController.findByUser);

// Chi tiết ảnh
imageRouter.get("/:id", imageController.detail);

// Tìm kiếm ảnh theo tên
imageRouter.get("/search/name", imageController.searchByName);

// Xoá ảnh (chủ sở hữu)
imageRouter.delete("/:id", protect, imageController.remove);

export default imageRouter;
