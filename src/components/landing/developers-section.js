import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Globe, Star, GitFork, Code2 } from "lucide-react";
const developers = [
    {
        name: "Alex Chen",
        username: "@alexc",
        avatar: "AC",
        role: "Full Stack Developer",
        skills: ["TypeScript", "React", "Node.js"],
        repos: 45,
        stars: 1200,
        contributions: 2847,
        rank: 1,
    },
    {
        name: "Sarah Miller",
        username: "@sarahm",
        avatar: "SM",
        role: "Backend Engineer",
        skills: ["Go", "Rust", "PostgreSQL"],
        repos: 32,
        stars: 890,
        contributions: 1923,
        rank: 2,
    },
    {
        name: "James Park",
        username: "@jpark",
        avatar: "JP",
        role: "DevOps Specialist",
        skills: ["Kubernetes", "AWS", "Terraform"],
        repos: 28,
        stars: 756,
        contributions: 1567,
        rank: 3,
    },
    {
        name: "Emma Wilson",
        username: "@emmaw",
        avatar: "EW",
        role: "Frontend Developer",
        skills: ["Vue.js", "Svelte", "CSS"],
        repos: 52,
        stars: 634,
        contributions: 2134,
        rank: 4,
    },
    {
        name: "Marcus Johnson",
        username: "@marcusj",
        avatar: "MJ",
        role: "ML Engineer",
        skills: ["Python", "PyTorch", "TensorFlow"],
        repos: 19,
        stars: 1450,
        contributions: 987,
        rank: 5,
    },
    {
        name: "Lisa Wang",
        username: "@lisaw",
        avatar: "LW",
        role: "Security Engineer",
        skills: ["Rust", "C++", "Assembly"],
        repos: 23,
        stars: 567,
        contributions: 1234,
        rank: 6,
    },
];
function DeveloperCard({ developer, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting)
                setIsVisible(true);
        }, { threshold: 0.2 });
        if (cardRef.current)
            observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);
    return (_jsxs("div", { ref: cardRef, className: `group relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs("div", { className: "absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-mono text-sm font-bold", children: ["#", developer.rank] }), _jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("div", { className: "w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xl text-primary", children: developer.avatar }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-foreground truncate", children: developer.name }), _jsx("p", { className: "text-sm font-mono text-primary", children: developer.username }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: developer.role })] })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: developer.skills.map((skill) => (_jsx("span", { className: "px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded", children: skill }, skill))) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 border-t border-border", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(GitFork, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.repos }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Repos" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(Star, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.stars }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Stars" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(Code2, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.contributions }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Commits" })] })] }), _jsx("div", { className: `absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card via-card to-transparent rounded-b-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`, children: _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("button", { className: "p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors", children: _jsx(Github, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors", children: _jsx(Twitter, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors", children: _jsx(Globe, { className: "w-4 h-4" }) })] }) })] }));
}
export function DevelopersSection() {
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
    return (_jsx("section", { id: "developers", ref: sectionRef, className: "relative py-24 lg:py-32 border-t border-border", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-16 lg:mb-24", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx("span", { className: "text-primary/50", children: ">" }), "Developer Profiles"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Meet the " }), _jsx("span", { className: "text-primary glow-text", children: "hackers" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Connect with talented developers from around the world. Share knowledge, collaborate on projects, and grow together." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: developers.map((developer, index) => (_jsx(DeveloperCard, { developer: developer, index: index }, developer.username))) }), _jsx("div", { className: "mt-12 text-center", children: _jsxs(Link, { to: "/developers", className: "inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors", children: ["View all developers", _jsx("span", { className: "text-primary/50", children: "→" })] }) })] }) }));
}
