import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/Results.css'
import api from '../services/AxiosInstance';

const Results = () => {
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/results', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExamResults(response.data.data);
      } catch (error) {
        console.error("Error fetching results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (examResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="exam-results">
      <h3>Exam Results</h3>
      {examResults.map((exam, examIndex) => {
        const totalQuestions = exam.answers.length;
        const correctAnswers = exam.answers.filter(
          ans => ans.selectedOption === ans.question.options.find(o => o.isCorrect).id
        ).length;
        const totalScore = correctAnswers;

        return (
          <div key={exam._id} className="exam-result">
            <h4>Exam {examIndex + 1} (Submitted At: {new Date(exam.submittedAt).toLocaleString()})</h4>
            <div className="exam-summary">
              <p>Total Score: {totalScore}/{totalQuestions}</p>
              <p>Correct Answers: {correctAnswers}</p>
              <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>
            </div>

            <div className="questions">
              <h5>Questions:</h5>
              {exam.answers.map((answer, index) => (
                <div key={answer.question._id} className="question">
                  <p><strong>{index + 1}. {answer.question.text}</strong></p>
                  <div className="options">
                    {answer.question.options.map(option => (
                      <p
                        key={option._id}
                        className={option._id === answer.selectedOption ? 
                          (option.isCorrect ? 'correct' : 'incorrect') : ''}
                      >
                        {option.text}
                      </p>
                    ))}
                  </div>
                  <p className={answer.selectedOption === answer.question.options.find(o => o.isCorrect).id ? 'correct-answer' : 'incorrect-answer'}>
                    Your answer: {answer.selectedOption === answer.question.options.find(o => o.isCorrect).id ? 'Correct' : 'Incorrect'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;