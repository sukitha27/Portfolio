import React, { useState, useEffect } from 'react';

const AnimatedPieChart = ({ percentage = 75, size = "medium" }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const getDimensions = () => {
    switch(size) {
      case "small": return { size: 100, stroke: 8 };
      case "large": return { size: 200, stroke: 16 };
      default: return { size: 150, stroke: 12 };
    }
  };
  
  const { size: dims, stroke } = getDimensions();
  const radius = (dims / 2) - (stroke / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  useEffect(() => {
    const animateProgress = () => {
      let start = 0;
      const end = percentage;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const currentProgress = start + (end - start) * easeOut(progress);
        
        setProgress(currentProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    animateProgress();
  }, [percentage]);

  return (
    <div 
      className="relative inline-flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 bg-blue-500 rounded-full filter blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}
      />
      
      <svg
        className="transform -rotate-90 transition-transform duration-500 ease-out hover:scale-105"
        width={dims}
        height={dims}
        style={{
          filter: isHovered ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' : 'none'
        }}
      >
        {/* Background gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          className="text-gray-200 transition-all duration-300"
          stroke="currentColor"
          fill="none"
          strokeWidth={stroke}
          r={radius}
          cx={dims/2}
          cy={dims/2}
          style={{
            opacity: isHovered ? 0.3 : 0.1
          }}
        />
        
        {/* Animated progress circle */}
        <circle
          stroke="url(#progressGradient)"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={dims/2}
          cy={dims/2}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
          }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute text-center transition-all duration-300 transform">
        <span className={`font-semibold ${
          size === "small" ? "text-lg" :
          size === "large" ? "text-4xl" :
          "text-2xl"
        } ${
          isHovered ? 'text-blue-600 scale-110' : 'text-gray-800'
        } transition-all duration-300`}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default AnimatedPieChart;  // Default export only