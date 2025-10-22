import { BadRequestException, NotFoundException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const saveService = {
    create: async (req) => {
        const { hinh_id } = req.params;
        const nguoi_dung = req.nguoi_dung;

        const image = await prisma.hinh_anh.findUnique({ where: { hinh_id: +hinh_id } });
        if (!image) throw new NotFoundException("Image not found");

        // Kiểm tra nếu đã lưu rồi thì bỏ qua
        const saved = await prisma.luu_anh.findUnique({
            where: {
                nguoi_dung_id_hinh_id: {
                    nguoi_dung_id: nguoi_dung.nguoi_dung_id,
                    hinh_id: +hinh_id,
                },
            },
        });

        if (saved) throw new BadRequestException("Image already saved");

        const result = await prisma.luu_anh.create({
            data: {
                nguoi_dung_id: nguoi_dung.nguoi_dung_id,
                hinh_id: +hinh_id,
            },
        });

        return result;
    },

    remove: async (req) => {
        const { hinh_id } = req.params;
        const nguoi_dung = req.nguoi_dung;

        await prisma.luu_anh.delete({
            where: {
                nguoi_dung_id_hinh_id: {
                    nguoi_dung_id: nguoi_dung.nguoi_dung_id,
                    hinh_id: +hinh_id,
                },
            },
        });

        return { message: "Image unsaved successfully" };
    },

    findByUser: async (req) => {
        const { nguoi_dung_id } = req.params;

        const savedImages = await prisma.luu_anh.findMany({
            where: { nguoi_dung_id: +nguoi_dung_id },
            orderBy: { ngay_luu: "desc" },
            select: {
                nguoi_dung_id: true,
                ngay_luu: true,
                hinh_anh: {
                    select: {
                        hinh_id: true,
                        ten_hinh: true,
                        mo_ta: true,
                    },
                },
            },
        });

        return savedImages;
    },

    findByImage: async (req) => {
        const { hinh_id } = req.params;

        const users = await prisma.luu_anh.findMany({
            where: { hinh_id: +hinh_id },
            orderBy: { ngay_luu: "desc" },
            select: {
                hinh_id: true,
                ngay_luu: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        anh_dai_dien: true,
                    },
                },
            },
        });

        return users;
    },

    checkSaved: async (req) => {
        const nguoi_dung = req.nguoi_dung;
        const { hinh_id } = req.params;

        // Kiểm tra xem ảnh có tồn tại không
        const image = await prisma.hinh_anh.findUnique({
            where: { hinh_id: +hinh_id },
            select: { hinh_id: true, ten_hinh: true }
        });

        if (!image) throw new NotFoundException("Image not found")

        // Kiểm tra xem người dùng đã lưu ảnh chưa
        const isSaved = await prisma.luu_anh.findUnique({
            where: {
                nguoi_dung_id_hinh_id: {
                    nguoi_dung_id: nguoi_dung.nguoi_dung_id,
                    hinh_id: +hinh_id,
                },
            },
        });

        // Trả kết quả tương ứng
        if (isSaved) {
            return {
                saved: true,
                message: `Image ${image.ten_hinh} has already been saved.`,
            };
        }

        return {
            saved: false,
            message: `Image ${image.ten_hinh} has not been saved yet.`,
        };
    },
};