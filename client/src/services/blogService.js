import axios from "axios";



const API_URL = "/api/blogs";

const getAll = async()=> {
    const res = await axios.post(API_URL+ '/getall');
   return res.data;
}
const upload = async(blogdat)=> {
    const res = await axios.post(API_URL+'/upload', blogdat);
    return res.data;
}
const blogService = {
    getAll,upload
}
export default blogService;