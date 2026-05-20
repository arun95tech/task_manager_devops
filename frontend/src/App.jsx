import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Keep the logged-in user after page refresh.
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("dashboard");
    }
  }, []);

  const handleAuthSuccess = (loggedInUser) => {
    // Store user object from Django response for dashboard/profile use.
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  if (user) {
    return <DashboardPage user={user} onLogout={handleLogout} />;
  }

  if (page === "register") {
    return (
      <RegisterPage
        onRegisterSuccess={handleAuthSuccess}
        onShowLogin={() => setPage("login")}
      />
    );
  }

  return (
    <LoginPage
      onLoginSuccess={handleAuthSuccess}
      onShowRegister={() => setPage("register")}
    />
  );
}

export default App;
