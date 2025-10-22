export const commentSwagger = {
    "/comment": {
        post: {
            tags: ["Comment"],
            summary: "Thêm bình luận mới cho hình ảnh",
            security: [{ AuthBearer: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                hinh_id: { type: "integer" },
                                noi_dung: { type: "string" }
                            },
                            required: ["hinh_id", "noi_dung"]
                        }
                    }
                }
            },
            responses: { 200: { description: "Thêm bình luận thành công" } }
        }
    },

    "/comment/{hinh_id}": {
        get: {
            tags: ["Comment"],
            summary: "Lấy danh sách bình luận của một hình ảnh",
            parameters: [
                { name: "hinh_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Danh sách bình luận" } }
        }
    },

    "/comment/user/{nguoi_dung_id}": {
        get: {
            tags: ["Comment"],
            summary: "Lấy toàn bộ bình luận của một người dùng",
            parameters: [
                { name: "nguoi_dung_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Danh sách bình luận của user" } }
        }
    },

    "/comment/{id}": {
        put: {
            tags: ["Comment"],
            summary: "Sửa bình luận",
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
                                noi_dung: { type: "string", example: "Bình luận đã chỉnh sửa" }
                            }
                        }
                    }
                }
            },
            responses: { 200: { description: "Cập nhật bình luận thành công" } }
        },
        delete: {
            tags: ["Comment"],
            summary: "Xóa bình luận",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Xóa bình luận thành công" } }
        }
    },
};
