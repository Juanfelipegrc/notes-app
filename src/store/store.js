import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlices";
import { notesSlice } from "./slices/notes/notesSlice";


export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        notes: notesSlice.reducer,
    }
})