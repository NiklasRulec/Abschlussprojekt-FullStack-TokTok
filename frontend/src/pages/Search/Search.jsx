import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchList from "../../components/SearchList/SearchList";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

    return ( 
        <>
        {/* <InfoBar /> */}
        <SearchInput onSearch={handleSearch} />
        <SearchList searchQuery={searchQuery} />
        <Navbar />
        </>
    )
}


export default Search;
