import React, { createContext, useContext } from 'react';

const languageMap: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    pt: "Portuguese",
    af: "Afrikaans",
    nl: "Dutch",
    ru: "Russian",
    sv: "Swedish",
    da: "Danish",
    fi: "Finnish",
    no: "Norwegian",
    hu: "Hungarian",
    pl: "Polish",
    cs: "Czech",
    sk: "Slovak",
    tr: "Turkish",
    ar: "Arabic",
    he: "Hebrew",
    th: "Thai",
    vi: "Vietnamese",
    ms: "Malay",
    id: "Indonesian",
    bg: "Bulgarian",
    ro: "Romanian",
    sr: "Serbian",
    hr: "Croatian",
    lt: "Lithuanian",
    lv: "Latvian",
    et: "Estonian",
    el: "Greek",
    hi: "Hindi",
    bn: "Bengali",
    ml: "Malayalam",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    mr: "Marathi",
    ur: "Urdu",
};

const LanguageContext = createContext(languageMap);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageContext.Provider value={languageMap}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageMap = () => useContext(LanguageContext);