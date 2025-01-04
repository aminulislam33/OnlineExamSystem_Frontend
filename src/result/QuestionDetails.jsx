import React from 'react';

const QuestionDetails = ({ question, answer }) => {
  const correctOption = question.options.find(o => o.isCorrect);
  const selectedOption = question.options.find(o => o._id === answer.selectedOption);
  const isCorrect = selectedOption && selectedOption._id === correctOption._id;

  return (
    <div key={question._id} className="question mb-4">
      <p><strong>{question.text}</strong></p>
      <div className="options">
        {question.options.map(option => (
          <p
            key={option._id}
            className={`${
              option._id === answer.selectedOption
                ? option.isCorrect
                  ? 'text-success font-weight-bold' // Correct answer
                  : 'text-danger font-weight-bold' // Incorrect answer
                : ''
            }`}
          >
            {option.text}
          </p>
        ))}
      </div>

      <p className={isCorrect ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'}>
        Your answer: {isCorrect ? 'Correct' : 'Incorrect'}
      </p>

      {/* Future scope for explanation */}
      {/* 
      {question.explanation && (
        <p><strong>Explanation:</strong> {question.explanation}</p>
      )}
      */}
    </div>
  );
};

export default QuestionDetails;