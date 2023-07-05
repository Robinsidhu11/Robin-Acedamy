import React from 'react'
import frameback from '../../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
const Template = ({title,description1,description2,formType,image}) => {
  return (
    <div className=' w-11/12 max-w-[1200px] mx-auto flex flex-row justify-between items-center my-36'>
    {/* left side */}
    <div className=' flex flex-col gap-[27px] w-[40%] '>
        {/* title  */}
        <div className=' text-[30px] font-inter font-semibold leading-[38px] text-richblack-5'>{title}</div>
        {/* descriptions */}
        <div>
            <div className=' text-[18px] font-inter font-normal leading-[26px] text-[#AFB2BF]'>{description1}</div>
            <div className=' text-[16px] leading-[26px] text-blue-100 font-edu-sa italic font-bold'>{description2}</div>
        </div>
        {/* form section */}
        {formType=="login"?<LoginForm></LoginForm>:<SignUpForm></SignUpForm>}
    </div>
    {/* right side */}
      <div className=' relative'>
        <img src={image} className='w-[440px] h-[406px] absolute top-[-5%] left-[-3.4%] z-10' ></img>
        <div className='frame w-[440px] h-[406px]'><img src={frameback}></img></div>
      </div>
    </div>
  )
}

export default Template
