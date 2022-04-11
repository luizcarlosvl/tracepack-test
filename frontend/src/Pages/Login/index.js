import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 30000,
  });

  const history = useHistory();

  if (localStorage.user) {
    history.push('/menu');
  }

  async function login() {
    try {
      const response = await http.post('/login',
        {
          email,
          password,
        });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      history.push('/menu');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const validateEmail = () => {
    const emailIsValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const enable = emailIsValid.test(email);
    if (enable) return true;
    return false;
  };

  const validatePassword = () => {
    const min = 6;
    if (password.length >= min) return true;
    return false;
  };

  return (
    <main className="main">
      <span className="title">TRACEPACK</span>
      <input
        data-testid="common_login__input-email"
        placeholder="digite o email"
        onChange={ (event) => setEmail(event.target.value) }
      />
      <input
        data-testid="common_login__input-password"
        placeholder="digite a senha"
        onChange={ (event) => setPassword(event.target.value) }
        type="password"
      />
      <div className="button-container">
        <button
          disabled={ !(validateEmail() && validatePassword()) }
          onClick={ login }
          data-testid="common_login__button-login"
          type="button"
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </div>
      <span
        data-testid="common_login__element-invalid-email"
        className="error"
      >
        { errorMessage }
      </span>
    </main>
  );
}

export default LoginPage;
