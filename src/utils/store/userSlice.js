
import { createSlice } from "@reduxjs/toolkit"



const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        image: "",
        success: false
    },
    reducers: {
        login: (state, action) => {
           const {user,success} = action.payload
           state.name= user.name
           state.email= user.email
           state.success= success
           state.image= user.image
        },
        logout: (state) => {
            state.name = ''
            state.email = ''
            state.image = ''
            state.success= false
        }
    }
})


export const { login, logout } = userSlice.actions
export default userSlice.reducer