import { Link } from "react-router-dom";
import "./Navbar.css"; // Add your CSS for the Navbar

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* You can add your logo here */}
          <img
            src="src/assets/final-logo (1).png"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/livetv">Live TV</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tvshows">TV Shows</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-light" to="/login">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
