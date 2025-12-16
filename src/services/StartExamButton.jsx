import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { AuthContext } from '../context/AuthContext';

export default function StartExamButton({ examId }) {
  const [centredModal, setCentredModal] = useState(false);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleOpen = () => setCentredModal(!centredModal);

  const handleStartExam = () => {
    // Navigate to the internal exam interface route so the exam runs inside this app
    setCentredModal(false);
    navigate(`/student/exam/start/${examId}`);

  };

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Start Exam</MDBBtn>

      <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Are You Sure?</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={handleStartExam}>Yes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}