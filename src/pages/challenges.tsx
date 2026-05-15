import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Target, Trophy, Clock, Users, Calendar, Zap, 
  Award, ArrowRight, Timer, CheckCircle, AlertCircle
} from "lucide-react";
import { challenges } from "../data/mock-data";

const dailyChallenge = challenges.find(c => c.type === "daily");
const ongoingChallenges = challenges.filter(c => c.status === "ongoing");
const upcomingChallenges = challenges.filter(c => c.status === "upcoming");
const pastChallenges = challenges.filter(c => c.status === "completed");

function ChallengeCard({ 
  challenge, 
  index, 
  onClick 
}: { 
  challenge: typeof challenges[0]; 
  index: number;
  onClick: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "text-green-500 bg-green-500/10 border-green-500/30";
    if (difficulty === "Medium") return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    return "text-red-500 bg-red-500/10 border-red-500/30";
  };

  const getStatusBadge = (status?: string) => {
    if (status === "ongoing") return { icon: Timer, text: "In Progress", class: "text-primary bg-primary/10" };
    if (status === "upcoming") return { icon: Clock, text: "Coming Soon", class: "text-blue-500 bg-blue-500/10" };
    if (status === "completed") return { icon: CheckCircle, text: "Completed", class: "text-muted-foreground bg-muted" };
    return null;
  };

  const statusBadge = getStatusBadge(challenge.status);

  return (
    <div
      onClick={onClick}
      className={`group bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-mono border rounded ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            <span className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
              {challenge.category}
            </span>
            {statusBadge && (
              <span className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 ${statusBadge.class}`}>
                <statusBadge.icon className="w-3 h-3" />
                {statusBadge.text}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {challenge.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {challenge.description}
          </p>
        </div>
        {challenge.prize && (
          <div className="text-right shrink-0">
            <p className="text-lg font-bold font-mono text-primary">{challenge.prize}</p>
            <p className="text-xs text-muted-foreground">Prize</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {challenge.participants.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            {challenge.points} pts
          </span>
        </div>
        {challenge.startDate && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(challenge.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(challenge.endDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
        {challenge.timeLimit && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {challenge.timeLimit}
          </span>
        )}
      </div>

      {challenge.winner && (
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-muted-foreground">Winner: </span>
          <span className="text-sm font-mono text-primary">@{challenge.winner}</span>
        </div>
      )}
    </div>
  );
}

function ChallengeDetailDialog({ 
  challenge, 
  open, 
  onClose 
}: { 
  challenge: typeof challenges[0] | null; 
  open: boolean; 
  onClose: () => void;
}) {
  if (!challenge) return null;

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "text-green-500 bg-green-500/10 border-green-500/30";
    if (difficulty === "Medium") return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    return "text-red-500 bg-red-500/10 border-red-500/30";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-mono border rounded ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            <span className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
              {challenge.category}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            {challenge.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {challenge.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Challenge Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs">Points</span>
              </div>
              <p className="font-mono font-bold text-foreground">{challenge.points}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Participants</span>
              </div>
              <p className="font-mono font-bold text-foreground">{challenge.participants.toLocaleString()}</p>
            </div>
          </div>

          {challenge.prize && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-mono">Prize Pool</span>
              </div>
              <p className="font-mono font-bold text-2xl text-primary">{challenge.prize}</p>
            </div>
          )}

          {challenge.startDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-mono text-foreground">
                {new Date(challenge.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(challenge.endDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )}

          {challenge.timeLimit && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Time Limit</span>
              <span className="font-mono text-foreground">{challenge.timeLimit}</span>
            </div>
          )}

          {challenge.winner && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-mono">Winner</span>
              </div>
              <p className="font-mono font-bold text-foreground">@{challenge.winner}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            {challenge.status === "ongoing" && (
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box">
                Join Challenge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {challenge.status === "upcoming" && (
              <Button className="w-full font-mono" variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                Get Notified
              </Button>
            )}
            {challenge.status === "completed" && (
              <Button className="w-full font-mono" variant="outline">
                View Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {challenge.type === "daily" && (
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box">
                Start Challenge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ChallengesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null);
  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <Target className="w-4 h-4" />
            Coding Challenges
          </span>
          <h1
            className={`text-4xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">Test your </span>
            <span className="text-primary glow-text">skills</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Compete in coding challenges, earn points, and climb the leaderboard. From daily puzzles to major competitions with prizes.
          </p>
        </div>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <div 
            className={`mb-12 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Daily Challenge
            </h2>
            <div 
              onClick={() => setSelectedChallenge(dailyChallenge)}
              className="group bg-card border-2 border-primary/30 rounded-lg p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer transition-all glow-border"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded">
                      {dailyChallenge.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
                      {dailyChallenge.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-mono bg-primary/20 text-primary rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dailyChallenge.timeLimit}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {dailyChallenge.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{dailyChallenge.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-primary">{dailyChallenge.points}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-foreground">{dailyChallenge.participants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Attempted</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-box shrink-0">
                    Start Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competition Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-card border border-border p-1 mb-6">
            <TabsTrigger value="ongoing" className="font-mono text-sm">
              <Timer className="w-4 h-4 mr-2" />
              Ongoing ({ongoingChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="font-mono text-sm">
              <Clock className="w-4 h-4 mr-2" />
              Upcoming ({upcomingChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="font-mono text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Past ({pastChallenges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            {ongoingChallenges.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {ongoingChallenges.map((challenge, index) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    index={index}
                    onClick={() => setSelectedChallenge(challenge)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-mono text-muted-foreground">No ongoing competitions</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for new challenges</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingChallenges.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingChallenges.map((challenge, index) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    index={index}
                    onClick={() => setSelectedChallenge(challenge)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-mono text-muted-foreground">No upcoming competitions</p>
                <p className="text-sm text-muted-foreground mt-2">Stay tuned for announcements</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastChallenges.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {pastChallenges.map((challenge, index) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    index={index}
                    onClick={() => setSelectedChallenge(challenge)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-mono text-muted-foreground">No past competitions</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Challenge Detail Dialog */}
        <ChallengeDetailDialog
          challenge={selectedChallenge}
          open={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      </div>
    </section>
  );
}
