import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/blogSlice.js"

const store = configureStore({
    reducer:{
        search: searchReducer
    }
})

export default store