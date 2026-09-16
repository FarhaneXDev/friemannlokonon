import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request) {
  // Vérifie que la requête vient bien de Vercel Cron (sécurité)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ping l'API Django pour réveiller Render ET maintenir Redis actif
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
      cache: "no-store",
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
