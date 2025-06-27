"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "twi" | "fr";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    theme: "Theme",
    language: "Language",
    logout: "Logout",
    logoutDevice: "Log out on this device",
    light: "Light",
    dark: "Dark",
    english: "English",
    twi: "Twi",
    french: "French",
    // Add more keys as needed
  },
  twi: {
    theme: "Tema",
    language: "Kasa",
    logout: "Pue",
    logoutDevice: "Pue wɔ saa fon yi so",
    light: "Kɛse",
    dark: "Tuntum",
    english: "Borɔfo",
    twi: "Twi",
    french: "Frɛnkye",
    // Add more keys as needed
  },
  fr: {
    theme: "Thème",
    language: "Langue",
    logout: "Déconnexion",
    logoutDevice: "Déconnexion sur cet appareil",
    light: "Clair",
    dark: "Sombre",
    english: "Anglais",
    twi: "Twi",
    french: "Français",
    // Add more keys as needed
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
