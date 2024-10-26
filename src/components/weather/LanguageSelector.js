import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { LANGUAGES } from '@/lib/constants/languages';

const FLAG_CODES = {
  'en': 'us',    // Estados Unidos
  'pt-BR': 'br', // Brasil
  'es': 'es',    // Espanha
  'ja': 'jp'     // Japão
};

const LanguageFlag = ({ languageCode }) => {
  const flagCode = FLAG_CODES[languageCode];
  return (
    <div className="relative w-6 h-4 inline-block align-middle">
      <Image
        src={`https://flagcdn.com/w40/${flagCode}.png`}
        alt={`${languageCode} flag`}
        fill
        className="object-cover rounded-sm"
        sizes="24px"
      />
    </div>
  );
};

const LanguageSelector = ({ language, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1B1B2F] hover:bg-[#2B2B3F] transition-colors rounded-lg"
      >
        <LanguageFlag languageCode={language} />
        <span>{LANGUAGES[language].name}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1B1B2F] border border-gray-600 rounded-lg shadow-lg overflow-hidden z-50">
          {Object.entries(LANGUAGES).map(([code, { name }]) => (
            <button
              key={code}
              onClick={() => {
                onChange(code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-[#2B2B3F] transition-colors flex items-center gap-2"
            >
              <LanguageFlag languageCode={code} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;