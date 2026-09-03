import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
  type Part,
  type Schema,
} from "@google/generative-ai";

export const maxDuration = 60;

type PermintaanTutor = {
  nama?: unknown;
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  gambar?: unknown;
  ajuan?: unknown;
};

type ModulTutor = {
  sapaan: string;
  penjelasan: string;
  sketsaDeskripsi: string;
  sketsaSisipan1: string;
  sketsaSisipan2: string;
  svgCode: string;
  pertanyaan: string;
  motivasi: string;
};

type PanduanAjuan = {
  sapaan: string;
  panduanLangkah: string;
  caraKurikulum: string;
  trikBimbel: string;
  dorongan: string;
};

const SVG_CADANGAN =
  "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='220' fill='#fbf6ea'/><path d='M12 48 Q200 42 388 50' stroke='#d7eee9' fill='none' stroke-width='1'/><path d='M10 92 Q210 86 390 94' stroke='#d7eee9' fill='none' stroke-width='1'/><path d='M14 136 Q190 142 386 134' stroke='#d7eee9' fill='none' stroke-width='1'/><path d='M18 180 Q220 174 384 182' stroke='#d7eee9' fill='none' stroke-width='1'/><path d='M78 158 Q86 96 132 78 Q168 66 186 102 Q198 148 154 168 Q108 184 78 158' fill='none' stroke='#0f766e' stroke-width='2.4' stroke-linecap='round'/><path d='M118 118 Q138 108 156 126' fill='none' stroke='#f59e0b' stroke-width='2' stroke-linecap='round'/><path d='M232 74 L238 166 L318 158 L304 68 Z' fill='none' stroke='#0f766e' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/><path d='M248 92 Q270 88 292 96' fill='none' stroke='#f59e0b' stroke-width='1.8'/><path d='M252 118 Q276 112 296 122' fill='none' stroke='#0f766e' stroke-width='1.6'/><path d='M338 48 Q348 38 360 52 Q348 58 338 48' fill='none' stroke='#f59e0b' stroke-width='1.8' stroke-linecap='round'/></svg>";

const SKEMA_MODUL: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    sapaan: { type: SchemaType.STRING },
    penjelasan: { type: SchemaType.STRING },
    sketsaDeskripsi: { type: SchemaType.STRING },
    sketsaSisipan1: { type: SchemaType.STRING },
    sketsaSisipan2: { type: SchemaType.STRING },
    svgCode: { type: SchemaType.STRING },
    pertanyaan: { type: SchemaType.STRING },
    motivasi: { type: SchemaType.STRING },
  },
  required: [
    "sapaan",
    "penjelasan",
    "sketsaDeskripsi",
    "sketsaSisipan1",
    "sketsaSisipan2",
    "svgCode",
    "pertanyaan",
    "motivasi",
  ],
};

const SKEMA_AJUAN: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    sapaan: { type: SchemaType.STRING },
    panduanLangkah: { type: SchemaType.STRING },
    caraKurikulum: { type: SchemaType.STRING },
    trikBimbel: { type: SchemaType.STRING },
    dorongan: { type: SchemaType.STRING },
  },
  required: [
    "sapaan",
    "panduanLangkah",
    "caraKurikulum",
    "trikBimbel",
    "dorongan",
  ],
};

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function mapelHitungan(mapel: string, materi: string): boolean {
  const gabungan = `${mapel} ${materi}`.toLowerCase();
  return /matematika|fisika|kimia|ipa\b|hitung|aljabar|geometri|statistika/.test(
    gabungan,
  );
}

