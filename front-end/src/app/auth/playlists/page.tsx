'use client';

import React, { useEffect, useState } from 'react';
import Song from '@/components/Song';
import MusicPlayer from '@/components/MusicPlayer';
import { Track } from '@/types/track';
import supabase from '@/api/supabaseClient';
import { ScaleLoader } from "react-spinners";

export default function Playlists() {
  const [songs, setSongs] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all liked songs on mount
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*');
      if (error) {
        console.error('Error fetching songs:', error);
      } else {
        setSongs(data);
      }
      setLoading(false);
    };
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <ScaleLoader size={150} color='#FFFFFF'/>
      </div>
    );
  }

  const handleSongSelect = (song: Track) => {
    setCurrentTrack(song);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const idx = songs.findIndex((s) => s.id === currentTrack.id);
    const next = songs[(idx + 1) % songs.length];
    setCurrentTrack(next);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const idx = songs.findIndex((s) => s.id === currentTrack.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setCurrentTrack(prev);
  };

  // ← Here’s the filled‑in delete handler
  const handleDeleteSong = async (songToDelete: Track) => {
    const { data, error } = await supabase
      .from('songs')
      .delete()
      .eq('id', songToDelete.id);

    if (error) {
      console.error('Error deleting song:', error);
      return;
    }

    // Remove from local state
    setSongs((prev) => prev.filter((s) => s.id !== songToDelete.id));

    // If that was the current track, clear it
    if (currentTrack?.id === songToDelete.id) {
      setCurrentTrack(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pr-96">
      <h1 className="text-2xl font-bold mb-6">Your Liked Songs</h1>

      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => handleSongSelect(song)}
            className="cursor-pointer"
          >
            <Song
              title={song.title}
              artists={song.artists}
              cover_art_url={song.cover_art_url}
              playback_uri={song.playback_uri}
              onDelete={() => handleDeleteSong(song)}
            />
          </div>
        ))}
      </div>

      <MusicPlayer
        currentTrack={currentTrack}
        playlist={songs}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />
    </div>
  );
}
