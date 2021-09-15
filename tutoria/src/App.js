import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Coordinador from './pages/Coordinador/Coordinador.js';
import Tutor from './pages/Tutor/tutor.js';
import Alumno from './pages/Alumno/alumno.js';
import Cards from './Componentes/Cards.js'
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Route exact path='/' component={Cards} />
          <Route exact path='/Coordinador' component={Login} />
          <Route exact path="/Coordinador/Registro" component={Register} />
          <Route exact path='/Tutor' component={Tutor} />
          <Route exact path='/Alumno' component={Alumno} />
        </Router>
      </div>
    </>
  );
}

export default App;