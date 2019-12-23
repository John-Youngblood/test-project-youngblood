import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div>
      <Navigation />
      <hr/>
      <p>HELLO WORLD</p>
      </div>
    </Router>
  );
}

export default App;
