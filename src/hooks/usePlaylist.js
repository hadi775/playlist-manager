import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { INITIAL_FORM_DATA } from '../constants';

export const usePlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const data = await apiService.fetchPlaylists();
      setPlaylists(data);
      showMessage('success', `${data.length} playlists loaded successfully!`);
    } catch (error) {
      showMessage('error', 'Failed to load playlists. Please try again.');
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async () => {
    if (!formData.play_name.trim()) {
      showMessage('error', 'Playlist name is required');
      return;
    }

    setLoading(true);
    try {
      await apiService.createPlaylist(formData);
      showMessage('success', 'Playlist created successfully!');
      resetForm();
      setTimeout(() => {
        fetchPlaylists();
      }, 500);
    } catch (error) {
      showMessage('error', `Failed to create playlist: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updatePlaylist = async () => {
    if (!formData.play_name.trim()) {
      showMessage('error', 'Playlist name is required');
      return;
    }

    setLoading(true);
    try {
      await apiService.updatePlaylist(editingPlaylist.id, formData);
      showMessage('success', 'Playlist updated successfully!');
      resetForm();
      setTimeout(() => {
        fetchPlaylists();
      }, 500);
    } catch (error) {
      showMessage('error', `Failed to update playlist: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = async (id) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) return;
    
    setLoading(true);
    try {
      await apiService.deletePlaylist(id);
      showMessage('success', 'Playlist deleted successfully!');
      setTimeout(() => {
        fetchPlaylists();
      }, 500);
    } catch (error) {
      showMessage('error', `Failed to delete playlist: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setShowForm(false);
    setEditingPlaylist(null);
  };

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      play_name: playlist.play_name || '',
      play_url: playlist.play_url || '',
      play_thumbnail: playlist.play_thumbnail || '',
      play_genre: playlist.play_genre || 'music',
      play_description: playlist.play_description || ''
    });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editingPlaylist) {
      updatePlaylist();
    } else {
      createPlaylist();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return {
    playlists,
    loading,
    showForm,
    setShowForm,
    editingPlaylist,
    formData,
    message,
    fetchPlaylists,
    resetForm,
    handleEdit,
    handleSubmit,
    handleInputChange,
    deletePlaylist
  };
};