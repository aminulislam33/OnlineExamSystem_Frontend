import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartExamButton = ({ examId }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
  
    const handleStart = () => {
      setShowModal(false);
      navigate(`/student/exam/start/${examId}`);
    };
  
    return (
      <>
        <button onClick={() => setShowModal(true)}>Start Exam</button>
        {showModal && (
          <div className="modal">
            <h2>Confirm Exam Start</h2>
            <p>Are you ready to start the exam?</p>
            <button onClick={handleStart}>Yes, Start Exam</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        )}
      </>
    );
  };

  export default StartExamButton;