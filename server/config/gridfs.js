import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

console.log("Mongo URI:", process.env.MONGO_URI);
const storage = new GridFsStorage({
url: process.env.MONGO_URI,
file: (req,file) => {
return {
bucketName: "uploads",
filename: Date.now() + "-" + file.originalname
};
}
});

const upload = multer({ storage });


export default upload;
