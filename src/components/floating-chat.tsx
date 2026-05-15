import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  X, 
  Send, 
  Code2, 
  Users, 
  Trophy, 
  Swords, 
  MessageCircle,
  Crown,
  Terminal,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Developers", path: "/developers", icon: Users, description: "Browse talented developers" },
  { label: "Projects", path: "/projects", icon: Code2, description: "Explore amazing projects" },
  { label: "Challenges", path: "/challenges", icon: Swords, description: "Test your skills" },
  { label: "Community", path: "/community", icon: MessageCircle, description: "Join discussions" },
  { label: "Leaderboard", path: "/leaderboard", icon: Crown, description: "See top performers" },
];

const chatMessages = [
  {
    type: "bot",
    message: "Hello, Developer! Welcome to CodeSphere.",
    delay: 0,
  },
  {
    type: "bot", 
    message: "I'm your AI assistant. While I'm still learning, I can help you navigate the platform.",
    delay: 800,
  },
  {
    type: "bot",
    message: "Here are some quick links to get you started:",
    delay: 1600,
  },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && visibleMessages < chatMessages.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
        setIsTyping(false);
      }, chatMessages[visibleMessages]?.delay || 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visibleMessages]);

  const handleOpen = () => {
    setIsOpen(true);
    if (visibleMessages === 0) {
      setVisibleMessages(0);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setInputValue("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 glow-box ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 origin-bottom-right ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl glow-border">
          {/* Header */}
          <div className="bg-secondary/50 px-4 py-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
                  CodeSphere AI
                  <Sparkles className="w-3 h-3 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-background/50 scanline">
            {/* Bot Messages */}
            {chatMessages.slice(0, visibleMessages).map((msg, index) => (
              <div key={index} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary/50 border border-border rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                  <p className="text-sm text-foreground font-mono leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-in fade-in duration-200">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary/50 border border-border rounded-lg rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links */}
            {visibleMessages >= chatMessages.length && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleClose}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-primary/50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {link.description}
                      </p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {"→"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-secondary/30">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message... (Coming soon)"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  disabled
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                  AI
                </span>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled
                className="px-3 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2 font-mono">
              AI integration coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden"
          onClick={handleClose}
        />
      )}
    </>
  );
}
