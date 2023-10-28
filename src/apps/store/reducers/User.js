import {createSlice} from "@reduxjs/toolkit";
import Interjson from './Interjson.json'
const initialState={
    allUserList:[
        ...Interjson.Interns
    ],
}
const users = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUserList(state,action){
            state.allUserList.unshift(action.payload)
        },
        
        editUserList(state,action){
            const index = state.allUserList.findIndex((item) => item?.Id === action.payload.Id);
            if (index > -1) {
              state.allUserList[index] = {
                ...state.allUserList[index],
                Name: action.payload.Name,
                Email: action.payload?.Email,
                FatherName: action.payload?.FatherName,
                MotherName: action.payload?.MotherName,
                Address: action.payload?.Address,
                Colleage: action.payload?.Colleage,
                Degree: action.payload.Degree,
                Year: action.payload?.Year,
                Batch: action.payload?.Batch,
              };        }
    },
deleteUserData(state,action){
  const deleteId = state.allUserList.findIndex((item) => item.Id === action.payload);
  state.allUserList.splice(deleteId,1);

    }

}})

export const {addUserList,editUserList,deleteUserData}=users.actions;
export default users.reducer;