import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExamInterfaceContent = ({ examData }) => {
  const { examId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize states
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedEndTime = localStorage.getItem(`exam_${examId}_endTime`);
    const currentEndTime = new Date(examData.endTime).getTime();
    return savedEndTime
      ? Math.max(0, Math.floor((savedEndTime - Date.now()) / 1000))
      : Math.max(0, Math.floor((currentEndTime - Date.now()) / 1000));
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(`exam_${examId}_answers`);
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });

  useEffect(() => {
    // On component mount, load answered questions into the state
    if (answers.length > 0) {
      const answeredIndices = answers.map((answer) =>
        examData.questions.findIndex((q) => q._id === answer.questionId)
      );
      setAnsweredQuestions(new Set(answeredIndices));
    }

    // Store end time in localStorage
    const endTime = new Date(examData.endTime).getTime();
    localStorage.setItem(`exam_${examId}_endTime`, endTime);

    // Timer logic
    const calculateRemainingTime = () =>
      Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeRemaining(calculateRemainingTime());

    const timerInterval = setInterval(() => {
      const remaining = calculateRemainingTime();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timerInterval);
        alert("Time's up! Submitting your exam.");
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [examId, answers, examData]);

  const handleOptionChange = (optionId) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[currentQuestionIndex].selectedOption = optionId;

    const updatedAnswers = [
      ...answers.filter(
        (answer) => answer.questionId !== updatedQuestions[currentQuestionIndex]._id
      ),
      {
        questionId: updatedQuestions[currentQuestionIndex]._id,
        selectedOption: optionId,
      },
    ];

    setAnswers(updatedAnswers);
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestionIndex));

    // Save updated answers to localStorage
    localStorage.setItem(`exam_${examId}_answers`, JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async () => {
    const submissionData = {
      examId,
      answers,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/exam-taking/submit",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      localStorage.removeItem(`exam_${examId}_answers`); // Clear answers from localStorage after submission
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("There was an issue submitting the exam. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = {
    ...examData.questions[currentQuestionIndex],
    selectedOption: answers.find(
      (answer) =>
        answer.questionId === examData.questions[currentQuestionIndex]._id
    )?.selectedOption,
  };

  return (
    <div className="exam-interface">
      <div className="exam-header">
        <h1>{examData.title}</h1>
        <div className="timer">Time Remaining: {formatTime(timeRemaining)}</div>
      </div>

      <div className="question-section">
        <h3>
          Question {currentQuestionIndex + 1}: {currentQuestion.text}
        </h3>
        {currentQuestion.options.map((option) => (
          <div key={option._id} className="option">
            <input
              type="radio"
              name={`answer-${currentQuestionIndex}`}
              checked={currentQuestion.selectedOption === option._id}
              onChange={() => handleOptionChange(option._id)}
            />
            <label>{option.text}</label>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          disabled={
            currentQuestionIndex === examData.questions.length - 1
          }
        >
          Next
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="question-navigation">
        <h4>Navigate through questions:</h4>
        <div className="question-navigation-buttons">
          {examData.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={answeredQuestions.has(index) ? "answered" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamInterfaceContent;