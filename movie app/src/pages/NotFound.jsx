import { Link } from 'react-router-dom';

function NotFound() {
  return (
  <div className = "empty">
  <h2> 404 - Page Not Found </h2>
  <p> Oops! The page you are looking for does not exist. </p>
  <Link to="/"> Go back to Home Page </Link>


  </div>
  )
}

export default NotFound;