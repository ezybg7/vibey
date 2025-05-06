// components/AudioPlayer.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from "react-icons/fa";

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Whenever `src` changes, swap the track and auto‑play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = src;
    audio.loop = true;
    // play() returns a promise
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error('Audio playback failed:', err);
        setIsPlaying(false);
      });
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Play failed:', err));
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      <audio ref={audioRef} preload="auto" />
      <button
        onClick={togglePlay}
        className="px-4 py-4 flex justify-center items-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        {isPlaying ? (
          <FaPause size={32} className='text-white'/>
        ) : (
          <FaPlay size={32} className='text-white'/>
        )}
      </button>
    </div>
  );
}
