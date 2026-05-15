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

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 flex items-center justify-center font-mono text-sm text-muted-foreground">#{rank}</span>;
}

export function MetricsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="leaderboard" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
              <Trophy className="w-4 h-4" />
              Community Leaderboard
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-foreground">Top </span>
              <span className="text-primary glow-text">hackers</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              Climb the ranks by solving challenges, contributing to projects, and engaging with the community.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live rankings
            </span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Competitors", value: "12,456", icon: TrendingUp },
            { label: "Challenges Solved Today", value: "8,234", icon: Trophy },
            { label: "Total Points Earned", value: "2.4M", icon: Award },
            { label: "Longest Streak", value: "127 days", icon: Flame },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-card border border-border rounded-lg p-5 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <stat.icon className="w-5 h-5 text-primary mb-3" />
              <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Leaderboard Table */}
        <div className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Developer</div>
            <div className="col-span-2 text-right">Points</div>
            <div className="col-span-2 text-right hidden md:block">Solved</div>
            <div className="col-span-2 text-right hidden lg:block">Streak</div>
            <div className="col-span-1 text-right">Change</div>
          </div>

          {/* Table Body */}
          {leaderboard.map((user, index) => (
            <div
              key={user.username}
              className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 transition-all duration-300 ${
                hoveredRow === index ? "bg-primary/5" : "hover:bg-secondary/30"
              } ${user.rank <= 3 ? "bg-primary/5" : ""}`}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                <RankIcon rank={user.rank} />
              </div>

              {/* Developer */}
              <div className="col-span-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm ${
                  user.rank === 1 ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30" :
                  user.rank === 2 ? "bg-gray-400/20 text-gray-400 border border-gray-400/30" :
                  user.rank === 3 ? "bg-amber-600/20 text-amber-600 border border-amber-600/30" :
                  "bg-primary/20 text-primary border border-primary/30"
                }`}>
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs font-mono text-primary">{user.username}</p>
                </div>
              </div>

              {/* Points */}
              <div className="col-span-2 flex items-center justify-end">
                <span className="font-mono font-bold text-foreground">{user.points.toLocaleString()}</span>
              </div>

              {/* Solved */}
              <div className="col-span-2 items-center justify-end hidden md:flex">
                <span className="font-mono text-muted-foreground">{user.solved}</span>
              </div>

              {/* Streak */}
              <div className="col-span-2 items-center justify-end gap-1 hidden lg:flex">
                <Flame className={`w-4 h-4 ${user.streak >= 30 ? "text-orange-400" : "text-muted-foreground"}`} />
                <span className="font-mono text-muted-foreground">{user.streak}d</span>
              </div>

              {/* Change */}
              <div className="col-span-1 flex items-center justify-end">
                <span className={`font-mono text-sm ${
                  user.change.startsWith('+') ? "text-green-400" :
                  user.change.startsWith('-') ? "text-red-400" :
                  "text-muted-foreground"
                }`}>
                  {user.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
          >
            View full leaderboard
            <span className="text-primary/50">{"→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
