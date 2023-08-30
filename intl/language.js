import { createContext, useState, useContext } from "react"


export const defaultLocale = "en"
export const locales = ["it", "en"]
export const LanguageContext = createContext([])

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale)

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  )
}

// A custom hook to get the locale and setLocale function
export const useLanguage = () => {
  const [locale, setLocale] = useContext(LanguageContext);
  return { setLocale };
};