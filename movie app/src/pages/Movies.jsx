import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, discoverMovies } from '../services/tmdbApi';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  // Fetch movies when query or page changes
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        if (query) {
          const data = await searchMovies(query, page);
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } else {
          const data = await discoverMovies(page);
          setMovies(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query, page]); // rerun when query or page changes

  function handleSearch(searchQuery) {
    setSearchParams({ query: searchQuery, page: 1 });
  }

  function handlePageChange(newPage) {
    if (query){
      setSearchParams({ query: query, page: newPage });
    } else {
      setSearchParams({ page: newPage });
    }
  }

  return (
  <div>
      <h1>Browse Movies</h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="loading">Loading movies...</p>
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      ) : movies.length === 0 ? (
        <p className="empty">No movies found. Try a different search.</p>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Movies;