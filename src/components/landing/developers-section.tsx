import { useEffect, useRef, useState } from "react";
import { Github, Twitter, Globe, Star, GitFork, Code2 } from "lucide-react";

const developers = [
  {
    name: "Alex Chen",
    username: "@alexc",
    avatar: "AC",
    role: "Full Stack Developer",
    skills: ["TypeScript", "React", "Node.js"],
    repos: 45,
    stars: 1200,
    contributions: 2847,
    rank: 1,
  },
  {
    name: "Sarah Miller",
    username: "@sarahm",
    avatar: "SM",
    role: "Backend Engineer",
    skills: ["Go", "Rust", "PostgreSQL"],
    repos: 32,
    stars: 890,
    contributions: 1923,
    rank: 2,
  },
  {
    name: "James Park",
    username: "@jpark",
    avatar: "JP",
    role: "DevOps Specialist",
    skills: ["Kubernetes", "AWS", "Terraform"],
    repos: 28,
    stars: 756,
    contributions: 1567,
    rank: 3,
  },
  {
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "EW",
    role: "Frontend Developer",
    skills: ["Vue.js", "Svelte", "CSS"],
    repos: 52,
    stars: 634,
    contributions: 2134,
    rank: 4,
  },
  {
    name: "Marcus Johnson",
    username: "@marcusj",
    avatar: "MJ",
    role: "ML Engineer",
    skills: ["Python", "PyTorch", "TensorFlow"],
    repos: 19,
    stars: 1450,
    contributions: 987,
    rank: 5,
  },
  {
    name: "Lisa Wang",
    username: "@lisaw",
    avatar: "LW",
    role: "Security Engineer",
    skills: ["Rust", "C++", "Assembly"],
    repos: 23,
    stars: 567,
    contributions: 1234,
    rank: 6,
  },
];

function DeveloperCard({ developer, index }: { developer: typeof developers[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rank badge */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-mono text-sm font-bold">
        #{developer.rank}
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xl text-primary">
          {developer.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{developer.name}</h3>
          <p className="text-sm font-mono text-primary">{developer.username}</p>
          <p className="text-xs text-muted-foreground mt-1">{developer.role}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {developer.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <GitFork className="w-3 h-3" />
          </div>
          <p className="font-mono text-sm text-foreground">{developer.repos}</p>
          <p className="text-xs text-muted-foreground">Repos</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Star className="w-3 h-3" />
          </div>
          <p className="font-mono text-sm text-foreground">{developer.stars}</p>
          <p className="text-xs text-muted-foreground">Stars</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Code2 className="w-3 h-3" />
          </div>
          <p className="font-mono text-sm text-foreground">{developer.contributions}</p>
          <p className="text-xs text-muted-foreground">Commits</p>
        </div>
      </div>

      {/* Hover actions */}
      <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card via-card to-transparent rounded-b-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center justify-center gap-4">
          <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
            <Github className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
            <Twitter className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="developers"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="text-primary/50">{">"}</span>
            Developer Profiles
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Meet the </span>
            <span className="text-primary glow-text">hackers</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Connect with talented developers from around the world. Share knowledge, collaborate on projects, and grow together.
          </p>
        </div>

        {/* Developer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((developer, index) => (
            <DeveloperCard key={developer.username} developer={developer} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
          >
            View all developers
            <span className="text-primary/50">{"→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
