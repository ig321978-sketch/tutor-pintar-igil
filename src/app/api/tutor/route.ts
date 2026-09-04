import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
  type Part,
  type Schema,
} from "@google/generative-ai";
import { parseKunciJawaban } from "@/lib/kuis";
import { jenjangGuru } from "@/lib/guru";
import { mapelHitungan } from "@/lib/mapel-hitungan";
import { bersihkanLabelNaskah } from "@/lib/naskah-lisan";
import { kerangkaNaskahBuku, subbabBukuSiswa } from "@/lib/subbab-buku-siswa";
import { gantiNamaLengkapKeDepan, namaDepanSiswa, pilihKataPujian, sapaanTutorRingkas } from "@/lib/nama-siswa";

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
  sketsaKartu: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban: string[];
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
    sketsaKartu: { type: SchemaType.STRING },
    svgCode: { type: SchemaType.STRING },
    pertanyaan: { type: SchemaType.STRING },
    kunciJawaban: { type: SchemaType.STRING },
    motivasi: { type: SchemaType.STRING },
  },
  required: [
    "sapaan",
    "penjelasan",
    "sketsaKartu",
    "svgCode",
    "pertanyaan",
    "kunciJawaban",
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

function aturanAngkaNaskah(): string {
  return `ANGKA DAN BENTUK NASKAH:
- Jika menyebut bilangan, pecahan, rumus, persentase, suhu, atau hitungan, WAJIB tulis ANGKA ARAB (1, 2, 3) dan simbol matematika. Contoh benar: 2 + 3 = 5. Contoh salah: dua tambah tiga sama dengan lima.
- Rumus atau contoh hitung diletakkan di BARIS SENDIRI, jangan disambung ke cerita.
- Uraian (penjelasan): tulis beberapa kalimat utuh, terurai, mudah dipahami. DILARANG meratakan semua jadi satu kalimat datar.
- Bukan uraian (judul, fakta singkat, rumus): biarkan plain text pendek.
- DILARANG mengeja angka menjadi kata jika yang dimaksud adalah bilangan.`;
}

function aturanContohSoal(hitungan: boolean, kelas: string): string {
  if (!hitungan) {
    return `CONTOH SOAL: setelah uraian, tulis 1 pertanyaan nalar singkat setara buku siswa (bukan pilihan ganda). Tidak wajib kunci angka.`;
  }

  return `CONTOH SOAL HITUNGAN (wajib di SETIAP kartu, setelah uraian), gaya latihan buku siswa Kemendikbudristek:
Tulis blok berikut di baris sendiri, tanpa pilihan A/B/C/D, DAN TETAP dalam kartu subbab yang sama (jangan pisah \\n\\n sebelum Contoh/Latihan/Kunci):
Contoh
Soal cerita 1-2 kalimat, tingkat ${kelas}.
Langkah singkat.
Hasil ANGKA di baris sendiri.

Latihan
1) Soal cerita atau hitungan baru, beda angka dari contoh.
2) Soal kedua, setara numerasi Kurikulum Merdeka.

Kunci
1) hasil atau langkah singkat
2) hasil atau langkah singkat
Soal WAJIB improvisasi AI, DILARANG menyalin soal buku. DILARANG memakai angka/soal yang sama dengan field pertanyaan kuis.`;
}

function alurUraianBuku(namaDepan: string, hitungan: boolean, kelas: string): string {
  return `BENTUK NASKAH seperti uraian buku siswa Kurikulum Merdeka (Pusat Perbukuan), BUKAN cerita analogi bebas:
- Setiap kartu = SATU subbab buku. Isi kartu harus mengajarkan konsep subbab itu (istilah, cara, contoh jenis yang sama), ditulis ulang dengan bahasa tutor.
- Alur tiap kartu: (1) buka dengan situasi atau pengamatan kontekstual 1-2 kalimat, (2) uraian konsep terurai, (3) contoh konkret, (4) rumus atau lambang di baris sendiri jika ada, (5) contoh soal dan latihan.
- DILARANG menyalin kalimat, tokoh, atau latihan dari buku. DILARANG label Ayo Mengamati, Ayo Berlatih, Judul, Subjudul, Kartu, VOICE, JSON, pause, atau kurung siku.
- DILARANG kartu tema bebas di luar subbab, misalnya analogi tangga jika subbabnya penjumlahan sampai 100.
${aturanAngkaNaskah()}
${aturanContohSoal(hitungan, kelas)}
Jika menyebut nama, HANYA ${namaDepan}. DILARANG pujian berlebihan.`;
}

function instruksiPenjelasan(
  kelas: string,
  namaDepan: string,
  mapel: string,
  materi: string,
): string {
  const jenjang = jenjangGuru(kelas);
  const kerangka = kerangkaNaskahBuku(kelas, mapel, materi);
  const subbab = subbabBukuSiswa(kelas, mapel, materi);
  const hitungan = mapelHitungan(mapel, materi);
  const jumlah =
    subbab.length > 0
      ? `TEPAT ${subbab.length}`
      : jenjang === "SD"
        ? "TEPAT 6 sampai 8"
        : "TEPAT 6";

  if (jenjang === "SD") {
    return `2. penjelasan: ${jumlah} KARTU MATERI, satu kartu satu subbab buku siswa. Setiap kartu SATU blok dipisah \\n\\n:
Baris 1: judul subbab 2-8 kata, diakhiri titik. Plain text.
Baris 2: keterangan visual SATU kalimat pendek (maks 16 kata), diakhiri titik. Hanya ini yang tampil di kartu kecil.
Lalu uraian lengkap seperti buku siswa: 4-7 kalimat, bahasa ${kelas}, konsep akurat.
${kerangka}
${alurUraianBuku(namaDepan, hitungan, kelas)}
Contoh SATU kartu jika subbabnya Penjumlahan bilangan cacah sampai 100:
Penjumlahan sampai 100.
Gabungkan dua bilangan menjadi jumlah.
Di kantin, ${namaDepan} membeli 36 kue lalu menambah 27 kue.
Jumlahkan satuan dulu, lalu puluhan. Jika satuan lebih dari 9, simpan 1 ke puluhan.
Contoh
Ada 36 kue, lalu ditambah 27 kue. Berapa jumlahnya?
36 + 27 = 63
Latihan
1) Ada 48 pensil, ditambah 15 pensil. Berapa semuanya?
2) 52 + 17 = ...
Kunci
1) 63
2) 69
Untuk kartu lain, ikuti subbab kerangka, jangan menyalin contoh ini jika subbabnya berbeda.`;
  }

  const kepadatan =
    jenjang === "SMA"
      ? "6-8 kalimat padat setara SMA: definisi akurat, mekanisme atau nalar, contoh, aplikasi, dan miskonsepsi yang harus dihindari. Bahasa analitis, jangan kekanak-kanakan."
      : "5-7 kalimat berbobot setara SMP: definisi jelas, alasan atau cara kerja, contoh remaja, dan dampak atau manfaatnya. Bahasa tegas dan jelas, bukan flashcard SD.";

  return `2. penjelasan: ${jumlah} KARTU PEMBAHASAN untuk jenjang ${jenjang} (${kelas}). Setiap kartu SATU blok dipisah \\n\\n.
Baris pertama: judul subbab 2-8 kata, diakhiri titik. Plain text.
Lalu naskah LENGKAP (${kepadatan}).
${kerangka}
${alurUraianBuku(namaDepan, hitungan, kelas)}
Uraian ini WAJIB tampil di kartu DAN dibacakan VOICE. DILARANG flashcard 1 kalimat.`;
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

function ekstrakDaftarGambar(gambar: unknown): Part[] {
  const daftar = Array.isArray(gambar) ? gambar : gambar ? [gambar] : [];
  return daftar
    .map((item) => ekstrakGambar(item))
    .filter((item): item is Part => item !== null);
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
    const namaDepan = namaDepanSiswa(nama);
    const kelas = sebagaiTeks(body.kelas, "SD");
    const mapel = sebagaiTeks(body.mapel, "Umum");
    const materi = sebagaiTeks(body.materi, "Materi hari ini");
    const ajuan = sebagaiTeks(body.ajuan);
    const daftarGambar = ekstrakDaftarGambar(body.gambar);

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

      const konteksFoto = daftarGambar.length > 0
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
Kamu adalah Tutor $IGIL. Siswa ${namaDepan} (Kelas ${kelas}) sedang belajar ${mapel}, materi ${materi}.
${konteksFoto}

Pertanyaan siswa (dari ketikan atau rekaman suara):
${ajuan}

ATURAN MUTLAK PEMBELAJARAN:
1. DILARANG KERAS memberi jawaban akhir, kunci pilihan A/B/C/D, nilai numerik hasil akhir, atau kalimat seperti 'jadi jawabannya adalah'.
2. Jika siswa meminta kunci instan, tolak dengan ramah lalu alihkan ke langkah nalar.
3. Respons HANYA 1 objek JSON murni. DILARANG kutip ganda (") di dalam nilai teks. Gunakan kutip tunggal (').
4. panduanLangkah: struktur Penyelesaian Langkah Demi Langkah (Step-by-Step Guidance) bernomor, merangsang nalar kritis. Pisahkan langkah dengan \\n\\n. Jika langkah berupa uraian, tulis beberapa kalimat. Jika hanya rumus atau perintah singkat, biarkan plain text. Bilangan dan rumus WAJIB ANGKA ARAB dan simbol (contoh: 2x + 3 = 11), jangan dieja menjadi kata.
${instruksiHitungan}
5. sapaan: SATU kalimat pendek. Sebut HANYA nama depan ${namaDepan}. Sertakan TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. DILARANG pujian panjang, julukan berlebihan, atau nama lengkap. Contoh: 'Halo ${namaDepan}, Pintar.'
6. dorongan: satu kalimat yang mendorong siswa menyelesaikan sendiri, tanpa membocorkan kunci, tanpa pujian berlebihan.

Kembalikan persis kunci: sapaan, panduanLangkah, caraKurikulum, trikBimbel, dorongan.
`.trim();

      const bagianAjuan: Part[] = [...daftarGambar];
      bagianAjuan.push({ text: promptAjuan });

      const resultAjuan = await modelAjuan.generateContent(bagianAjuan);
      const dataJsonAjuan = bersihkanDanParseJson(resultAjuan.response.text());

      const dataAjuan: PanduanAjuan = {
        sapaan: sapaanTutorRingkas(
          nama,
          sebagaiTeks(dataJsonAjuan.sapaan),
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

    const instruksiMateri = daftarGambar.length > 0
      ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan (${daftarGambar.length} halaman). Baca tulisan, judul bab, rumus, gambar, dan soal di semua halaman tersebut. Deteksi topik utamanya, lalu buat modul belajar PREMIUM untuk ${namaDepan} (Kelas ${kelas}) berdasarkan isi halaman buku itu. Jika mapel/materi teks tersedia (${mapel} / ${materi}), gunakan sebagai petunjuk tambahan, tetapi prioritas utama adalah isi foto.`
      : `Tugas: Buat modul belajar untuk ${namaDepan} (Kelas ${kelas}) mata pelajaran ${mapel} materi ${materi}, mengikuti isi dan alur uraian buku siswa Kurikulum Merdeka Pusat Perbukuan untuk bab itu.`;

    const promptText = `
Kamu adalah Tutor $IGIL, guru privat EdTech Indonesia yang hangat, cerdas, dan presisi.

${instruksiMateri}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni. Tanpa markdown, tanpa kalimat pengantar, tanpa penutup.
2. DILARANG memakai tanda kutip ganda (") di dalam nilai teks JSON. Gunakan kutip tunggal (') jika perlu.
3. svgCode WAJIB SVG valid. Semua atribut memakai kutip tunggal. Jangan pakai kutip ganda di SVG.

STANDAR KONTEN:
1. sapaan: SATU kalimat pendek untuk dibaca suara. Sebut HANYA nama depan ${namaDepan}. Sertakan TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. DILARANG pujian panjang, julukan berlebihan, atau nama lengkap. Contoh: 'Halo ${namaDepan}, Pintar.'
${instruksiPenjelasan(kelas, namaDepan, mapel, materi)}
3. sketsaKartu: TEPAT sama jumlahnya dengan kartu di penjelasan. Setiap blok SATU kalimat visual doodle kecil (satu benda atau adegan mini), dipisah \\n\\n, urutan sama dengan kartu. Semua sketsa HARUS berbeda. Tanpa teks tertulis di gambar.
4. svgCode: cadangan doodle SVG sketsa tangan (viewBox 0 0 400 220), kertas krem, garis tinta navy #1C01A5 saja. Tanpa kutip ganda.
5. pertanyaan: TEPAT 5 soal dalam SATU string panjang, dipisah \\n\\n.
   Komposisi wajib: 3 soal Standar + 2 soal HOTS.
   DILARANG menuliskan label kunci, huruf jawaban, atau pembahasan di dalam field pertanyaan.
   Format tiap soal HANYA memuat tiga bagian ini:
   [Soal X - Tipe: Standar/HOTS]
   Narasi pertanyaan yang menantang...
   A) ...
   B) ...
   C) ...
   D) ...
6. kunciJawaban: SATU string berisi 5 huruf A/B/C/D sesuai urutan soal, dipisah koma. Contoh: A,C,B,D,A
   Setiap huruf HARUS cocok dengan opsi yang benar pada soal terkait.
7. motivasi: SATU kata pujian umum untuk ${namaDepan} dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. Bukan kalimat panjang.

Kembalikan persis kunci: sapaan, penjelasan, sketsaKartu, svgCode, pertanyaan, kunciJawaban, motivasi.
`.trim();

    const bagian: Part[] = [...daftarGambar];
    bagian.push({ text: promptText });

    const result = await model.generateContent(bagian);
    const text = result.response.text();
    const dataJson = bersihkanDanParseJson(text);

    const dataAman: ModulTutor = {
      sapaan: sapaanTutorRingkas(nama, sebagaiTeks(dataJson.sapaan)),
      penjelasan: bersihkanLabelNaskah(
        gantiNamaLengkapKeDepan(
          pulihkanParagraf(
            dataJson.penjelasan,
            "Materi sedang disiapkan...",
          ),
          nama,
        ),
      ),
      sketsaKartu: pulihkanParagraf(
        dataJson.sketsaKartu,
        "Sketsa doodle materi ini",
      ),
      svgCode: amankanSvg(dataJson.svgCode),
      pertanyaan: pulihkanParagraf(
        dataJson.pertanyaan,
        "Latihan soal sedang disusun...",
      ),
      kunciJawaban: parseKunciJawaban(dataJson.kunciJawaban),
      motivasi: pilihKataPujian(sebagaiTeks(dataJson.motivasi, namaDepan)),
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
