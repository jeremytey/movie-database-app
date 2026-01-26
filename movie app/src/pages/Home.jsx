import { useState, useEffect} from "react";
import { fetchTrendingMovies } from "../services/tmdbApi";
import ErrorMessage from "../components/ErrorMessage";
import MovieCard from "../components/MovieCard";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function loadMovies() {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchTrendingMovies();
          setMovies(data.results);
        } catch (err) {
          setError("Failed to fetch movies. Please try again.");
        } finally {
          setLoading(false);
        }
      }
      loadMovies();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()}
       />
    );
    }

  return (
  <div>
    <h1> Home Page - Trending Movies </h1>
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
  );
}
export default Home;



