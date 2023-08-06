"use client";
import { useState } from "react";

export default function SearchBar(props: {
  onStartSearch: Function;
  onSearch: Function;
}) {
  const [currSearch, setCurrSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(0 as any);
  return (
    <div className="pt-5 px-6">
      <input
        type="text"
        className="h-11 px-3 py-1 w-full bg-gray-100 rounded-lg border border-solid border-gray-150"
        placeholder="Search name, email or action..."
        value={currSearch}
        onChange={({ target }) => {
          const currSearchNew = target.value?.trim() ? target.value : ""
          setCurrSearch(currSearchNew);
          props.onStartSearch();
          clearTimeout(searchTimeout);
          setSearchTimeout(setTimeout(() => props.onSearch(currSearchNew), 1000));
        }}
      />
    </div>
  );
}
