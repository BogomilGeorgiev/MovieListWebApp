import { Movie } from "./Movie"
import './MovieList.css';

export function MovieList({ movies, onSelectedId }) {


    return (
        <ul className="list list-movies">
            {movies?.map((m) => (
                <Movie key={m.imdbID} movie={m} onSelectedId={onSelectedId} />))}
        </ul>
    )
}