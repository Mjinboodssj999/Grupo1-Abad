import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Alumno() {
  const baseUrl = "http://localhost:80/apiFrameworks/Alumno.php";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [AlumnoSeleccionado, setalumnoSeleccionado] = useState({
    CodAlumno: '',
    Nombres: '',
    Apellidos: '',
    Correo: '',
    Telefono: '',
    DNI: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setalumnoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(AlumnoSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
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
    f.append("CodAlumno", AlumnoSeleccionado.CodAlumno);
    f.append("Nombres", AlumnoSeleccionado.Nombres);
    f.append("Apellidos", AlumnoSeleccionado.Apellidos);
    f.append("Correo", AlumnoSeleccionado.Correo);
    f.append("Telefono", AlumnoSeleccionado.Telefono);
    f.append("DNI", AlumnoSeleccionado.DNI);
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
    f.append("CodAlumno", AlumnoSeleccionado.CodAlumno);
    f.append("Nombres", AlumnoSeleccionado.Nombres);
    f.append("Apellidos", AlumnoSeleccionado.Apellidos);
    f.append("Correo", AlumnoSeleccionado.Correo);
    f.append("Telefono", AlumnoSeleccionado.Telefono);
    f.append("DNI", AlumnoSeleccionado.DNI);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, { params: { CodAlumno: AlumnoSeleccionado.CodAlumno } })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(talumno => {
          if (talumno.CodAlumno === AlumnoSeleccionado.CodAlumno) {
            talumno.Nombres = AlumnoSeleccionado.Nombres;
            talumno.Apellidos = AlumnoSeleccionado.Apellidos;
            talumno.Correo = AlumnoSeleccionado.Correo;
            talumno.Telefono = AlumnoSeleccionado.Telefono;
            talumno.DNI = AlumnoSeleccionado.DNI;
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
    await axios.post(baseUrl, f, { params: { CodAlumno: AlumnoSeleccionado.CodAlumno } })
      .then(response => {
        setData(data.filter(talumno => talumno.CodAlumno !== AlumnoSeleccionado.CodAlumno));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarAlumno = (talumno, caso) => {
    setalumnoSeleccionado(talumno);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar()
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CodAlumno</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>DNI</th>
          </tr>
        </thead>
        <tbody>
          {data.map(talumno => (
            <tr key={talumno.CodAlumno}>
              <td>{talumno.CodAlumno}</td>
              <td>{talumno.Nombres}</td>
              <td>{talumno.Apellidos}</td>
              <td>{talumno.Correo}</td>
              <td>{talumno.Telefono}</td>
              <td>{talumno.DNI}</td>

              <td>
                <button className="btn btn-primary" onClick={() => seleccionarAlumno(talumno, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarAlumno(talumno, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}


        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Alumno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>CodAlumno: </label>
            <br />
            <input type="text" className="form-control" name="CodAlumno" onChange={handleChange} />
            <br />
            <label>Nombres: </label>
            <br />
            <input type="text" className="form-control" name="Nombres" onChange={handleChange} />
            <br />
            <label>Apellidos: </label>
            <br />
            <input type="text" className="form-control" name="Apellidos" onChange={handleChange} />
            <label>Correo: </label>
            <br />
            <input type="text" className="form-control" name="Correo" onChange={handleChange} />
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="Telefono" onChange={handleChange} />
            <label>DNI: </label>
            <br />
            <input type="text" className="form-control" name="DNI" onChange={handleChange} />

            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Alumno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>CodAlumno: </label>
            <br />
            <input type="text" className="form-control" name="CodAlumno" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.CodAlumno} />
            <br />
            <label>Nombres: </label>
            <br />
            <input type="text" className="form-control" name="Nombres" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.Nombres} />
            <br />
            <label>Apellidos: </label>
            <br />
            <input type="text" className="form-control" name="Apellidos" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.Apellidos} />
            <label>Correo: </label>
            <br />
            <input type="text" className="form-control" name="Correo" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.Correo} />
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="Telefono" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.Telefono} />
            <label>DNI: </label>
            <br />
            <input type="text" className="form-control" name="DNI" onChange={handleChange} value={AlumnoSeleccionado && AlumnoSeleccionado.DNI} />

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
          ¿Estás seguro que deseas eliminar al Alumno {AlumnoSeleccionado && AlumnoSeleccionado.Nombres}?
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
export default Alumno;