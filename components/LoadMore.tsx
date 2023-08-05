'use client'
import { useState } from 'react'

export default function LoadMore(props: {
  onLoadMore: Function
}) {
  return (
    <div className='py-3 px-6 font-bold text-gray-500 text-center bg-gray-100 rounded-b-2xl'>
      <span className='pointer-events-none-w-children'>LOAD MORE</span>
    </div>
  )
}
