import React from 'react'
import CourseCard from './CourseCard'
import HighlightText from './HighlightText'
const ExploreMore = () => {
  return (
    <div className='flex flex-col  my-5   w-full  py-16 pb-60 relative'>
            {/* heading and sub heading */}
            <div className=' flex flex-col gap-3'>
                {/* heading */}
                <div className=' text-4xl font-medium text-center'>Unlock the <HighlightText text={"Power of Code"}> </HighlightText></div>
                <div className='text-richblack-300 font-medium text-center '>Learn to Build Anything You Can Imagine</div>
                {/* all tabs */}
                <div></div>
            </div>
            
            {/* container for 3 cards items */}
            <div className='flex gap-9 absolute top-[50%] left-[4.5%]'>
                <CourseCard active={true} title={"Learn HTML"} subcontent={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}></CourseCard>

                <CourseCard active={false} title={"Learn CSS"} subcontent={"This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"}></CourseCard>

                <CourseCard active={false} title={"Responsive Web design"} subcontent={"This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"}></CourseCard>
            </div>
        </div>
  )
}

export default ExploreMore
