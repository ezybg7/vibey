import { FaTrash } from 'react-icons/fa';

interface SongProps {
  title: string;
  artists: string[];
  cover_art_url: string;
  playback_uri: string;
  onDelete?: () => void;
}

export default function Song({ title, artists, cover_art_url, playback_uri, onDelete }: SongProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click handlers
    onDelete?.();
  };

  return (
    <div className="flex items-center justify-between w-full max-w-sm bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-2 cursor-pointer group">
      <div className="flex items-center flex-1">
        {/* Cover Art */}
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={cover_art_url}
            alt={`${title} cover art`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Song Info */}
        <div className="ml-4 flex flex-col">
          <h3 className="text-white font-medium text-base truncate">{title}</h3>
          <p className="text-gray-400 text-sm truncate">
            {artists.join(', ')}
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <button 
        onClick={handleDelete}
        className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete song"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
}