'use client';

import { useEffect, useState } from 'react';
import Song from '@/components/Song';
import MusicPlayer from '@/components/MusicPlayer';
import { Track } from '@/types/track';
import supabase from '@/api/supabaseClient';


export default function Playlists() {
	const [songs, setSongs] = useState<Track[]>([]);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSongs = async () => {
			const { data, error } = await supabase
				.from('songs')
				.select('*');
			if (error) {
				setLoading(false);
				console.log(error);
			} else {
				setSongs(data);
			}
		};

		fetchSongs();
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
				<p>Loading songs...</p>
			</div>
		);
	}

	const handleSongSelect = (song: Track) => {
		setCurrentTrack(song);
	};

	const handleNextTrack = () => {
		if (!currentTrack) return;
		const currentIndex = songs.findIndex(song => song.title === currentTrack.title);
		const nextIndex = (currentIndex + 1) % songs.length;
		setCurrentTrack(songs[nextIndex]);
	};

	const handlePrevTrack = () => {
		if (!currentTrack) return;
		const currentIndex = songs.findIndex(song => song.title === currentTrack.title);
		const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
		setCurrentTrack(songs[prevIndex]);
	};

	const handleDeleteSong = async (song: Track) => {
		try {
			const response = await fetch(`http://localhost:8000/delete-song/${song.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete song');
			}

			// Remove song from local state
			setSongs(currentSongs => currentSongs.filter(s => s.title !== song.title));
		} catch (error) {
			console.error('Error deleting song:', error);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 text-white p-8 pr-96">
			<h1 className="text-2xl font-bold mb-6">Your Liked Songs</h1>
			<div className="grid grid-cols-2 gap-4 max-w-4xl">
				{songs.map((song, index) => (
					<div
						key={index}
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