export async function fetchLanguages() {
  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const languagesSet = new Set<string>();
    data.forEach((country) => {
      Object.values(country.languages || {}).forEach((language) =>
        languagesSet.add(language)
      );
    });
    return Array.from(languagesSet).map((language) => ({
      value: language,
      label: language,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
