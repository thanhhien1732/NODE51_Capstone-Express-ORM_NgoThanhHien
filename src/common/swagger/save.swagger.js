export const saveSwagger = {
    "/save/{hinh_id}": {
        post: {
            tags: ["Save"],
            summary: "Lưu ảnh vào tài khoản người dùng",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "hinh_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Lưu ảnh thành công" } }
        },
        delete: {
            tags: ["Save"],
            summary: "Bỏ lưu ảnh đã lưu",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "hinh_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Bỏ lưu ảnh thành công" } }
        }
    },

    "/save/user/{nguoi_dung_id}": {
        get: {
            tags: ["Save"],
            summary: "Lấy danh sách ảnh mà user đã lưu",
            parameters: [
                { name: "nguoi_dung_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Danh sách ảnh đã lưu của user" } }
        }
    },

    "/save/image/{hinh_id}": {
        get: {
            tags: ["Save"],
            summary: "Lấy danh sách người dùng đã lưu ảnh này",
            parameters: [
                { name: "hinh_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Danh sách người dùng đã lưu ảnh" } }
        }
    },

    "/save/check/{hinh_id}": {
        get: {
            tags: ["Save"],
            summary: "Kiểm tra người dùng hiện tại đã lưu ảnh hay chưa",
            security: [{ AuthBearer: [] }],
            parameters: [
                { name: "hinh_id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: { 200: { description: "Kết quả kiểm tra lưu ảnh" } }
        }
    },
};
