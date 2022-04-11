import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FeaturePoints() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 30000,
  });

  const { user } = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  async function createPoint() {
    try {
      const response = await http.post('/points',
        {
          email,
          point: {name, lat:latitude, lon:longitude}
        });
      console.log(response);  
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const validateLatitude = () => {
    const min = 3;
    if (latitude.length >= min) return true;
    return false;
  };

  const validateLongitude = () => {
    const min = 3;
    if (latitude.length >= min) return true;
    return false;
  };

  const validateName = () => {
    const min = 3;
    if (latitude.length >= min) return true;
    return false;
  };

  return (
    <main className="main">
      <span className="title">Feature Points</span>
      <input
          data-testid="menu-input-name"
          placeholder="digite o nome da localização"
          onChange={ (event) => setName(event.target.value) }
        />
      <input
          data-testid="menu-input-latitude"
          placeholder="digite a latitude"
          onChange={ (event) => setLatitude(event.target.value) }
        />
      <input
        data-testid="common_login__input-longitude"
        placeholder="digite a longitude"
        onChange={ (event) => setLongitude(event.target.value) }
      />  
      <div className="button-container">
        <button
          disabled={ !(validateLatitude && validateLongitude() && validateName()) }
          onClick={ createPoint }
          data-testid="common_login__button-login"
          type="button"
        >
          Create
        </button>
        <Link to="/menu">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            Menu
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

export default FeaturePoints;