import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AnimatedGraph = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  
  const { scrollYProgress } = useScroll({
    target: containerRef as unknown as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  // Parallax effect for graph - moves slower than cards
  const graphY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive values
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const strokeWidth = isMobile ? 2 : isTablet ? 3 : 4;
  const barWidth = isMobile ? 8 : isTablet ? 10 : 14;
  const barSpacing = isMobile ? 16 : isTablet ? 20 : 28;
  const numBars = isMobile ? 12 : isTablet ? 18 : 25;
  const startX = isMobile ? 800 : isTablet ? 950 : 1100;

  return (
    <motion.svg
      ref={containerRef}
      className="absolute inset-0 w-full h-full scale-100 md:scale-100 lg:scale-100"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ y: graphY }}
    >
      <defs>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff4500" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff4500" stopOpacity="1" />
          <stop offset="100%" stopColor="#d7263d" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main orange/red curved line - more prominent */}
      <motion.path
        d="M0,550 Q300,350 600,400 Q900,450 1200,380 Q1500,310 1800,350 L1920,380"
        fill="none"
        stroke="url(#orangeGrad)"
        strokeWidth={strokeWidth}
        filter="url(#glow)"
        className="scale-75 md:scale-90 lg:scale-100 origin-center"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      
      {/* Peak point on orange line */}
      <motion.circle
        cx="1200"
        cy="380"
        r={isMobile ? 4 : isTablet ? 6 : 8}
        fill="#ff4500"
        filter="url(#glow)"
        className="scale-75 md:scale-90 lg:scale-100 origin-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ delay: 1.5, duration: 0.8 }}
      />

      {/* Blue curved line */}
      <motion.path
        d="M0,650 Q400,750 800,650 Q1200,550 1600,600 Q1800,620 1920,650"
        fill="none"
        stroke="url(#blueGrad)"
        strokeWidth={strokeWidth - 1}
        filter="url(#glow)"
        className="scale-75 md:scale-90 lg:scale-100 origin-center"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
      />
      
      <motion.circle
        cx="960"
        cy="600"
        r={isMobile ? 3 : isTablet ? 4.5 : 6}
        fill="#3b82f6"
        className="scale-75 md:scale-90 lg:scale-100 origin-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      />

      {/* Animated vertical bars on the right - histogram style */}
      {[...Array(numBars)].map((_, i) => {
        const heights = [
          180, 120, 200, 90, 160, 140, 220, 100, 190, 130,
          170, 150, 210, 110, 180, 160, 200, 140, 190, 120,
          180, 150, 200, 130, 170
        ];
        const height = heights[i % heights.length];
        return (
          <motion.rect
            key={i}
            x={startX + i * barSpacing}
            y={280 - height}
            width={barWidth}
            height={height}
            fill={i % 3 === 0 ? "#ff4500" : i % 2 === 0 ? "#d7263d" : "#3b82f6"}
            opacity="0.7"
            rx="2"
            className="scale-75 md:scale-90 lg:scale-100 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: [0, 1.05, 0.95, 1],
              opacity: [0, 0.7, 0.8, 0.7]
            }}
            transition={{
              duration: 1.8,
              delay: i * 0.04,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Chart icon with question mark (top right) - hidden on mobile */}
      {!isMobile && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="scale-75 md:scale-90 lg:scale-100 origin-center"
        >
          <motion.rect
            x={isTablet ? "1600" : "1700"}
            y="100"
            width={isTablet ? "40" : "50"}
            height={isTablet ? "40" : "50"}
            rx={isTablet ? "8" : "10"}
            fill="rgba(15, 20, 30, 0.6)"
            stroke="rgba(255, 69, 0, 0.4)"
            strokeWidth={isTablet ? "1.5" : "2"}
          />
          <motion.path
            d={isTablet ? "M1605,120 L1610,115 L1615,122 L1620,112 L1625,117" : "M1710,125 L1715,120 L1720,127 L1725,117 L1730,122"}
            fill="none"
            stroke="#ff4500"
            strokeWidth={isTablet ? "2" : "2.5"}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          />
          <motion.circle
            cx={isTablet ? "1640" : "1740"}
            cy="115"
            r={isTablet ? "4" : "6"}
            fill="none"
            stroke="#ff4500"
            strokeWidth={isTablet ? "1.5" : "2"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          />
          <motion.text
            x={isTablet ? "1645" : "1745"}
            y="119"
            fill="#ff4500"
            fontSize={isTablet ? "8" : "10"}
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
          >
            ?
          </motion.text>
        </motion.g>
      )}

      {/* Additional decorative elements */}
      {!isMobile && (
        <motion.circle
          cx={isTablet ? "1500" : "1600"}
          cy="450"
          r={isTablet ? "3" : "4"}
          fill="#d7263d"
          opacity="0.6"
          className="scale-75 md:scale-90 lg:scale-100 origin-center"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.svg>
  );
};

export default AnimatedGraph;
