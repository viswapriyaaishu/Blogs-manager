import React from 'react'

function Button({
    children,
    type='button',
    bgColor="blue",
    textColor="white",
    className="",
    ...props
}) {
    
  return (
    <div>
      <button type={type} className={`${className} ${bgColor} ${textColor}`} {...props}>{children}</button>
    </div>
  )
}

export default Button
