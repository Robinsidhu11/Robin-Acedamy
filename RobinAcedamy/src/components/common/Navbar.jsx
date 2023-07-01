import React from 'react';
import { Link } from 'react-router-dom'
import robinacedmayLogo from '../../assets/Logo/logo-white-transparent.png'
import {NavbarLinks} from '../../data/navbar-links'
import arrowdownicon from '../../assets/icons/arrow-down.svg'
const Navbar = () => {
  return (
    <div className=' border-b-[1px] border-b-richblack-700 h-14 flex items-center'>
      <div className=' w-11/12 flex items-center justify-between  mx-auto max-w-maxContent'>

        {/* logo */}
        <img src={robinacedmayLogo} width={180} ></img>

        {/* tabs */}
        <div className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((obj,index)=>(
              obj.title=="Catalog"?(
                <div className=' flex items-center gap-1 cursor-pointer'>
                  Catalog <img src={arrowdownicon} width={16} height={16}></img>
                </div>):<Link to={obj.path}>{obj.title}</Link>
            ))}
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
