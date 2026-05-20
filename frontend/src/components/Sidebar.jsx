const menuItems = ["Dashboard", "Tasks", "Create Task", "Notifications", "Settings"];

function Sidebar({ activeItem = "Dashboard", onCreateTask }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">TM</span>
        <div>
          <strong>Task Manager</strong>
          <small>Microservices</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        {menuItems.map((item) => (
          <button
            className={activeItem === item ? "active" : ""}
            type="button"
            key={item}
            onClick={item === "Create Task" ? onCreateTask : undefined}
          >
            <span>{item.slice(0, 1)}</span>
            {item}
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <strong>DevOps Project</strong>
        <p>User Service, Task Service, Docker, Jenkins, AWS EC2.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
