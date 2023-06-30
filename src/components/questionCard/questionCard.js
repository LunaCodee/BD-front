// import React from "react";
// import styles from "./styles.module.css";
// import Link from "next/link"; 

// const QuestionCard = ({ id, question_text, answers_ids }) => {
//   return (
//     <>
//       <Link className={styles.link} href={`/question/${id}`}>
//         <div className={styles.card}>
//           <h1>{question_text}</h1>
//           <div>{answers_ids}</div> 
//         </div>
//       </Link>
//     </>
//   );
// };

// export default QuestionCard;

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const QuestionCard = ({ id, question_text, answers_ids }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.link} href={`/question/${id}`} passHref>
          <h1 className={styles.questionText}>{question_text}</h1>
          <div className={styles.answerList}>
            {answers_ids.map((answer) => (
              <p key={answer.id} className={styles.answer}>
                {answer}
              </p>
            ))}
          </div>
      </Link>
    </div>
  );
};

export default QuestionCard;