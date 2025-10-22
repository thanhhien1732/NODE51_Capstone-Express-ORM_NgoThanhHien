import { responseSuccess } from "../common/helpers/response.helper";
import { imageService } from "../services/image.service";

export const imageController = {
    create: async (req, res, next) => {
        const result = await imageService.create(req);
        const response = responseSuccess(result, "Upload image successfully");
        res.status(response.statusCode).json(response);
    },

    findAll: async (req, res, next) => {
        const result = await imageService.findAll(req);
        const response = responseSuccess(result, "Get all images successfully");
        res.status(response.statusCode).json(response);
    },

    findByUser: async (req, res, next) => {
        const result = await imageService.findByUser(req);
        const response = responseSuccess(result, "Get images by user successfully");
        res.status(response.statusCode).json(response);
    },

    detail: async (req, res, next) => {
        const result = await imageService.detail(req);
        const response = responseSuccess(result, `Get image #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    searchByName: async (req, res, next) => {
        const result = await imageService.searchByName(req);
        const response = responseSuccess(result, "Search images successfully");
        res.status(response.statusCode).json(response);
    },

    remove: async (req, res, next) => {
        const result = await imageService.remove(req);
        const response = responseSuccess(result, `Delete image #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },
};
