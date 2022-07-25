import connection from "../database/mongoManager.js";
import {config} from "../config.js";
import { ObjectId } from "mongodb";

export const findAllImages = async () => {
    const conn = await connection(config);
    const images = await conn.db().collection("images").find({}).toArray();
    conn.close();
    return images;
};

export const findOneImage = async (id) => {
    const _id = new ObjectId(id);
    const conn = await connection(config);
    const image = await conn.db().collection("images").findOne({_id});
    conn.close();
    return image;
};

export const insertOneImage = async (image) => {
    const conn = await connection(config);
    const result = await conn.db().collection("images").insertOne(image);
    conn.close();
    return result;
};

export const updateImage = async (image) => {
    const {id,name}=image;
    const _id = new ObjectId(id);
    const conn = await connection(config);
    const result = await conn.db().collection("images").findOneAndUpdate({_id}, {$set:{name}}, {returnOriginal:false});
    conn.close();
    return result;
};

export const deleteOneImage = async (id) => {
    const _id = new ObjectId(id);
    const conn = await connection(config);
    const result = await conn.db().collection("images").deleteOne({_id});
    console.log(result);
    conn.close();
    return result;
};

