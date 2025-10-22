import express from 'express';
import rootRouter from './src/routers/root.router';
import { appError } from './src/common/app-error/app-error.error';

const app = express()

const port = 3060;

app.use(express.json())
app.use("/api", rootRouter)
app.use(appError)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
