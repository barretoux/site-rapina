const Clients = () => {
  return (
    <section className="py-20 px-4" style={{
      background: "linear-gradient(180deg, hsl(0, 0%, 7%) 0%, hsl(0, 0%, 7%) 100%)",
    }}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
            QUEM ESTÁ COM A GENTE
          </h2>
          <p className="text-xl text-primary font-semibold">
            Join the Global Leaders Working With Us.
          </p>
          <p className="text-lg text-muted-foreground">
            Você e seu negócio cada vez mais alto!
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="text-4xl font-bold text-muted-foreground/20">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
