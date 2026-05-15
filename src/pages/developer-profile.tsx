import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Github, Twitter, Globe, MapPin, Calendar,
  Trophy, Star, GitFork, Code2, MessageSquare, Target,
  UserPlus, Mail, ExternalLink
} from "lucide-react";
import { developers, projects as allProjects, communityPosts } from "../data/mock-data";

export function DeveloperProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const developer = developers.find(d => d.username === username);
  
  if (!developer) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-mono text-muted-foreground">Developer not found</p>
          <Button onClick={() => navigate("/developers")} className="mt-4 font-mono">
            Back to Developers
          </Button>
        </div>
      </div>
    );
  }

  const developerProjects = allProjects.filter(p => p.author === developer.username);
  const developerPosts = communityPosts.filter(p => p.author === developer.username);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-yellow-950";
    if (rank === 2) return "bg-gray-400 text-gray-950";
    if (rank === 3) return "bg-amber-600 text-amber-950";
    return "bg-primary text-primary-foreground";
  };

  return (
    <section className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/developers")}
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Developers
        </button>

        {/* Profile Header */}
        <div 
          className={`bg-card border border-border rounded-lg p-8 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-4xl lg:text-5xl text-primary">
                  {developer.avatar}
                </div>
                <div className={`absolute -top-2 -right-2 w-10 h-10 ${getRankColor(developer.rank)} rounded-full flex items-center justify-center font-mono text-sm font-bold`}>
                  #{developer.rank}
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{developer.name}</h1>
                <p className="text-lg font-mono text-primary">@{developer.username}</p>
                <p className="text-muted-foreground mt-1">{developer.role}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {developer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(developer.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:ml-auto">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box">
                <UserPlus className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button variant="outline" className="font-mono border-primary/30 hover:bg-primary/10">
                <Mail className="w-4 h-4 mr-2" />
                Invite to Project
              </Button>
              <div className="flex items-center gap-2 mt-2">
                <a href={developer.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={developer.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={developer.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mt-6 max-w-2xl">{developer.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-mono bg-secondary text-secondary-foreground rounded"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Badges */}
          {developer.badges && developer.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {developer.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div 
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Trophy className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{developer.competitionPoints.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Competition Points</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Code2 className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{developer.contributionPoints.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Contribution Points</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Target className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{developer.challengesCompleted}</p>
            <p className="text-xs text-muted-foreground">Challenges Completed</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <MessageSquare className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{developer.communityMessages}</p>
            <p className="text-xs text-muted-foreground">Community Messages</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-card border border-border p-1 mb-6">
            <TabsTrigger value="overview" className="font-mono text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-mono text-sm">
              Projects ({developerProjects.length})
            </TabsTrigger>
            <TabsTrigger value="community" className="font-mono text-sm">
              Community ({developerPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-primary" />
                  Repository Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Repositories</span>
                    <span className="font-mono text-foreground">{developer.repos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Stars</span>
                    <span className="font-mono text-foreground">{developer.stars.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contributions</span>
                    <span className="font-mono text-foreground">{developer.contributions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Points Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Competition Points</span>
                    <span className="font-mono text-foreground">{developer.competitionPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contribution Points</span>
                    <span className="font-mono text-foreground">{developer.contributionPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 mt-3">
                    <span className="font-semibold text-foreground">Total Points</span>
                    <span className="font-mono font-bold text-primary">{developer.totalPoints.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {developerProjects.length > 0 ? (
              developerProjects.map((project) => (
                <div key={project.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {project.forks}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <GitFork className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No projects yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            {developerPosts.length > 0 ? (
              developerPosts.map((post) => (
                <div key={post.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded">
                          {post.category}
                        </span>
                        {post.isPinned && (
                          <span className="px-2 py-0.5 text-xs font-mono bg-yellow-500/20 text-yellow-500 rounded">
                            Pinned
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <p>{post.replies} replies</p>
                      <p>{post.likes} likes</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No community posts yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
