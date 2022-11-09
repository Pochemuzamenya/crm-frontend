import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:'',
    firstname: '',
    lastname: '',
    avatarURL: '',
}

const managerSlice = createSlice({
    name: 'currentManager',
    initialState,
    reducers: {
        setCurrentManager(state, action) {
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.avatarURL = action.payload.avatarURL
        }
    }
})

export default managerSlice.reducer
export const { setCurrentManager } = managerSlice.actions