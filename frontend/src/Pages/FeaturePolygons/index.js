import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FeaturePolygons() {
  const [latA, setlatA] = useState('');
  const [lonA, setLonA] = useState('');
  const [latB, setlatB] = useState('');
  const [lonB, setLonB] = useState('');
  const [latC, setlatC] = useState('');
  const [lonC, setLonC] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 30000,
  });

  const { user } = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  async function createPoint() {
    try {
      await http.post('/polygons',
        {
          email,
          polygon: {name, color: { color }, latA, lonA, latB, lonB, latC, lonC }
        });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const validate = () => {
    const min = 3;
    if (latA.length >= min
        && lonA.length >= min
        && latB.length >= min
        && lonB.length >= min
        && latC.length >= min
        && lonC.length >= min  
    ) return true;
    return false;
  };

  return (
    <form className="main-polygons">
      <span className="title">Cadastro de Polígonos</span>
        <input
          className="polygon-input"
          placeholder="digite o nome da localização"
          onChange={ (event) => setName(event.target.value) }
          />
        <input
          className="polygon-input"
          placeholder="digite uma cor (em inglês)"
          onChange={ (event) => setColor(event.target.value) }
          />  
      <div className='sub-container-polygons'>
        <input
          placeholder="digite a latitude"
          onChange={ (event) => setlatA(event.target.value) }
          />
        <input
          placeholder="digite a longitude"
          onChange={ (event) => setLonA(event.target.value) }
        />
      </div>
      <div className='sub-container-polygons'>
        <input
          placeholder="digite a latitude"
          onChange={ (event) => setlatB(event.target.value) }
          />
        <input
          placeholder="digite a longitude"
          onChange={ (event) => setLonB(event.target.value) }
        />
      </div>
      <div className='sub-container-polygons'>
        <input
          placeholder="digite a latitude"
          onChange={ (event) => setlatC(event.target.value) }
          />
        <input
          placeholder="digite a longitude"
          onChange={ (event) => setLonC(event.target.value) }
        />
      </div>  
      <div className="polygon-button-container">
        <button
          disabled={ !(validate()) }
          onClick={ createPoint }
          className="common-button"
          type="reset"
        >
          Create
        </button>
        <Link to="/menu">
          <button
            className='common-button'
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

export default FeaturePolygons;