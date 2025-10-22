import { responseSuccess } from "../common/helpers/response.helper";
import { saveService } from "../services/save.service";

export const saveController = {
    create: async (req, res, next) => {
        const result = await saveService.create(req);
        const response = responseSuccess(result, "Save image successfully");
        res.status(response.statusCode).json(response);
    },

    remove: async (req, res, next) => {
        const result = await saveService.remove(req);
        const response = responseSuccess(result, "Unsave image successfully");
        res.status(response.statusCode).json(response);
    },

    findByUser: async (req, res, next) => {
        const result = await saveService.findByUser(req);
        const response = responseSuccess(result, "Get saved images successfully");
        res.status(response.statusCode).json(response);
    },

    findByImage: async (req, res, next) => {
        const result = await saveService.findByImage(req);
        const response = responseSuccess(result, "Get users who saved image successfully");
        res.status(response.statusCode).json(response);
    },

    checkSaved: async (req, res, next) => {
        const result = await saveService.checkSaved(req);
        const response = responseSuccess(result, "Check save status successfully");
        res.status(response.statusCode).json(response);
    },
};