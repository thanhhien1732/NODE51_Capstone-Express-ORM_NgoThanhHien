import { responseError } from "../helpers/response.helper"
import jwt from "jsonwebtoken"
import { statusCodes } from "../helpers/status-code.helper"

export const appError = (err, req, res, next) => {
    console.log(`middleware đặc biệt`, err)

    if (err instanceof jwt.JsonWebTokenError) err.code = statusCodes.UNAUTHORIZED  // Token sai trả 401
    if (err instanceof jwt.TokenExpiredError) err.code = statusCodes.FORBIDDEN     // Token hết hạn trả 403

    const resData = responseError(err?.message, err?.code, err?.stack)
    res.status(resData.statusCode).json(resData)
}