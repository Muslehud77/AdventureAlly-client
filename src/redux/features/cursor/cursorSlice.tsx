import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";




const initialState = {
   isBig : false
}


const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers:{
    controlSize : (state,action)=>{
        state.isBig = action.payload
    }
  }
});

export default cursorSlice.reducer

export const {controlSize} = cursorSlice.actions

export const selectCursor = (state:RootState)=>state.cursor.isBig