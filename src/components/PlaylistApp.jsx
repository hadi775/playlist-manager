import React, { useState } from 'react';
import { usePlaylist } from '../hooks/usePlaylist';
import Sidebar from './Sidebar';
import Header from './Header';
import PlaylistForm from './PlaylistForm';
import PlaylistGrid from './PlaylistGrid';
import FloatingButton from './FloatingButton';

const PlaylistApp = ({ onBackToLanding }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('all');

  const {
    playlists,
    loading,
    showForm,
    setShowForm,
    editingPlaylist,
    formData,
    fetchPlaylists,
    resetForm,
    handleEdit,
    handleSubmit,
    handleInputChange,
    deletePlaylist
  } = usePlaylist();

  const filteredPlaylists = playlists.filter(playlist => {
    if (activeNav === 'all') return true;
    if (activeNav === 'songs') return playlist.play_genre === 'music' || playlist.play_genre === 'song';
    if (activeNav === 'video') return playlist.play_genre === 'movie';
    if (activeNav === 'movie') return playlist.play_genre === 'movie';
    if (activeNav === 'education') return playlist.play_genre === 'education';
    if (activeNav === 'others') return playlist.play_genre === 'others';
    return true;
  });

  const handleRefresh = () => {
    fetchPlaylists();
  };

  const handleAddPlaylist = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          loading={loading}
          onRefresh={handleRefresh}
          onAddPlaylist={handleAddPlaylist}
          onBackToLanding={onBackToLanding}
        />

        <main className="flex-1 overflow-auto p-6">
          <PlaylistForm 
            showForm={showForm}
            editingPlaylist={editingPlaylist}
            formData={formData}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            onInputChange={handleInputChange}
          />

          <PlaylistGrid 
            loading={loading && !showForm}
            playlists={playlists}
            filteredPlaylists={filteredPlaylists}
            activeNav={activeNav}
            onEdit={handleEdit}
            onDelete={deletePlaylist}
          />

          <FloatingButton onClick={() => setShowForm(true)} />
        </main>
      </div>
    </div>
  );
};

export default PlaylistApp;