import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAbutton from '../components/core/Homepage/CTAbutton'
import Banner from "../assets/Images/banner.mp4"
import Frame from "../assets/Images/frame.png"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
const Home = () => {
  return (
    <div>
      {/* Section1 */}
      <div className='w-11/12 max-w-[1200px] relative flex flex-col items-center mx-auto justify-between text-white gap-5'>

        <Link to={"/signup"}>
            <div className=' flex items-center bg-richblack-800 p-[26px] py-[9px] text-richblack-200 rounded-full gap-2  w-fit font-bold transition-all duration-200 hover:scale-95 hover:bg-richblack-900 shadow-button1shadow'>
                <p>Become an Instructor</p>
                <FaArrowRight className=' text-[15px]'></FaArrowRight>
            </div>
        </Link>

        <div className=' text-center text-4xl font-semibold'>
        Empower Your Future with <HighlightText text="Coding Skills"></HighlightText>
        </div>

        <div className=' w-[90%] text-center text-lg font-medium text-richblack-300'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>
        
        <div className='flex flex-row gap-7'>
            <CTAbutton active={true}linkTo="/signup" >Learn More</CTAbutton>
            <CTAbutton active={false}linkTo={"/login"}>Book a Demo</CTAbutton>
        </div>

        <div className=' my-8 shadow-videoshadow1 relative'>
            {/* <div className=' w-full h-full bg-white absolute  shadow-eclipseshadow rounded-full'></div> */}
            <video autoPlay muted loop >
                <source src={Banner}></source>
            </video>
        </div>

        <div>
            <CodeBlocks position="flex-row" heading={<div className='text-4xl font-semibold'>
                        Unlock Your 
                        <HighlightText text={" coding potential "}/>
                         with our online courses
                    </div>} subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} ctabtn1={{active:true,linkTo:"/signup",children:`Try It Yourself`}} ctabtn2={{active:false,linkTo:"/login",children:`Learn More`}} codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>/nav>`} codeColor={"text-yellow-25"}>

            </CodeBlocks>
        </div>

        <div>
            <CodeBlocks position="flex-row-reverse" heading={<div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={" coding in "}/>
                        <br></br>
                        <HighlightText text={" seconds "}/>
                    </div>} subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} ctabtn1={{active:true,linkTo:"/signup",children:`Continue Lesson`}} ctabtn2={{active:false,linkTo:"/login",children:`Learn More`}} codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>/nav>`} codeColor={"text-yellow-25"}>

            </CodeBlocks>
        </div>
      </div>
        
      {/* Section2 */}
      {/* Section3 */}
      {/* Footer */}
    </div>
  )
}

export default Home
