// Penulis berkas naskah Matematika Kelas 2 Bab 5 (Pecahan, Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b5.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b5.ts dan data-k2b5.ts) lalu menulis naskah/mtk-2-bab5-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b5.ts";
import * as D from "../src/components/modul/data-k2b5.ts";

const ronde = {
  A: [
    D.RONDE_POTONG_A.map((r) => `${D.BENDA_POTONG[r.benda].nama.toLowerCase()} (${r.bagian} bagian, ${r.kandidat.filter((k) => D.potonganAdil(r.benda, k.garis, r.bagian)).length} dari ${r.kandidat.length} potongan adil)`).join("; "),
    D.RONDE_LIPAT_A.map((r) => `${r.nama} (${r.perluCara} cara)`).join("; "),
    D.RONDE_TUANG_A.map((r) => `${r.nama} (${r.total} takaran)`).join("; "),
    D.RONDE_CARI_A.map((r, i) => `ronde ${i + 1}: ${r.filter(D.itemSetengah).length} dari ${r.length} tepat setengah`).join("; "),
    D.RONDE_WARNAI_A.map((r) => r.teks.replace(/\.$/, "")).join("; "),
    D.RONDE_TARIK_A.map((id) => D.BENTUK_P[id].nama).join(", "),
    `${D.FIGURA_SETENGAH_A.length} gambar, ${D.FIGURA_SETENGAH_A.filter(D.adalahSetengah).length} menunjukkan setengah`,
    D.RONDE_KALIMAT_A.map((r, i) => `ronde ${i + 1}: ${r.length} kalimat`).join("; "),
    D.RONDE_BENARSALAH_A.map((r, i) => `ronde ${i + 1}: ${r.length} pernyataan (${r.filter((p) => p.benar).length} benar)`).join("; "),
    D.PETA_KONSEP_A.map((p) => p.pusat).join("; "),
  ],
  B: [
    D.RONDE_BAGI_B.map((r) => `${r.n} ${D.NAMA_ITEM[r.item].jamak}`).join(", "),
    D.RONDE_NERACA_B.map((r) => `${r.n} ${D.NAMA_ITEM[r.item].jamak}`).join(", "),
    D.RONDE_PASANG_B.map((r) => `${r.n} ${D.NAMA_ITEM[r.item].jamak}${r.n % 2 ? " (ganjil, tersisa satu)" : ""}`).join(", "),
    D.RONDE_UTUH_B.map((r) => `setengahnya ${r.setengah}, seluruhnya ${r.setengah * 2}`).join("; "),
    D.RONDE_LINGKARI_B.map((n) => `${n} titik`).join(", "),
    D.RONDE_PEMBAGI_B.map((l) => `${l.baris} baris × ${l.kolom} kolom (${D.pemisahSah(l).length} garis sah)`).join("; "),
    D.RONDE_SATU_B.map((r) => `${r.kiri} dan ${r.kanan} (${r.kiri === r.kanan ? "sama banyak" : "tidak sama"})`).join("; "),
    D.RONDE_TABEL_B.map((r, i) => `ronde ${i + 1}: ${r.judul.toLowerCase()} (${r.baris.length} baris)`).join("; "),
    `${D.RONDE_DETEKTIF_B.length} ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan bilangan`,
    D.RONDE_BISA_B.map((r, i) => `ronde ${i + 1}: ${r.map((x) => x.bilangan).join(", ")}`).join("; "),
  ],
  C: [
    D.RONDE_POTONG_C.map((r) => `${D.BENDA_POTONG[r.benda].nama.toLowerCase()} (${r.bagian} bagian, ${r.kandidat.filter((k) => D.potonganAdil(r.benda, k.garis, r.bagian)).length} dari ${r.kandidat.length} potongan adil)`).join("; "),
    D.RONDE_LIPAT_C.map((r) => `${r.nama} (${r.langkah.length} lipatan pertama)`).join("; "),
    D.RONDE_BELAH_C.map((b) => D.BENDA_POTONG[b].nama.toLowerCase()).join(", "),
    D.RONDE_SUSUN_C.map((r) => `${D.BENDA_POTONG[r.benda].nama.toLowerCase()} menjadi ${r.kata}`).join("; "),
    D.RONDE_WARNAI_C.map((r) => r.teks.replace(/\.$/, "")).join("; "),
    D.RONDE_TARIK_C.map((id) => D.BENTUK_P[id].nama).join(", "),
    `${D.FIGURA_SEPEREMPAT_C.length} gambar, ${D.FIGURA_SEPEREMPAT_C.filter(D.adalahSeperempat).length} menunjukkan seperempat`,
    D.RONDE_PASANG_C.map((r, i) => `ronde ${i + 1}: ${r.kiri.length} pasangan`).join("; "),
    D.RONDE_TABEL_C.map((r, i) => `ronde ${i + 1}: ${r.judul.toLowerCase()} (${r.baris.length} baris)`).join("; "),
    D.PETA_KONSEP_C.map((p) => p.pusat).join("; "),
  ],
};

const berkas = { A: "mtk-2-bab5-sub-a-setengah-benda-utuh.md", B: "mtk-2-bab5-sub-b-setengah-kumpulan-benda.md", C: "mtk-2-bab5-sub-c-seperempat-benda-utuh.md" };

