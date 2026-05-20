import { useState } from "react";
import { registerUser } from "../api/userApi.js";

function RegisterPage({ onRegisterSuccess, onShowLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
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
      // Register API call to User Service.
      const user = await registerUser(form);
      onRegisterSuccess(user);
    } catch (apiError) {
      setError(apiError.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-clean-page">
      <section className="login-clean-card">
        <div className="login-accent" />

        <div className="login-illustration register-illustration" aria-hidden="true">
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
          <div className="register-check-card">
            <strong>Ready</strong>
            <span>New workspace</span>
          </div>
        </div>

        <div className="login-form-panel register-form-panel">
          <div className="login-brand">Task Management System</div>
          <h1>Create Account</h1>
          <p>Join your project workspace and start managing tasks.</p>

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
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="clean-auth-links">
            <span>User Service</span>
            <button type="button" onClick={onShowLogin}>
              Login
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
