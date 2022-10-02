import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../services/UserService';

export const getUserData = createAsyncThunk('user/getData', async( thunkAPI)=> {
    return await UserService.getData();
});
export const getUserDataById = createAsyncThunk('user/getData', async(data, thunkAPI)=> {
    return await UserService.getDataById(data);
});
export const getUserDataByToken = createAsyncThunk('user/getdatabytoken', async(data, thunkAPI)=> {
    return await UserService.getDataByToken(data);
});
export const updateProfile = createAsyncThunk('user/updateData', async(data, thunkAPI)=> {
    return await UserService.profileUpdate(data);
})
export const addFriend = createAsyncThunk('friend/add', async(data, thunkAPI)=> {
    return await UserService.addFriend(data);
})

const initialState = {
    userData: '',
    userDataLoading: false,
    userDataError: false,
    userDataSuccess : false
}
const UserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        reset: (state)=> {
            state.userDataLoading= false;
            state.userDataError= false;
            state.userDataSuccess = false;
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(getUserData.fulfilled, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= false;
            state.userDataSuccess = false;
        
            if(action.payload === "User Already Registered"){
                
            }else{
                state.userData = action.payload
            }
            
        })
        .addCase(getUserData.pending, (state)=> {
            state.userDataLoading= true;

        })
        .addCase(getUserData.rejected, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= true;
            state.userDataSuccess = false;
        })
        .addCase(updateProfile.fulfilled, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= false;
            state.userDataSuccess = false;
        
            if(action.payload === "User Already Registered"){
                
            }else{
                state.userData = action.payload
            }
            
        })
        .addCase(updateProfile.pending, (state)=> {
            state.userDataLoading= true;

        })
        .addCase(updateProfile.rejected, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= true;
            state.userDataSuccess = false;
        })
        .addCase(addFriend.fulfilled, (state, action)=> {
        

                state.userData = action.payload;
            
        })
        .addCase(addFriend.pending, (state)=> {
          

        })
        .addCase(addFriend.rejected, (state, action)=> {
          
        })
        .addCase(getUserDataByToken.fulfilled, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= false;
            state.userDataSuccess = false;
        
            if(action.payload === "User Already Registered"){
                
            }else{
                state.userData = action.payload
            }
            
        })
        .addCase(getUserDataByToken.pending, (state)=> {
            state.userDataLoading= true;

        })
        .addCase(getUserDataByToken.rejected, (state, action)=> {
            state.userDataLoading= false;
            state.userDataError= true;
            state.userDataSuccess = false;
        })

    }
})
export const {reset} = UserDataSlice.actions;
export default UserDataSlice.reducer;