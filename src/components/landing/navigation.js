import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Menu, X, Terminal, Github, Mail, Lock, User, ArrowRight } from "lucide-react";
const navLinks = [
    { name: "Developers", href: "/developers" },
    { name: "Projects", href: "/projects" },
    { name: "Challenges", href: "/challenges" },
    { name: "Community", href: "/community" },
    { name: "Leaderboard", href: "/leaderboard" },
];
function LoginDialog({ open, onClose }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle authentication here
        console.log(isSignUp ? "Sign up" : "Login", { email, password, username });
        onClose();
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "bg-card border-border max-w-md", children: [_jsxs(DialogHeader, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Terminal, { className: "w-6 h-6 text-primary" }), _jsxs("span", { className: "font-mono font-bold text-lg", children: [_jsx("span", { className: "text-primary", children: "Code" }), _jsx("span", { className: "text-foreground", children: "Sphere" })] })] }), _jsx(DialogTitle, { className: "text-xl font-bold text-foreground", children: isSignUp ? "Create your account" : "Welcome back" }), _jsx(DialogDescription, { className: "text-muted-foreground", children: isSignUp
                                ? "Join 50,000+ developers in the community"
                                : "Sign in to continue to CodeSphere" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [isSignUp && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-mono text-muted-foreground mb-2", children: "Username" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "johndoe", className: "w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all", required: true })] })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-mono text-muted-foreground mb-2", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-mono text-muted-foreground mb-2", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", className: "w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all", required: true })] })] }), _jsxs(Button, { type: "submit", className: "w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box", children: [isSignUp ? "Create Account" : "Sign In", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-border" }) }), _jsx("div", { className: "relative flex justify-center text-xs", children: _jsx("span", { className: "bg-card px-4 text-muted-foreground font-mono", children: "or continue with" }) })] }), _jsxs(Button, { type: "button", variant: "outline", className: "w-full h-11 font-mono border-border hover:border-primary/50 hover:bg-primary/10", children: [_jsx(Github, { className: "w-4 h-4 mr-2" }), "GitHub"] }), _jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [isSignUp ? "Already have an account?" : "Don't have an account?", " ", _jsx("button", { type: "button", onClick: () => setIsSignUp(!isSignUp), className: "text-primary hover:underline font-mono", children: isSignUp ? "Sign in" : "Sign up" })] })] })] }) }));
}
export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);
    const isActive = (href) => location.pathname === href;
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: `fixed z-50 transition-all duration-500 ${isScrolled
                    ? "top-4 left-4 right-4"
                    : "top-0 left-0 right-0"}`, children: [_jsx("nav", { className: `mx-auto transition-all duration-500 ${isScrolled || isMobileMenuOpen
                            ? "bg-card/90 backdrop-blur-xl border border-primary/20 rounded-lg shadow-lg shadow-primary/5 max-w-[1200px]"
                            : "bg-transparent max-w-[1400px]"}`, children: _jsxs("div", { className: `flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`, children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [_jsx(Terminal, { className: `text-primary transition-all duration-500 ${isScrolled ? "w-5 h-5" : "w-6 h-6"}` }), _jsxs("span", { className: `font-mono font-bold tracking-tight transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"}`, children: [_jsx("span", { className: "text-primary", children: "Code" }), _jsx("span", { className: "text-foreground", children: "Sphere" })] })] }), _jsx("div", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => (_jsxs(Link, { to: link.href, className: `text-sm font-mono transition-colors duration-300 relative group ${isActive(link.href)
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"}`, children: [_jsx("span", { className: "text-primary/50 mr-1", children: ">" }), link.name, _jsx("span", { className: `absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}` })] }, link.name))) }), _jsxs("div", { className: "hidden md:flex items-center gap-4", children: [_jsx("button", { onClick: () => setIsLoginOpen(true), className: `font-mono text-muted-foreground hover:text-primary transition-all duration-500 ${isScrolled ? "text-xs" : "text-sm"}`, children: "Login" }), _jsx(Button, { size: "sm", onClick: () => setIsLoginOpen(true), className: `bg-primary hover:bg-primary/90 text-primary-foreground rounded font-mono transition-all duration-500 glow-box ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`, children: "Join Community" })] }), _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "md:hidden p-2 text-primary", "aria-label": "Toggle menu", children: isMobileMenuOpen ? (_jsx(X, { className: "w-6 h-6" })) : (_jsx(Menu, { className: "w-6 h-6" })) })] }) }), _jsx("div", { className: `md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 scanline ${isMobileMenuOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"}`, style: { top: 0 }, children: _jsxs("div", { className: "flex flex-col h-full px-8 pt-28 pb-8", children: [_jsx("div", { className: "flex-1 flex flex-col justify-center gap-6", children: navLinks.map((link, i) => (_jsxs(Link, { to: link.href, className: `text-3xl font-mono transition-all duration-500 ${isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"} ${isMobileMenuOpen
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"}`, style: { transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }, children: [_jsx("span", { className: "text-primary mr-2", children: "$" }), link.name.toLowerCase()] }, link.name))) }), _jsxs("div", { className: `flex gap-4 pt-8 border-t border-primary/20 transition-all duration-500 ${isMobileMenuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"}`, style: { transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }, children: [_jsx(Button, { variant: "outline", className: "flex-1 rounded h-14 text-base font-mono border-primary/30 hover:bg-primary/10", onClick: () => {
                                                setIsMobileMenuOpen(false);
                                                setIsLoginOpen(true);
                                            }, children: "Login" }), _jsx(Button, { className: "flex-1 bg-primary text-primary-foreground rounded h-14 text-base font-mono glow-box", onClick: () => {
                                                setIsMobileMenuOpen(false);
                                                setIsLoginOpen(true);
                                            }, children: "Join Now" })] })] }) })] }), _jsx(LoginDialog, { open: isLoginOpen, onClose: () => setIsLoginOpen(false) })] }));
}
