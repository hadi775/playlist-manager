import React, { useState } from 'react'
import PlaylistApp from './components/PlaylistApp'
import LandingPage from './components/LandingPage'

function App() {
  const [showApp, setShowApp] = useState(false);

  const handleGetStarted = () => {
    setShowApp(true);
  };

  const handleBackToLanding = () => {
    setShowApp(false);
  };

  if (!showApp) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return <PlaylistApp onBackToLanding={handleBackToLanding} />
}

export default App