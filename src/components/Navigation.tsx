import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-grupo-rapina.png";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" || path === "/rapina") {
      return location.pathname === "/" || location.pathname === "/rapina";
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/rapina" className="flex items-center">
            <img src={logo} alt="Grupo Rapina Logo" className="w-32 h-auto object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              to="/rapina" 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-2 relative ${
                isActive("/rapina") ? "border-b-2 border-red-500" : ""
              }`}
            >
              A RAPINA
            </Link>
            <Link 
              to="/solucoes" 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-2 relative ${
                isActive("/solucoes") ? "border-b-2 border-red-500" : ""
              }`}
            >
              SOLUÇÕES
            </Link>
            <Link 
              to="/diagnostico" 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-2 relative ${
                isActive("/diagnostico") ? "border-b-2 border-red-500" : ""
              }`}
            >
              DIAGNÓSTICO
            </Link>
          </div>
          
          <div className="w-36" /> {/* Spacer para manter logo centralizado */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
