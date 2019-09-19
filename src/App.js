import React from 'react';
import Palette from './Palette';
import './App.css';
import seedColors from './seedColors';

function App() {
  return (
    <div className="App">
     <Palette {...seedColors[4]}/>
    </div>
  );
}

export default App;
