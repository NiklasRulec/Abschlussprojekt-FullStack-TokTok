import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchList from "../../components/SearchList/SearchList";
import { useState, useContext } from "react";
import { RefreshContext } from "../../user/RefreshContext";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { refresh, setRefresh } = useContext(RefreshContext);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // setRefresh(prev => !prev)
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
