import React from 'react';
import { Link } from 'react-router-dom'
import robinacedmayLogo from '../../assets/Logo/logo-white-transparent.png'
import {NavbarLinks} from '../../data/navbar-links'
import arrowdownicon from '../../assets/icons/arrow-down.svg'

const Navbar = () => {
  const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
    {
      title: "AI",
      link:"/catalog/AI"
  }
];

  return (
    <div className=' border-b-[1px] border-b-richblack-700 h-14 flex items-center'>
      <div className=' w-11/12 flex items-center justify-between  mx-auto max-w-maxContent'>

        {/* logo */}
        <img src={robinacedmayLogo} width={180} ></img>

        {/* tabs */}
        <div className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((obj,index)=>(
              obj.title=="Catalog"?(
                <div key={index} className=' flex items-center gap-1 cursor-pointer relative group'>
                  Catalog <img src={arrowdownicon} width={16} height={16}></img>
                  {/* rectangle box */}
                  <div className=' font-inter invisible opacity-0 absolute rounded-lg bg-richblack-5 p-4 w-[300px] h-fit  text-richblack-900 flex flex-col group-hover:opacity-100 group-hover:visible '>
                    {subLinks.map((obj,index)=>{
                      return(
                        <Link to={obj.link}>{obj.title}</Link>
                      )
                    })}
                  </div>
                </div>):<Link key={index} to={obj.path}>{obj.title}</Link>
            ))}
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
