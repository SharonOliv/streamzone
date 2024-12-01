import { useEffect, useState } from "react";
import "./Movies.css"; // Optional: For styling if needed.

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    name: "",
    poster: "",
    rating: "",
    description: "",
  });
  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(() => {
    fetchMovies(); // Fetch movies on mount
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3001/movies");
      if (!response.ok) throw new Error("Failed to fetch movies.");
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) throw new Error("Failed to add movie.");
      await fetchMovies(); // Refresh the list
      setNewMovie({ name: "", poster: "", rating: "", description: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:3001/movies/${id}`, { method: "DELETE" });
      await fetchMovies(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditMovie = (movie) => {
    setEditMovieId(movie.id);
    setNewMovie(movie); // Pre-fill form with current movie details
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/movies/${editMovieId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) throw new Error("Failed to update movie.");
      await fetchMovies(); // Refresh the list
      setEditMovieId(null); // Reset edit state
      setNewMovie({ name: "", poster: "", rating: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="movies-container">Loading movies...</div>;
  }

  if (error) {
    return <div className="movies-container">Error: {error}</div>;
  }

  return (
    <div className="movies-container">
      <h1>Movies</h1>

      {/* Form to Add/Edit a Movie */}
      <div className="add-movie-section">
        <form onSubmit={editMovieId ? handleUpdateMovie : handleAddMovie} className="add-movie-form">
          <h3>{editMovieId ? "Edit Movie" : "Add a New Movie"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={newMovie.name}
            onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newMovie.poster}
            onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">{editMovieId ? "Update Movie" : "Add Movie"}</button>
          {editMovieId && (
            <button type="button" onClick={() => setEditMovieId(null)}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.name} className="movie-poster" />
            <h2>{movie.name}</h2>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p>{movie.description}</p>
            <div className="button-container">
              <button className="edit-btn" onClick={() => handleEditMovie(movie)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
