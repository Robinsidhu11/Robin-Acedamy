import React, { useEffect } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom'
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

const location=useLocation()

//to match url part after base url
function matchCase(route){
  let loc=location.pathname.split('/')
  loc="/"+loc[1]
  // console.log("route :",route," ",loc)
  return matchPath({path:route},loc)
}
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
  const {totalItems} = useSelector( (state) => state.cart)
  return (
    <div className={` border-b-[1px] border-b-richblack-700 h-14 flex items-center ${location.pathname==="/"?"":" bg-richblack-800"} `}  >
      <div className=' w-11/12 flex items-center justify-between  mx-auto max-w-[1200px]'>

        {/* logo */}
        <img src={robinacedmayLogo} width={180} ></img>

        {/* tabs */}
        <div className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((obj,index)=>(
              obj.title=="Catalog"?(
                <div key={index} className={`flex items-center gap-1 cursor-pointer relative group ${matchCase("/catalog")?"text-yellow-25":"text-richblack-25"}`}>
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
                </div>):<Link  key={index} to={obj.path}><p className={`${matchCase(obj?.path)?"text-yellow-25":"text-richblack-25"}`}>{obj.title}</p></Link>
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
                        token===null && (
                          <Link to={"./login"}><button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button></Link>
                        )
                    }

                    {/*sign up button*/}
                    {
                        token===null && (
                          <Link to={"./signup"}><button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button></Link>
                        )
                    }

                    {/*logout button*/}
                    {
                        token!==null && (
                          <Link ><button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Logout
                        </button></Link>
                        )
                    }


                    {/* profile dropdown */}
                    {/* {
                      token !==null && <ProfileDropDown></ProfileDropDown>
                    }   */}
        </div>

      </div>
      
    </div>
  )
}

export default Navbar
