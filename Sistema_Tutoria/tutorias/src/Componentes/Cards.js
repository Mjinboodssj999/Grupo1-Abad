import React from 'react'
import Card from './Card.js'
import imageCoord from '../imagenes/coordinador.png'
import imageAlum from '../imagenes/alumno.jpg'
import imageTutor from '../imagenes/tutor.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const cards = [
  {
    id: 1,
    title: 'Coordinador',
    image: imageCoord,
    path: '/Coordinador',
    tex: 'Descripcion de Coordinador'
  },
  {
    id: 2,
    title: 'Tutor',
    image: imageTutor,
    path: '/Tutor',
    tex: 'Descripcion de Tutor'
  },
  {
    id: 3,
    title: 'Alumno',
    image: imageAlum,
    path: '/Alumno',
    tex: 'Descripcion de Alumno'
  }


]

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100 ">
      <div className="row">
        {
          cards.map(card => (
            <div className="col-md-4" key={cards.id}>
              <Card title={card.title} image={card.image} path={card.path} tex={card.tex} />
            </div>
          ))
        }
      </div>
    </div >

  )
}

export default Cards
