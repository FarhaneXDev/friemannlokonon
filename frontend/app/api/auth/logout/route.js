import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      const accessToken = cookieStore.get("access_token")?.value;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (error) {
      console.error("Erreur logout Django:", error);
    }
  }

  const response = NextResponse.json({ detail: "Déconnecté." }, { status: 200 });
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}
