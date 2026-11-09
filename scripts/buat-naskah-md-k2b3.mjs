// Penulis berkas naskah Matematika Kelas 2 Bab 3 (Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b3.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b3.ts dan data-k2b3.ts) lalu menulis naskah/mtk-2-bab3-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b3.ts";
import * as D from "../src/components/modul/data-k2b3.ts";

const kalimat = (t) => D.kalimatKeping(D.hitungJenis(D.uraiBangun(t.titik, t.batas, t.ruas).keping));

const ronde = {
  A: [
    D.RONDE_PILAH_A.map((r, i) => `ronde ${i + 1}: ${r.map((id) => D.bendaDatar(id).nama).join(", ")}`).join("; "),
    D.RONDE_KARET_A.map((n) => D.namaSegi(n)).join(", "),
    D.RONDE_CETAKPUTAR_A.map((b) => `${b.nama} (${b.lingkaran ? "lingkaran" : "bukan lingkaran"})`).join("; "),
    D.RONDE_CARI_A.map((r) => `${r.sisi} sisi: ${r.benda.filter((b) => D.sisiBenda(b) === r.sisi).map((b) => D.bendaDatar(b).nama).join(", ")}`).join("; "),
    D.RONDE_SISI_A.map((id) => `${D.namaSegi(D.sisiBentuk(id))} (${D.sisiBentuk(id)} sisi)`).join(", "),
    D.RONDE_GARIS_A.map((r, i) => `ronde ${i + 1}: ${r.kiri.map((k) => (D.sisiBentuk(k) ? `${D.sisiBentuk(k)} sisi` : "kurva")).join(", ")}`).join("; "),
    D.RONDE_WARNAI_A.map((r) => r.teks.replace(/^Warnai /, "").replace(/\.$/, "")).join("; "),
    D.RONDE_TABEL_A.map((r, i) => `ronde ${i + 1}: ${r.judul.toLowerCase()} (${r.baris.length} baris)`).join("; "),
    `${D.RONDE_DETEKTIF_A.length} ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama`,
    D.PETA_KONSEP_A.map((p) => p.pusat).join("; "),
  ],
  B: [
    D.RONDE_GUNTING_B.map((r) => `${r.nama}: ${r.teksTarget}`).join("; "),
    D.RONDE_RAKIT_B.map((r) => r.siluet).join("; "),
    D.INDEKS_BONGKAR_B.map((i) => `${D.RONDE_RAKIT_B[i].siluet}: ${D.kalimatKeping(D.hitungSlot(D.RONDE_RAKIT_B[i]))}`).join("; "),
    D.GABUNGAN_B.map((g) => g.nama).join("; "),
    D.RONDE_GARIS_B.map((r) => `${r.nama}: ${r.teksTarget}`).join("; "),
    D.RONDE_KOMPOSIT_B.map((r) => `${r.judul} (bisa: ${r.opsi.filter((o) => o.bisa).map((o) => o.nama).join(", ")})`).join("; "),
    D.RONDE_HITUNG_B.map((r) => `${r.nama}: ${kalimat(r)}`).join("; "),
    D.RONDE_KALIMAT_B.map((r, i) => `ronde ${i + 1}: ${r.length} kalimat`).join("; "),
    D.RONDE_SORTIR_B.map((r, i) => `ronde ${i + 1}: ${r.length} kalimat`).join("; "),
    D.RONDE_POLA_B.map((r) => `${r.judul.toLowerCase()}: ${r.baris.map((b) => b.jawab).join(", ")}`).join("; "),
  ],
  C: [
    D.RONDE_GELIND_C.map((r, i) => `ronde ${i + 1}: ${r.map((id) => D.bendaRuang(id).nama).join(", ")}`).join("; "),
    D.RONDE_TAS_C.map((r) => D.NAMA_RUANG[r.jenis]).join(", "),
    D.RONDE_CETAK_C.map((r) => `${D.bendaRuang(r.benda).nama} (${D.NAMA_CETAKAN_C[r.jawab].toLowerCase()})`).join("; "),
    D.RONDE_PILAH_C.map((r, i) => `ronde ${i + 1}: ${r.map((id) => D.bendaRuang(id).nama).join(", ")}`).join("; "),
    D.RONDE_BAYANGAN_C.map((s) => `${D.NAMA_RUANG[s.jenis]} dari ${s.arah}`).join("; "),
    "lima baris (kubus, balok, tabung, kerucut, bola) dan tiga kolom (permukaan datar, permukaan lengkung, menggelinding)",
    D.RONDE_NAMA_C.map((r, i) => `ronde ${i + 1}: ${r.urut.map((j) => D.NAMA_RUANG[j]).join(", ")}`).join("; "),
    D.RONDE_BENARSALAH_C.map((r, i) => `ronde ${i + 1}: ${r.length} pernyataan (${r.filter((p) => p.benar).length} benar)`).join("; "),
    `${D.RONDE_DETEKTIF_C.length} ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama`,
    D.RONDE_KALIMAT_C.map((r, i) => `ronde ${i + 1}: ${r.kata.join(" ")}`).join("; "),
  ],
};

const berkas = { A: "mtk-2-bab3-sub-a-bangun-datar.md", B: "mtk-2-bab3-sub-b-mengurai-menyusun-bangun-datar.md", C: "mtk-2-bab3-sub-c-bangun-ruang.md" };

