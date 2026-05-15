import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck, Server, Key } from "lucide-react";
const securityFeatures = [
    {
        icon: Shield,
        title: "Secure by Default",
        description: "All code and data encrypted at rest and in transit with AES-256.",
    },
    {
        icon: Lock,
        title: "Private Repositories",
        description: "Keep your projects private with granular access controls.",
    },
    {
        icon: Eye,
        title: "Audit Logging",
        description: "Complete visibility into all actions with comprehensive audit trails.",
    },
    {
        icon: Key,
        title: "2FA Authentication",
        description: "Multi-factor authentication with TOTP and hardware keys.",
    },
    {
        icon: Server,
        title: "Self-Hosted Option",
        description: "Deploy CodeSphere on your own infrastructure for full control.",
    },
    {
        icon: FileCheck,
        title: "GDPR Compliant",
        description: "Full compliance with data protection regulations worldwide.",
    },
];
export function SecuritySection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting)
                setIsVisible(true);
        }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (_jsxs("section", { id: "security", ref: sectionRef, className: "relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 grid-bg opacity-30" }), _jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Shield, { className: "w-4 h-4" }), "Security First"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Your code is " }), _jsx("span", { className: "text-primary glow-text", children: "safe" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-2xl mx-auto", children: "Enterprise-grade security with privacy at the core. Your intellectual property protected at every level." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: securityFeatures.map((feature, index) => (_jsxs("div", { className: `p-6 bg-background border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, children: [_jsx("div", { className: "w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: _jsx(feature.icon, { className: "w-6 h-6 text-primary" }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors", children: feature.title }), _jsx("p", { className: "text-muted-foreground", children: feature.description })] }, feature.title))) }), _jsx("div", { className: "mt-16 flex flex-wrap justify-center gap-6", children: ["SOC 2 Type II", "ISO 27001", "GDPR", "CCPA"].map((badge) => (_jsx("span", { className: "px-4 py-2 bg-secondary border border-border rounded font-mono text-sm text-muted-foreground", children: badge }, badge))) })] })] }));
}
