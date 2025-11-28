import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Diagnostico = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToLeadCapture = () => {
    navigate("/rapina#lead-capture");
  
    // Aguarda a navegação completar e o DOM atualizar
    setTimeout(() => {
      const scrollToElement = () => {
      const element = document.getElementById("lead-capture");
      if (element) {
          // Calcula a altura da navegação fixa dinamicamente
          const nav = document.querySelector("nav");
          const navHeight = nav ? nav.offsetHeight : 80;
          
          // Offset adicional maior para garantir que não corte (60px de espaçamento)
          const additionalOffset = 60;
          const totalOffset = navHeight + additionalOffset;
          
          // Calcula a posição considerando o offset
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const y = elementTop - totalOffset;
    
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        } else {
          // Se o elemento ainda não estiver disponível, tenta novamente
          setTimeout(scrollToElement, 50);
      }
      };
      
      scrollToElement();
    }, 300);
  };
  
  const benefits = [
    "Análise completa do seu modelo de negócio",
    "Identificação de oportunidades de crescimento",
    "Mapeamento do funil de vendas atual",
    "Recomendações estratégicas personalizadas",
    "Plano de ação para os próximos 90 dias",
    "Análise de posicionamento e comunicação"
  ];

  const steps = [
    {
      icon: Calendar,
      title: "1. Agende",
      description: "Escolha o melhor horário para sua agenda"
    },
    {
      icon: MessageSquare,
      title: "2. Conversamos",
      description: "Bate-papo de 30 a 45 minutos sobre seu negócio"
    },
    {
      icon: CheckCircle2,
      title: "3. Receba o Plano",
      description: "Diagnóstico completo e estratégias aplicáveis"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0.5, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center space-y-8 mb-20"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
                DIAGNÓSTICO <span className="text-transparent bg-clip-text bg-text-gradient-rapina">GRATUITO</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/90">
                Descubra como acelerar o crescimento do seu negócio
              </p>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Agende uma conversa estratégica de 30 a 45 minutos onde vamos mapear as principais oportunidades de crescimento para o seu negócio.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0.4, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-16"
              >
                <h2 className="text-3xl font-bold mb-8 text-center uppercase">
                  O que você vai receber:
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground/90">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0.5, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase"
              >
                Como funciona
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.4, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center space-y-4 bg-card border border-border rounded-2xl p-8 hover:border-primary transition-all"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="inline-flex p-4 rounded-xl bg-primary/10"
                    >
                      <step.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0.4, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/10 to-destructive/10 rounded-3xl p-8 sm:p-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                  Pronto para começar?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Agende agora seu diagnóstico gratuito e descubra como podemos acelerar seus resultados.
                </p>
                <Button 
              variant="hero"
              size="sm"
              onClick={scrollToLeadCapture}
              className="
                px-6 py-3 text-sm h-auto rounded-full font-medium
                text-white
                bg-gradient-to-r from-[#F67941] via-[#FF3C00] to-[#F67941]
                bg-[length:300%_100%] bg-[position:0%_0%]
                transition-[background-position,color,transform]
                duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                hover:bg-[position:100%_0%]
                hover:scale-105
                shadow-md hover:shadow-lg
              "

              style={{
                // Combina as duas condições em uma única propriedade 'transform'
                transform: windowWidth < 389 
                    ? 'scale(0.7)' // Se windowWidth for menor que 389
                    : windowWidth < 535 
                        ? 'scale(0.8)' // Senão, se windowWidth for menor que 535
                        : undefined // Senão, não aplica transformação
            }}
                >
                  AGENDAR{windowWidth < 489 ? <br /> : ' '}DIAGNÓSTICO GRATUITO
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Diagnostico;
