import React from 'react';

function SearchInput({ query, handleInputChange, suggestions }) {
  return (
    <div className="w-full max-w-lg sm:w-full lg:max-w-lg">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black text-white"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <div className="absolute top-10 left-0 w-full mt-2 bg-yellow-300 border border-yellow-500 rounded-md shadow-md">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
