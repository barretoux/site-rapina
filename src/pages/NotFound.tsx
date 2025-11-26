import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold uppercase">Página não encontrada</h2>
        <p className="text-xl text-muted-foreground">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Button variant="hero" size="lg" asChild className="rounded-full">
          <a href="/">
            <Home className="mr-2 h-5 w-5" />
            VOLTAR PARA HOME
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
