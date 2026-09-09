import { Type, type Part, type Schema } from "@google/genai";
import {
  kunciLatihanSaja,
  naskahLatihanSaja,
  pecahBankSoal,
  pecahBlokSoal,
  pecahKunciBank,
} from "@/lib/kuis";
import { jenjangGuru } from "@/lib/guru";
import { kelasSatuSd } from "@/lib/infografis-kelas1";
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
  GalatMateriTerkunci,
  materiSedangTerkunci,
  simpanCacheMateri,
  topicIdMateri,
  type IsiCacheMateri,
} from "@/lib/cache-materi-tutor";
import { naskahResmiJikaAda } from "@/lib/naskah-resmi";
import { naskahKartuSdLayak, lengkapiVisualNaskahSd } from "@/lib/naskah-kartu-sd";
import { naskahGlobalSiap, naskahMateriSiap } from "@/lib/sudut-pandang";
import { instruksiPaketLengkap } from "@/lib/paket-lengkap-materi";
import {
  permintaanDibatalkan,
  teksNaskahUtuh,
  tolakJikaDibatalkan,
} from "@/lib/validasi-naskah-ai";

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
4) Susun dua perspektif yang ISI-nya WAJIB beda: curriculum_view = pahami konsep (buku siswa). global_best_view = alat percepatan/hack (trik hitung atau pola cepat), BUKAN analogi ulang konsep yang sama. Judul subbab dan urutan WAJIB sama.
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
  'curriculum_view': 'Menjumlah sampai 100.\\nPensil diikat jadi bundel.\\n3 pensil ditambah 5 pensil jadi 8.\\n\\nMengurai puluhan dan satuan.\\nPuluhan adalah ikatan 10. Satuan adalah sisa.',
  'global_best_view': 'Menjumlah sampai 100.\\nTambah puluhan dulu, baru satuan.\\nCara cepat:\\n27 + 15: 27 + 10 = 37, lalu 37 + 5 = 42.\\nKapan dipakai:\\nKalau satuan kecil. Jangan jika guru minta bersusun.\\nContoh cepat\\nSoal: 38 + 24.\\n38 + 20 = 58, 58 + 4 = 62.\\n62\\nLatihan\\n1) 46 + 27\\n2) 19 + 35\\nKunci\\n1) 73\\n2) 54',
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

function aturanMermaidSd(): string {
  return `DIAGRAM SD (WAJIB tiap kartu):
- Satu blok mermaid flowchart TD atau LR, 3-6 node, kutip tunggal di label.
- Contoh:
\`\`\`mermaid
flowchart LR
A['3 apel'] --> B['ditambah 2']
B --> C['5 apel']
\`\`\`
- DILARANG kutip ganda, LaTeX, HTML, atau lebih dari 6 node.`;
}

