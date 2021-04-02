import React from 'react'
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import SelectUser from './SelectUserType/SelectUser'
import './App.css'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SelectUser />
      </header>
    </div>
  );
}

export default App;
