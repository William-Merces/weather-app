'use client';

import React, { useState } from 'react';
import { Compass, MapPin } from 'lucide-react';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { getWeatherIcon } from '@/lib/utils/weather';
import { LANGUAGES } from '@/lib/constants/languages';
import { getUserLocationByIP, reverseGeocode } from '@/services/weather';
import { TRANSLATIONS, WEATHER_TRANSLATIONS } from '@/lib/constants/translations';
const CountryFlag = ({ countryCode }) => {
  return (
    <div className="relative w-6 h-4 inline-block align-middle">
      <Image
        src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
        alt={`${countryCode} flag`}
        fill
        className="object-cover rounded-sm"
        sizes="24px"
      />
    </div>
  );
};

const Sidebar = ({ weather, onCitySelect, language }) => {
  const [showSearch, setShowSearch] = useState(false);
  const t = TRANSLATIONS[language];

  const handleLocationClick = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error(t.locationError);
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const locationData = await reverseGeocode(latitude, longitude);
      onCitySelect(locationData.name);
    } catch (error) {
      const city = await getUserLocationByIP();
      onCitySelect(city);
    }
  };

  return (
    <aside className="w-full md:w-96 bg-[#1E1E35] p-6">
      <div className="flex justify-between items-center mb-8">
        {showSearch ? (
          <div className="w-full">
            <SearchBar
              onCitySelect={(city) => {
                onCitySelect(city);
                setShowSearch(false);
              }}
              onClose={() => setShowSearch(false)}
              language={language}
            />
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowSearch(true)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              {t.searchPlaceholder}
            </button>
            <button
              onClick={handleLocationClick}
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"
              title={t.useLocation}
            >
              <Compass className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {weather && (
        <div className="text-center mt-12">
          <div className="mb-12 text-8xl">
            {getWeatherIcon(weather.weather[0].icon, weather.dt)}
          </div>
          <div className="text-[144px] font-medium leading-none mb-6">
            {Math.round(weather.main.temp)}
            <span className="text-5xl text-gray-400">°C</span>
          </div>
          <div className="text-4xl text-gray-400 mb-12 capitalize">
            {WEATHER_TRANSLATIONS[language][weather.weather[0].description.toLowerCase()] ||
              weather.weather[0].description}
          </div>
          <div className="text-lg text-gray-400">
            {t.today} · {new Date().toLocaleDateString(language, LANGUAGES[language].dateFormat)}
          </div>
          <div className="flex items-center justify-center mt-6 text-gray-400 gap-2">
            <MapPin className="h-5 w-5" />
            <span>{weather.name}</span>
            <CountryFlag countryCode={weather.sys.country} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;