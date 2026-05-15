import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FolderGit2, Search, Star, GitFork, Filter, ChevronDown, ExternalLink, Calendar } from "lucide-react";
import { projects, techStackOptions } from "../data/mock-data";
function ProjectCard({ project, index }) {
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
    return (_jsxs("div", { ref: cardRef, className: `group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 50}ms` }, children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-colors", children: project.name }), _jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: project.description })] }), _jsx("a", { href: "#", className: "p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors shrink-0", title: "View project", children: _jsx(ExternalLink, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: project.tech.map((tech) => (_jsx("span", { className: "px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded", children: tech }, tech))) }), _jsxs("div", { className: "flex items-center gap-3 mb-4 cursor-pointer hover:bg-secondary/50 p-2 -mx-2 rounded-lg transition-colors", onClick: () => navigate(`/developers/${project.author}`), children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary", children: project.authorAvatar }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: project.authorName }), _jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: ["@", project.author] })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [_jsx(Star, { className: "w-4 h-4" }), project.stars] }), _jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [_jsx(GitFork, { className: "w-4 h-4" }), project.forks] })] }), _jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(Calendar, { className: "w-3 h-3" }), new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })] })] })] }));
}
export function ProjectsPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("stars");
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const filteredProjects = projects
        .filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.authorName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = selectedTech.length === 0 ||
            selectedTech.some(tech => project.tech.includes(tech));
        return matchesSearch && matchesTech;
    })
        .sort((a, b) => {
        if (sortBy === "stars")
            return b.stars - a.stars;
        if (sortBy === "forks")
            return b.forks - a.forks;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    const toggleTech = (tech) => {
        setSelectedTech(prev => prev.includes(tech)
            ? prev.filter(t => t !== tech)
            : [...prev, tech]);
    };
    return (_jsx("section", { className: "relative pt-32 pb-24 min-h-screen", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(FolderGit2, { className: "w-4 h-4" }), "Project Showcase"] }), _jsxs("h1", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Explore " }), _jsx("span", { className: "text-primary glow-text", children: "projects" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Discover amazing open source projects built by our community. Filter by technology stack and find inspiration for your next build." })] }), _jsxs("div", { className: "mb-8 space-y-4", children: [_jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search projects by name, description, or author...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: sortBy === "stars" ? "default" : "outline", onClick: () => setSortBy("stars"), className: "font-mono", children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "Most Stars"] }), _jsxs(Button, { variant: sortBy === "recent" ? "default" : "outline", onClick: () => setSortBy("recent"), className: "font-mono", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), "Recent"] }), _jsxs(Button, { variant: sortBy === "forks" ? "default" : "outline", onClick: () => setSortBy("forks"), className: "font-mono", children: [_jsx(GitFork, { className: "w-4 h-4 mr-2" }), "Most Forks"] })] }), _jsxs(Button, { variant: "outline", onClick: () => setShowFilters(!showFilters), className: "h-12 px-6 font-mono border-border hover:border-primary/50", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Tech Stack", selectedTech.length > 0 && (_jsx("span", { className: "ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full", children: selectedTech.length })), _jsx(ChevronDown, { className: `w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}` })] })] }), showFilters && (_jsxs("div", { className: "p-4 bg-card border border-border rounded-lg animate-in fade-in slide-in-from-top-2 duration-300", children: [_jsx("p", { className: "text-sm font-mono text-muted-foreground mb-3", children: "Filter by technology:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: techStackOptions.map((tech) => (_jsx("button", { onClick: () => toggleTech(tech), className: `px-3 py-1.5 text-xs font-mono rounded transition-all ${selectedTech.includes(tech)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`, children: tech }, tech))) }), selectedTech.length > 0 && (_jsx("button", { onClick: () => setSelectedTech([]), className: "mt-3 text-xs font-mono text-primary hover:underline", children: "Clear all filters" }))] }))] }), _jsxs("p", { className: "text-sm font-mono text-muted-foreground mb-6", children: ["Showing ", filteredProjects.length, " project", filteredProjects.length !== 1 ? "s" : ""] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredProjects.map((project, index) => (_jsx(ProjectCard, { project: project, index: index }, project.id))) }), filteredProjects.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx(FolderGit2, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-lg font-mono text-muted-foreground", children: "No projects found" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try adjusting your search or filters" })] }))] }) }));
}
