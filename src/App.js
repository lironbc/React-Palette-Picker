import React from 'react';
import Palette from './Palette';
import './App.css';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  return (
    <div className="App">
     <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
