import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import allUsersSlice from "./allUsersSlice"
import adminSlice from "./adminSlice"
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    user: userSlice,
    allUsers: allUsersSlice,
    admin: adminSlice
  })

const persistConfig = {
    key: "root",
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = configureStore({
    reducer: persistedReducer,
  })

  const persistor = persistStore(store)



// const store= configureStore({
//     reducer: {
//         user: userSlice
//     }
// })



export {persistor, store}