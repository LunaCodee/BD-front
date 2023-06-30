import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Question = ({ id }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/question/${id}`);
        const { data } = response;
        console.log(response);
        setQuestion(data);
      } catch (err) {
        console.log("Error fetching question:", err);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { question_text } = question;

  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.wrapper}>
          <h1>{question_text}</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Question;