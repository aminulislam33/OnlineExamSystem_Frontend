import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <p>
                    <strong>Name:</strong> {user?.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p>
                    <strong>Department:</strong> {user.department}
                </p>
                <p>
                    <strong>Enrollment Number:</strong> {user.enrollmentNumber}
                </p>
                <p>
                    <strong>Semester:</strong> {user.semester}
                </p>
                <p>
                    <strong>Year:</strong> {user.year}
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;