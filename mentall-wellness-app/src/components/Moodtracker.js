import React from "react";

// Graphical score bar component
const MoodBar = ({ score }) => {
  const percent = Math.min((score / 27) * 100, 100);
  let barColor = "green";
  if (score <= 4) barColor = "green";
  else if (score <= 9) barColor = "yellowgreen";
  else if (score <= 14) barColor = "orange";
  else if (score <= 19) barColor = "orangered";
  else barColor = "red";

  return (
    <div style={{ width: 310, margin: "12px auto 24px", background: "#f0f0f0", borderRadius: 16, height: 24, overflow: "hidden" }}>
      <div
        style={{
          width: `${percent}%`,
          height: 24,
          background: barColor,
          borderRadius: 16,
          transition: "width 0.6s"
        }}
      />
    </div>
  );
};

const MoodTracker = ({ score }) => {
  let mood = "";
  let recommendation = "";

  if (score <= 4) {
    mood = "Minimal Depression";
    recommendation = "You're doing well! Stay active with community support.";
  } else if (score <= 9) {
    mood = "Mild Depression";
    recommendation = "Consider joining the community to share and support each other.";
  } else if (score <= 14) {
    mood = "Moderate Depression";
    recommendation = "Community support can be helpful, but consider professional advice too.";
  } else if (score <= 19) {
    mood = "Moderately Severe Depression";
    recommendation = "We strongly recommend consulting a therapist for your well-being.";
  } else {
    mood = "Severe Depression";
    recommendation = "Please seek immediate professional help. Your health is important.";
  }

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: "#faf9ff",
        color: "#232323",
        maxWidth: 400,
        margin: "20px auto",
        textAlign: "center",
        border: `2px solid #dedede`,
        boxShadow: "0 8px 24px #0001"
      }}
    >
      <h3>PHQ-9 Score: <span style={{ color: "#667eea" }}>{score}/27</span></h3>
      <MoodBar score={score} />  {/* Graphical representation */}
      <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>{mood}</div>
      <div style={{ marginTop: 8, marginBottom: 20 }}>{recommendation}</div>
      {score <= 14 ? (
        <button onClick={() => alert("Navigating to Community Page...")} className="btn btn-primary">
          Go to Community
        </button>
      ) : (
        <button onClick={() => alert("Connecting to therapist...")} className="btn btn-secondary">
          Find a Therapist
        </button>
      )}
    </div>
  );
};

export default MoodTracker;
