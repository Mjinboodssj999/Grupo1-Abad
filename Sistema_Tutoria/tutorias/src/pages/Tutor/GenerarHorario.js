import React, { useState, useEffect, createRef, useRef } from 'react';    
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import "./GenerarHorario.css"

function Horario() {
    //const {guardadatosT} = props;
    //url para hacer peticiones
    const baseUrl = "http://localhost:80/Diana/Horario.php";
   //hace uso de los hooks
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [horarioSeleccionado, sethorarioSeleccionado] = useState({
    CodTutoria: '',
    CodAlumno: '',
    Fecha: '',
    Hora: '',
    CodDocente: '',
    }); 
    const handleChange = e => {
        const { name, value } = e.target;
        sethorarioSeleccionado((prevState) => ({
          ...prevState,
          [name]: value  
        }))
        console.log(horarioSeleccionado);
    }
    useEffect(() => {
        peticionGet();
    }, [])
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
        f.append("CodTutoria", refCodTutoriaI.current.value);
        f.append("CodAlumno",  "");
        f.append("Fecha",  refFechaI.current.value);
        f.append("Hora",  refHoraI.current.value);
        f.append("CodDocente",  "");
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
          .then(response => {
            setData(data.concat(response.data));
          }).catch(error => {
            console.log(error);
          })
      }
      const peticionDelete = async () => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, { params: { CodTutoria: horarioSeleccionado.CodTutoria } })
        .then(response => {
            setData(data.filter(thorario => thorario.CodTutoria !== horarioSeleccionado.CodTutoria));
            abrirCerrarModalEliminar();
            limpiar();
        }).catch(error => {
            console.log(error);
        })
      }

    const SeleccionarHorario = (thorario) => {
        sethorarioSeleccionado(thorario);
        abrirCerrarModalEliminar()
    }
    const abrirCerrarModalInsertar = () => {
      alert(refCodTutoriaI.current.value)
      //name.CodTutoria.current.value = refCodTutoriaI.current.value;
        setModalInsertar(!modalInsertar);
      }
    
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
      }
    function guardadatosT(pCodAlumno,pNombre,pApellido){
      refCodAlumno.current.value = pCodAlumno;
      refNombre.current.value = pNombre;
      refApellido.current.value = pApellido;
    }
    function guardadatosA(pCodTutoria,pFecha,pHora){
      refCodTutoria.current.value = pCodTutoria;
      refFecha.current.value = pFecha;
      refHora.current.value = pHora;
    }
    let refCodTutoria = useRef();
    let refCodAlumno = useRef();
    let refFecha = useRef();
    let refHora = useRef(); 
    let refNombre = useRef();
    let refApellido = useRef();
    let refCodDocente = useRef();;

    let refCodTutoriaI = useRef();
    let refCodAlumnoI = useRef();
    let refFechaI = useRef();
    let refHoraI = useRef();
    let refNombreI = useRef();
    let refApellidoI = useRef();
    let refCodDocenteI = useRef();
    let vacio='';

    const limpiar = (e) =>{
      refCodTutoriaI.current.value = vacio;
      refFechaI.current.value = vacio;
      refHoraI.current.value = vacio;
  }
    return (
        <div className="PaginaGenerarHorario">
          <div className="GenerarHorario">
                <div className="Titulod"> 
                    <h2 className="Titulo">Horario.</h2>  
                </div> 
                <div className="Datos1">
                    <div className="IntboxC">
                        <p className="text"> <u>Código de Tutoria:</u></p>
                        <input type="text" name="CodTutoria" className="form" ref={refCodTutoriaI} onChange={handleChange}/>
                    </div>
                </div>
                <div className="Datos4">
                    <div className="IntboxF">
                        <p className="text"> <u>Fecha:</u></p>
                        <input type="date" name="Fecha" className="form" ref={refFechaI}  onChange={handleChange}/>
                    </div>
                    <div className="IntboxH">
                        <p className="text"> <u>Hora:</u></p>
                        <input type="time" name="Hora" className="form" ref={refHoraI}  onChange={handleChange}/>
                    </div>
                </div>
                <div className="Botones">
                  <button className="btn-limpiar" onClick={() => limpiar()}>Limpiar</button>{"   "}
                  <button className="btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
                </div>

          </div>
          <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>CodTutoria</th>
                        <th>CodAlumno</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(thorario => (
                        <tr key={thorario.CodTutoria}>
                            <td >{thorario.CodTutoria}</td>
                            <td >{thorario.CodAlumno}</td>
                            <td >{thorario.Fecha}</td>
                            <td >{thorario.Hora}</td>
                            <td style={{display:"none"}}>{thorario.CodDocente}</td>
                            <td><button className="btn btn-danger" onClick={() => SeleccionarHorario(thorario)}>Eliminar</button></td>
                        </tr>
                    ))}
                
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalEliminar}>
              <ModalBody>
                ¿Estás seguro que deseas eliminar el Docente {horarioSeleccionado && horarioSeleccionado.CodTutoria}?
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
        </div>
      );
    }    
export default Horario;