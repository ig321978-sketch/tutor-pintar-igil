// Penulis berkas naskah Matematika (Materi saja) dari satu sumber naskah. Jalankan: node --no-warnings scripts/buat-naskah-md.mjs k3b1
// Membaca src/components/modul/naskah-<kode>.ts lalu menulis naskah/mtk-<kelas>-bab<N>-*.md. Tanpa jaringan dan tanpa API.
// Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat. Tambahkan satu entri di KONFIG untuk tiap bab baru.
import fs from "node:fs";

/** Tiap bab: kelas, nomor bab, judul bab, sumber buku, dan nama berkas tiap sub-bab. */
const KONFIG = {
  k3b1: {
    kelas: 3,
    bab: 1,
    judul: "Bilangan Cacah sampai 1.000",
    buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–24) dan Buku Panduan Guru Bab 1",
    berkas: { A: "sub-a-bilangan-dan-lambang", B: "sub-b-nilai-tempat" },
    metodeLuar: {
      A: [
        "**Balok Dienes (blok satuan, batang puluhan, lempeng ratusan)**: bilangan dilihat sebagai benda yang bisa dihitung dan ditukar sepuluh-ke-satu. Dasar permainan Rakit Kemasan, Hitung Blok, dan Isi Tabel Blok.",
        "**Kemasan nyata (benda, bungkus, dus)**: satu bungkus berisi sepuluh benda dan satu dus berisi sepuluh bungkus. Penukaran otomatis saat siswa menekan tambah membuat aturan sepuluh-ke-satu terasa langsung.",
        "**Papan nilai tempat tiga kolom berwarna**: ratusan hijau, puluhan biru, satuan merah seperti di buku. Dasar permainan Papan dari Kumpulan, Papan dari Blok, dan Tulis Lambang di Papan.",
        "**Kartu angka (Montessori)**: siswa menyusun bilangan dengan tiga kartu pada tiga tempat. Dasar permainan Susun Tiga Kartu dan tantangan Ayo Berpikir (900 bilangan bila angka boleh berulang, 648 bila tidak).",
        "**Garis bilangan ratusan**: bilangan ditemukan pada garis berloncatan seratus atau sepuluh sebagai persiapan membandingkan dan mengurutkan.",
        "**Miskonsepsi angka nol**: Buku Panduan Guru menyebut kesalahan membaca nol di tempat ratusan atau puluhan. Pengecoh sengaja memuat 160 dan 106, 405 dan 450, 703 dan 730.",
      ],
      B: [
        "**Tiga kaleng dan kartu angka**: aktivitas buku diwujudkan dengan benda nyata (kaleng) dan kartu, lalu dipindah ke layar sebagai permainan Tiga Kaleng.",
        "**Nilai tempat dengan kemasan**: nilai sebuah angka dihitung dari banyak benda pada kemasan tempat angka itu berada (3 dus = 300 benda).",
        "**Menyusun dan mengurai (expanded form)**: dua arah yang saling membalik, 2 ratusan + 5 puluhan + 1 satuan = 251 dan 251 = 200 + 50 + 1.",
        "**Angka dan nilai tidak sama**: miskonsepsi dari Buku Panduan Guru (mengisi tabel dengan 900, 80, 7). Permainan Isi Tabel dan Benar atau Salah membahasnya langsung.",
        "**Garis bilangan nilai**: nilai sebuah angka diketuk pada garis 0 sampai 1.000 (langkah 100), 0 sampai 100 (langkah 10), atau 0 sampai 10.",
        "**Detektif nilai tempat**: dua petunjuk tentang nilai angka menyisakan satu bilangan, setiap soal diperiksa uji otomatis.",
      ],
    },
  },
};

const kode = process.argv[2];
if (!kode || !KONFIG[kode]) {
  console.error(`Pakai: node --no-warnings scripts/buat-naskah-md.mjs <${Object.keys(KONFIG).join("|")}>`);
  process.exit(1);
}
const cfg = KONFIG[kode];
const KODE = kode.toUpperCase();
const N = await import(`../src/components/modul/naskah-${kode}.ts`);
const meta = N[`${KODE}_META`];
const subBab = N[`SUB_BAB_${KODE}`];
const awalan = `mtk-${cfg.kelas}-bab${cfg.bab}`;

