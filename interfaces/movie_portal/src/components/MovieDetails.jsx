import PropTypes from "prop-types";

function MovieDetails({ movie }) {
  if (!movie) {
    return (
      <article className="panel details">
        <p className="status">Select a movie to see the synopsis.</p>
      </article>
    );
  }

  return (
    <article className="panel details" aria-live="polite">
      <img
        src={movie.poster_url}
        alt={`Poster for ${movie.title}`}
        className="poster"
        loading="lazy"
      />
      <div className="details-body">
        <h2>{movie.title}</h2>
        <p className="synopsis">{movie.synopsis}</p>
        <dl>
          <div>
            <dt>Release Year</dt>
            <dd>{movie.year}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd>{movie.rating.toFixed(1)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    poster_url: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }),
};

MovieDetails.defaultProps = {
  movie: undefined,
};

export default MovieDetails;
