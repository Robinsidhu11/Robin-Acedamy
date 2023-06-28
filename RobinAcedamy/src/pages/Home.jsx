import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAbutton from '../components/core/Homepage/CTAbutton'
import Banner from "../assets/Images/banner.mp4"
import HighlightText2 from '../components/core/Homepage/HighlightText2'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import CourseCard from '../components/core/Homepage/CourseCard'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import "./Home.css";
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
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

        {/* codeblock1 */}
        <div>
            <CodeBlocks position="flex-row" heading={<div className='text-4xl font-semibold'>
                        Unlock Your 
                        <HighlightText text={" coding potential "}/>
                         with our online courses
                    </div>} subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} ctabtn1={{active:true,linkTo:"/signup",children:`Try It Yourself`}} ctabtn2={{active:false,linkTo:"/login",children:`Learn More`}} codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>/nav>`} codeColor={"text-yellow-25"} backgroundGradient="yellow">

            </CodeBlocks>
        </div>

        {/* codeblock2 */}
        <div>
            <CodeBlocks position="flex-row-reverse" heading={<div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={" coding in "}/>
                        <br></br>
                        <HighlightText text={" seconds "}/>
                    </div>} subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} ctabtn1={{active:true,linkTo:"/signup",children:`Continue Lesson`}} ctabtn2={{active:false,linkTo:"/login",children:`Learn More`}} codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>/nav>`} codeColor={"text-yellow-25"} backgroundGradient="blue">

            </CodeBlocks>
        </div>
        
        {/* unlock power and all 3 cards */}
        <div className='flex flex-col  my-5   w-full  py-16 pb-60 relative'>
            {/* heading and sub heading */}
            <div className=' flex flex-col gap-3'>
                {/* heading */}
                <div className=' text-4xl font-medium text-center'>Unlock the <HighlightText text={"Power of Code"}> </HighlightText></div>
                <div className='text-richblack-300 font-medium text-center '>Learn to Build Anything You Can Imagine</div>
            </div>
            
            {/* container for 3 cards items */}
            <div className='flex gap-9 absolute top-[50%] left-[4.5%]'>
                <CourseCard active={true} title={"Learn HTML"} subcontent={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}></CourseCard>

                <CourseCard active={false} title={"Learn CSS"} subcontent={"This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"}></CourseCard>

                <CourseCard active={false} title={"Responsive Web design"} subcontent={"This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"}></CourseCard>
            </div>
        </div>

      </div>
        
      {/* Section2 */}
      <div className=' bg-pure-greys-5'>
        {/* 2 buttons and 1 wire grill at background */}
        <div className='py-40 wiregrill flex gap-7 justify-center'>
            <CTAbutton active={true} linkTo={"/signup"}>
                <div className='flex gap-2 items-center'>
                    Explore Full Catalog
                    <FaArrowRight></FaArrowRight>
                </div>
            </CTAbutton>
            <CTAbutton active={false} linkTo={"/login"}>
                Learn More
            </CTAbutton>
        </div>
         
         <div className=' flex flex-col  w-11/12 max-w-[1200px] mx-auto  '>
            {/* part 1 */}
            <div className='flex gap-5 pt-16 pb-10 '>
                <div className=' text-[32px] font-inter font-semibold leading-[44px]'>Get the skills you need for a <HighlightText2 text={"job that is in demand."}></HighlightText2> </div>
                <div className='flex flex-col gap-8'>
                    <div className=' font-inter leading-[24px] text-[16px] font-medium'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                    <CTAbutton active={true} linkTo={"#"} >Learn More</CTAbutton>
                </div>
            </div>
            {/* part2 */}
            <TimelineSection></TimelineSection>
            {/* part 3 */}
            <LearningLanguageSection></LearningLanguageSection>
         </div>

        

      </div>
      
      {/* Section3 */}
      {/* Footer */}
    </div>
  )
}

export default Home
