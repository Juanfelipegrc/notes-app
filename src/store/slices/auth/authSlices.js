import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        status: 'checking',
        displayName: null,
        uid: null,
        email: null,
        photoUrl: null,
        errorMessage: null

    },
    reducers: {
        login: (state, action) =>{
            state.status = 'authenticated'
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
            state.errorMessage = null;
        },
        logout: (state, {payload}) =>{
            state.status = 'not-authenticated'
            state.displayName = null;
            state.uid = null;
            state.email = null;
            state.photoUrl = null;
            state.errorMessage = payload;
        },
        checkingCredentials: (state, action) =>{
            state.status = 'checking';
        },
        deleteErrorMessage: (state) => {
            state.errorMessage = null;
        }
    }
});


export const { login, logout, checkingCredentials, deleteErrorMessage } = authSlice.actions;