import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/landing/navigation";
import { FooterSection } from "./components/landing/footer-section";
import { FloatingChat } from "./components/floating-chat";
import { HomePage } from "./pages/home";
import { DevelopersPage } from "./pages/developers";
import { DeveloperProfilePage } from "./pages/developer-profile";
import { ProjectsPage } from "./pages/projects";
import { ChallengesPage } from "./pages/challenges";
import { CommunityPage } from "./pages/community";
import { LeaderboardPage } from "./pages/leaderboard";
function App() {
    return (_jsxs("main", { className: "relative min-h-screen overflow-x-hidden noise-overlay", children: [_jsx(Navigation, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/developers", element: _jsx(DevelopersPage, {}) }), _jsx(Route, { path: "/developers/:username", element: _jsx(DeveloperProfilePage, {}) }), _jsx(Route, { path: "/projects", element: _jsx(ProjectsPage, {}) }), _jsx(Route, { path: "/challenges", element: _jsx(ChallengesPage, {}) }), _jsx(Route, { path: "/community", element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: "/leaderboard", element: _jsx(LeaderboardPage, {}) })] }), _jsx(FooterSection, {}), _jsx(FloatingChat, {})] }));
}
export default App;
