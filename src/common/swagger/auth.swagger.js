export const authSwagger = {
    "/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Đăng ký tài khoản mới",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "user@gmail.com" },
                                mat_khau: { type: "string", example: "123456" },
                                ho_ten: { type: "string", example: "Nguyen Van A" },
                                tuoi: { type: "integer", example: 25 }
                            },
                            required: ["email", "mat_khau", "ho_ten"]
                        }
                    }
                }
            },
            responses: {
                200: { description: "Đăng ký thành công" }
            }
        }
    },

    "/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Đăng nhập hệ thống",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "user@gmail.com" },
                                mat_khau: { type: "string", example: "123456" }
                            },
                            required: ["email", "mat_khau"]
                        }
                    }
                }
            },
            responses: {
                200: { description: "Đăng nhập thành công, trả về access/refresh token" }
            }
        }
    },

    "/auth/refresh-token": {
        post: {
            tags: ["Auth"],
            summary: "Làm mới access token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accessToken: { type: "string" },
                                refreshToken: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Tạo access token mới thành công" }
            }
        }
    }
};
