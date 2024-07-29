import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";

const HallsList = () => {
  const [halls, setHalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/halls");
        if (!response.ok) {
          throw new Error("Failed to fetch halls");
        }
        const data = await response.json();
        setHalls(data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHalls();
  }, []);

  return (
    <Wrapper>
      <ScreenHeader>
        <h1 className="text-2xl font-bold">All Halls</h1>
      </ScreenHeader>
      {isLoading ? (
        <Spinner />
      ) : halls.length > 0 ? (
        <div>
          {halls.map((hall) => (
            <div key={hall.id} className="mb-4">
              <h2 className="text-lg font-semibold">Hall {hall.name}</h2>
              <table className="w-full bg-palette1 rounded-md mt-2">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-base font-sm text-gray-500">Movie Title</th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">Start Time</th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {hall.showtimes.map((showtime) => (
                    <tr key={showtime.id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">{showtime.movie_title}</td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">{showtime.start_time}</td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">{showtime.end_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No halls available.</p>
      )}
    </Wrapper>
  );
};

export default HallsList;

