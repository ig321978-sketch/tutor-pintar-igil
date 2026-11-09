// Penulis berkas naskah Matematika Kelas 2 Bab 8 (Berbagai Diagram, Materi saja). Jalankan: node --no-warnings scripts/buat-naskah-md-k2b8.mjs
// Membaca satu sumber (src/components/modul/naskah-k2b8.ts dan data-k2b8.ts) lalu menulis naskah/mtk-2-bab8-*.md.
// Tanpa jaringan dan tanpa API. Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b8.ts";
import * as D from "../src/components/modul/data-k2b8.ts";

const per = (arr, f) => arr.map((r, i) => `ronde ${i + 1}: ${f(r, i)}`).join("; ");
const nama = (set, id) => D.kat(set, id).nama;
const isiData = (set) => D.DATA[set].kategori.map((k) => `${k.nama} ${k.n}`).join(", ");
const hitung = (h) => `${h.set}: ${h.hitung.map(([id, n]) => `${nama(h.set, id)} ${n}`).join(", ")}`;
const rujuk = (r) => `${nama(r.set, r.k)} ${D.banyak(r.set, r.k)}`;
const urut = (r) => `${D.urutKategori(r.set, r.ids, r.dari).map((id) => `${nama(r.set, id)} ${D.banyak(r.set, id)}`).join(", ")} (dari ${D.kataAwal(r.dari)})`;
const urutAng = (r) => `${D.urutAngka(r.angka, r.dari).join(", ")} (dari ${D.kataAwal(r.dari)}; tampil ${r.angka.join(", ")})`;
const beda = (s) => `${nama(s.set, s.a)} ${D.banyak(s.set, s.a)} dan ${nama(s.set, s.b)} ${D.banyak(s.set, s.b)}: selisih ${D.hasilBeda(s)}`;
const lebih = (s) => `${D.tanyaLebih(s)} jawaban ${D.hasilLebih(s)}`;
const bs = (r) => `${r.length} pernyataan, ${r.filter((p) => p.benar).length} benar`;
const tabel = (r) => `${r.judul}: ${r.baris.map((b) => `${b.label}=${b.jawab}`).join(", ")}`;
const detektif = (s, i) => `soal ${i + 1} (${s.set}): ${s.klue.map((k) => D.teksKlue(s.set, k)).join(" ")} jawaban ${nama(s.set, s.jawab)}`;
const semua = (s) => `${s.arah} dari ${s.acuan} (${s.set}): ${D.DATA[s.set].kategori.filter((k) => D.cocokSemua(k.id, s)).map((k) => k.nama).join(", ")}`;
const jumlah = (s) => `${D.tanyaJumlah(s)} ${D.hasilJumlah(s)}`;

