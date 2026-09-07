import { Type, type Part, type Schema } from "@google/genai";
import {
  kunciLatihanSaja,
  naskahLatihanSaja,
  pecahBankSoal,
  pecahBlokSoal,
  pecahKunciBank,
} from "@/lib/kuis";
import { jenjangGuru } from "@/lib/guru";
import { mapelHitungan } from "@/lib/mapel-hitungan";
import {
  hasilkanJsonGeminiLengkap,
  MODEL_GEMINI_MATERI,
  MODEL_GEMINI_RUTIN,
  pesanGalatGemini,
} from "@/lib/klien-gemini";
import { bersihkanDanParseJson } from "@/lib/parse-json-ai";
import { bersihkanLabelNaskah } from "@/lib/naskah-lisan";
import { kerangkaNaskahBuku, subbabBukuSiswa } from "@/lib/subbab-buku-siswa";
import {
  gantiNamaLengkapKeDepan,
  namaDepanSiswa,
  pilihKataPujian,
  sapaanTutorRingkas,
} from "@/lib/nama-siswa";
import {
  ambilCacheMateri,
  gabungCacheMateri,
  simpanCacheMateri,
  topicIdMateri,
  type IsiCacheMateri,
} from "@/lib/cache-materi-tutor";
import { naskahMateriSiap } from "@/lib/sudut-pandang";

export type ModulTutor = {
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
  referensiUrl?: string;
};

