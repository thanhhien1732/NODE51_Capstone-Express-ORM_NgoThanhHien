import { responseSuccess } from "../common/helpers/response.helper";
import { authService } from "../services/auth.service";

export const authController = {
    register: async function (req, res, next) {
        const result = await authService.register(req);
        const response = responseSuccess(result, `Register successfully`);
        res.status(response.statusCode).json(response);
    },

    login: async function (req, res, next) {
        const result = await authService.login(req);
        const response = responseSuccess(result, `Login successfully`);
        res.status(response.statusCode).json(response);
    },

    refreshToken: async function (req, res, next) {
        const result = await authService.refreshToken(req);
        const response = responseSuccess(result, `Refresh Token Successfully`);
        res.status(response.statusCode).json(response);
    },
};