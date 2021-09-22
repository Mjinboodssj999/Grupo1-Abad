import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
export const NavbarCoordinador = [
  {
    title: 'Asignar Tutores',
    path: '/Coordinador/AsignarTutores',
    icon: <BsIcons.BsPersonPlusFill />,
    cName: 'nav-text'
  },
  {
    title: 'Asignar Tutorados',
    path: '/Coordinador/AsignarTutorados',
    icon: <BsIcons.BsPersonLinesFill />,
    cName: 'nav-text'
  },
  {
    title: 'Listar Aulas',
    path: '/Coordinador/ListarAulas',
    icon: <BsIcons.BsPersonPlusFill />,
    cName: 'nav-text'
  },
  {
    title: 'Docente',
    path: '/Coordinador/docente',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Alumno',
    path: '/Coordinador/alumno',
    icon: <IoIcons.IoMdPerson />,
    cName: 'nav-text'
  },
];
export const NavbarTutor = [
  {
    title: 'Ver Lista Tutoria',
    path: '/Tutor/ListaTutorados',
    icon: <FaIcons.FaListAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Generar Cita',
    path: '/Tutor/Cita',
    icon: <BsIcons.BsCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Ficha de Tutoria',
    path: '/Tutor/FichaTutoria',
    icon: <AiIcons.AiOutlineSolution />,
    cName: 'nav-text'
  },
  {
    title: 'Informes',
    path: '/Tutor/Informes',
    icon: <HiIcons.HiDocumentReport />,
    cName: 'nav-text'
  }
];
export const NavbarAlumno = [
  {
    title: 'Ver Horario de Tutorias',
    path: '/Alumno/Horarios',
    icon: <BsIcons.BsCalendar />,
    cName: 'nav-text'
  },
]
