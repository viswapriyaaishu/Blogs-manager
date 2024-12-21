import React,{forwardRef} from 'react'
import {useId} from 'react'
function Input(
    {type='text',
    label,
    className="",
    ...props},ref
) {
    const id=useId()
   
  return (
    <div>
        {label && <label htmlFor={id}>{label}</label>}
        <div className></div>
        <input type={type} className={className} id={id} {...props} ref={ref}></input>
    </div>
  )
}

export default forwardRef(Input)
