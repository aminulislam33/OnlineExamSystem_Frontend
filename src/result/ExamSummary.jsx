import React from 'react';

const ExamSummary = ({ totalScore, totalQuestions, correctAnswers }) => {
  return (
    <div className="exam-summary card p-3 mb-3">
      <h5 className="card-title">Exam Summary</h5>
      <p className="card-text">
        <strong>Total Score:</strong> {totalScore}/{totalQuestions}
      </p>
      <p className="card-text">
        <strong>Correct Answers:</strong> {correctAnswers}
      </p>
      <p className="card-text">
        <strong>Incorrect Answers:</strong> {totalQuestions - correctAnswers}
      </p>
    </div>
  );
};

export default ExamSummary;