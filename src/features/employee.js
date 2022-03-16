import { createSlice} from "@reduxjs/toolkit";
import { dataListEmployee } from "../assets/data";


//create slice employee 
const employeeSlice= createSlice({
    name:'employee',
    initialState:{
        listEmployee: dataListEmployee,
        newEmployeeCreated:null,
    },
    reducers:{
        addNewEmployee:(draft,action)=>{
            const newEmployee = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                dateOfBirth: action.payload.dateOfBirth,
                startDate: action.payload.startDate,
                department: action.payload.department,
                street: action.payload.street,
                city: action.payload.city,
                state: action.payload.state,
                zipCode: action.payload.zipCode,
            }
            draft.newEmployeeCreated = newEmployee
            draft.listEmployee = [...draft.listEmployee, newEmployee]
            return
         
        }
    }
})

const { actions, reducer } = employeeSlice
export const { addNewEmployee } = actions
export default reducer

/**
 * 
 */