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
    buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1",
    berkas: { A: "sub-a-bilangan-dan-lambang", B: "sub-b-nilai-tempat", C: "sub-c-membandingkan-mengurutkan", D: "sub-d-penjumlahan-sampai-100", E: "sub-e-pengurangan-sampai-100", F: "sub-f-perkalian-sampai-100", G: "sub-g-pembagian-sampai-100" },
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
      C: [
        "**Nilai tempat sebagai aturan membandingkan**: bilangan dibandingkan dari tempat paling kiri (ratusan), lalu puluhan, lalu satuan. Dasar permainan Tempat yang Menentukan dan Ratusan Sama, Lihat Berikutnya.",
        "**Tanda mulut buaya**: tanda lebih dari dan kurang dari seperti mulut yang terbuka ke arah bilangan yang lebih besar. Cara ini membantu siswa tidak menukar tanda.",
        "**Kumpulan benda dan model blok untuk perbandingan**: dus, bungkus, dan benda lepas (Concrete) serta lempeng, batang, dan kotak (Picture) membuat selisih terlihat sebelum ditulis dengan tanda.",
        "**Mengurutkan dengan memilih yang terkecil berulang**: cari yang paling kecil, lalu yang paling kecil dari sisanya. Dasar permainan Urutkan Kumpulan, Urutkan Blok, dan Urutkan Lambang.",
        "**Bilangan di antara dua bilangan**: siswa menemukan bilangan yang lebih dari batas bawah dan kurang dari batas atas (639 < 709 < 720).",
        "**Detektif perbandingan**: petunjuk lebih dari, kurang dari, dan angka tertentu menyisakan satu bilangan. Setiap soal diperiksa uji otomatis.",
      ],
      D: [
        "**Penukaran sepuluh ke satu saat menyimpan**: sepuluh benda lepas ditukar satu bungkus. Permainan Gabungkan Kumpulan memakai penukaran otomatis agar aturan menyimpan terlihat langsung.",
        "**Susun pendek dan susun panjang**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (54 = 50 + 4), susun pendek menuliskannya ke bawah.",
        "**Pilah soal menyimpan dan tanpa menyimpan**: siswa memeriksa satuan dulu. Bila berjumlah sepuluh atau lebih, soal itu perlu menyimpan.",
        "**Urutan langkah penjumlahan bersusun**: menyusun, menjumlahkan satuan, menyimpan, menjumlahkan puluhan, lalu memeriksa. Dasar permainan Urutkan Langkah Menjumlahkan.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa menyimpan (kurang sepuluh) dan salah menyimpan (lebih sepuluh).",
        "**Soal cerita tiga bilangan**: Ayo Berlatih 5 dipakai langsung, termasuk menjumlahkan tiga bilangan dua-dua.",
      ],
      E: [
        "**Menukar satu puluhan menjadi sepuluh satuan**: bila benda lepas tidak cukup, satu bungkus dibuka menjadi sepuluh benda. Permainan Rakit Sisa dan Hitung Sisa memakai penukaran ini agar aturan mengambil terlihat langsung.",
        "**Susun pendek dan susun panjang pengurangan**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (45 = 30 + 15), susun pendek menuliskannya ke bawah dengan angka pinjaman merah.",
        "**Pilah soal mengambil dan tanpa mengambil**: siswa memeriksa satuan dulu. Bila satuan atas lebih kecil dari satuan bawah, soal itu perlu mengambil satu puluhan.",
        "**Memeriksa dengan penjumlahan (operasi kebalikan)**: hasil pengurangan ditambah bilangan pengurang harus sama dengan bilangan awal (26 + 19 = 45). Metode ini dipakai di video, poin penting, dan Peta Konsep.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa mengambil (lebih sepuluh) dan salah mengambil (kurang sepuluh).",
        "**Soal cerita sisa dan selisih**: Ayo Berlatih 4 dipakai langsung. Selisih dua banyak benda juga dicari dengan pengurangan.",
      ],
      F: [
        "**Kelompok yang sama banyak (piring dan kotak titik)**: benda disusun pada piring dengan isi sama (Concrete), lalu diganti kotak berisi titik polos (Picture). Permainan Rakit Piring dan Rakit Kotak Titik memakai mesin yang sama dengan gambar berbeda.",
        "**Penjumlahan berulang sebagai dasar perkalian**: 5 × 2 ditulis 2 + 2 + 2 + 2 + 2. Permainan Tulis Penjumlahan Berulang dan Dari Penjumlahan ke Perkalian melatih perpindahan dua arah.",
        "**Loncatan pada garis bilangan**: k loncatan sama besar dari nol mendarat di k × n. Siswa mengetuk titik pendaratan pada garis enam titik.",
        "**Menukar tempat bilangan (sifat komutatif)**: 5 × 6 = 6 × 5. Dua susunan piring dibandingkan, lalu soal Tukar Faktor menguji hasilnya.",
        "**Banyak kelompok dan isi tiap kelompok**: bilangan pertama pada perkalian adalah banyak kelompok, bilangan kedua isi tiap kelompok. Pengecoh sengaja memuat satu kelompok lebih dan satu kelompok kurang.",
        "**Aktivitas 4 dengan gelas dan kerikil**: kegiatan buku diwujudkan dalam video (5 gelas × 4 kerikil dan 4 gelas × 7 kerikil) dan permainan Papan Hasil Kelompok.",
      ],
      G: [
        "**Bagikan bergiliran (Aktivitas 5)**: ketua membagikan satu benda ke tiap piring, lagi dan lagi, sampai tumpukan habis. Mesin Bagikan Bergiliran menampilkan kalimat pengurangan berulang yang bertambah panjang tiap putaran.",
        "**Pembagian sebagai pengurangan berulang**: 15 : 3 = 5 karena 15 − 3 − 3 − 3 − 3 − 3 = 0. Permainan Tulis Pengurangan Berulang dan Loncat Mundur pada Garis Bilangan melatih dua cara menulisnya.",
        "**Hubungan perkalian dan pembagian**: Catatan Penting buku (hasil bagi × pembagi = bilangan yang dibagi). Permainan Periksa dengan Perkalian dan Jodohkan Pembagian dan Perkalian memakai ini.",
        "**Rakit kotak sebagai pembagian terukur**: diketahui total titik dan isi tiap kotak, siswa mencari banyak kotak. Mesin yang sama dengan perkalian dipakai dengan arah berlawanan.",
        "**Pembagian khusus**: bilangan dibagi 1 tetap bilangan itu, dan bilangan dibagi bilangan yang sama hasilnya 1. Soal Ayo Berlatih 1 (4 : 1, 9 : 1, 10 : 10) dipakai langsung.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat satu kali pengurangan lebih banyak atau lebih sedikit, serta hasil bagi satu lebih atau satu kurang.",
      ],
    },
  },
};

