'use client';

import { useState, useRef, useEffect } from 'react';

// Data playlist awal
const initialPlaylistSongs = [
  {
    id: 1,
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    image: "images/cover1.jpeg",
    audioUrl: "/audio/song1.mp3",
    duration: "3:40"
  },
  {
    id: 2,
    title: "Stand By Me",
    artist: "Oasis",
    image: "images/cover2.jpeg",
    audioUrl: "/audio/song2.mp3",
    duration: "5:57",
    volume: 50
  },
  {
    id: 3,
    title: "Just You",
    artist: "Teddy Adhitya",
    image: "images/cover3.jpeg",
    audioUrl: "/audio/song3.mp3",
    duration: "3:01"
  }
];


export default function Playlist() {
  const [playlistSongs, setPlaylistSongs] = useState(initialPlaylistSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playlistSongs[currentSongIndex];

  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = playlistSongs[index].audioUrl;
      audioRef.current
        .play()
        .catch((e) => {
          console.log('Autoplay error:', e);
        });
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % playlistSongs.length;
    playSong(nextIndex);
  };

  const playPrev = () => {
    const prevIndex = (currentSongIndex - 1 + playlistSongs.length) % playlistSongs.length;
    playSong(prevIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => playNext();
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDurationSeconds(audio.duration || 0);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, playlistSongs]);

  useEffect(() => {
    // keep play/pause state in sync with audio element
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const styles = `
    /* Reset dan base styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .container {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      color: #00FF9C;
      text-align: center;
    }
    
    .playlist-section {
      background: linear-gradient(135deg, #1a1a1a 0%, #121212 100%);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    .playlist-header {
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .playlist-section-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }
    
    .playlist-section-subtitle {
      color: #b3b3b3;
      font-size: 0.9rem;
    }
    
    /* 3 Cards Container - Responsive Grid */
    .three-cards-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1 rem;
      margin-bottom: 1.5rem;
    }
    
    /* Spotify Card */
    .spotify-card {
      background: #181818;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 200px;
    }
    
    .spotify-card:hover {
      background: #282828;
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }
    
    .spotify-card.playing {
      outline: 2px solid #1DB954;
      box-shadow: 0 0 0 1px #1DB954;
    }
    
    .card-image-container {
      position: relative;
      width: 100%;
      padding-top: 20%; /* 1:1 Aspect Ratio */
      overflow: hidden;
    }
    
    .card-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .play-button {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      background: #00FF9C;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .spotify-card:hover .play-button {
      opacity: 1;
      transform: translateY(0);
    }
    
    .play-button i {
      color: white;
      font-size: 0.9rem;
      margin-left: 2px;
    }
    
    .remove-song-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.8rem;
      height: 1.8rem;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      color: white;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
      z-index: 10;
      font-size: 0.8rem;
    }
    
    .spotify-card:hover .remove-song-btn {
      opacity: 1;
    }
    
    .card-content {
      padding: 0.8rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .card-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.3rem;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .card-artist {
      font-size: 0.75rem;
      color: #b3b3b3;
      margin-bottom: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .card-tracks {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      color: #888;
    }
    
    .no-songs-msg {
      text-align: center;
      color: #b3b3b3;
      font-size: 0.85rem;
      padding: 0.5rem;
    }
    
    /* Song Info */
    .song-info {
      border-radius: 12px;
      padding: 1.2rem;
      margin-top: 1.5rem;
    }

    /* Spotify Player Style */
    .spotify-player {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .player-album-art {
      width: 70px;
      height: 70px;
      border-radius: 6px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .player-song-info {
      text-align: center;
      flex-grow: 1;
    }

    .player-song-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.2rem;
    }

    .player-song-artist {
      font-size: 0.8rem;
      color: #b3b3b3;
    }

    .player-progress-container {
      width: 100%;
      margin: 0.8rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .player-progress-time {
      font-size: 0.75rem;
      color: #b3b3b3;
      min-width: 28px;
      text-align: center;
    }

    .player-progress-bar {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: #4a4a4a;
      cursor: pointer;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }

    .player-progress-bar::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #1DB954;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .player-progress-bar::-moz-range-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #1DB954;
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .player-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .player-control-btn {
      background: none;
      border: none;
      color: #b3b3b3;
      font-size: 1rem;
      cursor: pointer;
      transition: color 200ms ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .player-control-btn:hover {
      color: white;
    }

    .player-play-btn {
      background: transparent;
      color: white;
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
    }

    .player-play-btn:hover {
      background: rgba(29, 185, 84, 0.15);
      transform: scale(1.05);
    }
    
    /* Audio Element (Hidden) */
    .hidden-audio {
      display: none;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .container {
        padding: 0.8rem;
      }
      
      .section-title {
        font-size: 1.5rem;
      }
      
      .playlist-section {
        padding: 1rem;
      }
      
      .three-cards-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.6rem;
      }
      
      .spotify-card {
        min-height: 130px;
      }
      
      .card-content {
        padding: 0.6rem;
      }
      
      .card-title {
        font-size: 0.8rem;
        -webkit-line-clamp: 1;
      }
      
      .card-artist {
        font-size: 0.7rem;
      }
      
      .card-tracks {
        font-size: 0.65rem;
      }
      
      .play-button {
        width: 2rem;
        height: 2rem;
        bottom: 0.4rem;
        right: 0.4rem;
      }
      
      .play-button i {
        font-size: 0.7rem;
      }
      
      .remove-song-btn {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.7rem;
      }
      
      .playlist-controls {
        gap: 0.5rem;
      }
      
      .control-btn {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
      
      .play-btn {
        padding: 0.5rem 1.2rem;
      }
    }
    
    @media (max-width: 480px) {
      .three-cards-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }
      
      .spotify-card {
        min-height: 140px;
      }
      
      .card-title {
        font-size: 0.75rem;
      }
      
      .card-artist, .card-tracks {
        font-size: 0.65rem;
      }
      
      .playlist-controls {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .control-btn {
        padding: 0.4rem 0.7rem;
        font-size: 0.75rem;
      }
      
      .play-btn {
        padding: 0.4rem 1rem;
      }
      
      .section-title {
        font-size: 1.3rem;
      }
    }
    
    @media (max-width: 360px) {
      .three-cards-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.4rem;
      }
      
      .spotify-card {
        min-height: 130px;
      }
      
      .card-content {
        padding: 0.5rem;
      }
      
      .card-title {
        font-size: 0.7rem;
      }
    }
  `;

  return (
    <>
      <style jsx global>{styles}</style>
      <section id="playlist" className="container">
        <h2 className="section-title">My Favorit Playlist</h2>
        <div className="playlist-section">
          <div className="playlist-header">
            <h3 className="playlist-section-title">A song that reminds me of you</h3>
          </div>
          

          

          {/* 3 Card Playlist */}
          <div className="three-cards-container">
            {playlistSongs.slice(0, 3).map((song, index) => (
              <div 
                key={song.id}
                className={`spotify-card ${currentSongIndex === index ? 'playing' : ''}`}
                onClick={() => playSong(index)}
              >
                <div className="card-image-container">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="card-image"
                  />
                  <div className="play-button">
                    <i className={`fas ${currentSongIndex === index && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                  </div>
                </div>
                <div className="card-content">
                  <h4 className="card-title">{song.title}</h4>
                  <p className="card-artist">{song.artist}</p>
                  <div className="card-tracks">
                    <i className="fas fa-music"></i>
                    <span>{song.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
          {/* Informasi lagu */}
          <div className="song-info">
            {currentSong ? (
              <div className="spotify-player">
                {/* Album Art */}
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="player-album-art"
                />

                {/* Song Info & Controls */}
                <div style={{ flex: 1 }}>
                  <div className="player-song-info">
                    <div className="player-song-title">{currentSong.title}</div>
                    <div className="player-song-artist">{currentSong.artist}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="player-progress-container">
                    <span className="player-progress-time">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={Math.max(1, durationSeconds)}
                      value={Math.min(currentTime, durationSeconds || 0)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCurrentTime(val);
                        if (audioRef.current) audioRef.current.currentTime = val;
                      }}
                      className="player-progress-bar"
                      aria-label="progress"
                    />
                    <span className="player-progress-time">{formatTime(durationSeconds)}</span>
                  </div>

                  {/* Controls */}
                  <div className="player-controls">
                    <button
                      className="player-control-btn"
                      onClick={playPrev}
                      title="Previous"
                    >
                      <i className="fas fa-step-backward"></i>
                    </button>

                    <button
                      className="player-play-btn"
                      onClick={togglePlayPause}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>

                    <button
                      className="player-control-btn"
                      onClick={playNext}
                      title="Next"
                    >
                      <i className="fas fa-step-forward"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-songs-msg">Tidak ada lagu</div>
            )}
          </div>

          {/* Hidden audio element */}
          <audio ref={audioRef} className="hidden-audio" preload="metadata">
            <source src={currentSong?.audioUrl} />
          </audio>
        </div>
      </section>
    </>
  );
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  const m = Math.floor(seconds / 60);
  return `${m}:${s}`;
}