import { ChartNoAxesCombined, Globe, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  price: string;
  height: string;
  size: "small" | "medium" | "large";
  sectionTitle?: string;
  characteristics?: string[];
  width: string;
  bullets?: string[];
}

const WhyChoose = () => {
  const features: Feature[] = [
    {
      icon: Stethoscope,
      title: "Raio-X Analítico",
      description: "Entregar diagnóstico preciso e plano de ação de curto prazo que permita ao cliente:",
      bullets: [
        "Entender as causas reais dos principais problemas;",
        "Obter clareza de prioridades;",
        "Receber um roteiro tático de 30–90 dias com entregáveis e métricas a acompanhar — tudo de forma rápida e objetiva para decisão ou evolução na esteira Rapina."
      ],
      price: "R$ 1.499",
      height: "h-[520px]", // Altura unificada
      size: "small",
      width: "w-full md:max-w-sm" // largura para layout em colunas
    },
    {
      icon: ChartNoAxesCombined,
      title: "Conselho Direcional",
      description: "Fornecer direção estratégica contínua e responsabilização tática ao cliente, permitindo que a operação do cliente execute com maior eficiência, consistência e estratégia — sem que a Rapina tenha obrigação de executar todas as tarefas. É o *departamento estratégico terceirizado*, orientando decisões, validando hipóteses e entregando frameworks acionáveis.",
      price: "R$ 2.799",
      height: "h-[624px]", // Altura unificada
      size: "medium",
      width: "w-full md:max-w-sm" // largura para layout em colunas
    },
    {
      icon: Globe,
      title: "Co-Gestão 360°",
      description: "Dentro da Assessoria e Implementação, a Rapina COM atua ativamente em praticamente todas as frentes operacionais e estratégicas.",
      characteristics: [
        "Co-gestão estratégica: participamos das decisões que impactam nossa operação (comercial, marketing, produto) sem assumir funções estritamente legais/financeiras.",
        "Execução \"mão na massa\" parcial/total: entregamos internamente (quando estratégico) e terceirizamos tarefas específicas mantendo governança e padrões Rapina.",
        "Escopo vivo e modular: entregas ajustadas mensalmente conforme resultados e prioridades."
      ],
      price: "R$ X.XXX",
      height: "h-[728px]", // Altura unificada
      size: "large",
      width: "w-full md:max-w-sm" // largura para layout em colunas
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{
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

        {/* Linhas de gradiente animadas */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`gradient-line-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${20 + i * 25}%`,
              background: `linear-gradient(to right, transparent, rgba(255,69,0,0.1), rgba(255,69,0,0.2), rgba(255,69,0,0.1), transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
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

        {/* Círculos concêntricos pulsantes */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              left: i % 2 === 0 ? '15%' : '75%',
              top: `${20 + i * 20}%`,
              border: `2px solid rgba(255,69,0,${0.08 - i * 0.02})`,
              filter: 'blur(1px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Pontos de conexão animados */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`connection-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 12)}%`,
              background: 'rgba(255,69,0,0.3)',
              boxShadow: '0 0 20px rgba(255,69,0,0.4)',
            }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl text-left space-y-6 mb-16">
          <h2 className="text-3xl text-gray-900 md:text-5xl font-bold uppercase tracking-tight">
          <span className="text-transparent bg-clip-text bg-text-gradient-rapina">
            POR QUE ESCOLHER{" "}
          </span >  
            A RAPINA?
          </h2>
          <p className="text-xl text-gray-800">
            Todo negócio nasce de uma visão.
          </p>
          <p className="text-lg text-gray-800">
            Mas transformar essa visão em crescimento exige mais do que execução — exige estratégia, método e propósito.
          </p>
          <p className="text-lg text-gray-700">
            E nós do Grupo Rapina COM possuímos as melhores soluções para o seu modelo de negócio:
          </p>
        </div>
        
        {/* Cards lado a lado em telas maiores, empilhados no mobile, centralizados na div */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end justify-center gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.4, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`
                group relative
                ${feature.height}
                ${feature.width}
                rounded-2xl p-6 md:p-8
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
                  {feature.description.split('*').map((part, idx) => 
                    idx % 2 === 1 ? <em key={idx}>{part}</em> : part
                  )}
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
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-2xl md:text-3xl font-bold text-primary text-center">
                  {feature.price}
              </p>
            </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
