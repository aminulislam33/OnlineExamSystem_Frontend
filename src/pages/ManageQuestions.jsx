import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get("/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.data);
      } catch (error) {
        console.error(error);
        setMessage(error.response?.data?.message);
      }
    };

    fetchQuestion();
  }, [token]);

  const handleEdit = (id)=>{
    navigate(`/admin/manage-questions/edit/${id}`)
  }

  const handleDelete = async (e, id)=>{
    e.preventDefault();
    try {
        const response = await api.delete(`/questions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setMessage(response.data.message);
    } catch (error) {
        console.error(error);
        setMessage(error.response?.data?.message || "An error occurred while deleting question")
    }
  };

  return (
    <div className="manage-questions">
      <h2>Manage Questions</h2>
      {message && <p>{message}</p>}
      <button onClick={() => { navigate("/admin/manage-questions/add"); }}>
        Add Question
      </button>

      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question._id} className="question-card">
            <p><strong>{question.text}</strong></p>
            <button onClick={()=>{handleEdit(question._id)}}>Edit</button>
            <button onClick={(e)=>{handleDelete(e, question._id)}}>Delete</button>
            <p>Type: {question.type}</p>
            <p>Category: {question.category}</p>
            <p>Difficulty Level: {question.difficultyLevel}</p>

            <div>
              <strong>Options:</strong>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>
                    {option.text} {option.isCorrect && <span>(Correct)</span>}
                  </li>
                ))}
              </ul>
            </div>

            {question.image && <img src={question.image} alt="Question visual" />}
          </div>
        ))
      ) : (
        <p>No questions found</p>
      )}
    </div>
  );
};

export default ManageQuestions;