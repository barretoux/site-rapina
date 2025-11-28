import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Target,
  Filter,
  RefreshCw,
  CirclePlay,
  Tag,
  Users,
  Megaphone,
  Signature,
} from "lucide-react";
import AnimatedGraph from "./AnimatedGraph";

// Componente Dashboard Background
const DashboardBackground = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const dashboardMaxWidth = isMobile ? 450 : isTablet ? 640 : 920;
  const dashboardHeight = isMobile ? 320 : isTablet ? 360 : 432;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Card grande do dashboard */}
      <div 
        className="relative w-full rounded-2xl border"
        style={{
          background: "rgba(15, 20, 30, 0.7)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 69, 0, 0.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 69, 0, 0.15)",
          maxWidth: `${dashboardMaxWidth}px`,
          height: `${dashboardHeight}px`,
        }}
      >
        {/* Grid interno do dashboard */}
        <div className="absolute inset-0 grid grid-cols-2 h-full">
          {/* Metade esquerda - Gráfico de linhas (50%) */}
          <div className="relative border-r border-orange-500/20 p-6">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 450"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4500" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ff4500" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d7263d" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
                </linearGradient>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Grid de fundo */}
              <g opacity="0.1">
                {Array.from({ length: 6 }, (_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={(i * 80) + 50}
                    y1="50"
                    x2={(i * 80) + 50}
                    y2="400"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="50"
                    y1={(i * 87.5) + 50}
                    x2="450"
                    y2={(i * 87.5) + 50}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />
                ))}
              </g>

              {/* Gráfico de linha principal */}
              <motion.path
                d="M 50,350 Q 150,250 250,280 Q 350,310 450,220"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth={isMobile ? 3 : 4}
                filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Pontos no gráfico */}
              {[
                { x: 150, y: 250 },
                { x: 250, y: 280 },
                { x: 350, y: 310 },
                { x: 450, y: 220 },
              ].map((point, i) => (
                <motion.circle
                  key={`point-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r={isMobile ? 4 : 5}
                  fill="#ff4500"
                  filter="url(#lineGlow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.9] }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
                />
              ))}

              {/* Gráfico de linha secundário */}
              <motion.path
                d="M 50,380 Q 200,400 350,380 Q 400,370 450,390"
                fill="none"
                stroke="url(#lineGrad2)"
                strokeWidth={isMobile ? 2 : 3}
                filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Metade direita - Dividida em 2 partes */}
          <div className="flex flex-col h-full">
            {/* Parte superior (2/4 = 25% do total) - Gráfico de colunas */}
            <div className="relative border-b border-orange-500/20 p-6 h-1/2">
              <svg
                className="w-full h-full"
                viewBox="0 0 500 225"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4500" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d7263d" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="barGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Gráfico de barras */}
                {[
                  { x: 50, height: 60 },
                  { x: 120, height: 105 },
                  { x: 190, height: 45 },
                  { x: 260, height: 135 },
                  { x: 330, height: 75 },
                  { x: 400, height: 90 },
                ].map((bar, i) => (
                  <motion.rect
                    key={`bar-${i}`}
                    x={bar.x}
                    y={187.5 - bar.height}
                    width={50}
                    height={bar.height}
                    fill={i % 2 === 0 ? "url(#barGrad1)" : "url(#barGrad2)"}
                    filter="url(#barGlow)"
                    rx="4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: bar.height, opacity: 0.8 }}
                    transition={{ delay: 1.5 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  />
                ))}
              </svg>
            </div>

            {/* Parte inferior (2/4 = 25% do total) - Gráfico de rede/áreas */}
            <div className="relative p-6 h-1/2">
              <svg
                className="w-full h-full"
                viewBox="0 0 500 225"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4500" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#d7263d" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ff4500" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="areaGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Gráfico de área ampliada */}
                <motion.path
                  d="M 50,187.5 L 150,150 L 250,135 L 350,120 L 450,105 L 450,187.5 L 350,187.5 L 250,187.5 L 150,187.5 L 50,187.5 Z"
                  fill="url(#areaGrad)"
                  filter="url(#areaGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Linha do gráfico de área */}
                <motion.path
                  d="M 50,187.5 L 150,150 L 250,135 L 350,120 L 450,105"
                  fill="none"
                  stroke="#ff4500"
                  strokeWidth={isMobile ? 2 : 3}
                  filter="url(#areaGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />

                {/* Pontos de conexão */}
                {[
                  { x: 150, y: 150 },
                  { x: 250, y: 135 },
                  { x: 350, y: 120 },
                  { x: 450, y: 105 },
                ].map((point, i) => (
                  <motion.circle
                    key={`area-point-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r={isMobile ? 3 : 4}
                    fill="#ff4500"
                    filter="url(#areaGlow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.9] }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Escala dinâmica dos cards conforme a largura da tela
  const [scale, setScale] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      if (width < 640) setScale(0.7);
      else if (width < 1024) setScale(0.85);
      else setScale(1.1);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scrollToLeadCapture = () => {
    const element = document.getElementById("lead-capture");
    if (element) {
      const navbarHeight = 130;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const cards = [
    {
      icon: Target,
      title: "Geração de Demanda",
      color: "#ff4500",
      // >= 1280px (large screen desktop)
      position: { top: "25%", left: "15%" },
      // 1024-1280px (desktop)
      pos1024: { top: "26%", left: "14%" },
      // 768-1024px (tablet)
      pos768: { top: "28%", left: "9%" },
      // 640-768px
      pos640: { top: "35%", left: "10%" },
      // 535-640px
      pos535: { top: "32%", left: "5%" },
      // 380-535px
      pos380: { top: "44%", left: "2%" },
      // 320-380px
      pos320: { top: "44%", left: "-3%" },
      delay: 0,
      parallaxSpeed: 3.5,
    },
    {
      icon: Filter,
      title: "Funil de Vendas",
      color: "#ff4500",
      position: { top: "65%", left: "12%" },
      pos1024: { top: "64%", left: "11%" },
      pos768: { top: "63%", left: "7%" },
      pos640: { top: "67%", left: "8%" },
      pos535: { top: "64%", left: "5%" },
      pos380: { top: "74%", left: "2%" },
      pos320: { top: "74%", left: "-3%" },
      delay: 0.1,
      parallaxSpeed: 1.5,
    },
    {
      icon: RefreshCw,
      title: "Recorrência",
      color: "#d7263d",
      position: { top: "50%", left: "30%" },
      pos1024: { top: "49%", left: "29%" },
      pos768: { top: "48%", left: "26%" },
      pos640: { top: "59%", left: "29%" },
      pos535: { top: "52%", left: "20%" },
      pos380: { top: "67%", left: "15%" },
      pos320: { top: "69%", left: "10%" },
      delay: 0.2,
      parallaxSpeed: 3.05,
    },
    {
      icon: CirclePlay,
      title: "Audiovisual",
      color: "#ff4500",
      position: { top: "25%", left: "45%" },
      pos1024: { top: "26%", left: "44%" },
      pos768: { top: "27%", left: "41%" },
      pos640: { top: "33%", left: "42%" },
      pos535: { top: "32%", left: "38%" },
      pos380: { top: "45%", left: "35%" },
      pos320: { top: "47%", left: "28%" },
      delay: 0.3,
      parallaxSpeed: 3.8,
    },
    {
      icon: Tag,
      title: "Oferta",
      color: "#d7263d",
      position: { top: "65%", left: "45%" },
      pos1024: { top: "64%", left: "44%" },
      pos768: { top: "63%", left: "41%" },
      pos640: { top: "67%", left: "42%" },
      pos535: { top: "65%", left: "38%" },
      pos380: { top: "77%", left: "35%" },
      pos320: { top: "75%", left: "28%" },
      delay: 0.4,
      parallaxSpeed: 1.8,
    },
    {
      icon: Megaphone,
      title: "Posicionamento",
      color: "#d7263d",
      position: { top: "26%", left: "75%" },
      pos1024: { top: "27%", left: "74%" },
      pos768: { top: "28%", left: "76%" },
      pos640: { top: "33%", left: "72%" },
      pos535: { top: "32%", left: "68%" },
      pos380: { top: "44%", left: "65%" },
      pos320: { top: "44%", left: "60%" },
      delay: 0.5,
      parallaxSpeed: 3.4,
    },
    {
      icon: Users,
      title: "Processo Comercial",
      color: "#ff4500",
      position: { top: "50%", left: "60%" },
      pos1024: { top: "49%", left: "59%" },
      pos768: { top: "48%", left: "57%" },
      pos640: { top: "59%", left: "54%" },
      pos535: { top: "52%", left: "52%" },
      pos380: { top: "67%", left: "48%" },
      pos320: { top: "69%", left: "45%" },
      delay: 0.6,
      parallaxSpeed: 3,
    },
    {
      icon: Signature,
      title: "Branding",
      color: "#d7263d",
      position: { top: "66%", left: "75%" },
      pos1024: { top: "65%", left: "74%" },
      pos768: { top: "64%", left: "76%" },
      pos640: { top: "69%", left: "72%" },
      pos535: { top: "66%", left: "68%" },
      pos380: { top: "77%", left: "65%" },
      pos320: { top: "77%", left: "60%" },
      delay: 0.7,
      parallaxSpeed: 1.6,
    },
  ];

  const getResponsivePosition = (card: typeof cards[0]) => {
    // 320-380px
    if (screenWidth < 380) {
      return card.pos320;
    }
    // 380-535px
    if (screenWidth < 535) {
      return card.pos380;
    }
    // 535-640px
    if (screenWidth < 640) {
      return card.pos535;
    }
    // 640-768px
    if (screenWidth < 768) {
      return card.pos640;
    }
    // 768-1024px (tablet)
    if (screenWidth < 1024) {
      return card.pos768;
    }
    // 1024-1280px (desktop)
    if (screenWidth < 1280) {
      return card.pos1024;
    }
    // >= 1280px (large screen desktop)
    return card.position;
  };

  // Componente de pontos de luz animados
  const LightPoints = () => {
    const points = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: i % 2 === 0 ? 0 : 'auto',
      right: i % 2 === 1 ? 0 : 'auto',
      top: `${(i * 5) % 100}%`,
      delay: i * 0.3,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {points.map((point) => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: point.left,
              right: point.right,
              top: point.top,
              background: 'radial-gradient(circle, rgba(255,69,0,0.8) 0%, rgba(255,69,0,0.3) 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255,69,0,0.6), 0 0 40px rgba(255,69,0,0.4)',
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4],
              x: point.left === 0 ? [0, 50, 0] : [0, -50, 0],
            }}
            transition={{
              duration: 4 + point.delay * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: point.delay,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-visible"
      style={{
        background: "linear-gradient(180deg, hsl(0, 0%, 7%) 0%, hsl(0, 0%, 8%) 50%, hsl(0, 0%, 7%) 100%)",
      }}
    >
      {/* Linhas laterais contínuas - cobrindo toda a altura da seção Hero + InteractiveSolutions */}
      {Array.from({ length: 2 }, (_, i) => (
        <motion.div
          key={`continuous-line-${i}`}
          className="absolute w-px pointer-events-none z-0"
          style={{
            left: i === 0 ? '5%' : '95%',
            top: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(255,69,0,0.2) 0%, rgba(255,69,0,0.4) 10%, rgba(255,69,0,0.4) 90%, rgba(255,69,0,0.2) 100%)',
            zIndex: 1,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
      
      {/* Background com pontos de luz */}
      <LightPoints />

      {/* Seção Hero */}
      <div className={`relative z-10 my-8 flex flex-col items-center justify-center px-4 pt-24 pb-8 max-sm:mt-8 mb-0`}>
        <div className="container mx-auto relative z-10 py-2">
          <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto space-y-[0.1rem]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase decoration-primary relative inline-block px-6 py-3 text-base md:text-base max-md:text-sm max-[586px]:text-xs max-[400px]:text-[0.6rem]"

            >
              {/* Elemento retangular de destaque */}
              <span 
                className="absolute inset-0 rounded-lg -z-10"
                style={{
                  background: "rgba(30, 30, 30, 1.0)",
                }}
              />
              <span className="relative inline-block">
                Crescimento não é acaso
                {/* Linha laranja animada da esquerda para a direita */}
                <motion.span
                  className="absolute bottom-0 left-0 bg-[#ec7637]"
                  style={{
                    width: "100%",
                    height: "2px",
                    transformOrigin: "left center"
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.7,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                />
              </span>
              <span> - É Identidade, Posicionamento e Marketing.</span>
            </motion.span>
            <br /><br />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-2xl lg:text-3xl xl:text-[2.5rem] font-bold uppercase tracking-tight mb-12 max-[586px]:text-sm max-[479px]:text-[0.75rem] max-[429px]:text-[0.68rem]"
              style={{ lineHeight: '1.1' }}
            >
              <span className="text-transparent bg-clip-text bg-text-gradient-rapina block mb-2 pt-1">
                SOLUÇÕES QUE EVOLUEM E ACELERAM NEGÓCIOS
              </span>
                <span className="block mb-3">
                 INTEGRANDO VISÃO, PLANEJAMENTO E EXECUÇÃO COM<br />
                 <span className="block mt-4">PERFORMANCE CONTÍNUA</span>
                </span>

            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="pt-10"
            >
              <Button
                variant="hero"
                size="sm"
                onClick={scrollToLeadCapture}
                className="
                  px-6 py-3 text-sm h-auto rounded-full font-medium
                  text-white
                  bg-transparent
                  border-2 border-[#ec7637]
                  overflow-hidden
                  transition-all duration-300
                  hover:scale-105
                  shadow-md hover:shadow-lg
                  group
                  relative
                "
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #f44320, #f5712d)';
                  e.currentTarget.style.borderColor = '#f44320';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ec7637';
                }}
              >
              <p className="text-xs md:text-sm text-white max-[390px]:text-[0.6rem]" style={{ fontFamily: "'Lato', sans-serif" }}>
                Agende um diagnóstico com{" "}
                <span className="block sm:inline font-bold text-transparent bg-clip-text bg-text-gradient-rapina group-hover:!text-white group-hover:!bg-transparent">
                  um especialista{" "}
                  <span className="inline max-[390px]:block">
                    do Grupo Rapina COM.
                  </span>
                </span>
              </p>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transição suave entre Hero e InteractiveSolutions */}
      <div 
        className="relative h-[12.25rem] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(0, 0%, 8%)",
        }}
      />

      {/* Seção InteractiveSolutions */}
      <div className="relative pt-0 pb-4 overflow-visible">
        {/* Dashboard centralizado atrás dos cards - posicionado no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[920px] px-4 md:px-8 lg:px-12 pointer-events-none z-[2]">
          <div className="relative -mt-24">
            <DashboardBackground />
          </div>
        </div>

        {/* Ponto focal de luz branca mais forte - centralizado com o dashboard */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[576px] h-[288px] pointer-events-none z-[1]">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.06) 40%, rgba(255, 255, 255, 0.02) 60%, transparent 80%)",
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Fundo animado (mais sutil) */}
        <div className="absolute inset-0 opacity-20 z-0">
          <AnimatedGraph />
        </div>

        {/* Cards flutuantes */}
        <div className="relative container mx-auto max-xl:h-full min-h-[90vh] max-lg:min-h-[70vh] max-md:min-h-[60vh] overflow-visible px-8 z-10">
          {cards.map((card, index) => {
            const position = getResponsivePosition(card);
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -200 * card.parallaxSpeed]
            );

            return (
              <motion.div
                key={card.title}
                className="absolute"
                style={{
                  top: position.top,
                  left: position.left,
                  y,
                  scale,
                  transformOrigin: "center",
                  transition: "all 0.4s ease",
                }}
              >
                <motion.div
                  className="
                    relative rounded-2xl backdrop-blur-sm cursor-pointer
                    flex flex-col items-center justify-center
                    transition-transform duration-300 ease-in-out
                  "
                  style={{
                    background: "rgba(15, 20, 30, 0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: `0 0 20px ${card.color}30, 0 4px 20px rgba(0,0,0,0.3)`,
                    width: screenWidth >= 1024 ? "140px" : "147px",
                    minHeight: screenWidth >= 1024 ? "171px" : "180px",
                    padding: "1.75rem 1.25rem",
                  }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: `0 0 40px ${card.color}50, 0 8px 30px rgba(0,0,0,0.4)`,
                    transition: { duration: 0.3 },
                  }}
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 3.5 + index * 0.2,
                    repeat: Infinity,
                    delay: card.delay + 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "rgba(30,41,59,0.8)",
                      border: `1px solid ${card.color}40`,
                      padding: "1rem",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 20px ${card.color}60`,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <card.icon
                      className="w-8 h-8"
                      style={{ color: card.color }}
                      strokeWidth={2.5}
                    />
                  </motion.div>
                  <h3
                    className="text-center font-semibold text-white tracking-wide leading-tight w-full text-xs mt-6"
                    style={{
                      wordBreak: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {card.title}
                  </h3>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Círculo decorativo girando */}
          <motion.div
            className="absolute"
            style={{ top: "8%", right: "12%" }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="rounded-full w-16 h-16"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, #ff4500, transparent)",
                opacity: 0.3,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
