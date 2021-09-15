import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar.js';
import Horarios from './Horarios'
import { NavbarAlumno } from '../SidebarData'
class Alumno extends React.Component {
  render() {
    return (
      <>
        <div className="Alumno">
          <Router>
            <Navbar Tipo={NavbarAlumno} />
            <Switch>
              <Route exact path='/Alumno/Horarios' component={Horarios} />
            </Switch>
          </Router>
        </div>
      </>
    )

  }
}

export default Alumno