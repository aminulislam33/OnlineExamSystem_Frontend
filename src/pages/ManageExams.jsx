import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";

function ManageExams() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [exams, setExams] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await api.get("/exams", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const examsData = res.data.data.exams;

                const updatedExams = await Promise.all(
                    examsData.map(async (exam) => {
                        try {
                            const userRes = await api.post("/profile", {id: examsData.createdBy}, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            return { ...exam, createdByName: userRes.data.data.name };
                        } catch (userError) {
                            console.error(`Failed to fetch user ${exam.createdBy}`, userError);
                            return { ...exam, createdByName: "Unknown User" };
                        }
                    })
                );

                setExams(updatedExams);
            } catch (error) {
                console.error(error);
                setMessage(error.response?.data?.message || "An error occurred while fetching exams");
            }
        };

        fetchExams();
    }, [token]);

    return (
        <div>
            <h1>Manage Exams</h1>
            <div>
                <button onClick={() => navigate("/admin/manage-exams/add")}>Add Exam</button>
            </div>
            <div>
                <h2>Exams</h2>
                {message && <p>{message}</p>}
                {exams.length > 0 ? (
                    exams.map((exam, index) => (
                        <div key={exam._id}>
                            <p>
                                <strong>
                                    {index + 1}. Title: {exam.title}
                                </strong>
                            </p>
                            <p>Description: {exam.description}</p>
                            <p>Duration: {exam.duration}</p>
                            <p>Start Time: {exam.startTime}</p>
                            <p>End Time: {exam.endTime}</p>
                            <p>Created By: {exam.createdByName}</p>
                        </div>
                    ))
                ) : (
                    <p>No exams found.</p>
                )}
            </div>
        </div>
    );
}

export default ManageExams;