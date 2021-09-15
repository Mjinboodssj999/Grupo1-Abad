import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar.js';
import AsignarTutores from './AsignarTutor'
import AsignarTutorados from './AsignarTutorados'
import Docente from './Docente'
import Alumno from './Alumno'
import Horario from './Horarios'
import { NavbarCoordinador } from '../SidebarData'
class Coordinador extends React.Component {
  render() {
    return (
      <>
        <div className="Coordinador">
          <Router>
            <Navbar Tipo={NavbarCoordinador} />
            <Switch>
              <Route exact path='/Coordinador/AsignarTutores' component={AsignarTutores} />
              <Route exact path='/Coordinador/AsignarTutorados' component={AsignarTutorados} />
              <Route exact path='/Coordinador/docente' component={Docente} />
              <Route exact path='/Coordinador/alumno' component={Alumno} />
              <Route exact path='/Coordinador/horarios' component={Horario} />
            </Switch>
          </Router>
        </div>
      </>
    )

  }
}

export default Coordinador
