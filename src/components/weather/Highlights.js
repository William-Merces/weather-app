import React from 'react';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { TRANSLATIONS } from '@/lib/constants/translations';
import { getWindDirection } from '@/lib/utils/weather';

const Highlights = ({ weather, language }) => {
  const t = TRANSLATIONS[language];

  const WindDirection = ({ degrees }) => (
    <div className="flex items-center justify-center gap-2 mt-4">
      <div 
        className="bg-[#585676] p-2 rounded-full transform rotate-180"
        style={{ transform: `rotate(${degrees}deg)` }}
      >
        <Wind className="h-4 w-4" />
      </div>
      <span>{getWindDirection(degrees)}</span>
    </div>
  );

  const ProgressBar = ({ value }) => (
    <div className="w-full mt-4 px-4">
      <div className="flex justify-between text-xs mb-1">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="w-full bg-gray-600 h-2 rounded-full">
        <div 
          className="bg-yellow-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-right text-xs mt-1">%</div>
    </div>
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">{t.highlights}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E1E35] p-6 text-center rounded-lg">
          <h3 className="text-base mb-2">{t.windStatus}</h3>
          <p className="text-6xl font-bold mb-2">
            {weather.wind.speed}
            <span className="text-4xl font-normal">ms</span>
          </p>
          <WindDirection degrees={weather.wind.deg} />
        </div>

        <div className="bg-[#1E1E35] p-6 text-center rounded-lg">
          <h3 className="text-base mb-2">{t.humidity}</h3>
          <p className="text-6xl font-bold mb-2">
            {weather.main.humidity}
            <span className="text-4xl font-normal">%</span>
          </p>
          <ProgressBar value={weather.main.humidity} />
        </div>

        <div className="bg-[#1E1E35] p-6 text-center rounded-lg">
          <h3 className="text-base mb-2">{t.visibility}</h3>
          <p className="text-6xl font-bold">
            {(weather.visibility / 1000).toFixed(1)}
            <span className="text-4xl font-normal">km</span>
          </p>
        </div>

        <div className="bg-[#1E1E35] p-6 text-center rounded-lg">
          <h3 className="text-base mb-2">{t.airPressure}</h3>
          <p className="text-6xl font-bold">
            {weather.main.pressure}
            <span className="text-4xl font-normal">mb</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Highlights;