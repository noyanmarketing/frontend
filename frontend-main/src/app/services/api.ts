// src/services/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("API hatası");
  return res.json();
}
