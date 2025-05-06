import { useState, useRef, useEffect } from 'react';
import { Track } from '@/types/track';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward, 
  FaRandom, 
  FaRedoAlt 
} from 'react-icons/fa';

interface MusicPlayerProps {
  currentTrack: Track | null;
  playlist: Track[];
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

export default function MusicPlayer({ currentTrack, playlist, onNextTrack, onPrevTrack }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnd);
      return () => {
        audioRef.current?.removeEventListener('ended', handleTrackEnd);
      };
    }
  }, [isLooping]);

  const handleTrackEnd = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      onNextTrack();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = Number(e.target.value);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-black/30 backdrop-blur-lg p-6 flex flex-col gap-6">
      {currentTrack ? (
        <>
          <div className="aspect-square w-full rounded-lg overflow-hidden">
            <img
              src={currentTrack.cover_art_url}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artists.join(', ')}</p>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setIsShuffling(!isShuffling)}
              className={`p-2 rounded-full ${isShuffling ? 'bg-purple-600' : 'hover:bg-white/10'}`}
            >
              <FaRandom className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onPrevTrack} 
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <FaStepBackward className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={togglePlay} 
              className="p-2 hover:bg-white/10 rounded-full"
            >
              {isPlaying ? 
                <FaPause className="w-5 h-5 text-white" /> : 
                <FaPlay className="w-5 h-5 text-white" />
              }
            </button>
            <button 
              onClick={onNextTrack} 
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <FaStepForward className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-full ${isLooping ? 'bg-purple-600' : 'hover:bg-white/10'}`}
            >
              <FaRedoAlt className="w-5 h-5 text-white" />
            </button>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.playback_uri}
            onTimeUpdate={handleTimeUpdate}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No track selected</p>
        </div>
      )}
    </div>
  );
}