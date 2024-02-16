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

const average = (arr) =>
   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "a37084cd";

function App() {
   const [movies, setMovies] = useState(tempMovieData);
   const [watched, setWatched] = useState(tempWatchedData);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [query, setQuery] = useState("dune");
   const [selectedId, setSelectedId] = useState(null);

   // const tempQuery = "Transformers";

   // useEffect(() => {
   //    console.log("a");
   // }, []);

   // useEffect(() => {
   //    console.log("b");
   // }, []);

   // console.log("c");

   function handleSelectMovie(id) {
      setSelectedId((selectedId) => (id === selectedId ? null : id));
   }

   function handleCloseMovie() {
      setSelectedId(null);
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

// WatchBox
// function WatchedBox() {
//      const [watched, setWatched] = useState(tempWatchedData);
//      const [isOpen2, setIsOpen2] = useState(true);

//      return (
//           <div className="box">
//                <button
//                     className="btn-toggle"
//                     onClick={() => setIsOpen2((open) => !open)}
//                >
//                     {isOpen2 ? "–" : "+"}
//                </button>

//                {isOpen2 && (
//                     <>
//                          <WatchedSummary watched={watched} />
//                          <WatchedMoviesList watched={watched} />
//                     </>
//                )}
//           </div>
//      );
// }

// ListBox component

// WatchBox component
function WatchedSummary({ watched }) {
   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
   const avgUserRating = average(watched.map((movie) => movie.userRating));
   const avgRuntime = average(watched.map((movie) => movie.runtime));

   return (
      <div className="summary">
         <h2>Movies you watched</h2>
         <div>
            <p>
               <span>#️⃣</span>
               <span>{watched.length} movies</span>
            </p>
            <p>
               <span>⭐️</span>
               <span>{avgImdbRating}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{avgUserRating}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{avgRuntime} min</span>
            </p>
         </div>
      </div>
   );
}

function WatchedMoviesList({ watched }) {
   return (
      <ul className="list">
         {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} />
         ))}
      </ul>
   );
}

function WatchedMovie({ movie }) {
   return (
      <li key={movie.imdbID}>
         <img src={movie.Poster} alt={`${movie.Title} poster`} />
         <h3>{movie.Title}</h3>
         <div>
            <p>
               <span>⭐️</span>
               <span>{movie.imdbRating}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{movie.userRating}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{movie.runtime} min</span>
            </p>
         </div>
      </li>
   );
}

export default App;
