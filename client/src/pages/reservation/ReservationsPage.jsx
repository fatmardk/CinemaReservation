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
            <table className="w-full rounded-md">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Title
                  </th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Summary
                  </th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Duration
                  </th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Director
                  </th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Genre
                  </th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.movie_id} className="odd:bg-gray-200 odd:text-gray-800">
                    <td className="p-3 capitalize text-sm font-normal">
                      {movie.title}
                    </td>
                    <td className="p-3 capitalize text-sm font-normal">
                      {movie.summary}
                    </td>
                    <td className="p-3 capitalize text-sm font-normal flex-wrap">
                      {movie.duration} min
                    </td>
                    <td className="p-3 capitalize text-sm font-normal">
                      {movie.director}
                    </td>
                    <td className="p-3 capitalize text-sm font-normal">
                      {movie.genre}
                    </td>
                    <td className="p-3 capitalize text-sm font-normal">
                      {" "}
                      <Link
                        to={`/filmsalon/${movie.movie_id}`}
                        className="bg-palette1 px-6 py-3 cursor-pointer text-white rounded-md inline-block text-center"
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
