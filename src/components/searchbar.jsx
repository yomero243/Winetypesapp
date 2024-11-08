import React, { useState } from 'react';
import { vinos } from '../vinos';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchWines = (term) => {
    const results = [];
    
    // Función recursiva para buscar en el objeto de vinos
    const searchInObject = (obj) => {
      if (Array.isArray(obj)) {
        obj.forEach(wine => {
          if (wine.toLowerCase().includes(term.toLowerCase())) {
            results.push(wine);
          }
        });
      } else if (typeof obj === 'object') {
        Object.values(obj).forEach(value => searchInObject(value));
      }
    };

    searchInObject(vinos);
    return results;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      const results = searchWines(term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search wines..."
          className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-red-500 focus:outline-none bg-white bg-opacity-80 backdrop-blur-sm"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Resultados de la búsqueda */}
      {searchResults.length > 0 && (
        <div className="w-full max-w-md mt-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((wine, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-50">
                {wine}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
