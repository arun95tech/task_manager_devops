import { useState } from "react";
import { loginUser } from "../api/userApi.js";

function LoginPage({ onLoginSuccess, onShowRegister }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Login API call to User Service.
      const user = await loginUser(form);
      onLoginSuccess(user);
    } catch (apiError) {
      setError(apiError.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-clean-page">
      <section className="login-clean-card">
        <div className="login-accent" />

        <div className="login-illustration" aria-hidden="true">
          <div className="person-head">
            <span />
          </div>
          <div className="person-arm" />
          <div className="person-body">
            <span />
            <span />
            <span />
          </div>
          <div className="task-note note-one" />
          <div className="task-note note-two" />
        </div>

        <div className="login-form-panel">
          <div className="login-brand">Task Management System</div>
          <h1>Log in</h1>
          <p>Welcome back. Sign in to continue managing your tasks.</p>

          {error && <div className="alert error">{error}</div>}

          <form className="clean-auth-form" onSubmit={handleSubmit}>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <button className="clean-login-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Let's start"}
            </button>
          </form>

          <div className="clean-auth-links">
            <span>User Service</span>
            <button type="button" onClick={onShowRegister}>
              Create account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
