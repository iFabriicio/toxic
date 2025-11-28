import React, { useState, useRef, useEffect } from "react";
import "./reproductor2.css";

export default function ReproductorDebug() {
  const songs = [
    { src: process.env.PUBLIC_URL + "/music/Junior H - LA CHERRY.mp3", artist: "Junior H", title: "LA CHERRY" },
    { src: process.env.PUBLIC_URL + "/music/Junior H - ROCKSTAR.mp3", artist: "Junior H", title: "ROCKSTAR" },
    { src: process.env.PUBLIC_URL + "/music/Junior H - SE AMERITA.mp3", artist: "Junior H", title: "SE AMERITA" }
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logLines, setLogLines] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(null);
  const audioRef = useRef(null);

  const addLog = (txt) => {
    console.log(txt);
    setLogLines(l => [ (new Date()).toLocaleTimeString() + " — " + txt, ...l ].slice(0, 50));
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const handlers = {
      play: () => addLog("EVENT play"),
      pause: () => addLog("EVENT pause"),
      playing: () => addLog("EVENT playing"),
      canplay: () => addLog("EVENT canplay"),
      canplaythrough: () => addLog("EVENT canplaythrough"),
      loadeddata: () => addLog("EVENT loadeddata"),
      loadedmetadata: () => addLog("EVENT loadedmetadata; duration=" + a.duration),
      ended: () => addLog("EVENT ended"),
      error: () => {
        const err = a.error;
        addLog("EVENT error: " + (err ? `code=${err.code} message=${err.message || "no message"}` : "no error object"));
      },
      stalled: () => addLog("EVENT stalled"),
      waiting: () => addLog("EVENT waiting"),
      abort: () => addLog("EVENT abort")
    };

    Object.entries(handlers).forEach(([ev, fn]) => a.addEventListener(ev, fn));
    addLog("Attached audio event listeners; src=" + a.src);

    return () => {
      Object.entries(handlers).forEach(([ev, fn]) => a.removeEventListener(ev, fn));
      addLog("Removed audio event listeners");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // cuando cambia la canción, actualizamos estado visible
  useEffect(() => {
    setIsPlaying(false);
    addLog("Cambio de canción a index " + current + " -> " + songs[current].src);
  }, [current]);

  const handleToggle = async () => {
    const a = audioRef.current;
    if (!a) {
      addLog("audioRef vacío al intentar toggle");
      return;
    }
    try {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
        addLog("Llamado a pause()");
      } else {
        addLog("Intentando play()...");
        await a.play();
        setIsPlaying(true);
        addLog("play() resolved -> playing");
      }
    } catch (err) {
      addLog("play() rechazado: " + (err && err.message ? err.message : JSON.stringify(err)));
    }
  };

  const handleNext = () => {
    setCurrent((p) => (p + 1) % songs.length);
  };

  const doFetchTest = async () => {
    const url = songs[current].src;
    addLog("Fetch test: " + url);
    try {
      const res = await fetch(url, { method: "GET", cache: "no-store" });
      setFetchStatus({ ok: res.ok, status: res.status, url: res.url });
      addLog(`Fetch result: ok=${res.ok} status=${res.status} url=${res.url}`);
    } catch (err) {
      setFetchStatus({ ok: false, error: err.message || String(err) });
      addLog("Fetch error: " + (err.message || String(err)));
    }
  };

  // helper para mostrar estado técnico del audio
  const audioState = () => {
    const a = audioRef.current;
    if (!a) return { readyState: "null", paused: "n/a", src: "n/a" };
    return { readyState: a.readyState, paused: a.paused, src: a.src, duration: a.duration || "NaN" };
  };

  return (
    <div style={{ padding: 12, fontFamily: "sans-serif" }}>
      <h3>Reproductor Debug</h3>

      <div style={{ marginBottom: 8 }}>
        <strong>{songs[current].artist} — {songs[current].title}</strong>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={handleNext}>⏭ Siguiente</button>
        <button onClick={handleToggle}>{isPlaying ? "❚❚ Pausar" : "▶ Play"}</button>
        <button onClick={doFetchTest}>🔎 TEST FETCH mp3</button>
        <button onClick={() => {
          const a = audioRef.current;
          if (!a) return addLog("audioRef vacío");
          addLog("readyState=" + a.readyState + " paused=" + a.paused + " src=" + a.src + " duration=" + a.duration);
        }}>Estado técnico</button>
      </div>

      <div style={{ marginBottom: 8 }}>
        <audio
          ref={audioRef}
          src={songs[current].src}
          preload="auto"
          onError={(e) => addLog("onError event fired")}
          onCanPlay={() => addLog("onCanPlay handler")}
          onLoadedMetadata={() => addLog("onLoadedMetadata handler")}
          onPlay={() => addLog("onPlay handler")}
          onPause={() => addLog("onPause handler")}
          onEnded={() => { addLog("onEnded handler"); setCurrent((p) => (p + 1) % songs.length); }}
          controls={false}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong>Estado fetch:</strong> {fetchStatus ? JSON.stringify(fetchStatus) : "—"}
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong>Estado audio:</strong>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(audioState(), null, 2)}</pre>
      </div>

      <div style={{ maxHeight: 220, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
        <strong>Logs (más recientes arriba)</strong>
        <ul style={{ paddingLeft: 18 }}>
          {logLines.map((l, i) => <li key={i} style={{ fontSize: 13 }}>{l}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: 10, fontSize: 13, color: "#666" }}>
        <p>Después de probar, pegá aquí lo que aparezca en la lista de logs (las primeras 10 líneas) y todo lo que salga en la consola (F12 → Console).</p>
        <p>Si el TEST FETCH devuelve `ok:false` o `status:404`, pegá esa info también.</p>
      </div>
    </div>
  );
}













