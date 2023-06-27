import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
const TimelineSection = () => {
    const timeline=[
        {
            logo:Logo1,
            title:"Leadership",
            content:"Fully committed to the success company"
        },
        {
            logo:Logo2,
            title:"Responsibility",
            content:"Students will always be our top priority"
        },
        {
            logo:Logo3,
            title:"Flexibility",
            content:"The ability to switch is an important skills"
        },
        {
            logo:Logo4,
            title:"Solve the problem",
            content:"Code your way to a solution"
        }
    ]
  return (
    <div className='flex items-center my-16'>
      {/* left part */}
      <div className=' flex flex-col   w-[45%] gap-[32px]'>
        {timeline.map((obj,index)=>{
            return(
                <div key={index} className='  '>
                    <div  className=' relative flex flex-row items-center gap-[24px] py-[16px] px-[12px] '>

                    {/* logo */}
                    <div className=' bg-white rounded-full flex justify-center items-center h-[52px] w-[52px]'>
                        <img src={obj.logo}></img>
                    </div>

                    {/* text */}
                    <div className=' flex flex-col gap-[2px]'>
                        <div className=' text-richblack-800 text-[18px] font-inter font-semibold leading-[26px]'>{obj.title}</div>
                        <div className=' text-richblack-700 text-[14px] font-inter  leading-[22px]'>{obj.content}</div>
                    </div>

                    {/* dots */}
                    {index===timeline.length-1?<div></div>:<div className=' left-[6.8%] top-[95%] absolute w-[1px] h-[42px] border-[1px] border-dotted border-[#AFB2BF]'></div>}

                    </div>
                    
                </div>
                
                
            )
        })}
      </div>
      {/* right part */}
      <div className='w-[55%] bg-black'>
        <img className=' shadow-timelineimageshadow' src={TimelineImage}></img>
      </div>
    </div>
  )
}

export default TimelineSection
