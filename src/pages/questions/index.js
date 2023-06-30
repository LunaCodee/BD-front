import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/questionCard/questionCard"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/questions");
        const questionArray = Object.values(response.data);
        setQuestions(questionArray);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>All Questions</h1>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            question_text={question.question_text}
            answers_ids={question.answers_ids|| []}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default QuestionsPage;