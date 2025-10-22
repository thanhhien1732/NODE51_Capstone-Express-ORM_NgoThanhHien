import multer from "multer"

const storage = multer.memoryStorage()
export const uploadCloud = multer({ storage: storage })