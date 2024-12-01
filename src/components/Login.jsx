// This is login page
// Have movie themed page has sign in option as buttin on page

// Has navbar of the page
// Has logo on left 
// Home,movies,livetv,tvshows in center
// sign in option on right

// after logging or signing in it leads to home page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch users from db.json
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          setError(""); // Clear error message
          navigate("/home"); // Redirect to home page after login
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((err) => {
        setError("Error fetching user data");
        console.error("Error:", err);
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <div className="text-center">
            <a href="/forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
