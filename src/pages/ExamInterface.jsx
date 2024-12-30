import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ExamInterfaceContent from "./ExamInterfaceContent";

const ExamInterface = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const { token, authMessage } = useContext(AuthContext);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/exam-taking/start/${examId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExamData(response.data.data.exam);
      } catch (error) {
        console.error("Error fetching exam data:", error);
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
    </div>
  );
};

export default ExamInterface;