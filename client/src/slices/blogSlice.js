import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../services/blogService";

const initialState = {
    blogs: [],
    isLoading : false,
    isError: false,
    isSuccess: false,
    message: '',
}
export const getAll = createAsyncThunk('blogs/get', async(thunkAPI)=> {
    const response = await blogService.getAll();
    return response;
});
export const upload = createAsyncThunk('blog/upload', async(blogDat, thunkAPI)=> {
    const response = await blogService.upload(blogDat);
    return response;
})
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(getAll.fulfilled, (state, action)=> {
            state.isSuccess  = true;
            state.isLoading = false;
            state.isError  = false;
        
            if(action.payload === null){
                state.message = action.payload;
            }else{
                state.blogs = action.payload
            }
            
        })
        .addCase(getAll.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(getAll.rejected, (state, action)=> {
            state.isError = true;
            state.isLoading = false;
            state.blogs = null;
            state.message = action.payload;
        })
        .addCase(upload.fulfilled, (state, action)=> {
            state.isSuccess  = true;
            state.isLoading = false;
            state.isError  = false;
            console.log(action);
        
            if(action.payload === null){
                state.message = action.payload;
            }else{
                state.blogs.push({...action.payload});
            }
            
        })
        .addCase(upload.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(upload.rejected, (state, action)=> {
            state.isError = true;
            state.isLoading = false;
            state.blogs = null;
            state.message = action.payload;
        })
    }
})
export default blogSlice.reducer;