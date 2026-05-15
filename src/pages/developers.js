import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Search, Star, Code2, Trophy, Filter, ChevronDown } from "lucide-react";
import { developers, techStackOptions } from "../data/mock-data";
function DeveloperCard({ developer, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting)
                setIsVisible(true);
        }, { threshold: 0.2 });
        if (cardRef.current)
            observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);
    const getRankColor = (rank) => {
        if (rank === 1)
            return "bg-yellow-500 text-yellow-950";
        if (rank === 2)
            return "bg-gray-400 text-gray-950";
        if (rank === 3)
            return "bg-amber-600 text-amber-950";
        return "bg-primary text-primary-foreground";
    };
    return (_jsxs("div", { ref: cardRef, onClick: () => navigate(`/developers/${developer.username}`), className: `group relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 50}ms` }, children: [_jsxs("div", { className: `absolute -top-3 -right-3 w-8 h-8 ${getRankColor(developer.rank)} rounded-full flex items-center justify-center font-mono text-sm font-bold`, children: ["#", developer.rank] }), _jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("div", { className: "w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xl text-primary", children: developer.avatar }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-foreground truncate", children: developer.name }), _jsxs("p", { className: "text-sm font-mono text-primary", children: ["@", developer.username] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: developer.role })] })] }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [developer.skills.slice(0, 3).map((skill) => (_jsx("span", { className: "px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded", children: skill }, skill))), developer.skills.length > 3 && (_jsxs("span", { className: "px-2 py-1 text-xs font-mono text-muted-foreground", children: ["+", developer.skills.length - 3] }))] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 border-t border-border", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(Trophy, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.totalPoints.toLocaleString() }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Points" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(Star, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.stars }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Stars" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: _jsx(Code2, { className: "w-3 h-3" }) }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.contributions }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Commits" })] })] }), _jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" })] }));
}
export function DevelopersPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const filteredDevelopers = developers.filter((dev) => {
        const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dev.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSkills = selectedSkills.length === 0 ||
            selectedSkills.some(skill => dev.skills.includes(skill));
        return matchesSearch && matchesSkills;
    });
    const toggleSkill = (skill) => {
        setSelectedSkills(prev => prev.includes(skill)
            ? prev.filter(s => s !== skill)
            : [...prev, skill]);
    };
    return (_jsx("section", { ref: sectionRef, className: "relative pt-32 pb-24 min-h-screen", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Users, { className: "w-4 h-4" }), "Developer Directory"] }), _jsxs("h1", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Meet our " }), _jsx("span", { className: "text-primary glow-text", children: "developers" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Connect with talented developers from around the world. Browse profiles, view tech stacks, and start collaborating." })] }), _jsxs("div", { className: "mb-8 space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search developers by name, username, or role...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" })] }), _jsxs(Button, { variant: "outline", onClick: () => setShowFilters(!showFilters), className: "h-12 px-6 font-mono border-border hover:border-primary/50", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filter by Tech", _jsx(ChevronDown, { className: `w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}` })] })] }), showFilters && (_jsxs("div", { className: "p-4 bg-card border border-border rounded-lg animate-in fade-in slide-in-from-top-2 duration-300", children: [_jsx("p", { className: "text-sm font-mono text-muted-foreground mb-3", children: "Select technologies:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: techStackOptions.slice(0, 15).map((tech) => (_jsx("button", { onClick: () => toggleSkill(tech), className: `px-3 py-1.5 text-xs font-mono rounded transition-all ${selectedSkills.includes(tech)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`, children: tech }, tech))) }), selectedSkills.length > 0 && (_jsx("button", { onClick: () => setSelectedSkills([]), className: "mt-3 text-xs font-mono text-primary hover:underline", children: "Clear all filters" }))] }))] }), _jsxs("p", { className: "text-sm font-mono text-muted-foreground mb-6", children: ["Showing ", filteredDevelopers.length, " developer", filteredDevelopers.length !== 1 ? "s" : ""] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredDevelopers.map((developer, index) => (_jsx(DeveloperCard, { developer: developer, index: index }, developer.id))) }), filteredDevelopers.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx(Users, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-lg font-mono text-muted-foreground", children: "No developers found" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try adjusting your search or filters" })] }))] }) }));
}
