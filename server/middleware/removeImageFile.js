import fs from "fs/promises";
import { findOneImage } from "../model/imageDA0.js";

export const removeImageFile = async (req, res, next) => {
    const id = req.params.id;
    try {
        const image = await findOneImage(id);
        if(image){
            const path = `./public/images/${image.filename}`;
            await fs.unlink(path);
        }
        next();

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
