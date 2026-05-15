import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/landing/navigation";
import { FooterSection } from "./components/landing/footer-section";
import { HomePage } from "./pages/home";
import { DevelopersPage } from "./pages/developers";
import { DeveloperProfilePage } from "./pages/developer-profile";
import { ProjectsPage } from "./pages/projects";
import { ChallengesPage } from "./pages/challenges";
import { CommunityPage } from "./pages/community";
import { LeaderboardPage } from "./pages/leaderboard";

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/developers/:username" element={<DeveloperProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
      <FooterSection />
    </main>
  );
}

export default App;
