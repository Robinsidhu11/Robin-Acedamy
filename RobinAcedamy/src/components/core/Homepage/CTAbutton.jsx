import React from 'react'
import { Link } from 'react-router-dom'

//linkTo specify where to redirect on clicking this
//active to specify where button should be yellow one or black one
const CTAbutton = ({children,active,linkTo}) => {
    
  return (
    <Link to={linkTo}>
        <div>
            {children}
        </div>
    </Link>
  )
}

export default CTAbutton
