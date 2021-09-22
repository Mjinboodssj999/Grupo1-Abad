import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar.js';
import ListaTutorados from './ListaTutorados'
import FichaTutoria from './FichaTutoria'
import Informes from './Informes'
import Cita from './Citas'
import { NavbarTutor } from '../SidebarData'
class Tutor extends React.Component {
  render() {
    return (
      <>
        <div className="Tutor">
          <Router>
            <Navbar Tipo={NavbarTutor} />
            <Switch>
              <Route exact path='/Tutor/ListaTutorados' component={ListaTutorados} />
              <Route exact path='/Tutor/Cita' component={Cita} />
              <Route exact path='/Tutor/FichaTutoria' component={FichaTutoria} />
              <Route exact path='/Tutor/Informes' component={Informes} />
            </Switch>
          </Router>
        </div>
      </>
    )

  }
}

export default Tutor