export const SKEMA_MODUL: Schema = {
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

function aturanMermaidDanLatex(): string {
  return `ATURAN LATEX (WAJIB):
- Rumus HANYA di dalam $...$ atau $$...$$. Jangan campur LaTeX ke dalam mermaid.
- Perintah yang diizinkan: \\frac, \\sqrt, \\vec, \\hat, \\sum, \\int, \\cdot, \\times, \\pm, \\leq, \\geq, \\neq, \\approx, huruf Yunani (\\theta, \\pi, \\epsilon, \\mu, \\omega).
- Indeks pakai _{1}, pangkat pakai ^{2}. Contoh benar: $$F = k \\frac{q_1 q_2}{r^2}$$
- DILARANG menulis rumus mentah tanpa pembungkus dolar jika ada \\frac, _, atau ^.

ATURAN MERMAID (WAJIB, jika ada diagram):
- Hanya flowchart sederhana: baris pertama flowchart TD atau flowchart LR.
- Setiap node: ID pendek tanpa spasi + label dalam kurung siku dan kutip tunggal. Contoh: A['Muatan q1']
- Panah hanya --> . Label panah: A -->|gaya tarik| B
- DILARANG: sequenceDiagram, classDiagram, stateDiagram, gantt, pie, mindmap, subgraph, style, classDef, click, HTML, <br>, kutip ganda, tanda #, LaTeX, $, $$, \\, <, >, &.
- DILARANG ID berisi spasi. Salah: Muatan positif --> Medan. Benar: A['Muatan positif'] --> B['Medan']
- Rumus di label ditulis kata biasa, bukan LaTeX. Contoh: A['F = k q1 q2 / r2']
- Maksimal 8 node. Tutup blok dengan pagar mermaid.

ATURAN DIAGRAM (WAJIB):
- Diagram alur/bagan HANYA mermaid. Ilustrasi benda atau adegan HANYA lewat sketsaKartu (doodle gambar), bukan kode gambar.
- DILARANG menulis blok \`\`\`svg, tag <svg>, atau teks di dalam gambar.`;
}

export function instruksiPencarianKurikulum(opsi: {
  materi: string;
  mapel: string;
  kelas: string;
}): string {
  return `Anda adalah AI Tutor ahli. Sebelum menyusun materi, Anda WAJIB menggunakan alat Google Search untuk mencari referensi aktual mengenai materi bab ${opsi.materi} untuk mata pelajaran ${opsi.mapel} jenjang ${opsi.kelas} berdasarkan Kurikulum Merdeka di Indonesia. Setelah mendapatkan hasil pencarian, sintesis dan tulis ulang informasi tersebut menggunakan bahasa Anda sendiri yang orisinal dan mudah dipahami.`;
}

export function instruksiSistemPro(opsi: {
  materi: string;
  mapel: string;
  kelas: string;
}): string {
  return `${instruksiPencarianKurikulum(opsi)}

Kamu adalah Tutor $IGIL. Bekerja dengan penalaran mendalam (deep reasoning).
Think step-by-step SEBELUM menulis JSON akhir:
1) Gunakan Google Search untuk merujuk sumber Kurikulum Merdeka terbaru (buku siswa, capaian pembelajaran, ATP) yang relevan.
2) Identifikasi kompetensi, istilah baku, dan urutan subbab Kurikulum Merdeka untuk kelas serta bab ini.
3) Validasi fakta, rumus, dan contoh hitung. Tolak klaim yang tidak selaras buku siswa.
4) Susun dua perspektif: Uraian Kurikulum Nasional dan Uraian Global Best Practice. Judul subbab dan urutan WAJIB sama.
5) Susun bank soal baku: 10 PG (3 Reguler + 7 HOTS) dan 3 Essay (1 Reguler + 2 HOTS).
6) Baru keluarkan SATU objek JSON. Jangan keluarkan langkah berpikir ke pengguna.

Saat menyusun materi, patuhi format berikut: 1. Gunakan paragraf mikro (2-3 kalimat). 2. WAJIB gunakan sintaks LaTeX untuk rumus matematika/sains ($$ untuk block/berdiri sendiri, $ untuk inline). Berikan keterangan variabel di bawah rumus. 3. Jika materi membutuhkan diagram, bagan, atau alur konsep, WAJIB buat kode mermaid. DILARANG blok SVG atau tag <svg> di dalam naskah. 4. Gunakan Markdown untuk penataan hierarki (Heading 2, Heading 3, List).
Format itu berlaku DI DALAM nilai JSON (curriculum_view dan global_best_view), bukan di luar objek JSON. Respons tetap SATU objek JSON murni. Di mermaid, pakai kutip tunggal, jangan kutip ganda. Jangan menyalin hasil pencarian mentah.
Di string JSON, setiap backslash LaTeX WAJIB digandakan. Contoh benar: $$F = k \\\\frac{q_1 q_2}{r^2}$$ dan $$\\\\vec{E}$$. DILARANG menulis \\vec atau \\frac tanpa digandakan.
${aturanMermaidDanLatex()}`;
}

export const INSTRUKSI_SISTEM_PRO = instruksiSistemPro({
  materi: "bab ini",
  mapel: "mata pelajaran terkait",
  kelas: "jenjang siswa",
});

const CONTOH_FEW_SHOT = `
CONTOH TEMPLAT JSON (ikuti struktur, JANGAN salin isinya):
{
  'sapaan': 'Halo kamu, Semangat.',
  'curriculum_view': 'Menjumlah sampai 100.\\nAmati pensil di meja kelas.\\nUraian konsep penjumlahan sesuai buku siswa.\\n\\nMengurai puluhan dan satuan.\\nPuluhan adalah ikatan 10. Satuan adalah sisa.',
  'global_best_view': 'Menjumlah sampai 100.\\nBayangkan pensil diikat jadi bundel 10.\\n\\nMengurai puluhan dan satuan.\\nBundel = puluhan, sisa longgar = satuan.',
  'sketsaKartu': 'Meja dan tumpuk pensil.\\n\\nDua ikat puluhan dan sisa satuan.',
  'svgCode': '',
  'pertanyaan': '[Soal 1 - PG - Tipe: Reguler]\\nAda 12 kelereng lalu bertambah 7. Jumlahnya?\\nA) 17\\nB) 18\\nC) 19\\nD) 20\\n\\n[Soal 2 - PG - Tipe: Reguler]\\n...\\n\\n[Soal 3 - PG - Tipe: Reguler]\\n...\\n\\n[Soal 4 - PG - Tipe: HOTS]\\n...\\n\\n(lanjut Soal 5-10 HOTS, format sama)',
  'kunciJawaban': 'A,C,B,D,A,B,C,D,A,B',
  'esai': '[Soal Esai 1 - Tipe: Reguler]\\nJelaskan cara mengurai 34 menjadi puluhan dan satuan.\\n\\n[Soal Esai 2 - Tipe: HOTS]\\nBandingkan dua cara menjumlah 28 + 15 dan pilih yang lebih efisien.\\n\\n[Soal Esai 3 - Tipe: HOTS]\\nBuat soal cerita sendiri lalu uraikan langkah penyelesaiannya.',
  'kunciEsai': 'Sebut 3 puluhan dan 4 satuan.\\n\\nMembandingkan strategi dan alasan efisiensi.\\n\\nAda konteks, operasi, dan langkah nalar.',
  'motivasi': 'Semangat'
}
`.trim();

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

export { bersihkanDanParseJson };

function aturanAngkaNaskah(): string {
  return `ANGKA DAN BENTUK NASKAH:
- Jika menyebut bilangan, pecahan, rumus, persentase, suhu, atau hitungan, WAJIB tulis ANGKA ARAB (1, 2, 3) dan simbol matematika. Contoh benar: 2 + 3 = 5. Contoh salah: dua tambah tiga sama dengan lima.
- Rumus atau contoh hitung diletakkan di BARIS SENDIRI dengan LaTeX: $$...$$ untuk rumus berdiri sendiri, $...$ untuk rumus di dalam kalimat. Beri keterangan variabel di bawah rumus block.
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
  if (typeof nilai !== "string" || !nilai.trim()) return "";
  const svg = nilai
    .replace(/```svg/gi, "")
    .replace(/```/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/"/g, "'")
    .trim();
  if (!svg.toLowerCase().includes("<svg")) return "";
  return svg;
}

export function bentukModulTutor(
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
    referensiUrl?: unknown;
    referensi_url?: unknown;
  },
): ModulTutor {
  const kurikulumMentah = sebagaiTeks(bagian.curriculum_view || bagian.penjelasan);
  const kurikulum = kurikulumMentah
    ? amanNaskahModul(kurikulumMentah, "", nama)
    : "";
  const globalMentah = sebagaiTeks(bagian.global_best_view);
  const global = globalMentah ? amanNaskahModul(globalMentah, "", nama) : "";
  const pertanyaanMentah = pulihkanParagraf(bagian.pertanyaan, "");
  const bank = pecahBankSoal(
    /sedang disusun/i.test(pertanyaanMentah) ? "" : pertanyaanMentah,
  );
  const kunci = pecahKunciBank(bagian.kunciJawaban);
  return {
    sapaan: sapaanTutorRingkas(nama, sebagaiTeks(bagian.sapaan)),
    penjelasan: kurikulum,
    curriculum_view: kurikulum,
    global_best_view: global,
    sketsaKartu: pulihkanParagraf(bagian.sketsaKartu, ""),
    svgCode: amankanSvg(bagian.svgCode),
    pertanyaan: bank.pilihanGanda.join("\n\n"),
    kunciJawaban: kunci.huruf,
    esai: "",
    kunciEsai: [],
    motivasi: pilihKataPujian(sebagaiTeks(bagian.motivasi, namaDepanSiswa(nama))),
    referensiUrl: sebagaiTeks(bagian.referensiUrl || bagian.referensi_url),
  };
}

export function keIsiCache(data: ModulTutor): IsiCacheMateri {
  return {
    curriculum_view: data.curriculum_view,
    global_best_view: data.global_best_view,
    sketsaKartu: data.sketsaKartu,
    svgCode: data.svgCode,
    pertanyaan: naskahLatihanSaja(data.pertanyaan),
    kunciJawaban: kunciLatihanSaja(data.kunciJawaban),
    motivasi: data.motivasi,
    referensiUrl: data.referensiUrl,
  };
}

export function promptGenerasiModul(opsi: {
  namaDepan: string;
  kelas: string;
  mapel: string;
  materi: string;
  adaGambar: boolean;
  jumlahGambar: number;
}): string {
  const instruksiMateri = opsi.adaGambar
    ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan (${opsi.jumlahGambar} halaman). Baca tulisan, judul bab, rumus, gambar, dan soal di semua halaman tersebut. Deteksi topik utamanya, lalu buat modul DUA SUDUT PANDANG (curriculum_view + global_best_view) untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) berdasarkan isi halaman buku itu. Jika mapel/materi teks tersedia (${opsi.mapel} / ${opsi.materi}), gunakan sebagai petunjuk tambahan, tetapi prioritas utama adalah isi foto.`
    : `Tugas: Buat modul belajar DUA SUDUT PANDANG untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mata pelajaran ${opsi.mapel} materi ${opsi.materi}. curriculum_view selaras buku siswa Kurikulum Merdeka Pusat Perbukuan. global_best_view memakai pedagogi dunia (analogi, penjelasan sederhana, kerangka visual) tanpa menyalahi fakta kurikulum.`;

  return `
${instruksiPencarianKurikulum({
  materi: opsi.materi,
  mapel: opsi.mapel,
  kelas: opsi.kelas,
})}

Kamu adalah Tutor $IGIL, guru privat EdTech Indonesia yang hangat, cerdas, dan presisi.

${instruksiMateri}

${CONTOH_FEW_SHOT}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni. Tanpa kalimat pengantar, tanpa penutup. Markdown, LaTeX, dan mermaid HANYA boleh di dalam nilai curriculum_view dan global_best_view.
2. DILARANG memakai tanda kutip ganda (") di dalam nilai teks JSON. Gunakan kutip tunggal (') jika perlu. Setiap backslash LaTeX digandakan: \\\\frac \\\\vec \\\\times.
3. svgCode HARUS string kosong. Jangan menulis kode SVG.
4. Saat menyusun materi, patuhi format berikut: 1. Gunakan paragraf mikro (2-3 kalimat). 2. WAJIB gunakan sintaks LaTeX untuk rumus matematika/sains ($$ untuk block/berdiri sendiri, $ untuk inline). Berikan keterangan variabel di bawah rumus. 3. Jika materi membutuhkan diagram, bagan, atau alur konsep, WAJIB buat kode mermaid. DILARANG \`\`\`svg dan tag <svg>. 4. Gunakan Markdown untuk penataan hierarki (Heading 2, Heading 3, List). 5. Di AKHIR curriculum_view, setelah semua subbab, tulis TEPAT 2 contoh soal tuntas (bukan PG) berjudul 'Contoh soal 1' dan 'Contoh soal 2', masing-masing memuat Soal, Langkah penyelesaian, dan Jawaban.
${aturanMermaidDanLatex()}

STANDAR KONTEN:
1. sapaan: SATU kalimat pendek untuk dibaca suara. Sebut HANYA nama depan ${opsi.namaDepan}. Sertakan TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. DILARANG pujian panjang, julukan berlebihan, atau nama lengkap. Contoh: 'Halo ${opsi.namaDepan}, Pintar.'
${instruksiPenjelasan(opsi.kelas, opsi.namaDepan, opsi.mapel, opsi.materi)}
3. sketsaKartu: TEPAT sama jumlahnya dengan kartu di curriculum_view. Setiap blok SATU kalimat visual doodle kecil (satu benda atau adegan mini), dipisah \\n\\n, urutan sama dengan kartu. Semua sketsa HARUS berbeda. Tanpa teks tertulis di gambar.
4. svgCode: string kosong. Ilustrasi hanya doodle dari sketsaKartu, bukan SVG.
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
9. motivasi: SATU kata pujian umum untuk ${opsi.namaDepan} dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. Bukan kalimat panjang.

Kembalikan persis kunci: sapaan, curriculum_view, global_best_view, sketsaKartu, svgCode, pertanyaan, kunciJawaban, esai, kunciEsai, motivasi.
`.trim();
}

export type BagianNaskahModul = "kurikulum" | "global" | "latihan";

const SKEMA_KURIKULUM: Schema = {
  type: Type.OBJECT,
  properties: {
    sapaan: { type: Type.STRING },
    curriculum_view: { type: Type.STRING },
    sketsaKartu: { type: Type.STRING },
    svgCode: { type: Type.STRING },
    motivasi: { type: Type.STRING },
  },
  required: ["sapaan", "curriculum_view", "sketsaKartu", "svgCode", "motivasi"],
};

const SKEMA_GLOBAL: Schema = {
  type: Type.OBJECT,
  properties: {
    global_best_view: { type: Type.STRING },
  },
  required: ["global_best_view"],
};

const SKEMA_LATIHAN: Schema = {
  type: Type.OBJECT,
  properties: {
    pertanyaan: { type: Type.STRING },
    kunciJawaban: { type: Type.STRING },
    motivasi: { type: Type.STRING },
  },
  required: ["pertanyaan", "kunciJawaban", "motivasi"],
};

function naskahLatihanSiap(teks?: string): boolean {
  return pecahBankSoal(teks ?? "").pilihanGanda.length >= 4;
}

export function cachePunyaBagian(
  cache: IsiCacheMateri | null,
  bagian: BagianNaskahModul,
): boolean {
  if (!cache) return false;
  if (bagian === "kurikulum") return naskahMateriSiap(cache.curriculum_view);
  if (bagian === "global") return naskahMateriSiap(cache.global_best_view);
  return naskahLatihanSiap(cache.pertanyaan);
}

function kerangkaJudulSubbab(kelas: string, mapel: string, materi: string): string {
  const subbab = subbabBukuSiswa(kelas, mapel, materi);
  if (subbab.length === 0) return kerangkaNaskahBuku(kelas, mapel, materi);
  return `Urutan subbab buku siswa (wajib diikuti):\n${subbab
    .map((nama, i) => `${i + 1}. ${nama}`)
    .join("\n")}`;
}

function promptNaskahKurikulum(opsi: {
  namaDepan: string;
  kelas: string;
  mapel: string;
  materi: string;
  adaGambar: boolean;
  jumlahGambar: number;
}): string {
  const tugas = opsi.adaGambar
    ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan (${opsi.jumlahGambar} halaman). Deteksi topik utamanya, lalu tulis HANYA naskah kurikulum (curriculum_view) untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}).`
    : `Tugas: Tulis HANYA naskah kurikulum (curriculum_view) untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mapel ${opsi.mapel} materi ${opsi.materi}.`;
  return `
