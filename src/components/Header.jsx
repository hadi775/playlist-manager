import React from 'react';
import { Plus, RefreshCw, Home, LogOut } from 'lucide-react';

// const Header = ({ loading, onRefresh, onAddPlaylist, onBackToLanding }) => {
  const Header = ({ loading, onRefresh, onAddPlaylist, onLogout }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            title="Back to Landing Page"
          >
            <Home size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Your Playlist</h1>
            <p className="text-gray-400">Manage your entertainment collection</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={onAddPlaylist}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Playlist
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            title="Logout"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;