function aturanContohSoal(hitungan: boolean, kelas: string): string {
  if (jenjangGuru(kelas) === "SD") {
    return hitungan
      ? `CONTOH SD: setelah diagram, 1 soal cerita sangat pendek + hasil angka. Lalu Latihan 1 butir + Kunci. Tetap dalam kartu yang sama, jangan pisah \\n\\n.`
      : `CONTOH SD: setelah diagram, 1 pertanyaan lisan singkat. Tidak wajib kunci angka.`;
  }
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

function alurKartuSd(
  namaDepan: string,
  hitungan: boolean,
  kelas: string,
  kelas1: boolean,
): string {
  const visual = kelas1
    ? `- Visual WAJIB infografis kotak (Kiri/Kanan, boleh Tengah) atau daftar LENGKAP. DILARANG mermaid.
Format infografis di dalam kartu:
1. NAMA KONSEP (bukan kata Kotak, Baris, atau Infografis)
Kiri: NAMA KOTAK
Artinya: 2-4 kata
Isi: benda atau angka singkat
Kanan: NAMA KOTAK
Artinya: 2-4 kata
Isi: benda atau angka singkat`
    : `- Visual WAJIB di SETIAP kartu: mermaid flowchart 3-6 node ATAU tabel markdown 2-4 baris. Tanpa itu naskah DITOLAK.
${aturanMermaidSd()}`;
  return `BENTUK NASKAH SD = KARTU PER PEMBAHASAN, seperti Bab 1 PAI (bukan esai, bukan poster polos):
Setiap subbab = SATU kartu dibungkus penanda:
<<<BAGIAN 1 | A. Judul subbab>>>
1-2 kalimat penjelasan singkat (maks 28 kata). Bukan esai.
Lalu visual supaya konsep rumit jadi mudah dipahami.
<<<AKHIR BAGIAN 1>>>
${visual}
- Kartu berikutnya B, C, dst. sesuai urutan subbab resmi.
- DILARANG 5+ kalimat beruntun tanpa visual. DILARANG kartu teks polos. DILARANG hanya menyebut tabel/diagram tanpa menulis kodenya.
- DILARANG menyalin kalimat buku. DILARANG label Ayo Mengamati, Judul, Subjudul, Kartu, VOICE, JSON, pause, atau kurung siku.
${aturanAngkaNaskah()}
${aturanContohSoal(hitungan, kelas)}
Jika menyebut nama, HANYA ${namaDepan}. DILARANG pujian berlebihan.`;
}

function alurInfografisKelas1(namaDepan: string, percepatan: boolean): string {
  return alurKartuSd(namaDepan, false, "1 SD", true).replace(
    "1-2 kalimat penjelasan singkat (maks 28 kata). Bukan esai.",
    percepatan
      ? "1 kalimat trik. Pada kotak Isi boleh mulai dengan Cara cepat: lalu 1 langkah pintas."
      : "1-2 kalimat penjelasan singkat (maks 28 kata). Bukan esai.",
  );
}

function alurUraianBuku(namaDepan: string, hitungan: boolean, kelas: string): string {
  if (kelasSatuSd(kelas)) {
    return alurKartuSd(namaDepan, hitungan, kelas, true);
  }
  if (jenjangGuru(kelas) === "SD") {
    return alurKartuSd(namaDepan, hitungan, kelas, false);
  }
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

function aturanContohCepat(hitungan: boolean, kelas: string): string {
  if (!hitungan) {
    return `CONTOH CEPAT: setelah trik, tulis 1 kasus singkat: soal tempo, pola yang dipakai, hasil. Lalu Latihan 2 butir + Kunci. Bukan uraian konsep.`;
  }
  return `CONTOH CEPAT HITUNGAN (wajib di SETIAP kartu, setelah trik), gaya soal tempo bimbel:
Tulis blok berikut di baris sendiri, tanpa pilihan A/B/C/D, DAN TETAP dalam kartu subbab yang sama (jangan pisah \\n\\n sebelum Contoh cepat/Latihan/Kunci):
Contoh cepat
Soal tempo 1 kalimat, tingkat ${kelas}, angka beda dari kurikulum.
Langkah pintas 1-3 baris (bukan uraian konsep).
Hasil ANGKA di baris sendiri.

Latihan
1) Soal tempo baru, beda angka.
2) Soal kedua, sedikit jebakan (kapan trik TIDAK dipakai).

Kunci
1) hasil
2) hasil atau 'pakai cara biasa karena ...'
Soal WAJIB improvisasi AI. DILARANG menyalin soal buku atau field pertanyaan kuis.`;
}

function alurUraianGlobal(namaDepan: string, hitungan: boolean, kelas: string): string {
  const misi = hitungan
    ? `ISI = alat percepatan hitung ala bimbel: trik, pola, rumus pintas, hack langkah. Bukan menjelaskan ulang konsep.`
    : `ISI = alat percepatan: jembatan keledai, pola soal, pohon keputusan, cara bedakan opsi, hack ujian. Bukan menjelaskan ulang konsep.`;
  const alur = hitungan
    ? `- Alur tiap kartu: (1) janji percepatan 1 kalimat, (2) baris persis 'Cara cepat:' lalu langkah hack/trik (bukan definisi), (3) baris 'Kapan dipakai:' 1 syarat + 1 kapan JANGAN dipakai, (4) rumus pintas di baris sendiri jika ada, (5) Contoh cepat dan latihan tempo.`
    : `- Alur tiap kartu: (1) janji percepatan 1 kalimat, (2) baris persis 'Cara cepat:' lalu pola/mnemonik/pohon keputusan, (3) baris 'Kapan dipakai:' plus 1 jebakan yang bikin lama, (4) Contoh cepat dan latihan tempo.`;
  if (kelasSatuSd(kelas)) {
    return alurInfografisKelas1(namaDepan, true);
  }
  const visualSd =
    jenjangGuru(kelas) === "SD"
      ? `- Untuk SD: sertakan SATU mermaid pendek per kartu (pola trik), lalu 2 kalimat. ${aturanMermaidSd()}`
      : "";
  return `BENTUK NASKAH Mode Global = HACK PERCEPATAN, ramah anak, BUKAN esai dan BUKAN salinan kurikulum:
- Judul kartu SAMA dengan curriculum_view (subbab resmi), tetapi ${misi}
${alur}
${visualSd}
- Setiap kartu WAJIB memuat teks persis 'Cara cepat:' (dengan titik dua).
- DILARANG menomori judul kartu dengan 1. 2. 3. di depan. Judul = nama subbab saja.
- DILARANG memisah Contoh cepat, Latihan, atau Kunci dengan baris kosong (\\n\\n). Tetap SATU blok kartu.
- DILARANG menyalin curriculum_view. DILARANG analogi yang hanya mengulang uraian konsep dengan cerita. DILARANG menyebut Feynman, meta-metode, atau esai 8+ kalimat.
- Fakta, istilah baku (boleh dalam kurung), dan hasil hitung HARUS benar. Jangan ajar shortcut yang menghasilkan jawaban salah.
${aturanAngkaNaskah()}
${aturanContohCepat(hitungan, kelas)}
Jika menyebut nama, HANYA ${namaDepan}. DILARANG pujian berlebihan.`;
}

function formatKartuPercepatan(
  jenjang: string,
  kelas: string,
  jumlah: string,
): { kepala: string } {
  if (kelasSatuSd(kelas) || jenjang === "SD") {
    return {
      kepala: `${jumlah} KARTU PERCEPATAN, satu kartu satu subbab, dibungkus <<<BAGIAN n | A. Judul>>>. Tiap kartu 1 kalimat trik + visual + teks Cara cepat:. Bahasa ${kelas}.`,
    };
  }
  const kepadatan =
    jenjang === "SMA"
      ? "4-6 kalimat padat setara SMA: trik, syarat pakai, jebakan. Bahasa analitis."
      : "4-6 kalimat berbobot setara SMP: trik, syarat pakai, jebakan. Bukan flashcard SD.";
  return {
    kepala: `${jumlah} KARTU PERCEPATAN untuk jenjang ${jenjang} (${kelas}). Setiap kartu SATU blok dipisah \\n\\n.
Baris pertama: judul subbab 2-8 kata, diakhiri titik. Plain text.
Lalu naskah hack (${kepadatan}).`,
  };
}

function formatKartuDasar(
  jenjang: string,
  kelas: string,
  jumlah: string,
): { kepala: string; kepadatan: string } {
  if (kelasSatuSd(kelas) || jenjang === "SD") {
    return {
      kepala: `${jumlah} KARTU PEMBAHASAN, satu kartu satu subbab, dibungkus <<<BAGIAN n | A. Judul>>>. Tiap kartu 1-2 kalimat penjelasan plus infografis/diagram/tabel. Bahasa ${kelas}.`,
      kepadatan: `teks singkat plus visual setara ${kelas}`,
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
        ? "TEPAT 4"
        : "TEPAT 6";
  const { kepala } = formatKartuDasar(jenjang, kelas, jumlah);
  const { kepala: kepalaGlobal } = formatKartuPercepatan(jenjang, kelas, jumlah);

  return `2. curriculum_view: perspektif Kurikulum Nasional. ${kepala}
${kerangka}
${alurUraianBuku(namaDepan, hitungan, kelas)}
${instruksiPaketLengkap(mapel, materi)}
Istilah, urutan subbab, dan kompetensi HARUS selaras buku teks resmi Kemendikbudristek agar siswa siap ujian sekolah. DILARANG analogi bebas yang mengganti istilah baku. Di uraian, sapa dengan 'kamu'. Jangan mengulang nama siswa.

3. global_best_view: alat percepatan Mode Global. ${kepalaGlobal}
JUMLAH KARTU, JUDUL SUBBAB, dan URUTAN SAMA PERSIS dengan curriculum_view. ISI WAJIB beda: trik/hack, bukan analogi ulang konsep.
${alurUraianGlobal(namaDepan, hitungan, kelas)}
${instruksiPaketLengkap(mapel, materi)}
Fakta tidak boleh menyalahi kurikulum. DILARANG menyebut Feynman, meta-metode, atau esai panjang. Bahasa ${kelas}, padat, siap pakai di soal.`;
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
  konteks?: { mapel?: string; materi?: string },
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
    : `Tugas: Buat modul belajar DUA SUDUT PANDANG untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mata pelajaran ${opsi.mapel} materi ${opsi.materi}. curriculum_view selaras buku siswa Kurikulum Merdeka Pusat Perbukuan untuk MEMAHAMI konsep. global_best_view adalah alat percepatan/hack (trik hitung atau pola cepat ala bimbel), BUKAN analogi yang mengulang konsep yang sama.`;

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
  _kelas = "",
): boolean {
  if (!cache) return false;
  if (bagian === "kurikulum") {
    const naskah = cache.curriculum_view.trim();
    if (!naskah) return false;
    if (jenjangGuru(_kelas) === "SD") return naskahKartuSdLayak(naskah);
    return true;
  }
  if (bagian === "global") {
    const naskah = cache.global_best_view.trim();
    if (!naskah) return false;
    if (jenjangGuru(_kelas) === "SD") return naskahKartuSdLayak(naskah);
    return true;
  }
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
  const sd = jenjangGuru(opsi.kelas) === "SD";
  const kelas1 = kelasSatuSd(opsi.kelas);
  const tugas = opsi.adaGambar
    ? `Tugas: Analisis foto halaman buku pelajaran yang dilampirkan (${opsi.jumlahGambar} halaman). Deteksi topik utamanya, lalu tulis HANYA naskah kurikulum (curriculum_view) untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}).`
    : `Tugas: Tulis HANYA naskah kurikulum (curriculum_view) untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mapel ${opsi.mapel} materi ${opsi.materi}.`;
  const cari = sd
    ? ""
    : `${instruksiPencarianKurikulum({
        materi: opsi.materi,
        mapel: opsi.mapel,
        kelas: opsi.kelas,
      })}\n\n`;
  const ekstraAkhir = sd
    ? "5. curriculum_view berisi beberapa <<<BAGIAN n | A. Judul>>> kartu pembahasan. Tiap kartu 1-2 kalimat plus visual. Jangan menambah contoh soal terpisah di akhir."
    : "5. Di AKHIR curriculum_view, setelah semua subbab, tulis TEPAT 2 contoh soal tuntas (bukan PG) berjudul 'Contoh soal 1' dan 'Contoh soal 2'.";
  const sketsa = sd
    ? "2. sketsaKartu: TEPAT sama jumlahnya dengan kartu pembahasan. Setiap blok SATU adegan benda konkret, tanpa teks di gambar, dipisah \\n\\n."
    : "2. sketsaKartu: TEPAT sama jumlahnya dengan kartu di curriculum_view. Setiap blok SATU kalimat visual doodle, dipisah \\n\\n.";
  const aturanGambar = kelas1
    ? "4. Naskah kelas 1 = kartu pembahasan plus infografis kotak. DILARANG mermaid dan esai."
    : sd
      ? "4. Naskah SD = kartu pembahasan plus diagram/tabel. Teks singkat. DILARANG esai."
      : "4. Paragraf mikro 2-3 kalimat. Rumus wajib LaTeX. Diagram HANYA mermaid. DILARANG SVG.";
  return `
${cari}Kamu adalah Tutor $IGIL. ${tugas}
DILARANG menulis global_best_view, soal PG, atau esai. Hanya sapaan, curriculum_view, sketsaKartu, svgCode kosong, dan motivasi.

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni.
2. DILARANG kutip ganda (") di dalam nilai teks. Setiap backslash LaTeX digandakan.
3. svgCode HARUS string kosong.
${aturanGambar}
${ekstraAkhir}
${kelas1 ? "" : sd ? aturanMermaidSd() : aturanMermaidDanLatex()}

1. sapaan: SATU kalimat pendek. Sebut HANYA nama depan ${opsi.namaDepan}. TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat.
${instruksiPenjelasan(opsi.kelas, opsi.namaDepan, opsi.mapel, opsi.materi).split("3. global_best_view:")[0]}
${sketsa}
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
    .join("\n")}\nJangan menyalin uraian kurikulum. Tulis trik percepatan baru, bukan analogi konsep.`;
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
        ? "TEPAT 4"
        : "TEPAT 6";
  const { kepala } = formatKartuPercepatan(jenjang, opsi.kelas, jumlah);
  const kelas1 = kelasSatuSd(opsi.kelas);
  return `
Kamu adalah Tutor $IGIL. Tulis HANYA naskah global_best_view untuk ${opsi.namaDepan} (Kelas ${opsi.kelas}) mapel ${opsi.mapel} materi ${opsi.materi}.
Ini Mode Global: alat percepatan/hack, BUKAN mengulang Mode Kurikulum dengan analogi.
DILARANG menulis curriculum_view, sapaan, sketsaKartu, soal PG, atau esai.

${acuan}

ATURAN MUTLAK:
1. Respons HANYA 1 objek JSON murni { 'global_best_view': '...' }.
2. DILARANG kutip ganda (") di dalam nilai teks. Setiap backslash LaTeX digandakan.
${kelas1 ? "3. Format INFOGRAFIS. Isi kotak memuat Cara cepat. DILARANG mermaid." : "3. Paragraf mikro. Rumus wajib LaTeX. Diagram HANYA mermaid. DILARANG SVG."}
${kelas1 ? "" : aturanMermaidDanLatex()}

global_best_view: alat percepatan Mode Global. ${kepala}
${alurUraianGlobal(opsi.namaDepan, hitungan, opsi.kelas)}
${instruksiPaketLengkap(opsi.mapel, opsi.materi)}
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

function pastikanTeksGeminiUtuh(teks: string): void {
  if (!teksNaskahUtuh(teks, { min: 20 })) {
    throw new Error("Respons AI kosong, terpotong, atau mengandung galat.");
  }
}

async function pakaiNaskahTersimpan(
  opsi: { nama: string; kelas: string; mapel: string; materi: string },
  cadangan: ModulTutor,
): Promise<ModulTutor> {
  const dariDb = await ambilCacheMateri(opsi.kelas, opsi.mapel, opsi.materi);
  if (!dariDb) return cadangan;
  return bentukModulTutor(
    opsi.nama,
    {
      ...cadangan,
      ...dariDb,
      curriculum_view: dariDb.curriculum_view || cadangan.curriculum_view,
      global_best_view: dariDb.global_best_view || cadangan.global_best_view,
      pertanyaan: dariDb.pertanyaan || cadangan.pertanyaan,
    },
    { mapel: opsi.mapel, materi: opsi.materi },
  );
}

async function simpanBagianCache(
  opsi: {
    nama: string;
    kelas: string;
    mapel: string;
    materi: string;
    gambar?: Part[];
    signal?: AbortSignal;
  },
  isi: Partial<IsiCacheMateri>,
): Promise<void> {
  tolakJikaDibatalkan(opsi.signal);
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
  signal?: AbortSignal;
}): Promise<ModulTutor> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const gambar = opsi.gambar ?? [];
  const naskahResmi = naskahResmiJikaAda(opsi.kelas, opsi.mapel, opsi.materi);
  if (naskahResmi) {
    return bentukModulTutor(opsi.nama, naskahResmi, {
      mapel: opsi.mapel,
      materi: opsi.materi,
    });
  }
  const cacheAwal = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
  if (cachePunyaBagian(cacheAwal, opsi.bagian, opsi.kelas) && cacheAwal) {
    return bentukModulTutor(opsi.nama, cacheAwal, {
      mapel: opsi.mapel,
      materi: opsi.materi,
    });
  }

  if (opsi.bagian === "kurikulum") {
    const sd = jenjangGuru(opsi.kelas) === "SD";
    const partsKurikulum: Part[] = [
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
    ];
    const panggilCepat = () =>
      hasilkanJsonGeminiLengkap({
        parts: partsKurikulum,
        schema: SKEMA_KURIKULUM,
        maxOutputTokens: 4096,
        model: MODEL_GEMINI_RUTIN,
        thinking: false,
        timeoutCobaMs: 28_000,
        timeoutMs: 48_000,
        googleSearch: false,
        signal: opsi.signal,
      });
    let hasil;
    if (sd) {
      hasil = await panggilCepat();
    } else {
      try {
        hasil = await hasilkanJsonGeminiLengkap({
          parts: partsKurikulum,
          schema: SKEMA_KURIKULUM,
          maxOutputTokens: 8192,
          model: MODEL_GEMINI_MATERI,
          systemInstruction: instruksiPencarianKurikulum({
            materi: opsi.materi,
            mapel: opsi.mapel,
            kelas: opsi.kelas,
          }),
          thinking: false,
          timeoutCobaMs: 45_000,
          timeoutMs: 90_000,
          googleSearch: true,
          signal: opsi.signal,
        });
      } catch (error) {
        if (permintaanDibatalkan(error) || opsi.signal?.aborted) throw error;
        console.warn("[materi] kurikulum Pro lambat, fallback flash");
        hasil = await panggilCepat();
      }
    }
    pastikanTeksGeminiUtuh(hasil.teks);
    let dataJson = bersihkanDanParseJson(hasil.teks);
    let dataAman = bentukModulTutor(
      opsi.nama,
      {
        ...dataJson,
        referensiUrl: hasil.referensi.join("\n"),
      },
      { mapel: opsi.mapel, materi: opsi.materi },
    );
    if (!naskahMateriSiap(dataAman.curriculum_view)) {
      throw new Error("Naskah kurikulum tidak utuh.");
    }
    if (sd) {
      dataAman = {
        ...dataAman,
        curriculum_view: lengkapiVisualNaskahSd(
          dataAman.curriculum_view,
          opsi.kelas,
          { mapel: opsi.mapel, materi: opsi.materi },
        ),
      };
    }
    if (sd && !naskahKartuSdLayak(dataAman.curriculum_view)) {
      console.warn("[materi] kartu SD tanpa visual, generate ulang");
      hasil = await panggilCepat();
      pastikanTeksGeminiUtuh(hasil.teks);
      dataJson = bersihkanDanParseJson(hasil.teks);
      dataAman = bentukModulTutor(
        opsi.nama,
        {
          ...dataJson,
          referensiUrl: hasil.referensi.join("\n"),
        },
        { mapel: opsi.mapel, materi: opsi.materi },
      );
      dataAman = {
        ...dataAman,
        curriculum_view: lengkapiVisualNaskahSd(
          dataAman.curriculum_view,
          opsi.kelas,
          { mapel: opsi.mapel, materi: opsi.materi },
        ),
      };
      if (!naskahMateriSiap(dataAman.curriculum_view) || !naskahKartuSdLayak(dataAman.curriculum_view)) {
        throw new Error("Naskah kartu pembahasan SD tidak utuh.");
      }
    }
    await simpanBagianCache(opsi, {
      curriculum_view: dataAman.curriculum_view,
      sketsaKartu: dataAman.sketsaKartu,
      svgCode: "",
      motivasi: dataAman.motivasi,
      referensiUrl: dataAman.referensiUrl,
    });
    return pakaiNaskahTersimpan(opsi, dataAman);
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
      maxOutputTokens: jenjangGuru(opsi.kelas) === "SD" ? 4096 : 6144,
      model: MODEL_GEMINI_RUTIN,
      thinking: false,
      timeoutCobaMs: jenjangGuru(opsi.kelas) === "SD" ? 28_000 : 25_000,
      timeoutMs: jenjangGuru(opsi.kelas) === "SD" ? 48_000 : 60_000,
      googleSearch: false,
      signal: opsi.signal,
    });
    pastikanTeksGeminiUtuh(hasil.teks);
    const dataJson = bersihkanDanParseJson(hasil.teks);
    let dataAman = bentukModulTutor(opsi.nama, dataJson, {
      mapel: opsi.mapel,
      materi: opsi.materi,
    });
    if (jenjangGuru(opsi.kelas) === "SD") {
      dataAman = {
        ...dataAman,
        global_best_view: lengkapiVisualNaskahSd(
          dataAman.global_best_view,
          opsi.kelas,
          { mapel: opsi.mapel, materi: opsi.materi, global: true },
        ),
      };
    }
    if (!naskahGlobalSiap(dataAman.global_best_view)) {
      throw new Error("Naskah global tidak utuh.");
    }
    if (jenjangGuru(opsi.kelas) === "SD" && !naskahKartuSdLayak(dataAman.global_best_view)) {
      throw new Error("Naskah kartu pembahasan SD tidak utuh.");
    }
    await simpanBagianCache(opsi, {
      global_best_view: dataAman.global_best_view,
    });
    return pakaiNaskahTersimpan(opsi, dataAman);
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
    signal: opsi.signal,
  });
  pastikanTeksGeminiUtuh(hasil.teks);
  const dataJson = bersihkanDanParseJson(hasil.teks);
  const dataAman = bentukModulTutor(opsi.nama, dataJson, {
    mapel: opsi.mapel,
    materi: opsi.materi,
  });
  if (!naskahLatihanSiap(dataAman.pertanyaan)) {
    throw new Error("Bank soal latihan tidak utuh.");
  }
  await simpanBagianCache(opsi, {
    pertanyaan: dataAman.pertanyaan,
    kunciJawaban: dataAman.kunciJawaban.join(","),
    motivasi: dataAman.motivasi,
  });
  return pakaiNaskahTersimpan(opsi, dataAman);
}

export async function ambilAtauBuatBagianModul(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
  bagian: BagianNaskahModul;
  signal?: AbortSignal;
}): Promise<{ data: ModulTutor; dariCache: boolean; topicId: string }> {
  const gambar = opsi.gambar ?? [];
  const topicId = topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi);
  const naskahResmi = naskahResmiJikaAda(opsi.kelas, opsi.mapel, opsi.materi);
  let cache = naskahResmi
    ? await getModule(opsi.kelas, opsi.mapel, opsi.materi)
    : gambar.length === 0
      ? await getModule(opsi.kelas, opsi.mapel, opsi.materi)
      : null;
  if (naskahResmi) {
    const isi = cache ?? naskahResmi;
    console.info(`[materi] naskah resmi ${opsi.bagian} topic_id=${topicId}`);
    return {
      data: bentukModulTutor(opsi.nama, isi, {
        mapel: opsi.mapel,
        materi: opsi.materi,
      }),
      dariCache: true,
      topicId,
    };
  }
  if (cachePunyaBagian(cache, opsi.bagian, opsi.kelas) && cache) {
    console.info(`[materi] cache hit ${opsi.bagian} topic_id=${topicId}`);
    return {
      data: bentukModulTutor(opsi.nama, cache, {
        mapel: opsi.mapel,
        materi: opsi.materi,
      }),
      dariCache: true,
      topicId,
    };
  }

  if (await materiSedangTerkunci(opsi.kelas, opsi.mapel, opsi.materi)) {
    throw new GalatMateriTerkunci();
  }

  try {
    const data = await generateBagianModul({
      ...opsi,
      gambar,
      naskahKurikulum: cache?.curriculum_view,
      signal: opsi.signal,
    });
    if (gambar.length === 0) {
      const cacheSetelah = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
      if (cacheSetelah && cachePunyaBagian(cacheSetelah, opsi.bagian, opsi.kelas)) {
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelah, {
            mapel: opsi.mapel,
            materi: opsi.materi,
          }),
          dariCache: true,
          topicId,
        };
      }
    }
    console.info(`[materi] generate ${opsi.bagian} topic_id=${topicId}`);
    const dariDb = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
    const andalan = dariDb ?? cache;
    const gabung = andalan
      ? bentukModulTutor(
          opsi.nama,
          {
            ...data,
            ...andalan,
            curriculum_view: andalan.curriculum_view || data.curriculum_view,
            global_best_view: andalan.global_best_view || data.global_best_view,
            pertanyaan: andalan.pertanyaan || data.pertanyaan,
            kunciJawaban: andalan.kunciJawaban || data.kunciJawaban.join(","),
          },
          { mapel: opsi.mapel, materi: opsi.materi },
        )
      : data;
    return { data: gabung, dariCache: false, topicId };
  } catch (error) {
    if (gambar.length === 0) {
      const cacheSetelahGalat = await getModule(
        opsi.kelas,
        opsi.mapel,
        opsi.materi,
      );
      if (cachePunyaBagian(cacheSetelahGalat, opsi.bagian, opsi.kelas) && cacheSetelahGalat) {
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelahGalat, {
            mapel: opsi.mapel,
            materi: opsi.materi,
          }),
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
  return (
    (await ambilCacheMateri(kelas, mapel, materi)) ??
    naskahResmiJikaAda(kelas, mapel, materi)
  );
}

export async function generateModuleFirstTime(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  gambar?: Part[];
  signal?: AbortSignal;
}): Promise<ModulTutor> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const gambar = opsi.gambar ?? [];
  const sudahTersimpan = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
  if (
    sudahTersimpan &&
    (sudahTersimpan.curriculum_view.trim() ||
      sudahTersimpan.global_best_view.trim())
  ) {
    return bentukModulTutor(opsi.nama, sudahTersimpan, {
      mapel: opsi.mapel,
      materi: opsi.materi,
    });
  }
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
    signal: opsi.signal,
  });
  pastikanTeksGeminiUtuh(hasil.teks);
  if (hasil.referensi.length) {
    console.info(
      `[materi] grounding ${hasil.referensi.length} tautan topic=${opsi.mapel}/${opsi.materi}`,
    );
  }
  const dataJson = bersihkanDanParseJson(hasil.teks);
  const dataAman = bentukModulTutor(
    opsi.nama,
    {
      ...dataJson,
      referensiUrl: hasil.referensi.join("\n"),
    },
    { mapel: opsi.mapel, materi: opsi.materi },
  );
  if (
    !naskahMateriSiap(dataAman.curriculum_view) &&
    !naskahMateriSiap(dataAman.global_best_view)
  ) {
    throw new Error("Naskah modul tidak utuh.");
  }
  tolakJikaDibatalkan(opsi.signal);

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
  signal?: AbortSignal;
}): Promise<{ data: ModulTutor; dariCache: boolean; topicId: string }> {
  const gambar = opsi.gambar ?? [];
  const topicId = topicIdMateri(opsi.kelas, opsi.mapel, opsi.materi);
  const naskahResmi = naskahResmiJikaAda(opsi.kelas, opsi.mapel, opsi.materi);
  if (gambar.length === 0 || naskahResmi) {
    const cache = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
    if (cache) {
      console.info(`[materi] cache hit topic_id=${topicId}`);
      return {
        data: bentukModulTutor(opsi.nama, cache, {
        mapel: opsi.mapel,
        materi: opsi.materi,
      }),
        dariCache: true,
        topicId,
      };
    }
  }

  if (await materiSedangTerkunci(opsi.kelas, opsi.mapel, opsi.materi)) {
    throw new GalatMateriTerkunci();
  }

  try {
    const data = await generateModuleFirstTime({ ...opsi, gambar });
    if (gambar.length === 0) {
      const cacheSetelah = await getModule(opsi.kelas, opsi.mapel, opsi.materi);
      if (cacheSetelah) {
        console.info(`[materi] pakai cache pertama topic_id=${topicId}`);
        return {
          data: bentukModulTutor(opsi.nama, cacheSetelah, {
            mapel: opsi.mapel,
            materi: opsi.materi,
          }),
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
          data: bentukModulTutor(opsi.nama, cacheSetelahGalat, {
            mapel: opsi.mapel,
            materi: opsi.materi,
          }),
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
