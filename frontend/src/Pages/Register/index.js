import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 30000,
  });

  const validateEmail = () => {
    const emailIsValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    if (email) {
      const enable = emailIsValid.test(email);
      return enable;
    }
    return false;
  };

  const validateName = () => {
    const min = 12;
    if (name) {
      return name.length >= min;
    }
    return false;
  };

  const validatePassword = () => {
    const min = 6;
    if (password) {
      return password.length >= min;
    }
    return false;
  };

  const handleClick = async () => {
    const body = {
      name,
      email,
      password,
    };
    try {
      await http.post('/register', body);
      history.push('/');
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
    }
  };

  return (
    <main className="main-register">
      <h1 className='title'>
        CADASTRO
      </h1>
      <form className="">
        <input
          name="name"
          type="text"
          value={ name }
          onChange={ (input) => setName(input.target.value) }
          data-testid="common_register__input-name"
          placeholder="Seu nome"
        />
        <input
          name="email"
          type="email"
          value={ email }
          onChange={ (input) => setEmail(input.target.value) }
          data-testid="common_register__input-email"
          placeholder="email@email.com"
        />
        <input
          name="password"
          type="password"
          value={ password }
          onChange={ (input) => setPassword(input.target.value) }
          data-testid="common_register__input-password"
          placeholder="************"
        />
        <div className='register-button-container'>
          <button
            disabled={ !(validatePassword() && validateEmail() && validateName()) }
            type="button"
            onClick={ () => handleClick() }
            className="common-button"
          >
            CADASTRAR
          </button>
          <Link to="/">
            <button
              className="common-button"
              type="button"
            >
              Voltar
            </button>
          </Link>
        </div>
      </form>
      <span
        data-testid="common_register__element-invalid_register"
        className="error"
      >
        { errorMessage }
      </span>
    </main>
  );
}

export default Register;
