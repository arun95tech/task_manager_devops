function TaskForm({
  form,
  editingTask,
  onChange,
  onSubmit,
  onCancel,
  isOpen,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="task-form-card">
      <div className="panel-heading">
        <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
        <button type="button" onClick={onCancel}>
          Close
        </button>
      </div>

      <form className="task-form" onSubmit={onSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Configure Jenkins Pipeline"
            required
          />
        </label>

        <label>
          Assigned To
          <input
            name="assigned_to"
            value={form.assigned_to}
            onChange={onChange}
            placeholder="Arun"
          />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={onChange}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          Due Date
          <input
            name="due_date"
            type="date"
            value={form.due_date || ""}
            onChange={onChange}
          />
        </label>

        <label className="wide-field">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Describe the task..."
          />
        </label>

        <button className="primary-button" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
