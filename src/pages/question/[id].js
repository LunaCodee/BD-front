import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const QuestionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/question/${id}`);
        const fetchedQuestion = response.data.question;
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.log("Error fetching question:", error);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {question ? (
          <div className={styles.question}>
            <h1 className={styles.questionText}>{question.question_text}</h1>
            <h2>Answers:</h2>
            <ul>
              {question.answers_ids.map((answerId) => (
                <li key={answerId}>{answerId}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;