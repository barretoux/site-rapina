import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Forçar scroll imediato para o topo absoluto (sem animação)
    // Múltiplas chamadas para garantir que funcione
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Se há hash, após garantir que está no topo, faz scroll suave para o elemento
    if (hash) {
      const elementId = hash.substring(1);
      // Delay para garantir que o DOM está pronto
      const scrollTimeoutId = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // Calcula offset para compensar navbar fixa
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
      
      // Após 5 segundos, remove o hash da URL silenciosamente sem causar scroll
      const removeHashTimeoutId = setTimeout(() => {
        if (hash && window.location.hash) {
          // Remove o hash usando history.replaceState para não causar scroll
          window.history.replaceState(null, '', pathname);
        }
      }, 5000);
      
      return () => {
        clearTimeout(scrollTimeoutId);
        clearTimeout(removeHashTimeoutId);
      };
    }
  }, [pathname, hash, navigate]);

  // Garantir scroll no mount inicial e após renderização completa
  useEffect(() => {
    // Scroll imediato no mount
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Também após um pequeno delay para garantir
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // E após o DOM estar completamente carregado
    const handleLoad = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
};

export default ScrollToTop;

