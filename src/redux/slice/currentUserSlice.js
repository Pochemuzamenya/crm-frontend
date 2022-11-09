import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    manager: {},
    token: '',
    isAuth: false,
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        logout: () => initialState,
        setCurrentUser(state, action) {
            state.manager = action.payload.manager
            state.token = action.payload.token
            state.isAuth = true
        }
    }
})

export default currentUserSlice.reducer
export const { setCurrentUser } = currentUserSlice.actions
export const { logout } = currentUserSlice.actions