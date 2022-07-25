import { Router } from "express";
import imageController from "../controller/imageCtrl.js";
import { uploadFile } from "../helper/fileUploader.js";
import { removeImageFile } from "../middleware/removeImageFile.js";

const router = Router();

router.route("/")
    .get(imageController.getImages)
    .post(uploadFile.single('file'),imageController.postImage);

router.route("/:id")
    .put(imageController.updateImage)
    .delete(removeImageFile,imageController.removeImage);


export default router;