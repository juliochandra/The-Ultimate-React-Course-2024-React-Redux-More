import React from "react";
import { useState } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

function Test() {
   const [movieRating, setMovieRating] = useState(0);

   return (
      <div>
         <StarRating
            color="blue"
            maxRating={10}
            onSetRating={setMovieRating}
         />
         <p>This Movie was rated {movieRating} stars</p>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <StarRating
         maxRating={5}
         message={["terrible", "bad", "okay", "good", "amazing"]}
      />
      <StarRating
         size={24}
         className="test"
         defaultRating={3}
         maxRating={5}
      />
      <Test />

      {/* <StarRating maxRating={10} /> */}
   </React.StrictMode>
);
