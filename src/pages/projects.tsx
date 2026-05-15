import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FolderGit2, Search, Star, GitFork, Filter, 
  ChevronDown, ExternalLink, Calendar
} from "lucide-react";
import { projects, techStackOptions } from "../data/mock-data";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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

  return (
    <div
      ref={cardRef}
      className={`group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>
        <a 
          href="#" 
          className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors shrink-0"
          title="View project"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Author */}
      <div 
        className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-secondary/50 p-2 -mx-2 rounded-lg transition-colors"
        onClick={() => navigate(`/developers/${project.author}`)}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary">
          {project.authorAvatar}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{project.authorName}</p>
          <p className="text-xs font-mono text-muted-foreground">@{project.author}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4" />
            {project.stars}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <GitFork className="w-4 h-4" />
            {project.forks}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"stars" | "recent" | "forks">("stars");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.authorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech.length === 0 || 
        selectedTech.some(tech => project.tech.includes(tech));
      
      return matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "forks") return b.forks - a.forks;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <section className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <FolderGit2 className="w-4 h-4" />
            Project Showcase
          </span>
          <h1
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Explore </span>
            <span className="text-primary glow-text">projects</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Discover amazing open source projects built by our community. Filter by technology stack and find inspiration for your next build.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects by name, description, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === "stars" ? "default" : "outline"}
                onClick={() => setSortBy("stars")}
                className="font-mono"
              >
                <Star className="w-4 h-4 mr-2" />
                Most Stars
              </Button>
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                onClick={() => setSortBy("recent")}
                className="font-mono"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Recent
              </Button>
              <Button
                variant={sortBy === "forks" ? "default" : "outline"}
                onClick={() => setSortBy("forks")}
                className="font-mono"
              >
                <GitFork className="w-4 h-4 mr-2" />
                Most Forks
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 font-mono border-border hover:border-primary/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Tech Stack
              {selectedTech.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {selectedTech.length}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Tech Stack Filters */}
          {showFilters && (
            <div className="p-4 bg-card border border-border rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm font-mono text-muted-foreground mb-3">Filter by technology:</p>
              <div className="flex flex-wrap gap-2">
                {techStackOptions.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                      selectedTech.includes(tech)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {selectedTech.length > 0 && (
                <button
                  onClick={() => setSelectedTech([])}
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
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <FolderGit2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-mono text-muted-foreground">No projects found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
}
