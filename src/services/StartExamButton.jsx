import React, { useContext, useState } from 'react';
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

  const toggleOpen = () => setCentredModal(!centredModal);

  const handleStartExam = () => {
    const userId = user._id;
    const examAppURL = `https://exam.apticrack.eesiiests.org/start?userId=${userId}&examId=${examId}`;

    window.location.href = examAppURL;

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