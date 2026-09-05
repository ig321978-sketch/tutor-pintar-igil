import { NextResponse } from "next/server";
import { Type, type Part, type Schema } from "@google/genai";
import {
  kemasBankSoal,
  kemasKunciBank,
  pecahBankSoal,
  pecahKunciBank,
  pecahRubrikEsai,
} from "@/lib/kuis";
import { jenjangGuru } from "@/lib/guru";
import { mapelHitungan } from "@/lib/mapel-hitungan";
import { hasilkanJsonGemini, MODEL_GEMINI_MATERI, MODEL_GEMINI_RUTIN, pesanGalatGemini } from "@/lib/klien-gemini";
import { bersihkanLabelNaskah } from "@/lib/naskah-lisan";
import { kerangkaNaskahBuku, subbabBukuSiswa } from "@/lib/subbab-buku-siswa";
import { gantiNamaLengkapKeDepan, namaDepanSiswa, pilihKataPujian, sapaanTutorRingkas } from "@/lib/nama-siswa";
import { ambilCacheMateri, simpanCacheMateri } from "@/lib/cache-materi-tutor";
import { klaimInteraksiAi, statusKuota } from "@/lib/kuota-interaksi";

export const maxDuration = 60;

type PermintaanTutor = {
  nama?: unknown;
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  gambar?: unknown;
  ajuan?: unknown;
  pakaiToken?: unknown;
};

type ModulTutor = {
  sapaan: string;
  penjelasan: string;
  curriculum_view: string;
  global_best_view: string;
  sketsaKartu: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban: string[];
  esai: string;
  kunciEsai: string[];
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
  type: Type.OBJECT,
  properties: {
    sapaan: { type: Type.STRING },
    curriculum_view: { type: Type.STRING },
    global_best_view: { type: Type.STRING },
    sketsaKartu: { type: Type.STRING },
    svgCode: { type: Type.STRING },
    pertanyaan: { type: Type.STRING },
    kunciJawaban: { type: Type.STRING },
    esai: { type: Type.STRING },
    kunciEsai: { type: Type.STRING },
    motivasi: { type: Type.STRING },
  },
  required: [
    "sapaan",
    "curriculum_view",
    "global_best_view",
    "sketsaKartu",
    "svgCode",
    "pertanyaan",
    "kunciJawaban",
    "esai",
    "kunciEsai",
    "motivasi",
  ],
};

const SKEMA_AJUAN: Schema = {
  type: Type.OBJECT,
  properties: {
    sapaan: { type: Type.STRING },
    panduanLangkah: { type: Type.STRING },
    caraKurikulum: { type: Type.STRING },
    trikBimbel: { type: Type.STRING },
    dorongan: { type: Type.STRING },
  },
  required: [
    "sapaan",
    "panduanLangkah",
    "caraKurikulum",
    "trikBimbel",
    "dorongan",
  ],
};

function sebagaiYa(nilai: unknown): boolean {
  return nilai === true || nilai === "true" || nilai === 1;
}

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
- DILARANG menomori judul kartu dengan 1. 2. 3. di depan. Judul = nama subbab saja.
- DILARANG memisah Contoh, Latihan, atau Kunci dengan baris kosong (\\n\\n). Tetap SATU blok kartu.
- DILARANG kartu tema bebas di luar subbab, misalnya analogi tangga jika subbabnya penjumlahan sampai 100.
${aturanAngkaNaskah()}
${aturanContohSoal(hitungan, kelas)}
Jika menyebut nama, HANYA ${namaDepan}. DILARANG pujian berlebihan.`;
}

function alurUraianGlobal(namaDepan: string, hitungan: boolean, kelas: string): string {
  return `BENTUK NASKAH infografis Standar Global, ramah anak, BUKAN esai panjang:
