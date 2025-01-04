import React from 'react';

const QuestionDetails = ({ question, answer }) => {
    const correctOption = question.options.find(o => o.isCorrect);
    const selectedOption = question.options.find(o => o._id === answer.selectedOption);
    const isCorrect = selectedOption && selectedOption._id === correctOption._id;

    return (
        <div key={question._id} className="question">
            <p><strong>{question.text}</strong></p>
            <div className="options">
                {question.options.map(option => (
                    <p key={option._id}
                        className={option._id === answer.selectedOption
                            ? (option.isCorrect ? 'correct' : 'incorrect')
                            : ''}>
                        {option.text}
                    </p>
                ))}
            </div>
            <p className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                Your answer: {isCorrect ? 'Correct' : 'Incorrect'}
            </p>
            {/* Future scope for explanation */}
            {/* <p><strong>Explanation:</strong> {question.explanation}</p> */}
        </div>
    );
};

export default QuestionDetails;