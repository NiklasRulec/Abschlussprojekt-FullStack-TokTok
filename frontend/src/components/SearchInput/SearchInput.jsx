import "./SearchInput.css";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [safeSearch, setSafeSearch] = useState("");

  const search = (e) => {
    const safeSearch = e.target.value;
    setSafeSearch(safeSearch);
    onSearch(safeSearch);
  };

  return (
    <>
    <div className="nav-fixed-wrapper">
      <div className="searchBar">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={safeSearch}
          onChange={search}
        />
      </div>
    </div>
    </>
  );
};

export default SearchInput;
