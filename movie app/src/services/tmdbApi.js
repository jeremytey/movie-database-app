const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  
  return response.json();
}

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  
  return response.json();
}

export async function discoverMovies(page = 1, sortBy = 'popularity.desc') {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to discover movies');
  }
  
  return response.json();
}

export async function fetchMovieById(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  
  return response.json();
}