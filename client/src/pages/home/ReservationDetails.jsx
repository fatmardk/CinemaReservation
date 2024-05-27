import React from "react";
import Wrapper from "../dashboard/Wrapper";
import { BsTicketPerforated } from "react-icons/bs";

const ReservationDetails = ({ state }) => {
  // props üzerinden gelen rezervasyon detayları
  const reservationDetails = state;

  return (
    <Wrapper>
      <div className="ticket-container">
        <div className="ticket">
          <div className="ticket-header">
            <h2>Rezervasyon Detayları</h2>
          </div>
          <div className="ticket-body">
            <div className="ticket-item">
              <span className="ticket-label">Film Adı:</span>
              <span className="ticket-value">{reservationDetails.movieTitle}</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Salon:</span>
              <span className="ticket-value">{reservationDetails.hallName}</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Başlangıç Saati:</span>
              <span className="ticket-value">{reservationDetails.startTime}</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Bitiş Saati:</span>
              <span className="ticket-value">{reservationDetails.endTime}</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Tarife:</span>
              <span className="ticket-value">{reservationDetails.category}</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Tutarı:</span>
              <span className="ticket-value">{reservationDetails.price} TL</span>
            </div>
            <div className="ticket-item">
              <span className="ticket-label">Seçilen Koltuk:</span>
              <span className="ticket-value">{reservationDetails.selectedSeat}</span>
            </div>
          </div>
        </div>
        <div className="ticket-icon">
          <BsTicketPerforated size={40} />
        </div>
      </div>
    </Wrapper>
  );
};

export default ReservationDetails;