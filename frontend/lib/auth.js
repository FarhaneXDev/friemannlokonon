import { cookies } from "next/headers";

/**
 * Récupère le token d'accès depuis les cookies httpOnly
 */
export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value || null;
}

/**
 * Vérifie si l'utilisateur est authentifié en interrogeant Django /auth/me/
 * Retourne les infos user si valide, null sinon
 */
export async function getCurrentUser() {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Helper pour faire des requêtes authentifiées vers Django depuis
 * les Server Components ou Route Handlers
 */
export async function fetchWithAuth(url, options = {}) {
  const token = await getAccessToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
