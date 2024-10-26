const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export async function getCurrentWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  if (data.cod !== 200) throw new Error(data.message);
  return data;
}

export async function getForecast(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  if (data.cod !== '200') throw new Error(data.message);
  
  // Process forecast to get daily max/min
  const dailyForecasts = data.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = {
        dt: curr.dt,
        temp_max: curr.main.temp_max,
        temp_min: curr.main.temp_min,
        weather: curr.weather[0]
      };
    } else {
      acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max);
      acc[date].temp_min = Math.min(acc[date].temp_min, curr.main.temp_min);
    }
    return acc;
  }, {});

  return Object.values(dailyForecasts).slice(0, 5);
}

export async function searchCities(query) {
  if (query.length < 3) return [];
  
  const response = await fetch(
    `${GEO_URL}/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  return await response.json();
}

export async function getUserLocationByIP() {
  const response = await fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`);
  const data = await response.json();
  return data.city;
}

export async function reverseGeocode(lat, lon) {
  const response = await fetch(
    `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  const [data] = await response.json();
  return data;
}

export function getCountryFlag(countryCode) {
  return String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
}