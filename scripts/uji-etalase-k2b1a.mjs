// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab A ("Kue Kiriman dari Dapur"), awal cerita Kue di Kantin Sekolah.
// Memeriksa: etalase kaca bertingkat (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), gulungan karcis dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// dua belas angka jawaban tidak kembar per tahap, batas rupa, tata letak kanvas, pengenal ucapan sampai lima puluh, simulasi Kotak Kue dan usulan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-etalase-k2b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/etalase-k2b1a/logika.ts");
const D = await import("../src/components/modul/etalase-k2b1a/data.ts");
const K = await import("../src/components/modul/etalase-k2b1a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab1.ts");
const folderUrl = new URL("../src/components/modul/etalase-k2b1a/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku/i.test(t) && !/nilai tempat/i.test(t);
const TOKOH = ["Chacha", "Dika", "Nia", "Bu Sari"];
// Hasil hitungan Story: 36 (dan 3, 6, 10, 30), nomor antrean 34 35 36, 38 (antara 37 dan 39), contoh global 17, 40, 25, 28.
const STORY = [10, 17, 25, 28, 30, 34, 35, 36, 37, 38, 39, 40];

/* ------------------------------ Dasar ------------------------------ */
{
  sama(L.URUT_METODE, ["igil", "bingkai", "loncat", "lanjut"], "urutan metode");
  cek(L.NAMA_METODE.igil === "Metode IGIL: Hitung dan Kemas Sepuluh" && L.NAMA_METODE.bingkai.startsWith("Ten Frame") && L.NAMA_METODE.loncat.startsWith("Skip Counting") && L.NAMA_METODE.lanjut.startsWith("Counting On"), "nama Inggris di judul soal");
  sama([0, 5, 9, 10, 11, 14, 19, 20, 26, 30, 41, 47, 50].map(L.kata), ["nol", "lima", "sembilan", "sepuluh", "sebelas", "empat belas", "sembilan belas", "dua puluh", "dua puluh enam", "tiga puluh", "empat puluh satu", "empat puluh tujuh", "lima puluh"], "kata bilangan sampai lima puluh");
  const kemas = { tipe: "kemas", set: "lapis", n: 24 };
  const bingkai = { tipe: "bingkai", set: "lapis", n: 26 };
  const loncat = { tipe: "loncat", set: "lapis", k: 3, r: 2 };
  const lanjut = { tipe: "lanjut", set: "lapis", awal: 41, b: 4 };
  const mundur = { tipe: "lanjut", set: "lapis", awal: 24, b: 5, mundur: true };
  sama([kemas, bingkai, loncat, lanjut, mundur].map((x) => L.kunciLangkah(x)), [24, 26, 32, 45, 19], "kunci tiap jenis langkah");
  sama([kemas, bingkai, loncat, lanjut].map((x) => L.metodeLangkah(x)), ["igil", "bingkai", "loncat", "lanjut"], "metode tiap jenis langkah");
  sama([L.puluhan(47), L.satuan(47), L.puluhan(50), L.satuan(50)], [4, 7, 5, 0], "puluhan dan satuan");
  for (const x of [kemas, bingkai, loncat, lanjut, mundur, { ...loncat, r: 0 }, { ...kemas, n: 20 }]) {
    const n = L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n), `kalimat kunci ${x.tipe} tanpa digit ("${n}")`);
  }
  cek(L.kalimatTanya(lanjut) === "Berapa banyak semuanya?" && L.kalimatTanya(mundur) === "Berapa sisanya?", "kalimat tanya");
  sama(L.pilihanDari(bingkai), [16, 26, 36], "pilihan memuat kunci dan puluhan yang keliru");
  cek(L.pilihanDari({ ...kemas, n: 48 }).every((v) => v >= 1 && v <= 50) && new Set(L.pilihanDari({ ...kemas, n: 48 })).size === 3, "pilihan paling besar lima puluh");
  sama(L.sesuaikan("Ketuk tiap kue di kotak kue.", "diagram"), "Ketuk tiap titik di kotak.", "sesuaikan: Pictorial menyebut titik dan kotak");
  sama(L.sesuaikan("Ketuk tiap kue.", "benda"), "Ketuk tiap kue.", "sesuaikan: Concrete tetap kue");
}

