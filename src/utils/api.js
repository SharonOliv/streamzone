const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchFavourites = async () => {
  const response = await fetch(`${API_BASE_URL}/favourites`);
  if (!response.ok) throw new Error("Failed to fetch favourites.");
  return response.json();
};

export const fetchMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`);
  if (!response.ok) throw new Error("Failed to fetch movies.");
  return response.json();
};

export const addFavourite = async (movie) => {
  const response = await fetch(`${API_BASE_URL}/favourites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error("Failed to add favourite.");
  return response.json();
};

export const deleteFavourite = async (id) => {
  const response = await fetch(`${API_BASE_URL}/favourites/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete favourite.");
  return response.json();
};
