import { useEffect, useState, useRef } from "react";
import { MessageSquare, Heart, Bookmark, Share2, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable APIs with Go and gRPC",
    excerpt: "Learn how to design and implement high-performance APIs using Go and gRPC for microservices architecture.",
    author: "Alex Chen",
    authorAvatar: "AC",
    date: "2 hours ago",
    readTime: "8 min read",
    tags: ["Go", "gRPC", "Backend"],
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "The Future of WebAssembly in Browser Applications",
    excerpt: "Exploring how WASM is changing the landscape of web development and what it means for frontend engineers.",
    author: "Sarah Miller",
    authorAvatar: "SM",
    date: "5 hours ago",
    readTime: "12 min read",
    tags: ["WebAssembly", "Frontend", "Performance"],
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "Rust for Systems Programming: A Practical Guide",
    excerpt: "A comprehensive guide to using Rust for building safe and efficient systems software.",
    author: "Marcus Johnson",
    authorAvatar: "MJ",
    date: "1 day ago",
    readTime: "15 min read",
    tags: ["Rust", "Systems", "Safety"],
    likes: 456,
    comments: 78,
  },
];

const discussions = [
  { title: "What's your favorite tech stack in 2024?", replies: 234, active: true },
  { title: "Tips for passing FAANG interviews", replies: 567, active: true },
  { title: "Best practices for code review", replies: 123, active: false },
  { title: "Remote work productivity hacks", replies: 89, active: true },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="community" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <MessageSquare className="w-4 h-4" />
            Community Hub
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Tech blog & </span>
            <span className="text-primary glow-text">discussions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Stay updated with the latest tech trends, share your knowledge, and engage in meaningful discussions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
              <span className="text-primary font-mono">{">"}</span>
              Latest Articles
            </h3>

            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Bookmark className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments}
                    </button>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </article>
            ))}

            <a
              href="#"
              className="block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-4"
            >
              View all articles {"→"}
            </a>
          </div>

          {/* Sidebar - Discussions */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                <span className="text-primary font-mono">{"#"}</span>
                Hot Discussions
              </h3>

              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      {discussion.active && (
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {discussion.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {discussion.replies} replies
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="#"
                className="block text-center text-sm font-mono text-primary hover:text-primary/80 transition-colors pt-6 mt-4 border-t border-border"
              >
                Join discussions {"→"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
