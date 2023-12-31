import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import thumbUpImage from '../../assets/thumb-up.png';
import thumbDownImage from '../../assets/thumb-down.png';

const QuestionPage = () => {
  const router = useRouter();
  const { id } = router.query; // get the question id from the route
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/question/${id}`);
        setQuestion(response.data.question);
        
        const answerResponse = await axios.get(`http://localhost:8081/question/${id}/answers`);
        setAnswers(answerResponse.data.response);
      } catch (error) {
        console.log("Error fetching question and answers:", error);
      }
    };

    if (id) {
      fetchQuestionAndAnswers();
    }
  }, [id]);

  const handleNewAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  const handleNewAnswerSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:8081/question/${id}/answers`, { answer_text: newAnswer });
      setNewAnswer('');
      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`);
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error posting answer:', error);
    }
  };

  const handleLike = async (answerId) => {
    try {
      await axios.post(`http://localhost:8081/answer/${answerId}/like`);
      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`);
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error liking answer:', error);
    }
  };

  const handleDislike = async (answerId) => {
    try {
      await axios.post(`http://localhost:8081/answer/${answerId}/dislike`);
      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`);
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error disliking answer:', error);
    }
  };

return (
  <>
    <Navbar />
    <div className={styles.container}>
      <h1 className={styles.questionText}>{question?.question_text}</h1>
      <ul className={styles.answerList}>
        {answers.map((answer) => (
          <li key={answer._id} className={styles.answerItem}>
            <div className={styles.answerText}>{answer.answer_text}</div>
            <div className={styles.voteContainer}>
              <div className={styles.voteSection}>
                <div className={styles.likeCount}>{answer.gained_likes_number}</div>
                <button onClick={() => handleLike(answer._id)} className={styles.voteButton}>
                  <img src={thumbUpImage.src} alt="Thumb Up" className={styles.thumbIcon} />
                </button>
              </div>
              <div className={styles.voteSection}>
                <div className={styles.dislikeCount}>{answer.gained_dislikes_number}</div>
                <button onClick={() => handleDislike(answer._id)} className={styles.voteButton}>
                  <img src={thumbDownImage.src} alt="Thumb Down" className={styles.thumbIcon} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewAnswerSubmit}>
        <textarea
          value={newAnswer}
          onChange={handleNewAnswerChange}
          placeholder="Your answer..."
          className={styles.newAnswerInput}
        />
        <button type="submit" className={styles.submitButton}>
          Submit answer
        </button>
      </form>
    </div>
    <Footer />
  </>
);
};


export default QuestionPage;