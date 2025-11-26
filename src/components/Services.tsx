import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, Globe, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Feature {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  price: string;
  size: "small" | "medium" | "large";
  sectionTitle?: string;
  characteristics?: string[];
  width: string;
  bullets?: string[];
}

const Services = () => {
  const features: Feature[] = [
    {
      icon: Stethoscope,
      title: "Raio-X Analítico",
      description: "Entregamos um diagnóstico preciso e um <strong>plano de ação de curto prazo</strong> que permita ao cliente:",
      bullets: [
        "Entender as causas reais dos seus principais gargalos;",
        "Obter clareza de prioridades;",
        "Receber um roteiro tático de 30–90 dias com entregáveis e métricas a acompanhar — tudo de forma rápida e objetiva para implementação própria ou evolução na esteira Rapina."
      ],
      price: "R$ 1.799",
      size: "small",
      width: "w-full"
    },
    {
      icon: ChartNoAxesCombined,
      title: "Conselho Direcional",
      description: "Fornecemos direção estratégica, contínua e responsabilização tática ao cliente para uma operação mais coordenada e orientada a resultados. O objetivo é garantir eficiência, consistência e estratégia — sem que a Rapina tenha obrigação de executar todas as tarefas. Nesse serviço, atuamos como um <strong>departamento estratégico terceirizado</strong>, orientando decisões, validando hipóteses e entregando frameworks acionáveis. Além disso, garantimos priorização semanal, revisão constante dos indicadores e alinhamento das ações com as metas reais do negócio. O cliente ganha previsibilidade, maturidade operacional e redução drástica de erros estratégicos.",
      price: "R$ 2.799",
      size: "medium",
      width: "w-full"
    },
    {
      icon: Globe,
      title: "Co-Gestão 360°",
      description: "Assessoria e Implementação da Rapina. Atuamos ativamente em praticamente todas as frentes operacionais e estratégicas.",
      characteristics: [
        "Co-gestão estratégica: participamos das decisões que impactam nossa operação (comercial, marketing, produto) sem assumir funções estritamente legais/financeiras.",
        "Execução \"mão na massa\" parcial/total: entregamos internamente (quando estratégico) e terceirizamos tarefas específicas mantendo governança e padrões Rapina.",
        "Escopo vivo e modular: entregas ajustadas mensalmente conforme resultados e prioridades."
      ],
      price: "R$ X.XXX",
      size: "large",
      width: "w-full"
    },
  ];

  return (
    <section className="py-36 px-4 relative overflow-hidden" style={{
      background: "#fef9f3",
    }}>
      {/* Background animado */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pontos de luz animados */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`light-point-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              background: 'radial-gradient(circle, rgba(255,69,0,0.6) 0%, rgba(255,69,0,0.2) 50%, transparent 100%)',
              boxShadow: '0 0 15px rgba(255,69,0,0.5), 0 0 30px rgba(255,69,0,0.3)',
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Orbs de luz maiores */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: i === 0 ? '10%' : i === 1 ? '70%' : '40%',
              top: i === 0 ? '20%' : i === 1 ? '60%' : '80%',
              background: `radial-gradient(circle, rgba(255,69,0,0.15) 0%, rgba(255,69,0,0.05) 50%, transparent 100%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Partículas flutuantes */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${10 + (i * 11)}%`,
              background: 'rgba(255,69,0,0.4)',
              boxShadow: '0 0 10px rgba(255,69,0,0.6)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Seção: Conheça nossos serviços */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-36">
          <motion.span
            initial={{ opacity: 0.5, y: 15, filter: "blur(2px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="uppercase relative inline-block px-6 py-3 mb-4 text-primary z-10"
          >
            {/* Elemento retangular de destaque */}
            <span 
              className="absolute inset-0 rounded-lg z-0"
              style={{
                background: "rgba(246, 121, 65, 0.12)",
              }}
            />
            <span className="relative z-10">Você e seu negócio cada vez mais alto!</span>
          </motion.span>
          <h2 className="uppercase pt-12 text-3xl text-gray-900 md:text-5xl font-bold tracking-tight">
            conheça{" "}
            <span className="uppercase text-transparent bg-clip-text bg-text-gradient-rapina">
              nossos serviços
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Esse é o espaço para introduzir nossos serviços. Uma breve descrição dos serviços oferecidos e os melhores benefícios ou soluções:
          </p>
          <Link to="/solucoes">
            <Button variant="outline" size="lg" className="mt-4 relative border border-[#F67941] text-[#F67941] font-semibold
    px-6 py-3 rounded-lg overflow-hidden
    transition-colors duration-300
    hover:text-white hover:bg-[#F67941]
    before:content-[''] before:absolute before:top-[-50px] before:left-[-75px]
    before:w-[50px] before:h-[155px] before:rotate-[35deg]
    before:bg-white before:opacity-20
    before:transition-all before:duration-[550ms]
    before:ease-[cubic-bezier(0.19,1,0.22,1)]
    hover:before:left-[120%]
  ">
              VEJA MAIS
            </Button>
          </Link>
        </div>

        {/* Seção: Por que escolher a Rapina */}
        <div className="max-w-7xl mx-auto text-left space-y-6 mb-16 relative z-10">
          <h2 className="text-3xl text-gray-900 md:text-5xl font-bold uppercase tracking-tight">
            <span className="text-transparent bg-clip-text bg-text-gradient-rapina">
              POR QUE ESCOLHER{" "}
            </span>  
            A RAPINA?
          </h2>
          <p className="text-xl text-gray-800">
            Todo negócio nasce de uma visão.
          </p>
          <p className="text-lg text-gray-700">
            Mas transformar essa visão em crescimento exige mais do que execução — exige estratégia, método e propósito.
          </p>
          <p className="text-lg text-gray-700">
            E nós do Grupo Rapina COM possuímos as melhores soluções para o seu modelo de negócio:
          </p>
        </div>
        
        {/* Cards lado a lado em telas maiores, empilhados no mobile, centralizados na div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto items-end">
          {features.map((feature, index) => {
            // Calcula altura: base 550px, aumentando 20% para cada card
            const getHeightClasses = () => {
              if (feature.size === "small") {
                return "h-[440px] md:h-[550px]"; // 550px * 0.8 = 440px (mobile), 550px (desktop)
              } else if (feature.size === "medium") {
                return "h-[528px] md:h-[660px]"; // 660px * 0.8 = 528px (mobile), 660px (desktop)
              } else {
                return "h-[634px] md:h-[792px]"; // 792px * 0.8 = 634px (mobile), 792px (desktop)
              }    
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0.4, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`
                  group relative
                  ${getHeightClasses()}
                  w-full
                  rounded-2xl p-6 md:p-6 lg:p-8
                  bg-white
                  border-2 border-gray-200
                  transition-[border-color] duration-300
                  flex flex-col justify-between
                `}
              >
              {/* Sombra fixa atrás do card - igual aos cards de profissionais da FinalCTA */}
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

              {/* Conteúdo superior */}
              <div className="space-y-4">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 shadow-sm">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">
                  {feature.title}
                </h3>
                {feature.sectionTitle && (
                  <h4 className="text-base font-semibold text-gray-900 mb-2 mt-4">
                    {feature.sectionTitle}
                  </h4>
                )}
                <p className="text-gray-700 leading-relaxed text-sm text-left">
                  {feature.description.split('*').map((part, idx) => {
                    // Processa itálico com asteriscos
                    if (idx % 2 === 1) {
                      return <em key={idx}>{part}</em>;
                    }
                    // Processa negrito com <strong>
                    const parts = part.split(/(<strong>.*?<\/strong>)/g);
                    return (
                      <span key={idx}>
                        {parts.map((segment, segIdx) => {
                          if (segment.startsWith('<strong>') && segment.endsWith('</strong>')) {
                            const text = segment.replace(/<\/?strong>/g, '');
                            return <strong key={`strong-${segIdx}`} className="font-bold">{text}</strong>;
                          }
                          return segment;
                        })}
                      </span>
                    );
                  })}
                </p>
                
                {/* Bullet points opcionais (ex.: Raio-X Analítico) */}
                {feature.bullets && (
                  <ul className="mt-4 space-y-2 text-gray-700 leading-relaxed text-sm list-disc list-outside pl-6">
                    {feature.bullets.map((item, idx) => (
                      <li key={idx} className="text-left marker:text-primary">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Características com bullet points para Co-Gestão */}
                {feature.characteristics && (
                  <div className="space-y-3 mt-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Principais características do serviço:
                    </h4>
                    <ul className="space-y-3 text-gray-700 leading-relaxed text-sm list-disc list-outside pl-6">
                      {feature.characteristics.map((char, idx) => (
                        <li
                          key={idx}
                          className="text-left marker:text-primary"
                        >
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Preço no rodapé */}
              <div className="mt-auto pt-3 border-t border-gray-300">
                <p className="text-2xl md:text-3xl font-bold text-primary text-center">
                  {feature.price}
                </p>
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default Services;