${instruksiPencarianKurikulum({
  materi: opsi.materi,
  mapel: opsi.mapel,
  kelas: opsi.kelas,
})}

Kamu adalah Tutor $IGIL. ${tugas}
DILARANG menulis global_best_view, soal PG, atau esai. Hanya sapaan, curriculum_view, sketsaKartu, svgCode kosong, dan motivasi.

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni.
2. DILARANG kutip ganda (") di dalam nilai teks. Setiap backslash LaTeX digandakan.
3. svgCode HARUS string kosong.
4. Paragraf mikro 2-3 kalimat. Rumus wajib LaTeX. Diagram HANYA mermaid. DILARANG SVG.
5. Di AKHIR curriculum_view, setelah semua subbab, tulis TEPAT 2 contoh soal tuntas (bukan PG) berjudul 'Contoh soal 1' dan 'Contoh soal 2'.
${aturanMermaidDanLatex()}

1. sapaan: SATU kalimat pendek. Sebut HANYA nama depan ${opsi.namaDepan}. TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat.
${instruksiPenjelasan(opsi.kelas, opsi.namaDepan, opsi.mapel, opsi.materi).split("3. global_best_view:")[0]}
2. sketsaKartu: TEPAT sama jumlahnya dengan kartu di curriculum_view. Setiap blok SATU kalimat visual doodle, dipisah \\n\\n.
3. svgCode: string kosong.
4. motivasi: SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat.

Kembalikan persis kunci: sapaan, curriculum_view, sketsaKartu, svgCode, motivasi.
`.trim();
}

function judulKartuDariNaskah(naskah: string): string[] {
  return naskah
    .split(/\n\n+/)
    .map((blok) => blok.split("\n")[0]?.replace(/^#+\s*/, "").trim() ?? "")
    .filter((baris) => baris.length >= 4 && baris.length <= 80);
}

function acuanJudulGlobal(
  kelas: string,
  mapel: string,
  materi: string,
  naskahKurikulum: string,
): string {
  const dariKurikulum = judulKartuDariNaskah(naskahKurikulum);
  const subbab = subbabBukuSiswa(kelas, mapel, materi);
  const judul = dariKurikulum.length >= 3 ? dariKurikulum : subbab;
  if (judul.length === 0) return kerangkaJudulSubbab(kelas, mapel, materi);
  return `Judul kartu, jumlah, dan urutan WAJIB sama persis:\n${judul
    .map((nama, i) => `${i + 1}. ${nama}`)
    .join("\n")}\nJangan menyalin uraian kurikulum. Tulis analogi dan kerangka visual baru.`;
}

function promptNaskahGlobal(opsi: {
  namaDepan: string;
  kelas: string;
  mapel: string;
  materi: string;
  naskahKurikulum: string;
}): string {
  const acuan = acuanJudulGlobal(
    opsi.kelas,
    opsi.mapel,
    opsi.materi,
    opsi.naskahKurikulum,
  );
  const jenjang = jenjangGuru(opsi.kelas);
  const dariKurikulum = judulKartuDariNaskah(opsi.naskahKurikulum);
  const subbab = subbabBukuSiswa(opsi.kelas, opsi.mapel, opsi.materi);
  const hitungan = mapelHitungan(opsi.mapel, opsi.materi);
  const jumlahKartu =
    dariKurikulum.length >= 3 ? dariKurikulum.length : subbab.length;
  const jumlah =
    jumlahKartu > 0
      ? `TEPAT ${jumlahKartu}`
      : jenjang === "SD"
        ? "TEPAT 6 sampai 8"
        : "TEPAT 6";
  const { kepala } = formatKartuDasar(jenjang, opsi.kelas, jumlah);
  return `
Kamu adalah Tutor $IGIL. Tulis HANYA naskah global_best_view untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mapel ${opsi.mapel} materi ${opsi.materi}.
DILARANG menulis curriculum_view, sapaan, sketsaKartu, soal PG, atau esai.

${acuan}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni { 'global_best_view': '...' }.
2. DILARANG kutip ganda (") di dalam nilai teks. Setiap backslash LaTeX digandakan.
3. Paragraf mikro. Rumus wajib LaTeX. Diagram HANYA mermaid. DILARANG SVG.
${aturanMermaidDanLatex()}

global_best_view: perspektif Standar Global. ${kepala}
${alurUraianGlobal(opsi.namaDepan, hitungan, opsi.kelas)}
Fakta tidak boleh menyalahi kurikulum. DILARANG menyebut Feynman atau esai panjang.
`.trim();
}

function promptNaskahLatihan(opsi: {
  namaDepan: string;
  kelas: string;
  mapel: string;
  materi: string;
}): string {
  return `
Kamu adalah Tutor $IGIL. Buat HANYA bank soal latihan pilihan ganda untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mapel ${opsi.mapel} bab ${opsi.materi}.
DILARANG menulis naskah materi, esai ujian, atau sudut pandang global.

${kerangkaJudulSubbab(opsi.kelas, opsi.mapel, opsi.materi)}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni.
2. DILARANG kutip ganda (") di dalam nilai teks.
3. pertanyaan: TEPAT 10 soal PILIHAN GANDA, dipisah \\n\\n.
   Komposisi: 3 Reguler (Soal 1-3) + 7 HOTS (Soal 4-10).
   DILARANG menuliskan kunci di dalam field pertanyaan.
   Format tiap soal:
   [Soal X - PG - Tipe: Reguler/HOTS]
   Narasi pertanyaan...
   A) ...
   B) ...
   C) ...
   D) ...
