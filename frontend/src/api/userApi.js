const USER_SERVICE_URL =
  import.meta.env.VITE_USER_SERVICE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${USER_SERVICE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.detail || "User service request failed");
  }

  return data;
}

// Calls the Django register endpoint and returns the user object.
export async function registerUser(formData) {
  const data = await request("/api/register/", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return data.user || data;
}

// Calls the Django login endpoint and returns the user object.
export async function loginUser(formData) {
  const data = await request("/api/login/", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return data.user || data;
}

// Used by the dashboard service health card.
export async function checkUserServiceHealth() {
  return request("/api/health/");
}
