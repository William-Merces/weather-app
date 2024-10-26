import React from 'react';
import { TRANSLATIONS } from '@/lib/constants/translations';
import { LANGUAGES } from '@/lib/constants/languages';
import { convertTemperature } from '@/lib/utils/weather';
import { getWeatherIcon } from '@/lib/utils/weather';

const WeatherCard = ({ day, index, unit, language }) => {
  const t = TRANSLATIONS[language];
  const date = new Date(day.dt * 1000);
  
  const formatDate = () => {
    if (index === 0) return t.tomorrow;
    return date.toLocaleDateString(language, LANGUAGES[language].dateFormat);
  };

  const temp = (temp) => Math.round(unit === 'F' ? convertTemperature(temp, 'C', 'F') : temp);

  return (
    <div className="bg-[#1E1E35] p-4 text-center rounded-lg">
      <h3 className="text-base mb-4">{formatDate()}</h3>
      <div className="text-6xl mb-4">
        {getWeatherIcon(day.weather.icon, day.dt)}
      </div>
      <div className="flex justify-between px-4">
        <span className="font-medium">{temp(day.temp_max)}°{unit}</span>
        <span className="text-gray-400">{temp(day.temp_min)}°{unit}</span>
      </div>
    </div>
  );
};

export default WeatherCard;