const ronde = {
  A: [
    per(D.RONDE_SORTIR_A, hitung),
    per(D.RONDE_HITUNG_A, (r) => r.map(rujuk).join(", ")),
    per(D.RONDE_CATAT_A, (h) => `${hitung(h)}; ${D.aliran(h.hitung, 0).length} data`),
    per(D.RONDE_TALLY_A, (r) => r.map(rujuk).join(", ")),
    per(D.RONDE_PASANG_CA, hitung),
    per(D.RONDE_MEMORI_CA, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_PALING_CA, (set) => `${set}: paling banyak ${D.palingTunggal(set, "banyak").nama}, paling sedikit ${D.palingTunggal(set, "sedikit").nama}`),
    per(D.RONDE_URUT_CA, urut),
    per(D.RONDE_BEDA_CA, (r) => r.map(beda).join("; ")),
    per(D.RONDE_SLOT_CA, hitung),
    per(D.RONDE_BACA_PA, (r) => r.map(rujuk).join(", ")),
    per(D.RONDE_ISI_PA, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_BUAT_PA, (r) => r.map((n) => `${n} = ${D.teksKelompok(n)}`).join(", ")),
    per(D.RONDE_TEPAT_PA, (r) => r.join(", ")),
    per(D.RONDE_PASANG_PA, (r) => r.join(", ")),
    per(D.RONDE_MEMORI_PA, (r) => r.join(", ")),
    per(D.RONDE_KELOMPOK_PA, (r) => r.map((n) => `${n} = ${D.teksKelompok(n)}`).join(", ")),
    per(D.RONDE_URUT_PA, urutAng),
    per(D.RONDE_SORTIR_PA, (r) => `kurang dari 5: ${r.filter((n) => n < 5).join(", ")}; 5 atau lebih: ${r.filter((n) => n >= 5).join(", ")}`),
    per(D.RONDE_LEBIH_PA, (r) => r.map(lebih).join("; ")),
    per(D.RONDE_PASANG_QA, hitung),
    per(D.RONDE_KALIMAT_QA, (r) => r.map((s) => D.kalimatAda(s.set, s.k)).join(" ")),
    per(D.RONDE_SUSUN_QA, (r) => r.kata.join(" ")),
    per(D.RONDE_TABEL_QA, tabel),
    per(D.RONDE_BENARSALAH_QA, bs),
    D.RONDE_DETEKTIF_QA.map(detektif).join("; "),
    D.PETA_KONSEP_QA.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUT_QA, urut),
    per(D.RONDE_SEMUA_QA, semua),
    per(D.RONDE_JUMLAH_QA, (r) => r.map(jumlah).join("; ")),
  ],
  B: [
    per(D.RONDE_CATAT_B, hitung),
    per(D.RONDE_SORTIR_B, hitung),
    per(D.RONDE_GAMBAR_CB, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_PASANG_CB, hitung),
    per(D.RONDE_MEMORI_CB, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_BACA_CB, (r) => r.map(rujuk).join(", ")),
    per(D.RONDE_PALING_CB, (set) => `${set}: paling banyak ${D.palingTunggal(set, "banyak").nama}, paling sedikit ${D.palingTunggal(set, "sedikit").nama}`),
    per(D.RONDE_BEDA_CB, (r) => r.map(beda).join("; ")),
    per(D.RONDE_URUT_CB, urut),
    per(D.RONDE_SLOT_CB, hitung),
    per(D.RONDE_BACA_PB, (r) => r.join(", ")),
    per(D.RONDE_GAMBAR_PB, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_TEPAT_PB, (r) => r.join(", ")),
    per(D.RONDE_PASANG_PB, (r) => r.join(", ")),
    per(D.RONDE_MEMORI_PB, (r) => r.join(", ")),
    per(D.RONDE_URUT_PB, urutAng),
    per(D.RONDE_BACA_PB7, (r) => r.map((s) => `${s.set} ${s.tanya}${s.id ? ` ${s.id}` : ""}`).join(", ")),
    per(D.RONDE_ISI_PB, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_LEBIH_PB, (r) => r.map(lebih).join("; ")),
    per(D.RONDE_SORTIR_PB, (r) => `kurang dari 5: ${r.filter((n) => n < 5).join(", ")}; 5 atau lebih: ${r.filter((n) => n >= 5).join(", ")}`),
    per(D.RONDE_PASANG_QB, (r) => r.map(beda).join("; ")),
    per(D.RONDE_KALIMAT_QB, (r) => r.map((s) => `${D.objek(s.set, nama(s.set, s.a))} ${s.jenis === "lebih" ? "lebihnya" : "kurangnya"} ${D.hasilBedaKalimat(s)} dari ${D.objek(s.set, nama(s.set, s.b))}`).join("; ")),
    per(D.RONDE_SUSUN_QB, (r) => r.kata.join(" ")),
    per(D.RONDE_GAMBAR_QB, (set) => `${set}: ${isiData(set)}`),
    per(D.RONDE_BENARSALAH_QB, bs),
    D.RONDE_DETEKTIF_QB.map(detektif).join("; "),
    D.PETA_KONSEP_QB.map((p) => p.pusat).join("; "),
    per(D.RONDE_URUT_QB, urut),
    per(D.RONDE_SEMUA_QB, semua),
    per(D.RONDE_JUMLAH_QB, (r) => r.map(jumlah).join("; ")),
  ],
};

