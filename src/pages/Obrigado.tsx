import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const Obrigado = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-16 pt-24">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Ícone de sucesso com luz piscando */}
            <div className="relative mt-10 mx-auto w-32 h-32 flex items-center justify-center">
              {/* Luz piscando atrás do check - mais suave */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-green-500 blur-xl"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.25, 0.1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className="absolute inset-0 rounded-full bg-green-400 blur-2xl"
              />
              
              {/* Check com animação */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10 w-24 h-24 rounded-full bg-green-500/20 backdrop-blur-sm border-2 border-green-500/30 flex items-center justify-center shadow-lg"
              >
                <svg
                  className="w-12 h-12 text-green-500 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              Obrigado!
            </motion.h1>

            {/* Mensagem */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-xl text-muted-foreground">
                Recebemos seus dados com sucesso!
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Em até 24h um <span className="font-bold text-transparent bg-clip-text bg-text-gradient-rapina">especialista do Grupo Rapina COM</span> entrará em contato para marcar uma reunião online de diagnóstico da sua empresa (somente em dias úteis, das 8h às 18h). Para acelerar o seu atendimento, toque no botão abaixo e chame-nos diretamente pelo WhatsApp.
              </p>
            </motion.div>

            {/* Botão CTA com ícone WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6 flex justify-center"
            >
              <Button
                onClick={() => window.open("https://w.app/gruporapina", "_blank", "noopener,noreferrer")}
                size="lg"
                className="
                  uppercase px-6 py-3 text-sm h-auto font-medium
                  text-white
                  bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54]
                  bg-[length:300%_100%] bg-[position:0%_0%]
                  transition-[background-position,color,transform]
                  duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  hover:bg-[position:100%_0%]
                  hover:scale-105
                  shadow-md hover:shadow-lg
                  flex items-center gap-2
                  mx-auto
                "
              >
                <img 
                  src={whatsappIcon} 
                  alt="WhatsApp" 
                  className="w-5 h-5 object-contain"
                />
                Fale agora com nosso time
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Obrigado;



