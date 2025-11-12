import PropTypes from "prop-types";

function MovieList({ movies, activeId, onSelect }) {
  if (!movies.length) {
    return (
      <aside className="panel">
        <p className="status">No movies available.</p>
      </aside>
    );
  }

  return (
    <aside className="panel">
      <ul className="movie-list" role="list">
        {movies.map((movie) => {
          const isActive = movie.id === activeId;
          return (
            <li key={movie.id}>
              <button
                type="button"
                className={isActive ? "movie-card active" : "movie-card"}
                onClick={() => onSelect(movie.id)}
              >
                <span className="movie-title">{movie.title}</span>
                <span className="movie-meta">{movie.year}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    })
  ),
  activeId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

MovieList.defaultProps = {
  movies: [],
  activeId: undefined,
};

export default MovieList;
