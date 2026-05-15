import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Crown, Code2, Target, TrendingUp, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { developers } from "../data/mock-data";
// Sort developers by different criteria
const getLeaderboard = (sortBy) => {
    return [...developers].sort((a, b) => {
        if (sortBy === "competition")
            return b.competitionPoints - a.competitionPoints;
        if (sortBy === "contribution")
            return b.contributionPoints - a.contributionPoints;
        return b.totalPoints - a.totalPoints;
    }).map((dev, index) => ({ ...dev, position: index + 1 }));
};
function LeaderboardRow({ developer, position, sortBy, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 50);
        return () => clearTimeout(timer);
    }, [index]);
    const getPositionDisplay = (pos) => {
        if (pos === 1)
            return _jsx(Crown, { className: "w-5 h-5 text-yellow-500" });
        if (pos === 2)
            return _jsx(Medal, { className: "w-5 h-5 text-gray-400" });
        if (pos === 3)
            return _jsx(Medal, { className: "w-5 h-5 text-amber-600" });
        return _jsx("span", { className: "font-mono text-muted-foreground", children: pos });
    };
    const getPositionBg = (pos) => {
        if (pos === 1)
            return "bg-yellow-500/10 border-yellow-500/30";
        if (pos === 2)
            return "bg-gray-400/10 border-gray-400/30";
        if (pos === 3)
            return "bg-amber-600/10 border-amber-600/30";
        return "bg-card border-border";
    };
    const getRankChange = () => {
        const change = Math.floor(Math.random() * 5) - 2; // Simulated rank change
        if (change > 0)
            return { icon: ChevronUp, class: "text-green-500", value: `+${change}` };
        if (change < 0)
            return { icon: ChevronDown, class: "text-red-500", value: change };
        return { icon: Minus, class: "text-muted-foreground", value: "-" };
    };
    const rankChange = getRankChange();
    const getPoints = () => {
        if (sortBy === "competition")
            return developer.competitionPoints;
        if (sortBy === "contribution")
            return developer.contributionPoints;
        return developer.totalPoints;
    };
    return (_jsxs("div", { onClick: () => navigate(`/developers/${developer.username}`), className: `group flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 ${getPositionBg(position)} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("div", { className: "w-10 h-10 flex items-center justify-center", children: getPositionDisplay(position) }), _jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-lg text-primary shrink-0", children: developer.avatar }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-colors truncate", children: developer.name }), position <= 3 && (_jsxs("span", { className: "px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded", children: ["Top ", position] }))] }), _jsxs("p", { className: "text-sm font-mono text-muted-foreground", children: ["@", developer.username] })] }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Challenges" }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.challengesCompleted })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Stars" }), _jsx("p", { className: "font-mono text-sm text-foreground", children: developer.stars })] })] }), _jsxs("div", { className: `flex items-center gap-1 w-12 justify-center ${rankChange.class}`, children: [_jsx(rankChange.icon, { className: "w-4 h-4" }), _jsx("span", { className: "text-xs font-mono", children: rankChange.value })] }), _jsxs("div", { className: "text-right min-w-[100px]", children: [_jsx("p", { className: "text-lg font-bold font-mono text-primary", children: getPoints().toLocaleString() }), _jsx("p", { className: "text-xs text-muted-foreground", children: "points" })] })] }));
}
export function LeaderboardPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [sortBy, setSortBy] = useState("total");
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const leaderboard = getLeaderboard(sortBy);
    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);
    return (_jsx("section", { className: "relative pt-32 pb-24 min-h-screen", children: _jsxs("div", { className: "max-w-[1200px] mx-auto px-6 lg:px-12", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("span", { className: "inline-flex items-center gap-3 text-sm font-mono text-primary mb-6", children: [_jsx(Trophy, { className: "w-4 h-4" }), "Global Rankings"] }), _jsxs("h1", { className: `text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("span", { className: "text-foreground", children: "Developer " }), _jsx("span", { className: "text-primary glow-text", children: "Leaderboard" })] }), _jsx("p", { className: "text-lg text-muted-foreground mt-4 max-w-xl", children: "See how you stack up against the best developers. Earn points through competitions and contributions." })] }), _jsx("div", { className: `mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsxs("div", { className: "grid grid-cols-3 gap-4 items-end max-w-3xl mx-auto", children: [_jsxs("div", { className: "order-1", children: [_jsxs("div", { className: "bg-card border border-gray-400/30 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto rounded-xl bg-gray-400/20 border border-gray-400/30 flex items-center justify-center font-mono text-2xl text-gray-400 mb-3", children: topThree[1]?.avatar }), _jsx(Medal, { className: "w-6 h-6 text-gray-400 mx-auto mb-2" }), _jsx("h3", { className: "font-semibold text-foreground text-sm", children: topThree[1]?.name }), _jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: ["@", topThree[1]?.username] }), _jsx("p", { className: "text-lg font-bold font-mono text-gray-400 mt-2", children: sortBy === "competition" ? topThree[1]?.competitionPoints.toLocaleString() :
                                                    sortBy === "contribution" ? topThree[1]?.contributionPoints.toLocaleString() :
                                                        topThree[1]?.totalPoints.toLocaleString() })] }), _jsx("div", { className: "h-16 bg-gray-400/10 rounded-b-lg -mt-2" })] }), _jsxs("div", { className: "order-2", children: [_jsxs("div", { className: "bg-card border-2 border-yellow-500/30 rounded-lg p-6 text-center glow-border", children: [_jsx("div", { className: "w-20 h-20 mx-auto rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center font-mono text-3xl text-yellow-500 mb-3", children: topThree[0]?.avatar }), _jsx(Crown, { className: "w-8 h-8 text-yellow-500 mx-auto mb-2" }), _jsx("h3", { className: "font-bold text-foreground", children: topThree[0]?.name }), _jsxs("p", { className: "text-sm font-mono text-muted-foreground", children: ["@", topThree[0]?.username] }), _jsx("p", { className: "text-2xl font-bold font-mono text-yellow-500 mt-2", children: sortBy === "competition" ? topThree[0]?.competitionPoints.toLocaleString() :
                                                    sortBy === "contribution" ? topThree[0]?.contributionPoints.toLocaleString() :
                                                        topThree[0]?.totalPoints.toLocaleString() })] }), _jsx("div", { className: "h-24 bg-yellow-500/10 rounded-b-lg -mt-2" })] }), _jsxs("div", { className: "order-3", children: [_jsxs("div", { className: "bg-card border border-amber-600/30 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto rounded-xl bg-amber-600/20 border border-amber-600/30 flex items-center justify-center font-mono text-2xl text-amber-600 mb-3", children: topThree[2]?.avatar }), _jsx(Medal, { className: "w-6 h-6 text-amber-600 mx-auto mb-2" }), _jsx("h3", { className: "font-semibold text-foreground text-sm", children: topThree[2]?.name }), _jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: ["@", topThree[2]?.username] }), _jsx("p", { className: "text-lg font-bold font-mono text-amber-600 mt-2", children: sortBy === "competition" ? topThree[2]?.competitionPoints.toLocaleString() :
                                                    sortBy === "contribution" ? topThree[2]?.contributionPoints.toLocaleString() :
                                                        topThree[2]?.totalPoints.toLocaleString() })] }), _jsx("div", { className: "h-8 bg-amber-600/10 rounded-b-lg -mt-2" })] })] }) }), _jsxs(Tabs, { value: sortBy, onValueChange: (v) => setSortBy(v), className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs(TabsList, { className: "bg-card border border-border p-1", children: [_jsxs(TabsTrigger, { value: "total", className: "font-mono text-sm", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2" }), "Total Points"] }), _jsxs(TabsTrigger, { value: "competition", className: "font-mono text-sm", children: [_jsx(Target, { className: "w-4 h-4 mr-2" }), "Competition"] }), _jsxs(TabsTrigger, { value: "contribution", className: "font-mono text-sm", children: [_jsx(Code2, { className: "w-4 h-4 mr-2" }), "Contribution"] })] }), _jsxs("div", { className: "hidden sm:flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), "Updated hourly"] })] }), _jsx(TabsContent, { value: "total", className: "space-y-3", children: rest.map((developer, index) => (_jsx(LeaderboardRow, { developer: developer, position: developer.position, sortBy: "total", index: index }, developer.id))) }), _jsx(TabsContent, { value: "competition", className: "space-y-3", children: getLeaderboard("competition").slice(3).map((developer, index) => (_jsx(LeaderboardRow, { developer: developer, position: developer.position, sortBy: "competition", index: index }, developer.id))) }), _jsx(TabsContent, { value: "contribution", className: "space-y-3", children: getLeaderboard("contribution").slice(3).map((developer, index) => (_jsx(LeaderboardRow, { developer: developer, position: developer.position, sortBy: "contribution", index: index }, developer.id))) })] })] }) }));
}
