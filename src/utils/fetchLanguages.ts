interface Country {
  languages?: { [key: string]: string };
}

const CACHE_KEY = "languagesCache";
const CACHE_EXPIRY_KEY = "languagesCacheExpiry";
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

function isCacheExpired() {
  const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry, 10);
}

export async function fetchLanguages() {
  if (!isCacheExpired()) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    const data: Country[] = await response.json();
    const languagesSet = new Set<string>();
    data.forEach((country) => {
      Object.values(country.languages || {}).forEach((language) =>
        languagesSet.add(language as string)
      );
    });
    const languages = Array.from(languagesSet).map((language) => ({
      value: language,
      label: language,
    }));
    localStorage.setItem(CACHE_KEY, JSON.stringify(languages));
    localStorage.setItem(
      CACHE_EXPIRY_KEY,
      (Date.now() + CACHE_EXPIRY_TIME).toString()
    );
    return languages;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
