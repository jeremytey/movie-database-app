import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../services/tmdbApi";
import { isInWatchlist,addToWatchlist,removeFromWatchlist } from "../utils/watchlistHelpers";

function MovieCard({ movie, showWatchlistButton = true }) {

    const navigate = useNavigate();
    const inWatchlist = isInWatchlist(movie.id);

    function handleCardClick() {
        // Navigate to movie details page
        navigate(`/movies/${movie.id}`);
    }
    
    function handleWatchlistClick(e) {
        e.stopPropagation(); // Prevent triggering card click
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }

        window.location.reload(); // Refresh to update watchlist status
    }

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

  return(
      <div className = "movie-card" onClick={handleCardClick}>
        <img src={posterUrl} alt={movie.title} />

        {showWatchlistButton && (
          <button
            className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
            onClick={handleWatchlistClick}
          >
            {inWatchlist ? 'X' : '➕'}
          </button>
        )}

        <div className="movie-card-content">
          <h3>{movie.title}</h3>
          <p className = "movie-rating">⭐{movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
  )
}

export default MovieCard;