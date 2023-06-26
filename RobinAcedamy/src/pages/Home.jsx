import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAbutton from '../components/core/Homepage/CTAbutton'
const Home = () => {
  return (
    <div>
      {/* Section1 */}
      <div className='relative flex flex-col w-11/12 items-center mx-auto justify-between text-white gap-5'>

        <Link to={"/signup"}>
            <div className=' flex items-center bg-richblack-800 p-[26px] py-[9px] text-richblack-200 rounded-full gap-2  w-fit font-bold transition-all duration-200 hover:scale-95 hover:bg-richblack-900 shadow-button1shadow'>
                <p>Become an Instructor</p>
                <FaArrowRight className=' text-[15px]'></FaArrowRight>
            </div>
        </Link>

        <div className=' text-center text-4xl font-semibold'>
        Empower Your Future with <HighlightText text="Coding Skills"></HighlightText>
        </div>

        <div className=' w-[90%] text-center text-lg font-bold text-richblack-300'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>
        
        <div className=''>
            <CTAbutton>Learn More</CTAbutton>
            <CTAbutton>Book a Demo</CTAbutton>
        </div>

      </div>

      {/* Section2 */}
      {/* Section3 */}
      {/* Footer */}
    </div>
  )
}

export default Home
