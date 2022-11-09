import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    REGISTER,
    PURGE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { clientsApi } from "./api/clientsApi";
import { gisApi } from "./api/gisApi";
import { login } from "./api/login";
import { managerApi } from "./api/managerApi";
import { ticketApi } from "./api/ticketApi";
import currentUserReducer from './slice/currentUserSlice'

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: {
        [clientsApi.reducerPath]: clientsApi.reducer,
        [login.reducerPath]: login.reducer,
        [ticketApi.reducerPath]: ticketApi.reducer,
        [gisApi.reducerPath]: gisApi.reducer,
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
        .concat(clientsApi.middleware).concat(gisApi.middleware).concat(ticketApi.middleware)
})

export const persistor = persistStore(store)
export default store