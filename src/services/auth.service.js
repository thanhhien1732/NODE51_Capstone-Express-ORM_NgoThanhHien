import { sendMail } from "../common/nodemailer/init.nodemailer";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt"
import { tokenService } from "./token.service";
import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper";

export const authService = {
    register: async function (req) {
        const { email, mat_khau, ho_ten, tuoi } = req.body

        const userExits = await prisma.nguoi_dung.findUnique({
            where: {
                email: email
            }
        })

        if (userExits) {
            throw new BadRequestException("Account already exists!")
        }

        // Mã hóa mật khẩu
        const matKhauHash = bcrypt.hashSync(mat_khau, 10)  // Băm 10 lần

        const userNew = await prisma.nguoi_dung.create({
            data: {
                email: email,
                mat_khau: matKhauHash,
                ho_ten: ho_ten,
                tuoi: tuoi
            }
        })

        console.log({ userNew })

        delete userNew.mat_khau

        return userNew;
    },

    login: async function (req) {
        const { email, mat_khau } = req.body

        const userExits = await prisma.nguoi_dung.findUnique({
            where: {
                email: email
            }
        })

        if (!userExits) throw new BadRequestException("User does not exist, please register!")

        const isMatKhau = bcrypt.compareSync(mat_khau, userExits.mat_khau);
        if (!isMatKhau) throw new BadRequestException("Incorrect password")

        const tokens = tokenService.createTokens(userExits.nguoi_dung_id)

        console.log({ email, mat_khau })

        sendMail(email) // gửi mail khi login

        return tokens;
    },

    refreshToken: async (req) => {
        const { accessToken, refreshToken } = req.body

        const decodeAccessToken = tokenService.verifyAccessToken(accessToken, { ignoreExpiration: true })
        const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken)

        if (decodeAccessToken.nguoi_dung_id !== decodeRefreshToken.nguoi_dung_id) throw new UnauthorizedException("Token Invalid")

        const user = await prisma.nguoi_dung.findUnique({
            where: {
                nguoi_dung_id: decodeRefreshToken.nguoi_dung_id
            }
        })

        if (!user) throw new UnauthorizedException("User Invalid")

        const tokens = tokenService.createTokens(user.nguoi_dung_id)

        console.log({ accessToken, refreshToken, decodeAccessToken, decodeRefreshToken })

        return tokens
    },
};