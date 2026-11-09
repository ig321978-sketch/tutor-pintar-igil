// Penulis berkas naskah Matematika Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu, Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b6.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b6.ts dan data-k2b6.ts) lalu menulis naskah/mtk-2-bab6-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b6.ts";
import * as D from "../src/components/modul/data-k2b6.ts";

const nm = (id) => D.NAMA[id];
const sat = (id) => D.NAMA_SATUAN[id];
const pasang = (r) => r.map(([a, b]) => `${nm(a)} dan ${nm(b)}`).join(", ");
const kegiatan = (ids) => ids.map((i) => D.KEGIATAN[i].nama).join(", ");
const per = (arr, f) => arr.map((r, i) => `ronde ${i + 1}: ${f(r, i)}`).join("; ");

const ronde = {
  A: [
    per(D.RONDE_TANGAN_A, (r) => pasang(r)),
    per(D.RONDE_JUNGKAT_A, (r) => pasang([r])),
    per(D.RONDE_GANTUNGAN_A, (r) => pasang(r)),
    per(D.RONDE_URUT_A, (r) => `${r.ids.map(nm).join(", ")} (dari paling ${r.dari})`),
    per(D.RONDE_SORTIR_A, (r) => `acuan ${nm(r.acuan)}; ${r.ids.map(nm).join(", ")}`),
    per(D.RONDE_TIMBANG_A, (r) => `${nm(r.benda)} dengan ${sat(r.satuan)} (${D.jumlahSatuan(r.benda, r.satuan)})`),
    per(D.RONDE_HITUNG_A, (r) => r.map((t) => `${nm(t.benda)} = ${D.jumlahSatuan(t.benda, t.satuan)} ${sat(t.satuan)}`).join(", ")),
    per(D.RONDE_KETUK_A, (r) => `${r.map(nm).join(", ")}; paling berat ${nm(D.palingBerat(r))}, paling ringan ${nm(D.palingRingan(r))}`),
    per(D.RONDE_JODOH_A, (r) => r.map((t) => `${nm(t.benda)} = ${D.jumlahSatuan(t.benda, t.satuan)} ${sat(t.satuan)}`).join(", ")),
    per(D.RONDE_RAK_A, (r) => `${r.map(nm).join(", ")} (dasar: ${nm(D.palingBerat(r))})`),
    per(D.RONDE_BACA_A, (r) => r.map(([a, b], i) => `${D.HURUF_PASANG[i].join(" dan ")}: ${D.relHuruf(a, b)}`).join(", ")),
    per(D.RONDE_URUTNERACA_A, (r) => `${D.urutHuruf(r.bobot, r.dari).join(" ")} (dari paling ${r.dari})`),
    per(D.RONDE_BATANG_A, (r) => r.map((x) => `${x.id}=${x.n}`).join(", ")),
    per(D.RONDE_TITIK_A, (r) => r.map((n) => `${n} titik`).join(", ")),
    per(D.RONDE_GORESAN_A, (r) => r.map((n) => `${n} goresan`).join(", ")),
    per(D.RONDE_TABEL_PA, (r) => `${r.judul}: ${r.baris.map((b) => `${b.label}=${b.jawab}`).join(", ")}`),
    per(D.RONDE_PASANGNERACA_A, (r) => r.map(([a, b, x, y]) => D.kalimatBalok(a, D.relHuruf(x, y), b).replace(/\.$/, "")).join("; ")),
    per(D.RONDE_SORTIRNERACA_A, (r) => `${r.length} diagram`),
    per(D.RONDE_GARISANGKA_A, (r) => r.join(", ")),
    per(D.RONDE_BAGAN_A, (n) => `${n} titik`),
    per(D.RONDE_KALIMAT_QA, (r) => r.map(([a, b]) => D.kalimatBenda(a, b).replace(/\.$/, "")).join("; ")),
    per(D.RONDE_BENARSALAH_QA, (r) => `${r.length} pernyataan, ${r.filter((p) => p.benar).length} benar`),
    per(D.RONDE_SUSUNKATA_QA, (r) => r.kata.join(" ")),
    per(D.RONDE_HITUNG_QA, (r) => r.map((s) => `jawaban ${s.jawab} ${s.satuan}`).join(", ")),
    per(D.RONDE_TABEL_QA, (r) => r.judul),
    per(D.RONDE_BANDINGANGKA_QA, (r) => r.map((s) => `${s.a} dan ${s.b} ${sat(s.satuan)}`).join(", ")),
    D.RONDE_DETEKTIF_QA.map((s, i) => `soal ${i + 1}: jawaban ${nm(s.jawab)}`).join("; "),
    D.PETA_KONSEP_A.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUTANGKA_QA, (r) => `${r.ids.map((i) => `${nm(i)} ${D.jumlahSatuan(i, r.satuan)}`).join(", ")} ${sat(r.satuan)}`),
    per(D.RONDE_KETUKSEMUA_QA, (s) => `${s.item.filter((i) => i.benar).length} dari ${s.item.length} benar`),
  ],
  B: [
    per(D.RONDE_BACAJAM_B, (r) => r.map((j) => `pukul ${D.jam12(j)}`).join(", ")),
    per(D.RONDE_PUTAR_B, (r) => r.map((i) => D.KEGIATAN[i].nama).join(", ")),
    per(D.RONDE_SORTIR_B, (r) => kegiatan(r)),
    per(D.RONDE_JODOH_B, (r) => kegiatan(r)),
    per(D.RONDE_LAMA_B, (r) => r.map((p) => `${D.KEGIATAN[p.a].nama} atau ${D.KEGIATAN[p.b].nama} (${p.tanya === "lama" ? "lebih lama" : "lebih sebentar"})`).join("; ")),
    per(D.RONDE_URUT_B, (r) => kegiatan(r)),
    per(D.RONDE_GARIS_B, (r) => kegiatan(r)),
    per(D.RONDE_MEMORI_B, (r) => kegiatan(r)),
    per(D.RONDE_SELISIH_B, (r) => r.map((s) => `pukul ${D.jam12(s.mulai)} sampai ${D.jam12(s.selesai)}`).join(", ")),
    per(D.RONDE_TEMUKANJAM_B, (r) => r.map((j) => `pukul ${j}`).join(", ")),
    per(D.RONDE_BACAJAM_PB, (r) => r.map((j) => D.digital(j)).join(", ")),
    per(D.RONDE_GAMBARJARUM_PB, (r) => r.map((j) => D.digital(j)).join(", ")),
    per(D.RONDE_BATANGLAMA_PB, (r) => r.map((x) => `${x.id}=${x.jam} jam`).join(", ")),
    per(D.RONDE_DIGITAL_PB, (r) => r.map((j) => D.digital(j)).join(", ")),
    per(D.RONDE_URUTJAM_PB, (r) => r.map((j) => `${D.digital(j)} ${D.bagianHari(j)}`).join(", ")),
    per(D.RONDE_SORTIRJAM_PB, (r) => r.map((j) => D.digital(j)).join(", ")),
    per(D.RONDE_BLOK_PB, (r) => r.map(([a, b]) => `${D.jam12(a)} sampai ${D.jam12(b)}`).join(", ")),
    per(D.RONDE_TABEL_PB, (r) => r.judul),
    per(D.RONDE_TALLYJAM_PB, (r) => r.map(([a, b]) => `${D.jam12(a)} sampai ${D.jam12(b)}`).join(", ")),
    per(D.RONDE_GARISJAM_PB, (r) => r.join(", ")),
    per(D.RONDE_KALIMAT_QB, (r) => `${r.length} kalimat`),
    per(D.RONDE_BENARSALAH_QB, (r) => `${r.length} pernyataan, ${r.filter((p) => p.benar).length} benar`),
    per(D.RONDE_SUSUNKATA_QB, (r) => r.kata.join(" ")),
    per(D.RONDE_HITUNG_QB, (r) => r.map((s) => `${s.jawab} jam`).join(", ")),
    per(D.RONDE_TABEL_QB, (r) => r.judul),
    per(D.RONDE_PILIHBAGIAN_QB, (r) => r.map((j) => `${D.digital(j)} ${D.bagianHari(j)}`).join(", ")),
    D.RONDE_DETEKTIF_QB.map((s, i) => `soal ${i + 1}: jawaban ${s.opsi[s.jawab]}`).join("; "),
    D.PETA_KONSEP_B.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUTDIGITAL_QB, (r) => r.map((j) => D.digital(j)).join(", ")),
    per(D.RONDE_KETUKBAGIAN_QB, (s) => `${s.bagian}: ${s.jam.map((j) => D.digital(j)).join(", ")}`),
  ],
};

