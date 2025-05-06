'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/playlists');
  };

  const handleSignup = () => {
    router.push('/playlists');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 flex flex-col gap-4 w-full max-w-xs">
        <button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>
        <button 
          className="w-full bg-transparent hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg border-2 border-white transition-colors backdrop-blur-sm"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
