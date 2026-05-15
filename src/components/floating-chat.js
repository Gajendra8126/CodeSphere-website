import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, X, Send, Code2, Users, Swords, MessageCircle, Crown, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
const quickLinks = [
    { label: "Developers", path: "/developers", icon: Users, description: "Browse talented developers" },
    { label: "Projects", path: "/projects", icon: Code2, description: "Explore amazing projects" },
    { label: "Challenges", path: "/challenges", icon: Swords, description: "Test your skills" },
    { label: "Community", path: "/community", icon: MessageCircle, description: "Join discussions" },
    { label: "Leaderboard", path: "/leaderboard", icon: Crown, description: "See top performers" },
];
const chatMessages = [
    {
        type: "bot",
        message: "Hello, Developer! Welcome to CodeSphere.",
        delay: 0,
    },
    {
        type: "bot",
        message: "I'm your AI assistant. While I'm still learning, I can help you navigate the platform.",
        delay: 800,
    },
    {
        type: "bot",
        message: "Here are some quick links to get you started:",
        delay: 1600,
    },
];
export function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        if (isOpen && visibleMessages < chatMessages.length) {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setVisibleMessages(prev => prev + 1);
                setIsTyping(false);
            }, chatMessages[visibleMessages]?.delay || 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, visibleMessages]);
    const handleOpen = () => {
        setIsOpen(true);
        if (visibleMessages === 0) {
            setVisibleMessages(0);
        }
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setInputValue("");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: handleOpen, className: `fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 glow-box ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`, "aria-label": "Open chat", children: [_jsx(MessageSquare, { className: "w-6 h-6" }), _jsx("span", { className: "absolute inset-0 rounded-full bg-primary/50 animate-ping" })] }), _jsx("div", { className: `fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 origin-bottom-right ${isOpen
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`, children: _jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-2xl glow-border", children: [_jsxs("div", { className: "bg-secondary/50 px-4 py-3 flex items-center justify-between border-b border-border", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center", children: _jsx(Terminal, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsxs("h3", { className: "font-mono text-sm font-semibold text-foreground flex items-center gap-2", children: ["CodeSphere AI", _jsx(Sparkles, { className: "w-3 h-3 text-primary" })] }), _jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [_jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-primary mr-1 animate-pulse" }), "Online"] })] })] }), _jsx("button", { onClick: handleClose, className: "w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors", "aria-label": "Close chat", children: _jsx(X, { className: "w-4 h-4 text-muted-foreground" }) })] }), _jsxs("div", { className: "h-[320px] overflow-y-auto p-4 space-y-4 bg-background/50 scanline", children: [chatMessages.slice(0, visibleMessages).map((msg, index) => (_jsxs("div", { className: "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0", children: _jsx(Terminal, { className: "w-4 h-4 text-primary" }) }), _jsx("div", { className: "bg-secondary/50 border border-border rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]", children: _jsx("p", { className: "text-sm text-foreground font-mono leading-relaxed", children: msg.message }) })] }, index))), isTyping && (_jsxs("div", { className: "flex gap-3 animate-in fade-in duration-200", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0", children: _jsx(Terminal, { className: "w-4 h-4 text-primary" }) }), _jsx("div", { className: "bg-secondary/50 border border-border rounded-lg rounded-tl-none px-4 py-3", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-primary/60 animate-bounce", style: { animationDelay: '0ms' } }), _jsx("span", { className: "w-2 h-2 rounded-full bg-primary/60 animate-bounce", style: { animationDelay: '150ms' } }), _jsx("span", { className: "w-2 h-2 rounded-full bg-primary/60 animate-bounce", style: { animationDelay: '300ms' } })] }) })] })), visibleMessages >= chatMessages.length && (_jsx("div", { className: "space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500", children: quickLinks.map((link) => (_jsxs(Link, { to: link.path, onClick: handleClose, className: "flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-primary/50 transition-all group", children: [_jsx("div", { className: "w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors", children: _jsx(link.icon, { className: "w-4 h-4 text-primary" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-mono font-medium text-foreground group-hover:text-primary transition-colors", children: link.label }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: link.description })] }), _jsx("span", { className: "text-muted-foreground group-hover:text-primary transition-colors", children: "→" })] }, link.path))) }))] }), _jsxs("div", { className: "p-3 border-t border-border bg-secondary/30", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSendMessage(), placeholder: "Type a message... (Coming soon)", className: "w-full px-4 py-2.5 rounded-lg bg-input border border-border text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all", disabled: true }), _jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono", children: "AI" })] }), _jsx(Button, { onClick: handleSendMessage, disabled: true, className: "px-3 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50", children: _jsx(Send, { className: "w-4 h-4" }) })] }), _jsx("p", { className: "text-[10px] text-muted-foreground text-center mt-2 font-mono", children: "AI integration coming soon" })] })] }) }), isOpen && (_jsx("div", { className: "fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden", onClick: handleClose }))] }));
}
