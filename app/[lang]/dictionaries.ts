import "server-only"

// Define the type for supported locales
type Locale = "en" | "de" | "es" | "fr"

// Map locales to their dictionary import functions
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  de: () => import("../../dictionaries/de.json").then((module) => module.default),
  es: () => import("../../dictionaries/es.json").then((module) => module.default),
  fr: () => import("../../dictionaries/fr.json").then((module) => module.default),
}

// Function to get the dictionary for a given locale
export const getDictionary = async (locale: Locale) => dictionaries[locale]()