/* ------------------------------ Mind-map etalase kaca ------------------------------ */
{
  const t = D.TEMPAT_ETALASE;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "etalase: tiga masalah, tujuh sekat bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "etalase: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "etalase: sekat bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["geser tiap benda", "kemas per sepuluh", "bingkai sepuluh", "hitung meloncat", "hitung lanjut", "puluhan dan satuan", "maju, mundur", "lengkapi urutan"]) cek(gab.includes(k), `etalase: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["terhitung pasti", "puluhan", "satuan", "terbaca dan tertulis", "urutan bilangan"]) cek(hasil.includes(k), `etalase: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/belum diketahui/.test(masalah) && /dua kali/.test(masalah) && /berubah-ubah/.test(masalah), "etalase: masalah belum diketahui, terhitung dua kali, hasil berubah-ubah");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|kantin|etalase|kue|karcis|antrean|dapur|nampan|krim)\b/i.test(x.kunci)), "etalase: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "etalase: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_ETALASE + D.PETUNJUK_URUT_ETALASE) && bersih(D.SUARA_ETALASE), "etalase: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_ETALASE).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "etalase: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "etalase: sekat bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis gulungan karcis ------------------------------ */
{
  const b = D.BARIS_GULUNGAN;
  sama(b.length, 5, "gulungan: lima karcis");
  sama(b.map((x) => x.banyak), ["36", "34", "35", "38", "28"], "gulungan: bilangan dari Story (kue lapis 36, antrean 34 dan 35, sobek 38, Hitung Lanjut 28)");
  sama(b.map((x) => x.dibaca), [36, 34, 35, 38, 28].map(L.kata), "gulungan: nama bilangan benar");
  sama(b.map((x) => x.jumlah), ["30 + 6", "30 + 4", "30 + 5", "30 + 8", "20 + 8"], "gulungan: puluhan ditambah satuan");
  cek(b.every((x) => Number(x.jumlah.split(" + ")[0]) + Number(x.jumlah.split(" + ")[1]) === Number(x.banyak) && Number(x.jumlah.split(" + ")[0]) === L.puluhan(Number(x.banyak)) * 10), "gulungan: tiap penjumlahan sama dengan bilangannya");
  sama(D.TEMPAT_GULUNGAN.length, 15, "gulungan: lima belas kotak");
  cek(new Set(D.TEMPAT_GULUNGAN.map((x) => x.kunci)).size === 15, "gulungan: label unik");
  cek(D.TEMPAT_GULUNGAN.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_GULUNGAN) && bersih(D.SUARA_GULUNGAN), "gulungan: label pendek, suara tanpa digit");
  cek(D.KOLOM_GULUNGAN.length === 3 && Object.keys(D.KELOMPOK_GULUNGAN).every((k2) => D.TEMPAT_GULUNGAN.some((x) => x.kelompok === k2)), "gulungan: tiga kolom");
  cek(Object.values(D.KELOMPOK_GULUNGAN).every(tanpaDigit), "gulungan: petunjuk kolom tanpa digit");
  cek(b.every((x) => bersih(x.nama)), "gulungan: nama karcis bersih");
}

