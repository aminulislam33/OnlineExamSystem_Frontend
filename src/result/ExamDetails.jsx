import React from 'react';
import ExamSummary from './ExamSummary';
import QuestionDetails from './QuestionDetails';

const ExamDetails = ({ exam, selectedExam }) => {
    const totalQuestions = exam.answers.length;
    const correctAnswers = exam.answers.filter(
        ans => ans.selectedOption === ans.question.options.find(o => o.isCorrect).id
    ).length;
    const totalScore = correctAnswers;

    return (
        <div className="exam-result">
            <h4>Exam (Submitted At: {new Date(exam.submittedAt).toLocaleString()})</h4>
            <ExamSummary totalScore={totalScore} totalQuestions={totalQuestions} correctAnswers={correctAnswers} />

            <button onClick={() => selectedExam(exam._id)}>
                {exam.showDetails ? 'Hide Details' : 'View Details'}
            </button>

            {exam.showDetails && (
                <div className="questions">
                    <h5>Questions:</h5>
                    {exam.answers.map((answer) => (
                        <QuestionDetails key={answer.question._id} question={answer.question} answer={answer} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExamDetails;