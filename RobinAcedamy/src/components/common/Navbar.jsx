import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import robinacedmayLogo from '../../assets/Logo/logo-white-transparent.png'
import {NavbarLinks} from '../../data/navbar-links'
import arrowdownicon from '../../assets/icons/arrow-down.svg'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"

const Navbar = () => {
  const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "Web Dev",
        link:"/catalog/web-development"
    },
    {
      title: "Cloud Computing",
      link:"/catalog/Computing"
    },
    {
      title: "Devops",
      link:"/catalog/Devops"
    },
    {
      title: "Data Science",
      link:"/catalog/Data-Science"
    }
];
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
  
  return (
    <div className=' border-b-[1px] border-b-richblack-700 h-14 flex items-center'  >
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
                  <div className=' font-inter invisible opacity-0 absolute z-10 top-10 -left-32 rounded-lg bg-richblack-5 p-4 w-[300px] h-fit  text-richblack-900 flex flex-col group-hover:opacity-100 group-hover:visible hover:visible hover:opacity-100 transition-all duration-200'>
                    {subLinks.map((obj,index)=>{
                      return(
                        <Link key={index} className=' rounded-lg py-4 pl-4 hover:bg-richblack-50' to={obj.link}>{obj.title}</Link>
                      )
                    })}
                    {/* rotated box */}
                    <div className='absolute h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-105%]  left-[61%]'></div>
                  </div>
                </div>):<Link  key={index} to={obj.path}>{obj.title}</Link>
            ))}
        </div>

        {/* signup/login/dashboard */}
        <div className='flex gap-x-4 items-center'> 
                    {/* add to cart but should be visible to user student only */}
                    {
                      user && user?.accountType!="Instructor" &&(
                        <Link to={"./dashboard/cart"} className=' relative'>
                        <AiOutlineShoppingCart />
                        {
                          totalItems>0 &&(
                            <span>{totalItems}</span>
                          )
                        }
                        </Link>
                      )
                    }

                    {/* loginbutton*/}
                    {

                    }
                    
        </div>

      </div>
      
    </div>
  )
}

export default Navbar
