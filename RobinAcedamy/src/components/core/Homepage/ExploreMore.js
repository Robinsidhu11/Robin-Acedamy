import React, { useState } from 'react'
import CourseCard from './CourseCard'
import HighlightText from './HighlightText'
import {HomePageExplore} from '../../../data/homepage-explore'

const ExploreMore = () => {
    
    const [currentTabIndex,setCurrentTabIndex]=useState(0)
    const CurrentObjToShow=HomePageExplore[currentTabIndex]
    const [currentSubBoxIndex,setCurrentSubBoxIndex]=useState(0)
    // console.log(CurrentObjToShow)
    function tabClickHandler(index){
            setCurrentTabIndex(index)
            //when switching to new tab make sure the hightlighted subbox is first one
            setCurrentSubBoxIndex(0)
    }
    function subboxClickHandler(index){
        console.log("cicked")
        setCurrentSubBoxIndex(index)
    }
  return (
    <div className='flex flex-col  my-5   w-full  py-16 pb-60 relative'>
            {/* heading and sub heading */}
            <div className=' flex flex-col gap-9 items-center'>
                {/* heading */}
                <div className=' flex flex-col gap-3'>
                    <div className=' text-4xl font-medium text-center'>Unlock the <HighlightText text={"Power of Code"}> </HighlightText></div>
                    <div className='text-richblack-300 font-medium text-center '>Learn to Build Anything You Can Imagine</div>
                </div>
                
                {/* all tabs */}
                <div className=' flex gap-5  mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                    {HomePageExplore.map((obj,index)=>{
                        return (
                            <div key={index} onClick={()=>{tabClickHandler(index)}} className={`${index===currentTabIndex?"bg-richblack-900":""} text-[16px]   text-richblack-5 font-medium px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer  hover:bg-richblack-700 hover:text-richblack-5`}>{obj.tag}</div>
                        )
                    })}
                </div>
            </div>

            {/* container for 3 cards items */}
            <div className='flex gap-9 absolute top-[50%] left-[4.5%] mt-10 '>
                {CurrentObjToShow.courses.map((obj,index)=>{
                    return (    
                        <div className={`cursor-pointer ${currentSubBoxIndex==index?" bg-white text-black yellowshadow":" bg-richblack-800 text-white"} h-[290px] 
                        w-[351px]
                        flex flex-col justify-between`} onClick={()=>{subboxClickHandler(index)}} key={index}>
                        
                        {/* title and content */}
                        <div className='flex flex-col gap-4 px-[24px] pt-[32px] pb-[52px]'>
                            <div className={`text-[20px] font-semibold font-inter ${currentSubBoxIndex==index?"text-richblack-800":" text-richblack-25"} `}>{obj.heading}</div>
                            <div className={`text-[16px]  font-inter ${currentSubBoxIndex==index?"text-richblack-500":" text-richblack-400"}`}>{obj.description}</div>
                        </div>

                        {/* footer of card */}
                        <div className={`${currentSubBoxIndex==index?" text-blue-500 border-richblack-50":" text-richblack-300 border-richblack-600"} flex flex-row justify-between border-t-[2px] border-dashed  px-[24px] py-[16px]`}>
                            {/* beginner */}
                            <div className=' font-inter text-[17px] font-medium'>
                                {/* <img src={miniusers}></img> */}
                                {obj.level}
                            </div>
                            {/* lessons */}
                            <div className=' font-inter text-[17px] font-medium'>
                                {/* <img src={charttree}></img> */}
                                {obj.lessionNumber} Lessons
                            </div>
                        </div>
                        </div>
                        )
                })}
            </div>
    </div>
  )
}

export default ExploreMore
