import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/watchlist">Watchlist</Link>
      </nav>
      <main>
        
        <Outlet />
      </main>
    </>
  );
}