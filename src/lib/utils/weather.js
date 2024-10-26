export function convertTemperature(temp, fromUnit = 'C', toUnit = 'F') {
  if (fromUnit === toUnit) return temp;
  if (fromUnit === 'C' && toUnit === 'F') {
    return (temp * 9/5) + 32;
  }
  return (temp - 32) * 5/9;
}

export function getWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                     'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatWindSpeed(speed, unit = 'ms') {
  if (unit === 'mph') {
    return `${(speed * 2.237).toFixed(1)} mph`;
  }
  return `${speed.toFixed(1)} m/s`;
}

export function getWeatherIcon(code, time) {
  const hour = time ? new Date(time).getHours() : new Date().getHours();
  const isNight = hour < 6 || hour > 18;
  
  const iconMap = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '🌨️',
    '13n': '🌨️',
    '50d': '🌫️',
    '50n': '🌫️'
  };

  return iconMap[code] || '☁️';
}

export function getCountryFlag(countryCode) {
  const FLAGS = {
    'AF': '🇦🇫', 'AX': '🇦🇽', 'AL': '🇦🇱', 'DZ': '🇩🇿', 'AS': '🇦🇸', 'AD': '🇦🇩', 'AO': '🇦🇴', 'AI': '🇦🇮', 
    'AQ': '🇦🇶', 'AG': '🇦🇬', 'AR': '🇦🇷', 'AM': '🇦🇲', 'AW': '🇦🇼', 'AU': '🇦🇺', 'AT': '🇦🇹', 'AZ': '🇦🇿', 
    'BS': '🇧🇸', 'BH': '🇧🇭', 'BD': '🇧🇩', 'BB': '🇧🇧', 'BY': '🇧🇾', 'BE': '🇧🇪', 'BZ': '🇧🇿', 'BJ': '🇧🇯', 
    'BM': '🇧🇲', 'BT': '🇧🇹', 'BO': '🇧🇴', 'BA': '🇧🇦', 'BW': '🇧🇼', 'BV': '🇧🇻', 'BR': '🇧🇷', 'IO': '🇮🇴', 
    'BN': '🇧🇳', 'BG': '🇧🇬', 'BF': '🇧🇫', 'BI': '🇧🇮', 'KH': '🇰🇭', 'CM': '🇨🇲', 'CA': '🇨🇦', 'CV': '🇨🇻', 
    'KY': '🇰🇾', 'CF': '🇨🇫', 'TD': '🇹🇩', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CX': '🇨🇽', 'CC': '🇨🇨', 'CO': '🇨🇴', 
    'KM': '🇰🇲', 'CG': '🇨🇬', 'CD': '🇨🇩', 'CK': '🇨🇰', 'CR': '🇨🇷', 'CI': '🇨🇮', 'HR': '🇭🇷', 'CU': '🇨🇺', 
    'CY': '🇨🇾', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'DJ': '🇩🇯', 'DM': '🇩🇲', 'DO': '🇩🇴', 'EC': '🇪🇨', 'EG': '🇪🇬', 
    'SV': '🇸🇻', 'GQ': '🇬🇶', 'ER': '🇪🇷', 'EE': '🇪🇪', 'ET': '🇪🇹', 'FK': '🇫🇰', 'FO': '🇫🇴', 'FJ': '🇫🇯', 
    'FI': '🇫🇮', 'FR': '🇫🇷', 'GF': '🇬🇫', 'PF': '🇵🇫', 'TF': '🇹🇫', 'GA': '🇬🇦', 'GM': '🇬🇲', 'GE': '🇬🇪', 
    'DE': '🇩🇪', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GR': '🇬🇷', 'GL': '🇬🇱', 'GD': '🇬🇩', 'GP': '🇬🇵', 'GU': '🇬🇺', 
    'GT': '🇬🇹', 'GG': '🇬🇬', 'GN': '🇬🇳', 'GW': '🇬🇼', 'GY': '🇬🇾', 'HT': '🇭🇹', 'HM': '🇭🇲', 'VA': '🇻🇦', 
    'HN': '🇭🇳', 'HK': '🇭🇰', 'HU': '🇭🇺', 'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IR': '🇮🇷', 'IQ': '🇮🇶', 
    'IE': '🇮🇪', 'IM': '🇮🇲', 'IL': '🇮🇱', 'IT': '🇮🇹', 'JM': '🇯🇲', 'JP': '🇯🇵', 'JE': '🇯🇪', 'JO': '🇯🇴', 
    'KZ': '🇰🇿', 'KE': '🇰🇪', 'KI': '🇰🇮', 'KP': '🇰🇵', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KG': '🇰🇬', 'LA': '🇱🇦', 
    'LV': '🇱🇻', 'LB': '🇱🇧', 'LS': '🇱🇸', 'LR': '🇱🇷', 'LY': '🇱🇾', 'LI': '🇱🇮', 'LT': '🇱🇹', 'LU': '🇱🇺', 
    'MO': '🇲🇴', 'MK': '🇲🇰', 'MG': '🇲🇬', 'MW': '🇲🇼', 'MY': '🇲🇾', 'MV': '🇲🇻', 'ML': '🇲🇱', 'MT': '🇲🇹', 
    'MH': '🇲🇭', 'MQ': '🇲🇶', 'MR': '🇲🇷', 'MU': '🇲🇺', 'YT': '🇾🇹', 'MX': '🇲🇽', 'FM': '🇫🇲', 'MD': '🇲🇩', 
    'MC': '🇲🇨', 'MN': '🇲🇳', 'ME': '🇲🇪', 'MS': '🇲🇸', 'MA': '🇲🇦', 'MZ': '🇲🇿', 'MM': '🇲🇲', 'NA': '🇳🇦', 
    'NR': '🇳🇷', 'NP': '🇳🇵', 'NL': '🇳🇱', 'NC': '🇳🇨', 'NZ': '🇳🇿', 'NI': '🇳🇮', 'NE': '🇳🇪', 'NG': '🇳🇬', 
    'NU': '🇳🇺', 'NF': '🇳🇫', 'MP': '🇲🇵', 'NO': '🇳🇴', 'OM': '🇴🇲', 'PK': '🇵🇰', 'PW': '🇵🇼', 'PS': '🇵🇸', 
    'PA': '🇵🇦', 'PG': '🇵🇬', 'PY': '🇵🇾', 'PE': '🇵🇪', 'PH': '🇵🇭', 'PN': '🇵🇳', 'PL': '🇵🇱', 'PT': '🇵🇹', 
    'PR': '🇵🇷', 'QA': '🇶🇦', 'RE': '🇷🇪', 'RO': '🇷🇴', 'RU': '🇷🇺', 'RW': '🇷🇼', 'BL': '🇧🇱', 'SH': '🇸🇭', 
    'KN': '🇰🇳', 'LC': '🇱🇨', 'MF': '🇲🇫', 'PM': '🇵🇲', 'VC': '🇻🇨', 'WS': '🇼🇸', 'SM': '🇸🇲', 'ST': '🇸🇹', 
    'SA': '🇸🇦', 'SN': '🇸🇳', 'RS': '🇷🇸', 'SC': '🇸🇨', 'SL': '🇸🇱', 'SG': '🇸🇬', 'SK': '🇸🇰', 'SI': '🇸🇮', 
    'SB': '🇸🇧', 'SO': '🇸🇴', 'ZA': '🇿🇦', 'GS': '🇬🇸', 'ES': '🇪🇸', 'LK': '🇱🇰', 'SD': '🇸🇩', 'SR': '🇸🇷', 
    'SJ': '🇸🇯', 'SZ': '🇸🇿', 'SE': '🇸🇪', 'CH': '🇨🇭', 'SY': '🇸🇾', 'TW': '🇹🇼', 'TJ': '🇹🇯', 'TZ': '🇹🇿', 
    'TH': '🇹🇭', 'TL': '🇹🇱', 'TG': '🇹🇬', 'TK': '🇹🇰', 'TO': '🇹🇴', 'TT': '🇹🇹', 'TN': '🇹🇳', 'TR': '🇹🇷', 
    'TM': '🇹🇲', 'TC': '🇹🇨', 'TV': '🇹🇻', 'UG': '🇺🇬', 'UA': '🇺🇦', 'AE': '🇦🇪', 'GB': '🇬🇧', 'US': '🇺🇸', 
    'UM': '🇺🇲', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VU': '🇻🇺', 'VE': '🇻🇪', 'VN': '🇻🇳', 'VG': '🇻🇬', 'VI': '🇻🇮', 
    'WF': '🇼🇫', 'EH': '🇪🇭', 'YE': '🇾🇪', 'ZM': '🇿🇲', 'ZW': '🇿🇼'
  };

  if (!countryCode) return '🏳️';
  return FLAGS[countryCode.toUpperCase()] || '🏳️';
}