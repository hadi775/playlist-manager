// src/services/api.js

import { API_BASE } from '../constants';

class ApiService {
    constructor() {
        this.isRefreshing = false;
        this.failedQueue = [];
    }

    processQueue = (error, token = null) => {
        this.failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        this.failedQueue = [];
    };

    // Helper fetch utama yang dimodifikasi
    async _fetch(url, options = {}) {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE}${url}`, { ...options, headers });

            // Jika token kedaluwarsa (error 401)
            if (response.status === 401) {
                if (!this.isRefreshing) {
                    this.isRefreshing = true;
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (!refreshToken) throw new Error("Sesi berakhir. Silakan login kembali.");

                    try {
                        // Minta access token baru
                        const refreshResponse = await fetch(`${API_BASE}/refresh`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${refreshToken}`,
                            },
                        });

                        if (!refreshResponse.ok) throw new Error("Sesi berakhir. Silakan login kembali.");

                        const { access_token } = await refreshResponse.json();
                        localStorage.setItem('access_token', access_token);
                        this.isRefreshing = false;

                        // Ulangi request yang gagal dengan token baru
                        return this._fetch(url, options); 
                    } catch (e) {
                        this.isRefreshing = false;
                        // Jika refresh gagal, logout
                        localStorage.clear();
                        window.location.href = '/';
                        throw e;
                    }
                }
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ msg: 'Error tidak diketahui' }));
                throw new Error(errorData.msg || `Request gagal dengan status ${response.status}`);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    // --- Metode Otentikasi ---
    async login(username, password) {
        // Simpan kedua token saat login
        const data = await this._fetch('/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        if (data.access_token && data.refresh_token) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
        }
        return data;
    }

  async register(username, password, email, name) {
  return this._fetch('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email, name }),
  });
}

  // --- Metode Playlist (Sekarang menggunakan token) ---
  async fetchPlaylists() {
    return this._fetch('/playlists');
  }

  async createPlaylist(formData) {
    return this._fetch('/playlists', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async updatePlaylist(id, formData) {
    return this._fetch(`/playlists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });
  }

  async deletePlaylist(id) {
    return this._fetch(`/playlists/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();