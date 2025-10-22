export const userSwagger = {
    "/user/avatar-cloud": {
        post: {
            tags: ["User"],
            summary: "Upload ảnh đại diện người dùng lên Cloudinary",
            security: [{ AuthBearer: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                anh_dai_dien: { type: "string", format: "binary" }
                            }
                        }
                    }
                }
            },
            responses: { 200: { description: "Upload thành công" } }
        }
    },

    "/user": {
        get: {
            tags: ["User"],
            summary: "Lấy danh sách tất cả người dùng",
            parameters: [
                {
                    name: "page",
                    in: "query",
                    type: "number"
                },

                {
                    name: "pageSize",
                    in: "query",
                    type: "number"
                },
            ],
            responses: {
                200: { description: "Danh sách người dùng" }
            }
        }
    },

    "/user/{id}": {
        get: {
            tags: ["User"],
            summary: "Lấy thông tin chi tiết người dùng theo ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: {
                200: { description: "Thông tin người dùng" }
            }
        },
        put: {
            tags: ["User"],
            summary: "Cập nhật thông tin người dùng",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                ho_ten: { type: "string" },
                                tuoi: { type: "integer" },
                                mat_khau: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: { 200: { description: "Cập nhật thành công" } }
        },
        delete: {
            tags: ["User"],
            summary: "Xóa tài khoản người dùng",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Xóa thành công" } }
        }
    }
};