// Kelas 3 Bab 2 (Kalimat Matematika): dua sub-bab.
KONFIG.k3b2 = {
  kelas: 3,
  bab: 2,
  judul: "Kalimat Matematika",
  buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 75–98) dan Buku Panduan Guru Bab 2",
  berkas: { A: "sub-a-kalimat-matematika-penjumlahan", B: "sub-b-kalimat-matematika-pengurangan" },
  metodeLuar: {
    A: [
      "**Bagan bagian-keseluruhan (bar model)**: jumlah semua digambar sebagai batang atas dan dua bagian sebagai batang di bawahnya. Batang yang belum diketahui bertanda tanya. Dasar permainan Hitung Bagan dan Jodohkan Bagan dan Kalimat.",
      "**Operasi kebalikan**: jumlah dikurangi bagian yang diketahui sama dengan bagian yang belum diketahui. Penjumlahan dan pengurangan saling berkaitan, jadi hasilnya diperiksa dengan menjumlahkan lagi.",
      "**Kumpulan benda berbungkus sepuluh**: kalimat Matematika digambar sebagai kumpulan benda dengan kotak bertanda tanya. Permainan Rakit yang Belum Diketahui memakai penukaran sepuluh-ke-satu.",
      "**Titik-titik di depan atau di tengah**: Contoh buku memuat 8 + … = 19 dan … + 16 = 54. Permainan Pilah Bagan melatih membedakan letak titik-titik.",
      "**Banyak kemungkinan (Ayo Berpikir)**: bila hanya jumlahnya yang diketahui, banyak pasangan bilangan mungkin. Permainan Kemungkinan Pasangan Bilangan memakai buku di perpustakaan (100) dan tiket film (95).",
      "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh (lupa menyimpan atau meminjam) dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui.",
    ],
    B: [
      "**Bagan bilangan awal dan bagian**: pada pengurangan, batang atas adalah bilangan awal, dan dua batang di bawahnya adalah bagian yang dikurangkan serta sisa. Dasar permainan Hitung Bagan dan Papan Nilai dari Bagan.",
      "**Dua arah operasi kebalikan**: mencari bilangan yang dikurangkan dengan mengurangkan bilangan awal dengan sisa (80 − 45 = 35), dan mencari bilangan awal dengan menambahkan (45 + 27 = 72).",
      "**Kumpulan benda berbungkus sepuluh**: kumpulan awal, bagian yang diambil, dan sisa digambar sebagai kumpulan benda dengan kotak bertanda tanya.",
      "**Titik-titik di depan atau di tengah**: 32 − … = 15 (titik-titik di tengah) dan … − 12 = 26 (titik-titik di depan) memakai cara berbeda. Permainan Pilah Bagan dan Langkah Menyelesaikan melatihnya.",
      "**Banyak kemungkinan (Ayo Berpikir)**: telur di pasar (100) dan televisi di toko (40). Bila hanya bilangan awal yang diketahui, ada banyak pasangan terjual dan sisa yang mungkin.",
      "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui atau membalik tanda.",
    ],
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
