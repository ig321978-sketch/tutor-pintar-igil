// Penulis berkas naskah Matematika Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita, Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b4.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b4.ts dan data-k2b4.ts) lalu menulis naskah/mtk-2-bab4-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b4.ts";
import * as D from "../src/components/modul/data-k2b4.ts";

const ronde = {
  A: [
    D.RONDE_TARUH_A.map((r) => `${D.NAMA_BENDA[r.acuan]} (${r.tugas.map((x) => `${D.NAMA_BENDA[x.benda]} ${x.kata}`).join(", ")})`).join("; "),
    D.RONDE_PINDAH_A.map((r) => `${D.NAMA_BENDA[r.benda]} dan ${D.NAMA_BENDA[r.acuan]}: ${r.langkah.join(", ")}`).join("; "),
    D.RONDE_KAMAR_A.map((r, i) => `ronde ${i + 1}: ${r.map((s) => `${D.NAMA_BENDA[s.jawab]} ${s.kata} ${D.NAMA_BENDA[s.acuan]}`).join(", ")}`).join("; "),
    D.STIKER_TAMAN_A.map((s) => s.kalimat.replace(/\.$/, "")).join("; "),
    D.RONDE_PETA_A.map((r, i) => `ronde ${i + 1}: lingkaran di baris ${r.acuan.b + 1} kolom ${r.acuan.k + 1}, ${r.soal.map((s) => s.kata).join(", ")}`).join("; "),
    D.RONDE_DIAGRAM_A.map((r, i) => `ronde ${i + 1}: ${r.map((d) => d.jawab).join(", ")}`).join("; "),
    D.RONDE_SUSUN_A.map((r, i) => `ronde ${i + 1}: ${r.syarat.map((s) => `${D.NAMA_BANGUN[s.a]} ${s.kata} ${D.NAMA_BANGUN[s.b]}`).join(", ")}`).join("; "),
    D.RONDE_KALIMAT_A.map((r, i) => `ronde ${i + 1}: ${r.length} kalimat`).join("; "),
    D.RONDE_TEBAK_A.map((s, i) => `soal ${i + 1}: ${s.petunjuk.length} petunjuk, jawaban ${s.jawab}`).join("; "),
    D.PETA_KONSEP_A.map((p) => p.pusat).join("; "),
  ],
  B: [
    D.RONDE_MANIK_B.map((r) => r.satuan.join("-")).join("; "),
    D.RONDE_BARISAN_B.map((r) => `${r.atribut}: ${r.pola.slice(0, 3).join(", ")}, ...`).join("; "),
    D.RONDE_GERAK_B.map((r) => r.satuan.map((t) => D.NAMA_POSE[t]).join("-")).join("; "),
    D.RONDE_TEPUK_B.map((r) => r.satuan.map((t) => D.NAMA_BUNYI[t]).join("-")).join("; "),
    D.RONDE_POLABUKAN_B.map((r, i) => `ronde ${i + 1}: ${r.filter((b) => b.pola).length} pola dan ${r.filter((b) => !b.pola).length} bukan pola`).join("; "),
    D.RONDE_LANJUT_B.map((r) => r.satuan.map((t) => D.NAMA_BENTUK_POLA[t]).join("-")).join("; "),
    D.RONDE_WARNAI_B.map((r) => (r.bebas ? "bebas: buat pola sendiri" : r.satuan.join("-"))).join("; "),
    D.RONDE_ISI_B.map((r) => r.satuan.join(" ")).join("; "),
    D.RONDE_CARI_B.map((r) => r.satuan.join(" ")).join("; "),
    D.PETA_KONSEP_B.map((p) => p.pusat).join("; "),
  ],
};

const berkas = { A: "mtk-2-bab4-sub-a-posisi-benda.md", B: "mtk-2-bab4-sub-b-pola.md" };

