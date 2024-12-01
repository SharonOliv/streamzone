import { useEffect, useState } from "react";
import "./Tvshows.css";

const Tvshows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newShow, setNewShow] = useState({ name: "", poster: "", rating: "", description: "" });
  const [editingShow, setEditingShow] = useState(null); // State for editing

  useEffect(() => {
    fetchTvShows(); // Fetch TV shows on mount
  }, []);

  const fetchTvShows = async () => {
    try {
      const response = await fetch("http://localhost:3001/tvshows");
      if (!response.ok) throw new Error("Failed to fetch TV shows.");
      const data = await response.json();
      setTvShows(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddTvShow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/tvshows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShow),
      });
      if (!response.ok) throw new Error("Failed to add TV show.");
      await fetchTvShows(); // Refresh the list
      setNewShow({ name: "", poster: "", rating: "", description: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTvShow = async (id) => {
    try {
      await fetch(`http://localhost:3001/tvshows/${id}`, { method: "DELETE" });
      await fetchTvShows(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditTvShow = (tvshow) => {
    setEditingShow(tvshow);
    setNewShow({
      name: tvshow.name,
      poster: tvshow.poster,
      rating: tvshow.rating,
      description: tvshow.description,
    });
  };

  const handleUpdateTvShow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/tvshows/${editingShow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShow),
      });
      if (!response.ok) throw new Error("Failed to update TV show.");
      await fetchTvShows(); // Refresh the list
      setNewShow({ name: "", poster: "", rating: "", description: "" });
      setEditingShow(null); // Reset editing state
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="tvshows-container">Loading TV shows...</div>;
  }

  if (error) {
    return <div className="tvshows-container">Error: {error}</div>;
  }

  return (
    <div className="tvshows-container">
      <h1>TV Shows</h1>

      {/* Form to Add or Edit TV Show */}
      <form onSubmit={editingShow ? handleUpdateTvShow : handleAddTvShow} className="add-tvshow-form">
        <input
          type="text"
          placeholder="Name"
          value={newShow.name}
          onChange={(e) => setNewShow({ ...newShow, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={newShow.poster}
          onChange={(e) => setNewShow({ ...newShow, poster: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Rating"
          value={newShow.rating}
          onChange={(e) => setNewShow({ ...newShow, rating: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newShow.description}
          onChange={(e) => setNewShow({ ...newShow, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">{editingShow ? "Update TV Show" : "Add TV Show"}</button>
      </form>

      {/* TV Shows Grid */}
      <div className="tvshows-grid">
        {tvShows.map((tvshow) => (
          <div key={tvshow.id} className="tvshow-card">
            <img src={tvshow.poster} alt={tvshow.name} />
            <h2>{tvshow.name}</h2>
            <p className="rating">⭐ {tvshow.rating}</p>
            <p className="description">{tvshow.description}</p>
            <div className="button-container">
            <button className="edit-btn" onClick={() => handleEditTvShow(tvshow)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteTvShow(tvshow.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tvshows;
