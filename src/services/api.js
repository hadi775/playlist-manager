import { API_BASE, GROUP_ID } from '../constants';

class ApiService {
  async fetchPlaylists() {
    try {
      const response = await fetch(`${API_BASE}/${GROUP_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle different response structures
      let playlists = [];
      if (Array.isArray(data)) {
        playlists = data;
      } else if (data.datas && Array.isArray(data.datas)) {
        playlists = data.datas;
      } else if (data.data && Array.isArray(data.data)) {
        playlists = data.data;
      }
      
      // Map API fields to component expected fields
      return playlists.map(playlist => ({
        id: playlist.id_play || playlist.id,
        play_name: playlist.play_name,
        play_url: playlist.play_url,
        play_thumbnail: playlist.play_thumbnail,
        play_genre: playlist.play_genre,
        play_description: playlist.play_description,
        created_at: playlist.created_at,
        updated_at: playlist.updated_at
      }));
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  }

  async createPlaylist(formData) {
    try {
      console.log('Creating playlist with data:', formData);
      
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataObj.append(key, formData[key]);
        }
      });

      console.log('FormData entries:');
      for (let [key, value] of formDataObj.entries()) {
        console.log(key, value);
      }

      const response = await fetch(`${API_BASE}/${GROUP_ID}`, {
        method: 'POST',
        body: formDataObj
      });

      console.log('Create response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create error:', response.status, errorText);
        throw new Error(`Failed to create playlist: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Create response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  }

  async updatePlaylist(id, formData) {
    try {
      console.log('Updating playlist:', id, 'with data:', formData);
      
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataObj.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_BASE}/update/${id}`, {
        method: 'POST',
        body: formDataObj
      });

      console.log('Update response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update error:', response.status, errorText);
        throw new Error(`Failed to update playlist: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Update response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  }

  async deletePlaylist(id) {
    try {
      console.log('Deleting playlist:', id);
      
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      console.log('Delete response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error:', response.status, errorText);
        throw new Error(`Failed to delete playlist: ${response.status} ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();