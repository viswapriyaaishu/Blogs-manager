import React from 'react'
import {useId,forwardRef} from 'react'
function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const id=useId()
  return (
    <div>
      {label && <label className={`${className}`} htmlFor={id} {...props}>{label}</label>}
      <span className="w-[4vw]"></span>
      <select id={id} className={`${className}`} {...props} ref={ref}>
        {options?.map((opt)=>(
            <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Select)
