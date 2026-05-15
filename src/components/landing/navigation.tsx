import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu, X, Terminal, Github, Mail, Lock, User, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Developers", href: "/developers" },
  { name: "Projects", href: "/projects" },
  { name: "Challenges", href: "/challenges" },
  { name: "Community", href: "/community" },
  { name: "Leaderboard", href: "/leaderboard" },
];

function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication here
    console.log(isSignUp ? "Sign up" : "Login", { email, password, username });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-mono font-bold text-lg">
              <span className="text-primary">Code</span>
              <span className="text-foreground">Sphere</span>
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isSignUp 
              ? "Join 50,000+ developers in the community" 
              : "Sign in to continue to CodeSphere"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box"
          >
            {isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground font-mono">or continue with</span>
            </div>
          </div>

          <Button 
            type="button"
            variant="outline" 
            className="w-full h-11 font-mono border-border hover:border-primary/50 hover:bg-primary/10"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-mono"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled 
            ? "top-4 left-4 right-4" 
            : "top-0 left-0 right-0"
        }`}
      >
        <nav 
          className={`mx-auto transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "bg-card/90 backdrop-blur-xl border border-primary/20 rounded-lg shadow-lg shadow-primary/5 max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
          }`}
        >
          <div 
            className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
              isScrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Terminal className={`text-primary transition-all duration-500 ${isScrolled ? "w-5 h-5" : "w-6 h-6"}`} />
              <span className={`font-mono font-bold tracking-tight transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"}`}>
                <span className="text-primary">Code</span>
                <span className="text-foreground">Sphere</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-mono transition-colors duration-300 relative group ${
                    isActive(link.href) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-primary/50 mr-1">{">"}</span>
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className={`font-mono text-muted-foreground hover:text-primary transition-all duration-500 ${isScrolled ? "text-xs" : "text-sm"}`}
              >
                Login
              </button>
              <Button
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded font-mono transition-all duration-500 glow-box ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
              >
                Join Community
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </nav>
        
        {/* Mobile Menu - Full Screen Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 scanline ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: 0 }}
        >
          <div className="flex flex-col h-full px-8 pt-28 pb-8">
            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center gap-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-3xl font-mono transition-all duration-500 ${
                    isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
                  } ${
                    isMobileMenuOpen 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
                >
                  <span className="text-primary mr-2">$</span>
                  {link.name.toLowerCase()}
                </Link>
              ))}
            </div>
            
            {/* Bottom CTAs */}
            <div className={`flex gap-4 pt-8 border-t border-primary/20 transition-all duration-500 ${
              isMobileMenuOpen 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
            >
              <Button 
                variant="outline" 
                className="flex-1 rounded h-14 text-base font-mono border-primary/30 hover:bg-primary/10"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Login
              </Button>
              <Button 
                className="flex-1 bg-primary text-primary-foreground rounded h-14 text-base font-mono glow-box"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