const metodeLuar = {
  A: [
    "**Benda acuan (frame of reference)**: posisi selalu dinyatakan terhadap benda lain. Kalimat posisi dibangun dari tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Dasar permainan Taruh di Tempatnya.",
    "**Pasangan arah berlawanan**: atas dengan bawah, depan dengan belakang, kanan dengan kiri. Dari satu posisi anak langsung menurunkan posisi lawannya (inversi relasi). Dasar permainan Lengkapi Kalimat Posisi.",
    "**Sudut pandang (perspektif) pembaca**: kanan dan kiri pada gambar mengikuti pembaca, sedangkan anak yang membelakangi kita menghadap arah yang sama dengan kita. Tidak semua kesalahan kanan-kiri berasal dari hafalan, tetapi dari lupa menentukan siapa yang melihat.",
    "**Peta kotak (grid) dan baris-kolom**: posisi atas, bawah, kiri, kanan dibaca sebagai pergeseran satu baris atau satu kolom. Dasar permainan Peta Kotak, Susun Bangun di Petak, dan Tebak Aku Apa?, yang kuncinya dihitung dari baris dan kolom.",
    "**Koordinat benda di gambar**: relasi atas, bawah, kiri, kanan, depan, dan belakang dihitung dari kotak pembatas benda, jarak bersandar, dan lapisan. Gambar kamar dan kunci Temukan di Kamar sama karena berasal dari data yang sama.",
  ],
  B: [
    "**Satuan pola (unit of repeat)**: kelompok terkecil yang berulang. Mesin mencari satuan terpendek lalu memeriksa seluruh barisan. Dasar permainan Cari Satuan Pola dan semua permainan lanjutkan pola.",
    "**Kode huruf A B**: merah biru merah biru ditulis A B A B, dan hati hati segitiga ditulis A A B. Menulis pola sebagai huruf memisahkan struktur dari isi, jembatan menuju aljabar kelas tinggi.",
    "**Pola harus berulang dan teratur (dua unsur berbeda)**: barisan yang semuanya sama atau yang kelompoknya tidak berulang bukan pola. Dasar permainan Pola atau Bukan?",
    "**Pola dengan jeda (rhythm)**: tepuk keras, pelan, dan diam. Bunyi dibuat di perangkat tanpa berkas. Pola suara dapat didengar, bukan hanya dilihat.",
    "**Pola dengan tubuh (movement pattern)**: membungkuk, berdiri, tangan naik. Anak mengetuk gerakan berikutnya lalu menirukannya, menggabungkan berpikir dan bergerak.",
    "**Membuat pola sendiri (creating patterns)**: ronde bebas pada Warnai Pola menerima pola mana pun yang berulang teratur dengan paling sedikit dua warna.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 4: Posisi Benda dan Pola di Sekitar Kita, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b4.ts\` dan \`src/components/modul/data-k2b4.ts\`, oleh \`scripts/buat-naskah-md-k2b4.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 101–124) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab4\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab4.json` (dibangkitkan `src/content-master/buat-k2-bab4.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab4` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B4_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
  L.push("| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 4. |");
  L.push("");
  L.push("## 2. Capaian dan tujuan pembelajaran");
  L.push("");
  L.push(`**Capaian Pembelajaran (CP).** ${s.silabus.cp}`);
  L.push("");
  L.push(`**Rujukan.** ${s.silabus.referensi}`);
  L.push("");
  L.push(`**Sasaran.** ${s.targetDescription}`);
  L.push("");
  L.push(`**Suara Silabus.** ${s.silabus.teksSuara}`);
  L.push("");
  L.push("## 3. Peta enam tahap SMICPA dan bobotnya");
  L.push("");
  L.push("| Tahap | Isi | Banyak butir |");
  L.push("|---|---|---|");
  L.push(`| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | ${s.videos.length} video, ${jumlahAdegan} adegan, ${jumlahKetukan} ketukan |`);
  L.push(`| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | ${s.mindMaps.length} langkah |`);
  L.push(`| I. Infografis | Poster rangkuman, suara di tiap panel | ${s.infografis.length} panel |`);
  L.push(`| C. Concrete | Benda nyata yang diseret, ditemukan, dirangkai, disusun, dan ditirukan | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: peta kotak, lingkaran dan persegi, bangun polos, dan barisan bangun | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata, huruf, dan petunjuk tertulis: kalimat, tebakan, kode huruf, peta konsep | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).");
  L.push("");
  L.push("## 4. Tahap 1: Story (video animasi, menggantikan slide)");
  L.push("");
  L.push("Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.");
  L.push("");
  s.videos.forEach((v, i) => {
    L.push(`### Video ${i + 1}: ${v.judul} (${v.subjudul})`);
    L.push("");
    v.adegan.forEach((a, j) => {
      L.push(`**Adegan ${j + 1}. ${a.judul}** (\`${a.id}\`)`);
      L.push("");
      a.ketukan.forEach((kt, m) => L.push(`${m + 1}. ${kt}  \n   _Papan layar:_ ${a.papan[m]}`));
      L.push("");
    });
  });
  L.push("## 5. Tahap 2: Mind-Map (peta pikiran)");
  L.push("");
  s.mindMaps.forEach((m) => {
    L.push(`**${m.stepTitle}** ${m.icon}  `);
    L.push(`${m.stepDesc}`);
    L.push("");
    L.push(`_Alur:_ ${m.flowFrom} → ${m.flowTo}`);
    L.push("");
  });
  L.push("## 6. Tahap 3: Infografis");
  L.push("");
  s.infografis.forEach((p, i) => {
    L.push(`**Panel ${i + 1}. ${p.judul}** ${p.emoji} (${p.countNum}, ${p.countWord})`);
    L.push("");
    L.push(`> ${p.suara}`);
    L.push("");
  });
  L.push("## 7. Tahap 4, 5, dan 6: sepuluh permainan");
  L.push("");
  L.push("| No | Tahap | Permainan | Jenis | Ronde |");
  L.push("|---|---|---|---|---|");
  s.games.forEach((g, i) => L.push(`| ${i + 1} | ${g.stage} | ${g.title} | \`${g.gameType}\` | ${ronde[k][i]} |`));
  L.push("");
  s.games.forEach((g, i) => {
    L.push(`### Permainan ${i + 1}. ${g.title} (${g.stage})`);
    L.push("");
    L.push(`- **Rujukan buku.** ${g.bookReference}`);
    L.push(`- **Tujuan.** ${g.objective}`);
    L.push(`- **Cara main.** ${g.mechanicDescription}`);
    L.push(`- **Ronde.** ${ronde[k][i]}`);
    L.push(`- **Panduan suara.** ${g.voiceGuide}`);
    L.push("");
  });
  L.push("## 8. Poin Penting dan Catatanku");
  L.push("");
  s.poin.forEach((p) => L.push(`- ${p.ikon} **${p.nama}**: ${p.isi}. _Suara:_ ${p.suara}`));
  L.push("");
  L.push(`**Suara Poin Penting.** ${s.poinSuara}`);
  L.push("");
  L.push(`**Cara menyebutkan.** ${s.cara.potongan.map((x) => x.teks).join(" ")}. _Suara:_ ${s.cara.suara}`);
  L.push("");
  L.push(`**Ayo Mencoba di rumah.** ${s.rumah}`);
  L.push("");
  L.push("**Refleksi (Catatanku).**");
  L.push("");
  s.refleksi.forEach((r) => L.push(`- ${r}`));
  L.push("");
  L.push("## 9. Metode dari luar buku yang diadopsi");
  L.push("");
  metodeLuar[k].forEach((m) => L.push(`- ${m}`));
  L.push("");
  L.push("## 10. Batas yang diketahui");
  L.push("");
  L.push("- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu \"sedang disiapkan\".");
  L.push("- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).");
  L.push("- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.");
  L.push("- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.");
  if (k === "A") L.push("- Kanan dan kiri pada gambar mengikuti pembaca. Anak yang membelakangi kita menghadap arah yang sama dengan kita. Permainan tidak memakai gambar anak yang menghadap kita, karena itu menuntut membalik arah dan melampaui tingkat kelas 2.");
  if (k === "B") L.push("- Satuan pola diperiksa dari bagian barisan yang tampil. Tiap ronde menampilkan paling sedikit dua satuan penuh supaya satuan tidak ambigu. Bunyi tepuk memakai WebAudio perangkat, dan pada perangkat yang membisukannya anak tetap dapat bermain lewat gambar.");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B4) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 4 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b4.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Gambar dibangkitkan dari data.** Benda dan bangun digambar dari koordinat di `data-k2b4.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B4) {
  V.push(`### Sub-Bab ${s.id}: ${s.fullTitle.split(": ")[1]}`);
  V.push("");
  s.videos.forEach((v, i) => {
    V.push(`${i + 1}. **${v.judul}** (${v.subjudul}): ${v.adegan.map((a) => `${a.judul} (${a.ketukan.length})`).join("; ")}.`);
  });
  V.push("");
}
V.push("## Berkas");
V.push("");
V.push("- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).");
V.push("- Gambar bersama: `src/components/modul/video-k2b4-umum.tsx` (orang dengan caping, benda dari perpustakaan benda, padi, mangkuk nasi, baris unsur pola, panah, tanda benar-salah).");
V.push("- Adegan: `video-k2b4a.tsx`, `video-k2b4b.tsx`, `video-k2b4c.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab4-A`, `-B`, `-C`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b4.mjs` dan `scripts/uji-statis-k2b4.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab4-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab4-video-cerita.md");
