// Penulis berkas naskah Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100, Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b7.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b7.ts dan data-k2b7.ts) lalu menulis naskah/mtk-2-bab7-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b7.ts";
import * as D from "../src/components/modul/data-k2b7.ts";

const per = (arr, f) => arr.map((r, i) => `ronde ${i + 1}: ${f(r, i)}`).join("; ");
const nb = (id) => D.BENDA_INFO[id].nama;
const daftar = (arr) => arr.join(", ");
const urut = (r) => `${daftar(D.urutBilangan(r.angka, r.dari))} (dari paling ${r.dari === "kecil" ? "kecil" : "besar"}; tampil ${daftar(r.angka)})`;
const rel = (a, b) => `${a} ${D.banding(a, b)} ${b}`;
const garis = (s) => (s.jenis === "antara" ? `di antara ${s.a} dan ${s.c} = ${D.hasilGaris(s)}` : s.jenis === "lebih" ? `${s.k} lebihnya dari ${s.n} = ${D.hasilGaris(s)}` : `${s.k} kurangnya dari ${s.n} = ${D.hasilGaris(s)}`);
const langkah = (s) => `${s.mulai} ${s.arah} ${s.langkah} langkah = ${D.hasilLangkah(s)}`;
const semua = (s) => `${s.arah === "lebih" ? "lebih besar" : "lebih kecil"} dari ${s.acuan}: ${daftar(s.angka.filter((n) => D.cocokAcuan(n, s)))} dari ${daftar(s.angka)}`;
const tabel = (r) => `${r.judul}: ${r.baris.map((b) => `${b.label}=${b.jawab}`).join(", ")}`;
const bs = (r) => `${r.length} pernyataan, ${r.filter((p) => p.benar).length} benar`;
const detektif = (s, i) => `soal ${i + 1}: ${s.klue.map((k) => D.teksKlue(k)).join(" ")} jawaban ${s.jawab}`;

