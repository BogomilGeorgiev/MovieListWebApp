import './NavBar.css';

export function NavBar({ children }) {

    return (
        <nav className="nav-bar">
            {children}
        </nav>
    )
}