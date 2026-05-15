import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Terminal, Github, Twitter } from "lucide-react";
const footerLinks = {
    Product: [
        { name: "Features", href: "#" },
        { name: "Challenges", href: "#" },
        { name: "Leaderboard", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "API", href: "#" },
    ],
    Community: [
        { name: "Forum", href: "#" },
        { name: "Discord", href: "#" },
        { name: "Events", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Newsletter", href: "#" },
    ],
    Company: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Partners", href: "#" },
    ],
    Legal: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Security", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Licenses", href: "#" },
    ],
};
export function FooterSection() {
    return (_jsxs("footer", { className: "relative bg-card border-t border-border", children: [_jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24", children: [_jsxs("div", { className: "grid lg:grid-cols-6 gap-12 lg:gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("a", { href: "#", className: "flex items-center gap-2 mb-6", children: [_jsx(Terminal, { className: "w-6 h-6 text-primary" }), _jsxs("span", { className: "font-mono font-bold text-xl", children: [_jsx("span", { className: "text-primary", children: "Code" }), _jsx("span", { className: "text-foreground", children: "Sphere" })] })] }), _jsx("p", { className: "text-muted-foreground mb-6 max-w-sm", children: "The developer community where hackers connect, compete, and grow together." }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "#", className: "w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors", children: _jsx(Github, { className: "w-5 h-5" }) }), _jsx("a", { href: "#", className: "w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors", children: _jsx(Twitter, { className: "w-5 h-5" }) }), _jsx("a", { href: "#", className: "w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors", children: _jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" }) }) })] })] }), Object.entries(footerLinks).map(([category, links]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground mb-4", children: category }), _jsx("ul", { className: "space-y-3", children: links.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-muted-foreground hover:text-primary transition-colors text-sm", children: link.name }) }, link.name))) })] }, category)))] }), _jsxs("div", { className: "mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " CodeSphere. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-6 text-sm text-muted-foreground", children: [_jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Status" }), _jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Changelog" }), _jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "RSS" })] })] })] }), _jsx("div", { className: "hidden lg:block absolute bottom-8 right-8 font-mono text-xs text-primary/20 leading-none", children: _jsx("pre", { children: `
   _____ ____  ____  ______ 
  / ____/ __ \\|  _ \\|  ____|
 | |   | |  | | |_) | |__   
 | |   | |  | |  _ <|  __|  
 | |___| |__| | |_) | |____ 
  \\_____\\____/|____/|______|
        ` }) })] }));
}
