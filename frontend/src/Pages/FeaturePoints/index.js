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
      await http.post('/points',
        {
          email,
          point: {name, lat:latitude, lon:longitude}
        });
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
    <form className="main-points">
      <span className="title">Cadastro de Posições</span>
      <input
          className="points-input"
          placeholder="digite o nome da localização"
          onChange={ (event) => setName(event.target.value) }
        />
      <input
          className="points-input"
          placeholder="digite a latitude"
          onChange={ (event) => setLatitude(event.target.value) }
        />
      <input
        className="points-input"
        placeholder="digite a longitude"
        onChange={ (event) => setLongitude(event.target.value) }
      />  
      <div className="polygon-button-container">
        <button
          disabled={ !(validateLatitude && validateLongitude() && validateName()) }
          onClick={ createPoint }
          className="common-button"
          type="reset"
        >
          Create
        </button>
        <Link to="/menu">
          <button
            className="common-button"
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
    </form>
  );
}

export default FeaturePoints;