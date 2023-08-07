'use client'

import React from "react"

export default function EmptyStringGray(props: {
  length: Number
}) {
  return (
    <span className='bg-gray-50 text-gray-50 text-ellipsis'>{[...new Array(props.length)].map((item, idx) => <React.Fragment key={idx}>&nbsp;</React.Fragment>)}</span>
  )
}
