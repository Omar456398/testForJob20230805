"use client";

import EmptyStringGray from "./EmptyStringGray";

export default function SubDataEntry(props: { title: string; data?: string }) {
  return (
    <div className="flex">
      <div className="flex-1 text-gray-400">{props.title}</div>
      <div className="flex-2 overflow-hidden text-ellipsis">
        {props.data || <EmptyStringGray length={18} />}
      </div>
    </div>
  );
}
