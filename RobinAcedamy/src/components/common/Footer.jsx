import React from 'react'
import { Link } from 'react-router-dom'
import { FooterLink2 } from "../../../src/data/footer-links";
import Rlogo from '../../../src/assets/Logo/RwhiteLogo.png'
import Robinacedamytextlogo from '../../../src/assets/Logo/robinacedamytextlogo.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

const Company=["About", "Careers", "Affiliates"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Subjects=FooterLink2[0].links
const Languages=FooterLink2[1].links
const CareerBuilding=FooterLink2[2].links
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

  return (
    <div className='  w-11/12 max-w-[1200px] mx-auto  text-richblack-300 text-[14px] font-inter leading-[22px] flex flex-col '>
        {/* top portion */}
        <div className=' py-10 flex  justify-between'>

            {/* left */}
            <div className=' flex gap-[70px]'>

                {/* line 1 vertically */}
                <div>
                    <div className=' flex flex-col gap-[15px]'>

                        <div className=' flex flex-col gap-[12px]'>
                            <div className='flex items-center'>
                                <img className=' w-[32px]' src={Rlogo}></img>
                                <img className=' w-[128px]' src={Robinacedamytextlogo}></img>
                            </div>
                            
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Company</div>
                        </div>

                        {/* company sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Company.map((ele,index)=>{
                                return(
                                    <Link key={index} to={`/${ele.split(" ").join("-")}`}><div className=' text-[14px] font-inter leading-[22px]'>{ele}</div></Link>
                                )
                            })}
                        </div>

                        {/* social media logo and links */}
                        <div className='flex gap-[12px]'>
                            <Link  to={"https://www.facebook.com"}><FaFacebook size={22}></FaFacebook></Link>
                            <Link to={"https://www.google.com"}><FaGoogle size={22}></FaGoogle></Link>
                            <Link to={"https://www.twitter.com"}><FaTwitter size={22}></FaTwitter></Link>
                            <Link to={"https://www.youtube.com"}><FaYoutube size={22}></FaYoutube></Link>
                            
                        </div>
                    </div>
                </div>

                {/* line 2 vertically */}
                <div className=' flex flex-col gap-[30px]'>
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Resources</div>
                        </div>
                        {/* Resources sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Resources.map((ele,index)=>{
                                return(
                                    <Link key={index} to={`/${ele.split(" ").join("-")}`}><div className=' text-[14px] font-inter leading-[22px]'>{ele}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                    {/* support */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Support</div>
                        <Link to={`/Help-Center`}><div className=' text-[14px] font-inter leading-[22px]'>Help Center</div></Link>
                    </div>
                    
                </div>
                
                {/* line 3 vertically */}
                <div className=' flex flex-col gap-[30px]'>
                    {/* plans */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Plans</div>
                        </div>
                        {/* Plans sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Plans.map((ele,index)=>{
                                return(
                                    <Link key={index} to={`/${ele.split(" ").join("-")}`}><div className=' text-[14px] font-inter leading-[22px]'>{ele}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                    {/* Community */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Community</div>
                        </div>
                        {/* Plans sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Community.map((ele,index)=>{
                                return(
                                    <Link key={index} to={`/${ele.split(" ").join("-")}`}><div className=' text-[14px] font-inter leading-[22px]'>{ele}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                </div>

            </div>

            {/* vertical line */}
            <div className=' bg-[#2C333F] w-[1px] min-h-full'></div>

            {/* right */}
            <div className=' flex gap-[70px]'>

                {/* line 1 vertically */}
                <div className=' flex flex-col gap-[30px]'>
                    {/* subjects */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Subjects</div>
                        </div>
                        {/* Subjects sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Subjects.map((obj,index)=>{
                                return(
                                    <Link key={index} to={obj.link}><div className=' text-[14px] font-inter leading-[22px]'>{obj.title}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                    
                </div>

                {/* line 2 vertically */}
                <div className=' flex flex-col gap-[30px]'>
                    {/* languages */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Languages</div>
                        </div>
                        {/* Languages sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {Languages.map((obj,index)=>{
                                return(
                                    <Link key={index} to={obj.link}><div className=' text-[14px] font-inter leading-[22px]'>{obj.title}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                    
                </div>

                {/* line 3 vertically */}
                <div className=' flex flex-col gap-[30px]'>
                    {/* Career building */}
                    <div className=' flex flex-col gap-[12px]'>
                        <div className=' flex flex-col gap-[12px]'>
                            <div className=' text-[16px] font-inter font-semibold leading-[24px] text-richblack-100'>Career building</div>
                        </div>
                        {/* Career building sub items */}
                        <div className=' flex flex-col gap-[8px]'>
                            {CareerBuilding.map((obj,index)=>{
                                return(
                                    <Link key={index} to={obj.link}><div className=' text-[14px] font-inter leading-[22px]'>{obj.title}</div></Link>
                                )
                            })}
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
        </div>

        {/* horizontal line */}
        <div className=' h-[1px] w-full bg-[#2C333F]'></div>

        {/* bottom-part */}
        <div className=' flex justify-between py-9'>
            {/* left part */}
                <div className='flex'>
                    <Link to={"/privacyPolicy"}><div className=' border-r border-[#2C333F] pr-4'>Privacy Policy</div></Link>
                    <Link to={"/cookiePolicy"}><div className=' border-r border-[#2C333F] px-4'>Cookie Policy</div></Link>
                    <Link to={"/terms"}><div className=' pl-4'>Terms</div></Link>
                </div>
            {/* right part */}
                <div>
                Made with <span className=' text-[#EF476F]'>♥</span> CodeHelp © 2023 RobinAcedamy
                </div>
        </div>
    </div>
  )
}

export default Footer
