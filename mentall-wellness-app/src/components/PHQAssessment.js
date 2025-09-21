import React, { useState } from "react";

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself or that you are a failure?",
  "Trouble concentrating on things?",
  "Moving or speaking slowly, or being fidgety/restless?",
  "Thoughts that you would be better off dead or hurting yourself?",
];

const MoodBar = ({ score }) => {
  const percent = Math.min((score / 27) * 100, 100);
  let barColor = "green";
  if (score <= 4) barColor = "green";
  else if (score <= 9) barColor = "yellowgreen";
  else if (score <= 14) barColor = "orange";
  else if (score <= 19) barColor = "orangered";
  else barColor = "red";

  return (
    <div
      style={{
        width: 310,
        margin: "12px auto 24px",
        background: "#f0f0f0",
        borderRadius: 16,
        height: 24,
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: 24,
          background: barColor,
          borderRadius: 16,
          transition: "width 0.6s",
        }}
      />
    </div>
  );
};

const PHQAndMoodTracker = () => {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempScore = 0;
    for (let i = 1; i <= 9; i++) {
      const val = e.target[`q${i}`]?.value;
      if (!val) {
        alert(`Please answer question ${i}`);
        return;
      }
      tempScore += parseInt(val);
    }
    setScore(tempScore);
    setSubmitted(true);
  };

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
    <div>
      <style>{`
        .assessment-container {
          max-width: 800px;
          margin: 24px auto;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .question-card {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 15px;
          margin: 20px 0;
        }
        .question-text {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
        }
        .options {
          display: grid;
          gap: 10px;
        }
        .option-label {
          display: flex;
          align-items: center;
          padding: 12px;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .option-label:hover {
          background: #e9ecef;
        }
        .option-label input[type="radio"] {
          margin-right: 10px;
        }
        .btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin: 10px 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        .btn-secondary {
          background: #f8f9fa;
          color: #333;
          border: 2px solid #e1e5e9;
        }
        .btn-secondary:hover {
          background: #e9ecef;
        }
        .btn-link {
          background: none;
          color: #667eea;
          border: none;
          padding: 0;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="assessment-container">
          <h2>PHQ-9 Depression Assessment</h2>
          <p>Please answer the following questions based on how you've been feeling over the past two weeks.</p>
          {questions.map((q, i) => (
            <div className="question-card" key={i + 1}>
              <div className="question-text">{`${i + 1}. ${q}`}</div>
              <div className="options">
                <label className="option-label">
                  <input type="radio" name={`q${i + 1}`} value="0" /> Not at all
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${i + 1}`} value="1" /> Several days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${i + 1}`} value="2" /> More than half the days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${i + 1}`} value="3" /> Nearly every day
                </label>
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit Assessment
          </button>
        </form>
      ) : (
        <div className="assessment-container mood-tracker-container" style={{ textAlign: "center" }}>
          <h3>Your PHQ-9 Score: {score}/27</h3>
          <MoodBar score={score} />
          <div style={{ fontWeight: "bold", fontSize: 18 }}>{mood}</div>
          <p>{recommendation}</p>
          {score <= 14 ? (
            <button className="btn btn-primary" onClick={() => alert("Navigating to Community Page...")}>
              Go to Community
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => alert("Connecting to therapist...")}>
              Find a Therapist
            </button>
          )}
          <button
            className="btn btn-link"
            onClick={() => setSubmitted(false)}
            style={{ marginTop: 16 }}
          >
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default PHQAndMoodTracker;
