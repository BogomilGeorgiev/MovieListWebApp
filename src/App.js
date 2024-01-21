import { useState } from "react";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useLocalStorage } from "./components/CustomHooks/useLocalStorage";
import useMovies from "./components/CustomHooks/useMovies";
import { NavBar } from "./components/NavBar/NavBar";
import { Logo } from "./components/NavBar/Logo";
import { Search } from "./components/NavBar/Search";
import { NumResults } from "./components/NumResults/NumResults";
import { Main } from "./components/Containers/Main";
import { Box } from "./components/Containers/Box";
import { MovieList } from "./components/MoviesList/MovieList";
import { WatchedBox } from "./components/WatchedBox/WatchedBox";
import { WatchedList } from "./components/WatchedList/WatchedList";
import { Loader } from "./components/Loader/Loader";
import { ErrorMessage } from "./components/Error/Error";


export default function App() {
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useLocalStorage([], 'watched');
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);



  function handleSelectedId(id) {
    setSelectedId((selectedId) => selectedId === id ? null : id);

  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);


  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));
  }

  return (
    <div className="App">
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error &&
            (<MovieList movies={movies} onSelectedId={handleSelectedId} />)}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId
            ? <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddWatchedMovie}
              watched={watched} />
            :
            <>
              <WatchedBox watched={watched} />
              <WatchedList watched={watched}
                onDeleteMovie={handleDeleteMovie}
                onSelectedId={handleSelectedId} />
            </>}
        </Box>
      </Main>
    </div>
  );
}