function tulisSub(s) {
  const L = [];
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  L.push(`# Naskah Matematika Kelas ${cfg.kelas} SD, Bab ${cfg.bab}: ${cfg.judul}, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-${kode}.ts\` dan \`src/components/modul/data-${kode}.ts\`, oleh \`scripts/buat-naskah-md.mjs\`. Isi mengikuti ${cfg.buku}, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push(`- Kode bab: \`${meta.chapterId}\`, ${meta.phaseCode}, kelas ${meta.grade}.`);
  L.push(`- Judul: ${meta.title}. ${s.fullTitle}.`);
  L.push(`- Suara Guru: Web Speech API perangkat saja, laju ${meta.suaraLaju} dan nada ${meta.suaraNada}. Tanpa ElevenLabs.`);
  L.push(`- Isi: ${s.videos.length} video cerita (${jumlahAdegan} adegan), ${s.mindMaps.length} langkah peta pikiran, ${s.infografis.length} panel infografis, ${s.games.length} permainan (10 Concrete, 10 Picture, 10 Abstract), ${s.poin.length} poin penting.`);
  L.push("");
  L.push("## 2. Tujuan belajar");
  L.push("");
  L.push(s.targetDescription);
  L.push("");
  L.push(`- Capaian Pembelajaran: ${s.silabus.cp}`);
  L.push(`- Acuan: ${s.silabus.referensi}`);
  L.push("");
  L.push("## 3. Metode dari luar buku");
  L.push("");
  for (const m of cfg.metodeLuar[s.id]) L.push(`- ${m}`);
  L.push("");
  L.push("## 4. Tahap 1: Story (video cerita animasi SVG)");
  L.push("");
  L.push("Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.");
  L.push("");
  for (const v of s.videos) {
    L.push(`### ${v.id}. ${v.judul} (${v.subjudul})`);
    L.push("");
    for (const a of v.adegan) {
      L.push(`**${a.id}. ${a.judul}**`);
      L.push("");
      a.ketukan.forEach((k, i) => L.push(`${i + 1}. ${k} *(papan: ${a.papan[i]})*`));
      L.push("");
    }
  }
  L.push("## 5. Tahap 2: Mind map (peta pikiran)");
  L.push("");
  for (const m of s.mindMaps) {
    L.push(`**${m.stepTitle}** ${m.icon} (${m.flowFrom} → ${m.flowTo})`);
    L.push("");
    L.push(m.stepDesc);
    L.push("");
  }
  L.push("## 6. Tahap 3: Infografis");
  L.push("");
  s.infografis.forEach((p, i) => {
    L.push(`${i + 1}. **${p.judul}** ${p.emoji}: ${p.suara}`);
  });
  L.push("");
  const tahap = [["Concrete", "7. Tahap 4: Concrete (benda nyata)"], ["Picture", "8. Tahap 5: Picture (diagram)"], ["Abstract", "9. Tahap 6: Abstract (kata dan angka)"]];
  let nomor = 1;
  for (const [st, judul] of tahap) {
    L.push(`## ${judul}`);
    L.push("");
    L.push("| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |");
    L.push("|---|---|---|---|---|---|");
    for (const g of s.games.filter((x) => x.stage === st)) {
      L.push(`| ${nomor} | ${g.title} | \`${g.gameType}\` | ${g.bookReference} | ${g.objective} | ${g.mechanicDescription} |`);
      nomor += 1;
    }
    L.push("");
  }
  L.push("## 10. Poin penting, cara, kegiatan di rumah, dan refleksi");
  L.push("");
  for (const p of s.poin) L.push(`- ${p.ikon} **${p.nama}**: ${p.isi}. *Suara:* ${p.suara}`);
  L.push("");
  L.push(`Ringkasan suara: ${s.poinSuara}`);
  L.push("");
  L.push(`Cara menyebutkan: ${s.cara.suara} (${s.cara.potongan.map((x) => x.teks).join(", ")})`);
  L.push("");
  L.push(`Ayo Mencoba di rumah: ${s.rumah.replace(/^Ayo Mencoba di rumah:\s*/, "")}`);
  L.push("");
  L.push("Refleksi:");
  for (const r of s.refleksi) L.push(`- ${r}`);
  L.push("");
  return L.join("\n");
}

function tulisVideo() {
  const L = [];
  L.push(`# Video cerita Matematika Kelas ${cfg.kelas} SD, Bab ${cfg.bab}: ${cfg.judul}`);
  L.push("");
  L.push(`Daftar semua video cerita animasi HTML/SVG gratis (tanpa berkas video, tanpa API). Ditulis dari \`src/components/modul/naskah-${kode}.ts\` oleh \`scripts/buat-naskah-md.mjs\`. Tiap video diputar satu per satu saat siswa mengetuk Putar.`);
  L.push("");
  for (const s of subBab) {
    L.push(`## ${s.fullTitle}`);
    L.push("");
    L.push("| Video | Judul | Subjudul | Adegan |");
    L.push("|---|---|---|---|");
    for (const v of s.videos) L.push(`| ${v.id} | ${v.judul} | ${v.subjudul} | ${v.adegan.map((a) => a.judul).join("; ")} |`);
    L.push("");
  }
  return L.join("\n");
}

fs.mkdirSync("naskah", { recursive: true });
for (const s of subBab) {
  const nama = `naskah/${awalan}-${cfg.berkas[s.id]}.md`;
  fs.writeFileSync(nama, tulisSub(s));
  console.log(`tulis ${nama}`);
}
const namaVideo = `naskah/${awalan}-video-cerita.md`;
fs.writeFileSync(namaVideo, tulisVideo());
console.log(`tulis ${namaVideo}`);
