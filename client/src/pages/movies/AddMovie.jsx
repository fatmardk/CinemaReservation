import { useState } from "react";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios ekleyin

const AddMovie = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: "",       // Updated to 'title'
    summary: "",     // Updated to 'summary'
    duration: "",
    genre: "",
    director: "",
  });

  const handleMovie = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (
      !state.title ||
      !state.summary ||
      !state.duration ||
      !state.genre ||
      !state.director
    ) {
      alert("All fields are required!");
      return;
    }

    const postData = {
      title: state.title,
      summary: state.summary,
      duration: state.duration,
      genre: state.genre,
      director: state.director,
    };

    axios
      .post("http://localhost:8080/api/movies/add", postData) // Updated the URL to match your endpoint
      .then((response) => {
        console.log("Response:", response.data);
        alert("Movie added successfully!");
        navigate("/dashboard/movies");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the movie.");
      });
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <button
          className="opac-button"
          onClick={() => navigate("/dashboard/movies")}
        >
          Back to Movies List
        </button>
      </ScreenHeader>
      <div>
        <form onSubmit={onCreate}>
          <input
            className="form-control text-black mb-3"
            placeholder="Title..."
            name="title"            // Updated to 'title'
            value={state.title}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Summary..."
            name="summary"         // Updated to 'summary'
            value={state.summary}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Duration..."
            name="duration"
            value={state.duration}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Genre..."
            name="genre"
            value={state.genre}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Director..."
            name="director"
            value={state.director}
            onChange={handleMovie}
          />
          <div className="w-full p-3">
            <input
              type="submit"
              value={"Save Movie"}
              className="btn-dark py-2 -mx-3 -my-2 rounded"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddMovie;
