import employeeReducer from './features/employee';
import { configureStore } from '@reduxjs/toolkit'; 

export default configureStore({
    reducer:{
        employee: employeeReducer,
    }
})