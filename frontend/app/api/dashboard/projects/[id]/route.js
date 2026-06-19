import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const formData = await request.formData();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/${id}/`, {
      method: "PATCH", 
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erreur update projet:", error);
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ detail: "Non authentifié." }, { status: 401 });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return NextResponse.json({ detail: "Supprimé." }, { status: 200 });
    }
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erreur delete projet:", error);
    return NextResponse.json({ detail: "Erreur serveur." }, { status: 500 });
  }
}
