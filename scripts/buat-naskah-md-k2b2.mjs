// Penulis berkas naskah Matematika Kelas 2 Bab 2 (Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b2.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b2.ts dan data-k2b2.ts) lalu menulis naskah/mtk-2-bab2-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b2.ts";
import * as D from "../src/components/modul/data-k2b2.ts";

const ronde = {
  A: [
    D.RONDE_PETIK_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_GABUNG_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_PINDAH_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_NERACA_A.map((r) => `${r.x} + ${r.y} = ${r.z} + ${D.bagianHilang(r)}`).join("; "),
    D.RONDE_LOMPAT_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_SUSUN_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_BAGAN_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_CARA_A.map((r) => `${r.a} + ${r.b}`).join("; "),
    D.RONDE_KEMBAR_A.map((rr) => rr.map(([p, q]) => `${p.a}+${p.b} dan ${q.a}+${q.b}`).join(", ")).map((s, i) => `ronde ${i + 1}: ${s}`).join("; "),
    `ronde 1: ${D.TULIS_A_RONDE1.a} + ${D.TULIS_A_RONDE1.b}; ronde 2: pilih ${D.TULIS_A_PILIHAN.map((r) => `${r.a} + ${r.b}`).join(", ")}`,
  ],
  B: [
    D.RONDE_BERI_B.map((r) => `${r.a} − ${r.b}`).join("; "),
    D.RONDE_SELISIH_B.map((r) => `${r.besar} dan ${r.kecil}`).join("; "),
    D.RONDE_URAI_B.map((r) => `${r.a} − ${r.b}${D.perluUrai(r.a, r.b) ? " (urai)" : " (tanpa urai)"}`).join("; "),
    D.RONDE_TAMBAHPAS_B.map((r) => `${r.kecil} ke ${r.besar}`).join("; "),
    D.RONDE_MUNDUR_B.map((r) => `${r.a} − ${r.b}`).join("; "),
    D.RONDE_SUSUN_B.map((r) => `${r.a} − ${r.b}${D.perluUrai(r.a, r.b) ? " (urai)" : ""}`).join("; "),
    D.RONDE_BAGAN_B.map((r) => `${r.a} − ${r.b}`).join("; "),
    D.RONDE_SORT_B.map((rr, i) => `ronde ${i + 1}: ${rr.map((r) => `${r.a} − ${r.b}`).join(", ")}`).join("; "),
    D.RONDE_KELUARGA_B.map((t) => t.join(", ")).join("; "),
    D.RONDE_DETEKTIF_B.map((s, i) => `ronde ${i + 1}: jawaban ${s.jawab}`).join("; "),
  ],
  C: [
    D.RONDE_BURUNG_C.map((r) => `hijau ${r.h}, merah ${r.m}`).join("; "),
    D.RONDE_DONAT_C.map((r) => `${r.acuan} ${r.a}, ${r.pembanding} ${r.d} ${r.jenis === "lebih" ? "lebihnya" : "kurangnya"} (${D.bilanganPembanding(r)}; jumlah ${D.jumlahBanding(r)})`).join("; "),
    D.RONDE_JERUK_C.map((r) => `diberi ${r.diberi}, sisa ${r.sisa} (semula ${D.jerukSemula(r)})`).join("; "),
    D.RONDE_BONEKA_C.map((t) => t.join(", ")).join("; "),
    D.RONDE_MODEL_C.map((r) => `${r.acuan} ${r.a}, ${r.pembanding} ${r.d} ${r.jenis === "lebih" ? "lebihnya" : "kurangnya"} (${D.bilanganPembanding(r)}; jumlah ${D.jumlahBanding(r)})`).join("; "),
    "donat Tika dan Malosi; jeruk Halim; boneka tiga sahabat",
    D.RONDE_PANAH_C.map((s) => `${s.mulai} ${s.arah} ${s.langkah} = ${D.hasilPanah(s)}`).join("; "),
    D.RONDE_KATA_C.map((rr, i) => `ronde ${i + 1}: ${rr.map((k) => `${k.sorot} (${k.tanda})`).join(", ")}`).join("; "),
    D.RONDE_LAPORAN_C.map((s) => `hasil ${s.hasil}`).join("; "),
    D.AWAL_CERITA.map((p, i) => `ronde ${i + 1}: ${p.jenis}`).join("; "),
  ],
};

const berkas = { A: "mtk-2-bab2-sub-a-berbagai-cara-penjumlahan.md", B: "mtk-2-bab2-sub-b-berbagai-cara-pengurangan.md", C: "mtk-2-bab2-sub-c-soal-cerita.md" };

