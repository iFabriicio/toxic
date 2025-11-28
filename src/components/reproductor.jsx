import React, { useState, useRef, useEffect } from "react";
import "./reproductor2.css";

export default function Reproductor() {

  const songs = [
    { src: "/music/Junior H - LA CHERRY.mp3", artist: "Junior H", title: "LA CHERRY" },
    { src: "/music/Junior H - ROCKSTAR.mp3", artist: "Junior H", title: "ROCKSTAR" },
    { src: "/music/Junior H - SE AMERITA.mp3", artist: "Junior H", title: "SE AMERITA" }
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef(null);

  // 🔥 Cuando cambia de canción, recargar y reproducir SOLO si ya estaba sonando
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load(); // recarga la nueva canción

    if (isPlaying) {
      audio.play().catch(err => console.log("Bloqueado al cambiar canción:", err));
    }

  }, [current]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("El navegador bloqueó la reproducción:", err));
    }
  };

  const nextSong = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % songs.length);
  };

  return (
    <div
      className={`reproductor ${expanded ? "expandido" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="song-info">
        <p className="titulo">{songs[current].artist}</p>
        <p className="cancion">{songs[current].title}</p>
      </div>

      <div className="controles">
        <button className="btn-control" onClick={nextSong}>⏭</button>
        <button className="btn-control" onClick={togglePlay}>
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <audio
          ref={audioRef}
          src={songs[current].src}
          onEnded={() => setCurrent((prev) => (prev + 1) % songs.length)}
        />
      </div>
    </div>
  );
}










