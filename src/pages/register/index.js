import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const RegisterForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addNewUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        {
          name: username,
          email: email,
          password: password,
        }
      );

      console.log("response", response);
      handleNewUser();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleNewUser = () => {
    setSuccessMessage("Registration was successful!");
    setTimeout(() => {
      setSuccessMessage("");
      router.push("/");
    }, 5000);
  };

  const handleSubmit = () => {
    if (username && email && password) {
      addNewUser();
    } else {
      setErrorMessage("* Please fill in all the fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.form}>
          <h2>Registration form:</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={handleSubmit}>Register</button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;