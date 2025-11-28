import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Scale, TrendingUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Solucoes = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função para calcular tamanho e posição da águia baseado no viewport
  const getEagleStyles = () => {
    if (windowWidth >= 1024) {
      // Desktop grande (>= 1024px)
      return {
        width: "210%",
        height: "210%",
        transform: "translate(0px, 200px)"
      };
    } else if (windowWidth >= 768) {
      // Tablet/Desktop (768-1024px)
      return {
        width: "190%",
        height: "190%",
        transform: "translate(0px, 150px)"
      };
    } else if (windowWidth >= 535) {
      // Tablet pequeno (535-768px)
      return {
        width: "170%",
        height: "170%",
        transform: "translate(0px, 100px)"
      };
    } else if (windowWidth >= 380) {
      // Mobile grande (380-535px)
      return {
        width: "140%",
        height: "140%",
        transform: "translate(0px, 50px)"
      };
    } else {
      // Mobile pequeno (< 380px)
      return {
        width: "120%",
        height: "120%",
        transform: "translate(0px, 50px)"
      };
    }
  };

  const eagleStyles = getEagleStyles();

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

  const solutions = [
    {
      icon: Scale,
      title: "Metodologia Balance",
      description: "Une estratégia inteligente, relacionamento autêntico e otimização de processos.",
      details: "Nossa metodologia proprietária combina visão estratégica, execução precisa e análise contínua de performance.",
      image: "./src/assets/metodo-balance.jpg"
    },
    {
      icon: Target,
      title: "Estratégia",
      description: "Tudo começa com a confecção de uma estratégia de topo de funil: atrair e gerar demanda qualificada com posicionamento.",
      details: "Desenvolvemos estratégias completas de posicionamento e atração de clientes qualificados para seu negócio.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      icon: MessageCircle,
      title: "Comunicação",
      description: "Meio de funil: construir relacionamento e brand equity (fortalecimento de vínculo com o cliente e ampliação do valor da marca na percepção do mercado).",
      details: "Desenvolvemos narrativas e conexões autênticas que fortalecem sua marca no mercado.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      icon: TrendingUp,
      title: "Conversão",
      description: "Gerar conversão, crescimento e recorrência (fundo do funil e resultados tangíveis).",
      details: "Otimizamos cada etapa do funil para maximizar conversões e criar receita recorrente.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
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
              className="max-w-4xl mx-auto text-center space-y-6 mb-20"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
              <span className="font-bold text-transparent bg-clip-text bg-text-gradient-rapina">NOSSAS </span>SOLUÇÕES
              </h1>
              <p className="text-md md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Transformamos visão em resultados através de estratégias integradas e execução com performance contínua.
              </p>
            </motion.div>

            <div className="space-y-10 sm:space-y-16 max-w-6xl mx-auto">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.4, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`grid lg:grid-cols-2 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-8 items ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="inline-flex p-4 rounded-xl bg-primary/10"
                    >
                      <solution.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase">
                      {solution.title}
                    </h2>
                    <p className="text-md md:text-lg lg:text-xl text-foreground/90">
                      {solution.description}
                    </p>
                    <p className="text-sm md:text-md lg:text-lg text-muted-foreground leading-relaxed">
                      {solution.details}
                    </p>
                    <Button variant="hero" size="sm" className="rounded-full px-6 py-3 text-sm">
                      SAIBA MAIS
                    </Button>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`${index % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover rounded-2xl shadow-xl shadow-primary/10"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40 px-4 bg-card/30 relative overflow-visible">
          {/* Background SVG - Águia */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.25 }}>
            <div className="flex items-center justify-center h-full w-full">
              <svg 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                x="0px"
                y="0px"
                width={eagleStyles.width}
                height={eagleStyles.height}
                viewBox="0 0 800 800" 
                preserveAspectRatio="xMidYMid meet"
                xmlSpace="preserve"
                style={{ 
                  transform: eagleStyles.transform
                }}
              >
              <style type="text/css">
                {`
                  .st0{fill:#7E91C1;}
                  .st1{fill:#E2E1C9;}
                  .st2{fill:#4A6DA0;}
                  .st3{fill:#4B6387;}
                  .st4{fill:#E8E8DA;}
                  .st5{display:inline;fill:#895F58;}
                  .st6{fill:#858936;}
                  .st7{fill:#B5AC6D;}
                  .st8{fill:#EADDCE;}
                  .st9{fill:#EFEFED;}
                  .st10{fill:#526386;}
                  .st11{fill:#BAA393;}
                  .st12{fill:#BBBCAC;}
                  .st13{fill:#BCB48B;}
                  .st14{fill:#234582;}
                  .st15{display:inline;fill-rule:evenodd;clip-rule:evenodd;fill:#895F58;}
                  .st16{fill:#F9C900;}
                  .st17{fill:#927E48;}
                  .st18{fill:#978139;}
                  .st19{fill:#C6B6AC;}
                  .st20{fill:#2D52A0;}
                  .st21{fill:#99AAC6;}
                  .st22{fill:#FCFBE0;}
                  .st23{fill:#FEF8CB;}
                  .st24{fill:#FEFFF3;}
                  .st25{fill:#FFA748;}
                  .st26{fill:#FFD385;}
                  .st27{fill:#FFD629;}
                  .st28{fill:#FFD748;}
                  .st29{fill:#FFDEA9;}
                  .st30{fill:#FFE473;}
                  .st31{fill:#FFEEA6;}
                  .st32{fill:#68768E;}
                  .st33{fill:#CCCDC6;}
                  .st34{display:inline;}
                  .st35{fill:#CEC089;}
                  .st36{fill:#CEC27A;}
                  .st37{fill:#D3C8C2;}
                  .st38{display:none;fill:#BAA393;}
                  .st39{fill:#D6D7D8;}
                  .st40{fill:#717BC6;}
                  .st41{display:none;}
                  .st42{fill:#A49A4E;}
                  .st43{fill:#777FA0;}
                  .st44{fill:#A89282;}
                  .st45{fill:#DEB501;}
                `}
              </style>
              <g>
                <rect className="st38" width="800" height="800"/>
                <g className="st41">
                  <image style={{display:"inline",overflow:"visible",opacity:0.75}} width="2057" height="2571" xlinkHref="FADD11A5.png" transform="matrix(0.24 0 0 0.24 155.1914 111.6699)"/>
                  <g className="st34">
                    <path className="st21" d="M614.3,529.8v-63l-14.9-81.8l-11.2-122.4l-25.2-61.8l-22.5-31.7l-22.5-13.9l-39.2-21.7l-48-7.7H400h-30.7l-48,7.7l-39.2,21.7l-22.5,13.9l-22.5,31.7l-25.2,61.8l-11.2,122.4l-14.9,81.8v63l-11.5,50.5l17.9,27.4l24.9-6.5l24.4,36.1l12.4-26.9l11.4,46.9l25.4-31.1l17.8,46l28.2-77L320,640.4l48.2,60.3l31.7-20.6l31.7,20.6l48.2-60.3l-16.6-45.2l28.2,77l17.8-46l25.4,31.1l11.4-46.9l12.4,26.9l24.4-36.1l24.9,6.5l17.9-27.4L614.3,529.8z M503.8,287.1L503.8,287.1l0.5,11.6L503.8,287.1z M518.5,226.4C518.5,226.4,518.5,226.3,518.5,226.4L518.5,226.4L518.5,226.4z M484,281.7L484,281.7l-11.1,4.2l-30.1,11.4L484,281.7l-17-4.7L484,281.7z M357.2,297.3L327,285.9l-11.1-4.2l0,0l17-4.7l-17,4.7L357.2,297.3z M281.5,226.3C281.5,226.3,281.5,226.3,281.5,226.3L281.5,226.3L281.5,226.3z M296.1,287.2L296.1,287.2l-0.4,11.5L296.1,287.2z M379.4,300.5l-4-28.6l7.8,55.8L379.4,300.5z M424.6,271.9l-4,28.6l-3.8,27.2L424.6,271.9z M549.4,256.1l-8.9,31l18.2-63.2L549.4,256.1z M518.7,264.1l10.5-27.6l5.4-14.3L518.7,264.1z M501.8,205.1c0,0-0.1,0-0.1,0c-0.2,0-0.3,0-0.3,0h0c0,0,0,0,0,0L501.8,205.1L501.8,205.1z M497.7,206.2C497.7,206.2,497.7,206.2,497.7,206.2l-25.9,7.1L497.7,206.2z M296.7,205.1c-0.1,0-0.1,0-0.2,0l0.1-0.1L296.7,205.1z M270.8,236.5l10.5,27.6l-15.9-41.9L270.8,236.5z M250.6,256.1l-9.3-32.2l18.2,63.2L250.6,256.1z"/>
                  </g>
                </g>
                {/* SVG completo da águia */}
                <g>
                  <path className="st30" d="M523.5,171.5c-0.9-1-2.1-0.4-2.5,0.6c-7.5-5.1-13.6,2.8-14.8,10.4c-0.9,5.8,1,15.2,7.9,16.5c5.5,1,10.4-3.8,12.6-8.4C529.9,184.1,528.2,176.9,523.5,171.5z M524.4,188c-1.2,3.6-4.2,7.1-8.1,7.9c-5,1-6.6-5.7-7.1-9.2c-0.7-5.5,3.7-17.4,10.6-11.5c0.8,0.7,1.8,0.4,2.4-0.2C525,178.8,526,183.4,524.4,188z"/>
                  <path className="st30" d="M274.9,190.6c2.2,4.5,7.1,9.4,12.6,8.4c6.9-1.3,8.8-10.7,7.9-16.5c-1.2-7.6-7.3-15.6-14.8-10.4c-0.4-1-1.6-1.6-2.5-0.6C273.4,176.9,271.7,184.1,274.9,190.6z M279.4,175c0.5,0.6,1.5,0.9,2.4,0.2c7-5.9,11.3,6,10.6,11.5c-0.4,3.5-2.1,10.3-7.1,9.2c-3.8-0.8-6.9-4.3-8.1-7.9C275.6,183.4,276.5,178.8,279.4,175z"/>
                  <polygon className="st45" points="400.8,310.5 421.5,308.8 400.8,374.1"/>
                  <polygon className="st28" points="421.5,308.8 400.8,240 400.8,310.5"/>
                  <polygon className="st16" points="421.5,308.8 431.2,240 400.8,240"/>
                  <polygon className="st4" points="526.1,157.6 546.2,96 489.3,167.7"/>
                  <polygon className="st7" points="431.2,240 453.6,271.3 426.2,275.3"/>
                  <polygon className="st13" points="453.6,271.3 441.3,209.1 431.2,240"/>
                  <polygon className="st26" points="412.9,187 431.2,240 400.8,200.7"/>
                  <polygon className="st29" points="412.9,187 400.8,183.8 400.8,200.7"/>
                  <polyline className="st25" points="441.3,209.1 431.2,240 412.9,187 434.3,186.8"/>
                  <polygon className="st25" points="434.3,186.8 451.7,170.5 453.6,209.1 441.3,209.1"/>
                  <path className="st3" d="M434.3,186.8c0,0-3.6,18.2,7,22.4C441.3,209.1,449.7,200.6,434.3,186.8z"/>
                  <polygon className="st27" points="431.2,240 400.8,200.7 400.8,240"/>
                  <polygon className="st16" points="441.3,209.1 453.6,271.3 453.6,209.1"/>
                  <polygon className="st28" points="412.9,187 400.8,161.8 434.3,186.8"/>
                  <polygon className="st30" points="400.8,161.8 400.8,142.6 424.1,142.6"/>
                  <polygon className="st16" points="400.8,161.8 451.7,170.5 434.3,186.8"/>
                  <polygon className="st27" points="424.1,142.6 451.7,170.5 400.8,161.8"/>
                  <polygon className="st30" points="400.8,161.8 412.9,187 400.8,183.8"/>
                  <polygon className="st30" points="529.4,273 515.4,262.9 483.5,271.3"/>
                  <polygon className="st27" points="529.4,273 528.8,258.5 515.4,262.9"/>
                  <polygon className="st27" points="515.4,262.9 490.8,257.2 483.5,271.3"/>
                  <polygon className="st16" points="515.4,262.9 504.4,252.1 490.8,257.2"/>
                  <polygon className="st25" points="453.6,271.3 483.5,246.3 453.6,240"/>
                  <polygon className="st42" points="453.6,271.3 421.5,308.8 426.2,275.3"/>
                  <polygon className="st17" points="453.6,271.3 451.7,296.5 421.5,308.8"/>
                  <polygon className="st6" points="453.6,271.3 483.5,302.1 451.7,296.5"/>
                  <polygon className="st42" points="453.6,271.3 483.5,271.3 483.5,302.1"/>
                  <polygon className="st36" points="483.5,271.3 490.8,257.2 453.6,271.3"/>
                  <polygon className="st45" points="453.6,271.3 504.4,252.1 483.5,246.3"/>
                  <polygon className="st45" points="515.4,262.9 504.4,252.1 528.8,258.5"/>
                  <polygon className="st35" points="483.5,246.3 451.7,170.5 453.6,240"/>
                  <polygon className="st24" points="400.8,142.6 438.6,59.7 400.8,59.7"/>
                  <polygon className="st24" points="438.6,59.7 492.2,111.2 424.1,142.6"/>
                  <polygon className="st22" points="492.2,111.2 451.7,170.5 424.1,142.6"/>
                  <polygon className="st22" points="438.6,59.7 424.1,142.6 400.8,142.6"/>
                  <polygon className="st22" points="492.2,111.2 497.8,69.2 546.2,96"/>
                  <polygon className="st9" points="546.2,96 451.7,170.5 492.2,111.2"/>
                  <polygon className="st9" points="492.2,111.2 438.6,59.7 497.8,69.2"/>
                  <polygon className="st4" points="546.2,96 601.7,152.2 573.9,113.2"/>
                  <polygon className="st1" points="489.3,167.7 451.7,170.5 546.2,96"/>
                  <polygon className="st39" points="546.2,96 526.1,157.6 601.7,152.2"/>
                  <polygon className="st1" points="601.7,152.2 596.4,180.8 632.8,228.4"/>
                  <polygon className="st1" points="632.8,228.4 585,220.5 573.9,258.8"/>
                  <polygon className="st31" points="573.9,258.8 547.1,230.4 528.3,242.5"/>
                  <polygon className="st37" points="585,220.5 596.4,180.8 632.8,228.4"/>
                  <polygon className="st8" points="528.3,242.5 529.4,273 573.9,258.8"/>
                  <polygon className="st8" points="547.1,230.4 596.4,180.8 573.9,258.8"/>
                  <polygon className="st37" points="547.1,230.4 566.8,178.7 596.4,180.8"/>
                  <polygon className="st37" points="566.8,178.7 526.1,157.6 601.7,152.2"/>
                  <polygon className="st37" points="528.3,242.5 501.5,216 483.5,246.3"/>
                  <polygon className="st19" points="528.3,242.5 528.9,258.8 483.5,246.3"/>
                  <polygon className="st19" points="501.5,216 547.1,230.4 546.9,183.8"/>
                  <polygon className="st19" points="451.7,170.5 486.1,188.8 483.5,246.3"/>
                  <polygon className="st12" points="486.1,188.8 501.5,216 483.5,246.3"/>
                  <polygon className="st12" points="547.1,230.4 501.5,216 528.3,242.5"/>
                  <polygon className="st12" points="546.9,183.8 560,196.4 547.1,230.4"/>
                  <polygon className="st12" points="566.8,178.7 601.7,152.2 596.4,180.8"/>
                  <polygon className="st7" points="560,196.4 546.9,183.8 566.8,178.7"/>
                  <polygon className="st44" points="489.3,167.7 486.1,188.8 451.7,170.5"/>
                  <polygon className="st44" points="546.9,183.8 531,158.4 566.8,178.7"/>
                  <g>
                    <path className="st28" d="M486.1,189.7c0,0,4.5,22.8,22.9,31c18.3,8.2,41.7-4.5,37.7-38.3L486.1,189.7z"/>
                    <path className="st14" d="M525.7,157.7l-36.4,10c0,0-16.9,28.3,18.1,42.9c11.5,4.8,40.1,4.9,39.4-26C546.2,154.5,525.7,157.7,525.7,157.7z"/>
                    <g>
                      <path className="st18" d="M519.8,175.1c11.5-1.5,22.2,4.8,26.8,14.8c0.4-2.4,0.5-5,0.1-7.5c-1.3-9.7-7.8-21.1-16.4-24.3c-3.8-1.5-8.4,0.5-12.5,2.3c-13.1,5.8-24.5,12.4-22.1,28.8c0.4,2.6,1.1,5,2.1,7.2C499.6,185.5,508.3,176.6,519.8,175.1z"/>
                      <path className="st30" d="M524.6,211.1c11.5-1.5,20.2-10.4,22-21.3c-4.6-10-15.3-16.3-26.8-14.8c-11.5,1.5-20.2,10.4-21.9,21.3C502.4,206.4,513.1,212.7,524.6,211.1z"/>
                    </g>
                    <ellipse transform="matrix(-0.9912 0.1325 -0.1325 -0.9912 1059.6248 297.5547)" className="st14" cx="519.9" cy="184" rx="9.5" ry="12.7"/>
                  </g>
                  {/* Lado esquerdo da águia */}
                  <polygon className="st45" points="400.8,310.5 380,308.8 400.8,374.1"/>
                  <polygon className="st28" points="380,308.8 400.8,240 400.8,310.5"/>
                  <polygon className="st16" points="380,308.8 370.4,240 400.8,240"/>
                  <polygon className="st4" points="273.2,157.6 255.4,96 312.2,167.7"/>
                  <polygon className="st7" points="370.4,240 348,271.3 375.4,275.3"/>
                  <polygon className="st13" points="348,271.3 360.2,209.1 370.4,240"/>
                  <polygon className="st26" points="388.7,187 370.4,240 400.8,200.7"/>
                  <polygon className="st29" points="388.7,187 400.8,183.8 400.8,200.7"/>
                  <polyline className="st25" points="360.2,209.1 370.4,240 388.7,187 367.3,186.8"/>
                  <polygon className="st25" points="367.3,186.8 349.9,170.5 348,209.1 360.2,209.1"/>
                  <path className="st3" d="M367.3,186.8c0,0,3.6,18.2-7,22.4C360.2,209.1,351.9,200.6,367.3,186.8z"/>
                  <polygon className="st27" points="370.4,240 400.8,200.7 400.8,240"/>
                  <polygon className="st16" points="360.2,209.1 348,271.3 348,209.1"/>
                  <polygon className="st28" points="388.7,187 400.8,161.8 367.3,186.8"/>
                  <polygon className="st30" points="400.8,161.8 400.8,142.6 377.4,142.6"/>
                  <polygon className="st16" points="400.8,161.8 349.9,170.5 367.3,186.8"/>
                  <polygon className="st27" points="377.4,142.6 349.9,170.5 400.8,161.8"/>
                  <polygon className="st30" points="400.8,161.8 388.7,187 400.8,183.8"/>
                  <polygon className="st30" points="272.1,273 286.2,262.9 318.1,271.3"/>
                  <polygon className="st27" points="272.1,273 272.8,258.5 286.2,262.9"/>
                  <polygon className="st27" points="286.2,262.9 310.8,257.2 318.1,271.3"/>
                  <polygon className="st16" points="286.2,262.9 297.2,252.1 310.8,257.2"/>
                  <polygon className="st25" points="348,271.3 318.1,246.3 348,240"/>
                  <polygon className="st42" points="348,271.3 380,308.8 375.4,275.3"/>
                  <polygon className="st17" points="348,271.3 349.9,296.5 380,308.8"/>
                  <polygon className="st6" points="348,271.3 318.1,302.1 349.9,296.5"/>
                  <polygon className="st42" points="348,271.3 318.1,271.3 318.1,302.1"/>
                  <polygon className="st36" points="318.1,271.3 310.8,257.2 348,271.3"/>
                  <polygon className="st45" points="348,271.3 297.2,252.1 318.1,246.3"/>
                  <polygon className="st45" points="286.2,262.9 297.2,252.1 272.8,258.5"/>
                  <polygon className="st35" points="318.1,246.3 349.9,170.5 348,240"/>
                  <polygon className="st24" points="400.8,142.6 362.9,59.7 400.8,59.7"/>
                  <polygon className="st24" points="362.9,59.7 309.4,111.2 377.4,142.6"/>
                  <polygon className="st22" points="309.4,111.2 349.9,170.5 377.4,142.6"/>
                  <polygon className="st22" points="362.9,59.7 377.4,142.6 400.8,142.6"/>
                  <polygon className="st22" points="309.4,111.2 303.7,69.2 255.4,96"/>
                  <polygon className="st9" points="255.4,96 349.9,170.5 309.4,111.2"/>
                  <polygon className="st9" points="309.4,111.2 362.9,59.7 303.7,69.2"/>
                  <polygon className="st4" points="255.4,96 199.9,152.2 227.6,113.2"/>
                  <polygon className="st1" points="312.2,167.7 349.9,170.5 255.4,96"/>
                  <polygon className="st39" points="255.4,96 273.2,157.6 199.9,152.2"/>
                  <polygon className="st1" points="199.9,152.2 205.2,180.8 168.8,228.4"/>
                  <polygon className="st1" points="168.8,228.4 216.6,220.5 227.6,258.8"/>
                  <polygon className="st31" points="227.6,258.8 254.5,230.4 273.2,242.5"/>
                  <polygon className="st37" points="216.6,220.5 205.2,180.8 168.8,228.4"/>
                  <polygon className="st8" points="273.2,242.5 272.1,273 227.6,258.8"/>
                  <polygon className="st8" points="254.5,230.4 205.2,180.8 227.6,258.8"/>
                  <polygon className="st37" points="254.5,230.4 234.8,178.7 205.2,180.8"/>
                  <polygon className="st37" points="234.8,178.7 273.2,157.6 199.9,152.2"/>
                  <polygon className="st37" points="273.2,242.5 300.1,216 318.1,246.3"/>
                  <polygon className="st19" points="273.2,242.5 272.6,258.8 318.1,246.3"/>
                  <polygon className="st19" points="300.1,216 254.5,230.4 254.7,183.8"/>
                  <polygon className="st19" points="349.9,170.5 315.5,188.8 318.1,246.3"/>
                  <polygon className="st12" points="315.5,188.8 300.1,216 318.1,246.3"/>
                  <polygon className="st12" points="254.5,230.4 300.1,216 273.2,242.5"/>
                  <polygon className="st12" points="254.7,183.8 241.5,196.4 254.5,230.4"/>
                  <polygon className="st12" points="234.8,178.7 199.9,152.2 205.2,180.8"/>
                  <polygon className="st7" points="241.5,196.4 254.7,183.8 234.8,178.7"/>
                  <polygon className="st44" points="312.2,167.7 315.5,188.8 349.9,170.5"/>
                  <polygon className="st44" points="254.7,183.8 265.1,162.1 234.8,178.7"/>
                  <g>
                    <path className="st28" d="M315.5,189.7c0,0-4.5,22.8-22.9,31c-18.3,8.2-41.7-4.5-37.7-38.3L315.5,189.7z"/>
                    <path className="st14" d="M275.7,157.7l36.5,10c0,0,16.9,28.3-18.1,42.9c-11.5,4.8-40.1,4.9-39.4-26C255.4,155.6,275.7,157.7,275.7,157.7z"/>
                    <g>
                      <path className="st18" d="M281.8,175.1c-11.5-1.5-22.2,4.8-26.8,14.8c-0.4-2.4-0.5-5-0.1-7.5c1.3-9.7,7.8-21.1,16.4-24.3c3.8-1.4,9.1,0.7,12.5,2.3c12.8,6,24.6,12.4,22.1,28.8c-0.4,2.6-1.1,5-2.1,7.2C302,185.5,293.3,176.6,281.8,175.1z"/>
                      <path className="st30" d="M277,211.1c-11.5-1.5-20.2-10.4-22-21.3c4.6-10,15.3-16.3,26.8-14.8c11.5,1.5,20.2,10.4,21.9,21.3C299.2,206.4,288.5,212.7,277,211.1z"/>
                    </g>
                    <ellipse transform="matrix(0.9912 0.1325 -0.1325 0.9912 26.8756 -35.7053)" className="st14" cx="281.7" cy="184" rx="9.5" ry="12.7"/>
                  </g>
                </g>
              </g>
            </svg>
            </div>
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-8">
              QUAL É A URGÊNCIA <br /> EM ALAVANCAR <span className="font-bold text-transparent bg-clip-text bg-text-gradient-rapina">SEUS RESULTADOS</span>?
            </h2>
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
                transform: windowWidth < 535 ? 'scale(0.8)' : undefined
              }}
            >
              MARQUE UM{windowWidth < 419 ? <br /> : ' '}DIAGNÓSTICO GRATUITO
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solucoes;
