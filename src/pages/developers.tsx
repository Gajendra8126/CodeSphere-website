import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, Search, Star, GitFork, Code2, Trophy, 
  Filter, ChevronDown 
} from "lucide-react";
import { developers, techStackOptions } from "../data/mock-data";

function DeveloperCard({ developer, index }: { developer: typeof developers[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-yellow-950";
    if (rank === 2) return "bg-gray-400 text-gray-950";
    if (rank === 3) return "bg-amber-600 text-amber-950";
    return "bg-primary text-primary-foreground";
  };

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(`/developers/${developer.username}`)}
      className={`group relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Rank badge */}
      <div className={`absolute -top-3 -right-3 w-8 h-8 ${getRankColor(developer.rank)} rounded-full flex items-center justify-center font-mono text-sm font-bold`}>
        #{developer.rank}
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xl text-primary">
          {developer.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{developer.name}</h3>
          <p className="text-sm font-mono text-primary">@{developer.username}</p>
          <p className="text-xs text-muted-foreground mt-1">{developer.role}</p>
        </div>
      </div>

      {/* Skills Preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {developer.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
          >
            {skill}
          </span>
        ))}
        {developer.skills.length > 3 && (
          <span className="px-2 py-1 text-xs font-mono text-muted-foreground">
            +{developer.skills.length - 3}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Trophy className="w-3 h-3" />
          </div>
          <p className="font-mono text-sm text-foreground">{developer.totalPoints.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Points</p>
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

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
    </div>
  );
}

export function DevelopersPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch = 
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => dev.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <section ref={sectionRef} className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <Users className="w-4 h-4" />
            Developer Directory
          </span>
          <h1
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Meet our </span>
            <span className="text-primary glow-text">developers</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Connect with talented developers from around the world. Browse profiles, view tech stacks, and start collaborating.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search developers by name, username, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 font-mono border-border hover:border-primary/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter by Tech
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Tech Stack Filters */}
          {showFilters && (
            <div className="p-4 bg-card border border-border rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm font-mono text-muted-foreground mb-3">Select technologies:</p>
              <div className="flex flex-wrap gap-2">
                {techStackOptions.slice(0, 15).map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleSkill(tech)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                      selectedSkills.includes(tech)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className="mt-3 text-xs font-mono text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm font-mono text-muted-foreground mb-6">
          Showing {filteredDevelopers.length} developer{filteredDevelopers.length !== 1 ? "s" : ""}
        </p>

        {/* Developer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDevelopers.map((developer, index) => (
            <DeveloperCard key={developer.id} developer={developer} index={index} />
          ))}
        </div>

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-mono text-muted-foreground">No developers found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
}
