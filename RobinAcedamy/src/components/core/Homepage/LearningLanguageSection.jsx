import React from 'react'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import HighlightText from './HighlightText'
import CTAbutton from './CTAbutton'
const LearningLanguageSection = () => {
  return (
    <div className=' flex flex-col items-center gap-[35px] my-16 mb-20'>
      {/* text */}
      <div className=' flex flex-col items-center gap-[12px]' >
        <div className=' text-center text-[#000814] text-[36px] font-inter font-semibold leading-[44px] tracking-[-0.72px]'>Your swiss knife for <HighlightText text={"learning any language"}></HighlightText> </div>
        <div className=' text-richblack-700 text-[16px] font-inter font-medium leading-[24px] text-center w-[82%]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
      </div>

        {/* 3 images */}
        <div className=' flex justify-center pl-6  items-center  mb-4'>
            <img className=' object-contain -mr-32' src={Know_your_progress}></img>
            <img className=' object-contain ' src={Compare_with_others}></img>
            <img className=' object-contain -ml-36' src={Plan_your_lessons}></img>
        </div>
        {/* button */}
        <CTAbutton active={true} linkTo={"/signup"}>Learn More</CTAbutton>
    </div>
  )
}

export default LearningLanguageSection
