import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LeadCapture from "@/components/LeadCapture";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <LeadCapture />
          <Services />
          <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
