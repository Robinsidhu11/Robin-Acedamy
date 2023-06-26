import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' text-transparent bg-clip-text bg-gradient-to-r from-gradientcolor1 via-gradientcolor2 to-gradientcolor3 font-bold'>{text}</span>
  )
}

export default HighlightText
