'use client';

import React, { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Hidden native controls; we’ll drive it ourselves. */}
      <audio ref={audioRef} src={src} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
