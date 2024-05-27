import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Wrapper from "../dashboard/Wrapper";

const MoviesWithShowtimes = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/showtimes");
        if (!response.ok) {
          throw new Error("Failed to fetch showtimes");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  return (
   <Wrapper>
     <div>
      <h2>Movies and Showtimes</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        movies.length > 0 &&
        movies.map((movie) => (
          <div key={movie.movie_id}>
            <h3>{movie.title}</h3>
            <ul>
              {movie.showtimes.map((showtime) => (
                <li key={showtime.showtime_id}>
                  {showtime.start_time} - {showtime.end_time} at {showtime.hall_name}
                  <button
                    onClick={() => navigate(`/dashboard/reservation/reserve/${showtime.showtime_id}`)}
                  >
                    Reserve
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
   </Wrapper>
  );
};

export default MoviesWithShowtimes;
