import { useEffect, useState } from "react";
import "./App.css";

const HOST = window.location.hostname || "127.0.0.1";
const USER_API = `http://${HOST}:8000/api`;
const TASK_API = `http://${HOST}:8001/api`;

function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState("");

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    status: "pending",
    due_date: "",
  });

  const [tasks, setTasks] = useState([]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleRegisterChange = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleTaskChange = (event) => {
    setTaskForm({
      ...taskForm,
      [event.target.name]: event.target.value,
    });
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${USER_API}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage("Registration failed. Please check the form.");
        console.log(data);
        return;
      }

      showMessage("User registered successfully. Please login.");
      setRegisterForm({
        username: "",
        email: "",
        password: "",
      });
      setActiveTab("login");
    } catch (error) {
      showMessage("Could not connect to User Service.");
      console.error(error);
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${USER_API}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage("Login failed. Invalid username or password.");
        console.log(data);
        return;
      }

      setLoggedInUser(data.user);
      showMessage(`Welcome, ${data.user.username}`);
      setActiveTab("dashboard");
      fetchTasks();
    } catch (error) {
      showMessage("Could not connect to User Service.");
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${TASK_API}/tasks/`);
      const data = await response.json();

      if (!response.ok) {
        showMessage("Could not load tasks.");
        console.log(data);
        return;
      }

      setTasks(data);
    } catch (error) {
      showMessage("Could not connect to Task Service.");
      console.error(error);
    }
  };

  const createTask = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...taskForm,
        due_date: taskForm.due_date || null,
      };

      const response = await fetch(`${TASK_API}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage("Task creation failed.");
        console.log(data);
        return;
      }

      showMessage("Task created successfully.");
      setTaskForm({
        title: "",
        description: "",
        assigned_to: "",
        status: "pending",
        due_date: "",
      });
      fetchTasks();
    } catch (error) {
      showMessage("Could not connect to Task Service.");
      console.error(error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${TASK_API}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        showMessage("Task update failed.");
        return;
      }

      showMessage("Task status updated.");
      fetchTasks();
    } catch (error) {
      showMessage("Could not update task.");
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${TASK_API}/tasks/${taskId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        showMessage("Task delete failed.");
        return;
      }

      showMessage("Task deleted successfully.");
      fetchTasks();
    } catch (error) {
      showMessage("Could not delete task.");
      console.error(error);
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    setActiveTab("login");
    showMessage("Logged out successfully.");
  };

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchTasks();
    }
  }, [activeTab]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Task Management System</h1>
          <p>DevOps Microservices Project</p>
        </div>

        {loggedInUser && (
          <div className="user-box">
            <span>{loggedInUser.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>

      {message && <div className="message">{message}</div>}

      {!loggedInUser && (
        <div className="auth-container">
          <div className="tabs">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={activeTab === "register" ? "active" : ""}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" && (
            <form className="card form" onSubmit={loginUser}>
              <h2>Login</h2>

              <label>Username</label>
              <input
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
              />

              <label>Password</label>
              <input
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />

              <button type="submit">Login</button>
            </form>
          )}

          {activeTab === "register" && (
            <form className="card form" onSubmit={registerUser}>
              <h2>Register</h2>

              <label>Username</label>
              <input
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                required
              />

              <label>Email</label>
              <input
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
              />

              <label>Password</label>
              <input
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />

              <button type="submit">Register</button>
            </form>
          )}
        </div>
      )}

      {loggedInUser && (
        <main className="dashboard">
          <section className="card">
            <h2>Create Task</h2>

            <form className="form" onSubmit={createTask}>
              <label>Task Title</label>
              <input
                name="title"
                value={taskForm.title}
                onChange={handleTaskChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleTaskChange}
              />

              <label>Assigned To</label>
              <input
                name="assigned_to"
                value={taskForm.assigned_to}
                onChange={handleTaskChange}
                placeholder="Team member name"
              />

              <label>Status</label>
              <select
                name="status"
                value={taskForm.status}
                onChange={handleTaskChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <label>Due Date</label>
              <input
                name="due_date"
                type="date"
                value={taskForm.due_date}
                onChange={handleTaskChange}
              />

              <button type="submit">Create Task</button>
            </form>
          </section>

          <section className="card">
            <div className="section-header">
              <h2>Task List</h2>
              <button onClick={fetchTasks}>Refresh</button>
            </div>

            {tasks.length === 0 ? (
              <p className="empty">No tasks found. Create your first task.</p>
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                  <div className="task-card" key={task.id}>
                    <div className="task-title-row">
                      <h3>{task.title}</h3>
                      <span className={`status ${task.status}`}>
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <p>{task.description || "No description provided."}</p>

                    <div className="task-meta">
                      <span>Assigned: {task.assigned_to || "Not assigned"}</span>
                      <span>Due: {task.due_date || "No due date"}</span>
                    </div>

                    <div className="task-actions">
                      <select
                        value={task.status}
                        onChange={(event) =>
                          updateTaskStatus(task.id, event.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <button
                        className="danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;