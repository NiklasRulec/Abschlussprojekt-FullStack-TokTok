import './SearchInput.css'

// import Searchlogo from "../../images/Searchlogo.png"

import { useState } from 'react';

const data = [
    'Chris Hadeldudel',
    'Max Mustermann',
    'Will Smith',
    'Patrick Lutsch',
    'Erika Schulz',
  ];

const SearchInput = () => {

    const [safeSearch, setSafeSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        const safeSearch = event.target.value;
        setSafeSearch(safeSearch);
    
        const filteredResults = data.filter((name) =>
          name.toLowerCase().includes(safeSearch.toLowerCase())
        );
    
        setSearchResults(filteredResults);
      };


    return ( 
        <>
        <div className='searchBar'>
            {/* <img src={Searchlogo} alt="search" /> */}
            <input
                className='searchInput'
                type='text'
                placeholder='Suche nach Namen'
                value={safeSearch}
                onChange={handleSearch}
            />

        </div>
            <ul>
            {searchResults.map((result, index) => (
            <li key={index}>{result}</li>))}
            </ul>        
        </>
     );
}
 
export default SearchInput;