const berkas = { A: "mtk-2-bab8-sub-a-diagram-turus.md", B: "mtk-2-bab8-sub-b-diagram-gambar.md" };

const metodeLuar = {
  A: [
    "**Gerbang lima (five-bar gate)**: turus dikelompokkan lima-lima dengan empat garis tegak dan satu coretan miring. Cara ini dipakai di banyak negara untuk menghitung cepat tanpa kehilangan hitungan. Dasar permainan Catat Turus, Baca Turus, dan Kelompok Lima dan Sisa.",
    "**Survei kelas (data dari diri sendiri)**: siswa bertanya kepada lima belas teman lalu mencatat jawaban satu per satu. Alur data datang satu per satu pada permainan Catat Turus meniru pengalaman ini.",
    "**Kelompokkan dulu, hitung kemudian**: benda dipilah menurut jenisnya sebelum dihitung supaya tidak ada yang terlewat atau terhitung dua kali. Dasar permainan Kelompokkan Benda.",
    "**Tabel frekuensi sederhana**: kolom nama, turus, dan banyaknya. Siswa melihat bahwa turus dan bilangan menyatakan hal yang sama. Dasar permainan Lengkapi Kolom Banyak dan Isi Tabel Turus.",
    "**Pertanyaan bertingkat membaca data**: dari membaca satu baris, membandingkan dua baris (lebihnya dan kurangnya), sampai menjumlahkan beberapa baris. Dasar permainan Hitung Jumlah Data dan Lebihnya dan Kurangnya.",
    "**Detektif data (deduksi dari petunjuk)**: petunjuk seperti paling banyak, lebih dari, dan kurang dari menyisakan satu kategori. Setiap soal diperiksa uji otomatis agar hanya satu yang cocok.",
  ],
  B: [
    "**Piktogram satu lawan satu**: satu gambar mewakili satu benda. Perwakilan ini membuat banyak data terlihat langsung dari panjang baris, tanpa perlu angka.",
    "**Dari benda nyata ke gambar polos (konkret, piktorial, abstrak)**: tahap Concrete memakai gambar benda sebagai lambang, tahap Picture memakai bintang, lingkaran, hati, atau wajah tersenyum, dan tahap Abstract memakai kalimat dan angka.",
    "**Keterangan dan judul diagram**: siswa dilatih membaca judul dan keterangan sebelum menjawab, kebiasaan utama membaca data dengan benar.",
    "**Menghitung dari kiri ke kanan tanpa celah**: gambar disusun rapat dengan jarak sama supaya baris yang lebih panjang benar-benar berarti lebih banyak.",
    "**Membandingkan baris dengan garis bilangan**: lebihnya dan kurangnya dicari dengan menghitung maju dan mundur pada garis bilangan.",
    "**Presentasi data**: sebutkan judul, ceritakan yang paling banyak dan paling sedikit, lalu lebihnya dan kurangnya. Dasar kegiatan Ayo Berkarya.",
  ],
};

