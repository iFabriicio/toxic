import React, { useState } from "react";
import "./App.css";
import Inicio from "./components/inicio";
import SobreMi from "./components/sobremi";
import Amigos from "./components/amigos";
import Galeria from "./components/galeria";
import Reproductor from "./components/reproductor";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");

  const renderSection = () => {
    switch (activeSection) {
      case "sobremi":
        return <SobreMi />;
      case "amigos":
        return <Amigos />;
      case "galeria":
        return <Galeria />;
      case "reproductor":
        return <Reproductor />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="sidebar">
          <div className="profile-pic">
            <img
              src="https://i.imgur.com/CHtuUqX.png"
              alt="perfil"
            />
            <div className="flowers"></div>
          </div>

          <div className="menu">
            <p onClick={() => setActiveSection("sobremi")}>Sobre mí ❤</p>
            <p onClick={() => setActiveSection("amigos")}>Amigos ❤</p>
            <p onClick={() => setActiveSection("galeria")}>Galería ❤</p>
            <p onClick={() => setActiveSection("inicio")}>Hasken ❤</p>
          </div>

          <div className="player">
            <p>Reproductor</p>
            <div className="buttons">
              <span>●</span>
              <span>●</span>
            </div>
          </div>
        </div>

        <div className="content">{renderSection()}</div>
      </div>
    </div>
  );
}