const ronde = {
  A: [
    per(D.RONDE_BUNGKUS_A, (b) => `${nb(b)} dalam ${D.BENDA_INFO[b].wadah}`),
    per(D.RONDE_HITUNGBUNGKUS_A, (r) => r.map((t) => `${t.n} ${D.BENDA_INFO[t.benda].wadah} ${nb(t.benda)} = ${t.n * 10}`).join(", ")),
    per(D.RONDE_JODOHBUNGKUS_A, (r) => r.map((n) => `${n} wadah = ${n * 10}`).join(", ")),
    per(D.RONDE_RAKIT_A, (t) => `${t.n} ${nb(t.benda)} (${D.kataPS(t.n)})`),
    per(D.RONDE_IKAT_A, (t) => `${t.n} ${nb(t.benda)} (${D.kataPS(t.n)})`),
    per(D.RONDE_TEBAK_A, (t) => `${t.n} ${nb(t.benda)}, pilihan tebakan ${daftar(D.tebakanPilihan(t.n))}`),
    per(D.RONDE_MEMORI_A, (r) => `pasangan ${daftar(r)}`),
    per(D.RONDE_URUTBANYAK_A, urut),
    per(D.RONDE_PILAH_A, (r) => `kurang dari 50: ${daftar(r.filter((n) => n < 50))}; lebih dari 50: ${daftar(r.filter((n) => n > 50))}`),
    per(D.RONDE_KANTONG_A, (r) => r.map((s) => `cari ${s.target} di antara ${daftar(s.item)}`).join("; ")),
    per(D.RONDE_BATANG_PA, (r) => `${daftar(r)} batang`),
    per(D.RONDE_CARIMODEL_PA, (r) => r.map((s) => `cari ${s.target} di antara ${daftar(s.item)}`).join("; ")),
    `soal papan: ${daftar(D.RONDE_ISIPAPAN_PA)}`,
    per(D.RONDE_JODOHMODEL_PA, (r) => daftar(r)),
    per(D.RONDE_BOND_PA, (r) => r.map((s) => `${s.total} = ${s.a ?? "?"} + ${s.b ?? "?"}`).join(", ")),
    per(D.RONDE_GARISPULUHAN_PA, (r) => r.map((s) => `${s.mulai} lompat ${s.loncat} puluhan = ${D.hasilLoncat(s)}`).join(", ")),
    per(D.RONDE_TABELSERATUS_PA, (r) => `kotak kosong ${daftar(r)}`),
    per(D.RONDE_URUTMODEL_PA, urut),
    per(D.RONDE_PILAHMODEL_PA, (r) => `kotak puluhan ${daftar(r.puluhan)}; model ${daftar(r.angka)}`),
    per(D.RONDE_TEBAKTITIK_PA, (n) => `${n} titik, pilihan tebakan ${daftar(D.tebakanPilihan(n))}`),
    per(D.RONDE_JODOHKATA_QA, (r) => r.map((n) => `${D.kataPS(n)} = ${n}`).join(", ")),
    per(D.RONDE_KALIMAT_QA, (r) => r.map((n) => `${D.kataPS(n)} = ${n}`).join("; ")),
    per(D.RONDE_SUSUN_QA, (r) => r.kata.join(" ")),
    per(D.RONDE_TABEL_QA, tabel),
    per(D.RONDE_BENARSALAH_QA, bs),
    per(D.RONDE_NAMA_QA, (r) => r.map((n) => `${D.terbilang(n)} = ${n}`).join(", ")),
    D.RONDE_DETEKTIF_QA.map(detektif).join("; "),
    D.PETA_KONSEP_A.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUTANGKA_QA, urut),
    per(D.RONDE_KETUKSEMUA_QA, (s) => `${s.angka.filter(s.ciri).length} dari ${s.angka.length} cocok (${s.tanya.replace(/^Ketuk semua bilangan yang /, "")})`),
  ],
  B: [
    per(D.RONDE_LANGKAH_B, (r) => r.map(langkah).join(", ")),
    per(D.RONDE_ANTARA_B, (r) => r.map(([a, c]) => `di antara ${a} dan ${c} = ${(a + c) / 2}`).join(", ")),
    per(D.RONDE_BANDING_B, (r) => r.map((s) => `${s.namaA} ${s.a} dan ${s.namaB} ${s.b}: ${D.banding(s.a, s.b)}`).join(", ")),
    per(D.RONDE_PALING_B, (r) => `${daftar(r)}; terbesar ${Math.max(...r)}, terkecil ${Math.min(...r)}`),
    per(D.RONDE_KARTU_B, (s) => `kartu ${s.kartu[0]} dan ${s.kartu[1]}, paling ${s.arah} = ${D.hasilKartu(s)}`),
    per(D.RONDE_URUT_B, urut),
    per(D.RONDE_PASANGBANDING_B, (r) => r.map(([a, b]) => rel(a, b)).join(", ")),
    per(D.RONDE_MEMORI_B, (r) => `pasangan ${daftar(r)}`),
    per(D.RONDE_PILAH_B, (r) => `acuan ${r.acuan}; ${daftar(r.angka)}`),
    per(D.RONDE_SEMUA_B, semua),
    per(D.RONDE_GARIS_PB, (r) => r.map(garis).join(", ")),
    per(D.RONDE_BANDINGPAPAN_PB, (r) => r.map(([a, b]) => rel(a, b)).join(", ")),
    per(D.RONDE_URUTPAPAN_PB, urut),
    per(D.RONDE_MODELBESAR_PB, (r) => `${daftar(r)}; terbesar ${Math.max(...r)}, terkecil ${Math.min(...r)}`),
    per(D.RONDE_PILAHMODEL_PB, (r) => `acuan ${r.acuan}; ${daftar(r.angka)}`),
    per(D.RONDE_SIMBOL_PB, (r) => r.map(([a, b]) => `${a} ${D.tanda(a, b)} ${b}`).join(", ")),
    per(D.RONDE_TABELSERATUS_PB, (r) => `kotak kosong ${daftar(r)}`),
    per(D.RONDE_LANGKAH_PB, (r) => r.map(langkah).join(", ")),
    per(D.RONDE_MEMORI_PB, (r) => `pasangan ${daftar(r)}`),
    per(D.RONDE_SEMUA_PB, semua),
    per(D.RONDE_KALIMAT_QB, (r) => r.map(([a, b]) => rel(a, b)).join("; ")),
    per(D.RONDE_BENARSALAH_QB, bs),
    per(D.RONDE_SUSUN_QB, (r) => r.kata.join(" ")),
    per(D.RONDE_AKU_QB, (r) => r.map((s) => `${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${s.dasar} = ${D.hasilAku(s)}`).join(", ")),
    per(D.RONDE_TABEL_QB, tabel),
    per(D.RONDE_DIGIT_QB, (r) => r.map((s) => `${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${s.dasar} = ${D.hasilDigit(s)}`).join(", ")),
    D.RONDE_DETEKTIF_QB.map(detektif).join("; "),
    D.PETA_KONSEP_B.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUTANGKA_QB, urut),
    per(D.RONDE_SEMUA_QB, semua),
  ],
};

const berkas = { A: "mtk-2-bab7-sub-a-menghitung-membaca-menulis.md", B: "mtk-2-bab7-sub-b-membandingkan-mengurutkan.md" };

