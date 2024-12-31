import { useContext, useState } from "react";
import { QuestionContext } from "../context/QuestionContext";
import api from "../services/AxiosInstance";
import { AuthContext } from "../context/AuthContext";

function CreateExam() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        questions: [],
        duration: "",
        startTime: "",
        endTime: "",
    });

    const { questions, fetchQuestionMessage } = useContext(QuestionContext);
    const {token} = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleQuestionsChange = (id) => {
        setFormData((prevState) => {
            const isSelected = prevState.questions.includes(id);
            const updatedQuestions = isSelected
                ? prevState.questions.filter((questionId) => questionId !== id)
                : [...prevState.questions, id];
    
            return {
                ...prevState,
                questions: updatedQuestions,
            };
        });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.duration || !formData.startTime || !formData.endTime) {
            setMessage("Please fill all the required fields.");
            return;
        }

        try {
            const res = await api.post("/exams/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "An error occurred while creating the exam.");
        }
    };

    return (
        <div>
            <h1>Create Exams</h1>
            {fetchQuestionMessage && <p>{fetchQuestionMessage}</p>}
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Exam Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        name="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        value={formData.description}
                        name="description"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duration (minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="startTime">Start Time</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End Time</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
    <h2>Questions</h2>
    {questions.length > 0 ? (
        questions.map((question) => (
            <div key={question._id} className="question-card">
                <p>
                    <strong>{question.text}</strong>
                </p>
                <button onClick={() => handleQuestionsChange(question._id)}>
                    {formData.questions.includes(question._id) ? "Deselect" : "Select"}
                </button>
                <p>Type: {question.type}</p>
                <p>Category: {question.category}</p>
                <p>Difficulty Level: {question.difficultyLevel}</p>

                <div>
                    <strong>Options:</strong>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>
                                {option.text} {option.isCorrect && <span>(Correct)</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                {question.image && <img src={question.image} alt="Question visual" />}
            </div>
        ))
    ) : (
        <p>No questions found</p>
    )}
    </div>
        </div>
    );
}

export default CreateExam;