"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  type: 'percentage' | 'free' | 'fixed';
  color: string;
}

interface ScratchCardProps {
  offer: Offer;
  onComplete: (offer: Offer) => void;
}

export default function ScratchCard({ offer, onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - responsive and much bigger
    const rect = canvas.getBoundingClientRect();
    const width = Math.min(450, window.innerWidth - 40);
    const height = (width / 500) * 380;
    canvas.width = width;
    canvas.height = height;

    // Create gradient scratch surface - RED THEME
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e61e25');
    gradient.addColorStop(0.5, '#c41820');
    gradient.addColorStop(1, '#a01419');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch-off text with glow effect
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎁 Scratch to Reveal', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText('Your Special Offer! 🎁', canvas.width / 2, canvas.height / 2 + 15);
    ctx.restore();

    // Add decorative elements
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    setIsScratching(true);
    scratch(e);
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Create scratch effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Calculate scratched area
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const progress = (transparent / (pixels.length / 4)) * 100;
    setScratchProgress(progress);

    // Reveal offer when 60% is scratched (increased from 40%)
    if (progress > 60 && !isRevealed) {
      setIsRevealed(true);
      setTimeout(() => {
        onComplete(offer);
      }, 1500);
    }
  };

  const stopScratch = () => {
    isDrawing.current = false;
    setIsScratching(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Scratch Card Container */}
      <div className="relative mx-auto w-[450px] h-[280px] rounded-xl overflow-hidden shadow-2xl">
        {/* Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
            isRevealed ? 'opacity-0' : 'opacity-100'
          } ${isScratching ? 'animate-pulse' : ''}`}
          onMouseDown={startScratch}
          onMouseMove={scratch}
          onMouseUp={stopScratch}
          onMouseLeave={stopScratch}
          onTouchStart={startScratch}
          onTouchMove={scratch}
          onTouchEnd={stopScratch}
          style={{ 
            width: '100%', 
            height: '100%',
            filter: isScratching ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' : 'none'
          }}
        />

        {/* Glow Effect */}
        {isScratching && (
          <div className="absolute inset-0 rounded-xl animate-pulse border-2 border-red-500/50 shadow-lg shadow-red-500/25" />
        )}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        className="text-center mt-4"
      >
        <p className="text-white/60 text-sm">
          {isScratching ? '🎉 Keep scratching...' : '👆 Click and drag to scratch'}
        </p>
        <div className="flex justify-center mt-2">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl"
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      {/* Confetti Effect */}
      {isRevealed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1, 0], 
                rotate: 360,
                y: [0, -100, -200]
              }}
              transition={{ 
                duration: 2, 
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}