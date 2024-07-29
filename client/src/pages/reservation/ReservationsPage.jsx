import React, { useEffect, useState } from "react";
import { makeReservation } from "../../services/api";
import Wrapper from "../dashboard/Wrapper";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const ReservationsPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = "http://localhost:8080/api/movies/list";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("There is an error to list movies");
        }

        const moviesResult = await response.json();
        setMovies(moviesResult);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllMovies();
  }, []);
  return (
    <Wrapper>
      <div>
        {isLoading ? (
          <Spinner />
        ) : movies.length > 0 ? (
          <div>
            <table className="w-full bg-[#907c69] rounded-md">
              <thead>
                <tr className="border-b border-white text-left">
                  <th className="p-3 uppercase text-base font-sm">
                    Title
                  </th>
                  <th className="p-3 uppercase text-base font-sm">
                    Summary
                  </th>
                  <th className="p-3 uppercase text-base font-sm">
                    Duration
                  </th>
                  <th className="p-3 uppercase text-base font-sm">
                    Director
                  </th>
                  <th className="p-3 uppercase text-base font-sm">
                    Genre
                  </th>
                  <th className="p-3 uppercase text-base font-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.movie_id} className="odd:bg-[#b49c84]">
                    <td className="p-3 text-base font-small">
                      {movie.title}
                    </td>
                    <td className="p-3 capitalize text-base font-small">
                      {movie.summary}
                    </td>
                    <td className="p-3 capitalize text-base font-small">
                      {movie.duration} min
                    </td>
                    <td className="p-3 capitalize text-base font-small">
                      {movie.director}
                    </td>
                    <td className="p-3 capitalize text-base font-small">
                      {movie.genre}
                    </td>
                    <td className="p-3 capitalize text-base font-small">
                      {" "}
                      <Link
                        to={`/filmsalon/${movie.movie_id}`}
                        className="bg-white px-6 py-3 cursor-pointer text-gray-800 rounded-md border border-white inline-block text-center hover:bg-[#a88c6f] hover:text-white transition 200"
                        style={{ minWidth: "150px" }}
                      >
                        Salonları Gör
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          "There are no movies added yet."
        )}
      </div>
    </Wrapper>
  );
};

export default ReservationsPage;
