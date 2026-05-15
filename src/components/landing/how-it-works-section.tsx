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
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="challenges"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-card border-y border-border overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <Zap className="w-4 h-4" />
            Coding Challenges
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Sharpen your </span>
            <span className="text-primary glow-text">skills</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Daily challenges, competitive tournaments, and algorithmic puzzles to level up your coding abilities.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Daily Challenge */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-background border border-primary/30 rounded-lg overflow-hidden glow-border">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm text-primary">Daily Challenge</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-primary">{dailyChallenge.timeRemaining}</span>
                </div>
              </div>

              {/* Challenge info */}
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {dailyChallenge.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dailyChallenge.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-yellow-400 font-mono">{dailyChallenge.difficulty}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {dailyChallenge.participants} solving
                  </span>
                </div>
              </div>

              {/* Code editor preview */}
              <div className="p-4 font-mono text-xs bg-background scanline">
                <pre className="text-muted-foreground overflow-x-auto">
                  {dailyChallenge.code.split('\n').map((line, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-primary/30 select-none w-6 inline-block">{i + 1}</span>
                      <span className={line.includes('//') ? 'text-muted-foreground/50' : ''}>
                        {line.includes('function') ? (
                          <>
                            <span className="text-chart-3">function</span>
                            {line.replace('function', '')}
                          </>
                        ) : line.includes('return') ? (
                          <>
                            {line.split('return')[0]}
                            <span className="text-chart-3">return</span>
                            {line.split('return')[1]}
                          </>
                        ) : line}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Action */}
              <div className="p-4 border-t border-border">
                <button className="w-full py-3 bg-primary text-primary-foreground rounded font-mono text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow-box">
                  <Play className="w-4 h-4" />
                  Start Challenge
                </button>
              </div>
            </div>
          </div>

          {/* Challenge List */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary font-mono">{">"}</span>
              More Challenges
            </h3>

            {challenges.map((challenge, index) => (
              <button
                key={challenge.id}
                type="button"
                onClick={() => setActiveChallenge(index)}
                className={`w-full text-left p-5 bg-background border rounded-lg transition-all duration-300 group ${
                  activeChallenge === index
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {challenge.title}
                    </h4>
                    <span className={`text-xs font-mono ${challenge.difficultyColor}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">{challenge.points}</span>
                    <span className="text-xs text-muted-foreground block">points</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {challenge.timeLimit}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {challenge.participants}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    <span>{challenge.completionRate}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${challenge.completionRate}%` }}
                  />
                </div>
              </button>
            ))}

            <a
              href="#"
              className="block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-4"
            >
              View all challenges {"→"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
