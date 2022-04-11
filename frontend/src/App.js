import React from 'react';
import { Route, Switch } from 'react-router-dom';
/* import Provider from './Context/Provider'; */
import Pages from './Pages';
import './App.css';

function App() {
  return (

    
      <Switch>
        <Route exact component={ Pages.Login } path="/" />
        <Route exact component={ Pages.Register } path="/register" />
        <Route exact component={ Pages.Map } path="/map" />
        <Route exact component={ Pages.Menu } path="/menu" />
        <Route exact component={ Pages.FeaturePoints } path="/feature-points" />
        

      </Switch>
    

  );
}

export default App;
