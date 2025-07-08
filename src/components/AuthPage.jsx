// src/components/AuthPage.jsx

import React, { useState } from 'react';
import { apiService } from '../services/api';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // <-- State baru
  const [name, setName] = useState('');   // <-- State baru
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await apiService.login(username, password);
        onLoginSuccess(data.access_token);
      } else {
        // Panggil register dengan parameter baru
        const data = await apiService.register(username, password, email, name);
        alert(data.msg);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? 'Login' : 'Buat Akun Baru'}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Tampilkan field nama dan email hanya saat registrasi */}
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Nama Lengkap
                </label>
                <input
                  type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 hover:underline">
            {isLogin ? 'Register di sini' : 'Login di sini'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;