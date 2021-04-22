import React from 'react';
import './styles/App.css'
import CovidLogo from './Components/CovidLogo/CovidLogo'
import Informations from './Components/Informations/Informations'

function App() {
  return (
    <div className="App">
      <CovidLogo/>
      <Informations/>
    </div>
  );
}

export default App;
