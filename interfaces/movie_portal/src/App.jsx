import { useEffect, useMemo, useState } from "react";
import MovieList from "./components/MovieList.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

const API_BASE_URL =
  import.meta.env.VITE_MOVIE_API_URL ?? __MOVIE_API_URL__ ?? "http://localhost:8080";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setStatus("loading");
      try {
        const response = await fetch(`${API_BASE_URL}/movies`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const payload = await response.json();
        setMovies(payload);
        setActiveMovieId(payload[0]?.id ?? null);
        setStatus("ready");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }

    load();
  }, []);

  const activeMovie = useMemo(
    () => movies.find((movie) => movie.id === activeMovieId) ?? null,
    [movies, activeMovieId]
  );

  if (status === "loading") {
    return (
      <main className="app">
        <p className="status">Loading catalogue…</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="app">
        <p className="error">Something went wrong: {error}</p>
      </main>
    );
  }

  return (
    <main className="app">
      <header>
        <h1>Movie Pipeline Showcase</h1>
        <p className="tagline">Continuous delivery of cinematic favourites.</p>
      </header>
      <section className="content">
        <MovieList
          movies={movies}
          activeId={activeMovieId}
          onSelect={setActiveMovieId}
        />
        <MovieDetails movie={activeMovie} />
      </section>
    </main>
  );
}
