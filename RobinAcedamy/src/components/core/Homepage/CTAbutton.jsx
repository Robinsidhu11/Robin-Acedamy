import React from 'react'
import { Link } from 'react-router-dom'

//linkTo specify where to redirect on clicking this
//active to specify where button should be yellow one or black one
const CTAbutton = ({children,active,linkTo}) => {
    
  return (
    <Link to={linkTo}>
        <div className={`text-center shadow-demobuttonshadow text-[13px] px-6 py-3 rounded-md font-bold ${active?" bg-yellow-50 text-black":" bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAbutton
