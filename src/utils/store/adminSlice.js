import { createSlice } from "@reduxjs/toolkit";



const adminSlice= createSlice({
    name:'admin',
    initialState: false,
    reducers:{
        login:(state)=>{
            return true
        },
        logout:(state)=>{
            return false
        }
    }
})

export default adminSlice.reducer
export const {login, logout} = adminSlice.actions