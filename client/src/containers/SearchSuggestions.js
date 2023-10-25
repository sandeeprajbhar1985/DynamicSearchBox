import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchSuggestions } from '../slices/searchSlice';
import { debounce } from 'lodash';
import SearchInput from '../components/SearchInput';

function SearchSuggestions() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const suggestions = useSelector((state) => state.search.suggestions);

  // To avoid frequent call for apis. This is to optimize the api call
  const debouncedHandleInputChange = debounce((inputValue) => {
    const separatedArray = inputValue.split(' ');
    dispatch(fetchSuggestions(separatedArray[separatedArray.length - 1]));
  }, 300); // Adjust the debounce time (in milliseconds) as needed

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    dispatch(setQuery(inputValue));
    debouncedHandleInputChange(inputValue);
  };

  return (
    // We can use i18n.js lib. As its a small POC so hardcoded. 
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="text-1xl font-bold text-center my-4 lg:text-4xl md:text-4xl">Welcome To Eminds</h1>
      <div className="w-64 md:w-full max-w-lg lg:w-full lg:max-w-lg">
        <SearchInput suggestions={suggestions} query={query} handleInputChange={handleInputChange} />
      </div>
      <h1 className="text-1xl bottom-10 absolute right-5 font-bold md:text-4xl lg:text-4xl lg:absolute lg:bottom-10 lg:right-5 bottom-10">
        By Sandeep Rajbhar
      </h1>
    </div>
  );
}

export default SearchSuggestions;
