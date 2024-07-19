import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import fetchAuth from "./lib/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  console.info({ currentUser });
  useEffect(() => {
    fetchAuth().then((response) => setCurrentUser(response));
  }, []);

  return (
    <main>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet context={{ currentUser, setCurrentUser }} />
    </main>
  );
}

export default App;
