import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", email);
    setEmail("");
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">Join 50,000+ developers today</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Ready to start </span>
            <span className="text-primary glow-text">coding</span>
            <span className="text-foreground">?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Create your free account and join the most active developer community. No credit card required.
          </p>

          {/* Email signup form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-mono glow-box"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Free forever tier
            </span>
            <span>No credit card</span>
            <span>Setup in 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
