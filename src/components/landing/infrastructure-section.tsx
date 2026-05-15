import { useEffect, useState, useRef } from "react";
import { Terminal, Code2, Cpu, Zap, GitBranch, Cloud } from "lucide-react";

const techStack = [
  { icon: Terminal, name: "CLI Tools", description: "Powerful command-line interface for all operations" },
  { icon: Code2, name: "API Access", description: "RESTful and GraphQL APIs with full documentation" },
  { icon: Cpu, name: "WebSocket", description: "Real-time updates and live collaboration features" },
  { icon: GitBranch, name: "Git Integration", description: "Seamless GitHub, GitLab, and Bitbucket sync" },
  { icon: Cloud, name: "Cloud Deploy", description: "One-click deployment to any cloud provider" },
  { icon: Zap, name: "Webhooks", description: "Event-driven automation and notifications" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const allLines = [
    "$ codesphere init my-project",
    "Creating project structure...",
    "Installing dependencies...",
    "$ codesphere deploy --prod",
    "Building application...",
    "Deploying to edge network...",
    "Live at: https://my-project.codesphere.dev",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < allLines.length) {
        setTerminalLines(prev => [...prev, allLines[index]]);
        index++;
      } else {
        setTerminalLines([]);
        index = 0;
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <Terminal className="w-4 h-4" />
            Developer Tools
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Built for </span>
            <span className="text-primary glow-text">developers</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Powerful CLI, comprehensive APIs, and seamless integrations. Everything you need to build and ship faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Terminal Preview */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card border border-primary/30 rounded-lg overflow-hidden glow-border">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-chart-4" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">codesphere-cli</span>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm min-h-[280px] scanline">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`mb-2 ${
                      line?.startsWith("$") ? "text-foreground" :
                      line?.startsWith("Live") ? "text-primary" :
                      "text-muted-foreground"
                    }`}
                  >
                    {line}
                  </div>
                ))}
                <span className="text-primary terminal-cursor">_</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={`p-5 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <tech.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
