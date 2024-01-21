
export function Movie({ movie, onSelectedId }) {

    return (
        <li onClick={() => onSelectedId(movie.imdbID)}>
            <img alt={`${movie.Title} movie img is missing`} src={movie.Poster} />
            <h3>{movie.Title}</h3>
            <div>
                <span>🎞 </span>
                <p>{movie.Year}</p>
            </div>
        </li>
    )
}