const metodeLuar = {
  A: [
    "**Berbagi adil (fair sharing)**: anak membagi satu benda untuk dua teman dan menyadari bahwa adil berarti sama besar. Dasar pecahan di kurikulum Singapura dan Inggris untuk kelas awal. Permainan Potongan yang Adil menolak potongan yang nyaris tengah dengan menghitung luas bagian.",
    "**Melipat kertas dan simetri**: dua bagian yang saling menutup pas adalah setengah. Mesin memantulkan bagian yang dilipat ke seberang garis lipat lalu memeriksa apakah hasilnya masuk ke bagian lain. Persegi punya empat cara melipat, lingkaran banyak cara (semua garis lewat titik tengah), segitiga hanya satu cara.",
    "**Model luas (area model)**: pecahan sebagai bagian dari satu bangun. Gambar yang diwarnai dihitung luasnya oleh program, bukan dicocokkan dengan kunci tetap.",
    "**Model volume cairan (setengah gelas)**: setengah sebagai ketinggian yang sama. Permainan Tuang Setengah tidak menampilkan angka supaya anak memakai penglihatan.",
    "**Tiga pertanyaan pemeriksa**: dibagi menjadi dua bagian? sama besar? satu bagian yang ditunjuk? Ketiganya harus ya. Dasar penalaran Benar atau Salah dan Setengah atau Bukan.",
  ],
  B: [
    "**Model himpunan (set model)**: pecahan sebagai bagian dari sekumpulan benda, bukan dari satu bangun. Dasar kurikulum Amerika Serikat untuk menghubungkan setengah dengan membagi bilangan.",
    "**Satu-satu (one-to-one correspondence)**: satu benda untukmu, satu benda untukku, bergantian sampai habis. Permainan Pasang Berdua dan Satu-Satu Antar Kelompok memakai prinsip ini sebelum anak belajar pembagian.",
    "**Neraca (balance model)**: dua kelompok sama banyak membuat neraca seimbang. Piringan miring ketika kelompok tidak sama banyak.",
    "**Garis pembagi pada larik titik (array)**: satu garis lurus membagi larik titik menjadi dua kelompok. Mesin menghitung semua garis sah, termasuk kasus 3 × 3 titik yang tidak punya garis pembagi.",
    "**Genap dan ganjil secara visual**: bilangan yang semua benda dapat berpasangan adalah bilangan yang bisa dibagi dua sama banyak. Diperkenalkan lewat pengalaman, tanpa istilah resmi.",
  ],
  C: [
    "**Potong dua kali (halving twice)**: seperempat adalah setengah dari setengah. Permainan Belah Apel Bertahap dan Lipat Dua Kali menampilkan proses bertahap dengan pertanyaan di setiap langkah.",
    "**Lipat kertas dua kali dengan beberapa cara**: tegak lalu mendatar menghasilkan empat persegi kecil, miring dua kali menghasilkan empat segitiga, dan tiga lipatan tegak menghasilkan empat jalur. Bentuk berbeda tetapi luasnya sama.",
    "**Hubungan bagian dan seluruh**: 1 utuh sama dengan 2 setengah dan sama dengan 4 seperempat, 1 setengah sama dengan 2 seperempat. Dasar penjumlahan dan perbandingan pecahan di kelas tinggi.",
    "**Membagi bangun dengan dua garis**: dua diameter lingkaran hanya membagi empat sama besar bila saling tegak lurus. Mesin menghitung luas keempat bagian, sehingga dua garis yang berpotongan miring ditolak.",
    "**Kerajinan potongan lingkaran (Ayo Berkarya)**: satu setengah dan tiga seperempat lingkaran disusun menjadi ikan. Menghubungkan pecahan dengan seni.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 5: Pecahan, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b5.ts\` dan \`src/components/modul/data-k2b5.ts\`, oleh \`scripts/buat-naskah-md-k2b5.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 125–154) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab5\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab5.json` (dibangkitkan `src/content-master/buat-k2-bab5.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab5` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B5_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
  L.push("| Bab 4 | Dilewati sesuai urutan perintah pemilik; modul Bab 4 belum dibuat. |");
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
  L.push(`| C. Concrete | Benda nyata yang dipotong, dilipat, dituang, dibagi, dan dipasangkan | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: bangun berbagi bagian, titik dan garis, tabel pilihan | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan lambang: kalimat, tabel, petunjuk tertulis, peta konsep | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
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
  L.push("- Ucapan memakai kata (\"setengah\", \"seperempat\") supaya suara perangkat tidak salah membaca lambang pecahan.");
  if (k === "A") L.push("- Ronde 1 Potongan yang Adil menilai kandidat dari luas bagian dengan toleransi 1,2 persen. Potongan yang nyaris tengah tetapi berbeda lebih dari itu ditolak dan dijelaskan.");
  if (k === "B") L.push("- Benda tidak dipecah. Bilangan ganjil dinyatakan \"tidak punya setengah\" karena kelereng, ikan, dan pensil tidak boleh dipotong. Pecahan dengan penyebut lain tidak dibahas pada kelas ini.");
  if (k === "C") L.push("- Dua garis pada ronde Tarik Garis Jadi Empat diterima hanya bila keempat bagian sama besar menurut luas. Dua diameter lingkaran yang tidak saling tegak lurus ditolak walau menghasilkan empat bagian.");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B5) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 5 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b5.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Gambar dibangkitkan dari data.** Benda yang dipotong dan bangun yang dilipat digambar dari koordinat di `data-k2b5.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B5) {
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
V.push("- Gambar bersama: `src/components/modul/video-k2b5-umum.tsx` (benda yang dipotong, benda satuan, bangun berbagi bagian, pisau aman, gelang kelompok, gelas, sendok).");
V.push("- Adegan: `video-k2b5a.tsx`, `video-k2b5b.tsx`, `video-k2b5c.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab5-A`, `-B`, `-C`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b5.mjs` dan `scripts/uji-statis-k2b5.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab5-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab5-video-cerita.md");
