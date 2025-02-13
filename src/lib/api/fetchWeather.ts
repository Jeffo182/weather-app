const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

interface FetchWeatherParams {
  city: string;
  unit?: 'metric' | 'imperial';
}

export async function fetchWeather({ city, unit = 'metric' }: FetchWeatherParams) {
  console.log('city', city);

  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=${unit}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  } finally {
    console.log('Busca finalizada');
  }
}