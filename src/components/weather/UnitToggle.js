import React from 'react';
import LanguageSelector from './LanguageSelector';

const UnitToggle = ({ unit, onUnitChange, language, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-4">
      <LanguageSelector
        language={language}
        onChange={onLanguageChange}
      />
      <div className="flex gap-3">
        <button 
          onClick={() => onUnitChange('C')}
          className={`w-10 h-10 rounded-full transition-colors ${
            unit === 'C' 
              ? 'bg-white text-[#1B1B2F]' 
              : 'bg-[#585676] text-white'
          }`}
        >
          °C
        </button>
        <button 
          onClick={() => onUnitChange('F')}
          className={`w-10 h-10 rounded-full transition-colors ${
            unit === 'F' 
              ? 'bg-white text-[#1B1B2F]' 
              : 'bg-[#585676] text-white'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;