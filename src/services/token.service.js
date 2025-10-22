import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";

export const tokenService = {
    createTokens: (nguoi_dung_id) => {
        const accessToken = jwt.sign({ nguoi_dung_id: nguoi_dung_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ nguoi_dung_id: nguoi_dung_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    },

    verifyAccessToken: (accessToken, option) => {
        const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, option);
        return decodeAccessToken;
    },

    verifyRefreshToken: (refreshToken) => {
        const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        return decodeRefreshToken;
    },
};
