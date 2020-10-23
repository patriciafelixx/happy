import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import Logo from './images/logo.svg'

import './styles/global.css';
import './styles/pages/landing.css';

function App() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={Logo} alt="logo" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>SP</strong>
          <span>São Paulo</span>
        </div>

        <a href="#" className="enter-app">
          < FiArrowRight size={26} />
        </a>

      </div>
    </div>
  );
}

export default App;