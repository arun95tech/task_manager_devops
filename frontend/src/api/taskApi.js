const TASK_SERVICE_URL =
  import.meta.env.VITE_TASK_SERVICE_URL || "http://127.0.0.1:8001";

async function request(path, options = {}) {
  const response = await fetch(`${TASK_SERVICE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.detail || "Task service request failed");
  }

  return data;
}

// Loads all tasks from the Task Service.
export async function getTasks() {
  return request("/api/tasks/");
}

// Creates a new task.
export async function createTask(task) {
  return request("/api/tasks/", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

// Updates an existing task.
export async function updateTask(taskId, task) {
  return request(`/api/tasks/${taskId}/`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
}

// Deletes a task by ID.
export async function deleteTask(taskId) {
  return request(`/api/tasks/${taskId}/`, {
    method: "DELETE",
  });
}

// Used by the dashboard service health card.
export async function checkTaskServiceHealth() {
  return request("/api/health/");
}
