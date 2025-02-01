import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <MDBContainer className="py-5 d-flex justify-content-center">
      <MDBCard className="shadow-3 p-4" style={{ maxWidth: "700px", width: "100%" }}>
        <MDBRow className="g-0">
          {/* Left Section - Profile Image */}
          <MDBCol md="4" className="d-flex justify-content-center align-items-center bg-light rounded-start">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="Profile Avatar"
              className="rounded-circle"
              style={{ width: "120px", height: "120px" }}
            />
          </MDBCol>

          {/* Right Section - Profile Details */}
          <MDBCol md="8">
            <MDBCardBody>
              <MDBTypography tag="h4" className="mb-3 text-center text-md-start">
                {user?.name || "Unknown"}
              </MDBTypography>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Email:</strong> <span>{user?.email || "Not Available"}</span>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Phone:</strong> <span>{user?.phone || "Not Provided"}</span>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Department:</strong> <span>{user?.department || "N/A"}</span>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Enrollment No:</strong> <span>{user?.enrollmentNumber || "N/A"}</span>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Semester:</strong> <span>{user?.semester || "N/A"}</span>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <strong>Year:</strong> <span>{user?.year || "N/A"}</span>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default ProfilePage;