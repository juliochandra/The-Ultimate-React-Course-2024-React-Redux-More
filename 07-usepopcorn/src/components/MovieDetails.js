import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";

const KEY = "a37084cd";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched }) {
   const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState("");

   const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre
   } = movie;

   function handleAdd() {
      const newWatchedMovie = {
         imdbID: selectedId,
         title,
         year,
         poster,
         imdbRating: Number(imdbRating),
         runtime: runtime.split(" ").at(0),
         userRating
      };
      onAddWatched(newWatchedMovie);
      onCloseMovie();
   }

   useEffect(() => {
      async function getMovieDetails() {
         setIsLoading(true);

         const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
         );
         // error 500
         if (!res.ok)
            throw new Error("Something wrong with fetching movies");

         const data = await res.json();
         // error 404
         if (data.Response === "False") throw new Error("Movie not found");

         setMovie(data);
         setIsLoading(false);
      }

      getMovieDetails();
   }, [selectedId]);

   return (
      <div className="details">
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <header>
                  <button className="btn-back" onClick={onCloseMovie}>
                     &larr;
                  </button>

                  <img src={poster} alt={`poster of the ${title} movie`} />

                  <div className="details-overview">
                     <h2>{title}</h2>
                     <p>
                        {released} &bull; {runtime}
                     </p>
                     <p>{genre}</p>
                     <p>
                        <span>⭐</span>
                        {imdbRating} IMDb rating
                     </p>
                  </div>
               </header>
               <section>
                  <div className="rating">
                     <StarRating
                        size={24}
                        maxRating={10}
                        onSetRating={setUserRating}
                     />
                     <button className="btn-add" onClick={handleAdd}>
                        + add to list
                     </button>
                  </div>
                  <p>
                     <em>{plot}</em>
                  </p>
                  <p>Starring {actors}</p>
                  <p>Directed by {director}</p>
               </section>
            </>
         )}
      </div>
   );
}

export default MovieDetails;
