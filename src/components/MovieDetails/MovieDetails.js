import StarRating from "../StarRating/StarRating"
import { useState, useEffect } from "react";
import { Loader } from '../Loader/Loader';
import './MovieDetails.css';

const KEY = "b3e1659b";

export default function MovieDetails({ selectedId, onCloseMovie, onAddMovie, watched }) {
    const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});


    const { Title: title,
        Year: year,
        Released: released,
        Runtime: runtime,
        Genre: genre,
        Director: director,
        Poster: poster,
        imdbRating,
        Plot: plot,
        Actors: actors
    } = movie;

    const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (m) => m.imdbID === selectedId)?.userRating;


    function addToWatched() {

        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            runtime: Number(runtime.split(' ').at(0)),
            imdbRating: Number(imdbRating),
            userRating

        }

        onAddMovie(newWatchedMovie);
        onCloseMovie();
    }


    useEffect(() => {

        async function getMovieDetails() {

            try {
                setLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

                if (!res.ok) throw new Error('Fetching failed');

                const data = await res.json();
                setMovie(data);
                setLoading(false);

            } catch (error) {
                alert(error.message);
            }

        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return
        document.title = `Movie | ${title}`;

        return () => {
            document.title = 'My Movie List'
        }
    }, [title])

    useEffect(() => {

        function callback(e) {
            if (e.code === 'Escape') {
                onCloseMovie();

            }
        }

        document.addEventListener('keydown', callback);

        return () => {

            document.removeEventListener('keydown', callback);
        }

    }, [onCloseMovie])


    return (
        <div className="movie-details-box">
            {loading ? <Loader />
                : (<>
                    <header>
                        <button className="back-btn" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`${title} movie poster is missing`} />
                        <div className="movie-details">
                            <h2>{title}</h2>
                            <p>{released}</p>
                            <p>{genre}</p>
                            <p>
                                <span>imdbR ⭐️:</span>
                                <em>{imdbRating}</em>
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="star-rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        onSetRating={setUserRating}
                                        size={23}
                                    />
                                    {userRating > 0 &&
                                        (<button className="add-btn" onClick={addToWatched}>
                                            Add to List
                                        </button>
                                        )}
                                </>
                            ) : (
                                <p>{`You have given a rating of ${watchedUserRating}`}</p>)}


                        </div>
                        <em>{plot}</em>
                        <p><span>Starring:</span>{actors}</p>
                        <p><span>Directed by:</span>{director}</p>
                    </section>
                </>)}
        </div>
    )
}