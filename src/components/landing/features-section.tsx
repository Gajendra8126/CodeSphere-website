import { useEffect, useRef, useState } from "react";
import { Star, GitFork, Eye, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "NeuralFlow",
    description: "A lightweight neural network library for JavaScript with GPU acceleration support.",
    author: "@alexc",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 2340,
    forks: 456,
    views: 12500,
    tags: ["ML", "AI", "GPU"],
  },
  {
    id: 2,
    title: "RustDB",
    description: "High-performance embedded database written in Rust with zero-copy deserialization.",
    author: "@sarahm",
    language: "Rust",
    languageColor: "#dea584",
    stars: 1890,
    forks: 234,
    views: 8900,
    tags: ["Database", "Systems"],
  },
  {
    id: 3,
    title: "CloudDeploy",
    description: "One-click deployment tool for modern web applications. Supports all major clouds.",
    author: "@jpark",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 1567,
    forks: 189,
    views: 7600,
    tags: ["DevOps", "CLI"],
  },
  {
    id: 4,
    title: "ReactiveUI",
    description: "A collection of 100+ accessible React components with beautiful animations.",
    author: "@emmaw",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 3210,
    forks: 567,
    views: 15400,
    tags: ["UI", "React", "A11y"],
  },
  {
    id: 5,
    title: "PyVision",
    description: "Computer vision toolkit built on PyTorch with pre-trained models for common tasks.",
    author: "@marcusj",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4520,
    forks: 890,
    views: 23100,
    tags: ["CV", "PyTorch"],
  },
  {
    id: 6,
    title: "SecureAuth",
    description: "Zero-trust authentication framework with WebAuthn and passwordless support.",
    author: "@lisaw",
    language: "Rust",
    languageColor: "#dea584",
    stars: 987,
    forks: 123,
    views: 5600,
    tags: ["Security", "Auth"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
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
      className={`group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Code preview area */}
      <div className="h-32 bg-secondary/50 border-b border-border p-4 font-mono text-xs overflow-hidden relative scanline">
        <div className="text-muted-foreground">
          <span className="text-primary">const</span> {project.title.toLowerCase()} = <span className="text-chart-2">{"{"}</span>
        </div>
        <div className="text-muted-foreground pl-4">
          name: <span className="text-chart-4">&quot;{project.title}&quot;</span>,
        </div>
        <div className="text-muted-foreground pl-4">
          author: <span className="text-chart-4">&quot;{project.author}&quot;</span>,
        </div>
        <div className="text-muted-foreground pl-4">
          stars: <span className="text-primary">{project.stars}</span>,
        </div>
        <div className="text-muted-foreground">
          <span className="text-chart-2">{"}"}</span>;
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-mono text-sm">
            <ExternalLink className="w-4 h-4" />
            View Project
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: project.languageColor }}
            />
            {project.language}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {project.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {project.forks}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {project.views.toLocaleString()}
          </span>
          <span className="ml-auto font-mono text-xs text-primary">{project.author}</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="text-primary/50">{">"}</span>
            Project Showcase
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Discover </span>
            <span className="text-primary glow-text">projects</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Explore innovative open-source projects built by our community. Get inspired and contribute to the ecosystem.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
          >
            Explore all projects
            <span className="text-primary/50">{"→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
