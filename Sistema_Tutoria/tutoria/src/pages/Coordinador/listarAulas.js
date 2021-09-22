import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Aula() {
  const baseUrl = "http://localhost:80/apiFrameworks/ListarAulas.php";
  const [data, setData] = useState([]);
  const [modalBuscar, setModalBuscar] = useState(false);
  const [dataAlumno, setDataAlumno] = useState([]);
  const [AulaSeleccionado, setaulaSeleccionado] = useState({
    CodAulaTutoria: '',
    Nombres: '',
    Apellidos: '',
    Semestre: '',
    CodGrupoAlumno: '',
    Cantidad: '',
  });
  const [AlumnoSeleccionado, setalumnoSeleccionado] = useState({
    CodAlumno: '',
    Nombres: '',
    Apellidos: '',
  });
  const seleccionarAlumno = (talumno) => {
    setalumnoSeleccionado(talumno);
  }
  const seleccionarAula = (taula) => {
    abrirCerrarModalBuscar();
    setaulaSeleccionado(taula);

  }
  const peticionListar = async () => {
    var f = new FormData();
    f.append("METHOD", "LISTAR");
    await axios.post(baseUrl, f)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  const abrirCerrarModalBuscar = () => {
    setModalBuscar(!modalBuscar);
    peticionBuscar();
  }
  const peticionBuscar = async () => {
    var f = new FormData();
    f.append("METHOD", "ALUMNOSNUEVOS");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataAlumno(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  const peticionPost = async () => {
    var f = new FormData();
    f.append("CodGrupoEstudiante", AulaSeleccionado.CodGrupoAlumno);
    f.append("CodAlumno", AlumnoSeleccionado.CodAlumno);
    f.append("METHOD", "AGREGAR");
    await axios.post(baseUrl, f)
      .catch(error => {
        console.log(error);
      })
    peticionListar();
  }
  const peticionAgregar = () => {
    peticionPost();
    abrirCerrarModalBuscar();
  }
  useEffect(() => {
    peticionListar();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br /><br />
      <b>
        <label> LISTA GENERAL DE LAS AULAS DE TUTORIA </label>
      </b>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CodAulaTutoria</th>
            <th>NombreDocente</th>
            <th>Apellidos</th>
            <th>Semestre</th>
            <th>Grupo</th>
            <th>CantidadAlumnos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tAula => (
            <tr key={tAula.CodAulaTutoria}>
              <td>{tAula.CodAulaTutoria}</td>
              <td>{tAula.Nombres}</td>
              <td>{tAula.Apellidos}</td>
              <td>{tAula.Semestre}</td>
              <td>{tAula.CodGrupoAlumno}</td>
              <td>{tAula.Cantidad}</td>
              <td>
                <button className="btn btn-success" onClick={() => seleccionarAula(tAula)}> + </button> {"  "}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalBuscar} className="modal-dialog modal-lg">
        <ModalHeader> Alumnos sin Tutoria</ModalHeader>
        <ModalBody>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>CodAlumo</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {dataAlumno.map(talumno => (
                <tr key={talumno.CodAlumno}>
                  <td>{talumno.CodAlumno}</td>
                  <td>{talumno.Nombres}</td>
                  <td>{talumno.Apellidos}</td>
                  <td>
                    <button className="btn btn-dark" onClick={() => seleccionarAlumno(talumno)}>✓</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary " onClick={() => peticionAgregar()}>Asignar</button>{"   "}
          <button className="btn btn-danger " onClick={() => abrirCerrarModalBuscar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div >
  );
}
export default Aula;