import React, { useState, useEffect, useRef } from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  const videos = ['/videos/1.mp4', '/videos/2.mp4'];
  
  // Playback speeds for overlay videos
  const videoSpeeds = [0.3, 0.2]; // 30% for video 1, 20% for video 2

  // Randomly select initial video on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideoIndex(randomIndex);
  }, []);

  // Set playback speed when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeeds[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  // Set background video speed on mount
  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.playbackRate = 0.1; // 10% speed for video 3
    }
  }, []);

  // Handle video end event - fade to next video
  const handleVideoEnded = () => {
    console.log(`Video ${currentVideoIndex + 1} ended, transitioning to next video`);
    
    setIsTransitioning(true);
    
    // Fade out current video
    setTimeout(() => {
      // Move to next video in sequence (cycle through videos)
      setCurrentVideoIndex(prev => (prev + 1) % videos.length);
      setIsTransitioning(false);
    }, 1000); // 1 second fade duration
  };

  // Handle video load to set playback speed and ensure autoplay
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeeds[currentVideoIndex];
      videoRef.current.play().catch(e => console.log('Autoplay failed:', e));
    }
  };

  // Handle background video load
  const handleBackgroundVideoLoad = () => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.playbackRate = 0.1; // 10% speed
      backgroundVideoRef.current.play().catch(e => console.log('Background autoplay failed:', e));
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">

      <video
        ref={backgroundVideoRef}
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleBackgroundVideoLoad}
      >
        <source src="/videos/3.mp4" type="video/mp4" />
      </video>

      
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-dark/30 to-cyber-dark/80" />
      
      {/* Animated video pattern overlay */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-20'
        }`}
        style={{
          filter: 'hue-rotate(280deg)'
        }}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        onLoadedData={handleVideoLoad}
        key={`video-${currentVideoIndex}`} // Force re-render when video changes
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AppShell;