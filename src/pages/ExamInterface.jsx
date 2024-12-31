import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ExamInterfaceContent from "./ExamInterfaceContent";
import api from "../services/AxiosInstance";

const ExamInterface = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const [message, setMessage] = useState("");
  const { token, authMessage } = useContext(AuthContext);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await api.post(`/exam-taking/start/${examId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExamData(response.data.data.exam);
        setMessage("");
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setMessage(error.response?.data?.message || "Exam could not start")
      }
    };

    if (token) {
      fetchExamData();
    }
  }, [examId, token]);

  return (
    <div>
      {authMessage && <p>{authMessage}</p>}
      {examData ? (
        <ExamInterfaceContent examData={examData} />
      ) : (
        <p>Loading exam data...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExamInterface;