import express from "express"
import authRouter from "./auth.router"
import userRouter from "./user.router"
import imageRouter from "./image.router"
import commentRouter from "./comment.router"
import saveRouter from "./save.router"
import swaggerUi from "swagger-ui-express"
import { swaggerDocument, swaggerOptions } from "../common/swagger/init.swagger"

const rootRouter = express.Router()

rootRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

rootRouter.use("/auth", authRouter)
rootRouter.use("/user", userRouter)
rootRouter.use("/image", imageRouter)
rootRouter.use("/comment", commentRouter)
rootRouter.use("/save", saveRouter)

export default rootRouter