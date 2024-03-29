import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

const tempMovieData = [
   {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
   },
   {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
   },
   {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
   }
];
const tempWatchedData = [
   {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10
   },
   {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9
   }
];
const KEY = "a37084cd";

function App() {
   const [query, setQuery] = useState("dune");
   const [movies, setMovies] = useState([]);
   const [watched, setWatched] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [selectedId, setSelectedId] = useState(null);

   function handleSelectMovie(id) {
      setSelectedId((selectedId) => (id === selectedId ? null : id));
   }

   function handleCloseMovie() {
      setSelectedId(null);
   }

   function handleAddWatched(movie) {
      setWatched((watched) => [...watched, movie]);
   }

   useEffect(() => {
      const fetchMovie = async () => {
         try {
            setIsLoading(true);
            setError("");

            const res = await fetch(
               `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            );

            if (!res.ok)
               throw new Error("Something wrong with fetching movies");
            // error 500

            const data = await res.json();

            if (data.Response === "False")
               throw new Error("Movie not found");
            // error 404

            setMovies(data.Search);
         } catch (error) {
            setError(error.message);
         } finally {
            setIsLoading(false);
         }
      };

      if (query.length < 3) {
         setMovies([]);
         setError("");
         return;
      }

      fetchMovie();
   }, [query]);

   return (
      <>
         <NavBar>
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
         </NavBar>

         <Main>
            <Box>
               {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
               {isLoading && <Loader />}
               {!isLoading && !error && (
                  <MovieList
                     movies={movies}
                     onSelectMovie={handleSelectMovie}
                  />
               )}
               {error && <ErrorMessage message={error} />}
            </Box>

            <Box>
               <>
                  {selectedId ? (
                     <MovieDetails
                        selectedId={selectedId}
                        onCloseMovie={handleCloseMovie}
                        onAddWatched={handleAddWatched}
                     />
                  ) : (
                     <>
                        <WatchedSummary watched={watched} />
                        <WatchedMoviesList watched={watched} />
                     </>
                  )}
               </>
            </Box>
         </Main>
      </>
   );
}

export default App;