const metodeLuar = {
  A: [
    "**Counting on (menghitung maju dari bilangan yang lebih besar)**, dipakai di banyak kelas awal di Inggris dan Australia. Muncul di mind-map langkah 2 dan 7.",
    "**Number bond (pasangan bilangan)** dari Singapore Math. Dasar permainan Bagan Pasangan dan cara 3.",
    "**Balok Dienes** (Zoltan Dienes) dan **manik emas Montessori** untuk pertukaran sepuluh satuan menjadi satu puluhan. Dasar Gabung Balok dan Mesin Pindah Sepuluh.",
    "**Sahabat sepuluh dan metode buah ceri (sakurambo)** dari Jepang: pecah bilangan kedua supaya bilangan pertama menjadi sepuluh, lalu tambahkan sisanya.",
    "**Neraca dan kesetaraan** (equality sense): tanda sama dengan sebagai keseimbangan, bukan sebagai perintah mengerjakan.",
  ],
  B: [
    "**Pemasangan satu-satu untuk selisih** (model perbandingan pengurangan) dari Singapore Math.",
    "**Counting up / tambah sampai pas**, cara pedagang memberi kembalian: hitung maju dari bilangan kecil sampai bilangan besar. Dasar permainan Tambah Sampai Pas.",
    "**Keluarga fakta (fact family)**: dua kalimat tambah dan dua kalimat kurang dari tiga bilangan yang sama, untuk memeriksa pengurangan dengan penjumlahan.",
    "**Regrouping (mengurai) dengan balok Dienes** sebagai pengganti kata meminjam yang sering membingungkan.",
    "**Jalur bilangan kosong (empty number line)** dari pendidikan matematika realistik Belanda.",
  ],
  C: [
    "**Model batang (bar model)** dari Singapore Math untuk menggambar soal cerita sebelum menghitung.",
    "**CUBES** (Circle, Underline, Box, Evaluate, Solve) dari Amerika Serikat, disederhanakan menjadi Baca, Tandai, Gambar, Hitung, Periksa.",
    "**Operasi balik** untuk mencari bilangan awal (… − 4 = 12 menjadi 12 + 4).",
    "**Mencari sahabat sepuluh saat menjumlahkan tiga bilangan** (strategi make ten) dan **menggabungkan dua kelompok dulu**.",
    "**Posing problems**: siswa membuat soal sendiri (Ayo Mencoba dan Ayo Berkarya), dipakai di Finlandia dan Jepang sebagai penguat penalaran.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 2: Penjumlahan dan Pengurangan, ${s.fullTitle.replace(": ", ": ")}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b2.ts\` dan \`src/components/modul/data-k2b2.ts\`, oleh \`scripts/buat-naskah-md-k2b2.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 37–64) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab2\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab2.json` (dibangkitkan `src/content-master/buat-k2-bab2.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab2` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B2_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
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
  L.push(`| C. Concrete | Benda nyata yang diketuk, diseret, dan dihitung | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: jalur bilangan, tabel nilai tempat, bagan pasangan, model batang | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan angka: kartu, isian, kanvas guratan | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda. Aturan susun ke bawah: angka soal biru besar, angka jawaban hijau besar, catatan pindah dan urai merah kecil yang menempel pada angka.");
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
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B2) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 2 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b2.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B2) {
  V.push(`### Sub-Bab ${s.id}: ${s.fullTitle.split(": ")[1]}`);
  V.push("");
  s.videos.forEach((v, i) => {
    V.push(`${i + 1}. **${v.judul}** (${v.subjudul}): ${v.adegan.map((a) => `${a.judul} (${a.ketukan.length})`).join("; ")}.`);
  });
  V.push("");
}
V.push("## Berkas");
V.push("");
V.push("- Mesin: `src/components/modul/video-cerita.tsx` (mendapat `mulaiLangsung` dan `onSelesai`, bawaan tidak berubah untuk modul lain).");
V.push("- Daftar dan gambar bersama: `src/components/modul/video-k2b2-umum.tsx` (jambu air, burung, donat, jeruk, boneka, jalur kotak, tabel susun, bagan pasangan).");
V.push("- Adegan: `video-k2b2a.tsx`, `video-k2b2b.tsx`, `video-k2b2c.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab2-A`, `-B`, `-C`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b2.mjs` dan `scripts/uji-statis-k2b2.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab2-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab2-video-cerita.md");
