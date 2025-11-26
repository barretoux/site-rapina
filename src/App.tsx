import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Solucoes from "./pages/Solucoes";
import Diagnostico from "./pages/Diagnostico";
import PoliticasPrivacidade from "./pages/PoliticasPrivacidade";
import TermosCondicoes from "./pages/TermosCondicoes";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rapina" element={<Index />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/politicas-privacidade" element={<PoliticasPrivacidade />} />
          <Route path="/termos-condicoes" element={<TermosCondicoes />} />
          <Route path="/obrigado" element={<Obrigado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
