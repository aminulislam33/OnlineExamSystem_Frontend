import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/AxiosInstance';
import ExamDetails from '../result/ExamDetails';

const Results = () => {
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/results', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const examsWithDetails = response.data.data.map(exam => ({
          ...exam,
          showDetails: false
        }));
        setExamResults(examsWithDetails);
      } catch (error) {
        console.error('Error fetching results', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token]);

  const toggleExamDetails = (examId) => {
    setExamResults(prevResults =>
      prevResults.map(exam =>
        exam._id === examId
          ? { ...exam, showDetails: !exam.showDetails }
          : exam
      )
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (examResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="exam-results">
      <h3>Exam Results</h3>
      {examResults.map((exam) => (
        <ExamDetails key={exam._id} exam={exam} selectedExam={toggleExamDetails} />
      ))}
    </div>
  );
};

export default Results;