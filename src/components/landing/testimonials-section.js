import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Quote, Star } from "lucide-react";
const testimonials = [
    {
        content: "CodeSphere has completely transformed how I learn and practice coding. The daily challenges keep me sharp, and the community is incredibly supportive.",
        author: "Jessica Taylor",
        role: "Senior Frontend Developer at Stripe",
        avatar: "JT",
        rating: 5,
    },
    {
        content: "The leaderboard system is addictive in the best way possible. It's pushed me to solve harder problems and improve my algorithm skills significantly.",
        author: "Michael Chen",
        role: "Software Engineer at Google",
        avatar: "MC",
        rating: 5,
    },
    {
        content: "I've found my next two team members through CodeSphere. The developer profiles and project showcases make it easy to identify talented engineers.",
        author: "Amanda Rodriguez",
        role: "Engineering Manager at Netflix",
        avatar: "AR",
        rating: 5,
    },
    {
        content: "As someone transitioning into tech, CodeSphere gave me the practice environment and community support I needed. Now I'm working at my dream company.",
        author: "David Kim",
        role: "Backend Engineer at Meta",
        avatar: "DK",
        rating: 5,
    },
    {
        content: "The code review features and real-time collaboration tools are game-changers. Our entire team uses CodeSphere for pair programming sessions.",
        author: "Emma Wilson",
        role: "Tech Lead at Shopify",
        avatar: "EW",
        rating: 5,
    },
    {
        content: "I've tried every coding platform out there. CodeSphere is the only one that feels like a real developer community rather than just a practice tool.",
        author: "Ryan Park",
        role: "Founding Engineer at Linear",
        avatar: "RP",
        rating: 5,
    },
];
function TestimonialCard({ testimonial, index }) {
    const [isVisible, setIsVisible] = useState(false);
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
    return (_jsxs("div", { ref: cardRef, className: `relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, children: [_jsx(Quote, { className: "w-8 h-8 text-primary/20 mb-4" }), _jsx("div", { className: "flex items-center gap-1 mb-4", children: [...Array(testimonial.rating)].map((_, i) => (_jsx(Star, { className: "w-4 h-4 fill-primary text-primary" }, i))) }), _jsxs("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: ["\"", testimonial.content, "\""] }), _jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary", children: testimonial.avatar }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-foreground", children: testimonial.author }), _jsx("p", { className: "text-xs text-muted-foreground", children: testimonial.role })] })] })] }));
}
export function TestimonialsSection() {
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
    return (_jsxs("section", { ref: sectionRef, className: "relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 grid-bg opacity-30" }), _jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Star, { className: "w-4 h-4 fill-primary" }), "Testimonials"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Loved by " }), _jsx("span", { className: "text-primary glow-text", children: "developers" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-2xl mx-auto", children: "See what developers from leading tech companies say about their CodeSphere experience." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: testimonials.map((testimonial, index) => (_jsx(TestimonialCard, { testimonial: testimonial, index: index }, testimonial.author))) })] })] }));
}
