import { BadRequestException } from "../helpers/exception.helper"
import prisma from "../prisma/init.prisma"

export const checkPermission = async (req, res, next) => {
    const user = req?.user
    if (!user) {
        console.log(`User Not Found In Protect`)
        throw new BadRequestException("User Not Found")
    }

    // role admin thì cho qua
    if (user.roleId === 1) {
        next()
        return
    }

    //method
    const method = req.method

    //endpoint
    const endpoint = req.baseUrl + req.route?.path  // /api/auth + /get-info

    const rolePermissionExist = await prisma.rolePermission.findFirst({
        where: {
            roleId: user.roleId,
            Permissions: {
                endpoint: endpoint,
                method: method,
            },

            isActive: true
        }
    })

    if (!rolePermissionExist) {
        throw new BadRequestException("User not Permission")
    }

    next()
}