import React, { useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Inicio from "./inicio";
import SobreMi from "./sobremi";
import Amigos from "./amigos";
import Galeria from "./galeria";
import "./BookEffect.css";

const BookEffect = ({ activeSection }) => {
  const book = useRef();

  // 📘 Páginas del libro con título y contenido
  const pages = [
    { id: "inicio", title: "Bienvenidos a mi xatspace", content: <Inicio />, wrap: false },
    { id: "sobremi", title: "✿ Sobre mí", content: <SobreMi />, wrap: true },
    { id: "amigos", title: "✿ Mis amigos", content: <Amigos />, wrap: false },
    { id: "galeria", title: "✿ Galería", content: <Galeria />, wrap: false },
  ];

  const currentPage = pages.findIndex((p) => p.id === activeSection);

useEffect(() => {
  if (book.current) {
    const flip = book.current.pageFlip();

    if (flip && currentPage >= 0) {
      const current = flip.getCurrentPageIndex();

      if (current !== currentPage) {
        flip.flip(currentPage); // ✅ único cambio en el movimiento

        setTimeout(() => {
          const shadows = document.querySelectorAll(
            ".stf__shadow, .page__shadow, .page__contentShadow"
          );
          shadows.forEach(s => (s.style.display = "none"));
        }, 400);
      }
    }
  }
}, [activeSection, currentPage]);


  return (
    <div className="book-container">
      {/* 📚 Hojas detrás del libro */}
      <div className="book-stack layer4"></div>
      <div className="book-stack layer3"></div>
      <div className="book-stack layer2"></div>
      <div className="book-stack"></div>

      <HTMLFlipBook
        width={380}
        height={370}
        minWidth={380}
        maxWidth={380}
        minHeight={330}
        maxHeight={330}
        showCover={false}
        mobileScrollSupport={false}
        useMouseEvents={false}
        clickEventForward={false}
        ref={book}
        className="book-flip"
        direction="ltr"
      >
        {pages.map((page, index) => (
          <div key={index} className="book-page">
            {/* 🌸 Encabezado decorativo con título */}
            <div className="book-header">
              <span className="book-header-title">{page.title}</span>
            </div>

            {/* 🌿 Si wrap = true, usar book-body. Si no, mostrar contenido directo */}
            {page.wrap ? (
              <div className="book-body">{page.content}</div>
            ) : (
              page.content
            )}
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default BookEffect;





