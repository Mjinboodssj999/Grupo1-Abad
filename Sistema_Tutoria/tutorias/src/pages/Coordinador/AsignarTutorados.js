import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
function AsignarTutorados() {
  const baseUrl = "http://localhost:80/apiFrameworks/AsignarTutorados.php";
  const [dataAula, setDataAula] = useState([]);
  const [dataGrupo, setDataGrupo] = useState([]);
  const [dataEstudiantes, setDataEstudiantes] = useState([]);
  const [dataCantidad, setDataCantidad] = useState({
    Cantidad: '',
  });
  const [modalBuscar, setModalBuscar] = useState(false);
  const [AulaSeleccionado, setaulaSeleccionado] = useState({
    CodAulaTutoria: '',
    Nombres: '',
    Apellidos: '',
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
  const peticionPost = async (Codigo) => {
    var f = new FormData();
    f.append("CodGrupoEstudiante", 'G-' + AulaSeleccionado.CodAulaTutoria);
    f.append("CodAlumno", Codigo);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataGrupo(dataGrupo.concat(response.data));
      }).catch(error => {
        console.log(error);
      })
  }
  const peticionPut = async () => {
    var f = new FormData();
    f.append("CodAulaTutoria", AulaSeleccionado.CodAulaTutoria);
    f.append("CodGrupoAlumno", 'G-' + AulaSeleccionado.CodAulaTutoria);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, { params: { CodAulaTutoria: AulaSeleccionado.CodAulaTutoria } })

      .catch(error => {
        console.log(error);
      })
  }
  const InsertarGrupo = () => {
    for (var i = 0, max = dataEstudiantes.length; i < max; i += 1) {

      peticionPost(dataEstudiantes[i].CodAlumno);

    }
    peticionPut();

  }
  const peticionBuscar = async () => {
    var f = new FormData();
    f.append("METHOD", "BUSCAR");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataAula(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  const peticionCalcular = async () => {
    var f = new FormData();
    f.append("METHOD", "CALCULAR");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataCantidad(response.data[0]);
      }).catch(error => {
        console.log(error);
      })
  }
  const peticionGenerarLista = async () => {
    var f = new FormData();
    f.append("CantidadAlumnos", dataCantidad.Cantidad);
    f.append("METHOD", "GENERARESTUDIANTES");
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
              <label> SELECIONAR AULA DE TUTORIA:
                <br /><br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodAulaTutoria} />
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
            <label>Nombre Docente: </label>
            <input type="text" className="form-control" name="NombreDocente" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Nombres} />
            <br />

            <label>Apellido del Docente: </label>

            <input type="text" className="form-control" name="ApellidoDocente" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Apellidos} />
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
            <label>GENERAR ESTUDIANTES POR GRUPO:</label>
            <br /><br />
          </b>
          <div class="row mb-2">
            <div class="col">
              <label>Nro Estudiantes por Grupo</label>
              <input type="number" className="form-control " name="NroEstudiantes" value={dataCantidad && dataCantidad.Cantidad} />
            </div>
            <div class="col">
              <label>Codigo del Grupo</label>
              <br />
              <input type="text" className="form-control " name="CodGrupo" onChange={handleChange} value={'G-' + AulaSeleccionado.CodAulaTutoria} />
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => peticionCalcular()}> Calcular </button>{"   "}
          <button className="btn btn-primary" onClick={() => peticionGenerarLista()}> Generar Estudiantes </button>
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
              </tr>
            </thead>
            <tbody>
              {dataEstudiantes.map(testudiantes => (
                <tr key={testudiantes.CodAlumno}>
                  <td>{testudiantes.CodAlumno}</td>
                  <td>{testudiantes.Nombres}</td>
                  <td>{testudiantes.Apellidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <br /><br />
            <button className="btn btn-primary">Nuevo</button>{"   "}
            <button className="btn btn-danger" onClick={() => InsertarGrupo()}>Asignar</button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalBuscar} className="modal-dialog modal-lg">
        <ModalHeader> Aulas de Tutoria Disponibles</ModalHeader>
        <ModalBody>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>AulaTutoria</th>
                <th>Docente</th>
                <th>Apellido</th>
                <th>Semestre</th>
                <th>lugar</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {dataAula.map(taula => (
                <tr key={taula.CodAulaTutoria}>
                  <td>{taula.CodAulaTutoria}</td>
                  <td>{taula.Nombres}</td>
                  <td>{taula.Apellidos}</td>
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
