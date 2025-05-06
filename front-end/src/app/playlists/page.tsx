'use client';

import { useEffect, useState } from 'react';
import Song from '@/components/Song';
import MusicPlayer from '@/components/MusicPlayer';
import { Track } from '@/types/track';

const EXAMPLE_SONGS: Track[] = [
	{
		id: '1',
		title: 'Apple Pie',
		artists: ['Travis Scott'],
		cover_art_url: 'https://example.com/covers/apple_pie.png',
		playback_uri: 'https://example.com/audio/apple_pie.mp3',
	},
	{
		id: '2',
		title: 'River Flows In You',
		artists: ['Yiruma'],
		cover_art_url: 'https://example.com/covers/river_flows.png',
		playback_uri: 'https://example.com/audio/river_flows.mp3',
	},
	{
		id: '3',
		title: 'Dreams',
		artists: ['Fleetwood Mac'],
		cover_art_url: 'https://example.com/covers/dreams.png',
		playback_uri: 'https://example.com/audio/dreams.mp3',
	},
	{
		id: '4',
		title: 'Blinding Lights',
		artists: ['The Weeknd'],
		cover_art_url: 'https://example.com/covers/blinding_lights.png',
		playback_uri: 'https://example.com/audio/blinding_lights.mp3',
	},
	{
		id: '5',
		title: 'Bad Guy',
		artists: ['Billie Eilish'],
		cover_art_url: 'https://example.com/covers/bad_guy.png',
		playback_uri: 'https://example.com/audio/bad_guy.mp3',
	},
	{
		id: '6',
		title: 'Bohemian Rhapsody',
		artists: ['Queen'],
		cover_art_url: 'https://example.com/covers/bohemian_rhapsody.png',
		playback_uri: 'https://example.com/audio/bohemian_rhapsody.mp3',
	},
	{
		id: '7',
		title: 'Stronger',
		artists: ['Kanye West'],
		cover_art_url: 'https://example.com/covers/stronger.png',
		playback_uri: 'https://example.com/audio/stronger.mp3',
	},
	{
		id: '8',
		title: 'Bad Romance',
		artists: ['Lady Gaga'],
		cover_art_url: 'https://example.com/covers/bad_romance.png',
		playback_uri: 'https://example.com/audio/bad_romance.mp3',
	},
	{
		id: '9',
		title: 'Sweet Child O Mine',
		artists: ['Guns N Roses'],
		cover_art_url: 'https://example.com/covers/sweet_child.png',
		playback_uri: 'https://example.com/audio/sweet_child.mp3',
	},
	{
		id: '10',
		title: 'Lose Yourself',
		artists: ['Eminem'],
		cover_art_url: 'https://example.com/covers/lose_yourself.png',
		playback_uri: 'https://example.com/audio/lose_yourself.mp3',
	},
];

export default function Playlists() {
	const [songs, setSongs] = useState<Track[]>([]);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await fetch('http://localhost:8000/get-songs');
				if (!response.ok) {
					throw new Error('Failed to fetch songs');
				}
				const data = await response.json();
				setSongs(data);
			} catch (err) {
				console.warn('Failed to fetch songs, using example playlist instead');
				setSongs(EXAMPLE_SONGS);
			} finally {
				setLoading(false);
			}
		};

		fetchSongs();
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
			<h1 className="text-2xl font-bold mb-6">Your Playlists</h1>
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