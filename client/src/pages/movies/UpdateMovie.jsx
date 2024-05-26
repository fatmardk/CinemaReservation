import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../dashboard/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import axios from "axios"; // axios ekleyin

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: "",
    summary: "",
    duration: "",
    director: "",
    genre: "",
  });

  useEffect(() => {
    const getMovieDetails = async () => {
      const url = `http://localhost:8080/api/movies/${id}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("There is an error to get the movie details");
        }
        const movieResult = await response.json();
        setState({
          title: movieResult.title,
          summary: movieResult.summary,
          duration: movieResult.duration,
          director: movieResult.director,
          genre: movieResult.genre,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleMovie = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (!state.title || !state.summary || !state.duration || !state.director || !state.genre) {
      alert("All fields are required!");
      return;
    }

    const updateData = {
      title: state.title,
      summary: state.summary,
      duration: state.duration,
      director: state.director,
      genre: state.genre,
    };

    axios
      .put(`http://localhost:8080/api/movies/update/${id}`, updateData)
      .then((response) => {
        console.log("Update response:", response.data);
        alert("Movie updated successfully!");
        navigate("/dashboard/movies");
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        alert("An error occurred while updating the movie.");
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
        <form onSubmit={onUpdate}>
          <input
            className="form-control text-black mb-3"
            placeholder="Title..."
            name="title"
            value={state.title}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Summary..."
            name="summary"
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
            placeholder="Director..."
            name="director"
            value={state.director}
            onChange={handleMovie}
          />
          <input
            className="form-control text-black mb-3"
            placeholder="Genre..."
            name="genre"
            value={state.genre}
            onChange={handleMovie}
          />
          <div className="w-full p-3">
            <input
              type="submit"
              value={"Update Movie"}
              className="btn-dark py-2 -mx-3 -my-2 rounded"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default UpdateMovie;
