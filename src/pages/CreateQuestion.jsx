import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";

function CreateQuestion() {
  const [questionData, setQuestionData] = useState({
    text: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    type: "",
    category: "",
    difficultyLevel: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, key, value) => {
    setQuestionData((prevState) => {
      const updatedOptions = [...prevState.options];
      updatedOptions[index][key] = value;
      return { ...prevState, options: updatedOptions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", questionData.text);
    formData.append("type", questionData.type);
    formData.append("category", questionData.category);
    formData.append("difficultyLevel", questionData.difficultyLevel);
    formData.append("options", JSON.stringify(questionData.options));
    if (image) formData.append("image", image);

    try {
      const response = await api.post(
        "/questions/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while adding the question"
      );
    }
  };

  return (
    <div>
      <div>
        <h1>Add Question</h1>
      </div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Question Statement</label>
          <input
            type="text"
            name="text"
            value={questionData.text}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Options</label>
          {questionData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
              />
              <input
                type={
                  questionData.type === "multi-correct" ? "checkbox" : "radio"
                }
                name="correctOption"
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.checked)
                }
              />
              <label>{questionData.type === "multi-correct" ? "Correct" : ""}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="type">Question Type</label>
          <select
            name="type"
            value={questionData.type}
            onChange={handleInputChange}
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
            name="category"
            value={questionData.category}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <select
            name="difficultyLevel"
            value={questionData.difficultyLevel}
            onChange={handleInputChange}
          >
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="tough">Tough</option>
          </select>
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default CreateQuestion;