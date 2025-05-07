'use client';

import { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyProfile = async () => {
      const token = localStorage.getItem('spotify_token');

      if (!token) {
        alert('No Spotify token found. Please log in.');
        return;
      }

      try {
        const res = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center text-white bg-black">
        <h1>Loading profile…</h1>
      </div>
    );
  }

  if (!profile || profile.error) {
    return (
      <div className="flex h-screen justify-center items-center text-white bg-black">
        <h1>Could not load profile.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-[#181818] p-8 rounded-2xl max-w-md w-full shadow-xl text-center">
        {profile.images?.[0]?.url && (
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border border-[#1DB954]"
          />
        )}

        <h1 className="text-2xl font-bold">{profile.display_name}</h1>
        <p className="text-sm text-gray-400">{profile.email}</p>
        <p className="text-sm text-gray-400 mt-1">
          Country: {profile.country}
        </p>
        <p className="text-sm text-gray-400">Spotify ID: {profile.id}</p>

        <a
          href={profile.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-[#1DB954] hover:underline"
        >
          View on Spotify
        </a>
      </div>
    </div>
  );
}
