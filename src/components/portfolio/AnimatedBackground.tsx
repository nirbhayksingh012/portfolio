export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid radial-fade opacity-30" />
      
      {/* Black & white geometric shapes with subtle animations */}
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-foreground opacity-5 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-foreground opacity-4 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-foreground opacity-3 blur-3xl animate-blob [animation-delay:-12s]" />
      
      {/* Animated lines/accents */}
      <div className="absolute top-20 left-10 h-px w-32 bg-gradient-to-r from-foreground/20 via-foreground/5 to-transparent animate-slideIn" />
      <div className="absolute bottom-32 right-20 h-px w-40 bg-gradient-to-l from-foreground/20 via-foreground/5 to-transparent animate-slideInRight" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
