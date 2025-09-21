import React from "react";

const AboutUs = () => (
  <div className="about-us-section" style={{ maxWidth: 600, margin: "32px auto", background: "#fcfcfc", borderRadius: 10, padding: 32, boxShadow: "0 4px 32px #ddd4" }}>
    <h2>About MindCare</h2>
    <p>
      <b>MindCare</b> is an AI-powered, youth-centric mental wellness platform. We deliver a safe space for self-assessment (PHQ-9), daily mood tracking, guided wellness practices, community connection, and access to support resources. Our platform is designed with privacy, inclusivity, and evidence-based methods at its core.
    </p>
    <ul style={{ marginLeft: 16 }}>
      <li>Confidential journaling and mood tracking</li>
      <li>Instant, science-backed wellness advice</li>
      <li>Access to support communities and professionals</li>
      <li>Resources for both users and parents/guardians</li>
    </ul>
    <p>
      <i>Our mission: Empowering youth to better understand and care for their mental health, one day at a time.</i>
    </p>
  </div>
);

export default AboutUs;
