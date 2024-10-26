'use client';

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Sidebar from './Sidebar';
import UnitToggle from './UnitToggle';
import WeatherCard from './WeatherCard';
import Highlights from './Highlights';
import { getCurrentWeather, getForecast } from '@/services/weather';

const inter = Inter({ subsets: ['latin'] });

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const defaultCity = 'London';
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(defaultCity),
          getForecast(defaultCity)
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      loadInitialData();
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B1B2F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1B1B2F] flex items-center justify-center text-white">
        <div className="p-6 bg-[#1E1E35] rounded-lg">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleCitySelect = async (city) => {
    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#1B1B2F] text-white flex flex-col md:flex-row ${inter.className}`}>
      <Sidebar
        weather={weather}
        onCitySelect={handleCitySelect}
        language={language}
      />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-8">
            <UnitToggle 
              unit={unit} 
              onUnitChange={setUnit}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>

          {forecast && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {forecast.map((day, index) => (
                <WeatherCard
                  key={day.dt}
                  day={day}
                  index={index}
                  unit={unit}
                  language={language}
                />
              ))}
            </div>
          )}

          {weather && (
            <Highlights
              weather={weather}
              language={language}
            />
          )}

          <footer className="text-center mt-12 text-gray-400">
            Created by William Mercês - devChallenges.io
          </footer>
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;