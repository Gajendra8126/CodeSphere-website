import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Medal, Crown, Star, Code2, Target, 
  TrendingUp, ChevronUp, ChevronDown, Minus
} from "lucide-react";
import { developers } from "../data/mock-data";

// Sort developers by different criteria
const getLeaderboard = (sortBy: "total" | "competition" | "contribution") => {
  return [...developers].sort((a, b) => {
    if (sortBy === "competition") return b.competitionPoints - a.competitionPoints;
    if (sortBy === "contribution") return b.contributionPoints - a.contributionPoints;
    return b.totalPoints - a.totalPoints;
  }).map((dev, index) => ({ ...dev, position: index + 1 }));
};

function LeaderboardRow({ 
  developer, 
  position, 
  sortBy,
  index 
}: { 
  developer: typeof developers[0] & { position: number }; 
  position: number;
  sortBy: "total" | "competition" | "contribution";
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const getPositionDisplay = (pos: number) => {
    if (pos === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (pos === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (pos === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-mono text-muted-foreground">{pos}</span>;
  };

  const getPositionBg = (pos: number) => {
    if (pos === 1) return "bg-yellow-500/10 border-yellow-500/30";
    if (pos === 2) return "bg-gray-400/10 border-gray-400/30";
    if (pos === 3) return "bg-amber-600/10 border-amber-600/30";
    return "bg-card border-border";
  };

  const getRankChange = () => {
    const change = Math.floor(Math.random() * 5) - 2; // Simulated rank change
    if (change > 0) return { icon: ChevronUp, class: "text-green-500", value: `+${change}` };
    if (change < 0) return { icon: ChevronDown, class: "text-red-500", value: change };
    return { icon: Minus, class: "text-muted-foreground", value: "-" };
  };

  const rankChange = getRankChange();

  const getPoints = () => {
    if (sortBy === "competition") return developer.competitionPoints;
    if (sortBy === "contribution") return developer.contributionPoints;
    return developer.totalPoints;
  };

  return (
    <div
      onClick={() => navigate(`/developers/${developer.username}`)}
      className={`group flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 ${getPositionBg(position)} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Position */}
      <div className="w-10 h-10 flex items-center justify-center">
        {getPositionDisplay(position)}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-lg text-primary shrink-0">
        {developer.avatar}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {developer.name}
          </h3>
          {position <= 3 && (
            <span className="px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded">
              Top {position}
            </span>
          )}
        </div>
        <p className="text-sm font-mono text-muted-foreground">@{developer.username}</p>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-8">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Challenges</p>
          <p className="font-mono text-sm text-foreground">{developer.challengesCompleted}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Stars</p>
          <p className="font-mono text-sm text-foreground">{developer.stars}</p>
        </div>
      </div>

      {/* Rank Change */}
      <div className={`flex items-center gap-1 w-12 justify-center ${rankChange.class}`}>
        <rankChange.icon className="w-4 h-4" />
        <span className="text-xs font-mono">{rankChange.value}</span>
      </div>

      {/* Points */}
      <div className="text-right min-w-[100px]">
        <p className="text-lg font-bold font-mono text-primary">{getPoints().toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">points</p>
      </div>
    </div>
  );
}

export function LeaderboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState<"total" | "competition" | "contribution">("total");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const leaderboard = getLeaderboard(sortBy);
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <section className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <Trophy className="w-4 h-4" />
            Global Rankings
          </span>
          <h1
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Developer </span>
            <span className="text-primary glow-text">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            See how you stack up against the best developers. Earn points through competitions and contributions.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div 
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-3 gap-4 items-end max-w-3xl mx-auto">
            {/* 2nd Place */}
            <div className="order-1">
              <div className="bg-card border border-gray-400/30 rounded-lg p-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gray-400/20 border border-gray-400/30 flex items-center justify-center font-mono text-2xl text-gray-400 mb-3">
                  {topThree[1]?.avatar}
                </div>
                <Medal className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground text-sm">{topThree[1]?.name}</h3>
                <p className="text-xs font-mono text-muted-foreground">@{topThree[1]?.username}</p>
                <p className="text-lg font-bold font-mono text-gray-400 mt-2">
                  {sortBy === "competition" ? topThree[1]?.competitionPoints.toLocaleString() :
                   sortBy === "contribution" ? topThree[1]?.contributionPoints.toLocaleString() :
                   topThree[1]?.totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="h-16 bg-gray-400/10 rounded-b-lg -mt-2" />
            </div>

            {/* 1st Place */}
            <div className="order-2">
              <div className="bg-card border-2 border-yellow-500/30 rounded-lg p-6 text-center glow-border">
                <div className="w-20 h-20 mx-auto rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center font-mono text-3xl text-yellow-500 mb-3">
                  {topThree[0]?.avatar}
                </div>
                <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-bold text-foreground">{topThree[0]?.name}</h3>
                <p className="text-sm font-mono text-muted-foreground">@{topThree[0]?.username}</p>
                <p className="text-2xl font-bold font-mono text-yellow-500 mt-2">
                  {sortBy === "competition" ? topThree[0]?.competitionPoints.toLocaleString() :
                   sortBy === "contribution" ? topThree[0]?.contributionPoints.toLocaleString() :
                   topThree[0]?.totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="h-24 bg-yellow-500/10 rounded-b-lg -mt-2" />
            </div>

            {/* 3rd Place */}
            <div className="order-3">
              <div className="bg-card border border-amber-600/30 rounded-lg p-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-amber-600/20 border border-amber-600/30 flex items-center justify-center font-mono text-2xl text-amber-600 mb-3">
                  {topThree[2]?.avatar}
                </div>
                <Medal className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground text-sm">{topThree[2]?.name}</h3>
                <p className="text-xs font-mono text-muted-foreground">@{topThree[2]?.username}</p>
                <p className="text-lg font-bold font-mono text-amber-600 mt-2">
                  {sortBy === "competition" ? topThree[2]?.competitionPoints.toLocaleString() :
                   sortBy === "contribution" ? topThree[2]?.contributionPoints.toLocaleString() :
                   topThree[2]?.totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="h-8 bg-amber-600/10 rounded-b-lg -mt-2" />
            </div>
          </div>
        </div>

        {/* Tabs for sorting */}
        <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-card border border-border p-1">
              <TabsTrigger value="total" className="font-mono text-sm">
                <Trophy className="w-4 h-4 mr-2" />
                Total Points
              </TabsTrigger>
              <TabsTrigger value="competition" className="font-mono text-sm">
                <Target className="w-4 h-4 mr-2" />
                Competition
              </TabsTrigger>
              <TabsTrigger value="contribution" className="font-mono text-sm">
                <Code2 className="w-4 h-4 mr-2" />
                Contribution
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              Updated hourly
            </div>
          </div>

          <TabsContent value="total" className="space-y-3">
            {rest.map((developer, index) => (
              <LeaderboardRow
                key={developer.id}
                developer={developer}
                position={developer.position}
                sortBy="total"
                index={index}
              />
            ))}
          </TabsContent>

          <TabsContent value="competition" className="space-y-3">
            {getLeaderboard("competition").slice(3).map((developer, index) => (
              <LeaderboardRow
                key={developer.id}
                developer={developer}
                position={developer.position}
                sortBy="competition"
                index={index}
              />
            ))}
          </TabsContent>

          <TabsContent value="contribution" className="space-y-3">
            {getLeaderboard("contribution").slice(3).map((developer, index) => (
              <LeaderboardRow
                key={developer.id}
                developer={developer}
                position={developer.position}
                sortBy="contribution"
                index={index}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
