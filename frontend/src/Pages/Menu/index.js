import { useHistory } from 'react-router-dom';

function Menu() {
  const history = useHistory();

  function exit() {
    localStorage.clear();
    history.push('/')

  }
  
  return (
    <div>
      <p>Menu</p>
      <button
        onClick={ exit }
        data-testid="common_login__button-login"
        type="button"
      >
        Sair
      </button>
    </div>
  )
}

export default Menu;
