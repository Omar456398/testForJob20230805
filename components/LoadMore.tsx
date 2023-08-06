'use client'
import { useState } from 'react'
import EmptyStringGray from './EmptyStringGray'

export default function LoadMore(props: {
  onLoadMore: Function
  isLoading: Boolean
  isNext: Boolean
}) {
  return (
    <div className={`py-4 px-6 font-bold text-gray-500 text-center bg-gray-100 rounded-b-2xl ${props.isNext ? 'cursor-pointer' : ''}`} onClick={props.isNext ? props.onLoadMore as any : ()=>{}}>
      <span className='pointer-events-none-w-children'>{props.isLoading ? <EmptyStringGray length={80} /> : props.isNext ? 'LOAD MORE' : 'END OF RESULTS'}</span>
    </div>
  )
}
