import axios from "axios";



const API_URL = "/api/user";

const getData  = async()=>{
    const resp = await axios.post(API_URL + "/data/");
    return resp.data;
}
const getDataById  = async(data)=>{
    const resp = await axios.post(API_URL + `/data/${data}`);
    return resp.data;
}
const getDataByToken = async(data)=> {
    const resp = await axios.post(API_URL + `/data/${data}`);
    return resp.data;
}

const profileUpdate = async(data)=> {
    const resp = await axios.post(API_URL+'/profile/edit', data);
    return resp.data;
}
const addFriend = async(data)=> {
    const resp = await axios.post(API_URL+'/addfriend', data);
    return resp.data;
}
const UserService = {
    getData,
    getDataByToken,
    profileUpdate,
    addFriend,
    getDataById
}
export default UserService;