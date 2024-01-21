import { WatchedMovie } from "./WatchedMovie"

export function WatchedList({ watched, onDeleteMovie, onSelectedId }) {


    return (
        <ul className="list">
            {watched.map((movie) =>
                <WatchedMovie key={movie.imdbRating}
                    movie={movie}
                    onDeleteMovie={onDeleteMovie}
                    onSelectedId={onSelectedId} />)}
        </ul>
    )
}