import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAbutton from './CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='py-20 w-11/12  mx-auto max-w-maxContent flex items-center gap-20'>
      {/* image */}
      <div>
        <img className=' shadow-instructorimageshadow' src={Instructor}></img>
      </div>
      {/* text and button */}
      <div className=' flex flex-col gap-16 w-[50%]'>
        <div className=' flex flex-col gap-4'>
                <div>
                        <div className=' font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#F1F2FF]'>Become an</div>
                        <div className='font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]'>
                        <HighlightText  text={"instructor"}></HighlightText>
                    </div>
                </div>
                
            <div className=' text-richblack-300 text-[16px] font-inter font-medium leading-[24px]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
        </div>
        
        <div className=' flex'>
            <CTAbutton  active={true} linkTo={"/signup"}><div className=' flex items-center gap-[8px] font-semibold '>Start Teaching Today <FaArrowRight></FaArrowRight></div></CTAbutton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
