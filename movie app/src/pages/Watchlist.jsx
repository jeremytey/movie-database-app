import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovieById} from '../services/tmdbApi';
import { getWatchlistIds } from '../utils/watchlistHelpers';
import MovieCard from '../components/MovieCard';
import ErrorMessage from '../components/ErrorMessage';

function Watchlist() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function loadWatchlist() {
        setLoading(true);
        setError(null);
        
        try {
          const ids = getWatchlistIds();
          if (ids.length === 0) {
            setWatchlistMovies([]);
            setLoading(false);
            return;
          }

          const moviePromises = ids.map(id => fetchMovieById(id));
          const movies = await Promise.all(moviePromises);
          setWatchlistMovies(movies);
        } catch (err) {
          setError("Failed to load watchlist. Please try again.");
        } finally {
          setLoading(false);
        }
      }
      loadWatchlist();
    }, []);

    if (loading) {
      return <p className="loading">Loading watchlist...</p>;
    }

    if (error) {
      return (
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      );
    }

    if (watchlistMovies.length === 0) {
      return(
        <div className="empty">
          <h2>Your watchlist is empty.</h2>
          <p>Add movies to your watchlist to see them here.</p>
          <Link to="/movies">Browse Movies Here</Link>
        </div>
      )
    }

  return(
    <div>
      <h1>Your Watchlist</h1>
      <div className="movie-grid">
        {watchlistMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  ) 
}

export default Watchlist;

//array, contain single objects{id: , name: , description: ....}
// load corresponding movie details to movie ids
// if no movie ids from localStorage, return