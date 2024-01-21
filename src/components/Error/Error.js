import './Error.css';

export function ErrorMessage({ error }) {
    return <p className="error">
        <span>😕 {error}</span>
    </p>
}