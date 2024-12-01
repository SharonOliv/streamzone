import { useEffect, useState } from "react";
import "./Livetv.css"; // Optional: For styling if needed.

const Livetv = () => {
  const [liveTvChannels, setLiveTvChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newChannel, setNewChannel] = useState({
    name: "",
    posterImage: "",
    category: "",
    description: "",
  });
  const [editChannelId, setEditChannelId] = useState(null);

  useEffect(() => {
    fetchLiveTv(); // Fetch live TV channels on mount
  }, []);

  const fetchLiveTv = async () => {
    try {
      const response = await fetch("http://localhost:3001/livetv");
      if (!response.ok) throw new Error("Failed to fetch live TV channels.");
      const data = await response.json();
      setLiveTvChannels(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddChannel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/livetv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChannel),
      });
      if (!response.ok) throw new Error("Failed to add channel.");
      await fetchLiveTv(); // Refresh the list
      setNewChannel({ name: "", posterImage: "", category: "", description: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteChannel = async (id) => {
    try {
      await fetch(`http://localhost:3001/livetv/${id}`, { method: "DELETE" });
      await fetchLiveTv(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditChannel = (channel) => {
    setEditChannelId(channel.id);
    setNewChannel(channel); // Pre-fill form with current channel details
  };

  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/livetv/${editChannelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChannel),
      });
      if (!response.ok) throw new Error("Failed to update channel.");
      await fetchLiveTv(); // Refresh the list
      setEditChannelId(null); // Reset edit state
      setNewChannel({ name: "", posterImage: "", category: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="livetv-container">Loading live TV channels...</div>;
  }

  if (error) {
    return <div className="livetv-container">Error: {error}</div>;
  }

  return (
    <div className="livetv-container">
      <h1>Live TV Channels</h1>

      {/* Form to Add/Edit a Channel */}
      <div className="add-channel-section">
        <form onSubmit={editChannelId ? handleUpdateChannel : handleAddChannel} className="add-livetv-form">
          <h3>{editChannelId ? "Edit Channel" : "Add a New Channel"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={newChannel.name}
            onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newChannel.posterImage}
            onChange={(e) => setNewChannel({ ...newChannel, posterImage: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newChannel.category}
            onChange={(e) => setNewChannel({ ...newChannel, category: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newChannel.description}
            onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">{editChannelId ? "Update Channel" : "Add Channel"}</button>
          {editChannelId && (
            <button type="button" onClick={() => setEditChannelId(null)}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Live TV Channels Grid */}
      <div className="livetv-grid">
        {liveTvChannels.map((channel) => (
          <div key={channel.id} className="livetv-card">
            <img src={channel.posterImage} alt={channel.name} />
            <h2>{channel.name}</h2>
            <p>
              <strong>Category:</strong> {channel.category}
            </p>
            <p>{channel.description}</p>
            <div className="button-container">
  <button className="edit-btn" onClick={() => handleEditChannel(channel)}>Edit</button>
  <button className="delete-btn" onClick={() => handleDeleteChannel(channel.id)}>Delete</button>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Livetv;
