import React, { useState, useEffect, useRef } from "react";

const relaxationTechniques = [
  {
    id: 1,
    name: "Deep Breathing",
    description:
      "Practice slow, deep breaths to calm your nervous system and reduce stress.",
  },
  {
    id: 2,
    name: "Progressive Muscle Relaxation",
    description:
      "Tense and relax different muscle groups to release physical tension.",
  },
  {
    id: 3,
    name: "Mindfulness Meditation",
    description:
      "Focus on the present moment with non-judgmental awareness to increase calmness.",
  },
  {
    id: 4,
    name: "Visualization",
    description:
      "Imagine a peaceful scene or place to create mental relaxation.",
  },
  {
    id: 5,
    name: "Guided Imagery",
    description:
      "Listen to guided relaxation scripts that help you focus and reduce anxiety.",
  },
  {
    id: 6,
    name: "Body Scan",
    description:
      "Mentally scan your body from head to toe to notice areas of tension and release.",
  },
  {
    id: 7,
    name: "Listening to Calming Music",
    description:
      "Use soothing music to help reduce stress and promote relaxation.",
  },
];

const MUSIC_URL = "https://www.youtube.com/embed/nkqnuxKj8Dk?autoplay=1&controls=1";

const MindBooster = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  const startTimer = () => {
    // Set timer to 3 minutes = 180 seconds
    setTimeLeft(180);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mindbooster-container">
      <h2>Mind Booster – Relaxation Techniques</h2>
      <p>Select a technique below to learn and try it out.</p>
      <div className="techniques-list">
        {relaxationTechniques.map((tech) => (
          <button
            key={tech.id}
            onClick={() => {
              setSelectedTechnique(tech);
              setTimeLeft(null);
              if (timerRef.current) clearInterval(timerRef.current);
            }}
            className={selectedTechnique?.id === tech.id ? "active-tech" : ""}
          >
            {tech.name}
          </button>
        ))}
      </div>

      {selectedTechnique && (
        <>
          <div className="technique-details">
            <h3>{selectedTechnique.name}</h3>
            <p>{selectedTechnique.description}</p>
            {selectedTechnique.id !== 7 && (
              <p>
                Try the timer below to practice this breathing or relaxation
                technique for 3 minutes.
              </p>
            )}
          </div>

          {selectedTechnique.id === 7 ? (
            // Embed YouTube video for Listening to Calming Music
            <div className="music-container" style={{ marginTop: 20, textAlign: "center" }}>
              <iframe
                width="100%"
                height="315"
                src={MUSIC_URL}
                title="Listening to Calming Music"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="timer-container">
              <button onClick={startTimer} disabled={timeLeft > 0}>
                {timeLeft > 0 ? "Timer Running..." : "Start 3-Minute Timer"}
              </button>
              {timeLeft !== null && (
                <div className="timer-display">{formatTime(timeLeft)}</div>
              )}
            </div>
          )}
        </>
      )}

      <style>{`
        .mindbooster-container {
          max-width: 640px;
          margin: 30px auto;
          padding: 30px 32px;
          background: #e6f0ff;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(64, 106, 140, 0.10);
          text-align: center;
        }
        .mindbooster-container h2 {
          color: #667eea;
        }
        .techniques-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
          justify-content: center;
        }
        .techniques-list button {
          padding: 12px 18px;
          border-radius: 8px;
          border: 1px solid #667eea;
          background: #fff;
          color: #333;
          font-size: 15px;
          font-weight: 600;
          flex: 1 1 42%;
          cursor: pointer;
          transition: all 0.18s;
          min-width: 120px;
        }
        .techniques-list button.active-tech,
        .techniques-list button:hover {
          background: linear-gradient(120deg, #667eea, #764ba2 90%);
          color: #fff;
          border: 1px solid #764ba2;
        }
        .technique-details {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 3px 9px rgba(0,0,0,0.1);
          margin-top: 25px;
          color: #333;
        }
        .technique-details h3 {
          margin-top: 0;
          color: #764ba2;
        }
        .timer-container {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .timer-container button {
          padding: 12px 25px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          background: linear-gradient(120deg, #667eea, #764ba2);
          color: white;
          transition: background 0.3s;
        }
        .timer-container button:disabled {
          background: #ccc !important;
          cursor: not-allowed;
        }
        .timer-display {
          font-size: 28px;
          font-weight: 700;
          color: #667eea;
          font-family: monospace;
          user-select: none;
        }
        .music-container iframe {
          border-radius: 10px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default MindBooster;
