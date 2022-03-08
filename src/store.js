
import employeeReduce from './features/employee';
import { configureStore } from '@reduxjs/toolkit'; 

export default configureStore({
    reducer:{
        employee: employeeReduce,
    }
})


