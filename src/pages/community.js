import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, ThumbsUp, MessageCircle, Eye, Pin, Plus, Clock, TrendingUp, HelpCircle, Lightbulb, Share2, Bookmark } from "lucide-react";
import { communityPosts, developers } from "../data/mock-data";
const categories = [
    { id: "all", label: "All Posts", icon: MessageSquare },
    { id: "Help", label: "Help", icon: HelpCircle },
    { id: "Discussion", label: "Discussion", icon: MessageCircle },
    { id: "Showcase", label: "Showcase", icon: Share2 },
    { id: "Tutorial", label: "Tutorial", icon: Lightbulb },
];
function PostCard({ post, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting)
                setIsVisible(true);
        }, { threshold: 0.1 });
        if (cardRef.current)
            observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);
    const author = developers.find(d => d.username === post.author);
    const getCategoryIcon = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat?.icon || MessageSquare;
    };
    const CategoryIcon = getCategoryIcon(post.category);
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        return "Just now";
    };
    return (_jsx("div", { ref: cardRef, className: `group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 ${post.isPinned ? "border-l-4 border-l-primary" : ""} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 50}ms` }, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary cursor-pointer hover:bg-primary/30 transition-colors shrink-0", onClick: () => navigate(`/developers/${post.author}`), children: post.authorAvatar }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [_jsx("span", { className: "font-medium text-sm text-foreground cursor-pointer hover:text-primary transition-colors", onClick: () => navigate(`/developers/${post.author}`), children: post.authorName }), _jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: ["@", post.author] }), _jsx("span", { className: "text-xs text-muted-foreground", children: "in" }), _jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded ${post.category === "Help" ? "bg-red-500/10 text-red-500" :
                                        post.category === "Discussion" ? "bg-blue-500/10 text-blue-500" :
                                            post.category === "Showcase" ? "bg-green-500/10 text-green-500" :
                                                "bg-yellow-500/10 text-yellow-500"}`, children: [_jsx(CategoryIcon, { className: "w-3 h-3" }), post.category] }), post.isPinned && (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded", children: [_jsx(Pin, { className: "w-3 h-3" }), "Pinned"] }))] }), _jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-2", children: post.title }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3", children: post.content }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => (_jsx("span", { className: "px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("button", { className: "flex items-center gap-1 hover:text-primary transition-colors", children: [_jsx(ThumbsUp, { className: "w-4 h-4" }), post.likes] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), post.replies] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-4 h-4" }), post.views] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "p-1.5 rounded hover:bg-secondary transition-colors", children: _jsx(Bookmark, { className: "w-4 h-4 text-muted-foreground hover:text-primary" }) }), _jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), getTimeAgo(post.createdAt)] })] })] })] })] }) }));
}
export function CommunityPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("recent");
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const filteredPosts = communityPosts
        .filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    })
        .sort((a, b) => {
        // Always show pinned posts first
        if (a.isPinned && !b.isPinned)
            return -1;
        if (!a.isPinned && b.isPinned)
            return 1;
        if (sortBy === "popular")
            return b.likes - a.likes;
        if (sortBy === "trending")
            return (b.replies + b.views) - (a.replies + a.views);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return (_jsx("section", { className: "relative pt-32 pb-24 min-h-screen", children: _jsxs("div", { className: "max-w-[1200px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), "Community Forum"] }), _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Join the " }), _jsx("span", { className: "text-primary glow-text", children: "discussion" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Connect with fellow developers, ask questions, share your projects, and help others grow." })] }), _jsxs(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box shrink-0", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Post"] })] })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [_jsxs("div", { className: "lg:w-64 shrink-0 space-y-6", children: [_jsxs("div", { className: "bg-card border border-border rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "Categories" }), _jsx("div", { className: "space-y-1", children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono transition-colors ${selectedCategory === category.id
                                                    ? "bg-primary/20 text-primary"
                                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`, children: [_jsx(category.icon, { className: "w-4 h-4" }), category.label] }, category.id))) })] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "Popular Tags" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ["React", "TypeScript", "Python", "Kubernetes", "DevOps", "Machine Learning", "Security"].map((tag) => (_jsx("button", { onClick: () => setSearchQuery(tag), className: "px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded hover:bg-primary/20 hover:text-primary transition-colors", children: tag }, tag))) })] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "Community Stats" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Total Posts" }), _jsx("span", { className: "font-mono text-foreground", children: communityPosts.length })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Active Members" }), _jsx("span", { className: "font-mono text-foreground", children: developers.length })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Total Replies" }), _jsx("span", { className: "font-mono text-foreground", children: communityPosts.reduce((acc, p) => acc + p.replies, 0) })] })] })] })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search posts, tags, or content...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full h-11 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: sortBy === "recent" ? "default" : "outline", size: "sm", onClick: () => setSortBy("recent"), className: "font-mono", children: [_jsx(Clock, { className: "w-4 h-4 mr-2" }), "Recent"] }), _jsxs(Button, { variant: sortBy === "popular" ? "default" : "outline", size: "sm", onClick: () => setSortBy("popular"), className: "font-mono", children: [_jsx(ThumbsUp, { className: "w-4 h-4 mr-2" }), "Popular"] }), _jsxs(Button, { variant: sortBy === "trending" ? "default" : "outline", size: "sm", onClick: () => setSortBy("trending"), className: "font-mono", children: [_jsx(TrendingUp, { className: "w-4 h-4 mr-2" }), "Trending"] })] })] }), _jsxs("p", { className: "text-sm font-mono text-muted-foreground mb-4", children: [filteredPosts.length, " post", filteredPosts.length !== 1 ? "s" : "", selectedCategory !== "all" && ` in ${selectedCategory}`] }), _jsx("div", { className: "space-y-4", children: filteredPosts.map((post, index) => (_jsx(PostCard, { post: post, index: index }, post.id))) }), filteredPosts.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx(MessageSquare, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-lg font-mono text-muted-foreground", children: "No posts found" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try adjusting your search or category" })] }))] })] })] }) }));
}
