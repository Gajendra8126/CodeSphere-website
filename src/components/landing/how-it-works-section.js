import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Clock, Trophy, Users, Zap, Play, CheckCircle } from "lucide-react";
const challenges = [
    {
        id: 1,
        title: "Binary Tree Traversal",
        difficulty: "Easy",
        difficultyColor: "text-green-400",
        timeLimit: "15 min",
        participants: 2340,
        completionRate: 87,
        tags: ["Trees", "Recursion"],
        points: 100,
    },
    {
        id: 2,
        title: "Graph Shortest Path",
        difficulty: "Medium",
        difficultyColor: "text-yellow-400",
        timeLimit: "30 min",
        participants: 1567,
        completionRate: 64,
        tags: ["Graphs", "BFS/DFS"],
        points: 250,
    },
    {
        id: 3,
        title: "Dynamic Programming",
        difficulty: "Hard",
        difficultyColor: "text-red-400",
        timeLimit: "45 min",
        participants: 890,
        completionRate: 42,
        tags: ["DP", "Optimization"],
        points: 500,
    },
];
const dailyChallenge = {
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    timeRemaining: "12:34:56",
    participants: 456,
    code: `function longestPalindrome(s: string): string {
  // Your solution here
  let result = "";
  
  for (let i = 0; i < s.length; i++) {
    // Expand around center
    const odd = expand(s, i, i);
    const even = expand(s, i, i + 1);
    
    const longer = odd.length > even.length ? odd : even;
    if (longer.length > result.length) {
      result = longer;
    }
  }
  
  return result;
}`,
};
export function HowItWorksSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(0);
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
    return (_jsxs("section", { id: "challenges", ref: sectionRef, className: "relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 grid-bg opacity-50" }), _jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-16 lg:mb-24", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Zap, { className: "w-4 h-4" }), "Coding Challenges"] }), _jsxs("h2", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Sharpen your " }), _jsx("span", { className: "text-primary glow-text", children: "skills" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "Daily challenges, competitive tournaments, and algorithmic puzzles to level up your coding abilities." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-16", children: [_jsx("div", { className: `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: _jsxs("div", { className: "bg-background border border-primary/30 rounded-lg overflow-hidden glow-border", children: [_jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center justify-between bg-primary/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Trophy, { className: "w-5 h-5 text-primary" }), _jsx("span", { className: "font-mono text-sm text-primary", children: "Daily Challenge" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm font-mono", children: [_jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-primary", children: dailyChallenge.timeRemaining })] })] }), _jsxs("div", { className: "p-6 border-b border-border", children: [_jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: dailyChallenge.title }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: dailyChallenge.description }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsx("span", { className: "text-yellow-400 font-mono", children: dailyChallenge.difficulty }), _jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4" }), dailyChallenge.participants, " solving"] })] })] }), _jsx("div", { className: "p-4 font-mono text-xs bg-background scanline", children: _jsx("pre", { className: "text-muted-foreground overflow-x-auto", children: dailyChallenge.code.split('\n').map((line, i) => (_jsxs("div", { className: "leading-relaxed", children: [_jsx("span", { className: "text-primary/30 select-none w-6 inline-block", children: i + 1 }), _jsx("span", { className: line.includes('//') ? 'text-muted-foreground/50' : '', children: line.includes('function') ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-chart-3", children: "function" }), line.replace('function', '')] })) : line.includes('return') ? (_jsxs(_Fragment, { children: [line.split('return')[0], _jsx("span", { className: "text-chart-3", children: "return" }), line.split('return')[1]] })) : line })] }, i))) }) }), _jsx("div", { className: "p-4 border-t border-border", children: _jsxs("button", { className: "w-full py-3 bg-primary text-primary-foreground rounded font-mono text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow-box", children: [_jsx(Play, { className: "w-4 h-4" }), "Start Challenge"] }) })] }) }), _jsxs("div", { className: `space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [_jsxs("h3", { className: "text-lg font-semibold text-foreground mb-6 flex items-center gap-2", children: [_jsx("span", { className: "text-primary font-mono", children: ">" }), "More Challenges"] }), challenges.map((challenge, index) => (_jsxs("button", { type: "button", onClick: () => setActiveChallenge(index), className: `w-full text-left p-5 bg-background border rounded-lg transition-all duration-300 group ${activeChallenge === index
                                            ? "border-primary/50 shadow-lg shadow-primary/10"
                                            : "border-border hover:border-primary/30"}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground group-hover:text-primary transition-colors", children: challenge.title }), _jsx("span", { className: `text-xs font-mono ${challenge.difficultyColor}`, children: challenge.difficulty })] }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-lg font-bold text-primary", children: challenge.points }), _jsx("span", { className: "text-xs text-muted-foreground block", children: "points" })] })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: challenge.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), challenge.timeLimit] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), challenge.participants] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(CheckCircle, { className: "w-3 h-3 text-primary" }), _jsxs("span", { children: [challenge.completionRate, "%"] })] })] }), _jsx("div", { className: "mt-3 h-1 bg-secondary rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-primary transition-all duration-500", style: { width: `${challenge.completionRate}%` } }) })] }, challenge.id))), _jsxs("a", { href: "#", className: "block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-4", children: ["View all challenges ", "→"] })] })] })] })] }));
}