4. kunciJawaban: SATU string 10 huruf A/B/C/D dipisah koma. Contoh: A,C,B,D,A,B,C,D,A,B
5. motivasi: SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat.

Kembalikan persis kunci: pertanyaan, kunciJawaban, motivasi.
`.trim();
}

async function simpanBagianCache(
  opsi: {
    nama: string;
    kelas: string;
    mapel: string;
    materi: string;
    gambar?: Part[];
  },
  isi: Partial<IsiCacheMateri>,
): Promise<void> {
  if ((opsi.gambar ?? []).length > 0) return;
  const tersimpan = await gabungCacheMateri(
    opsi.kelas,
    opsi.mapel,
    opsi.materi,
    opsi.nama,
    isi,
  );
  if (!tersimpan) {
    console.warn(
      `[materi] bagian cache gagal topic_id=${topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi)}`,
    );
  }
}

export async function generateBagianModul(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
  bagian: BagianNaskahModul;
  naskahKurikulum?: string;
}): Promise<ModulTutor> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const gambar = opsi.gambar ?? [];

  if (opsi.bagian === "kurikulum") {
    const hasil = await hasilkanJsonGeminiLengkap({
      parts: [
        ...gambar,
        {
          text: promptNaskahKurikulum({
            namaDepan,
            kelas: opsi.kelas,
            mapel: opsi.mapel,
            materi: opsi.materi,
            adaGambar: gambar.length > 0,
            jumlahGambar: gambar.length,
          }),
        },
      ],
      schema: SKEMA_KURIKULUM,
      maxOutputTokens: 8192,
      model: MODEL_GEMINI_MATERI,
      systemInstruction: instruksiPencarianKurikulum({
        materi: opsi.materi,
        mapel: opsi.mapel,
        kelas: opsi.kelas,
      }),
      thinking: false,
      timeoutCobaMs: 70_000,
      googleSearch: true,
    });
    const dataJson = bersihkanDanParseJson(hasil.teks);
    const dataAman = bentukModulTutor(opsi.nama, {
      ...dataJson,
      referensiUrl: hasil.referensi.join("\n"),
    });
    await simpanBagianCache(opsi, {
      curriculum_view: dataAman.curriculum_view,
      sketsaKartu: dataAman.sketsaKartu,
      svgCode: "",
      motivasi: dataAman.motivasi,
      referensiUrl: dataAman.referensiUrl,
    });
    return dataAman;
  }

  if (opsi.bagian === "global") {
    const hasil = await hasilkanJsonGeminiLengkap({
      parts: [
        {
          text: promptNaskahGlobal({
            namaDepan,
            kelas: opsi.kelas,
            mapel: opsi.mapel,
            materi: opsi.materi,
            naskahKurikulum: opsi.naskahKurikulum ?? "",
          }),
        },
      ],
      schema: SKEMA_GLOBAL,
      maxOutputTokens: 6144,
      model: MODEL_GEMINI_RUTIN,
      thinking: false,
      timeoutCobaMs: 25_000,
      timeoutMs: 60_000,
      googleSearch: false,
    });
    const dataJson = bersihkanDanParseJson(hasil.teks);
    const dataAman = bentukModulTutor(opsi.nama, dataJson);
    await simpanBagianCache(opsi, {
      global_best_view: dataAman.global_best_view,
    });
    return dataAman;
  }

  const hasil = await hasilkanJsonGeminiLengkap({
    parts: [
      {
        text: promptNaskahLatihan({
          namaDepan,
          kelas: opsi.kelas,
          mapel: opsi.mapel,
          materi: opsi.materi,
        }),
      },
    ],
    schema: SKEMA_LATIHAN,
    maxOutputTokens: 4096,
    model: MODEL_GEMINI_RUTIN,
    thinking: false,
    timeoutCobaMs: 40_000,
    googleSearch: false,
  });
  const dataJson = bersihkanDanParseJson(hasil.teks);
  const dataAman = bentukModulTutor(opsi.nama, dataJson);
  await simpanBagianCache(opsi, {
    pertanyaan: dataAman.pertanyaan,
    kunciJawaban: dataAman.kunciJawaban.join(","),
    motivasi: dataAman.motivasi,
  });
  return dataAman;
}

export async function ambilAtauBuatBagianModul(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
  bagian: BagianNaskahModul;
}): Promise<{ data: ModulTutor; dariCache: boolean; topicId: string }> {
  const gambar = opsi.gambar ?? [];
  const topicId = topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi);
  let cache =
    gambar.length === 0
      ? await getModule(opsi.kelas, opsi.mapel, opsi.materi)
      : null;
  if (cachePunyaBagian(cache, opsi.bagian) && cache) {
    console.info(`[materi] cache hit ${opsi.bagian} topic_id=${topicId}`);
    return {
      data: bentukModulTutor(opsi.nama, cache),
      dariCache: true,
      topicId,
    };
  }

  try {
    const data = await generateBagianModul({
      ...opsi,
      gambar,
      naskahKurikulum: cache?.curriculum_view,
    });
    if (gambar.length === 0) {
      const cacheSetelah = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
      if (cacheSetelah && cachePunyaBagian(cacheSetelah, opsi.bagian)) {
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelah),
          dariCache: true,
          topicId,
        };
      }
    }
    console.info(`[materi] generate ${opsi.bagian} topic_id=${topicId}`);
    const gabung = cache
      ? bentukModulTutor(opsi.nama, {
          ...cache,
          ...data,
          curriculum_view: data.curriculum_view || cache.curriculum_view,
          global_best_view: data.global_best_view || cache.global_best_view,
          pertanyaan: data.pertanyaan || cache.pertanyaan,
          kunciJawaban: data.kunciJawaban.length
            ? data.kunciJawaban.join(",")
            : cache.kunciJawaban,
        })
      : data;
    return { data: gabung, dariCache: false, topicId };
  } catch (error) {
    if (gambar.length === 0) {
      const cacheSetelahGalat = await getModule(
        opsi.kelas,
        opsi.mapel,
        opsi.materi,
      );
      if (cachePunyaBagian(cacheSetelahGalat, opsi.bagian) && cacheSetelahGalat) {
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelahGalat),
          dariCache: true,
          topicId,
        };
      }
    }
    throw new Error(pesanGalatGemini(error));
  }
}

export async function getModule(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<IsiCacheMateri | null> {
  return ambilCacheMateri(kelas, mapel, materi);
}

export async function generateModuleFirstTime(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
}): Promise<ModulTutor> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const gambar = opsi.gambar ?? [];
  const promptText = promptGenerasiModul({
    namaDepan,
    kelas: opsi.kelas,
    mapel: opsi.mapel,
    materi: opsi.materi,
    adaGambar: gambar.length > 0,
    jumlahGambar: gambar.length,
  });

  const hasil = await hasilkanJsonGeminiLengkap({
    parts: [...gambar, { text: promptText }],
    schema: SKEMA_MODUL,
    maxOutputTokens: 16384,
    model: MODEL_GEMINI_MATERI,
    systemInstruction: instruksiSistemPro({
      materi: opsi.materi,
      mapel: opsi.mapel,
      kelas: opsi.kelas,
    }),
    thinking: false,
    timeoutCobaMs: 85_000,
    googleSearch: true,
  });
  if (hasil.referensi.length) {
    console.info(
      `[materi] grounding ${hasil.referensi.length} tautan topic=${opsi.mapel}/${opsi.materi}`,
    );
  }
  const dataJson = bersihkanDanParseJson(hasil.teks);
  const dataAman = bentukModulTutor(opsi.nama, {
    ...dataJson,
    referensiUrl: hasil.referensi.join("\n"),
  });

  if (gambar.length === 0) {
    const tersimpan = await simpanCacheMateri(
      opsi.kelas,
      opsi.mapel,
      opsi.materi,
      opsi.nama,
      keIsiCache(dataAman),
      { tulisUlangSetelahHapus: true },
    );
    if (!tersimpan) {
      console.warn(
        `[materi] generate Pro selesai tetapi cache gagal disimpan topic_id=${topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi)}`,
      );
    }
  }

  return dataAman;
}

export async function ambilAtauBuatModul(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
}): Promise<{ data: ModulTutor; dariCache: boolean; topicId: string }> {
  const gambar = opsi.gambar ?? [];
  const topicId = topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi);
  if (gambar.length === 0) {
    const cache = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
    if (cache) {
      console.info(`[materi] cache hit topic_id=${topicId}`);
      return {
        data: bentukModulTutor(opsi.nama, cache),
        dariCache: true,
        topicId,
      };
    }
  }

  try {
    const data = await generateModuleFirstTime({ ...opsi, gambar });
    if (gambar.length === 0) {
      const cacheSetelah = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
      if (cacheSetelah) {
        console.info(`[materi] pakai cache pertama topic_id=${topicId}`);
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelah),
          dariCache: true,
          topicId,
        };
      }
    }
    console.info(`[materi] cache miss, generate Pro topic_id=${topicId}`);
    return { data, dariCache: false, topicId };
  } catch (error) {
    if (gambar.length === 0) {
      const cacheSetelahGalat = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
      if (cacheSetelahGalat) {
        console.info(`[materi] cache setelah timeout topic_id=${topicId}`);
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelahGalat),
          dariCache: true,
          topicId,
        };
      }
    }
    throw new Error(pesanGalatGemini(error));
  }
}

const SKEMA_UJIAN: Schema = {
  type: Type.OBJECT,
  properties: {
    esai: { type: Type.STRING },
  },
  required: ["esai"],
};

export async function generateUjianAcak(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
}): Promise<string[]> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const variasi = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const teks = await hasilkanJsonGeminiLengkap({
    parts: [
      {
        text: `Buat 3 soal uraian BARU untuk ujian ${opsi.mapel} bab ${opsi.materi} kelas ${opsi.kelas}. Siswa: ${namaDepan}.
Soal HARUS berbeda setiap sesi. Kode variasi: ${variasi}.
DILARANG mengulang soal cache atau contoh di naskah.
Komposisi: 1 Reguler + 2 HOTS.
Format SATU string 'esai', dipisah baris kosong:
[Soal Esai 1 - Tipe: Reguler]
Perintah uraian 2-4 kalimat.

[Soal Esai 2 - Tipe: HOTS]
...

[Soal Esai 3 - Tipe: HOTS]
...
DILARANG pilihan A/B/C/D. DILARANG kutip ganda di JSON. Respons SATU objek JSON { 'esai': '...' }.`,
      },
    ],
    schema: SKEMA_UJIAN,
    maxOutputTokens: 2048,
    model: MODEL_GEMINI_RUTIN,
    thinking: false,
    timeoutCobaMs: 25_000,
    googleSearch: false,
  });
  const data = bersihkanDanParseJson(teks.teks) as { esai?: unknown };
  const soal = pecahBlokSoal(
    typeof data.esai === "string" ? data.esai : "",
  ).slice(0, 3);
  if (soal.length === 0) {
    throw new Error("Ujian acak kosong.");
  }
  return soal;
}