- Judul kartu SAMA dengan curriculum_view (subbab resmi), tetapi ISI berbeda: analogi dunia nyata + penjelasan sederhana + kerangka visual.
- Alur tiap kartu: (1) analogi atau gambar mental 1 kalimat, (2) ide inti dijelaskan seolah mengajar teman, (3) kerangka visual singkat (bandingkan / sebab-akibat / bagian-keseluruhan / langkah), (4) rumus di baris sendiri jika ada, (5) contoh soal dan latihan.
- DILARANG menomori judul kartu dengan 1. 2. 3. di depan. Judul = nama subbab saja.
- DILARANG memisah Contoh, Latihan, atau Kunci dengan baris kosong (\\n\\n). Tetap SATU blok kartu.
- DILARANG menyalin curriculum_view kata demi kata. DILARANG menyebut nama teknik pedagogi. DILARANG paragraf esai 8+ kalimat.
- Fakta, istilah baku (boleh dalam kurung), dan hasil hitung HARUS benar dan tidak menentang kurikulum.
${aturanAngkaNaskah()}
${aturanContohSoal(hitungan, kelas)}
Jika menyebut nama, HANYA ${namaDepan}. DILARANG pujian berlebihan.`;
}

function formatKartuDasar(
  jenjang: string,
  kelas: string,
  jumlah: string,
): { kepala: string; kepadatan: string } {
  if (jenjang === "SD") {
    return {
      kepala: `${jumlah} KARTU INFOGRAFIS, satu kartu satu subbab buku siswa. Setiap kartu SATU blok dipisah \\n\\n:
Baris 1: judul subbab 2-8 kata, diakhiri titik. Plain text.
Baris 2: keterangan visual SATU kalimat pendek (maks 16 kata), diakhiri titik. Hanya ini yang tampil di kartu kecil.
Lalu uraian 3-5 kalimat, bahasa ${kelas}, infografis (bukan esai panjang).`,
      kepadatan: `3-5 kalimat infografis setara ${kelas}`,
    };
  }
  const kepadatan =
    jenjang === "SMA"
      ? "4-6 kalimat padat setara SMA: definisi akurat, nalar, contoh, miskonsepsi. Bahasa analitis."
      : "4-6 kalimat berbobot setara SMP: definisi, cara kerja, contoh remaja. Bukan flashcard SD.";
  return {
    kepala: `${jumlah} KARTU INFOGRAFIS untuk jenjang ${jenjang} (${kelas}). Setiap kartu SATU blok dipisah \\n\\n.
Baris pertama: judul subbab 2-8 kata, diakhiri titik. Plain text.
Lalu naskah infografis (${kepadatan}).`,
    kepadatan,
  };
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
  const { kepala } = formatKartuDasar(jenjang, kelas, jumlah);

  return `2. curriculum_view: perspektif Kurikulum Nasional. ${kepala}
${kerangka}
${alurUraianBuku(namaDepan, hitungan, kelas)}
Istilah, urutan subbab, dan kompetensi HARUS selaras buku teks resmi Kemendikbudristek agar siswa siap ujian sekolah. DILARANG analogi bebas yang mengganti istilah baku. Di uraian, sapa dengan 'kamu'. Jangan mengulang nama siswa.