const berkas = { A: "mtk-2-bab6-sub-a-berat.md", B: "mtk-2-bab6-sub-b-waktu.md" };

const metodeLuar = {
  A: [
    "**Tebak lalu buktikan (predict, observe, explain)**: siswa menebak benda yang lebih berat sebelum menimbang, lalu bukti timbangan memberi umpan balik. Dasar permainan Gantungan Baju: Tebak dan Buktikan.",
    "**Besar belum tentu berat**: kontras balon besar yang ringan dengan batu kecil yang berat melawan salah paham bahwa ukuran menentukan berat. Dasar kartu infografis dan adegan video.",
    "**Satu benda, dua hasil ukur**: boneka sama dengan 4 bola tenis dan juga 10 kelereng. Siswa menemukan sendiri bahwa satuan yang lebih ringan memerlukan hitungan yang lebih banyak. Dasar permainan Timbang dengan Satuan dan Berapa Satuan?",
    "**Rantai perbandingan**: satu pepaya sama dengan dua mangga dan satu mangga sama dengan dua manggis, jadi satu pepaya sama dengan empat manggis. Jembatan menuju perkalian dan perbandingan, dibangkitkan dari tabel berat yang sama dengan gambar.",
    "**Model batang, titik, dan goresan (tally)**: berat dibaca dari tinggi batang atau banyak titik pada neraca diagram. Dasar tahap Picture tanpa gambar benda.",
    "**Tata keranjang belanja**: konteks nyata mengapa benda yang lebih berat ditaruh di dasar. Dasar permainan Tata Keranjang Belanja.",
  ],
  B: [
    "**Jam analog dan jam digital berdampingan**: pukul 5 tepat sama dengan 05.00. Jam digital 24 jam (16.00 adalah pukul 4 sore) diperkenalkan eksplisit di peta pikiran dan poster sebelum dipakai di permainan.",
    "**Garis waktu satu hari**: pagi, siang, sore, malam sebagai urutan matahari. Dasar permainan Garis Waktu Hariku dan adegan video dengan matahari yang bergeser.",
    "**Jalur jam dan hitung selisih**: selisih waktu dihitung dengan menghitung kotak satu jam dari pukul mulai sampai pukul selesai. Dasar permainan Majukan Jam, Hitung Kotak Jam, dan Goresan Jam.",
    "**Model batang lama kegiatan**: lama kegiatan dibaca dari panjang batang (satu kotak sama dengan satu jam). Dasar permainan Batang Lama Kegiatan.",
    "**Lama kegiatan dari pengalaman sehari-hari**: mencuci tangan sekitar satu menit, mandi lima belas menit, berolahraga satu jam, tidur delapan jam. Data lama kegiatan satu sumber dengan kuncinya.",
    "**Memori pasangan (concentration)**: mencocokkan kartu kegiatan dengan kartu jam melatih ingatan dan membaca jam sekaligus.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 6: Pengukuran, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b6.ts\` dan \`src/components/modul/data-k2b6.ts\`, oleh \`scripts/buat-naskah-md-k2b6.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 6 hlm. 155–190) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab6\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab6.json` (dibangkitkan `src/content-master/buat-k2-bab6.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab6` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B6_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
  L.push("| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 6. |");
  L.push("| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |");
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
  L.push(`| C. Concrete | Benda nyata: angkat, timbang, jodohkan, urutkan, ${k === "A" ? "tata keranjang" : "putar jam, susun hari"} | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: ${k === "A" ? "neraca balok berhuruf, titik, batang, goresan, tabel, garis angka" : "muka jam, jam digital, jalur jam, batang lama, tabel, garis angka jam"} | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan angka: kalimat, benar-salah, hitung, tabel, detektif, peta konsep | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (balok berhuruf, titik, goresan, batang, muka jam, jalur jam).");
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
  L.push("## 7. Tahap 4, 5, dan 6: tiga puluh permainan");
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
  L.push("- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.");
  if (k === "A") L.push("- Berat benda memakai tabel berat tetap (gram, pembulatan) hanya untuk membangkitkan kunci dan miring neraca. Angka gram tidak pernah ditampilkan ke siswa. Besaran baku (kilogram) belum diajarkan di kelas 2.");
  if (k === "B") L.push("- Jam digital 24 jam (misalnya 16.00 untuk pukul 4 sore) diperkenalkan sebagai pengayaan di peta pikiran dan poster. Jam di muka jam analog hanya menampilkan pukul tepat (jarum panjang di angka 12); menit belum diajarkan di bab ini.");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B6) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 6 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b6.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Neraca dan jam bergerak.** Neraca (`NeracaSvg`) dan jam (`IsiJam`) digambar dari data, dan miringnya neraca serta posisi jarum berubah halus mengikuti kalimat yang dibacakan. Matahari bergeser menurut bagian hari (`LangitHari`).");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B6) {
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
V.push("- Gambar bersama: `src/components/modul/video-k2b6-umum.tsx` (neraca dan gantungan, jam dinding, satuan tidak baku, ruang kelas, langit satu hari, batang lama kegiatan, kemoceng).");
V.push("- Adegan: `video-k2b6a.tsx` dan `video-k2b6b.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab6-A` dan `-B`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b6.mjs` dan `scripts/uji-statis-k2b6.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab6-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab6-video-cerita.md");
