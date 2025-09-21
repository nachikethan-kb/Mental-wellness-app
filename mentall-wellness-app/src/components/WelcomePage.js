import React, { useState } from "react";

const WelcomePage = ({ onLogin }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const ageConfirm = e.target.ageConfirm.checked;
    const parentalConsent = e.target.parentalConsent.checked;
    if (!ageConfirm && !parentalConsent) {
      window.alert("Age verification is required. If you are under 18, please obtain parental consent.");
      return;
    }
    if (parentalConsent && !ageConfirm) {
      window.alert("Thank you for obtaining parental consent. A parent or guardian will need to complete verification.");
    }
    if (username && password) {
      onLogin({ username, isMinor: parentalConsent && !ageConfirm });
      setShowModal(true);
    }
  };

  const startApp = () => setShowModal(false);

  return (
    <div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; overflow-x: hidden; }
        .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .login-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); width: 100%; max-width: 450px; animation: slideIn 0.8s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { color: #667eea; font-size: 2.5rem; font-weight: 700; margin-bottom: 5px; }
        .logo p { color: #666; font-size: 1rem; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: #333; font-weight: 500; }
        .form-group input { width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 16px; transition: border-color 0.3s; }
        .form-group input:focus { outline: none; border-color: #667eea; }
        .age-verification { background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; margin: 10px 0; }
        .btn { width: 100%; padding: 15px; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; margin: 10px 0; }
        .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3); }
        .btn-secondary { background: #f8f9fa; color: #333; border: 2px solid #e1e5e9; }
        .btn-secondary:hover { background: #e9ecef; }
        .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); }
        .modal-content { background: white; margin: 10% auto; padding: 40px; border-radius: 20px; width: 90%; max-width: 500px; text-align: center; animation: modalSlideIn 0.5s ease-out; }
        @keyframes modalSlideIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .modal[style*="display: block"] { display: block; }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="logo">
            <h1>🧠 MindCare</h1>
            <p>Youth Mental Wellness Platform</p>
          </div>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="age-verification">
              <p><strong>Age Verification Required</strong></p>
              <div className="checkbox-group">
                <input type="checkbox" id="ageConfirm" name="ageConfirm" />
                <label htmlFor="ageConfirm">I confirm I am 18 years or older</label>
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="parentalConsent" name="parentalConsent" />
                <label htmlFor="parentalConsent">I am under 18 but have parental consent</label>
              </div>
              <small>If you're under 18, parental consent is required for participation.</small>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={() => window.alert("Sign-up flow")}>
              Create New Account
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <h2>🎉 Welcome to MindCare!</h2>
            <p>Your journey to better mental wellness starts here. Let's begin with a quick assessment to understand how you're feeling today.</p>
            <button className="btn btn-primary" onClick={startApp}>
              Take Assessment Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
