import { authSwagger } from "./auth.swagger";
import { commentSwagger } from "./comment.swagger";
import { imageSwagger } from "./image.swagger";
import { saveSwagger } from "./save.swagger";
import { userSwagger } from "./user.swagger";

export const swaggerDocument = {
    openapi: "3.1.1",

    info: {
        title: "Capstone Express ORM",
        version: "1.0.0"
    },

    servers: [
        {
            url: "http://localhost:3060/api",
            description: "Server BE Local"
        },
    ],

    components: {
        securitySchemes: {
            AuthBearer: {
                type: "http",
                scheme: "bearer"
            }
        }
    },

    paths: {
        ...authSwagger,
        ...userSwagger,
        ...imageSwagger,
        ...commentSwagger,
        ...saveSwagger,
    },
}

export const swaggerOptions = {
    swaggerOptions: {
        persistAuthorization: true, 
    },
};