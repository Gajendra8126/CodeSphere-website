import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { MessageSquare, Heart, Bookmark, Share2, Clock, User } from "lucide-react";
const blogPosts = [
    {
        id: 1,
        title: "Building Scalable APIs with Go and gRPC",
        excerpt: "Learn how to design and implement high-performance APIs using Go and gRPC for microservices architecture.",
        author: "Alex Chen",
        authorAvatar: "AC",
        date: "2 hours ago",
        readTime: "8 min read",
        tags: ["Go", "gRPC", "Backend"],
        likes: 234,
        comments: 45,
    },
    {
        id: 2,
        title: "The Future of WebAssembly in Browser Applications",
        excerpt: "Exploring how WASM is changing the landscape of web development and what it means for frontend engineers.",
        author: "Sarah Miller",
        authorAvatar: "SM",
        date: "5 hours ago",
        readTime: "12 min read",
        tags: ["WebAssembly", "Frontend", "Performance"],
        likes: 189,
        comments: 32,
    },
    {
        id: 3,
        title: "Rust for Systems Programming: A Practical Guide",
        excerpt: "A comprehensive guide to using Rust for building safe and efficient systems software.",
        author: "Marcus Johnson",
        authorAvatar: "MJ",
        date: "1 day ago",
        readTime: "15 min read",
        tags: ["Rust", "Systems", "Safety"],
        likes: 456,
        comments: 78,
    },
];
const discussions = [
    { title: "What's your favorite tech stack in 2024?", replies: 234, active: true },
    { title: "Tips for passing FAANG interviews", replies: 567, active: true },
    { title: "Best practices for code review", replies: 123, active: false },
    { title: "Remote work productivity hacks", replies: 89, active: true },
];
export function IntegrationsSection() {
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
    return (_jsx("section", { id: "community", ref: sectionRef, className: "relative py-24 lg:py-32 border-t border-border overflow-hidden", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: `mb-16 lg:mb-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), "Community Hub"] }), _jsxs("h2", { className: "text-4xl lg:text-6xl font-bold tracking-tight mb-6", children: [_jsx("span", { className: "text-foreground", children: "Tech blog & " }), _jsx("span", { className: "text-primary glow-text", children: "discussions" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-xl", children: "Stay updated with the latest tech trends, share your knowledge, and engage in meaningful discussions." })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("h3", { className: "text-lg font-semibold text-foreground flex items-center gap-2 mb-6", children: [_jsx("span", { className: "text-primary font-mono", children: ">" }), "Latest Articles"] }), blogPosts.map((post, index) => (_jsxs("article", { className: `group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary", children: post.authorAvatar }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-foreground", children: post.author }), _jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-2", children: [_jsx(Clock, { className: "w-3 h-3" }), post.date, " \u00B7 ", post.readTime] })] })] }), _jsx("button", { className: "p-2 rounded-lg hover:bg-secondary transition-colors", children: _jsx(Bookmark, { className: "w-4 h-4 text-muted-foreground" }) })] }), _jsx("h4", { className: "text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors", children: post.title }), _jsx("p", { className: "text-muted-foreground mb-4 line-clamp-2", children: post.excerpt }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("button", { className: "flex items-center gap-1 hover:text-primary transition-colors", children: [_jsx(Heart, { className: "w-4 h-4" }), post.likes] }), _jsxs("button", { className: "flex items-center gap-1 hover:text-primary transition-colors", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), post.comments] })] }), _jsxs("button", { className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors", children: [_jsx(Share2, { className: "w-4 h-4" }), "Share"] })] })] }, post.id))), _jsxs("a", { href: "#", className: "block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-4", children: ["View all articles ", "→"] })] }), _jsx("div", { className: `transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: _jsxs("div", { className: "bg-card border border-border rounded-lg p-6 sticky top-24", children: [_jsxs("h3", { className: "text-lg font-semibold text-foreground flex items-center gap-2 mb-6", children: [_jsx("span", { className: "text-primary font-mono", children: "#" }), "Hot Discussions"] }), _jsx("div", { className: "space-y-4", children: discussions.map((discussion, index) => (_jsx("a", { href: "#", className: "block p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group", children: _jsxs("div", { className: "flex items-start gap-3", children: [discussion.active && (_jsx("span", { className: "w-2 h-2 rounded-full bg-primary mt-2 animate-pulse" })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2", children: discussion.title }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [_jsx(User, { className: "w-3 h-3" }), discussion.replies, " replies"] })] })] }) }, index))) }), _jsxs("a", { href: "#", className: "block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-6 mt-4 border-t border-border", children: ["Join discussions ", "→"] })] }) })] })] }) }));
}
