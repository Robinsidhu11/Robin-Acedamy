import React from 'react'
import "./CourseCard.css";
const CourseCard = ({active,heading,description,level,lessionNumber}) => {
  return (
    // active true means white card 
    <div className={`${active=="true"?" bg-white text-black yellowshadow":" bg-richblack-800 text-white"} h-[300px] 
    w-[341px]
    flex flex-col justify-between`}>
      
      {/* title and content */}
      <div className='flex flex-col gap-4 px-[24px] pt-[32px] pb-[52px]'>
        <div className={`text-[20px] font-semibold font-inter ${active?"text-richblack-800":" text-richblack-25"} `}>{heading}</div>
        <div className={`text-[16px]  font-inter ${active?"text-richblack-500":" text-richblack-400"}`}>{description}</div>
      </div>

      {/* footer of card */}
      <div className={`${active?" text-blue-500 border-richblack-50":" text-richblack-300 border-richblack-600"} flex flex-row justify-between border-t-[2px] border-dashed  px-[24px] py-[16px]`}>
        {/* beginner */}
        <div className=' font-inter text-[17px] font-medium'>
            {/* <img src={miniusers}></img> */}
            {level}
        </div>
        {/* lessons */}
        <div className=' font-inter text-[17px] font-medium'>
            {/* <img src={charttree}></img> */}
            {lessionNumber} Lessons
        </div>
      </div>
    </div>
  )
}

export default CourseCard
