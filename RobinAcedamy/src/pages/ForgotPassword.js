import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/AuthAPI'
const ForgotPassword = () => {
    const [emailSent,setEmailSent]=useState(false)
    const {loading}=useSelector((state)=>state.auth)
    const [email,setEmail]=useState("")
    const dispatch=useDispatch()
    async function submiHandler(event){
        event.preventDefault()
        dispatch(getPasswordResetToken(email,setEmailSent))
        
    }
  return (
    <div className=' flex justify-center items-center h-[90vh] w-[26%] mx-auto'>
        {loading?<div className="loader"></div>:<div>
            <div className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>{emailSent?"Check email":"Reset your password"}</div>
            <div className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>{emailSent?"We have sent the reset email to rbnsidhu11@gmail.com":"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}</div>
            {
                emailSent===false?<form onSubmit={submiHandler}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
                    className="form-style outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >Submit
            </button>
          </form>:""
            }

            {
                emailSent?<button onClick={()=>{dispatch(getPasswordResetToken(email,setEmailSent))}}
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >Resend Email
            </button>:""
            }

            <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

        </div>
            
            }
        
    </div>
  )
}

export default ForgotPassword
