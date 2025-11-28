import React from "react";
import "./galeria.css";

export default function Galeria() {
  const fotos = [
    { id: 1, src: "https://i.imgur.com/LObF1Mc.png", caption: "", rotate: "-5deg" },
    { id: 2, src: "https://i.imgur.com/YzN8VNJ.png", caption: "", rotate: "4deg" },
    { id: 3, src: "https://i.imgur.com/WZUdRlV.png", caption: "", rotate: "-7deg" },
  ];

  return (
    <div className="galeria-container">

      <div className="galeria-grid">
        {fotos.map((foto) => (
          <div
            key={foto.id}
            className="galeria-card"
            style={{ transform: `rotate(${foto.rotate})` }}
          >
<img src={foto.src} className="galeria-img" alt={foto.caption} />
            <span className="galeria-caption">{foto.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


