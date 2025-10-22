export const imageSwagger = {
    "/image": {
        post: {
            tags: ["Image"],
            summary: "Thêm hình ảnh mới",
            security: [{ AuthBearer: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                hinh_anh: { type: "string", format: "binary" },
                                mo_ta: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: { 200: { description: "Upload ảnh thành công" } }
        },
        get: {
            tags: ["Image"],
            summary: "Lấy danh sách tất cả hình ảnh",
            responses: { 200: { description: "Danh sách hình ảnh" } }
        },
    },


    "/image/user/{nguoi_dung_id}": {
        get: {
            tags: ["Image"],
            summary: "Lấy danh sách ảnh của một người dùng",
            parameters: [
                { name: "nguoi_dung_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Danh sách ảnh theo user" } }
        }
    },

    "/image/search/name": {
        get: {
            tags: ["Image"],
            summary: "Tìm kiếm hình ảnh theo tên",
            parameters: [
                { name: "keyword", in: "query", schema: { type: "string" } }
            ],
            responses: { 200: { description: "Kết quả tìm kiếm" } }
        }
    },

    "/image/{id}": {
        get: {
            tags: ["Image"],
            summary: "Lấy chi tiết hình ảnh",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Chi tiết hình ảnh" } }
        },
        delete: {
            tags: ["Image"],
            summary: "Xóa hình ảnh",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Xóa thành công" } }
        }
    }
};