3. global_best_view: perspektif Standar Global. ${kepala}
JUMLAH KARTU, JUDUL SUBBAB, dan URUTAN SAMA PERSIS dengan curriculum_view. Bukan salinan kurikulum.
${alurUraianGlobal(namaDepan, hitungan, kelas)}
Fakta tidak boleh menyalahi kurikulum; boleh menambah nama internasional dalam kurung. DILARANG menyebut Feynman, meta-metode, atau esai panjang. Bahasa ${kelas}, ramah anak, infografis.`;
}

function pulihkanParagraf(nilai: unknown, cadangan: string): string {
  const teks = typeof nilai === "string" ? nilai : cadangan;
  return teks
    .replace(/\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function amanNaskahModul(nilai: unknown, cadangan: string, nama: string): string {
  return bersihkanLabelNaskah(
    gantiNamaLengkapKeDepan(pulihkanParagraf(nilai, cadangan), nama),
  );
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

function bentukModulTutor(
  nama: string,
  bagian: {
    sapaan?: unknown;
    curriculum_view?: unknown;
    penjelasan?: unknown;
    global_best_view?: unknown;
    sketsaKartu?: unknown;
    svgCode?: unknown;
    pertanyaan?: unknown;
    kunciJawaban?: unknown;
    esai?: unknown;
    kunciEsai?: unknown;
    motivasi?: unknown;
  },
): ModulTutor {
  const kurikulum = amanNaskahModul(
    bagian.curriculum_view || bagian.penjelasan,
    "Materi sedang disiapkan...",
    nama,
  );
  const global = amanNaskahModul(bagian.global_best_view, kurikulum, nama);
  const bank = pecahBankSoal(
    pulihkanParagraf(bagian.pertanyaan, "Latihan soal sedang disusun..."),
  );
  const esaiLangsung = pulihkanParagraf(bagian.esai, "");
  const kunci = pecahKunciBank(bagian.kunciJawaban);
  const rubrikLangsung = pecahRubrikEsai(bagian.kunciEsai);
  return {
    sapaan: sapaanTutorRingkas(nama, sebagaiTeks(bagian.sapaan)),
    penjelasan: kurikulum,
    curriculum_view: kurikulum,
    global_best_view: global || kurikulum,
    sketsaKartu: pulihkanParagraf(
      bagian.sketsaKartu,
      "Sketsa doodle materi ini",
    ),
    svgCode: amankanSvg(bagian.svgCode),
    pertanyaan: bank.pilihanGanda.join("\n\n") || "Latihan soal sedang disusun...",
    kunciJawaban: kunci.huruf,
    esai: esaiLangsung || bank.esai.join("\n\n"),
    kunciEsai: rubrikLangsung.length > 0 ? rubrikLangsung : kunci.rubrik,
    motivasi: pilihKataPujian(sebagaiTeks(bagian.motivasi, namaDepanSiswa(nama))),
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const nama = sebagaiTeks(url.searchParams.get("nama"), "Siswa");
  const kelas = sebagaiTeks(url.searchParams.get("kelas"), "SD");
  const kuota = await statusKuota(nama, kelas);
  return NextResponse.json({ berhasil: true, kuota });
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

    if (ajuan) {
      const klaim = await klaimInteraksiAi({
        nama,
        kelas,
        pakaiToken: sebagaiYa(body.pakaiToken),
      });
      if (!klaim.ok) {
        return NextResponse.json(
          {
            berhasil: false,
            kode: klaim.kode,
            pesan: klaim.pesan,
            kuota: klaim.kuota,
          },
          { status: 429 },
        );
      }

      const soalHitungan = mapelHitungan(mapel, `${materi} ${ajuan}`);

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

      const textAjuan = await hasilkanJsonGemini({
        parts: bagianAjuan,
        schema: SKEMA_AJUAN,
        maxOutputTokens: 4096,
        model: MODEL_GEMINI_RUTIN,
      });
      const dataJsonAjuan = bersihkanDanParseJson(textAjuan);

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
        kuota: klaim.kuota,
      });
    }

    const bisaCache = daftarGambar.length === 0;
    if (bisaCache) {
      const cache = await ambilCacheMateri(kelas, mapel, materi);
      if (cache) {
        console.info(`[materi] cache hit ${kelas} / ${mapel}`);
        return NextResponse.json({
          berhasil: true,
          dariCache: true,
          data: bentukModulTutor(nama, cache),
        });
      }
    }

    const instruksiMateri = daftarGambar.length > 0
      ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan (${daftarGambar.length} halaman). Baca tulisan, judul bab, rumus, gambar, dan soal di semua halaman tersebut. Deteksi topik utamanya, lalu buat modul DUA SUDUT PANDANG (curriculum_view + global_best_view) untuk ${namaDepan} (Kelas ${kelas}) berdasarkan isi halaman buku itu. Jika mapel/materi teks tersedia (${mapel} / ${materi}), gunakan sebagai petunjuk tambahan, tetapi prioritas utama adalah isi foto.`
      : `Tugas: Buat modul belajar DUA SUDUT PANDANG untuk ${namaDepan} (Kelas ${kelas}) mata pelajaran ${mapel} materi ${materi}. curriculum_view selaras buku siswa Kurikulum Merdeka Pusat Perbukuan. global_best_view memakai pedagogi dunia (analogi, penjelasan sederhana, kerangka visual) tanpa menyalahi fakta kurikulum.`;

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
3. sketsaKartu: TEPAT sama jumlahnya dengan kartu di curriculum_view. Setiap blok SATU kalimat visual doodle kecil (satu benda atau adegan mini), dipisah \\n\\n, urutan sama dengan kartu. Semua sketsa HARUS berbeda. Tanpa teks tertulis di gambar.
4. svgCode: cadangan doodle SVG sketsa tangan (viewBox 0 0 400 220), kertas krem, garis tinta navy #1C01A5 saja. Tanpa kutip ganda.
5. pertanyaan: TEPAT 10 soal PILIHAN GANDA dalam SATU string panjang, dipisah \\n\\n.
   Komposisi wajib berurutan: 3 soal Reguler (Soal 1-3) + 7 soal HOTS (Soal 4-10).
   DILARANG menuliskan label kunci, huruf jawaban, atau pembahasan di dalam field pertanyaan.
   Format tiap soal HANYA memuat tiga bagian ini:
   [Soal X - PG - Tipe: Reguler/HOTS]
   Narasi pertanyaan yang menantang...
   A) ...
   B) ...
   C) ...
   D) ...
