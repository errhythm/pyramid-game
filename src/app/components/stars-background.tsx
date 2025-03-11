'use client';

import React, { useEffect } from 'react';

export function StarsBackground() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const stars = document.querySelectorAll<HTMLElement>('.stars, .stars2, .stars3');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      stars.forEach(star => {
        star.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="stars-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
} 