export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid radial-fade opacity-60" />
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-ai-violet opacity-25 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-ai-cyan opacity-20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-ai-pink opacity-20 blur-3xl animate-blob [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
