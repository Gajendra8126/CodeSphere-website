import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, Search, ThumbsUp, MessageCircle, Eye, 
  Pin, Filter, ChevronDown, Plus, Clock, TrendingUp,
  HelpCircle, Lightbulb, Share2, Bookmark
} from "lucide-react";
import { communityPosts, developers } from "../data/mock-data";

const categories = [
  { id: "all", label: "All Posts", icon: MessageSquare },
  { id: "Help", label: "Help", icon: HelpCircle },
  { id: "Discussion", label: "Discussion", icon: MessageCircle },
  { id: "Showcase", label: "Showcase", icon: Share2 },
  { id: "Tutorial", label: "Tutorial", icon: Lightbulb },
];

function PostCard({ 
  post, 
  index 
}: { 
  post: typeof communityPosts[0]; 
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const author = developers.find(d => d.username === post.author);

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || MessageSquare;
  };

  const CategoryIcon = getCategoryIcon(post.category);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  return (
    <div
      ref={cardRef}
      className={`group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 ${
        post.isPinned ? "border-l-4 border-l-primary" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        <div 
          className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary cursor-pointer hover:bg-primary/30 transition-colors shrink-0"
          onClick={() => navigate(`/developers/${post.author}`)}
        >
          {post.authorAvatar}
        </div>

        <div className="flex-1 min-w-0">
          {/* Meta */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span 
              className="font-medium text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => navigate(`/developers/${post.author}`)}
            >
              {post.authorName}
            </span>
            <span className="text-xs text-muted-foreground font-mono">@{post.author}</span>
            <span className="text-xs text-muted-foreground">in</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded ${
              post.category === "Help" ? "bg-red-500/10 text-red-500" :
              post.category === "Discussion" ? "bg-blue-500/10 text-blue-500" :
              post.category === "Showcase" ? "bg-green-500/10 text-green-500" :
              "bg-yellow-500/10 text-yellow-500"
            }`}>
              <CategoryIcon className="w-3 h-3" />
              {post.category}
            </span>
            {post.isPinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded">
                <Pin className="w-3 h-3" />
                Pinned
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-2">
            {post.title}
          </h3>

          {/* Content Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" />
                {post.likes}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.replies}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Bookmark className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </button>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {getTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunityPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredPosts = communityPosts
    .filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Always show pinned posts first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      if (sortBy === "popular") return b.likes - a.likes;
      if (sortBy === "trending") return (b.replies + b.views) - (a.replies + a.views);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <section className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <MessageSquare className="w-4 h-4" />
            Community Forum
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1
                className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="text-foreground">Join the </span>
                <span className="text-primary glow-text">discussion</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-xl">
                Connect with fellow developers, ask questions, share your projects, and help others grow.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4 text-sm">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4 text-sm">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Python", "Kubernetes", "DevOps", "Machine Learning", "Security"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4 text-sm">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Posts</span>
                  <span className="font-mono text-foreground">{communityPosts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-mono text-foreground">{developers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Replies</span>
                  <span className="font-mono text-foreground">{communityPosts.reduce((acc, p) => acc + p.replies, 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts, tags, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-card border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Sort Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("recent")}
                  className="font-mono"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Recent
                </Button>
                <Button
                  variant={sortBy === "popular" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("popular")}
                  className="font-mono"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Popular
                </Button>
                <Button
                  variant={sortBy === "trending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("trending")}
                  className="font-mono"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm font-mono text-muted-foreground mb-4">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-mono text-muted-foreground">No posts found</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
