"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ placeholder = "Search here" }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <div className="relative w-full p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full card flex items-center shadow-md pl-4 rounded-lg"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm w-full bg-transparent outline-none"
        />
        <button className="p-4">
          <BiSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
