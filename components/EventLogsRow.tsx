"use client";

import "./styles/EventLogsRow.css";
import { rowStates } from "./types/EventLogsRow";
import { useEffect, useState } from "react";
import { LogData } from "./types/general";
import moment from "moment";
import EmptyStringGray from "./EmptyStringGray";
import SubDataEntry from "./SubDataEntry";

export default function EventLogsRow(props: {
  onClick: Function;
  data: LogData;
  currFocus: string;
}) {
  const [currState, setCurrState] = useState(rowStates.idle);
  const [currStateTimeOut, setCurrStateTimeOut] = useState(0 as any);
  function containerClasses(containerState: rowStates) {
    let returnClasses =
      "cursor-pointer overflow-hidden bg-white instts-event-row-container-main rounded-xl border border-solid";
    if (containerState === rowStates.idle) {
      returnClasses += " border-transparent px-6 py-4";
    } else {
      returnClasses += " border-gray-150 px-10 py-6";
    }
    if (
      containerState === rowStates.expanding ||
      containerState === rowStates.expanded
    ) {
      returnClasses += " instts-event-row-container-large";
    }
    return returnClasses;
  }
  const isStateSmall =
    currState === rowStates.idle || currState === rowStates.expanding;

  useEffect(() => {
    if (props.data.id === props.currFocus && currState === rowStates.idle) {
      clearTimeout(currStateTimeOut);
      setCurrState(rowStates.expanding);
      setCurrStateTimeOut(
        setTimeout(() => {
          setCurrState(rowStates.expanded);
        }, 300)
      );
    }
    if (props.data.id !== props.currFocus && currState === rowStates.expanded) {
      clearTimeout(currStateTimeOut);
      setCurrState(rowStates.collapsing);
      setCurrStateTimeOut(
        setTimeout(() => {
          setCurrState(rowStates.idle);
        }, 300)
      );
    }
  }, [props.currFocus]);
  return (
    <div
      className={containerClasses(currState)}
      onClick={() => {
        props.onClick(props.data.id === props.currFocus ? "-1" : props.data.id);
      }}
    >
      <div
        className={
          "transition-opacity duration-300 pointer-events-none-w-children" +
          ([rowStates.collapsing, rowStates.expanding].includes(currState)
            ? " opacity-0"
            : " opacity-100")
        }
      >
        {isStateSmall ? null : (
          <div className="flex py-3">
            <div className="flex-1 font-bold text-gray-400">ACTOR</div>
            <div className="flex-1 font-bold text-gray-400">ACTION</div>
            <div className="flex-1 font-bold text-gray-400">DATE</div>
          </div>
        )}
        <div className="flex">
          <div className="flex-1 w-2/6">
            {isStateSmall ? (
              <div className="flex">
                <div className="rounded-full bg-gradient-to-br from-orange-400 to-fuchsia-600 px-2 py-2 h-8 w-8 mr-3 text-center text-white font-bold -mt-1 text-xs">
                  {(props.data.actor_name?.[0] || "").toUpperCase()}
                </div>
                <div className="overflow-hidden text-ellipsis">
                  {props.data.actor_email}
                </div>
              </div>
            ) : (
              <>
                <SubDataEntry title="Name" data={props.data.actor_name} />
                <SubDataEntry title="Email" data={props.data.actor_email} />
                <SubDataEntry title="ID" data={props.data.actor_id} />
              </>
            )}
          </div>
          <div className="flex-1 w-2/6">
            {isStateSmall ? (
              <div className="overflow-hidden text-ellipsis">
                {props.data.action.name}
              </div>
            ) : (
              <>
                <SubDataEntry title="Name" data={props.data.action.name} />
                <SubDataEntry title="Object" data={props.data.action.object} />
                <SubDataEntry title="ID" data={props.data.action.id} />
              </>
            )}
          </div>
          <div className="flex-1 w-2/6">
            {isStateSmall ? (
              <div className="overflow-hidden text-ellipsis">
                {moment(props.data.occurred_at).format(
                  `${
                    new Date(props.data.occurred_at).getFullYear() !==
                    new Date().getFullYear()
                      ? " YYYY, "
                      : ""
                  }MMM D, HH:mm A`
                )}
              </div>
            ) : (
              <SubDataEntry
                title="Readable"
                data={moment(props.data.occurred_at).format(
                  `${
                    new Date(props.data.occurred_at).getFullYear() !==
                    new Date().getFullYear()
                      ? " YYYY, "
                      : ""
                  }MMM D, HH:mm A`
                )}
              />
            )}
          </div>
        </div>
        {isStateSmall ? null : (
          <>
            <div className="flex py-3">
              <div className="flex-1 font-bold text-gray-400">METADATA</div>
              <div className="flex-1 font-bold text-gray-400">TARGET</div>
              <div className="flex-1 w-2/6 font-bold text-gray-400"></div>
            </div>
            <div className="flex">
              <div className="flex-1 w-2/6">
                {props.data.metadata ? (
                  <>
                    <SubDataEntry
                      title="Description"
                      data={props.data.metadata.description}
                    />
                    <SubDataEntry
                      title="Redirect"
                      data={props.data.metadata.redirect}
                    />
                    <SubDataEntry
                      title="Request ID"
                      data={props.data.metadata.x_request_id}
                    />
                  </>
                ) : (
                  <EmptyStringGray length={58} />
                )}
              </div>
              <div className="flex-1 w-2/6">
                {props.data.target_id ? (
                  <>
                    <SubDataEntry title="Name" data={props.data.target_name} />
                    <SubDataEntry title="ID" data={props.data.target_id} />
                  </>
                ) : (
                  <EmptyStringGray length={58} />
                )}
              </div>
              <div className="flex-1" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
