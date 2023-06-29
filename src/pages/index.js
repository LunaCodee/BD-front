import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RegisterForm from '../components/RegisterForm/RegisterForm';

const HomePage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState(null);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleRegistration = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8081/register', formData);
      setRegistrationResponse(response.data.response);
    } catch (error) {
      if (error.response) {
        setRegistrationResponse(error.response.data.response);
      } else {
        setRegistrationResponse('An error occurred during registration.');
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Let's Talk</h1>
        <p className={styles.description}>Join the conversation and connect with others.</p>
      </div>
      <div className={styles.buttons}>
        {/* <Link href="/register">
          <span className={`${styles.button} ${styles.register}`}>Register</span>
        </Link>
        <Link href="/login">
          <span className={`${styles.button} ${styles.login}`}>Login</span>
        </Link> */}
         {showRegisterForm ? (
            <RegisterForm onRegistration={handleRegistration} />
          ) : (
            <button className={`${styles.button} ${styles.register}`} onClick={handleRegisterClick}>
              Register
            </button>
          )}
      </div>
      {registrationResponse && <p>{registrationResponse}</p>}
    </div>
    <Footer />
    </>
  );
};

export default HomePage;