6. kunciJawaban: SATU string berisi 10 huruf A/B/C/D sesuai urutan soal PG, dipisah koma. Contoh: A,C,B,D,A,B,C,D,A,B
   Setiap huruf HARUS cocok dengan opsi yang benar pada soal terkait.
7. esai: TEPAT 3 soal URAIAN dalam SATU string, dipisah \\n\\n.
   Komposisi wajib berurutan: 1 soal Reguler (Soal Esai 1) + 2 soal HOTS (Soal Esai 2-3).
   DILARANG pilihan A/B/C/D. Format:
   [Soal Esai X - Tipe: Reguler/HOTS]
   Narasi perintah uraian 2-4 kalimat.
8. kunciEsai: TEPAT 3 rubrik penilaian singkat (bukan esai siswa), dipisah \\n\\n, urutan sama dengan esai.
9. motivasi: SATU kata pujian umum untuk ${namaDepan} dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. Bukan kalimat panjang.

Kembalikan persis kunci: sapaan, curriculum_view, global_best_view, sketsaKartu, svgCode, pertanyaan, kunciJawaban, esai, kunciEsai, motivasi.
`.trim();

    const bagian: Part[] = [...daftarGambar];
    bagian.push({ text: promptText });

    const text = await hasilkanJsonGemini({
      parts: bagian,
      schema: SKEMA_MODUL,
      maxOutputTokens: 16384,
      model: MODEL_GEMINI_MATERI,
    });
    const dataJson = bersihkanDanParseJson(text);
    const dataAman = bentukModulTutor(nama, dataJson);

    if (bisaCache) {
      await simpanCacheMateri(kelas, mapel, materi, nama, {
        curriculum_view: dataAman.curriculum_view,
        global_best_view: dataAman.global_best_view,
        sketsaKartu: dataAman.sketsaKartu,
        svgCode: dataAman.svgCode,
        pertanyaan: kemasBankSoal(dataAman.pertanyaan, dataAman.esai),
        kunciJawaban: kemasKunciBank(
          dataAman.kunciJawaban,
          dataAman.kunciEsai.join("\n\n"),
        ),
        motivasi: dataAman.motivasi,
      });
    }

    return NextResponse.json({ berhasil: true, dariCache: false, data: dataAman });
  } catch (error: unknown) {
    console.error("EROR SISTEM:", error);
    return NextResponse.json(
      { berhasil: false, pesan: pesanGalatGemini(error) },
      { status: 500 },
    );
  }
}
