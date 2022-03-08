import { createSlice} from "@reduxjs/toolkit"


const employeeSlice= createSlice({
    name:'employee',
    initialState:{
        listEmployee:{}
    },
    reducers:{
        addNewEmployee:(state,action)=>{
            return{
                ...state,
                listEmployee:state.listEmployee+action.payload
            }
        }
    }
})

const { actions, reducer } = employeeSlice
export const { addNewEmployee } = actions
export default reducer