/* ------------------------------ CPA ------------------------------ */
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Kotak Kue (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah));
  cek(new Set(angka).size === angka.length && angka.length === 12, `${nama}: dua belas angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 11 && n <= 50), `${nama}: angka sebelas sampai lima puluh (${angka.join(",")})`);
  cek(angka.every((n) => !STORY.includes(n)), `${nama}: jawaban tidak sama dengan hasil hitungan Story (${angka.join(",")})`);
  cek(angka.every((n) => n > 9), `${nama}: semua jawaban dua angka (dua kotak tulis)`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 1 && l.jawabTokoh <= 50), `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut[0] !== l.benar && urut.length === 3, `${nama}: alasan benar bukan tombol pertama (urutan ${urut.join("")}, benar ${l.benar})`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && bersih(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(kunci) && (l.jawabTokoh === undefined || L.pilihanDari(l).includes(l.jawabTokoh)), `${nama}: pilihan memuat kunci dan jawaban tokoh`);
    cek(L.petunjukSalah(l, l.jawabTokoh ?? -1).length > 10, `${nama}: petunjuk salah tersedia`);
    if (l.jawabTokoh !== undefined) cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }
  // Seed dari alur.
  const ss = salah[0].langkah;
  if (rupa === "benda") cek(ss.dasar.tipe === "kemas" && ss.tokoh === "Chacha" && ss.jawabTokoh === L.kunciLangkah(ss.dasar) + 1 && /Geser atau tandai/.test(ss.alasan.join(" ")) && /tanpa menandai/.test(ss.kataTokoh), `${nama}: Chacha menghitung tanpa menandai, satu kue terhitung dua kali (alasan: geser atau tandai)`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "bingkai" && ss.tokoh === "Nia" && ss.dasar.n === 27 && ss.jawabTokoh === 17 && /sepuluh ditambah tujuh/.test(ss.kataTokoh) && /dua bingkai penuh/.test(ss.alasan.join(" ")), `${nama}: Nia menyebut sepuluh ditambah tujuh padahal dua bingkai penuh`);
  if (rupa === "lambang") cek(ss.dasar.tipe === "lanjut" && ss.tokoh === "Dika" && ss.jawabTokoh === L.kunciLangkah(ss.dasar) - 1 && /Bilangan awal tidak dihitung lagi/.test(ss.alasan.join(" ")), `${nama}: Dika ikut menghitung bilangan awal`);

  const tipe = [];
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    cek(D.SETS[l.set] !== undefined, `${lbl}: jenis kue ${l.set} ada`);
    if (l.tipe === "kemas") {
      sama(k, l.n, `${lbl}: kunci kemas dihitung ulang`);
      cek(l.n >= 11 && l.n <= 49, `${lbl}: banyak kue sebelas sampai empat puluh sembilan`);
      if (x.cara === "klik" && rupa !== "lambang") cek(l.n <= 24, `${lbl}: klik memindahkan paling banyak dua puluh empat kue`);
      if (x.cara === "kanvas") cek(L.satuan(l.n) >= 1 && L.satuan(l.n) <= 9, `${lbl}: kanvas menandai kue lepas (satu sampai sembilan)`);
    }
    if (l.tipe === "bingkai") {
      sama(k, l.n, `${lbl}: kunci bingkai dihitung ulang`);
      cek(l.n % 10 !== 0 && l.n >= 11 && l.n <= 49, `${lbl}: bingkai terakhir terisi sebagian (bukan kelipatan sepuluh)`);
    }
    if (l.tipe === "loncat") {
      sama(k, l.k * 10 + l.r, `${lbl}: kunci loncat dihitung ulang`);
      cek(l.k >= 2 && l.k <= 5 && l.r >= 0 && l.r <= 9, `${lbl}: dua sampai lima kotak penuh dan paling banyak sembilan kue lepas`);
      if (x.cara === "klik" && rupa !== "lambang") cek(l.k + l.r <= 13, `${lbl}: klik paling banyak tiga belas ketukan`);
      if (x.cara === "kanvas" && rupa !== "lambang") cek(l.k <= 4, `${lbl}: kanvas menandai paling banyak empat kotak`);
    }
    if (l.tipe === "lanjut") {
      sama(k, l.mundur ? l.awal - l.b : l.awal + l.b, `${lbl}: kunci lanjut dihitung ulang`);
      cek(l.b >= 2 && l.b <= 8 && l.awal >= 11 && l.awal <= 49 && k >= 1 && k <= 50, `${lbl}: bilangan awal dan hitungan dalam batas`);
      cek(JSON.stringify([l.awal, l.b]) !== JSON.stringify([25, 3]), `${lbl}: berbeda dari contoh metode global`);
    }
    tipe.push(l.tipe);
    const p = L.pilihanDari(x.langkah);
    cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 1 && v <= 50), `${lbl}: pilihan memuat kunci`);
    for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10 && bersih(L.petunjukSalah(x.langkah, m)), `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 300, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    cek(/kue|titik|kotak|bingkai|bilangan|hitung/i.test(x.suara) || x.langkah.tipe === "salah", `${lbl}: instruksi menyebut bendanya`);
    cek(L.NAMA_METODE[x.metode].length > 10, `${lbl}: nama metode di judul soal`);
    if (rupa === "diagram") cek(!/\bkue\b/i.test(x.suara.replace(/kue lapis/g, "")) || x.langkah.tipe === "salah", `${lbl}: Pictorial tanpa kata kue (${x.suara})`);
    if (rupa === "diagram" && x.langkah.tipe !== "salah") cek(/titik|kotak|bingkai|bilangan|hitung/i.test(x.suara), `${lbl}: Pictorial menyebut titik, kotak, atau bingkai`);
  }
  cek(new Set(tipe).size === 4, `${nama}: keempat jenis langkah dipakai`);
  // Kegiatan beragam: memindahkan (kemas klik), menandai (kanvas), membaca dan menghitung bingkai, lingkari, mundur.
  cek(semua.some((x) => x.langkah.tipe === "lanjut" && x.langkah.mundur) || nama === "Abstract" || semua.some((x) => L.dasarDari(x.langkah).tipe === "lanjut" && L.dasarDari(x.langkah).mundur), `${nama}: ada hitungan mundur`);
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)));
  cek(semua.some((l) => l.tipe === "lanjut" && l.mundur) && semua.some((l) => l.tipe === "lanjut" && !l.mundur), "kegiatan beragam: hitung maju dan hitung mundur");
  cek(semua.some((l) => l.tipe === "loncat" && l.r === 0) && semua.some((l) => l.tipe === "loncat" && l.r > 0), "kegiatan beragam: loncat tepat dan loncat dengan kue lepas");
  cek(new Set(semua.map((l) => l.set)).size >= 5, "kegiatan beragam: paling sedikit lima jenis kue");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["menandai", "kemas", "puluhan", "satuan", "bingkai", "meloncat", "lanjut", "maju", "mundur", "urutan", "perkirakan"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)) || (k === "menandai" && D.POIN_PENTING.some((p) => /tandai/i.test(p))), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.JEMBATAN + D.JEMBATAN_SUARA) && /Sub-Bab B/.test(D.JEMBATAN) && /puluhan dan satuan/.test(D.JEMBATAN) && /bukan tiga saja/.test(D.JEMBATAN) && bersih(D.JEMBATAN), "jembatan ke Sub-Bab B: pertanyaan angka tiga pada tiga puluh enam dan puluhan dan satuan");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_ETALASE === D.CONCRETE && D.PICTORIAL_ETALASE === D.PICTORIAL && D.ABSTRACT_ETALASE === D.ABSTRACT && D.TEMA_ETALASE === D.TEMA_TAHAP && typeof D.MISI_KOTAK === "string", "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
  for (const s of Object.values(D.SETS)) cek(tanpaDigit(s.nama) && bersih(s.nama) && [...s.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d) && /^#[0-9A-F]{6}$/i.test(s.warna), `jenis kue ${s.id}: nama bersih, emoji sampai U+1FA95`);
  cek(new Set(Object.values(D.SETS).map((s) => s.emoji)).size === Object.keys(D.SETS).length, "jenis kue: emoji unik");
}

/* ------------------------------ Kanvas, tata letak, dan ucapan ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  // Kotak kue.
  for (const y0 of [K.KOTAK.y0, K.Y_KOTAK_KLIK, 22])
    for (let total = 1; total <= 5; total += 1) {
      const pos = Array.from({ length: total }, (_, i) => K.letakKotak(i, total, y0));
      cek(pos.every((p) => p.x > 2 && p.x + K.KOTAK.w < W - 2 && p.y > 20 && p.y + K.KOTAK.h < 118), `${total} kotak kue (y ${y0}) masuk kanvas dan di atas baris kue lepas`);
      let minJ = 999;
      for (let a = 0; a < total; a += 1) for (let b = a + 1; b < total; b += 1) minJ = Math.min(minJ, jarak(K.pusatKotak(a, total, y0), K.pusatKotak(b, total, y0)));
      cek(total < 2 || (minJ > 2 * K.JARI_KOTAK && pos.every((p, a) => pos.every((q, b) => a === b || p.x + K.KOTAK.w <= q.x || q.x + K.KOTAK.w <= p.x || p.y + K.KOTAK.h <= q.y || q.y + K.KOTAK.h <= p.y))), `${total} kotak kue: tidak bertumpuk dan jari tanda tidak melewati tetangga (jarak terdekat ${minJ.toFixed(1)})`);
    }
  {
    const p = K.letakKotak(0, 1);
    const slot = Array.from({ length: 10 }, (_, j) => K.letakSlot(p, j));
    cek(slot.every((s) => s.x - K.UKURAN_SLOT / 2 >= p.x && s.x + K.UKURAN_SLOT / 2 <= p.x + K.KOTAK.w && s.y - K.UKURAN_SLOT / 2 >= p.y && s.y + K.UKURAN_SLOT / 2 <= p.y + K.KOTAK.h) && new Set(slot.map((s) => `${s.x},${s.y}`)).size === 10, "sepuluh lubang kue di dalam kotak dan tidak kembar");
  }
  // Kue lepas.
  for (let n = 1; n <= 9; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakLepas(i, n));
    cek(xs.every((t) => t.x - 15 > 2 && t.x + 15 < W - 2 && t.y + 15 < H - 20) && (n < 2 || xs[1].x - xs[0].x >= 2 * K.JARI_LEPAS) && xs.every((t) => t.y - 12 > 118), `${n} kue lepas masuk kanvas, di bawah kotak, jari tanda tidak melewati tetangga`);
  }
  // Kolam kue (Klik, Metode IGIL).
  for (let n = 1; n <= 24; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakKolam(i));
    cek(xs.every((t) => t.x - 15 > 2 && t.x + 15 < W - 2 && t.y - 15 > 100 && t.y + 15 < H - 2) && new Set(xs.map((t) => `${t.x},${t.y}`)).size === n, `${n} kue di kolam masuk kanvas dan tidak kembar`);
  }
  cek(K.letakKolam(1).x - K.letakKolam(0).x >= K.UKURAN_KOLAM + 6 && K.letakKolam(8).y - K.letakKolam(0).y >= K.UKURAN_KOLAM + 4, "kolam kue tidak bertumpuk");
  cek(K.Y_KOTAK_KLIK + K.KOTAK.h < 92, "Klik Metode IGIL: kotak di atas hitungan berjalan");
  // Bingkai.
  for (let total = 1; total <= 5; total += 1) {
    const pos = Array.from({ length: total }, (_, i) => K.letakBingkai(i, total));
    cek(pos.every((p) => p.x > 2 && p.x + K.BINGKAI.w < W - 2 && p.y > 24 && p.y + K.BINGKAI.h < K.Y_HITUNGAN - 14), `${total} bingkai masuk kanvas dan di atas hitungan berjalan`);
    cek(pos.every((p, a) => pos.every((q, b) => a === b || p.x + K.BINGKAI.w <= q.x || q.x + K.BINGKAI.w <= p.x || p.y + K.BINGKAI.h <= q.y || q.y + K.BINGKAI.h <= p.y)), `${total} bingkai tidak bertumpuk`);
  }
  {
    const p = K.letakBingkai(0, 1);
    const sel = Array.from({ length: 10 }, (_, j) => K.letakSel(p, j));
    cek(sel.every((s) => s.x - K.UKURAN_SEL / 2 >= p.x && s.x + K.UKURAN_SEL / 2 <= p.x + K.BINGKAI.w && s.y - 8 >= p.y && s.y + 8 <= p.y + K.BINGKAI.h) && new Set(sel.map((s) => `${s.x},${s.y}`)).size === 10, "sepuluh sel bingkai di dalam bingkai dan tidak kembar");
  }
  // Hitung lanjut.
  const lj = Array.from({ length: 8 }, (_, i) => K.letakLanjut(i));
  cek(lj.every((t) => t.x - 18 > K.KARTU_AWAL.x + K.KARTU_AWAL.w && t.x + 18 < W - 2 && t.y - 18 > 24 && t.y + 18 < K.Y_HITUNGAN - 14) && lj[1].x - lj[0].x >= 2 * K.JARI_LANJUT && lj[4].y - lj[0].y >= 2 * K.JARI_LANJUT, "delapan kue lepas masuk kanvas, di kanan kartu bilangan awal, jari tanda tidak melewati tetangga");
  cek(K.KARTU_AWAL.x > 2 && K.KARTU_AWAL.y + K.KARTU_AWAL.h < K.Y_HITUNGAN - 14, "kartu bilangan awal masuk kanvas");
  // Pemeriksa kanvas.
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const lepas = Array.from({ length: 6 }, (_, i) => K.letakLepas(i, 6));
  cek(K.periksaCentang(lepas.map(coret), lepas, K.JARI_LEPAS).benar && !K.periksaCentang([...lepas.map(coret), coret(lepas[1])], lepas, K.JARI_LEPAS).benar && !K.periksaCentang(lepas.slice(1).map(coret), lepas, K.JARI_LEPAS).benar, "kemas: tanda di tiap kue lepas, satu kue satu tanda");
  const kotak = Array.from({ length: 4 }, (_, i) => K.pusatKotak(i, 4));
  cek(K.periksaCentang(kotak.map(coret), kotak, K.JARI_KOTAK).benar && !K.periksaCentang(kotak.slice(1).map(coret), kotak, K.JARI_KOTAK).benar, "loncat: tanda di tiap kotak penuh");
  const lanjutP = Array.from({ length: 5 }, (_, i) => K.letakLanjut(i));
  cek(K.periksaCentang(lanjutP.map(coret), lanjutP, K.JARI_LANJUT).benar && !K.periksaCentang([...lanjutP.map(coret), coret(K.KARTU_AWAL)], lanjutP, K.JARI_LANJUT).benar, "lanjut: tanda di tiap kue lepas, bukan di kartu bilangan awal");
  for (const total of [3, 4, 5]) {
    const pusat = Array.from({ length: total }, (_, i) => K.pusatBingkai(i, total));
    const sasaran = pusat.map((_, i) => i === total - 1);
    cek(K.periksaLingkari([lingkar(pusat[total - 1], 44, 24)], pusat, sasaran).benar && !K.periksaLingkari([lingkar(pusat[total - 1], 400, 120)], pusat, sasaran).benar, `bingkai (${total}): melingkari bingkai yang belum penuh`);
  }
  // Ucapan sampai lima puluh.
  for (const x of [1, 7, 10, 11, 14, 19, 20, 21, 26, 30, 31, 39, 40, 45, 47, 49, 50]) sama(K.bilanganDariUcapan50(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
  sama(K.bilanganDariUcapan50("empat puluh lima"), [45], "ucapan: empat puluh lima satu bilangan");
  sama(K.bilanganDariUcapan50("Dua puluh enam, eh tiga puluh"), [26, 30], "ucapan: dua bilangan berurutan");
  sama(K.bilanganDariUcapan50("tigapuluh tujuh"), [37], "ucapan: digabung tanpa spasi");
  sama(K.bilanganDariUcapan50("empatpuluh"), [40], "ucapan: kelipatan sepuluh digabung");
  sama(K.bilanganDariUcapan50("sepuluh"), [10], "ucapan: sepuluh");
  sama(K.bilanganDariUcapan50("32 dan 7"), [32, 7], "ucapan: angka");
  cek(!K.bilanganDariUcapan50("seratus enam puluh").includes(60) && K.bilanganDariUcapan50("lima puluh satu").every((v) => v <= 50), "ucapan: paling besar lima puluh");
}

/* ------------------------------ Simulasi Kotak Kue dan usulan misi ------------------------------ */
{
  const N = D.N_KUE_SIM;
  const awal = L.awalEtalase(D.NOMOR_AWAL_SIM);
  cek(N === 23 && D.NOMOR_AWAL_SIM === 41 && D.SET_SIM === "pastel" && D.SETS[D.SET_SIM] !== undefined, "kotak kue: dua puluh tiga pastel, antrean mulai empat puluh satu");
  cek(![36, 34, 35, 38, 37, 39].includes(N) && ![34, 35, 36].includes(D.NOMOR_AWAL_SIM), "kotak kue: berbeda dari Story");
  cek(D.URUTAN_SIM.length === 3 && D.URUTAN_SIM.every((u) => u.deret.length === 4 && u.hilang > 0 && u.hilang < 3 && u.deret.every((v, i) => i === 0 || Math.abs(v - u.deret[i - 1]) === 1) && L.pilihanUrutan(u).includes(L.jawabanUrutan(u)) && new Set(L.pilihanUrutan(u)).size === 3), "kotak kue: tiga urutan karcis berselisih satu, jawaban ada di pilihan");
  cek(D.URUTAN_SIM.some((u) => u.deret[1] > u.deret[0]) && D.URUTAN_SIM.some((u) => u.deret[1] < u.deret[0]), "kotak kue: ada urutan naik dan urutan turun");
  cek(D.URUTAN_SIM.every((u) => !u.deret.includes(38) || !u.deret.includes(37)), "kotak kue: urutan karcis berbeda dari Story");
  cek(tanpaDigit(D.MISI_KOTAK) && bersih(D.MISI_KOTAK), "kotak kue: teks misi tanpa digit");
  sama(D.PERKIRAAN_SIM, [10, 20, 30], "kotak kue: patokan sepuluh");
  sama([awal.alat, awal.mode, awal.dikemas, awal.selesai, awal.papanDilihat, awal.nomor, awal.maju, awal.mundur, awal.urutanSelesai, awal.perkiraan, awal.kiraTuntas], ["etalase", "kemas", 0, false, false, 41, 0, 0, [], null, 0], "kotak kue: awal");
  // Kemas.
  let k = awal;
  for (let i = 0; i < N - 1; i += 1) k = L.kemasSatu(k, N);
  sama([k.dikemas, k.selesai], [N - 1, false], "kotak kue: belum semua dikemas");
  k = L.kemasSatu(k, N);
  sama([k.dikemas, k.selesai, L.kemasSatu(k, N) === k], [N, true, true], "kotak kue: semua dikemas, tidak melebihi");
  // Papan.
  sama(L.pilihModeKotak(awal, "papan", N).papanDilihat, false, "kotak kue: papan sebelum dikemas tidak dihitung");
  sama(L.pilihModeKotak(k, "papan", N).papanDilihat, true, "kotak kue: papan setelah dikemas dihitung");
  sama(L.pilihModeKotak(L.pilihModeKotak(k, "papan", N), "antrean", N).papanDilihat, true, "kotak kue: papan tetap tercatat");
  sama([L.puluhan(N), L.satuan(N)], [2, 3], "kotak kue: dua puluhan dan tiga satuan");
  // Antrean.
  let a = awal;
  for (let i = 0; i < 4; i += 1) a = L.majuNomor(a);
  for (let i = 0; i < 3; i += 1) a = L.mundurNomor(a);
  sama([a.nomor, a.maju, a.mundur], [42, 4, 3], "kotak kue: antrean maju empat, mundur tiga");
  sama([L.mundurNomor({ ...awal, nomor: 1 }).nomor, L.majuNomor({ ...awal, nomor: 50 }).nomor, L.mundurNomor({ ...awal, nomor: 1 }).mundur], [1, 50, 0], "kotak kue: antrean dalam batas satu sampai lima puluh");
  // Urutan.
  const u0 = D.URUTAN_SIM[0];
  const salahU = L.isiUrutan(awal, 0, u0, 45);
  const benarU = L.isiUrutan(awal, 0, u0, 46);
  sama([salahU.benar, salahU.k === awal, benarU.benar, benarU.k.urutanSelesai, L.isiUrutan(benarU.k, 0, u0, 46).k.urutanSelesai], [false, true, true, [0], [0]], "kotak kue: urutan benar dicatat sekali, salah tidak berubah");
  // Kira.
  sama(L.pilihPerkiraan(awal, 20).perkiraan, 20, "kotak kue: perkiraan dipilih sebelum dikemas");
  sama(L.pilihPerkiraan(L.kemasSatu(awal, N), 20).perkiraan, null, "kotak kue: perkiraan tidak bisa dipilih setelah mulai dikemas");
  let kk = L.pilihPerkiraan(awal, 20);
  for (let i = 0; i < N; i += 1) kk = L.kemasSatu(kk, N);
  sama([kk.kiraTuntas, k.kiraTuntas], [1, 0], "kotak kue: perkiraan dibuktikan dengan mengemas semuanya");
  sama(L.awalEtalase(41).mode, "kemas", "kotak kue: main lagi mereset");
  for (const mode of ["kemas", "papan", "antrean", "urutan", "kira"])
    for (const st of [awal, L.kemasSatu(awal, N), k, a, benarU.k, L.pilihPerkiraan(awal, 10), kk]) {
      const kal = L.kalimatKotak(L.pilihModeKotak(st, mode, N), N);
      cek(tanpaDigit(kal) && bersih(kal), `kotak kue: kalimat ${mode} tanpa digit ("${kal}")`);
    }
  // Misi.
  const daftar = MK.daftarMisiK2Bab1("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("a-")), "misi A: id unik berawalan a-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && bersih(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "kerangka" }) && !x.cek({ alat: "pesta" })), "misi A: keadaan alat lain tidak memenuhi");
  cek(ada(k, "a-kemas") && !ada(awal, "a-kemas") && !ada(L.kemasSatu(awal, N), "a-kemas"), "misi A: kemas semua kue");
  cek(ada(L.pilihModeKotak(k, "papan", N), "a-papan") && !ada(L.pilihModeKotak(awal, "papan", N), "a-papan"), "misi A: papan dibuka setelah semua kue dikemas");
  cek(ada(a, "a-antrean") && !ada(L.mundurNomor(L.majuNomor(awal)), "a-antrean"), "misi A: antrean maju dan mundur masing-masing tiga kali");
  cek(ada(benarU.k, "a-urutan") && !ada(salahU.k, "a-urutan"), "misi A: lengkapi satu karcis");
  cek(ada(kk, "a-kira") && !ada(k, "a-kira"), "misi A: perkiraan dibuktikan");
  const tigaU = D.URUTAN_SIM.reduce((st, u, i) => L.isiUrutan(st, i, u, L.jawabanUrutan(u)).k, awal);
  cek(ada(tigaU, "a-semua") && !ada(benarU.k, "a-semua"), "misi A: ketiga urutan karcis");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "Jawab50.tsx", "LangkahEtalase.tsx", "TahapEtalase.tsx", "EtalaseKaca.tsx", "GulunganKarcis.tsx", "SimulasiKotakKue.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    cek(!/buku/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa kata buku`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x) && !/&&|className|=>/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|tebak|kunci|latihan)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/nilai tempat/i.test(s), `${f}: tanpa kata nilai tempat`);
  }
  const tahap = readFileSync(new URL("TahapEtalase.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapEtalase: Abstract diakhiri Poin Penting dan jembatan (bukan perayaan akhir bab)");
  cek(/etalase/.test(tahap) && /kertas/.test(tahap) && /struk/.test(tahap) && /ZIGZAG/.test(tahap) && /Kode batang/.test(tahap) && /Titik/.test(tahap) && /Kue \$\{/.test(tahap), "TahapEtalase: tiga pola visual (etalase kaca, kertas kisi pesanan, struk kasir) dengan kemajuan kue, titik, kode batang");
  for (const f of ["LangkahEtalase.tsx", "TahapEtalase.tsx", "SimulasiKotakKue.tsx", "Jawab50.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahEtalase.tsx", folderUrl), "utf8");
  cek(/from "\.\/Jawab50"/.test(langkah) && /JawabSuara50/.test(langkah) && /JawabTulis50/.test(langkah) && /PilihanAngka/.test(langkah), "LangkahEtalase: jawaban sampai lima puluh memakai Jawab50");
  const j50 = readFileSync(new URL("Jawab50.tsx", folderUrl), "utf8");
  cek(/<= 50/.test(j50) && !/<= 20/.test(j50) && /bilanganDariUcapan50/.test(j50) && /periksaTulis\(kiri, p\)/.test(j50) && /periksaTulis\(kanan, s\)/.test(j50) && /kunci <= 9/.test(j50), "Jawab50: dua kotak tulis (puluhan dan satuan) dengan batas lima puluh");
  cek(j50.includes("Ini jawaban yang benar") && /BATAS_SALAH/.test(j50), "Jawab50: jawaban benar ditampilkan setelah tiga kali salah (Ini jawaban yang benar)");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahEtalase: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahEtalase: Cari kesalahan dan petunjuk yang menunjuk kesalahannya");
  cek(/rupa === "benda"/.test(langkah) && /SETS\[set\]\.emoji/.test(langkah), "LangkahEtalase: emoji kue dari SETS");
  const aman = [...langkah.matchAll(/SETS\[set\]\.emoji/g)].every((m) => /rupa === "benda"/.test(langkah.slice(Math.max(0, m.index - 600), m.index)));
  cek(aman, "LangkahEtalase: emoji kue hanya di rupa benda (Concrete)");
  cek(/rupa === "lambang"/.test(langkah) && (langkah.match(/rupa === "lambang"/g) ?? []).length >= 4 && /Pernyataan/.test(langkah), "LangkahEtalase: Abstract memakai kata dan angka saja");
  cek(/<circle/.test(langkah) && /Kue lepas|titik/.test(langkah), "LangkahEtalase: Pictorial memakai titik polos");
  /* Soal lambang (Abstract) dan Rekam suara harus langsung siap dijawab di tiap kegiatan, atau soal klik, kanvas, dan suara macet tanpa kotak jawaban. */
  const siapLangsung = langkah.match(/useSiapLangsung\(.*\);/g) ?? [];
  cek(siapLangsung.length === 4 && siapLangsung.every((x) => x.includes("langsung(rupa, cara, diam)")), "LangkahEtalase: tiap kegiatan (Kemas, Bingkai, Loncat, Lanjut) siap dijawab pada rupa lambang dan suara");
  cek(/rupa === "lambang" \|\| cara === "suara"/.test(langkah), "LangkahEtalase: langsung siap pada rupa lambang atau cara suara");
  const sim = readFileSync(new URL("SimulasiKotakKue.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalEtalase/.test(sim) && /speakGuru/.test(sim) && /Main lagi/.test(sim) && /kemasSatu/.test(sim) && /majuNomor/.test(sim) && /mundurNomor/.test(sim) && /isiUrutan/.test(sim) && /pilihPerkiraan/.test(sim), "SimulasiKotakKue: melaporkan keadaan dan memuat lima alat");
  for (const f of ["EtalaseKaca.tsx", "GulunganKarcis.tsx", "SimulasiKotakKue.tsx", "TahapEtalase.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const gl = readFileSync(new URL("GulunganKarcis.tsx", folderUrl), "utf8");
  cek(/BARIS_GULUNGAN\[baris\]\.nama/.test(gl) && /karcisnya keliru/.test(gl), "GulunganKarcis: petunjuk salah menyebut karcis yang keliru");
  const ms = readFileSync(new URL("../src/components/modul/SimulasiK2Bab1.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiKotakKue") && ms.includes("MISI_KOTAK"), "SimulasiK2Bab1: Sub-Bab A memakai Kotak Kue");
  const sb = readFileSync(new URL("../src/components/modul/SimulasiK2Bab1.tsx", import.meta.url), "utf8");
  cek(sb.includes("langkahKotakKueA"), "SimulasiK2Bab1: fungsi langkahKotakKueA terisi");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
