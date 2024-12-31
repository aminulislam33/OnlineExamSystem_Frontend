import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/AxiosInstance";
import { AuthContext } from "./AuthContext";

export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
    const [questions, setQuestions] = useState([]);
    const {token} = useContext(AuthContext);
    const [fetchQuestionMessage, setFetchQuestionMessage] = useState("");
    useEffect(()=>{
        const fetchQuestion = async ()=>{
            try {
                const res = await api.get("/questions", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuestions(res.data.data);
                setFetchQuestionMessage("");
            } catch (error) {
                console.error(error);
                setFetchQuestionMessage(error.response?.data?.message || "An error occurred while fetching questions");
            }
        }

        fetchQuestion();
    }, [token])

    return(
        <QuestionContext.Provider value={{questions, fetchQuestionMessage}}>
            {children}
        </QuestionContext.Provider>
    )
}