const metodeLuar = {
  A: [
    "**Papan paku (geoboard) Gattegno**: karet gelang direntangkan di antara paku untuk membentuk dan menghitung sisi segi banyak. Dasar permainan Papan Paku dan Karet Gelang. Mesin pemeriksa menolak karet yang bersilangan dan menghitung sisi dari pojok sebenarnya.",
    "**Tingkat berpikir geometri van Hiele**: mengenali (visual), menggolongkan menurut ciri (analisis), lalu menjelaskan sebab. Tiga pertanyaan detektif bentuk mengikuti tangga itu.",
    "**Memilah (sorting) berdasarkan satu ciri** sebagai pengantar klasifikasi, dipakai di kelas awal Inggris dan Singapura. Dasar permainan Pilah Benda di Meja dan Warnai Bentuk.",
    "**Percobaan mencetak dan memutar benda** untuk menemukan ciri lingkaran (bulat sempurna, selalu pas ke arah mana pun). Dasar permainan Cetak dan Putar.",
    "**Awalan Yunani poli (banyak)** dan pola nama segi banyak (segi lima, segi enam, segi tujuh, segi delapan). Rambu STOP sebagai contoh segi delapan di jalan.",
  ],
  B: [
    "**Tangram (Tiongkok)**: tujuh keping dari satu persegi. Aturan: pakai semua keping, tidak bertumpuk, sisi menempel, boleh diputar dan dibalik. Keping dibangkitkan dari koordinat dan luasnya diperiksa.",
    "**Dekomposisi dan komposisi bangun** (composing and decomposing shapes) dari kurikulum geometri Amerika Serikat dan Singapura: satu bangun menjadi banyak, banyak menjadi satu.",
    "**Triangulasi sederhana**: dari satu pojok, segi n menjadi n − 2 segitiga. Dari titik tengah, segi n menjadi n segitiga. Pola ini ditemukan siswa lewat tabel.",
    "**Pemeriksaan luas** sebagai alasan sebuah bentuk tidak mungkin disusun dari keping tertentu (luas keping digabung harus sama).",
    "**Mengurai dengan garis yang tidak bersilangan**: mesin mendata keping dari graf bidang, sehingga hasil bisa benar lebih dari satu cara (siswa diajak menemukan lebih dari satu uraian).",
  ],
  C: [
    "**Tas misteri (mystery bag) Montessori**: mengenali bangun ruang dengan meraba, tanpa melihat. Dasar permainan Tas Misteri dengan sistem bintang menurut banyak petunjuk.",
    "**Percobaan menggelindingkan benda di lereng** untuk menemukan hubungan permukaan lengkung dan kemampuan menggelinding.",
    "**Mencetak permukaan (face printing)** untuk menghubungkan bangun ruang dengan bangun datar pada permukaannya.",
    "**Pandangan atas dan samping (orthographic views)**: bayangan bangun ruang dari arah berbeda berupa bangun datar.",
    "**Pembedaan bangun datar dan bangun ruang lewat uji isi**: benda yang bisa diisi punya ruang di dalam.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 3: Bentuk di Sekitar Kita, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b3.ts\` dan \`src/components/modul/data-k2b3.ts\`, oleh \`scripts/buat-naskah-md-k2b3.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 65–100) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab3\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab3.json` (dibangkitkan `src/content-master/buat-k2-bab3.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab3` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B3_META.silabusElemen} |`);
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
  L.push(`| C. Concrete | Benda nyata yang diketuk, diseret, digunting, dan dihitung | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: bentuk, titik dan garis, model bangun ruang, tabel | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan angka: tabel, petunjuk tertulis, kalimat, peta konsep | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bentuk polos dan model bangun ruang polos tanpa hiasan benda).");
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
  if (k === "C") L.push("- Penggolongan mengikuti buku: kubus dan balok berpermukaan datar, sedangkan tabung, kerucut, dan bola berpermukaan lengkung dan bisa menggelinding. Naskah menambahkan catatan bahwa alas tabung dan alas kerucut berbentuk lingkaran (datar) supaya tidak bertentangan dengan permainan Cetak dan Tebak.");
  if (k === "A") L.push("- Rambu STOP berbentuk segi delapan (pengayaan di luar daftar segi enam buku) dan dipakai sebagai contoh pola nama segi banyak.");
  if (k === "B") L.push("- Permainan Gunting Kertas ronde 4 dan Garis Pengurai menerima setiap uraian yang benar, bukan satu cara tetap. Ada tiga cara sah untuk 2 segitiga dan 1 segi empat.");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B3) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 3 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b3.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Gambar dibangkitkan dari data.** Bangun terurai, keping tangram, dan bentuk gabungan digambar dari koordinat di `data-k2b3.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B3) {
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
V.push("- Gambar bersama: `src/components/modul/video-k2b3-umum.tsx` (bentuk, benda datar dan ruang, bangun terurai, tangram, sarang lebah, kaca pembesar, panah).");
V.push("- Adegan: `video-k2b3a.tsx`, `video-k2b3b.tsx`, `video-k2b3c.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab3-A`, `-B`, `-C`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b3.mjs` dan `scripts/uji-statis-k2b3.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab3-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab3-video-cerita.md");
