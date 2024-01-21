import './WatchedBox.css';

const average = (arr) =>
    arr.reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

export function WatchedBox({ watched }) {

    const avgMovieRating = average(watched.map((m) => m.imdbRating));
    const avgUserRating = average(watched.map((m) => m.userRating));
    const avgRuntime = average(watched.map((m) => m.runtime));


    return (
        <div className="watched-summary">
            <>
                <h1>Watched Movies</h1>
                <div className="watched-stats">
                    <p>#️⃣ {watched.length} {watched.length === 1 ? 'movie' : 'movies'}</p>
                    <p>⭐️ {avgMovieRating.toFixed(2)}</p>
                    <p>✨ {avgUserRating.toString().length <= 2 ? avgUserRating : avgUserRating.toFixed(2)}</p>
                    <p>⏳ {Math.round(avgRuntime)} min</p>
                </div>
            </>
        </div>
    )
}