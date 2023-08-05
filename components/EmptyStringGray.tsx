'use client'

export default function EmptyStringGray(props: {
  length: Number
}) {
  return (
    <span className='bg-gray-50 text-gray-50 text-ellipsis'>{[...new Array(props.length)].map(item => <>&nbsp;</>)}</span>
  )
}
