import { useState } from "react";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateShowTime = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    movie_id: "",
    hall_id: "",
    start_time: "",
    end_time: "",
  });

  const handleShowTime = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCreateShowTime = (e) => {
    e.preventDefault();
    if (!state.movie_id || !state.hall_id || !state.start_time || !state.end_time) {
      alert("All fields are required!");
      return;
    }

    const postData = {
      movie_id: state.movie_id,
      hall_id: state.hall_id,
      start_time: state.start_time,
      end_time: state.end_time,
    };

    axios
      .post("http://localhost:8080/api/showtimes/add", postData)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Showtime added successfully!");
        navigate("/dashboard/showtimes");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the showtime.");
      });
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <button
          className="opac-button"
          onClick={() => navigate("/dashboard/showtimes")}
        >
          Back to Showtimes
        </button>
      </ScreenHeader>
      <div>
        <form onSubmit={onCreateShowTime}>
          <input
            className="form-control text-black mb-3"
            placeholder="Movie ID..."
            name="movie_id"
            value={state.movie_id}
            onChange={handleShowTime}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Hall ID..."
            name="hall_id"
            value={state.hall_id}
            onChange={handleShowTime}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Start Time..."
            name="start_time"
            value={state.start_time}
            onChange={handleShowTime}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="End Time..."
            name="end_time"
            value={state.end_time}
            onChange={handleShowTime}
          />
          <div className="w-full p-3">
            <input
              type="submit"
              value={"Create Showtime"}
              className="btn-dark py-2 -mx-3 -my-2 rounded"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default CreateShowTime;
