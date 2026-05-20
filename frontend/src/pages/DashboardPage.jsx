import { useCallback, useEffect, useMemo, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi.js";

const emptyTask = {
  title: "",
  description: "",
  assigned_to: "",
  status: "pending",
  due_date: "",
};

function DashboardPage({ user, onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [taskForm, setTaskForm] = useState(emptyTask);
  const [tasks, setTasks] = useState([]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      showMessage(error.message || "Could not connect to Task Service.");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskChange = (event) => {
    setTaskForm({
      ...taskForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    try {
      await createTask({
        ...taskForm,
        due_date: taskForm.due_date || null,
      });

      showMessage("Task created successfully.");
      setTaskForm(emptyTask);
      fetchTasks();
      setActivePage("tasks");
    } catch (error) {
      showMessage(error.message || "Task creation failed.");
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      showMessage("Task status updated.");
      fetchTasks();
    } catch (error) {
      showMessage(error.message || "Could not update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      showMessage("Task deleted successfully.");
      fetchTasks();
    } catch (error) {
      showMessage(error.message || "Could not delete task.");
    }
  };

  const taskCounts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    }),
    [tasks],
  );

  const renderTaskForm = () => (
    <section className="start-card page-card">
      <div className="start-section-header">
        <div>
          <h2>Add Task</h2>
          <p>Create a new task and send it to the Task Service.</p>
        </div>
      </div>

      <form className="start-form" onSubmit={handleCreateTask}>
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
  );

  const renderTaskList = () => (
    <section className="start-card page-card">
      <div className="start-section-header">
        <div>
          <h2>Task List</h2>
          <p>View, update, refresh, and delete project tasks.</p>
        </div>
        <button type="button" onClick={fetchTasks}>
          Refresh
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="start-empty">No tasks found. Create your first task.</p>
      ) : (
        <div className="start-task-list">
          {tasks.map((task) => (
            <div className="start-task-card" key={task.id}>
              <div className="start-task-title-row">
                <h3>{task.title}</h3>
                <span className={`start-status ${task.status}`}>
                  {task.status.replace("_", " ")}
                </span>
              </div>

              <p>{task.description || "No description provided."}</p>

              <div className="start-task-meta">
                <span>Assigned: {task.assigned_to || "Not assigned"}</span>
                <span>Due: {task.due_date || "No due date"}</span>
              </div>

              <div className="start-task-actions">
                <select
                  value={task.status}
                  onChange={(event) =>
                    handleUpdateTaskStatus(task.id, event.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  className="start-danger"
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="start-app">
      <aside className="start-sidebar">
        <div className="start-sidebar-brand">
          <span>TM</span>
          <div>
            <strong>Task Manager</strong>
            <small>Microservices Project</small>
          </div>
        </div>

        <nav className="start-sidebar-nav" aria-label="Dashboard pages">
          <button
            className={activePage === "dashboard" ? "active" : ""}
            type="button"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activePage === "add" ? "active" : ""}
            type="button"
            onClick={() => setActivePage("add")}
          >
            Add Task
          </button>
          <button
            className={activePage === "tasks" ? "active" : ""}
            type="button"
            onClick={() => setActivePage("tasks")}
          >
            Task List
          </button>
        </nav>

        <div className="start-sidebar-profile">
          <div className="start-profile-avatar">
            {user.username?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <strong>{user.username}</strong>
            <small>{user.email || "Project member"}</small>
          </div>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <section className="start-content">
        <header className="start-page-header">
          <div>
            <h1>
              {activePage === "dashboard"
                ? "Dashboard"
                : activePage === "add"
                  ? "Add Task"
                  : "Task List"}
            </h1>
            <p>Plan, track, and manage all project tasks in one place.</p>
          </div>
        </header>

        {message && <div className="start-message">{message}</div>}

        {activePage === "dashboard" && (
          <main className="start-dashboard-home">
            <section className="start-summary-grid">
              <article className="start-card summary-card">
                <span>Total Tasks</span>
                <strong>{taskCounts.total}</strong>
              </article>
              <article className="start-card summary-card">
                <span>Pending</span>
                <strong>{taskCounts.pending}</strong>
              </article>
              <article className="start-card summary-card">
                <span>In Progress</span>
                <strong>{taskCounts.inProgress}</strong>
              </article>
              <article className="start-card summary-card">
                <span>Completed</span>
                <strong>{taskCounts.completed}</strong>
              </article>
            </section>

            {renderTaskList()}
          </main>
        )}

        {activePage === "add" && <main>{renderTaskForm()}</main>}
        {activePage === "tasks" && <main>{renderTaskList()}</main>}
      </section>
    </div>
  );
}

export default DashboardPage;
