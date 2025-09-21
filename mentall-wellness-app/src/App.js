import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      {!user
        ? <WelcomePage onLogin={setUser} />
        : <Dashboard user={user} />
      }
    </div>
  );
}

export default App;
