import axios from "axios";
//${process.env.REACT_APP_API_URL}/ || `http://localhost:3456/api/image`
const baseUrl = `${process.env.REACT_APP_API_URL}/api/image` || `http://localhost:3456/api/image`
const serviceImage = {

    async getAll():Promise<Image[]> {
        console.log('api_url',baseUrl);
        const response = await axios.get(baseUrl)
        return response.data
    },

    // async getOne(id:string):Promise<Image>{
    //     const response = await axios.get(baseUrl.concat('/',id))
    //     return response.data
    // },

    async save(image:FormData):Promise<any>{
        const response = await axios.post(baseUrl,image,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    },

    async update(image:any):Promise<null>{
        console.log('update',image);
        if(image._id){
            const response = await axios.put(baseUrl.concat('/',image._id),image)
            return response.data
        }
        return null
    },

    async delete(id:string):Promise<Image>{
        console.log('id',id)
        const response = await axios.delete(baseUrl.concat('/',id))
        return response.data
    }

}

export default serviceImage