import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loading:false,
    signupData:null,
    token: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
}
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSignUpData(state,value){
            state.signupData=value.payload
        }
    }
})

export const {setLoading,setSignUpData,setToken}=authSlice.actions;

export default authSlice.reducer