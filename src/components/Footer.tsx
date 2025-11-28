import { Link } from "react-router-dom";
import logo from "@/assets/logo-rapina.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

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
          const additionalOffset = 70;
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

  return (
    <footer className="bg-black py-12 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Logo and CTA Column */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Rapina Logo" className="h-36 w-36 object-contain" />
            </div>
            <Button 
              size="sm"
              className="uppercase px-6 py-3 rounded-full text-sm h-auto font-medium text-white
                bg-gradient-to-r from-primary to-destructive
                bg-[length:300%_100%] bg-[position:0%_0%]
                transition-[background-position,color,transform]
                duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                hover:bg-[position:100%_0%]
                hover:scale-105
                shadow-md hover:shadow-lg
              "
              onClick={scrollToLeadCapture}
            >
              <span className="relative z-10">FALE COM A GENTE</span>
            </Button>
          </div>

          {/* Nossos Contatos Column */}
          <div className="space-y-4 mt-4 md:mt-[0rem]">
            <h3 className="text-xl font-bold text-foreground text-black">Nossos Contatos</h3>
            <div className="space-y-2 text-sm text-foreground/80 text-black">
              <p>E-mail: <a
                href="mailto:rapinadigitalmedia@gmail.com"
                className="text-sm text-foreground/80 hover:text-primary transition-colors text-black"
              >
                rapinadigitalmedia@gmail.com
              </a></p>
              <p>Rua Doutor Vale, 24 - Moinhos de Vento, Porto Alegre, RS</p>
            </div>
          </div>

          {/* Navegação Column */}
          <div className="space-y-4 mt-4 md:mt-[0rem]">
            <h3 className="text-xl font-bold text-foreground text-black">Navegação</h3>
            <div className="space-y-2">
              <Link to="/rapina" className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black">
                A Rapina
              </Link>
              <Link to="/solucoes" className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black">
                Soluções
              </Link>
              <Link to="/diagnostico" className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black">
                Diagnóstico
              </Link>
            </div>
          </div>

          {/* Siga nos Column */}
          <div className="space-y-4 mt-4 md:mt-[0rem]">
            <h3 className="text-xl font-bold text-foreground text-black">Siga nos</h3>
            <div className="space-y-3 text-sm text-foreground/80 text-black">
              <div>
                <p className="font-semibold mb-1">Instagram:</p>
                <a
                  href="https://www.instagram.com/gruporapinacom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black"
                >
                  @gruporapinacom
                </a>
                <a
                  href="https://www.instagram.com/rapinamedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black"
                >
                  @rapinamedia
                </a>
                <a
                  href="https://www.instagram.com/rapinastudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black"
                >
                  @rapinastudios
                </a>
              </div>
              <div>
                <p className="font-semibold mb-1">Facebook:</p>
                <a
                  href="https://www.facebook.com/profile.php?id=61564274806143&locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors text-black"
                >
                  Rapina Media
                </a>
                <p>Grupo Rapina COM</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Linkedin:</p>
              </div>
              <div>
                <p className="font-semibold mb-1">X:</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Copyright and Legal */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/70 text-black">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/politicas-privacidade" className="hover:text-primary transition-colors">
                Políticas de Privacidade
              </Link>
              <Link to="/termos-condicoes" className="hover:text-primary transition-colors">
                Termos e Condições
              </Link>
            </div>
            <p>©2025 Desenvolvido por Grupo Rapina COM.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
