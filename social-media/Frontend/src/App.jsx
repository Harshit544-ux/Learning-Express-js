import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/feed" className="nav-logo">
        <span className="nav-logo-icon">📸</span>
        <span>VibeShare</span>
      </Link>
      <ul className="nav-links-list">
        <li>
          <Link
            to="/feed"
            className={`nav-link ${location.pathname === "/feed" || location.pathname === "/" ? "active" : ""}`}
          >
            Feed
          </Link>
        </li>
        <li>
          <Link
            to="/create-post"
            className={`nav-link ${location.pathname === "/create-post" ? "active" : ""}`}
          >
            Create Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;