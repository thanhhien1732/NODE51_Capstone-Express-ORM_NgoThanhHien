import prisma from "../common/prisma/init.prisma";
import cloudinary from "../common/cloudinary/init.cloudinary";
import { BadRequestException, UnauthorizedException, NotFoundException } from "../common/helpers/exception.helper";

export const imageService = {
    create: async function (req) {
        const nguoi_dung = req.nguoi_dung;
        if (!req.file) throw new BadRequestException("Missing image file");

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "images", resource_type: "auto" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(req.file.buffer);
        });

        const { originalname } = req.file;
        const { secure_url, public_id } = uploadResult;

        const newImage = await prisma.hinh_anh.create({
            data: {
                ten_hinh: originalname,
                duong_dan: secure_url,
                public_id: public_id,
                mo_ta: req.body.mo_ta || "",
                nguoi_dung_id: nguoi_dung.nguoi_dung_id,
            },
        });

        return newImage;
    },

    findAll: async function (req) {
        // Nhận optional query limit từ frontend
        let { limit } = req.query;

        // Nếu không có limit → mặc định 50 ảnh (tránh quá tải)
        limit = +limit > 0 ? +limit : 50;

        const images = await prisma.hinh_anh.findMany({
            take: limit,
            orderBy: { ngay_tao: "desc" },
            select: {
                hinh_id: true,
                ten_hinh: true,
                mo_ta: true,
                ngay_tao: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        anh_dai_dien: true,
                    },
                },
            },
        });

        return {
            totalItem: images.length,
            items: images,
        };
    },

    findByUser: async (req) => {
        const { nguoi_dung_id } = req.params;

        // Kiểm tra user có tồn tại hay không
        const user = await prisma.nguoi_dung.findUnique({
            where: { nguoi_dung_id: +nguoi_dung_id },
            select: {
                nguoi_dung_id: true,
                ho_ten: true,
                anh_dai_dien: true
            }
        });

        if (!user) throw new NotFoundException("User not found")

        // Lấy danh sách ảnh user đã đăng
        const images = await prisma.hinh_anh.findMany({
            where: { nguoi_dung_id: +nguoi_dung_id },
            orderBy: { ngay_tao: "desc" },
            select: {
                hinh_id: true,
                ten_hinh: true,
                mo_ta: true,
                duong_dan: true,
                ngay_tao: true,
            },
        });

        return {
            user,
            totalImages: images.length,
            items: images,
        };
    },

    detail: async function (req) {
        const id = +req.params.id;
        const image = await prisma.hinh_anh.findUnique({
            where: { hinh_id: id },
            select: {
                hinh_id: true,
                ten_hinh: true,
                duong_dan: true,
                mo_ta: true,
                ngay_tao: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        anh_dai_dien: true,
                    },
                },
                binh_luan: {
                    orderBy: { ngay_binh_luan: "desc" },
                    select: {
                        noi_dung: true,
                        ngay_binh_luan: true,
                        nguoi_dung: {
                            select: {
                                nguoi_dung_id: true,
                                ho_ten: true,
                                anh_dai_dien: true,
                            },
                        },
                    },
                },
            },
        });
        if (!image) throw new NotFoundException("Image not found");
        return image;
    },

    searchByName: async function (req) {
        const { keyword } = req.query;
        if (!keyword) throw new BadRequestException("Keyword required");

        const results = await prisma.hinh_anh.findMany({
            where: {
                ten_hinh: { contains: keyword },
            },
            select: {
                hinh_id: true,
                ten_hinh: true,
                mo_ta: true,
            },
        });

        return results;
    },

    remove: async function (req) {
        const id = +req.params.id;
        const nguoi_dung = req.nguoi_dung;

        const image = await prisma.hinh_anh.findUnique({ where: { hinh_id: id } });
        if (!image) throw new NotFoundException("Image not found");

        if (image.nguoi_dung_id !== nguoi_dung.nguoi_dung_id) {
            throw new UnauthorizedException("You cannot delete this image");
        }

        // Xoá trên Cloudinary
        if (image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        // Xoá trong DB
        await prisma.hinh_anh.delete({ where: { hinh_id: id } });

        return { message: `Image #${id} deleted successfully` };
    },
};