function tulis(s) {
  const k = s.id;
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  const jumlahKetukan = s.videos.reduce((n, v) => n + v.adegan.reduce((m, a) => m + a.ketukan.length, 0), 0);
  const L = [];
  L.push(`# Naskah Matematika Kelas 2 SD, Bab 8: Berbagai Diagram, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-k2b8.ts\` dan \`src/components/modul/data-k2b8.ts\`, oleh \`scripts/buat-naskah-md-k2b8.mjs\`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 8 hlm. 225–250) dan Buku Panduan Guru Bab 8 (kunci jawaban dan langkah pembelajaran), serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push("| Butir | Isi |");
  L.push("|---|---|");
  L.push(`| Modul | \`mtk-2-bab8\`, sub-bab ${k} |`);
  L.push("| Berkas data | `src/data/kelas2-bab8.json` (dibangkitkan `src/content-master/buat-k2-bab8.mjs`, lalu `npm run sync:keys`) |");
  L.push("| Kode bab di server | `k2-mat-bab8` (belum ada seed server karena soal belum ada) |");
  L.push("| Fase dan kelas | `FASE_A`, kelas 2 SD |");
  L.push(`| Elemen | ${N.K2B8_META.silabusElemen} |`);
  L.push("| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |");
  L.push("| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |");
  L.push("| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |");
  L.push("| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu \"sedang disiapkan\". Tab Simulasi tidak tampil. |");
  L.push("| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 8. |");
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
  L.push(`| C. Concrete | Benda nyata: ${k === "A" ? "kelompokkan, hitung, catat turus, buat turus, jodohkan, urutkan" : "tempel gambar benda, susun diagram gambar, baca baris, bandingkan baris"} | ${s.games.filter((g) => g.stage === "Concrete").length} permainan |`);
  L.push(`| P. Picture | Diagram polos: ${k === "A" ? "turus, tabel turus, kelompok lima, garis bilangan" : "baris bintang, lingkaran, hati, atau wajah tersenyum, tabel diagram, garis bilangan"} | ${s.games.filter((g) => g.stage === "Picture").length} permainan |`);
  L.push(`| A. Abstract | Kata dan angka: kalimat data, benar-salah, tabel, detektif, peta konsep, urutkan | ${s.games.filter((g) => g.stage === "Abstract").length} permainan |`);
  L.push("");
  L.push("Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: gambar benda hanya di Concrete, Picture hanya diagram tanpa gambar benda (turus, lambang polos, tabel, garis bilangan).");
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
  L.push("- Angka kumpulan data buah, hewan ternak, mainan, sayur, bunga, parsel, kue, permainan tradisional, warna, pelari, dan kaleng mengikuti buku siswa dan dicek dengan kunci jawaban Buku Panduan Guru. Data olahraga, cara berangkat ke sekolah, dan sebagian pilihan permainan adalah contoh tambahan yang dibuat untuk pengayaan.");
  if (k === "A") L.push("- Turus digambar dengan garis kelima mencoret miring (gerbang lima). Pada layar kecil, turus dengan lebih dari tiga belas goresan tidak dipakai.");
  if (k === "B") L.push("- Lambang polos (bintang, lingkaran, hati, wajah tersenyum) digambar dengan SVG. Gambar benda hanya muncul di tahap Concrete dan infografis.");
  L.push("");
  return `${L.join("\n")}\n`;
}

for (const s of N.SUB_BAB_K2B8) {
  fs.writeFileSync(`naskah/${berkas[s.id]}`, tulis(s));
  console.log(`naskah/${berkas[s.id]}`);
}

/* Naskah video: ringkasan dan prinsip. */
const V = [];
V.push("# Video cerita Kelas 2 Bab 8 (Tahap 1: Story)");
V.push("");
V.push("Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.");
V.push("");
V.push("## Prinsip");
V.push("");
V.push("- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.");
V.push("- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.");
V.push("- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b8.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.");
V.push("- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.");
V.push("- **Turus dan lambang bergerak.** Turus (`TurusSvg`) digambar dari data dengan goresan kelima mencoret miring, tabel diagram (`TabelSvg`) menampilkan baris satu per satu, dan lambang polos (`LambangVideo`) disusun mengikuti kalimat yang dibacakan.");
V.push("- **Tema warna** biru ungu royal, kuning emas, putih.");
V.push("");
V.push("## Isi video");
V.push("");
for (const s of N.SUB_BAB_K2B8) {
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
V.push("- Gambar bersama: `src/components/modul/video-k2b8-umum.tsx` (turus, lambang, tabel diagram, awan data, baris gambar benda).");
V.push("- Adegan: `video-k2b8a.tsx` dan `video-k2b8b.tsx`.");
V.push("- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab8-A` dan `-B`, bidang `Cerita`.");
V.push("- Uji: `scripts/uji-data-k2b8.mjs` dan `scripts/uji-statis-k2b8.mjs`.");
V.push("");
fs.writeFileSync("naskah/mtk-2-bab8-video-cerita.md", `${V.join("\n")}\n`);
console.log("naskah/mtk-2-bab8-video-cerita.md");
