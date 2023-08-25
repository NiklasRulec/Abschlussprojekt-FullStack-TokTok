import { ThemeContext } from "../../user/ThemeContext";
import "./SearchInput.css";
import { useContext, useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [safeSearch, setSafeSearch] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);

  const search = (e) => {
    const safeSearch = e.target.value;
    setSafeSearch(safeSearch);
    onSearch(safeSearch);
  };

  return (
    <>
      <div
        className={theme ? "nav-fixed-wrapper-dark" : "nav-fixed-wrapper-light"}
      >
        <div className="searchBar">
          <input
            className={theme ? "input-dark" :  "input-light"}
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
