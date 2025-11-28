import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo-grupo-rapina.png";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" || path === "/rapina") {
      return location.pathname === "/" || location.pathname === "/rapina";
    }
    return location.pathname === path;
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  const handleLinkClick = () => {
    setMobileOpen(false);
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
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-36" /> {/* mantendo espaçamento no desktop */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              className="md:hidden flex flex-col items-center justify-center gap-1 w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-sm hover:border-primary transition-colors"
            >
            <span
              className={`block w-5 h-[2px] bg-foreground transition duration-200 origin-center ${
                mobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-foreground transition duration-200 origin-center ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-foreground transition duration-200 origin-center ${
                mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-sm border-t border-border shadow-xl shadow-black/40 mt-1 z-40">
            <div className="flex flex-col space-y-2 px-6 py-4">
              <Link
                to="/rapina"
                onClick={handleLinkClick}
                className={`text-foreground hover:text-primary transition-colors font-semibold uppercase tracking-wide ${
                  isActive("/rapina") ? "text-primary" : ""
                }`}
              >
                A RAPINA
              </Link>
              <Link
                to="/solucoes"
                onClick={handleLinkClick}
                className={`text-foreground hover:text-primary transition-colors font-semibold uppercase tracking-wide ${
                  isActive("/solucoes") ? "text-primary" : ""
                }`}
              >
                SOLUÇÕES
              </Link>
              <Link
                to="/diagnostico"
                onClick={handleLinkClick}
                className={`text-foreground hover:text-primary transition-colors font-semibold uppercase tracking-wide ${
                  isActive("/diagnostico") ? "text-primary" : ""
                }`}
              >
                DIAGNÓSTICO
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
