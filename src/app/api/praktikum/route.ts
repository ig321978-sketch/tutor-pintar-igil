import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
  type Schema,
} from "@google/generative-ai";
import { cariBahanSimulasi } from "@/lib/simulasi-global";
import { supabaseServer } from "@/lib/supabase";

export const maxDuration = 60;

const SKEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    aman: { type: SchemaType.BOOLEAN },
    berhasil: { type: SchemaType.BOOLEAN },
    judul: { type: SchemaType.STRING },
    langkah: { type: SchemaType.STRING },
    yangDiamati: { type: SchemaType.STRING },
    umpanBalik: { type: SchemaType.STRING },
    kataKunci: { type: SchemaType.STRING },
    token: { type: SchemaType.NUMBER },
  },
  required: [
    "aman",
    "berhasil",
    "judul",
    "langkah",
    "yangDiamati",
    "umpanBalik",
    "kataKunci",
    "token",
  ],
};

function teks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function yaTidak(nilai: unknown): boolean {
  return nilai === true;
}

function angka(nilai: unknown, cadangan = 0): number {
  return typeof nilai === "number" && Number.isFinite(nilai) ? nilai : cadangan;
}

function parseJson(mentah: string): Record<string, unknown> {
  let isi = mentah.replace(/```json/gi, "").replace(/```/g, "").trim();
  const awal = isi.indexOf("{");
  const akhir = isi.lastIndexOf("}");
  if (awal === -1 || akhir === -1) throw new Error("AI tidak menghasilkan JSON.");
  isi = isi.slice(awal, akhir + 1);
  try {
    return JSON.parse(isi) as Record<string, unknown>;
  } catch {
    return JSON.parse(isi.replace(/,\s*([}\]])/g, "$1")) as Record<string, unknown>;
  }
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { berhasil: false, pesan: "Request tidak valid." },
        { status: 400 },
      );
    }

    const nama = teks(body.nama, "Siswa");
    const kelas = teks(body.kelas, "3 SD");
    const mapel = teks(body.mapel);
    const materi = teks(body.materi);
    const ide = teks(body.ide);
    const pratinjauSaja = body.pratinjau === true;

    if (!mapel || !materi) {
      return NextResponse.json(
        { berhasil: false, pesan: "Pilih mata pelajaran dan materi dulu ya." },
        { status: 400 },
      );
    }

    if (pratinjauSaja) {
      const bahan = await cariBahanSimulasi(`${mapel} ${materi} ${ide}`);
      return NextResponse.json({
        berhasil: true,
        mode: "pratinjau",
        bahan,
      });
    }

    if (ide.length < 8) {
      return NextResponse.json(
        {
          berhasil: false,
          pesan: "Ceritakan dulu praktikum yang ingin kamu coba, minimal satu kalimat ya.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { berhasil: false, pesan: "Kunci API kosong." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: SKEMA,
        maxOutputTokens: 4096,
      },
    });

    const prompt = `
Kamu adalah asisten laboratorium $IGIL untuk anak sekolah Indonesia. Bahasa ramah anak.

Siswa: ${nama}, kelas ${kelas}.
Mapel: ${mapel}
Materi: ${materi}
Ide praktikum: ${ide}

Tugas: nilai apakah ide ini LAYAK dan AMAN untuk disimulasikan secara virtual.

ATURAN AMAN:
- aman=false jika ide berbahaya (ledakan, senjata, racun, listrik bertegangan tinggi tanpa pengawasan, patogen, atau hal yang merusak).
- Jika aman=false, berhasil HARUS false, token HARUS 0.

ATURAN NILAI:
- berhasil=true hanya jika ide jelas, selaras mapel/materi, bisa diamati, dan aman.
- berhasil=false jika ide terlalu kabur, tidak nyambung, atau tidak bisa dipraktikkan.
- token: 0 jika gagal. Jika berhasil, angka 8 sampai 20.
- langkah: 4-6 langkah virtual bernomor, tanpa kutip ganda.
- yangDiamati: apa yang siswa amati di simulasi.
- umpanBalik: jika gagal, pesan membangun agar siswa mencoba lagi. Jika berhasil, pujian singkat plus apa yang dipelajari.
- kataKunci: 3-6 kata Inggris untuk mencari simulasi PhET/NASA, contoh: states of matter gas.
- DILARANG kutip ganda di dalam nilai teks. Pakai kutip tunggal.

Kembalikan JSON dengan kunci: aman, berhasil, judul, langkah, yangDiamati, umpanBalik, kataKunci, token.
`.trim();

    const result = await model.generateContent(prompt);
    const data = parseJson(result.response.text());

    const aman = yaTidak(data.aman);
    let lulus = yaTidak(data.berhasil) && aman;
    let token = lulus ? Math.min(20, Math.max(8, Math.round(angka(data.token, 10)))) : 0;
    if (!aman) {
      lulus = false;
      token = 0;
    }

    const umpanBalik = teks(
      data.umpanBalik,
      lulus
        ? "Hebat! Praktikummu jelas dan aman."
        : "Coba tulis lagi: alat apa, apa yang diubah, dan apa yang ingin kamu lihat.",
    );
    const kataKunci = teks(data.kataKunci, `${mapel} ${materi}`);
    const bahan = await cariBahanSimulasi(kataKunci);

    if (lulus && token > 0) {
      const supabase = supabaseServer();
      if (supabase) {
        const { error } = await supabase.from("penambangan_igil").insert({
          nama,
          kelas,
          mapel,
          materi,
          ide,
          token,
          status: "BERHASIL",
          umpan_balik: umpanBalik,
        });
        if (error) {
          console.error("Supabase penambangan:", error.message);
        }
      }
    }

    return NextResponse.json({
      berhasil: true,
      mode: "jalankan",
      evaluasi: {
        lulus,
        judul: teks(data.judul, "Simulasi Praktikum"),
        langkah: teks(data.langkah),
        yangDiamati: teks(data.yangDiamati),
        umpanBalik,
        token,
      },
      bahan,
    });
  } catch (error: unknown) {
    const pesan = error instanceof Error ? error.message : "Kesalahan tidak diketahui";
    console.error("PRAKTIKUM:", error);
    return NextResponse.json(
      { berhasil: false, pesan: `Gagal menjalankan praktikum: ${pesan}` },
      { status: 500 },
    );
  }
}
