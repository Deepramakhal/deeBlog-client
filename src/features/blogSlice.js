import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

export const fetchResult = createAsyncThunk(
    'search/fetchResult',
    async(searchTerm) =>{
        const response = await axios.get('api/blogs/search',{
            params:{
                q:searchTerm
            }
        });
        // console.log(response);
        
        return response.data.data;
    }
) 

const searchSlice = createSlice({
    name:'search',
    initialState:{
        searchTerm: '',
        searchResult:[],
        status: 'idle',
        error: null
    },
    reducers:{
        setSearchTerm(state,action){
            state.searchTerm = action.payload
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchResult.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchResult.fulfilled,(state,action)=>{
            state.status = 'succeeded',
            state.searchResult = action.payload;
        })
        .addCase(fetchResult.rejected,(state,action)=>{
            state.status = 'failed',
            state.error = action.error.message;
        })
    }
})

export const {setSearchTerm} = searchSlice.actions; 

export default searchSlice.reducer;