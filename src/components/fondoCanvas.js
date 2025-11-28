import React, { useEffect, useRef } from "react";
import "./App.css"; // por si no estaba tomando estilos

export default function FondoCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño full pantalla
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Crear copos de nieve
    const snowflakes = [];
    const TOTAL = 180; // muchos copos para asegurar que se vea
    for (let i = 0; i < TOTAL; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1.5,   // tamaño más visible
        d: Math.random() * 1 + 0.5,   // velocidad de caída
        drift: Math.random() * 1 - 0.5, // movimiento lateral suave
        wind: 0.3                    // viento constante
      });
    }

    // Dibujar nieve
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      snowflakes.forEach(flake => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      });
      ctx.fill();
    };

    // Movimiento de nieve
    const update = () => {
      snowflakes.forEach(flake => {
        flake.y += flake.d;
        flake.x += flake.drift;
        flake.x += flake.wind;

        if (flake.y > canvas.height) {
          flake.y = -8;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width || flake.x < 0) {
          flake.x = Math.random() * canvas.width;
        }
      });
    };

    // Loop animación
    const loop = () => {
      draw();
      update();
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="snow-canvas" className="snow-canvas" />;
}




