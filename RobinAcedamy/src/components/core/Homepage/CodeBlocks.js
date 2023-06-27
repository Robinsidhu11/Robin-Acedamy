import React from 'react'
import CTAbutton from './CTAbutton'
import HighlightText from './HighlightText'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import "./CodeBlocks.css";
const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    //if position true, means btns and data on left and code on right. else revrese
    <div className={`flex ${position} gap-10 justify-between my-20`}>

        {/* section1 */}
        <div className=' w-1/2 flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-medium '>
                {subheading}
            </div>
            
            <div className='flex gap-7 mt-5'>
                
                <CTAbutton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                <div className=' flex items-center gap-2'>
                    {ctabtn1.children}<FaArrowRight></FaArrowRight>
                </div>
                </CTAbutton>
                
                
                <CTAbutton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>{ctabtn2.children}</CTAbutton>
            </div>
        </div>

        {/* section2 */}
        <div className='h-fit  flex flex-row text-10[px] w-[50%] py-4 lg:w-[500px] outerbox relative'>
            <div className=' text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation sequence={[codeblock,2000,""]} repeat={Infinity} cursor={true} style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}></TypeAnimation>
            </div>
            
            {/* eclipse */}
            <div className={`absolute eclipse ${backgroundGradient==="yellow"?" bg-gradient-to-r from-eclipse1gradientcolor1 via-eclipse1gradientcolor2 to-eclipse1gradientcolor3":" bg-gradient-to-r from-eclipse2gradientcolor1 via-eclipse2gradientcolor2 to-eclipse2gradientcolor3"}`}></div>
        </div>
    </div>
  )
}

export default CodeBlocks
