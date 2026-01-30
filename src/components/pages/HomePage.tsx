

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Welcome to ShopApp
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Experience the power of Single Page Applications (SPA) with React Router v6.
          <br className="hidden md:block" />
          Smooth transitions, no reloads, and clean code.
        </p>
      </div>

      <div className="relative group w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&h=400"
          alt="Modern Shop Interior"
          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    </div>
  );
}

export default HomePage;
