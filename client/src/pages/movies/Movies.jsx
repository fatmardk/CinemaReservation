import React, { useEffect, useState } from "react";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteMovie = async (id) => {
    const url = `http://localhost:8080/api/movies/delete/${id}`;

    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the movie");
        }

        const result = await response.json();
        alert(result.msg);

        // Update state to remove the deleted movie
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.MovieID !== id));
      } catch (error) {
        console.error("Error deleting the movie:", error);
        alert("There was an error deleting the movie.");
      }
    }
  };

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = "http://localhost:8080/api/movies";
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
      <ScreenHeader>
        <Link
          to="/dashboard/movies/add"
          className="btn-dark inline-flex items-center"
        >
          Create Movie
        </Link>
      </ScreenHeader>
      {isLoading ? (
        <Spinner />
      ) : movies.length > 0 ? (
        <div>
          <table className="w-full bg-palette1 rounded-md">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="p-3 uppercase text-base font-sm text-gray-500">Title</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Summary</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Duration</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Director</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Genre</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.MovieID} className="odd:bg-gray-800">
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{movie.title}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{movie.summary}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{movie.duration} min</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{movie.director}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{movie.genre}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">
                    <Link
                      to={`/dashboard/movies/update/${movie.MovieID}`}
                      className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md"
                      onClick={() => deleteMovie(movie.MovieID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "There are no movies added yet."
      )}
    </Wrapper>
  );
};

export default Movies;
