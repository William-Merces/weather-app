import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchCities } from '@/services/weather';
import { TRANSLATIONS } from '@/lib/constants/translations';
import { getCountryFlag } from '@/services/weather';

const SearchBar = ({ onCitySelect, onClose, language }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      setLoading(true);
      try {
        const cities = await searchCities(value);
        setResults(cities);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder={t.searchPlaceholder}
            className="w-full p-3 pr-10 bg-[#1B1B2F] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            autoFocus
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-[#1B1B2F] border border-gray-600 hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-[#1B1B2F] border border-gray-600 max-h-60 overflow-y-auto">
          {results.map((city) => (
            <button
              key={`${city.lat}-${city.lon}`}
              onClick={() => onCitySelect(city.name)}
              className="w-full p-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between"
            >
              <span>{city.name}</span>
              <span className="text-gray-400 flex items-center gap-2">
                {city.state && <span>{city.state}</span>}
                <span>{getCountryFlag(city.country)}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;