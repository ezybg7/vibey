'use client';

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  AnimatePresence,
} from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";
import supabase from '@/api/supabaseClient';
import { FaPlay } from "react-icons/fa";

// Song type definition
interface Song {
  title: string;
  artists: string[];
  cover_art_url: string;
  playback_uri: string;
}

interface CardProps {
  song: Song;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  isCurrentSong: boolean;
  onSwipeRight?: (song: Song) => void;
}

export default function DiscoverPage() {
  const [songs, setSongs] = useState<Song[]>(songData);
  const [currentSong, setCurrentSong] = useState<Song | null>(
    songs.length > 0 ? songs[songs.length - 1] : null
  );

    useEffect(() => {
        // call backend end point for songs here
        
    }, [])

    // Update currentSong whenever the songs stack changes
    useEffect(() => {
        setCurrentSong(songs.length > 0 ? songs[songs.length - 1] : null);
    }, [songs]);

    const handleSwipeRight = (song: Song) => {
        const addSong = async () => {
            const { data, error } = await supabase
                .from('songs')
                .insert([song])
                .select()
            if (error) {
                console.log(error);
            }
        };
        addSong();
    };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 p-4">
      <div className="relative h-96 w-72">
        <AnimatePresence>
          {songs.map((song, index) => (
            <Card
              key={index}
              song={song}
              songs={songs}
              setSongs={setSongs}
              isCurrentSong={currentSong === song}
              onSwipeRight={(song) => {handleSwipeRight(song)}}
            />
          ))}
        </AnimatePresence>
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

      {/* <p className="mt-6 text-gray-400 text-center">
        Songs left: {songs.length}
      </p> */}

      {currentSong && (
        <AudioPlayer
          key={currentSong.playback_uri} // force remount on src change
          src={currentSong.playback_uri}
        />
      )}
    </div>
  );
}

const Card: React.FC<CardProps> = ({
  song,
  songs,
  setSongs,
  isCurrentSong,
  onSwipeRight,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);
  const opacity = useTransform(
    x,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  const isTop = songs.indexOf(song) === songs.length - 1;

  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setSongs((prev) => prev.filter((s) => s !== song));
      const x = info.offset.x;
     if (x > 100) {
        // → right swipe
        onSwipeRight?.(song);
        setSongs((prev) => prev.filter((s) => s !== song));
        } 
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: songs.indexOf(song) }}
      initial={false}
      animate={{
        scale: isTop ? 1 : 0.95 - (songs.length - 1 - songs.indexOf(song)) * 0.05,
        top: isTop ? 0 : (songs.length - 1 - songs.indexOf(song)) * 5,
        boxShadow: isTop
          ? "0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)"
          : "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-lg overflow-hidden shadow-lg cursor-grab active:cursor-grabbing"
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        style={{
          x: isTop ? x : 0,
          rotate: isTop ? rotate : 0,
          opacity,
        }}
      >
        <SongCard song={song} isPlaying={isCurrentSong && isTop} />
      </motion.div>
    </motion.div>
  );
};

// Sample song data
const songData: Song[] = [
  {
    title: "Apple Pie",
    artists: ["Travis Scott"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs/Apple%20Pie.mp3",
  },
  {
    title: "Watermelon Sugar",
    artists: ["Harry Styles"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs/Apple%20Pie.mp3",
  },
  {
    title: "Blinding Lights",
    artists: ["The Weeknd"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs/Apple%20Pie.mp3",
  },
  {
    title: "Flashing Lights",
    artists: ["Kanye West"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Flashing%20Lights.mp3",
  },
  {
    title: "Dark Thoughts",
    artists: ["Lil Tecca"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs//Lil%20Tecca%20-%20Dark%20Thoughts%20(Official%20Audio).mp3",
  },
  {
    title: "Apple Pie",
    artists: ["Travis Scott"],
    cover_art_url: "/Rodeo.png",
    playback_uri:
      "https://xenarhixlsbkqthvbcbt.supabase.co/storage/v1/object/public/songs/Apple%20Pie.mp3",
  },
];

// ---- SongCard stays exactly as you had it ----
interface SongCardProps {
  song: Song;
  isPlaying: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, isPlaying }) => (
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2
                 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2
                 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <p className="text-base text-gray-400">
            {song.artists.join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {isPlaying ? (
          <div className="flex items-center space-x-1">
            <div className="w-1 h-4 bg-green-500 animate-pulse-slow" />
            <div className="w-1 h-6 bg-green-500 animate-pulse" />
            <div className="w-1 h-3 bg-green-500 animate-pulse-fast" />
          </div>
        ) : (
          <span className="text-gray-400">...</span>
        )}
      </div>
    </div>
  </div>
);
