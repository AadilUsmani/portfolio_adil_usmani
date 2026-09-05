import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.error("[PRODUCTION_CLIENT_ERROR_REPORTED]:", JSON.stringify(data, null, 2));
    return NextResponse.json({ ok: true, received: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