const metodeLuar = {
  A: [
    "**Pengelompokan sepuluh-sepuluh (chunking, subitizing)**: banyak benda yang besar dihitung per kelompok sepuluh, bukan satu-satu. Dasar permainan Ikat Sepuluh, Tebak dan Hitung, dan adegan video ikan.",
    "**Tebak lalu buktikan (estimasi)**: siswa menebak banyak benda dari tiga pilihan tebakan tanpa jawaban yang salah, lalu membuktikannya dengan kelompok sepuluh. Dasar permainan Tebak dan Hitung dan Tebak Banyak Titik.",
    "**Blok nilai tempat (base-ten blocks, ala Dienes)**: batang sepuluh kotak untuk puluhan dan kotak tunggal untuk satuan. Dasar tahap Picture tanpa gambar benda.",
    "**Papan nilai tempat dan pasangan bilangan (number bond)**: 53 dibaca lima puluh tiga, ditulis 5 puluhan 3 satuan, dan dipecah 50 + 3. Dua cara disajikan berdampingan di peta pikiran dan permainan.",
    "**Tabel seratus (hundred chart)**: bilangan 51 sampai 100 disusun sepuluh kolom, sehingga tetangga kiri-kanan berbeda satu dan atas-bawah berbeda sepuluh. Dasar permainan Lengkapi Tabel Seratus.",
    "**Garis puluhan**: melompat sepuluh-sepuluh pada garis 0, 10, 20, sampai 100 menghubungkan menghitung puluhan dengan lompatan di garis.",
    "**Detektif bilangan (deduksi dari petunjuk)**: dua sampai tiga petunjuk menyisakan satu bilangan. Setiap soal diperiksa oleh uji statis agar hanya satu bilangan yang cocok.",
  ],
  B: [
    "**Garis bilangan maju dan mundur**: lebihnya berarti maju (kanan), kurangnya berarti mundur (kiri). Kupu-kupu dan capung memperagakan sehingga arah mudah diingat.",
    "**Bandingkan puluhan lebih dulu**: puluhan menentukan besar bilangan, satuan hanya dilihat bila puluhan sama. Dasar permainan Siapa Lebih Banyak dan Bandingkan Dua Papan.",
    "**Tanda perbandingan sebagai mulut buaya**: tanda terbuka ke arah bilangan yang lebih besar. Dasar permainan Jodohkan Papan dan Tanda.",
    "**Kartu angka dan papan nilai tempat**: dua kartu disusun menjadi bilangan terbesar atau terkecil dengan menaruh angka terbesar di tempat puluhan (Susun Dua Kartu).",
    "**Memori pasangan (concentration)**: mencocokkan kumpulan benda atau papan dengan lambang bilangannya melatih ingatan dan nilai tempat sekaligus.",
    "**Pilah terhadap acuan**: membandingkan banyak bilangan sekaligus dengan satu bilangan acuan (pilah ke kotak lebih besar dan lebih kecil).",
    "**Teka-teki mundur (inverse operation)**: teka-teki Kira diselesaikan dengan mengurangi dari hasil, melatih berpikir terbalik.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 7: Ayo Membilang sampai dengan 100, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b7.ts\` dan \`src/components/modul/data-k2b7.ts\`, oleh \`scripts/buat-naskah-md-k2b7.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 7 hlm. 191–224) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab7\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab7.json` (dibangkitkan `src/content-master/buat-k2-bab7.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab7` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B7_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
  L.push("| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 7. |");
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
  L.push(`| C. Concrete | Benda nyata: ${k === "A" ? "isi bungkus, hitung bungkus, rakit bilangan, ikat sepuluh, tebak banyak" : "maju mundur, siapa lebih banyak, susun kartu, pilah kumpulan"} | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: ${k === "A" ? "batang puluhan, model nilai tempat, bagan pasangan, garis puluhan, tabel seratus, titik" : "garis bilangan, dua papan nilai tempat, model batang, tanda perbandingan, tabel seratus"} | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan angka: kalimat, benar-salah, tabel, detektif, peta konsep, urutkan | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (batang, kotak, papan nilai tempat, titik, goresan, garis bilangan).");
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
  L.push("- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua, memori) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.");
  if (k === "A") L.push("- Benda pada permainan memakai gambar SVG dan emoji bawaan perangkat yang tampil di Windows 10 (tanpa emoji Unicode 13). Bilangan dibatasi sampai 100 (seratus).");
  if (k === "B") L.push("- Tanda perbandingan (>, <, =) selalu diucapkan dengan kata (lebih besar dari, lebih kecil dari, sama dengan) oleh Suara Guru. Garis bilangan memakai kupu-kupu (emoji) dan capung (gambar SVG).");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B7) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 7 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b7.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Wadah sepuluh dan garis angka bergerak.** Bungkus, kantong, dan keranjang berisi sepuluh benda digambar dari data (`WadahSvg`), dan penanda kupu-kupu atau capung meluncur di garis angka (`StripSvg`) mengikuti kalimat yang dibacakan.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B7) {
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
V.push("- Gambar bersama: `src/components/modul/video-k2b7-umum.tsx` (wadah berisi sepuluh benda, garis angka kotak, papan nilai tempat, ikan bertebaran).");
V.push("- Adegan: `video-k2b7a.tsx` dan `video-k2b7b.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab7-A` dan `-B`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b7.mjs` dan `scripts/uji-statis-k2b7.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab7-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab7-video-cerita.md");
