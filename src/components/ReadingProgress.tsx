import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const scrolled = (scrollTop / docHeight) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial check

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress <= 0) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        backgroundColor: 'var(--primary)',
        width: `${progress}%`,
        zIndex: 200,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px var(--primary)'
      }}
    />
  );
}