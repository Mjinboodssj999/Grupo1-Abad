import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Aula() {
  const baseUrl = "http://localhost:80/apiFrameworks/ListarAulas.php";
  const [data, setData] = useState([]);
  const [dataDocente, setDataDocente] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [AulaSeleccionado, setAulaSeleccionado] = useState({
    CodAulaTutoria: '',
    CodDocenteTutor: '',
    CodGrupoAlumno: '',
    Semestre: '',
    Lugar: '',
  });
  const [DocenteSeleccionado, setDocenteSeleccionado] = useState({
    CodDocente: '',
    Nombres: '',
    Apellidos: '',
    Impedimento: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setAulaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AulaSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
    peticionBuscarDocente();
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    var f = new FormData();
    f.append("CodAulaTutoria", AulaSeleccionado.CodAulaTutoria);
    f.append("CodDocenteTutor", DocenteSeleccionado.CodDocente);
    f.append("CodGrupoAlumno", '');
    f.append("Semestre", AulaSeleccionado.Semestre);
    f.append("Lugar", AulaSeleccionado.Lugar);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    var f = new FormData();
    f.append("CodAulaTutoria", AulaSeleccionado.CodAulaTutoria);
    f.append("CodDocenteTutor", AulaSeleccionado.CodDocenteTutor);
    f.append("CodGrupoAlumno", AulaSeleccionado.CodGrupoAlumno);
    f.append("Semestre", AulaSeleccionado.Semestre);
    f.append("Lugar", AulaSeleccionado.Lugar);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, { params: { CodAulaTutoria: AulaSeleccionado.CodAulaTutoria } })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(tAula => {
          if (tAula.CodAulaTutoria === AulaSeleccionado.CodAulaTutoria) {
            tAula.CodDocenteTutor = AulaSeleccionado.CodDocenteTutor;
            tAula.CodGrupoAlumno = AulaSeleccionado.CodGrupoAlumno;
            tAula.Semestre = AulaSeleccionado.Semestre;
            tAula.Lugar = AulaSeleccionado.Lugar;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, { params: { CodAulaTutoria: AulaSeleccionado.CodAulaTutoria } })
      .then(response => {
        setData(data.filter(tAula => tAula.CodAulaTutoria !== AulaSeleccionado.CodAulaTutoria));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarAula = (tAula, caso) => {
    setAulaSeleccionado(tAula);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar()
  }
  const seleccionarDocente = (tDocente) => {
    setDocenteSeleccionado(tDocente);
  }
  const peticionBuscarDocente = async () => {
    var f = new FormData();
    f.append("METHOD", "MOSTRARDOCENTES");
    await axios.post(baseUrl, f)
      .then(response => {
        setDataDocente(response.data);

      }).catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar nueva Asignacion</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CodAulaTutoria</th>
            <th>CodDocenteTutor</th>
            <th>CodGrupoAlumno</th>
            <th>Semestre</th>
            <th>Lugar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tAula => (
            <tr key={tAula.CodAulaTutoria}>
              <td>{tAula.CodAulaTutoria}</td>
              <td>{tAula.CodDocenteTutor}</td>
              <td>{tAula.CodGrupoAlumno}</td>
              <td>{tAula.Semestre}</td>
              <td>{tAula.Lugar}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarAula(tAula, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarAula(tAula, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}


        </tbody>

      </table>


      <Modal isOpen={modalInsertar} className="modal-dialog modal-lg">
        <ModalHeader>Insertar tutor a las aulas </ModalHeader>
        <ModalBody className="container">
          <div className="row col-md-12">
            <div className="col-md-4">
              <label>CodAulaTutoria:
                <br />
                <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} />
              </label>
              <br />
              <label>Semestre:
                <br />
                <input type="text" className="form-control" name="Semestre" onChange={handleChange} />
              </label>
              <br />
              <label>Lugar:
                <br />
                <input type="text" className="form-control" name="Lugar" onChange={handleChange} />
              </label>
            </div>
            <div className="col-md-8">
              <label>Semestre:
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>CodDocente</th>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Impedimento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataDocente.map(tDocete => (
                      <tr key={tDocete.CodDocente}>
                        <td>{tDocete.CodDocente}</td>
                        <td>{tDocete.Nombres}</td>
                        <td>{tDocete.Apellidos}</td>
                        <td>{tDocete.Impedimento}</td>
                        <td>
                          <button className="btn btn-dark" onClick={() => seleccionarDocente(tDocete)}>✓</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Asignacion</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>CodAulaTutoria: </label>
            <br />
            <input type="text" className="form-control" name="CodAulaTutoria" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodAulaTutoria} />
            <br />
            <label>CodDocenteTutor: </label>
            <br />
            <input type="text" className="form-control" name="CodDocenteTutor" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodDocenteTutor} />
            <br />
            <label>CodGrupoAlumno: </label>
            <br />
            <input type="text" className="form-control" name="CodGrupoAlumno" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.CodGrupoAlumno} />
            <label>Semestre: </label>
            <br />
            <input type="text" className="form-control" name="Semestre" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Semestre} />
            <label>Lugar: </label>
            <br />
            <input type="text" className="form-control" name="Lugar" onChange={handleChange} value={AulaSeleccionado && AulaSeleccionado.Lugar} />

            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar la asignacion {AulaSeleccionado && AulaSeleccionado.CodDocenteTutor}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div >
  );
}
export default Aula;