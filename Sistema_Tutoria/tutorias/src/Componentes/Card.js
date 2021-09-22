import React from 'react'
import "./cards.css";
function Card({ title, image, path, tex }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={image} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">{tex}</p>
        <a href={path} className="btn btn-outline-secondary rounded-0" > Iniciar Sección</a>
      </div>
    </div>
  );
}
export default Card;
