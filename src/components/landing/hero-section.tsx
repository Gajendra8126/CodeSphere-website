import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Zap } from "lucide-react";

const terminalLines = [
  { type: "command", text: "$ codesphere connect --community" },
  { type: "output", text: "Connecting to CodeSphere network..." },
  { type: "success", text: "Connected! 50,000+ developers online" },
  { type: "command", text: "$ codesphere challenge --start" },
  { type: "output", text: "Loading daily challenge..." },
  { type: "success", text: "Challenge ready: Binary Tree Traversal" },
];

const words = ["connect", "build", "compete", "grow"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [terminalIndex, setTerminalIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalIndex < terminalLines.length) {
      const timeout = setTimeout(() => {
        setTerminalIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setTerminalIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [terminalIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vertical scanning line */}
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-30 animate-pulse" style={{ left: '20%' }} />
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-20 animate-pulse" style={{ left: '80%', animationDelay: '1s' }} />
        
        {/* Horizontal lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-primary/10"
            style={{
              top: `${16.66 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary">
            <Zap className="w-4 h-4" />
            The developer community for hackers
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-foreground">Where developers</span>
            <span className="block">
              <span 
                key={wordIndex}
                className="inline-flex text-primary glow-text"
              >
                {words[wordIndex].split("").map((char, i) => (
                  <span
                    key={`${wordIndex}-${i}`}
                    className="inline-block animate-char-in"
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <p 
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Join 50,000+ developers sharing projects, solving challenges, 
              and climbing the leaderboard. Your code, your community.
            </p>
            
            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link to="/challenges">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded font-mono group glow-box"
              >
                Start Coding
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded font-mono border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                <Github className="w-4 h-4 mr-2" />
                Connect GitHub
              </Button>
            </div>
          </div>
          
          {/* Interactive Terminal */}
          <div 
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-card border border-primary/30 rounded-lg overflow-hidden glow-border">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/20 bg-card">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-chart-4" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">codesphere@terminal</span>
              </div>
              
              {/* Terminal content */}
              <div className="p-4 font-mono text-sm min-h-[200px] scanline">
                {terminalLines.slice(0, terminalIndex).map((line, i) => (
                  <div
                    key={i}
                    className={`mb-2 ${
                      line.type === "command" ? "text-foreground" :
                      line.type === "success" ? "text-primary" :
                      "text-muted-foreground"
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                {terminalIndex < terminalLines.length && (
                  <span className="text-primary terminal-cursor">_</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee - full width outside container */}
      <div 
        className={`absolute bottom-16 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "50K+", label: "Active Developers" },
                { value: "10K+", label: "Projects Shared" },
                { value: "500+", label: "Daily Challenges" },
                { value: "99%", label: "Community Satisfaction" },
              ].map((stat) => (
                <div key={`${stat.label}-${i}`} className="flex items-baseline gap-3">
                  <span className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
