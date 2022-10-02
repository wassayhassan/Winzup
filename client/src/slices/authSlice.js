import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
let user;

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", ()=> {
  user =  JSON.parse(xhr.responseText);

});
xhr.open('POST', '/api/user/token', false);
xhr.send()


const initialState = {
    token: user? user.token:null,
    userData: user? user.userData: null,
    isLoading : false,
    isError: false,
    isSuccess: false,
    message: '',
    getTokenLoading: false

}


export const register = createAsyncThunk('user/register', async(userData, thunkAPI)=> {
    try{
        const respons = await AuthService.register(userData);
        return respons;
    }catch(err){
        const message = (err.response && err.response.data && err.response.message) || err.message || err.toString();
        thunkAPI.rejectWithValue(message);
    }
})
export const login = createAsyncThunk('user/login', async(userData, thunkAPI)=> {
    try{
        const respon = await AuthService.login(userData);
        console.log(respon);
        return respon;
    }catch(err){
        const message = (err.response && err.response.data && err.response.message) || err.message || err.toString();
        thunkAPI.rejectWithValue(message);
    }
});
export const getToken = createAsyncThunk('user/token', async(thunkAPI)=> {
   
    try{
       
        const respon = await AuthService.gettoken();
        return respon;
    }catch(err){
        const message = (err.response && err.response.data && err.response.message) || err.message || err.toString();
        thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('user/logout', async(thunkAPI)=> {
    try{
        const respon = await AuthService.logout();
        console.log(respon);
        return respon;
    }catch(err){
        const message = (err.response && err.response.data && err.response.message) || err.message || err.toString();
        thunkAPI.rejectWithValue(message);
    }
});
export const addFriend = createAsyncThunk('friend/add', async(data, thunkAPI)=> {
    return await AuthService.addFriend(data);
})
export const remFreind = createAsyncThunk('friend/rem', async(data, thunkAPI)=> {
    return await AuthService.remFriend(data);
})


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isError = false;
            state.isLoading = false;
            state.message  = ''
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(register.fulfilled, (state, action)=> {
            state.isSuccess  = true;
            state.isLoading = false;
            state.isError  = false;
        
            if(action.payload === "User Already Registered"){
                state.message = action.payload;
            }
            
        })
        .addCase(register.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(register.rejected, (state, action)=> {
            state.isError = true;
            state.isLoading = false;
            state.userData = null;
            state.message = action.payload;
        })
        .addCase(login.pending, (state)=> {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action)=> {
             state.isLoading = false;
            state.isSuccess = true;
            state.message = '';
            if(action.payload === "No User Found"){
                state.message = action.payload;
            }else if(action.payload === "Wrong Password"){
                state.message = action.payload;
            }else{
                state.token = action.payload.token;
                state.userData = action.payload.userData;
            }
            
        })
         .addCase(login.rejected , (state, action)=> {
             state.isLoading = false;
             state.isError = true;
             state.message = action.payload;
             state.user = null;
         })

         .addCase(logout.pending, (state)=> {
            state.isLoading = true;
         })
         .addCase(logout.fulfilled, (state, action)=> {
             state.isLoading = false;
            state.isSuccess = true;
             state.message = '';
             state.token = null;
             state.userData = null;
            
            
        })
         .addCase(logout.rejected , (state, action)=> {

         })


         .addCase(getToken.pending, (state)=> {
            state.getTokenLoading = true;
         })
         .addCase(getToken.fulfilled, (state, action)=> {
             state.getTokenLoading = false;
            if(action.payload === "No User Found"){
                state.message = action.payload;
            }else if(action.payload === "Wrong Password"){
                state.message = action.payload;
            }else{
                state.message = '';
                state.token = action.payload.token;
                state.userData = action.payload.userData;
            }
            console.log(state.user);
        })
         .addCase(getToken.rejected , (state, action)=> {
             state.getTokenLoading = false;
             state.user = null;
         })
         .addCase(addFriend.fulfilled, (state, action)=> {
            state.userData = action.payload;
           })
           .addCase(remFreind.fulfilled, (state, action)=> {
            state.userData = action.payload;
           })
        
    }
    
});
export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer