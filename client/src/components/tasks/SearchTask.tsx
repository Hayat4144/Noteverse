'use client'

import React,{useState} from 'react'
import { Icons } from '../Icons'
import { Input } from '../ui/input'

export default function SearchTask() {
   const [searhBarOpen, setsearhBarOpen] = useState(false)
   const [searchValue,setsearchvalue] = useState('')
  return (
    <React.Fragment>
       <Icons.search onClick={()=>setsearhBarOpen(!searhBarOpen)} size={18} className='cursor-pointer'/>
        {searhBarOpen ?<input 
        placeholder='Type to search'
        value={searchValue}
        autoFocus
        onChange={(e)=>{
          setsearchvalue(e.target.value)
        }}
        className='border-none text-muted-foreground px-2 bg-inherit w-[200px] text-sm focus:outline-none'/> :null }
    </React.Fragment>
  )
}
