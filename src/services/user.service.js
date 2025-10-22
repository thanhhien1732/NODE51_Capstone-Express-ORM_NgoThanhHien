import cloudinary from "../common/cloudinary/init.cloudinary";
import { BadRequestException, NotFoundException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";

export const userService = {
    avatarCloud: async function (req) {
        console.log(req.file)
        if (!req.file) {
            throw new BadRequestException("Not Found File")
        }

        const nguoi_dung = req.nguoi_dung

        // đưa hình lên cloud
        const byteArrayBuffer = req.file.buffer
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "images", resource_type: "auto" },
                (error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(byteArrayBuffer);
        });

        await prisma.nguoi_dung.update({
            where: {
                nguoi_dung_id: nguoi_dung.nguoi_dung_id
            },

            data: {
                anh_dai_dien: uploadResult.public_id
            }
        })

        // Xóa avatar cũ khi upload avtar mới
        if (nguoi_dung.anh_dai_dien) {
            cloudinary.uploader.destroy(nguoi_dung.anh_dai_dien)
        }

        return {
            anh_dai_dien: uploadResult.public_id,
            url: uploadResult.secure_url
        };
    },

    findAll: async function (req) {
        let { page, pageSize, filters } = req.query

        page = +page > 0 ? +page : 1
        pageSize = +pageSize > 0 ? +pageSize : 10

        // Chuyển filters từ object sang json
        filters = JSON.parse(filters || "{}") || {};

        const index = (page - 1) * pageSize

        // Chuyển filters từ json thành object
        Object.entries(filters).forEach(([key, value]) => {
            console.log({ key, value })
            if (value === null || value === undefined || value === '') {
                delete filters[key]
                return
            }

            if (typeof value === "string") {
                filters[key] = {
                    contains: value
                }
            }
        })

        const usersPromise = prisma.nguoi_dung.findMany({
            skip: index,

            take: pageSize,

            where: {
                ...filters,
            },

            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
                ngay_tao: true
            }
        })

        const totalItemPromise = prisma.nguoi_dung.count({ where: filters });

        const [users, totalItem] = await Promise.all([usersPromise, totalItemPromise])

        const totalPage = Math.ceil(totalItem / pageSize)

        return {
            page,
            pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: users || [],
        };
    },

    findOne: async function (req) {
        const nguoi_dung = await prisma.nguoi_dung.findUnique({
            where: {
                nguoi_dung_id: +req.params.id, // fix key param
            },
            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
                ngay_tao: true
            }
        });

        if (!nguoi_dung) {
            throw new BadRequestException("Người dùng không tồn tại");
        }

        return nguoi_dung;
    },

    update: async function (req) {
        const { email, ho_ten, tuoi, mat_khau } = req.body;
        const id = +req.params.id;

        const userExisted = await prisma.nguoi_dung.findUnique({
            where: { nguoi_dung_id: id },
        });
        if (!userExisted) {
            throw new NotFoundException("User not found");
        }

        const dataUpdate = {};
        if (email) dataUpdate.email = email;
        if (ho_ten) dataUpdate.ho_ten = ho_ten;
        if (tuoi) dataUpdate.tuoi = +tuoi;
        if (mat_khau) {
            const hash = bcrypt.hashSync(mat_khau, 10);
            dataUpdate.mat_khau = hash;
        }

        const userUpdated = await prisma.nguoi_dung.update({
            where: { nguoi_dung_id: id },
            data: dataUpdate,
            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
                ngay_tao: true,
            },
        });

        return userUpdated;
    },

    remove: async function (req) {
        const id = +req.params.id;

        const userExisted = await prisma.nguoi_dung.findUnique({
            where: { nguoi_dung_id: id },
        });
        if (!userExisted) {
            throw new NotFoundException("User not found");
        }

        await prisma.nguoi_dung.delete({
            where: { nguoi_dung_id: id },
        });

        return { message: `User #${id} deleted successfully` };
    },
};