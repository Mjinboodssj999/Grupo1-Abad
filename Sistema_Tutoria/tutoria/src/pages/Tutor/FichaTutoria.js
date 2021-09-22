import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
function AsignarTutorados() {
  const baseUrl = "http://localhost:80/apiFrameworks/FichaTutoria.php";
  const [dataAula, setDataAula] = useState([]);
  const [modalBuscarCita, setModalBuscarCita] = useState(false);
  const [modalBuscarDocente, setModalBuscarDocente] = useState(false);
  const [AulaSeleccionado, setaulaSeleccionado] = useState({
    CodTutoria: '',
    CodAlumno: '',
    Nombres: '',
    Apellidos: '',
    Fecha: Date,
    Hora: Date,
  });
  const [DocenteSeleccionado, setDocenteSeleccionado] = useState({
    CodDocente: '',
    Nombres: '',
    Apellidos: '',
    CodAulaTutoria: '',
    Semestre: '',
    Lugar: '',
  });
  const [FichaSeleccionado, setfichaSeleccionado] = useState({
    Actividad: '',
    TipoTutoria: '',
    Detalles: '',
    Psicologia: '',
    Permiso: '',

  });
  const SeleccionarCita = (taula) => {
    setaulaSeleccionado(taula);
    abrirCerrarModalBuscarCita();
  }
  const seleccionarDocente = (taula) => {
    setDocenteSeleccionado(taula);
    abrirCerrarModalBuscarDocente();
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setaulaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AulaSeleccionado);
  }
  const handleChange4 = e => {
    const { name, value } = e.target;
    DocenteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AulaSeleccionado);
  }
  const handleChange3 = e => {
    const { name, value } = e.target;
    setfichaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AulaSeleccionado);
  }

  const peticionPost = async () => {
    var f = new FormData();
    f.append("CodFicha", 'F' + AulaSeleccionado.CodTutoria);
    f.append("CodEstudiante", AulaSeleccionado.CodAlumno);
    f.append("Fecha", AulaSeleccionado.Fecha);
    f.append("Hora", AulaSeleccionado.Hora);
    f.append("TipoTutoria", FichaSeleccionado.TipoTutoria);
    f.append("Detalles", FichaSeleccionado.Detalles);
    f.append("Psicologia", FichaSeleccionado.Psicologia);
    f.append("Semestre", DocenteSeleccionado.Semestre);
    f.append("Permiso", FichaSeleccionado.Permiso);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .catch(error => {
        console.log(error);
      })
  }
  const peticionBuscar = async () => {
    var f = new FormData();
    f.append("CodDocente", DocenteSeleccionado.CodDocente);
    f.append("METHOD", "BUSCARCITAS");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataAula(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  const peticionBuscar2 = async () => {
    var f = new FormData();
    f.append("METHOD", "BUSCARDOCENTES");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataAula(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  const abrirCerrarModalBuscarCita = () => {
    setModalBuscarCita(!modalBuscarCita);
    peticionBuscar();
  }
  const abrirCerrarModalBuscarDocente = () => {
    setModalBuscarDocente(!modalBuscarDocente);
    peticionBuscar2();
  }

  return (
    <div class="container">
      <div class="row mb-2">
        <div class="col">
          <form >
            <br />
            <b>
              <label> SELECIONAR DOCENTE TUTOR:
                <br /><br />
                <label> CodDocente: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange4} value={DocenteSeleccionado && DocenteSeleccionado.CodDocente} />
                <br />
                <label> Nombres: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange4} value={DocenteSeleccionado && DocenteSeleccionado.Nombres} />
                <br />
                <label> Apellidos: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange4} value={DocenteSeleccionado && DocenteSeleccionado.Apellidos} />
                <br />
              </label>
            </b>
          </form>
          <div>
            <button className="btn btn-success" onClick={() => abrirCerrarModalBuscarDocente()}  > Buscar Docente </button>

          </div>
          <form >
            <br />
            <b>
              <label> SELECIONAR CITA DE TUTORIA:
                <br /><br />
                <label> CodTutoria: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodTutoria} />
                <br />
                <label> CodAlumno: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodAlumno} />
                <br />
                <label> Nombres: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Nombres} />
                <br />
                <label> Apellidos: </label>
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Apellidos} />
                <br />
              </label>
            </b>
          </form>
          <div>
            <button className="btn btn-secondary" onClick={() => abrirCerrarModalBuscarCita()}  > Buscar Cita </button>
          </div>

        </div>
        <div class="col">
          <br />
          <b>
            <label>GENERAR FICHA DE TUTORIA:</label>
            <br /><br />
          </b>
          <div class="row mb-2">
          </div>
          <label>Codigo Ficha: </label>
          <input type="text" className="form-control" name="CodTutoria" onChange={handleChange3} value={'F' + AulaSeleccionado.CodTutoria} />
          <br />
          <label>Actividad: </label>
          <input type="text" className="form-control" name="Actividad" onChange={handleChange3} />
          <br />
          <label>Tipo tutoria: </label>
          <input type="text" className="form-control" name="TipoTutoria" onChange={handleChange3} />
          <br />
          <label>Detalles: </label>
          <input type="text" className="form-control" name="Detalles" onChange={handleChange3} />
          <br />
          <label>Psicologia: </label>
          <input type="text" className="form-control" name="Psicologia" onChange={handleChange3} />
          <br />
          <label>Permiso: </label>
          <input type="text" className="form-control" name="Permiso" onChange={handleChange3} />
          <br />
          <button className="btn btn-danger " onClick={() => peticionPost()}>Registrar Ficha</button>{"   "}
        </div>
      </div>
      <Modal isOpen={modalBuscarDocente} className="modal-dialog modal-lg">
        <ModalHeader>  Docentes Tutores</ModalHeader>
        <ModalBody>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>CodDocente</th>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>CodAula</th>
                <th>Semestre</th>
                <th>lugar</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {dataAula.map(taula => (
                <tr key={taula.CodDocente}>
                  <td>{taula.CodDocente}</td>
                  <td>{taula.Nombres}</td>
                  <td>{taula.Apellidos}</td>
                  <td>{taula.CodAulaTutoria}</td>
                  <td>{taula.Semestre}</td>
                  <td>{taula.Lugar}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => seleccionarDocente(taula)}>Selecionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary " onClick={() => abrirCerrarModalBuscarDocente()}>Cancelar</button>{"   "}
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalBuscarCita} className="modal-dialog modal-lg">
        <ModalHeader>Tutorados </ModalHeader>
        <ModalBody>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>CodTutoria</th>
                <th>CodAlumno</th>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {dataAula.map(taula => (
                <tr key={taula.CodTutoria}>
                  <td>{taula.CodTutoria}</td>
                  <td>{taula.CodAlumno}</td>
                  <td>{taula.Nombres}</td>
                  <td>{taula.Apellidos}</td>
                  <td>{taula.Fecha}</td>
                  <td>{taula.Hora}</td>
                  <td>
                    <button className="btn btn-dark" onClick={() => SeleccionarCita(taula)}>✓</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary " onClick={() => abrirCerrarModalBuscarCita()}>Cancelar</button>{"   "}
        </ModalFooter>
      </Modal>
    </div>

  )
}

export default AsignarTutorados