import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";

const HallShowtimes = () => {
  const { hall_id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/halls/${hall_id}/showtimes`);
        if (!response.ok) {
          throw new Error("Failed to fetch showtimes");
        }
        const data = await response.json();
        setShowtimes(data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowtimes();
  }, [hall_id]);

  return (
    <Wrapper>
      <ScreenHeader>
        <h1 className="text-2xl font-bold">Showtimes for Hall {hall_id}</h1>
      </ScreenHeader>
      {isLoading ? (
        <Spinner />
      ) : showtimes.length > 0 ? (
        <table className="w-full bg-palette1 rounded-md">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="p-3 uppercase text-base font-sm text-gray-500">Movie Title</th>
              <th className="p-3 uppercase text-base font-sm text-gray-500">Start Time</th>
              <th className="p-3 uppercase text-base font-sm text-gray-500">End Time</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr key={showtime.id} className="odd:bg-gray-800">
                <td className="p-3 capitalize text-sm font-normal text-gray-400">
                  {showtime.movie_title}
                </td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400">
                  {showtime.start_time}
                </td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400">
                  {showtime.end_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No showtimes available.</p>
      )}
    </Wrapper>
  );
};

export default HallShowtimes;
