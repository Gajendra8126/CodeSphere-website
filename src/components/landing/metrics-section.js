import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Trophy, Medal, Award, TrendingUp, Flame, Crown } from "lucide-react";
const leaderboard = [
    { rank: 1, name: "Alex Chen", username: "@alexc", avatar: "AC", points: 12450, streak: 45, solved: 234, change: "+2" },
    { rank: 2, name: "Sarah Miller", username: "@sarahm", avatar: "SM", points: 11890, streak: 38, solved: 212, change: "+1" },
    { rank: 3, name: "James Park", username: "@jpark", avatar: "JP", points: 10567, streak: 29, solved: 198, change: "-1" },
    { rank: 4, name: "Emma Wilson", username: "@emmaw", avatar: "EW", points: 9876, streak: 52, solved: 187, change: "+3" },
    { rank: 5, name: "Marcus Johnson", username: "@marcusj", avatar: "MJ", points: 9234, streak: 21, solved: 176, change: "0" },
    { rank: 6, name: "Lisa Wang", username: "@lisaw", avatar: "LW", points: 8765, streak: 33, solved: 165, change: "+5" },
    { rank: 7, name: "David Kim", username: "@davidk", avatar: "DK", points: 8234, streak: 18, solved: 154, change: "-2" },
    { rank: 8, name: "Anna Lopez", username: "@annal", avatar: "AL", points: 7890, streak: 27, solved: 143, change: "+1" },
];
function RankIcon({ rank }) {
    if (rank === 1)
        return _jsx(Crown, { className: "w-5 h-5 text-yellow-400" });
    if (rank === 2)
        return _jsx(Medal, { className: "w-5 h-5 text-gray-400" });
    if (rank === 3)
        return _jsx(Award, { className: "w-5 h-5 text-amber-600" });
    return _jsxs("span", { className: "w-5 h-5 flex items-center justify-center font-mono text-sm text-muted-foreground", children: ["#", rank] });
}
export function MetricsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
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
    return (_jsx("section", { id: "leaderboard", ref: sectionRef, className: "relative py-24 lg:py-32 border-y border-border", children: _jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16", children: [_jsxs("div", { children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Trophy, { className: "w-4 h-4" }), "Community Leaderboard"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Top " }), _jsx("span", { className: "text-primary glow-text", children: "hackers" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Climb the ranks by solving challenges, contributing to projects, and engaging with the community." })] }), _jsx("div", { className: "flex items-center gap-4 font-mono text-sm text-muted-foreground", children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), "Live rankings"] }) })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12", children: [
                        { label: "Active Competitors", value: "12,456", icon: TrendingUp },
                        { label: "Challenges Solved Today", value: "8,234", icon: Trophy },
                        { label: "Total Points Earned", value: "2.4M", icon: Award },
                        { label: "Longest Streak", value: "127 days", icon: Flame },
                    ].map((stat, i) => (_jsxs("div", { className: `bg-card border border-border rounded-lg p-5 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, style: { transitionDelay: `${i * 100}ms` }, children: [_jsx(stat.icon, { className: "w-5 h-5 text-primary mb-3" }), _jsx("p", { className: "text-2xl font-bold text-foreground font-mono", children: stat.value }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.label })] }, stat.label))) }), _jsxs("div", { className: `bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [_jsxs("div", { className: "grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wider", children: [_jsx("div", { className: "col-span-1", children: "Rank" }), _jsx("div", { className: "col-span-4", children: "Developer" }), _jsx("div", { className: "col-span-2 text-right", children: "Points" }), _jsx("div", { className: "col-span-2 text-right hidden md:block", children: "Solved" }), _jsx("div", { className: "col-span-2 text-right hidden lg:block", children: "Streak" }), _jsx("div", { className: "col-span-1 text-right", children: "Change" })] }), leaderboard.map((user, index) => (_jsxs("div", { className: `grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 transition-all duration-300 ${hoveredRow === index ? "bg-primary/5" : "hover:bg-secondary/30"} ${user.rank <= 3 ? "bg-primary/5" : ""}`, onMouseEnter: () => setHoveredRow(index), onMouseLeave: () => setHoveredRow(null), style: {
                                animationDelay: `${index * 50}ms`,
                            }, children: [_jsx("div", { className: "col-span-1 flex items-center", children: _jsx(RankIcon, { rank: user.rank }) }), _jsxs("div", { className: "col-span-4 flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm ${user.rank === 1 ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30" :
                                                user.rank === 2 ? "bg-gray-400/20 text-gray-400 border border-gray-400/30" :
                                                    user.rank === 3 ? "bg-amber-600/20 text-amber-600 border border-amber-600/30" :
                                                        "bg-primary/20 text-primary border border-primary/30"}`, children: user.avatar }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-medium text-foreground truncate", children: user.name }), _jsx("p", { className: "text-xs font-mono text-primary", children: user.username })] })] }), _jsx("div", { className: "col-span-2 flex items-center justify-end", children: _jsx("span", { className: "font-mono font-bold text-foreground", children: user.points.toLocaleString() }) }), _jsx("div", { className: "col-span-2 items-center justify-end hidden md:flex", children: _jsx("span", { className: "font-mono text-muted-foreground", children: user.solved }) }), _jsxs("div", { className: "col-span-2 items-center justify-end gap-1 hidden lg:flex", children: [_jsx(Flame, { className: `w-4 h-4 ${user.streak >= 30 ? "text-orange-400" : "text-muted-foreground"}` }), _jsxs("span", { className: "font-mono text-muted-foreground", children: [user.streak, "d"] })] }), _jsx("div", { className: "col-span-1 flex items-center justify-end", children: _jsx("span", { className: `font-mono text-sm ${user.change.startsWith('+') ? "text-green-400" :
                                            user.change.startsWith('-') ? "text-red-400" :
                                                "text-muted-foreground"}`, children: user.change }) })] }, user.username)))] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("a", { href: "#", className: "inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors", children: ["View full leaderboard", _jsx("span", { className: "text-primary/50", children: "→" })] }) })] }) }));
}
