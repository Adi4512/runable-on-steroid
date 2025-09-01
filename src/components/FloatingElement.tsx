import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingElements = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 8,
          duration: Math.random() * 10 + 15,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-float blur-xl" style={{ animationDelay: '4s' }} />
      

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-accent rounded-full animate-drift"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}


      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-pulse" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
      

      <div className="absolute top-1/3 right-10 w-6 h-6 border border-accent/40 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-1/3 left-10 w-4 h-4 bg-primary/30 animate-bounce-slow" />
    </div>
  );
};

export default FloatingElements;