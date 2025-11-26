import { motion, useScroll, useTransform } from "framer-motion";
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
import { useEffect, useRef, useState } from "react";
import AnimatedGraph from "./AnimatedGraph";

const InteractiveSolutions = () => {
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

      if (width < 640) setScale(0.7); // sm e menores (~70%)
      else if (width < 1024) setScale(0.85); // md (~85%)
      else setScale(1.1); // lg e maiores (original)
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cards = [
    {
      icon: Target,
      title: "Geração de Demanda",
      color: "#ff4500",
      position: { top: "20%", left: "8%" },
      delay: 0,
      parallaxSpeed: 3.5,
    },
    {
      icon: Filter,
      title: "Funil de Vendas",
      color: "#ff4500",
      position: { top: "80%", left: "3%" },
      delay: 0.1,
      parallaxSpeed: 1.5,
    },
    {
      icon: RefreshCw,
      title: "Recorrência",
      color: "#d7263d",
      position: { top: "52%", left: "25%" },
      delay: 0.2,
      parallaxSpeed: 2.8,
    },
    {
      icon: CirclePlay,
      title: "Audiovisual",
      color: "#ff4500",
      position: { top: "25%", left: "50%" },
      delay: 0.3,
      parallaxSpeed: 3.8,
    },
    {
      icon: Tag,
      title: "Oferta",
      color: "#d7263d",
      position: { top: "85%", left: "48%" },
      delay: 0.4,
      parallaxSpeed: 1.8,
    },
    {
      icon: Megaphone,
      title: "Posicionamento",
      color: "#d7263d",
      position: { top: "22%", left: "82%" },
      delay: 0.5,
      parallaxSpeed: 3.6,
    },
    {
      icon: Users,
      title: "Processo Comercial",
      color: "#ff4500",
      position: { top: "55%", left: "72%" },
      delay: 0.6,
      parallaxSpeed: 3,
    },
    {
      icon: Signature,
      title: "Branding",
      color: "#d7263d",
      position: { top: "82%", left: "85%" },
      delay: 0.7,
      parallaxSpeed: 1.6,
    },
  ];

  // 🔧 Ajuste de posição conforme o tamanho da tela
  const getResponsivePosition = (card: typeof cards[0]) => {
    const top = parseFloat(card.position.top);
    const left = parseFloat(card.position.left);

    if (screenWidth < 768) {
      // 📱 Mobile — distribui melhor os cards mantendo proporções originais
      // Escala as posições left de 0-100% para 5-95% para evitar cortes
      const scaledLeft = -2 + (left / 100) * 90; // Mapeia 0-100% para 5-95%
      return {
        top: `${top}%`,
        left: `${scaledLeft}%`,
      };
    }

    if (screenWidth >= 768 && screenWidth < 1024) {
      // 📲 Tablet — mantém posições originais com leve ajuste
      return {
        top: `${top}%`,
        left: `${left * 0.9}%`, // Reduz 10% para evitar cortes
      };
    }

    // 💻 Desktop — posição original
    return card.position;
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] pt-32 pb-16 overflow-visible"
      style={{
        background:
          "linear-gradient(to bottom, hsl(0, 0%, 7%) 0%, hsl(0, 0%, 7%) 50%, hsl(0, 0%, 7%) 100%)",
      }}
    >
      {/* Fundo animado */}
      <div className="absolute inset-0 opacity-50">
        <AnimatedGraph />
      </div>

      {/* Cards flutuantes */}
      <div className="relative container mx-auto h-full min-h-[90vh] overflow-visible px-8">
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: card.delay,
                ease: "easeOut",
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
                  width: "140px",
                  minHeight: "180px",
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
                  delay: card.delay,
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
    </section>
  );
};

export default InteractiveSolutions;
