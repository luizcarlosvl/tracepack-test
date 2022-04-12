import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  
  function logout() {
    localStorage.clear()
  }

  const { user } = JSON.parse(localStorage.getItem('user'));
  console.log((user.name))

  return (
    <main className="main-menu">
      <div className='menu-header'>
        <h1 className='title-menu'>{ user.name }</h1>
        <Link to="/">
            <button
              className="logout-button"
              onClick={ logout }
              type="button"
            >
              Logout
            </button>
          </Link>
      </div>
      <div className="button-menu-container">
        <Link to="/map">
          <button
            className="common-button"
            type="button"
          >
            Mapa
          </button>
        </Link>
        <Link to="/feature-points">
          <button
            className="common-button"
            type="button"
          >
            Cadastro de Posições
          </button>
        </Link>
        <Link to="/feature-polygons">
          <button
            className="common-button"
            type="button"
          >
            Cadastro de Polígonos
          </button>
        </Link>
      </div>
      
      
    </main>
  );
}

export default Menu;
