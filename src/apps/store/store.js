import { configureStore } from '@reduxjs/toolkit';
import Users from "../store/reducers/User"

export const store=configureStore({
    reducer:{
        users:Users
    }

})
