// import images from '../data/images.js';
import { findAllImages,insertOneImage,updateImage,deleteOneImage } from '../model/imageDA0.js';

const imageController = {
    /* should return an array of images */
    getImages: async (req, res) => {
        try {
            const result = await findAllImages();
            console.table(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    /* should save an image */
    postImage: async (req, res) => {
        try {

            if(!req.file || !req.body.name){
                res.status(400).json({error:"No file uploaded"});
            }
            const {filename} = req.file;
            const {name} = req.body;

            const image = {name,filename};

            const result = await insertOneImage(image);
            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateImage: async (req,res) => {
        try {
            if(!req.body.name){
                res.status(400).json({error:"No name"});
            }
            const id = req.params.id;
            const name = req.body.name;
            const result = await updateImage({id,name});
            res.json(result);



        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    removeImage: async (req,res)=>{
        try {
            const id = req.params.id;
            const result = await deleteOneImage(id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default imageController;

