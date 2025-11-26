import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, PenTool, TrendingUp, Video, Briefcase, DollarSign } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToLeadCapture = () => {
    if (location.pathname !== "/" && location.pathname !== "/rapina") {
      navigate("/rapina#lead-capture");
      setTimeout(() => {
        const element = document.getElementById("lead-capture");
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
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
    }
  };

  const professionals = [
    {
      icon: Users,
      title: "Gerente Comercial",
      description: "Lidera, conduz e treina o time de vendas",
      salary: "R$ 10.000,00/mês",
      color: "from-orange-500/20 to-red-600/20"
    },
    {
      icon: PenTool,
      title: "Redator de Publicidade",
      description: "Responsável por escrever textos persuasivos e criativos",
      salary: "R$ 3.500,00/mês",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: TrendingUp,
      title: "Gestor de Tráfego",
      description: "Cria seus anúncios patrocinados na internet",
      salary: "R$ 3.000,00/mês",
      color: "from-orange-500/20 to-red-600/20"
    },
    {
      icon: Video,
      title: "Editor de Vídeo",
      description: "Edita seus vídeos e aumenta o engajamento da sua empresa",
      salary: "R$ 2.800,00/mês",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: Briefcase,
      title: "Gestor de Projetos",
      description: "Planeja, monitora e conclui projetos, coordenando equipes e recursos",
      salary: "R$ 9.000,00/mês",
      color: "from-orange-500/20 to-red-600/20"
    }
  ];

  const totalMarketCost = 28300; // Soma de todos os salários

  return (
    <section className="pt-2 pb-24 relative overflow-hidden" style={{
      background: "#fef9f3",
    }}>
      {/* Background animado alternativo - estilo minimalista e elegante */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradiente de fundo animado */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, rgba(255,69,0,0.02) 0%, rgba(255,69,0,0.05) 25%, rgba(255,69,0,0.02) 50%, rgba(255,69,0,0.05) 75%, rgba(255,69,0,0.02) 100%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Manchas de cor suaves */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${400 + i * 200}px`,
              height: `${400 + i * 200}px`,
              left: i % 2 === 0 ? '5%' : '75%',
              top: `${20 + i * 25}%`,
              background: `radial-gradient(circle, rgba(255,69,0,0.04) 0%, rgba(255,69,0,0.01) 50%, transparent 100%)`,
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 80, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Linhas diagonais sutis */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`diagonal-${i}`}
            className="absolute w-full"
            style={{
              height: '1px',
              top: `${15 + i * 18}%`,
              background: `linear-gradient(90deg, transparent, rgba(255,69,0,0.08), transparent)`,
              transform: `rotate(${-5 + i * 2}deg)`,
              transformOrigin: 'center',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Pontos de luz discretos */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              width: '3px',
              height: '3px',
              background: 'rgba(255,69,0,0.3)',
              boxShadow: '0 0 6px rgba(255,69,0,0.4)',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Círculos concêntricos pulsantes */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border"
            style={{
              left: '50%',
              top: '50%',
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              transform: 'translate(-50%, -50%)',
              borderColor: `rgba(255,69,0,${0.1 - i * 0.02})`,
              borderWidth: '1px',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Efeito de respiração suave */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 40%, rgba(255,69,0,0.03) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-[74rem] mx-auto md:min-w-[44rem] ">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-800 md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-text-gradient-rapina">
              Quais profissionais{" "}
            </span>  
              você precisa para executar este plano?
            </h2>
            <p className="text-xl text-gray-800">
              Quanto você paga por cada um deles <span className="text-primary font-semibold">NO MERCADO?</span>
            </p>
          </div>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
            {professionals.map((professional, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.5, y: 15, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 xl:min-h-[22rem] hover:border-primary transition-[border-color] duration-300"
              >
                {/* Sombra fixa atrás do card - sempre visível */}
                <div 
                  className="absolute inset-0 rounded-2xl -z-10 pointer-events-none"
                  style={{
                    boxShadow: '0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)',
                  }}
                />
                {/* Sombra adicional no hover */}
                <div 
                  className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: '0 25px 60px rgba(0,0,0,0.18), 0 0 40px rgba(255,69,0,0.25)',
                  }}
                />
                
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${professional.color} flex items-center justify-center mb-4 shadow-md`}>
                    <professional.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-md font-bold text-center mb-2 uppercase tracking-tight text-gray-900">
                    {professional.title}
                  </h3>
                  <p className="text-sm text-gray-700 text-center mb-4 leading-relaxed">
                    {professional.description}
                  </p>
                  <div className="text-center pt-2 border-t border-gray-100 mt-auto w-full">
                    <p className="text-lg font-bold text-primary">
                      {professional.salary}
                      <span className="text-xs font-light opacity-50 align-super ml-0.5">*</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Observação discreta com asterisco - antes do Total */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <p className="text-xs font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <span className="align-super mr-1">*</span>
              Esses valores são baseados na média do mercado, entretanto não correspondem necessariamente a profissionais de alta especialização e gabarito, podendo se tratar de profissionais iniciantes ou medianos.
            </p>
          </motion.div>

          {/* Total Market Cost */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-2xl text-gray-800 mb-2">
              Total no mercado:
            </p>
            <p className="text-4xl md:text-5xl font-bold text-gray-800">
              R$ {totalMarketCost.toLocaleString('pt-BR')}/mês
            </p>
          </motion.div>

          {/* Grupo Rapina Comparison */}
          <motion.div
            initial={{ opacity: 0.4, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-red-600 to-primary rounded-3xl blur-lg opacity-20 animate-pulse" />
            
            <div className="relative bg-white border-2 border-primary/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
              <h3 className="text-2xl text-gray-800 md:text-3xl lg:text-4xl font-bold uppercase mb-6 tracking-tight">
                Quanto você paga por esse mesmo time dentro do{" "}
                <span className="text-transparent bg-clip-text bg-text-gradient-rapina">
                  Grupo Rapina COM?
                </span>
              </h3>
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-4">
                  <DollarSign className="w-16 h-16 text-primary/50" />
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-red-600">
                    ???
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Descubra como podemos oferecer uma equipe completa de marketing por uma fração do custo de mercado.
              </p>

              <Button
                onClick={scrollToLeadCapture}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-6 text-lg font-bold uppercase tracking-wide rounded-full shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
              >
                QUERO MAIS INFORMAÇÕES
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
