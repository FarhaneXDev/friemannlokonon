import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";

export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/`, {
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
    const formData = await request.formData();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erreur création projet:", error);
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}
