import React from 'react';

const ExamSummary = ({ totalScore, totalQuestions, correctAnswers }) => {
  return (
    <div className="exam-summary">
      <p>Total Score: {totalScore}/{totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>
    </div>
  );
};

export default ExamSummary;