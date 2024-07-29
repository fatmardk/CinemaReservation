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
            <h2 className="text-2xl text-center border-b pb-2">Rezervasyon Detayları</h2>
          </div>
          <div className="ticket-icon flex justify-center">
          <BsTicketPerforated size={60} />
        </div>
          <div className="ticket-body">
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className="ticket-label text-lg font-semibold p-1">Film Adı:</p>
              <p className="ticket-value ">{reservationDetails.movieTitle}</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg text-center">
              <p className="ticket-label text-lg font-semibold p-1 w-1/2">Salon:</p>
              <p className="ticket-value w-1/2">{reservationDetails.hallName}</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className=" text-lg font-semibold p-1  w-1/2 text-center">Başlangıç Saati:</p>
              <p className="ticket-value  w-1/2 text-center">{reservationDetails.startTime}</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className=" text-lg font-semibold p-1  w-1/2 text-center">Bitiş Saati:</p>
              <p className="ticket-value  w-1/2 text-center">{reservationDetails.endTime}</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className=" text-lg font-semibold p-1  w-1/2 text-center">Tarife:</p>
              <p className="ticket-value  w-1/2 text-center">{reservationDetails.category}</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className=" text-lg font-semibold p-1  w-1/2 text-center">Tutarı:</p>
              <p className="ticket-value  w-1/2 text-center">{reservationDetails.price} TL</p>
            </div>
            <div className="ticket-item m-2 shadow-lg hover:bg-[#937d68] transition ease flex justify-around items-center border p-2 rounded-lg shadow-lg">
              <p className=" text-lg font-semibold p-1  w-1/2 text-center">Seçilen Koltuk:</p>
              <p className="ticket-value  w-1/2 text-center">{reservationDetails.selectedSeat}</p>
            </div>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

export default ReservationDetails;