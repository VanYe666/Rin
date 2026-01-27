import { useRef, useState } from "react";

interface MusicCardProps {
  title: string;
  artist: string;
  cover: string;
  src: string;
}

export default function MusicCard({
  title,
  artist,
  cover,
  src,
}: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  return (
    <div style={styles.card}>
      <div
        style={{
          ...styles.cover,
          backgroundImage: `url(${cover})`,
        }}
      />
      <div style={styles.info}>
        <div style={styles.title}>{title}</div>
        <div style={styles.artist}>{artist}</div>
      </div>
      <div style={styles.controls}>
        <button style={styles.button} onClick={togglePlay}>
          {playing ? "⏸" : "▶"}
        </button>
        <div style={styles.bar}>
          <div style={{ ...styles.barFill, width: `${progress}%` }} />
        </div>
      </div>
      <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    alignItems: "center",
    height: 83,
    padding: "10px 14px",
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,.08)",
    gap: 12,
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  artist: {
    fontSize: 12,
    color: "#888",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "#ff7aa2",
    color: "#fff",
    cursor: "pointer",
  },
  bar: {
    width: 80,
    height: 4,
    background: "#eee",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "#ff7aa2",
  },
};
