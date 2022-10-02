import axios from "axios";



const API_URL = "/api/user";

const register = async(user)=> {
    const resp = await axios.post(API_URL + "/register", user);
    console.log(resp.data);
    return resp.data;

}
const login = async(user)=> {
    const resp = await axios.post(API_URL + "/login", user);
    return resp.data;
}
const logout = async(u)=> {
    const resp = await axios.post(API_URL + "/logout");
    return resp.data;
}
const gettoken = async()=> {
    console.log("function gettoken called");
    const resp = await axios.post(API_URL + "/token");
    return resp.data;
}
const addFriend = async(data)=> {
    const resp = await axios.post(API_URL+'/addfriend', data);
    return resp.data;
}
const remFriend = async(data)=> {
    const resp = await axios.post(API_URL+'/removefriend', data);
    return resp.data;
}
const AuthService = {
    register,
    login,
    logout,
    gettoken,
    addFriend,
    remFriend
}
export default AuthService;