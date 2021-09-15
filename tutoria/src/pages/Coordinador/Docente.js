import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Docente() {
  const baseUrl = "http://localhost:80/apiFrameworks/Docente.php";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [docenteSeleccionado, setdocenteSeleccionado] = useState({
    CodDocente: '',
    Nombres: '',
    Apellidos: '',
    Correo: '',
    Telefono: '',
    DNI: '',
    Categoria: '',
    Especialidad: '',
    Impedimento: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setdocenteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(docenteSeleccionado);
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
    f.append("CodDocente", docenteSeleccionado.CodDocente);
    f.append("Nombres", docenteSeleccionado.Nombres);
    f.append("Apellidos", docenteSeleccionado.Apellidos);
    f.append("Correo", docenteSeleccionado.Correo);
    f.append("Telefono", docenteSeleccionado.Telefono);
    f.append("DNI", docenteSeleccionado.DNI);
    f.append("Categoria", docenteSeleccionado.Categoria);
    f.append("Especialidad", docenteSeleccionado.Especialidad);
    f.append("Impedimento", docenteSeleccionado.Impedimento);
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
    f.append("CodDocente", docenteSeleccionado.CodDocente);
    f.append("Nombres", docenteSeleccionado.Nombres);
    f.append("Apellidos", docenteSeleccionado.Apellidos);
    f.append("Correo", docenteSeleccionado.Correo);
    f.append("Telefono", docenteSeleccionado.Telefono);
    f.append("DNI", docenteSeleccionado.DNI);
    f.append("Categoria", docenteSeleccionado.Categoria);
    f.append("Especialidad", docenteSeleccionado.Especialidad);
    f.append("Impedimento", docenteSeleccionado.Impedimento);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, { params: { CodDocente: docenteSeleccionado.CodDocente } })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(tdocente => {
          if (tdocente.CodDocente === docenteSeleccionado.CodDocente) {
            tdocente.Nombres = docenteSeleccionado.Nombres;
            tdocente.Apellidos = docenteSeleccionado.Apellidos;
            tdocente.Correo = docenteSeleccionado.Correo;
            tdocente.Telefono = docenteSeleccionado.Telefono;
            tdocente.DNI = docenteSeleccionado.DNI;
            tdocente.Categoria = docenteSeleccionado.Categoria;
            tdocente.Especialidad = docenteSeleccionado.Especialidad;
            tdocente.Impedimento = docenteSeleccionado.Impedimento;
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
    await axios.post(baseUrl, f, { params: { CodDocente: docenteSeleccionado.CodDocente } })
      .then(response => {
        setData(data.filter(tdocente => tdocente.CodDocente !== docenteSeleccionado.CodDocente));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarDocente = (tdocente, caso) => {
    setdocenteSeleccionado(tdocente);

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
            <th>CodDocente</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>DNI</th>
            <th>Categoria</th>
            <th>Especialidad</th>
            <th>Impedimento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tdocente => (
            <tr key={tdocente.CodDocente}>
              <td>{tdocente.CodDocente}</td>
              <td>{tdocente.Nombres}</td>
              <td>{tdocente.Apellidos}</td>
              <td>{tdocente.Correo}</td>
              <td>{tdocente.Telefono}</td>
              <td>{tdocente.DNI}</td>
              <td>{tdocente.Categoria}</td>
              <td>{tdocente.Especialidad}</td>
              <td>{tdocente.Impedimento}</td>

              <td>
                <button className="btn btn-primary" onClick={() => seleccionarDocente(tdocente, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarDocente(tdocente, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}


        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Docente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>CodDocente: </label>
            <br />
            <input type="text" className="form-control" name="CodDocente" onChange={handleChange} />
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
            <label>DNI: </label>
            <br />
            <input type="text" className="form-control" name="DNI" onChange={handleChange} />
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="Telefono" onChange={handleChange} />
            <label>Categoria: </label>
            <br />
            <input type="text" className="form-control" name="Categoria" onChange={handleChange} />
            <label>Especialidad: </label>
            <br />
            <input type="text" className="form-control" name="Especialidad" onChange={handleChange} />
            <label>Impedimento: </label>
            <br />
            <input type="text" className="form-control" name="Impedimento" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Docente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>CodDocente: </label>
            <br />
            <input type="text" className="form-control" name="CodDocente" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.CodDocente} />
            <br />
            <label>Nombres: </label>
            <br />
            <input type="text" className="form-control" name="Nombres" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Nombres} />
            <br />
            <label>Apellidos: </label>
            <br />
            <input type="text" className="form-control" name="Apellidos" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Apellidos} />
            <label>Correo: </label>
            <br />
            <input type="text" className="form-control" name="Correo" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Correo} />
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="Telefono" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Telefono} />
            <label>DNI: </label>
            <br />
            <input type="text" className="form-control" name="DNI" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.DNI} />
            <label>Categoria: </label>
            <br />
            <input type="text" className="form-control" name="Categoria" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Categoria} />
            <label>Especialidad: </label>
            <br />
            <input type="text" className="form-control" name="Especialidad" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Especialidad} />
            <label>Impedimento: </label>
            <br />
            <input type="text" className="form-control" name="Impedimento" onChange={handleChange} value={docenteSeleccionado && docenteSeleccionado.Impedimento} />
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
          ¿Estás seguro que deseas eliminar el Docente {docenteSeleccionado && docenteSeleccionado.Nombres}?
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
export default Docente;