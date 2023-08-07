"use client";
import { useState } from "react";

export default function SearchBar(props: {
  onStartSearch: Function;
  onSearch: Function;
  setIsLive: Function;
  isLive: Boolean;
}) {
  const [currSearch, setCurrSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(0 as any);
  return (
    <div className="pt-5 px-6">
      <div className="h-11 w-full bg-gray-100 rounded-lg border border-solid border-gray-150 flex">
        <input
          type="text"
          className="border-none px-3 py-1 bg-transparent h-full flex-1"
          placeholder="Search name, email or action..."
          value={currSearch}
          onChange={({ target }) => {
            const currSearchNew = target.value?.trim() ? target.value : "";
            setCurrSearch(currSearchNew);
            props.onStartSearch();
            clearTimeout(searchTimeout);
            setSearchTimeout(
              setTimeout(() => props.onSearch(currSearchNew), 1500)
            );
          }}
        />
        <button
          onClick={() => props.setIsLive(!props.isLive)}
          className="border-solid border-0 border-l px-3 py-2 bg-transparent h-full flex"
        >
          <div
            className={`rounded-full ${
              props.isLive ? "bg-lime-400" : "bg-pink-900"
            } h-4 w-4 mr-3 text-center text-white font-bold mt-1 text-xs`}
          ></div>
          {props.isLive ? 'LIVE' : 'STALE'}
        </button>
      </div>
    </div>
  );
}
