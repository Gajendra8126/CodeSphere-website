import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const sectionRef = useRef(null);
    const [terminalLines, setTerminalLines] = useState([]);
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
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting)
                setIsVisible(true);
        }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!isVisible)
            return;
        let index = 0;
        const interval = setInterval(() => {
            if (index < allLines.length) {
                setTerminalLines(prev => [...prev, allLines[index]]);
                index++;
            }
            else {
                setTerminalLines([]);
                index = 0;
            }
        }, 800);
        return () => clearInterval(interval);
    }, [isVisible]);
    return (_jsx("section", { ref: sectionRef, className: "relative py-24 lg:py-32 border-t border-border overflow-hidden", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-16", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Terminal, { className: "w-4 h-4" }), "Developer Tools"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Built for " }), _jsx("span", { className: "text-primary glow-text", children: "developers" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Powerful CLI, comprehensive APIs, and seamless integrations. Everything you need to build and ship faster." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [_jsx("div", { className: `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: _jsxs("div", { className: "bg-card border border-primary/30 rounded-lg overflow-hidden glow-border", children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-destructive" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-chart-4" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "ml-4 font-mono text-xs text-muted-foreground", children: "codesphere-cli" })] }), _jsxs("div", { className: "p-6 font-mono text-sm min-h-[280px] scanline", children: [terminalLines.map((line, i) => (_jsx("div", { className: `mb-2 ${line?.startsWith("$") ? "text-foreground" :
                                                    line?.startsWith("Live") ? "text-primary" :
                                                        "text-muted-foreground"}`, children: line }, i))), _jsx("span", { className: "text-primary terminal-cursor", children: "_" })] })] }) }), _jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: techStack.map((tech, index) => (_jsxs("div", { className: `p-5 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, children: [_jsx(tech.icon, { className: "w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "font-semibold text-foreground mb-1", children: tech.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: tech.description })] }, tech.name))) })] })] }) }));
}
