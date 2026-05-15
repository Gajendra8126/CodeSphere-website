import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Building2 } from "lucide-react";
const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for exploring the platform and joining the community.",
        icon: Zap,
        features: [
            "5 daily challenge attempts",
            "Access to public projects",
            "Community forum access",
            "Basic profile",
            "Public leaderboard",
        ],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$12",
        period: "per month",
        description: "For serious developers who want to level up their skills.",
        icon: Crown,
        features: [
            "Unlimited challenge attempts",
            "Private repositories",
            "Advanced analytics",
            "Priority support",
            "Custom profile badge",
            "Early access to features",
            "Code review requests",
        ],
        cta: "Upgrade to Pro",
        highlighted: true,
    },
    {
        name: "Team",
        price: "$29",
        period: "per seat/month",
        description: "For teams that want to collaborate and grow together.",
        icon: Building2,
        features: [
            "Everything in Pro",
            "Team workspaces",
            "Private leaderboards",
            "Admin dashboard",
            "SSO integration",
            "API access",
            "Dedicated support",
            "Custom challenges",
        ],
        cta: "Contact Sales",
        highlighted: false,
    },
];
export function PricingSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
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
    return (_jsx("section", { ref: sectionRef, className: "relative py-24 lg:py-32 border-t border-border", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx("span", { className: "text-primary/50", children: ">" }), "Pricing"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Simple, transparent " }), _jsx("span", { className: "text-primary glow-text", children: "pricing" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-2xl mx-auto", children: "Start for free and upgrade when you need more. No hidden fees, no surprises." }), _jsxs("div", { className: "flex items-center justify-center gap-4 mt-8", children: [_jsx("span", { className: `text-sm ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`, children: "Monthly" }), _jsx("button", { onClick: () => setIsAnnual(!isAnnual), className: `relative w-14 h-7 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-secondary"}`, children: _jsx("span", { className: `absolute top-1 w-5 h-5 rounded-full bg-background transition-transform ${isAnnual ? "translate-x-8" : "translate-x-1"}` }) }), _jsxs("span", { className: `text-sm ${isAnnual ? "text-foreground" : "text-muted-foreground"}`, children: ["Annual ", _jsx("span", { className: "text-primary font-mono", children: "(Save 20%)" })] })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 items-start", children: plans.map((plan, index) => (_jsxs("div", { className: `relative bg-card border rounded-lg p-8 transition-all duration-500 ${plan.highlighted
                            ? "border-primary/50 shadow-lg shadow-primary/10 scale-105 z-10"
                            : "border-border hover:border-primary/30"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: { transitionDelay: `${index * 100}ms` }, children: [plan.highlighted && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-mono rounded-full", children: "Most Popular" })), _jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 border border-primary/30"}`, children: _jsx(plan.icon, { className: `w-6 h-6 ${plan.highlighted ? "" : "text-primary"}` }) }), _jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: plan.name }), _jsx("p", { className: "text-sm text-muted-foreground mb-6", children: plan.description }), _jsxs("div", { className: "mb-6", children: [_jsx("span", { className: "text-4xl font-bold text-foreground font-mono", children: plan.price === "$0" ? "$0" : isAnnual ? `$${parseInt(plan.price.slice(1)) * 10}` : plan.price }), _jsxs("span", { className: "text-muted-foreground ml-2", children: ["/ ", isAnnual && plan.price !== "$0" ? "year" : plan.period] })] }), _jsx(Button, { className: `w-full mb-8 font-mono ${plan.highlighted
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`, children: plan.cta }), _jsx("ul", { className: "space-y-3", children: plan.features.map((feature) => (_jsxs("li", { className: "flex items-start gap-3 text-sm text-muted-foreground", children: [_jsx(Check, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }), feature] }, feature))) })] }, plan.name))) }), _jsx("div", { className: "mt-16 text-center", children: _jsxs("p", { className: "text-muted-foreground", children: ["Need a custom solution?", " ", _jsxs("a", { href: "#", className: "text-primary hover:text-primary/80 font-mono transition-colors", children: ["Contact our sales team ", "→"] })] }) })] }) }));
}
