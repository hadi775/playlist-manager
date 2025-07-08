// src/App.jsx

import React, { useState, useEffect } from 'react';
import PlaylistApp from './components/PlaylistApp';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';

const App = () => {
  // State tunggal untuk menentukan apakah pengguna sudah login atau belum.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State untuk mengontrol tampilan antara landing dan halaman auth.
  const [showAuthPage, setShowAuthPage] = useState(false);

  // useEffect ini akan berjalan setiap kali aplikasi dimuat untuk mengecek sesi login.
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      console.log("Token ditemukan, pengguna dianggap sudah login.");
      setIsAuthenticated(true);
    } else {
      console.log("Token tidak ditemukan.");
    }
  }, []);

  // Fungsi ini dipanggil dari LandingPage
  const handleGetStarted = () => {
    setShowAuthPage(true);
  };

  // Fungsi ini dipanggil dari AuthPage setelah login berhasil
  const handleLoginSuccess = () => {
    console.log("Login berhasil! Mengatur state isAuthenticated menjadi true.");
    setIsAuthenticated(true);
    setShowAuthPage(false); // Sembunyikan halaman auth
  };

  // Fungsi ini dipanggil dari PlaylistApp
  const handleLogout = () => {
    console.log("Logout! Menghapus token dan state.");
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setShowAuthPage(false); // Kembali ke landing page
  };

  // --- Logika Rendering ---
  // Ini adalah bagian terpenting.

  // 1. Jika pengguna sudah diautentikasi (login berhasil atau sesi masih ada)
  if (isAuthenticated) {
    console.log("Rendering: PlaylistApp");
    return <PlaylistApp onLogout={handleLogout} />;
  }

  // 2. Jika pengguna belum login DAN sudah menekan "Get Started"
  if (showAuthPage) {
    console.log("Rendering: AuthPage");
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. Kondisi default (pengguna belum login dan masih di landing page)
  console.log("Rendering: LandingPage");
  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default App;