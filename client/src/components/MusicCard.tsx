import { useRef, useState } from "react";

interface MusicCardProps {
  title: string;
  artist: string;
  cover: string;
  src: string;
}

export default function MusicCard({ title, artist, cover, src }: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

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

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (parseFloat(e.target.value) / 100) * audio.duration;
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audio) audio.volume = vol;
  };

  return (
    <div style={styles.container}>
      <img src={cover} alt={title} style={styles.cover} />
      <div style={styles.info}>
        <div style={styles.title}>{title}</div>
        <div style={styles.artist}>{artist}</div>
      </div>

      <div style={styles.controls}>
        <button onClick={togglePlay} style={styles.playBtn}>
          {playing ? "⏸" : "▶"}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onSeek}
          style={styles.progress}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={onVolumeChange}
          style={styles.volume}
        />
      </div>

      <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    bottom: 16,
    left: 16,
    right: 16,
    height: 72,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    gap: 12,
    zIndex: 9999,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 200,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "#ff7aa2",
    color: "#fff",
    cursor: "pointer",
  },
  progress: {
    flex: 1,
    cursor: "pointer",
  },
  volume: {
    width: 80,
    cursor: "pointer",
  },
};
