function formatStatus(status) {
  if (status === "in_progress") {
    return "In Progress";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function TaskTable({ tasks, onEdit, onDelete, onView }) {
  return (
    <section className="task-table-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                No tasks found. Add your first task.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong>
                </td>
                <td>{task.description || "No description"}</td>
                <td>{task.assigned_to || "Unassigned"}</td>
                <td>
                  <span className={`status-badge ${task.status}`}>
                    {formatStatus(task.status)}
                  </span>
                </td>
                <td>{task.due_date || "No date"}</td>
                <td>
                  <div className="table-actions">
                    <button type="button" onClick={() => onView(task)}>
                      View
                    </button>
                    <button type="button" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TaskTable;
