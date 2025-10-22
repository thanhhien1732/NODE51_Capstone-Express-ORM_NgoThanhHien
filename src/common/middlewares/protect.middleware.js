import { tokenService } from "../../services/token.service"
import { UnauthorizedException } from "../helpers/exception.helper"
import prisma from "../prisma/init.prisma"

export const protect = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) throw new UnauthorizedException("Not Authorization") // 401: Logout người dùng

    const [type, accessToken] = authorization?.split(" ")
    if (type !== "Bearer") throw new UnauthorizedException("Type Token Unvalid")
    if (!accessToken) throw new UnauthorizedException("Not Access Token")

    const { nguoi_dung_id } = tokenService.verifyAccessToken(accessToken)

    const nguoi_dung = await prisma.nguoi_dung.findUnique({
        where: {
            nguoi_dung_id: nguoi_dung_id
        }
    })

    if (!nguoi_dung) throw new UnauthorizedException("Not User")

    req.nguoi_dung = nguoi_dung

    next()
}