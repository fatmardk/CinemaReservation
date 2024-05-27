import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";

const FilmSalonlari = () => {
  const { movie_id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getShowtimes = async () => {
      try {
        const url = `http://localhost:8080/api/showtimes/movie/${movie_id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("There is an error to list showtimes");
        }

        const showtimesResult = await response.json();
        setShowtimes(showtimesResult);
        console.log(showtimesResult);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getShowtimes();
  }, [movie_id]);

  return (
    <Wrapper>
      <div>
      {isLoading ? (
        <Spinner />
      ) : showtimes.length > 0 ? (
        <div>
          <table className="w-full rounded-md">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="p-3 uppercase text-base font-sm text-gray-500">Start Time</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">End Time</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Hall Name</th>
                <th className="p-3 uppercase text-base font-sm text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((showtime) => (
                <tr key={showtime.start_time} className="odd:bg-gray-200">
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{new Date(showtime.start_time).toLocaleString()}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{new Date(showtime.end_time).toLocaleString()}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{showtime.hall_name}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{showtime.showtime_id}</td>
                  <td className="p-3 capitalize text-sm font-normal text-gray-400">
                    <Link
                      to={`/rezervasyon/${showtime.showtime_id}`}
                      className="bg-palette1 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md"
                    >
                      Rezervasyon Yap
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "There are no showtimes for this movie yet."
      )}
    </div>
    </Wrapper>
  );
};

export default FilmSalonlari;
