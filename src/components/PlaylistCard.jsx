import React from 'react';
import { Edit, Trash2, ExternalLink, Star } from 'lucide-react';
import { GENRE_ICONS } from '../constants';

const PlaylistCard = ({ playlist, onEdit, onDelete }) => {
  const GenreIcon = GENRE_ICONS[playlist.play_genre] || Star;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-700">
        {playlist.play_thumbnail ? (
          <img
            src={playlist.play_thumbnail}
            alt={playlist.play_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMjAgODBMMTgwIDEyMEwxMjAgMTYwVjgwWiIgZmlsbD0iI0Y5NzMxNiIvPgo8L3N2Zz4=';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <GenreIcon size={32} className="text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            {playlist.play_url && (
              <a
                href={playlist.play_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <button
              onClick={() => onEdit(playlist)}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(playlist.id)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <GenreIcon size={14} className="text-orange-500" />
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {playlist.play_genre}
          </span>
        </div>
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
          {playlist.play_name || 'Untitled'}
        </h3>
        {playlist.play_description && (
          <p className="text-gray-400 text-xs line-clamp-2">
            {playlist.play_description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;