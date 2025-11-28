import React, { useState } from "react";
import "./amigos.css";

export default function Amigos() {
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);

  const amigos = [
    {
      nombre: "Mabb 🌸",
      imagen: "https://i.imgur.com/AJPfk4n.png",
      descripcion:
        "Mi preciosa te amo mucho ❤️ eres una persona muy especial para mi, estoy agradecida con el universo por cruzarnos en el tiempo perfecto.✨️",
    },
    {
      nombre: "Lugo  🦁",
      imagen: "https://i.imgur.com/5cE7D04.png",
      descripcion:
        "Mi brou!! Más que mi brou mi hermano te quiero y te aprecio mucho agradecida contigo por siempre darme tus consejos vrgas.❤️",
    },
  ];

  return (
    <div className="amigos-container">
      <div className="amigos-linea"></div>

      <div className="amigos-collage">
        {amigos.map((amigo, index) => (
          <div
            key={index}
            className={`amigo-polaroid polaroid-${index}`}
            onClick={() => setAmigoSeleccionado(amigo)}
          >
            <img src={amigo.imagen} alt={amigo.nombre} />
            <p>{amigo.nombre}</p>
          </div>
        ))}
      </div>

      {amigoSeleccionado && (
        <div className="modal-overlay" onClick={() => setAmigoSeleccionado(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>{amigoSeleccionado.nombre}</h3>
            <p>{amigoSeleccionado.descripcion}</p>
            <button onClick={() => setAmigoSeleccionado(null)}>Cerrar ✨</button>
          </div>
        </div>
      )}
    </div>
  );
}
