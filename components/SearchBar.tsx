"use client";
import { useState } from "react";

export default function SearchBar(props: { onSearch: Function }) {
  const [currSearch, setCurrSearch] = useState("");
  return (
    <div className="pt-5 px-6">
      <input
        type="text"
        className="h-11 px-3 py-1 w-full bg-gray-100 rounded-lg border border-solid border-gray-150"
        placeholder="Search name, email or action..."
        value={currSearch}
        onChange={({ target }) => {
          setCurrSearch(target.value || "");
        }}
      />
    </div>
  );
}
