import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { fetchMovieById, IMAGE_BASE_URL } from '../services/tmdbApi';
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from '../utils/watchlistHelpers';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]); // Re-run when id changes

  function handleWatchlistToggle() {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
    window.location.reload(); // Refresh to update watchlist status
  }

  if (loading) {
    return <p className = "loading">Loading movie details...</p>;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (!movie) {
    return <p>No movie found.</p>;
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const inWatchlist = isInWatchlist(movie.id);

  return (
  <div className="movie-detail">
    <img src={posterUrl} alt={movie.title} />
    <div className="movie-info">
      <h1>{movie.title}</h1>

      <div className="movie-meta">
        <span>⭐ {movie.vote_average.toFixed(1)}</span>
        <span>📅 {movie.release_date}</span>
      </div>

      <p className = "movie-overview">{movie.overview}</p>

      {/* Genres - array of genre objects */}
      <div className = "genres">
        {movie.genres.map((genre) => (
          <span key={genre.id} className="genre-tag">
            {genre.name}
          </span>
        ))}
      </div>

      <button
        className = {`detail-watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
        onClick={handleWatchlistToggle}
      >
        {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>


  </div>
  )
}

export default MovieDetail;