function bersihkanDanParseJson(mentah: string): Record<string, unknown> {
  let teks = mentah
    .replace(/```json/gi, "")
    .replace(/```[a-z]*/gi, "")
    .replace(/```/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .trim();

  const awal = teks.indexOf("{");
  const akhir = teks.lastIndexOf("}");
  if (awal === -1 || akhir === -1 || akhir <= awal) {
    throw new Error("AI tidak menghasilkan format JSON.");
  }

  teks = teks.slice(awal, akhir + 1);

  try {
    return JSON.parse(teks) as Record<string, unknown>;
  } catch {
    const diperbaiki = teks.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(diperbaiki) as Record<string, unknown>;
  }
}

function pulihkanParagraf(nilai: unknown, cadangan: string): string {
  const teks = typeof nilai === "string" ? nilai : cadangan;
  return teks
    .replace(/\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function amankanSvg(nilai: unknown): string {
  let svg = typeof nilai === "string" ? nilai : SVG_CADANGAN;
  svg = svg
    .replace(/```svg/gi, "")
    .replace(/```/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/"/g, "'")
    .trim();

  if (!svg.toLowerCase().includes("<svg")) {
    return SVG_CADANGAN;
  }

  return svg;
}

function ekstrakGambar(gambar: unknown): Part | null {
  if (typeof gambar !== "string" || gambar.length < 32) return null;

  const cocok = gambar.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!cocok) return null;

  return {
    inlineData: {
      mimeType: cocok[1],
      data: cocok[2],
    },
  };
}

export async function POST(req: Request) {
  try {
    let body: PermintaanTutor;
    try {
      body = (await req.json()) as PermintaanTutor;
    } catch {
      return NextResponse.json(
        { berhasil: false, pesan: "Request JSON tidak valid." },
        { status: 400 },
      );
    }
    const nama = sebagaiTeks(body.nama, "Siswa");
    const kelas = sebagaiTeks(body.kelas, "SD");
    const mapel = sebagaiTeks(body.mapel, "Umum");
    const materi = sebagaiTeks(body.materi, "Materi hari ini");
    const ajuan = sebagaiTeks(body.ajuan);
    const bagianGambar = ekstrakGambar(body.gambar);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { berhasil: false, pesan: "Kunci API kosong!" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    if (ajuan) {
      const soalHitungan = mapelHitungan(mapel, `${materi} ${ajuan}`);
      const modelAjuan = genAI.getGenerativeModel({
        model: "gemini-3.5-flash-lite",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: SKEMA_AJUAN,
          maxOutputTokens: 4096,
        },
      });

      const konteksFoto = bagianGambar
        ? "Siswa mungkin merujuk foto halaman buku yang dilampirkan. Gunakan foto itu sebagai konteks jika relevan."
        : "";

      const instruksiHitungan = soalHitungan
        ? `SOAL HITUNGAN (Matematika/Fisika/Kimia atau sejenis):
   - caraKurikulum: langkah resmi Kurikulum Merdeka (konsep, rumus, urutan kerja) TANPA menuliskan hasil akhir.
   - trikBimbel: Trik Cepat Bimbel (Hack) yang mempercepat nalar, juga TANPA menuliskan hasil akhir.
   Biarkan siswa sendiri yang menghitung langkah terakhir.`
        : `Bukan soal hitungan wajib:
   - caraKurikulum: isi string kosong.
   - trikBimbel: isi string kosong.`;

      const promptAjuan = `
Kamu adalah Tutor $IGIL. Siswa ${nama} (Kelas ${kelas}) sedang belajar ${mapel}, materi ${materi}.
${konteksFoto}

Pertanyaan siswa (dari ketikan atau rekaman suara):
${ajuan}

ATURAN MUTLAK PEMBELAJARAN:
1. DILARANG KERAS memberi jawaban akhir, kunci pilihan A/B/C/D, nilai numerik hasil akhir, atau kalimat seperti 'jadi jawabannya adalah'.
2. Jika siswa meminta kunci instan, tolak dengan ramah lalu alihkan ke langkah nalar.
3. Respons HANYA 1 objek JSON murni. DILARANG kutip ganda (") di dalam nilai teks. Gunakan kutip tunggal (').
4. panduanLangkah: struktur Penyelesaian Langkah Demi Langkah (Step-by-Step Guidance) bernomor, merangsang nalar kritis. Pisahkan langkah dengan \\n\\n.
${instruksiHitungan}
5. sapaan: sapaan singkat yang hangat, menyebut ${nama}.
6. dorongan: satu kalimat yang mendorong siswa menyelesaikan sendiri, tanpa membocorkan kunci.

Kembalikan persis kunci: sapaan, panduanLangkah, caraKurikulum, trikBimbel, dorongan.
`.trim();

      const bagianAjuan: Part[] = [];
      if (bagianGambar) bagianAjuan.push(bagianGambar);
      bagianAjuan.push({ text: promptAjuan });

      const resultAjuan = await modelAjuan.generateContent(bagianAjuan);
      const dataJsonAjuan = bersihkanDanParseJson(resultAjuan.response.text());

      const dataAjuan: PanduanAjuan = {
        sapaan: sebagaiTeks(
          dataJsonAjuan.sapaan,
          `Bagus ${nama}, mari kita telusuri pelan-pelan.`,
        ),
        panduanLangkah: pulihkanParagraf(
          dataJsonAjuan.panduanLangkah,
          "Mari pecah soalnya menjadi langkah kecil. Baca soal sekali lagi, tandai yang diketahui, lalu tentukan apa yang ditanyakan.",
        ),
        caraKurikulum: pulihkanParagraf(dataJsonAjuan.caraKurikulum, ""),
        trikBimbel: pulihkanParagraf(dataJsonAjuan.trikBimbel, ""),
        dorongan: sebagaiTeks(
          dataJsonAjuan.dorongan,
          "Coba kerjakan langkah terakhir sendiri. Kamu mampu!",
        ),
      };

      return NextResponse.json({
        berhasil: true,
        mode: "ajuan",
        data: dataAjuan,
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: SKEMA_MODUL,
        maxOutputTokens: 8192,
      },
    });

    const instruksiMateri = bagianGambar
      ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan. Baca tulisan, judul bab, rumus, gambar, dan soal di halaman tersebut. Deteksi topik utamanya, lalu buat modul belajar PREMIUM untuk ${nama} (Kelas ${kelas}) berdasarkan isi halaman buku itu. Jika mapel/materi teks tersedia (${mapel} / ${materi}), gunakan sebagai petunjuk tambahan, tetapi prioritas utama adalah isi foto.`
      : `Tugas: Buat modul belajar PREMIUM untuk ${nama} (Kelas ${kelas}) mata pelajaran ${mapel} materi ${materi}.`;

    const promptText = `
Kamu adalah Tutor $IGIL, guru privat EdTech Indonesia yang hangat, cerdas, dan presisi.

${instruksiMateri}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni. Tanpa markdown, tanpa kalimat pengantar, tanpa penutup.
2. DILARANG memakai tanda kutip ganda (") di dalam nilai teks JSON. Gunakan kutip tunggal (') jika perlu.
3. svgCode WAJIB SVG valid. Semua atribut memakai kutip tunggal. Jangan pakai kutip ganda di SVG.

STANDAR KONTEN:
1. sapaan: sapaan penyemangat yang antusias, menyebut nama ${nama}.
2. penjelasan: 3 sampai 4 paragraf SANGAT MENDALAM. Gunakan storytelling, analogi sehari-hari, dan contoh konkret sesuai jenjang ${kelas}. Pisahkan paragraf dengan \\n\\n.
3. sketsaDeskripsi: SATU kalimat visual scene doodle UTAMA (hero) di atas naskah. Fokus objek atau adegan (contoh: barisan kursi bioskop, tangga, planet). Gaya jurnal/sketsa tangan, cocok anak sampai remaja, BUKAN kartun bayi. Jangan sebut kertas, buku catatan, atau gaya gambar.
4. sketsaSisipan1: SATU kalimat visual doodle analogi konkret untuk disisipkan setelah paragraf 1.
5. sketsaSisipan2: SATU kalimat visual doodle detail/contoh berbeda untuk disisipkan di tengah naskah. Harus beda dari sketsa utama dan sisipan 1.
6. svgCode: cadangan doodle SVG sketsa tangan (viewBox 0 0 400 220), kertas krem, garis tinta agak bergelombang, aksen teal dan amber. Bukan clipart kekanak-kanakan. Tanpa kutip ganda.
7. pertanyaan: TEPAT 5 soal dalam SATU string panjang, dipisah \\n\\n.
   Komposisi wajib: 3 soal Standar + 2 soal HOTS.
   DILARANG KERAS menuliskan label 'Kunci Jawaban: A/B/C/D', huruf jawaban, pembahasan, atau trik di dalam field pertanyaan. Siswa tidak boleh melihat kunci secara sekilas.
   Format tiap soal HANYA memuat tiga bagian ini:
   [Soal X - Tipe: Standar/HOTS]
   Narasi pertanyaan yang menantang...
   A) ...
   B) ...
   C) ...
   D) ...
8. motivasi: satu kalimat motivasi kuat untuk ${nama}.

Kembalikan persis kunci: sapaan, penjelasan, sketsaDeskripsi, sketsaSisipan1, sketsaSisipan2, svgCode, pertanyaan, motivasi.
`.trim();

    const bagian: Part[] = [];
    if (bagianGambar) bagian.push(bagianGambar);
    bagian.push({ text: promptText });

    const result = await model.generateContent(bagian);
    const text = result.response.text();
    const dataJson = bersihkanDanParseJson(text);

    const dataAman: ModulTutor = {
      sapaan: sebagaiTeks(dataJson.sapaan, `Halo ${nama}, semangat belajar!`),
      penjelasan: pulihkanParagraf(
        dataJson.penjelasan,
        "Materi sedang disiapkan...",
      ),
      sketsaDeskripsi: sebagaiTeks(
        dataJson.sketsaDeskripsi,
        "Sketsa doodle materi ini",
      ),
      sketsaSisipan1: sebagaiTeks(
        dataJson.sketsaSisipan1,
        "Doodle analogi sehari-hari untuk materi ini",
      ),
      sketsaSisipan2: sebagaiTeks(
        dataJson.sketsaSisipan2,
        "Doodle detail penting dari materi ini",
      ),
      svgCode: amankanSvg(dataJson.svgCode),
      pertanyaan: pulihkanParagraf(
        dataJson.pertanyaan,
        "Latihan soal sedang disusun...",
      ),
      motivasi: sebagaiTeks(dataJson.motivasi, "Terus semangat belajar!"),
    };

    return NextResponse.json({ berhasil: true, data: dataAman });
  } catch (error: unknown) {
    const pesan =
      error instanceof Error ? error.message : "Kesalahan tidak diketahui";
    console.error("EROR SISTEM:", error);
    return NextResponse.json(
      { berhasil: false, pesan: `EROR DARI GOOGLE: ${pesan}` },
      { status: 500 },
    );
  }
}
