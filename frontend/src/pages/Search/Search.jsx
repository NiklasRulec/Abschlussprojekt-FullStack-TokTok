import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from '../../components/Navbar/Navbar';
import './Search.css'
import SearchInput from '../../components/SearchInput/SearchInput';

const Search = () => {

    return ( 
        <>
        <InfoBar />
        <h1>Search</h1>
        <SearchInput />
        <Navbar />
        </>
     );
}
 
export default Search;

