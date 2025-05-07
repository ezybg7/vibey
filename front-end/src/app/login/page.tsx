'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SpotifyLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const clientId = 'b45016ff4113430eb5884cfe1366133e';
  const clientSecret = '67bc9e43910d4b3388547085676bfa00';
  const redirectUri = 'http://127.0.0.1:3000/login';

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setLoading(true);
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const loginWithSpotify = () => {
    const scope = [
      'user-read-email',
      'user-read-private',
      'playlist-read-private',
      'user-top-read',
    ].join(' ');

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', scope);

    window.location.href = authUrl.toString();
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const body = new URLSearchParams();
      body.append('grant_type', 'authorization_code');
      body.append('code', code);
      body.append('redirect_uri', redirectUri);
      body.append('client_id', clientId);
      body.append('client_secret', clientSecret);

      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const data = await res.json();
      console.log('Token response:', data);

      if (data.access_token) {
        localStorage.setItem('spotify_token', data.access_token);
        router.push('/auth/discover');
      } else {
        alert('Spotify login failed');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full bg-gradient-to-br from-[#121212] via-[#1DB954] to-black flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-md bg-[#181818] rounded-2xl shadow-2xl p-8 text-white backdrop-blur-lg border border-[#2a2a2a]"
      >
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome to Vibey</h1>
          <p className="text-sm text-[#bbbbbb]">
            Log in to explore your Spotify insights and playlists.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={loginWithSpotify}
          disabled={loading}
          className="mt-6 w-full bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-200 text-black font-semibold py-3 rounded-full shadow-lg disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Continue with Spotify'}
        </motion.button>

        <p className="mt-6 text-xs text-center text-gray-500">
          By continuing, you agree to Spotify’s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </motion.div>
  );
}
