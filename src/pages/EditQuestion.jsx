import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/AxiosInstance";
import { AuthContext } from "../context/AuthContext";

function EditQuestion() {
  const [toBeUpdated, setToBeUpdated] = useState({
    questionText: "",
    type: "",
    category: "",
    difficultyLevel: ""
  });

  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setToBeUpdated({
          questionText: response.data.data.text,
          type: response.data.data.type,
          category: response.data.data.category,
          difficultyLevel: response.data.data.difficultyLevel
        });
      } catch (error) {
        console.error(error);
        setMessage(error.response?.data?.message || "Failed to fetch the question");
      }
    };

    fetchQuestion();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToBeUpdated((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/questions/${id}`, toBeUpdated, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      navigate("/admin/manage-questions");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to update the question");
    }
  };

  return (
    <div>
      <h2>Edit Question</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Question Statement</label>
          <input
            type="text"
            id="questionText"
            name="questionText"
            value={toBeUpdated.questionText}
            onChange={handleChange}
            placeholder="Enter the question text"
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={toBeUpdated.type}
            onChange={handleChange}
          >
            <option value="">Select Question Type</option>
            <option value="single-correct">Single Correct</option>
            <option value="multi-correct">Multiple Correct</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={toBeUpdated.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>
        <div>
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <select
            id="difficultyLevel"
            name="difficultyLevel"
            value={toBeUpdated.difficultyLevel}
            onChange={handleChange}
          >
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="tough">Tough</option>
          </select>
        </div>
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}

export default EditQuestion;