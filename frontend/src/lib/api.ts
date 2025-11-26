const API_BASE = import.meta.env.VITE_API_URL || "";

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Nie udało się zalogować");
  }

  return data as { success: true; token: string };
}

export async function fetchProfile(token: string) {
  const res = await fetch(`${API_BASE}/api/users/me/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Nie udało się pobrać profilu");
  }

  return data.user as unknown;
}
