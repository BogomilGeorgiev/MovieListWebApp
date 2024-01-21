import './NumResults.css';

export function NumResults({ movies }) {

    return (
        <p className="num-results">You found <span>{movies.length}</span> results</p>
    )
}