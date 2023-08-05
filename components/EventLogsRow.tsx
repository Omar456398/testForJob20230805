import './styles/EventLogsRow.css'
import { rowStates } from './types/EventLogsRow'
import { useState } from 'react'
import { LogData } from './types/general'

export default function EventLogsRow(props: {
  onClick: Function
  data: LogData,
  currFocus: Number
}) {
  const [currState, setCurrState] = useState(rowStates.idle)
  function containerClasses(containerState: rowStates) {
    let returnClasses = 'overflow-hidden bg-white instts-event-row-container-main'
    if(rowStates.idle === containerState) {
      returnClasses += ' border-none'
    } else {
      returnClasses += ' border border-solid border-gray-100'
    }
    if(rowStates.expanded === containerState) {
      returnClasses += ' instts-event-row-container-large'
    }
    return returnClasses
  }
  return (
    <div className={containerClasses(currState)}>
      <div className={'transition-opacity' + ([rowStates.collapsing, rowStates.expanding].includes(currState) ? ' opacity-0' : 'opacity-100')}>
        Hi
      </div>
    </div>
  )
}
