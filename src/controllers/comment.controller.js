import { responseSuccess } from "../common/helpers/response.helper";
import { commentService } from "../services/comment.service";

export const commentController = {
    create: async (req, res, next) => {
        const result = await commentService.create(req);
        const response = responseSuccess(result, "Create comment successfully");
        res.status(response.statusCode).json(response);
    },

    findByImage: async (req, res, next) => {
        const result = await commentService.findByImage(req);
        const response = responseSuccess(result, "Get comments successfully");
        res.status(response.statusCode).json(response);
    },

    findByUser: async (req, res, next) => {
        const result = await commentService.findByUser(req);
        const response = responseSuccess(result, "Get user comments successfully");
        res.status(response.statusCode).json(response);
    },

    update: async (req, res, next) => {
        const result = await commentService.update(req);
        const response = responseSuccess(result, "Update comment successfully");
        res.status(response.statusCode).json(response);
    },

    remove: async (req, res, next) => {
        const result = await commentService.remove(req);
        const response = responseSuccess(result, "Delete comment successfully");
        res.status(response.statusCode).json(response);
    },
};