// src/pages/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/register.module.css'; // Importing CSS Module for styling

const Register = () => {
  // State variables for form inputs and error/success messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Send register request to the server
      const response = await axios.post('/api/auth/register', { username, password });
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username:</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password:</label>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>
    </div>
  );
};

export default Register;
