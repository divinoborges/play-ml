const NUMBERS = [
  "0.87", "-1.23", "0.004", "1.99", "-0.07", "0.341", "2.18", "-0.56",
  "0.00", "1.00", "-1.00", "0.512", "-0.813", "0.029", "1.472", "-2.04",
  "0.99", "-0.14", "0.763", "-0.421", "3.14", "-0.008", "0.55", "1.23",
  "-1.87", "0.042", "0.901", "-0.333", "2.71", "-1.41", "0.618", "-0.25",
];

const CODE_SNIPPETS = [
  "model.fit", "X_train", ".predict()", "epoch 12", "loss: 0.34", "acc: 0.91",
];

const METRICS = [
  "accuracy: 0.94", "precision: 0.89", "recall: 0.92", "f1: 0.90",
  "auc: 0.97", "rmse: 0.12", "mae: 0.08", "r²: 0.86",
  "val_loss: 0.21", "val_acc: 0.88",
];

const PARTICLE_COUNT = 70;

// Pseudo-random but deterministic (SSR-safe)
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

type Particle = {
  text: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  drift: string;
};

function buildParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const r1 = rand(i + 1);
    const r2 = rand(i + 2);
    const r3 = rand(i + 3);
    const r4 = rand(i + 4);
    const r5 = rand(i + 5);

    // Sparse mix: ~10% code, ~12% metrics, rest numbers
    const pool =
      r5 < 0.1 ? CODE_SNIPPETS : r5 < 0.22 ? METRICS : NUMBERS;
    const text = pool[Math.floor(r1 * pool.length)];

    return {
      text,
      top: `${r2 * 100}%`,
      left: `${r3 * 100}%`,
      size: 11 + Math.floor(r4 * 8), // 11 – 18px
      opacity: 0.25 + r1 * 0.45,     // 0.25 – 0.70
      duration: 18 + r2 * 22,         // 18s – 40s
      delay: -r3 * 30,                // staggered start
      dx: (r4 - 0.5) * 120,           // -60 .. +60 px drift
      dy: (r5 - 0.5) * 120,
      drift: `drift-${i % 6}`,
    };
  });
}

export default function HeroBackdrop() {
  const particles = buildParticles();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden bg-black"
    >
      {/* Nebulous glow clouds */}
      <div className="hero-cloud hero-cloud--a absolute top-[10%] left-[15%] h-[30rem] w-[30rem] rounded-full bg-yellow-pop/15 blur-[120px]" />
      <div className="hero-cloud hero-cloud--b absolute top-[40%] right-[10%] h-[34rem] w-[34rem] rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="hero-cloud hero-cloud--c absolute bottom-[5%] left-[35%] h-[26rem] w-[26rem] rounded-full bg-yellow-pop/10 blur-[110px]" />

      {/* Drifting particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`hero-particle ${p.drift} absolute font-mono text-yellow-pop whitespace-nowrap`}
            style={{
              top: p.top,
              left: p.left,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              // @ts-expect-error custom CSS vars
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>

      {/* Contrast overlay — global subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Focused darkening behind the hero text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 80%)",
        }}
      />

      <style>{`
        @keyframes hero-drift-0 {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(var(--dx), var(--dy)); }
        }
        @keyframes hero-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          33%      { transform: translate(var(--dx), 0); }
          66%      { transform: translate(0, var(--dy)); }
        }
        @keyframes hero-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(calc(var(--dx) * -0.5), var(--dy)); }
          75%      { transform: translate(var(--dx), calc(var(--dy) * -0.5)); }
        }
        @keyframes hero-cloud-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes hero-cloud-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, 20px) scale(0.95); }
        }
        @keyframes hero-cloud-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(30px, 40px) scale(1.05); }
        }
        .hero-particle {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .drift-0 { animation-name: hero-drift-0; }
        .drift-1 { animation-name: hero-drift-1; }
        .drift-2 { animation-name: hero-drift-2; }
        .drift-3 { animation-name: hero-drift-0; animation-direction: reverse; }
        .drift-4 { animation-name: hero-drift-1; animation-direction: reverse; }
        .drift-5 { animation-name: hero-drift-2; animation-direction: reverse; }
        .hero-cloud--a { animation: hero-cloud-a 32s ease-in-out infinite; }
        .hero-cloud--b { animation: hero-cloud-b 38s ease-in-out infinite; }
        .hero-cloud--c { animation: hero-cloud-c 28s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-particle, .hero-cloud { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
