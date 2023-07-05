import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { authEndPoints } from "../api"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import resetCart from '../../slices/cartSlice'
const{SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API}=authEndPoints


export const handleLogin= (email,password,navigate)=>{
    return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
        console.log("login addres is ",LOGIN_API)
        
        const response=await apiConnector("POST",LOGIN_API,{email,password})
        console.log("Login api response, ",response.data)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Login Successfull")
        dispatch(setToken(response.data.token))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/dashboard")
    }
    catch(err){
        console.log("LOGIN API ERROR............", err)
        toast.error(err.response.data.message)
        if(err.response.data.message=="User not registered. Please Signup")
        {
            navigate("/signup")
        }
     
    }
    
    toast.dismiss(toastId)
}
}

export const handleSignup= (accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate)=>{
    return async (dispatch) => {
        
    const toastId = toast.loading("Loading...")
    try{
        console.log("signup addres is ",SIGNUP_API)
        
        const response=await apiConnector("POST",SIGNUP_API,{accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp})
        console.log("signup api response, ",response.data)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Signup Successfull")
        // navigator('/loggeddashboard')
        navigate("/login")
    }
    catch(err){
        console.log("Signup API ERROR............", err)
        toast.error("Signup Failed")
    }
    
    toast.dismiss(toastId)
}
}

export const handleLogout=(navigate)=>{
    return async (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}