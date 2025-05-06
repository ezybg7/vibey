'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";

// Song type definition
interface Song {
  title: string;
  artists: string[];
  cover_art_url: string;
  playback_uri: string;
}

// SongCard component with motion support
const SongCard = ({ song, isPlaying }) => {
  return (
    <div className="w-full h-full">
      <img
        src={song.cover_art_url}
        alt={song.title}
        draggable={false}
        className="w-full object-cover"
      />
      <div className="flex flex-row justify-between bg-gray-800 px-3 py-2">
        <div className="flex flex-col gap-1">
          <h6 className="font-bold text-lg text-white">{song.title}</h6>
          <div className="flex flex-row gap-1 items-center">
            {/* Using a music icon as a placeholder for Spotify icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="text-gray-400 w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-base text-gray-400">
              {song.artists.join(', ')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {isPlaying ? (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-4 bg-green-500 animate-pulse-slow"></div>
              <div className="w-1 h-6 bg-green-500 animate-pulse"></div>
              <div className="w-1 h-3 bg-green-500 animate-pulse-fast"></div>
            </div>
          ) : (
            <span className="text-gray-400">...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DiscoverPage() {
  const [songs, setSongs] = useState(songData);
  const [currentSong, setCurrentSong] = useState(songs.length > 0 ? songs[songs.length - 1] : null);
  const audioRef = useRef(null);

  // Update current song when songs change
  useEffect(() => {
    if (songs.length > 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(null);
    }
  }, [songs]);

  // Play current song audio
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      audioRef.current.src = currentSong.playback_uri;
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
    }
  }, [currentSong]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 p-4">
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} />
      
      <div className="relative h-96 w-72">
        {songs.map((song) => (
          <Card 
            key={song.title + song.artists.join()} 
            song={song} 
            songs={songs} 
            setSongs={setSongs} 
            isCurrentSong={currentSong === song}
          />
        ))}
      </div>
      
      {songs.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-gray-200">No more songs!</p>
          <button 
            onClick={() => setSongs(songData)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Reset Playlist
          </button>
        </div>
      )}
      
      <p className="mt-6 text-gray-400 text-center">
        Songs left: {songs.length}
      </p>
      
      {currentSong && (
        // <div className="mt-4 text-center text-gray-300">
        //   <p>Now playing: <span className="font-semibold">{currentSong.title}</span> by {currentSong.artists.join(', ')}</p>
        // </div>
        <AudioPlayer src={currentSong.playback_uri}/>
      )}
    </div>
  );
}

const Card = ({ song, songs, setSongs, isCurrentSong }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Check if this card is the top card (the one that should be interactive)
  const isTop = songs.indexOf(song) === songs.length - 1;

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setSongs((prevSongs) => prevSongs.filter((s) => s !== song));
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        zIndex: songs.indexOf(song),
      }}
    >
      <motion.div
        className="rounded-lg overflow-hidden shadow-lg cursor-grab active:cursor-grabbing"
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{
          x: isTop ? x : 0,
          rotate: isTop ? rotate : 0,
          opacity,
        }}
        animate={{
          scale: isTop ? 1 : 0.95 - (songs.length - 1 - songs.indexOf(song)) * 0.05,
          top: isTop ? 0 : (songs.length - 1 - songs.indexOf(song)) * 5,
          boxShadow: isTop
            ? "0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)"
            : "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <SongCard song={song} isPlaying={isCurrentSong && isTop} />
      </motion.div>
    </motion.div>
  );
};

// Sample song data
const songData = [
  {
    title: "Apple Pie",
    artists: ["Travis Scott"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  },
  {
    title: "Watermelon Sugar",
    artists: ["Harry Styles"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  },
  {
    title: "Blinding Lights",
    artists: ["The Weeknd"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  },
  {
    title: "Savage",
    artists: ["Megan Thee Stallion", "Beyoncé"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  },
  {
    title: "Circles",
    artists: ["Post Malone"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  },
  {
    title: "Don't Start Now",
    artists: ["Dua Lipa"],
    cover_art_url: "/Rodeo.png",
    playback_uri: "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
  }
];