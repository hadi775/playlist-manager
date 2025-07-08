import React from 'react';
import { RefreshCw, Music } from 'lucide-react';
import PlaylistCard from './PlaylistCard';

const PlaylistGrid = ({ 
  loading, 
  playlists, 
  filteredPlaylists, 
  activeNav, 
  onEdit, 
  onDelete 
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="animate-spin mx-auto mb-4 text-orange-500" size={48} />
        <p className="text-gray-400">Loading playlists...</p>
      </div>
    );
  }

  if (filteredPlaylists.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="mx-auto mb-4 text-gray-600" size={64} />
        <p className="text-gray-400 text-lg">No playlists found</p>
        <p className="text-gray-500 text-sm">
          {playlists.length === 0 
            ? "Create your first playlist to get started!" 
            : `No playlists match the current filter (${activeNav})`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredPlaylists.map((playlist) => (
        <PlaylistCard 
          key={playlist.id}
          playlist={playlist}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;