import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";

export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/admin/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const body = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/admin/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}
