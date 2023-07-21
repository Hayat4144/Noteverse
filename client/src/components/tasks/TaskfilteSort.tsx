'use client'
import React from 'react'
import { Icons } from '../Icons'
import { Button } from '../ui/button'
import Filtertask from './Filtertask'
import Sorttask from './SortTask'
import SearchTask from './SearchTask'

export default function TaskfilteSort() {
  return (
    <div className='flex items-center justify-between space-x-5'>
       <Filtertask />
       <Sorttask />
        <SearchTask />
        <Button size={'sm'}>New</Button>
    </div>
  )
}
