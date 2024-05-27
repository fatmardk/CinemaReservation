import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";

const ReservationSummary = () => {
  const { showtime_id } = useParams();
  const location = useLocation();
  const { receipt } = location.state || {};

  if (!receipt) {
    return <div>No reservation details available.</div>;
  }

  return (
    <Wrapper>
      <div className="text-center">
        <h2>Rezervasyon Detayları</h2>
        <p><strong>Film Adı:</strong> {receipt.showtimeDetails.movie_title}</p>
        <p><strong>Salon:</strong> {receipt.showtimeDetails.hall_name}</p>
        <p><strong>Başlangıç Saati:</strong> {new Date(receipt.showtimeDetails.start_time).toLocaleString()}</p>
        <p><strong>Bitiş Saati:</strong> {new Date(receipt.showtimeDetails.end_time).toLocaleString()}</p>
        <p><strong>Seçilen Koltuk:</strong> {receipt.selectedSeat}</p>
        <h3>Fiyatlar:</h3>
        <ul>
          {receipt.prices.map((price) => (
            <li key={price.price_id}>
              {price.category}: {price.price} TL
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default ReservationSummary;
