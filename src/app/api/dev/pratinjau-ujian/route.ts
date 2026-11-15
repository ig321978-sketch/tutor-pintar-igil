import { NextResponse } from "next/server";
import { bacaSoalUjianLokal } from "@/lib/pratinjau-ujian-dev";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ID_BAB = /^k[1-6]-mat-bab\d{1,2}$/;

/** Hanya di komputer pengembangan. Mengirim batang soal, bukan kunci jawaban. */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ status: "tidak_ada" }, { status: 404 });
  }
  const bab = new URL(req.url).searchParams.get("bab") ?? "";
  if (!ID_BAB.test(bab)) {
    return NextResponse.json({ status: "galat" }, { status: 400 });
  }
  const soal = bacaSoalUjianLokal(bab);
  return NextResponse.json({ status: soal.length === 10 ? "ok" : "kosong", soal });
}
