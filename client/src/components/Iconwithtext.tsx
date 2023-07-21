import React from 'react'

interface IconswithTextProps{
    icons:React.ReactNode,
    text:string
}
export default function Iconwithtext({icons,text}:IconswithTextProps) {
  return (
    <div className='flex items-center space-x-1'>
        {icons}
        <span className='text-sm'>{text}</span>
    </div>
  )
}
