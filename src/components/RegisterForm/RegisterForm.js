import React, { useState } from 'react';
import styles from './styles.module.css';

const RegisterForm = ({ onRegistration }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: username,
      email,
      password,
    };

    onRegistration(formData);

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Registration form:</h2>
        <input type="text" placeholder="Name:" value={username} onChange={handleUsernameChange} />
        <input type="email" placeholder="Email:" value={email} onChange={handleEmailChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;