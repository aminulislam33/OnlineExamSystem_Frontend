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
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary"
      >
        Start Exam
      </button>

      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Exam Start</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you ready to start the exam?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleStart}
                >
                  Yes, Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartExamButton;