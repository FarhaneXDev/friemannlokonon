import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const djangoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await djangoRes.json();

    if (!djangoRes.ok) {
      return NextResponse.json(
        { detail: data.detail || "Identifiants invalides." },
        { status: djangoRes.status }
      );
    }

    const response = NextResponse.json({ user: data.user }, { status: 200 });

    response.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30, 
      path: "/",
    });

    response.cookies.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erreur login route:", error);
    return NextResponse.json(
      { detail: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
