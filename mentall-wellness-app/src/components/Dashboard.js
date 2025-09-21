import React, { useState } from "react";
import PHQAssessment from "./PHQAssessment";
import Moodtracker from "./Moodtracker";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import AIStimulation from "./AIStimulation";
import MindBooster from "./MindBooster";

const sectionNames = {
  home: "Dashboard",
  assessment: "PHQ-9 Assessment",
  mood: "Mood Tracker",
  "mind-booster": "Mind Booster", // Mind Booster included
  community: "Community",
  journal: "Daily Journal",
  simulation: "AI Simulation",
  about: "About Us",
  contact: "Contact",
};

const Dashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [lastAssessment, setLastAssessment] = useState("Not taken yet");
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [history, setHistory] = useState([]);

  const handleAssessmentSubmit = (score) => {
    setAssessmentScore(score);
    setLastAssessment(new Date().toLocaleDateString());
    setHistory((prev) => [...prev, { score, date: new Date() }]);
    setActiveSection("mood");
  };

  const renderHomeSection = () => (
    <div className={`content-section${activeSection === "home" ? " active" : ""}`}>
      <h1>Welcome to Your Dashboard</h1>
      <button className="btn btn-primary" onClick={() => setActiveSection("assessment")}>
        Take Assessment
      </button>
      <p>Last assessment date: {lastAssessment}</p>
      <p>Latest score: {assessmentScore}</p>
      {history.length > 0 && (
        <>
          <h3>All assessment history</h3>
          <ul>
            {history.map((entry, idx) => (
              <li key={idx}>
                Date: {entry.date.toLocaleDateString()} - Score: {entry.score}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <style>{`
        .dashboard {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
        }
        nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 1000;
        }
        nav ul {
          display: flex;
          justify-content: center;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        nav ul li button {
          background: transparent;
          border: none;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          color: #667eea;
          border-radius: 8px;
          transition: background 0.3s;
        }
        nav ul li button:hover,
        nav ul li button:focus {
          background: #e9ecef;
          outline: none;
        }
        aside {
          position: fixed;
          top: 75px;
          left: 0;
          width: 250px;
          height: calc(100vh - 75px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 30px 20px;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          font-weight: 500;
          font-size: 16px;
        }
        aside > div {
          padding: 15px 20px;
          margin: 10px 0;
          border-radius: 10px;
          cursor: pointer;
          border-left: 4px solid transparent;
          transition: all 0.3s;
          color: #333;
          user-select: none;
        }
        aside > div:hover {
          background: #f8f9fa;
          border-left-color: #667eea;
        }
        aside > div[role="button"][style*="font-weight: bold"] {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-left-color: #fff;
          font-weight: 700;
        }
        main {
          margin-left: 250px;
          margin-top: 75px;
          padding: 30px;
          min-height: calc(100vh - 75px);
          background: white;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          max-width: 1000px;
          margin-right: auto;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .content-section {
          display: none;
        }
        .content-section.active {
          display: block;
        }
        button.btn {
          width: auto;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin-top: 12px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
      `}</style>
      <nav>
        <ul>
          {Object.keys(sectionNames).map((section) => (
            <li key={section}>
              <button onClick={() => setActiveSection(section)}>{sectionNames[section]}</button>
            </li>
          ))}
        </ul>
      </nav>
      <aside>
        {Object.keys(sectionNames).map((section) => (
          <div
            key={section}
            onClick={() => setActiveSection(section)}
            style={{ cursor: "pointer", fontWeight: activeSection === section ? "bold" : "normal" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveSection(section)}
          >
            {sectionNames[section]}
          </div>
        ))}
      </aside>
      <main>
        {activeSection === "home" && renderHomeSection()}
        {activeSection === "assessment" && <PHQAssessment onSubmit={handleAssessmentSubmit} />}
        {activeSection === "mood" && <Moodtracker score={assessmentScore} />}
        {activeSection === "mind-booster" && <MindBooster />}
        {activeSection === "about" && <AboutUs />}
        {activeSection === "contact" && <ContactUs />}
        {activeSection === "simulation" && <AIStimulation />}
      </main>
    </div>
  );
};

export default Dashboard;
