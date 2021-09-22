import React, { useState, useEffect, createRef, useRef } from 'react';    
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import "./HorarioSeleccionar.css"
import { red } from '@material-ui/core/colors';

function Horario(props) {
    const {guardadatosH} = props;
    //url para hacer peticiones
    const baseUrl = "http://localhost:80/Diana/Horario.php";
   //hace uso de los hooks
    const [data, setData] = useState([]);
    const [modalSeleccionarHorario, setModalSeleccionarHorario] = useState(false);
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
    const abrirCerrarModalSeleccionarHorario = () => {
    setModalSeleccionarHorario(!modalSeleccionarHorario);
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
    
    const   Seleccionar = (thorario) =>{
        sethorarioSeleccionado(thorario);
        refCodTutoriaI.current.value = thorario.CodTutoria;
        refFechaI.current.value = thorario.Fecha;
        refHoraI.current.value = (thorario.Hora).substr(0,5);
        guardadatosH(refCodTutoriaI.current.value);
        abrirCerrarModalSeleccionarHorario();
    }
    const limpiar = (e) =>{
        refCodTutoriaI.current.value = vacio; 
        refFechaI.current.value = vacio;
        refHoraI.current.value = vacio;
        guardadatosH(vacio);
    }
    return (
        <div className="PaginaHorarioSeleccionar">
            <div>    
            <Modal isOpen={modalSeleccionarHorario} className="contenedor">
            <ModalHeader>Seleccionar Horario</ModalHeader>
            <ModalBody>
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
                            <td ref={refCodTutoria}>{thorario.CodTutoria}</td>
                            <td ref={refCodAlumno}>{thorario.CodAlumno}</td>
                            <td ref={refFecha}>{thorario.Fecha}</td>
                            <td ref={refHora}>{thorario.Hora}</td>
                            <td style={{display:"none"}} ref={refCodDocente}>{thorario.CodDocente}</td>
                            <td><button className="btn btn-primary" onClick={() => Seleccionar(thorario)}>Seleccionar</button></td>
                        </tr>
                    ))}
                
                    </tbody>
                </table>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => abrirCerrarModalSeleccionarHorario()}>Cancelar</button>
            </ModalFooter>
            </Modal>
            </div>
            <div className="HorariosSeleccionar">
                <h2 className="Titulo">Horarios.</h2>
                <div className = "boton">
                    <button className="btn btn-success" onClick={() => abrirCerrarModalSeleccionarHorario()}>Seleccionar Horario</button>
                </div> 
                <div className="Datos1">
                    <div className="Intbox">
                        <p className="text"> <u>Código de Tutoria:</u></p>
                        <input type="text" name="CodTutoria" className="form" ref={refCodTutoriaI} readOnly onChange={handleChange}/>
                    </div>
                </div>
                <div className="Datos2" >
                    <div className="Intbox">
                        <p className="text"> <u>Fecha:</u></p>
                        <input type="date" name="Fecha" className="form" ref={refFechaI} readOnly onChange={handleChange}></input>
                    </div>
                    <div className="Intbox">
                        <p className="text"> <u>Hora:</u></p>
                        <input type="text" name="Hora" className="form" ref={refHoraI} readOnly onChange={handleChange}></input>
                    </div>
                </div>
                <button className="botonAsignar" onClick={() => limpiar()}>limpiar</button> 
            </div>
        </div>
      );
    }    
export default Horario;