import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";
import { useSelector } from "react-redux";

const Rezervasyon = ({ setState }) => {
  const navigate = useNavigate();
  const { showtime_id } = useParams();
  const [reservedSeats, setReservedSeats] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [category, setCategory] = useState({
    category: "",
    price: "",
    categoryid: 2,
  });

  const totalSeats = Array.from({ length: 20 }, (_, i) => i + 1); // 1-20 koltuk numaralarını içeren dizi

  const { user } = useSelector((userred) => userred.authReducer);
  // console.log(user);
  // const makeRes = async () => {

  //   const response = axios.post("http://localhost:8080/api/reservations/make",{
  //     "user_id": user.id,
  //     "showtime_id": showtime_id,
  //     "seat_number": selectedSeat,
  //     "category": category.category
  // });

  // const status= (await response).status;
  // if (status==200){

  // }

  // }
  const makeRes = async () => {
    try {
      // Tarih bilgisini al ve gerekiyorsa category'i düzenle

      // const response3 = await axios.get(
      //   "http://localhost:8080/api/discount-days/all"
      // );
      // const discountDay = await response3.data[0].day_of_week;
      // const date = new Date();
      // let currentDate = date.getDay();
      // if (currentDate == 1) {
      //   currentDate = "Monday";
      // }
      // console.log("dd", discountDay);
      // console.log("cd", currentDate);

      // if (currentDate == discountDay) {
      //   if (category.categoryid == 1) {
      //     setCategory({
      //       category: "İndirim Günü Öğrenci",
      //       price: category.price * 0.2,
      //       categoryid: 3,
      //     });
      //   } else {
      //     setCategory({
      //       category: "İndirim Günü Sivil",
      //       price: category.price * 0.2,
      //       categoryid: 4,
      //     });
      //   }
      const response3 = await axios.get("http://localhost:8080/api/discount-days/all");
      const discountDay = response3.data[0].day_of_week; // response3.data'ya direkt erişiyoruz

      // Rezervasyon yap
      const response = await axios.post(
        "http://localhost:8080/api/reservations/make",
        {
          user_id: user.id,
          showtime_id: showtime_id,
          seat_number: selectedSeat,
          priceCategory: category.categoryid,
          discountDay
        }
      );


      if (response.status === 200) {
        const reservationDetails = {
          movieTitle: receipt.showtimeDetails.movie_title,
          hallName: receipt.showtimeDetails.hall_name,
          startTime: new Date(
            receipt.showtimeDetails.start_time
          ).toLocaleString(),
          endTime: new Date(receipt.showtimeDetails.end_time).toLocaleString(),
          category: category.category,
          // İndirimli fiyatı göster
          price: response.data.discountedPrice,
          selectedSeat: selectedSeat,
        };

        console.log(category);
        console.log(reservationDetails.price);

        setState(reservationDetails);
        navigate("/reservation-details");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to make reservation.");
    }
  };

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reservations/seats/${showtime_id}`
        );
        const response2 = await axios.get(
          `http://localhost:8080/api/reservations/moviedetails/${showtime_id}`
        );
        setReceipt(response2.data);
        setReservedSeats(response.data.reservedSeats);
        setCapacity(response.data.hallCapacity);
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservedSeats();
  }, [showtime_id]);

  const handleSeatClick = (seat) => {
    if (!reservedSeats.includes(seat)) {
      setSelectedSeat(seat === selectedSeat ? null : seat);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("x");
    } catch (error) {
      console.error("Error fetching movie details:", error);
      alert("Failed to fetch movie details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <div className="text-center">
        <h1 className="text-xl">Salon kapasitesi: {capacity}</h1>

        <h3>Koltuk Şeması:</h3>
        <ul
          className="seating-schema"
          style={{
            listStyleType: "none",
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {totalSeats.map((seat, index) => (
            <li
              key={index}
              onClick={() => handleSeatClick(seat)}
              style={{
                backgroundColor: reservedSeats.includes(seat)
                  ? "red"
                  : selectedSeat === seat
                  ? "green"
                  : "grey",
                color: "white",
                margin: "2px",
                padding: "10px",
                cursor: reservedSeats.includes(seat)
                  ? "not-allowed"
                  : "pointer",
                border: "1px solid black",
                display: "inline-block",
              }}
              className={`seat ${
                reservedSeats.includes(seat) ? "reserved" : ""
              }`}
            >
              {seat}
            </li>
          ))}
        </ul>

        {receipt && (
          <div className="receipt">
            <h2>Rezervasyon Detayları</h2>
            <p className="border-b p-2 border-white">
              <strong>Film Adı:</strong> {receipt.showtimeDetails.movie_title}
            </p>
            <p className="border-b p-2 border-white mb-3">
              <strong>Salon:</strong> {receipt.showtimeDetails.hall_name}
            </p>
            <p className="border-b p-2 border-white mb-3">
              <strong>Başlangıç Saati:</strong>{" "}
              {new Date(receipt.showtimeDetails.start_time).toLocaleString()}
            </p>
            <p className="border-b p-2 border-white mb-3">
              <strong>Bitiş Saati:</strong>{" "}
              {new Date(receipt.showtimeDetails.end_time).toLocaleString()}
            </p>
            <h3>Lütfen seçiniz:</h3>
            <ul>
              {receipt.prices
                .filter((price) => price.price_id <= 2)
                .map((price) => (
                  <li
                    key={price.price_id}
                    className="border shadow-2xl px-5 py-2 bg-zinc-700 cursor-pointer m-4 transition-all ease-out hover:bg-slate-900"
                    onClick={() =>
                      setCategory({
                        price: price.price,
                        category: price.category,
                        categoryid: price.price_id,
                      })
                    }
                  >
                    {price.category}: {price.price} TL
                  </li>
                ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            border: "2px solid black",
            padding: "20px",
          }}
        >
          <h3 className="border-b p-2 border-white mb">
            Seçilen Koltuk: {selectedSeat}
          </h3>
          <h3 className="border-b p-2 border-white mb">
            Seçilen Tarife:{" "}
            <span className="text-red-600"> {category.category}</span> Tutarı:{" "}
            {category.price}
          </h3>
          <button
            type="submit"
            className="submit-button border border-white p-2 px-4 rounded-lg shadow-lg bg-gray-700 mt-2 hover:bg-gray-900 transition-all ease-in"
            disabled={!selectedSeat}
            onClick={makeRes}
          >
            Rezervasyon Yap
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Rezervasyon;
