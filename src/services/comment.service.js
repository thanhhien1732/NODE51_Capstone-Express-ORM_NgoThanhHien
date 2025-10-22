import { BadRequestException, NotFoundException, UnauthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const commentService = {
    create: async (req) => {
        const { hinh_id, noi_dung } = req.body;
        const nguoi_dung = req.nguoi_dung;

        if (!hinh_id || !noi_dung) {
            throw new BadRequestException("Missing hinh_id or noi_dung");
        }

        const image = await prisma.hinh_anh.findUnique({
            where: { hinh_id: +hinh_id },
        });
        if (!image) throw new NotFoundException("Image not found");

        const newComment = await prisma.binh_luan.create({
            data: {
                noi_dung,
                hinh_id: +hinh_id,
                nguoi_dung_id: nguoi_dung.nguoi_dung_id,
            },
            select: {
                binh_luan_id: true,
                noi_dung: true,
                ngay_binh_luan: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        email: true,
                        anh_dai_dien: true,
                    },
                },
            },
        });

        return newComment;
    },

    findByImage: async (req) => {
        const hinh_id = +req.params.hinh_id;

        const image = await prisma.hinh_anh.findUnique({
            where: { hinh_id },
        });
        if (!image) throw new NotFoundException("Image not found");

        const comments = await prisma.binh_luan.findMany({
            where: { hinh_id },
            orderBy: { ngay_binh_luan: "desc" },
            select: {
                binh_luan_id: true,
                noi_dung: true,
                ngay_binh_luan: true,
                nguoi_dung: {
                    select: {
                        ho_ten: true,
                        anh_dai_dien: true,
                    },
                },
            },
        });

        return comments;
    },

    findByUser: async (req) => {
        const { nguoi_dung_id } = req.params;

        const comments = await prisma.binh_luan.findMany({
            where: { nguoi_dung_id: +nguoi_dung_id },
            orderBy: { ngay_binh_luan: "desc" },
            select: {
                binh_luan_id: true,
                noi_dung: true,
                ngay_binh_luan: true,
                hinh_anh: {
                    select: {
                        ten_hinh: true,
                        mo_ta: true,
                    },
                },
            },
        });

        return comments;
    },

    update: async (req) => {
        const { id } = req.params;
        const { noi_dung } = req.body;
        const nguoi_dung = req.nguoi_dung;

        const comment = await prisma.binh_luan.findUnique({ where: { binh_luan_id: +id } });
        if (!comment) throw new NotFoundException("Comment not found");

        if (comment.nguoi_dung_id !== nguoi_dung.nguoi_dung_id) {
            throw new UnauthorizedException("You cannot edit this comment");
        }

        const updated = await prisma.binh_luan.update({
            where: { binh_luan_id: +id },
            data: { noi_dung },
            select: {
                binh_luan_id: true,
                noi_dung: true,
                ngay_binh_luan: true,
            },
        });

        return updated;
    },

    remove: async (req) => {
        const { id } = req.params;
        const nguoi_dung = req.nguoi_dung;

        const comment = await prisma.binh_luan.findUnique({ where: { binh_luan_id: +id } });
        if (!comment) throw new NotFoundException("Comment not found");

        if (comment.nguoi_dung_id !== nguoi_dung.nguoi_dung_id) {
            throw new UnauthorizedException("You cannot delete this comment");
        }

        await prisma.binh_luan.delete({ where: { binh_luan_id: +id } });
        return { message: `Comment #${id} deleted successfully` };
    },
};