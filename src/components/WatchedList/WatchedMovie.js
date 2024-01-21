import './Watched.css';




export function WatchedMovie({ movie, onDeleteMovie, onSelectedId }) {

    return (
        <li className="watched-list-li" onClick={(e) => e.target.textContent !== '❌' && onSelectedId(movie.imdbID)}>
            <img src={movie.poster} alt={`${movie.title} img is missing`}></img>
            <h3>{movie.title}</h3>
            <div className="watched-stats">
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>✨</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>⏳</p>
                <p>{movie.runtime}</p>
                <button className="del-btn" onClick={() => onDeleteMovie(movie.imdbID)}>❌</button>
            </div>
        </li >
    )
}