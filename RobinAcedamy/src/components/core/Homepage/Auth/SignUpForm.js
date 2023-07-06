import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setSignUpData } from '../../../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { sendOTP } from '../../../../services/operations/AuthAPI'
const SignUpForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [accountType,setAccountType]=useState("Student")
  const [showPassword1,setShowPassword1]=useState(false)
  const [showPassword2,setShowPassword2]=useState(false)
  const [formData,setFormData]=useState({email:"",password:"",confirmPassword:"",firstName:"",lastName:"",accountType:"Student"})
  function tabChangeHandler(event){
    setAccountType(event.target.innerText)
    setFormData((prev)=>{
      return {...prev,["accountType"]:event.target.innerText}
    })
  }
  function submitHandler(event){
    event.preventDefault()
    //if paswsword doesnt match dont let the request to send OTP occur nor update state of signup data
    if(formData.password!==formData.confirmPassword){
      toast.error("Passwords doesn't match")
      return
    }
    // console.log(formData)

    // Setting formup data to state
    // To be used after otp verification
    dispatch(setSignUpData(formData))
    // Send OTP to user for verification
    dispatch(sendOTP(formData.email,navigate))
  }
  function changeHandler(event){
    setFormData((prev)=>{
      return {...prev,
      [event.target.name]:event.target.value
      }
    })
  }
  return (
    <div className='flex flex-col gap-4'>
        {/* student & instructor tab */}
        <div className='flex bg-richblack-800 p-1 gap-x-1  rounded-full max-w-max' style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}>
          <div onClick={tabChangeHandler} name="accountType" className={` cursor-pointer ${accountType=="Student"?"bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>Student</div>
          <div onClick={tabChangeHandler} name="accountType" className={` cursor-pointer ${accountType=="Instructor"?"bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>Instructor</div>
        </div>
        <form onSubmit={submitHandler} className=' flex flex-col gap-4' >
            {/* first and last name */}
            <div className='flex  w-full justify-between '>
                  {/* firstName */}
                  <div className='flex flex-col w-[48%] gap-2 '>
                    <label htmlFor='firstname' ><span className='mb-1 text-[0.875rem] text-richblack-5'>First Name </span><sup className="text-pink-200">*</sup></label>
                    <input onChange={changeHandler} required className=" outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" type='text' placeholder='Enter first name' id='firstname' name='firstName'style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}></input>
                  </div>
                  {/* lastName */}
                  <div className='flex flex-col w-[48%] gap-2 '>
                    <label htmlFor='lastname' ><span className='mb-1 text-[0.875rem] text-richblack-5'>Last Name </span><sup className="text-pink-200">*</sup></label>
                    <input onChange={changeHandler} required className=" outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" type='text' placeholder='Enter last name' id='lastname' name='lastName'style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}></input>
                  </div>
            </div>
            {/* email */}
            <div>
                  <label  className=' text-richblack-5'>Email Address <sup className=' text-pink-200'>*</sup><input onChange={changeHandler} required className=' mt-2 w-full p-[12px] bg-richblack-800 text-white rounded-[0.5rem] outline-none' style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}} type='email' placeholder='Enter email address' id='Email' name='email' autoComplete="true"></input></label>
            </div>
            {/* passwords create and confirm div */}
            <div className=' flex w-full justify-between'>
                {/* create password */}
                <div className='flex flex-col w-[48%] gap-2 relative '>
                      <label htmlFor='currentpassword' ><span className='mb-1 text-[0.875rem] text-richblack-5'>Create Password </span><sup className="text-pink-200">*</sup></label>
                      <input onChange={changeHandler} required className=" pr-10 outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" type={`${showPassword1?"text":"password"}`} placeholder='Enter password' id='currentpassword' name='password'style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}></input>
                {/* eye */}
                <div onClick={()=>setShowPassword1(!showPassword1)} className="cursor-pointer absolute right-3 top-12 text-[20px] text-richblack-5">
                  {showPassword1?<AiOutlineEyeInvisible></AiOutlineEyeInvisible>:<AiOutlineEye></AiOutlineEye>}
                </div>
                
                </div>
                {/* confirm */}
                <div className='flex flex-col w-[48%] gap-2 relative '>
                      <label htmlFor='confirmpassword' ><span className='mb-1 text-[0.875rem] text-richblack-5'>Confirm Password </span><sup className="text-pink-200">*</sup></label>
                      <input onChange={changeHandler} required className=" pr-10 outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" type={`${showPassword2?"text":"password"}`} placeholder='Confirm password' id='confirmpassword' name='confirmPassword'style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}></input>
                {/* eye */}
                <div onClick={()=>setShowPassword2(!showPassword2)} className="cursor-pointer absolute right-3 top-12 text-[20px] text-richblack-5">
                  {showPassword2?<AiOutlineEyeInvisible></AiOutlineEyeInvisible>:<AiOutlineEye></AiOutlineEye>}
                </div>
                
                </div>
            </div>
            <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Create Account</button>
        </form>
    </div>
    
  )
}

export default SignUpForm
