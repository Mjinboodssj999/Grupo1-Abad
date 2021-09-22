import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
function AsignarTutorados() {
  const baseUrl = "http://localhost:80/apiFrameworks/AsignarTutorados.php";
  const [dataAula, setDataAula] = useState([]);
  const [dataEstudiantes, setDataEstudiantes] = useState([]);
  const [modalBuscar, setModalBuscar] = useState(false);
  const [AulaSeleccionado, setaulaSeleccionado] = useState({
    CodDocente: '',
    Nombres: '',
    Apellidos: '',
    CodAulaTutoria: '',
    Semestre: '',
    Lugar: '',
  });
  const seleccionarAula = (taula) => {
    setaulaSeleccionado(taula);
    abrirCerrarModalBuscar();
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setaulaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AulaSeleccionado);
  }
  const peticionBuscar = async () => {
    var f = new FormData();
    f.append("METHOD", "BUSCARDOCENTES");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataAula(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  const peticionGenerarLista = async () => {
    var f = new FormData();
    f.append("CodAulaTutoria", AulaSeleccionado.CodAulaTutoria);
    f.append("METHOD", "LISTARESTUDIANTES");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataEstudiantes(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  const abrirCerrarModalBuscar = () => {
    setModalBuscar(!modalBuscar);
    peticionBuscar();
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
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodDocente} />
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
            <button className="btn btn-success" onClick={() => abrirCerrarModalBuscar()}  > Buscar </button>

          </div>
          <form >
            <br />
            <b>
              <label> DATOS GENERALES: </label>
              <br />
            </b>
            <label>CodAulaTutoria: </label>
            <input type="text" className="form-control" name="NombreDocente" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodAulaTutoria} />
            <br />

            <label>Semestre: </label>

            <input type="text" className="form-control" name="Semestre" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Semestre} />
            <br />

            <label>Lugar: </label>

            <input type="text" className="form-control" name="Lugar" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Lugar} />
            <br /><br />
          </form>

        </div>
        <div class="col">
          <br />
          <b>
            <label>LISTA ESTUDIANTES POR GRUPO:</label>
            <br /><br />
          </b>
          <div class="row mb-2">
          </div>
          <button className="btn btn-primary" onClick={() => peticionGenerarLista()}> Ver Tutorados </button>
          <br /><br />
          <b>
            <label>ESTUDIANTES: </label>
          </b>
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>CodAlumno</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {dataEstudiantes.map(testudiantes => (
                <tr key={testudiantes.CodAlumno}>
                  <td>{testudiantes.CodAlumno}</td>
                  <td>{testudiantes.Nombres}</td>
                  <td>{testudiantes.Apellidos}</td>
                  <td>{testudiantes.Correo}</td>
                  <td>{testudiantes.Telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={modalBuscar} className="modal-dialog modal-lg">
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
                    <button className="btn btn-danger" onClick={() => seleccionarAula(taula)}>Selecionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary " onClick={() => abrirCerrarModalBuscar()}>Cancelar</button>{"   "}
        </ModalFooter>
      </Modal>
    </div>

  )
}

export default AsignarTutorados
