import { useEffect } from "react";

export default function FondoCanvas() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // agregar antes del contenido, pero después del video
    const video = document.getElementById("background-video");
    if (video && video.parentNode) {
      video.parentNode.insertBefore(canvas, video.nextSibling);
    } else {
      document.body.appendChild(canvas);
    }

    // estilos
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "0", // 🔹 visible sobre el video (-2) pero debajo del contenido (1)
      pointerEvents: "none",
      background: "transparent",
    });

    // asegurar dimensiones correctas del lienzo real
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // burbujas
    const bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 8 + Math.random() * 25,
      speed: 0.2 + Math.random() * 0.5,
      alpha: 0.15 + Math.random() * 0.4,
      dx: Math.random() * 0.4 - 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.x += b.dx;
        if (b.y < -b.radius) {
          b.y = window.innerHeight + b.radius;
          b.x = Math.random() * window.innerWidth;
        }

        const grad = ctx.createRadialGradient(
          b.x,
          b.y,
          b.radius * 0.2,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, `rgba(200,255,220,${b.alpha + 0.3})`);
        grad.addColorStop(1, `rgba(150,255,180,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return null;
}




