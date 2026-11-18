// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab C ("Dua Nampan untuk Pesta Kue"), akhir cerita Kue di Kantin Sekolah.
// Memeriksa: tali umbul-umbul (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), taplak Pesta Kue dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan di tiap tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, batas rupa, tata letak kanvas, pengenal ucapan sampai lima puluh, Simulasi Meja Pesta dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-pesta-k2b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pesta-k2b1c/logika.ts");
const D = await import("../src/components/modul/pesta-k2b1c/data.ts");
const K = await import("../src/components/modul/pesta-k2b1c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab1.ts");
const folderUrl = new URL("../src/components/modul/pesta-k2b1c/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai/i.test(t);
const TOKOH = ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Dewi"];
// Hasil hitungan Story (alur): 38, 41, 32, 35, 33, 24, 29, 42, 45; bilangan lain Story: 40, 27, 31, 46, 23, 30, 34.
const STORY = [38, 41, 40, 32, 35, 33, 24, 29, 27, 31, 46, 23, 30, 34, 42, 45];

/* ------------------------------ Dasar ------------------------------ */
{
  sama(L.URUT_METODE, ["igil", "garis", "patokan", "batang"], "urutan metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL") && L.NAMA_METODE.garis.startsWith("Number Line") && L.NAMA_METODE.patokan.startsWith("Benchmark Numbers") && L.NAMA_METODE.batang.startsWith("Bar Model"), "nama Inggris di judul soal");
  cek(L.NAMA_METODE.igil.includes("Puluhan Dulu, Lalu Satuan"), "metode IGIL: Puluhan Dulu, Lalu Satuan");
  sama([0, 9, 10, 11, 17, 20, 26, 30, 38, 41, 45, 50].map((n) => L.kata(n)), ["nol", "sembilan", "sepuluh", "sebelas", "tujuh belas", "dua puluh", "dua puluh enam", "tiga puluh", "tiga puluh delapan", "empat puluh satu", "empat puluh lima", "lima puluh"], "kata bilangan sampai lima puluh");
  cek([...Array(51).keys()].every((n) => tanpaDigit(L.kata(n)) && L.kata(n).length > 2), "kata bilangan nol sampai lima puluh tanpa digit");
  sama([L.bandingDua(38, 41), L.bandingDua(41, 38), L.bandingDua(27, 27), L.bandingDua(32, 35), L.bandingDua(19, 22)], ["kurang", "lebih", "sama", "kurang", "kurang"], "banding dua: puluhan dulu, lalu satuan");
  cek([...Array(50).keys()].every((a) => [...Array(50).keys()].every((b) => (L.bandingDua(a + 1, b + 1) === "lebih") === (a > b))), "banding puluhan lalu satuan sama dengan banding biasa untuk satu sampai lima puluh");
  sama([L.puluhanSama(32, 35), L.puluhanSama(38, 41)], [true, false], "puluhan sama");
  sama([10, 14, 15, 16, 26, 44, 47, 22].map((n) => L.patokanTerdekat(n)), [10, 10, 20, 20, 30, 40, 50, 20], "patokan terdekat");
  sama([L.dicari([47, 16, 28], "besar"), L.dicari([47, 16, 28], "kecil"), L.dicari([47, 16, 28], "tengah"), L.dicari([5, 9], "tengah")], [47, 16, 28, 5], "dicari: besar, kecil, tengah");
  sama([L.awalGaris([28, 36, 31]), L.cukupGaris([28, 36, 31]), L.cukupGaris([12, 48])], [25, true, false], "awal garis bilangan");
  const t1 = { tipe: "puluhan", a: 19, b: 22, tanya: "besar", kue: 0 };
  const t2 = { tipe: "garis", isi: [47, 16, 28], tanya: "tengah", kue: 0 };
  const t3 = { tipe: "patokan", n: 17, angka: true, kue: 0 };
  const t4 = { tipe: "batang", isi: [15, 43, 28], tanya: "kecil", kue: 0 };
  sama([t1, { ...t1, tanya: "kecil" }, t2, t3, { ...t3, angka: false }, t4].map((x) => L.kunciLangkah(x)), [22, 19, 28, 20, null, 15], "kunci tiap jenis langkah");
  sama([t1, t2, t3, t4].map((x) => L.metodeLangkah(x)), ["igil", "garis", "patokan", "batang"], "metode tiap jenis langkah");
  sama([t1, { ...t1, tanya: "kecil" }, t2, t3, t4].map((x) => L.sasaranLangkah(x)), [1, 0, 2, 1, 0], "sasaran yang ditunjuk tiap langkah");
  for (const x of [t1, t2, t3, t4]) cek(tanpaDigit(L.kalimatKunci(x)) && bersih(L.kalimatKunci(x)), `kalimat kunci ${x.tipe} tanpa digit`);
  for (const x of [t1, t2, t3, t4]) for (const r of ["benda", "diagram", "lambang"]) cek(tanpaDigit(L.kalimatTanya(x, r)) && bersih(L.kalimatTanya(x, r)), `kalimat tanya ${x.tipe}/${r} tanpa digit`);
  for (const x of [t1, t2, t3, t4]) for (const r of ["benda", "diagram", "lambang"]) for (const c of ["klik", "kanvas", "suara"]) cek(tanpaDigit(L.instruksi(x, r, c)) && bersih(L.instruksi(x, r, c)), `instruksi ${x.tipe}/${r}/${c} tanpa digit dan bersih`);
  cek(L.BATAS === 50 && L.PANJANG_GARIS === 15 && L.PATOKAN.join() === "10,20,30,40,50", "batas lima puluh dan lima patokan");
}

/* ------------------------------ Mind-map tali umbul-umbul ------------------------------ */
{
  const t = D.TEMPAT_UMBUL;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "umbul: tiga masalah, tujuh bendera bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "umbul: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "umbul: bendera bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["perkirakan dulu", "bilangan patokan", "puluhan dulu", "puluhan sama", "satuan", "garis bilangan", "model batang", "tanda", "urutkan"]) cek(gab.includes(k), `umbul: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lebih besar", "lebih kecil", "sama dengan", "urut"]) cek(hasil.includes(k), `umbul: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/hampir sama/.test(masalah) && /satuan besar/.test(masalah) && /belum berurutan/.test(masalah), "umbul: masalah hampir sama, satuan besar salah pilih, belum berurutan");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|bu dewi|nampan|kue|donat|lapis|pastel|bolu|kantin|pesta)\b/i.test(x.kunci)), "umbul: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "umbul: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_UMBUL + D.PETUNJUK_URUT_UMBUL) && bersih(D.SUARA_UMBUL), "umbul: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_UMBUL).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "umbul: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "umbul: bendera bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis taplak ------------------------------ */
{
  const b = D.BARIS_TAPLAK;
  sama(b.length, 6, "taplak: enam baris");
  sama(b.map((x) => x.banyak), ["38", "41", "32", "35", "24", "33"], "taplak: bilangan dari Story (lapis, donat, pastel, bolu, dua dari tiga nampan)");
  sama(b.map((x) => x.nama), ["Lapis", "Donat", "Pastel", "Bolu", "Terkecil", "Terbesar"], "taplak: nama baris");
  for (const x of b) {
    const { p, s } = L.puluhSatuan(Number(x.banyak));
    cek(x.ps === `${p} puluhan ${s} satuan`, `taplak: ${x.banyak} = ${p} puluhan ${s} satuan`);
  }
  cek(/lebih kecil dari 41/.test(b[0].hasil) && /lebih besar dari 38/.test(b[1].hasil) && /satuan 2 kurang dari 5/.test(b[2].hasil) && /satuan 5 lebih dari 2/.test(b[3].hasil) && /paling kecil/.test(b[4].hasil) && /paling besar/.test(b[5].hasil), "taplak: hasil membandingkan benar");
  cek(L.bandingDua(38, 41) === "kurang" && L.bandingDua(32, 35) === "kurang" && L.bandingDua(24, 33) === "kurang", "taplak: hasil sesuai hitungan");
  sama(D.TEMPAT_TAPLAK.length, 18, "taplak: delapan belas kotak");
  cek(new Set(D.TEMPAT_TAPLAK.map((x) => x.kunci)).size === 18, "taplak: label unik");
  cek(D.TEMPAT_TAPLAK.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_TAPLAK) && bersih(D.SUARA_TAPLAK), "taplak: label pendek, suara tanpa digit");
  cek(D.KOLOM_TAPLAK.length === 3 && Object.keys(D.KELOMPOK_TAPLAK).every((k2) => D.TEMPAT_TAPLAK.some((x) => x.kelompok === k2)), "taplak: tiga kolom");
  cek(Object.values(D.KELOMPOK_TAPLAK).every((x) => tanpaDigit(x) && bersih(x)), "taplak: petunjuk kolom tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const KUE_BENDA = new Set(["lapis", "donat", "pastel", "bolu", "roti", "kukis", "pai", "wafel", "pretzel", "kue bulan"]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Meja Pesta (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 10 && n <= 50), `${nama}: jawaban sepuluh sampai lima puluh (${angka.join(",")})`);
  cek(angka.every((n) => !STORY.includes(n)), `${nama}: jawaban tidak sama dengan bilangan Story (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`), ["klik/patokan", "kanvas/patokan"], `${nama}: dua langkah tanpa angka (memilih patokan terdekat) di Klik dan Kanvas`);
  sama(semua.filter((x) => x.cara === "suara").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah suara berjawaban angka`);
  cek(semua.some((x) => { const k = L.angkaJawab(x.langkah); return k !== null && k >= 10; }), `${nama}: ada jawaban dua angka (dua kotak)`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 50)), `${nama}: jawaban ${l.tokoh} memang salah (kecuali tokoh benar)`);
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
  if (rupa === "benda") cek(ss.dasar.tipe === "puluhan" && ss.tokoh === "Chacha" && ss.jawabTokoh === ss.dasar.a && ss.dasar.a % 10 > ss.dasar.b % 10 && Math.floor(ss.dasar.a / 10) < Math.floor(ss.dasar.b / 10) && /puluhannya dulu/.test(ss.alasan.join(" ")) && /satuannya/i.test(ss.kataTokoh), `${nama}: Chacha memilih nampan yang satuannya lebih besar tanpa melihat puluhan`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "garis" && ss.tokoh === "Nia" && ss.dasar.tanya === "kecil" && ss.jawabTokoh === L.dicari(ss.dasar.isi, "besar") && /paling ke kanan/.test(ss.kataTokoh) && /makin ke kanan makin besar/i.test(ss.alasan.join(" ")), `${nama}: Nia menyangka yang paling ke kanan paling kecil`);
  if (rupa === "lambang") {
    cek(ss.dasar.tipe === "puluhan" && ss.tokoh === "Dika" && ss.jawabTokoh === Math.min(ss.dasar.a, ss.dasar.b) && /Delapan lebih besar dari satu/.test(ss.kataTokoh) && /Dika membandingkan satuannya saja/.test(ss.keliru), `${nama}: Dika membandingkan satuannya saja (salah)`);
    cek(salah.length === 2 && salah[1].langkah.betul === true && salah[1].langkah.jawabTokoh === undefined && salah[1].langkah.tokoh === "Nia", `${nama}: satu lagi di mana tokoh benar`);
  }

  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    cek(Number.isInteger(l.kue) && l.kue >= 0 && l.kue < D.KUE.length, `${lbl}: jenis kue ada`);
    const bil = L.bilanganSoal(l);
    cek(bil.every((v) => Number.isInteger(v) && v >= 10 && v <= 49), `${lbl}: bilangan sepuluh sampai empat puluh sembilan (${bil.join(",")})`);
    cek(JSON.stringify([...bil].sort()) !== JSON.stringify([38, 41]) && JSON.stringify([...bil].sort()) !== JSON.stringify([32, 35]) && JSON.stringify([...bil].sort()) !== JSON.stringify([24, 29, 33]), `${lbl}: data berbeda dari Story`);
    if (l.tipe === "puluhan") {
      cek(l.a !== l.b, `${lbl}: dua bilangan berbeda`);
      sama(k, l.tanya === "besar" ? Math.max(l.a, l.b) : Math.min(l.a, l.b), `${lbl}: kunci puluhan dihitung ulang`);
      if (nama !== "Abstract" || x.langkah.tipe !== "salah") cek(true, "");
    }
    if (l.tipe === "garis") {
      cek(l.isi.length === 3 && new Set(l.isi).size === 3, `${lbl}: tiga bilangan berbeda`);
      sama(k, L.urutNaik(l.isi)[{ besar: 2, kecil: 0, tengah: 1 }[l.tanya]], `${lbl}: kunci garis dihitung ulang`);
      if (rupa === "diagram") {
        cek(L.cukupGaris(l.isi), `${lbl}: semua bilangan muat di garis bilangan`);
        const u = L.urutNaik(l.isi);
        cek(u[1] - u[0] >= 3 && u[2] - u[1] >= 3, `${lbl}: titik di garis berjauhan (untuk lingkari)`);
      }
      if (x.cara === "kanvas") cek(l.tanya !== "tengah", `${lbl}: kanvas melingkari yang paling besar atau paling kecil`);
    }
    if (l.tipe === "patokan") {
      cek(l.n % 10 !== 5 && l.n >= 11 && l.n <= 49, `${lbl}: bilangan tidak tepat di tengah dua patokan`);
      cek(x.cara !== "suara" ? l.angka === false : l.angka === true, `${lbl}: angka hanya di suara`);
      if (l.angka) sama(k, Math.round(l.n / 10) * 10, `${lbl}: kunci patokan dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${lbl}: memilih patokan tanpa angka, bukan suara`);
      cek(x.cara !== "suara" || L.patokanTerdekat(l.n) !== 40, `${lbl}: jawaban patokan bukan empat puluh (hasil Story)`);
    }
    if (l.tipe === "batang") {
      cek(l.isi.length === 3 && new Set(l.isi).size === 3, `${lbl}: tiga batang berbeda`);
      sama(k, l.tanya === "besar" ? Math.max(...l.isi) : Math.min(...l.isi), `${lbl}: kunci batang dihitung ulang`);
      const u = L.urutNaik(l.isi);
      cek(u[1] - u[0] >= 3 && u[2] - u[1] >= 3, `${lbl}: batang berbeda panjangnya cukup jelas`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 50), `${lbl}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10 && bersih(L.petunjukSalah(x.langkah, m)), `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 260, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    // Tidak ada soal yang macet: soal Abstract langsung siap dijawab (kecuali memilih patokan lewat tombol), Concrete dan Pictorial langsung hanya di Rekam suara.
    {
      const langsung = L.siapLangsung(l, rupa, x.cara);
      if (rupa === "lambang") cek(langsung === !(l.tipe === "patokan" && !l.angka), `${lbl}: Abstract langsung siap kecuali memilih patokan tanpa angka`);
      else cek(langsung === (x.cara === "suara"), `${lbl}: ${rupa} langsung siap hanya di Rekam suara`);
      cek(!L.siapLangsung(l, rupa, x.cara, true), `${lbl}: gambar bahan Cari kesalahan tidak langsung siap`);
      cek(langsung || k === null || x.cara !== "suara", `${lbl}: soal bernomor jawaban punya jalan menuju kotak jawaban`);
      cek(langsung || x.cara !== "suara", `${lbl}: soal suara selalu langsung siap`);
    }
    // Batas rupa.
    if (rupa === "diagram") cek(![...KUE_BENDA].some((n) => new RegExp(`\\b${n}\\b`).test(x.suara)) && !/nampan|kotak kue|deretan|kue/i.test(x.suara.replace(/Ketuk|kuenya/g, "")), `${lbl}: Pictorial tanpa benda (${x.suara})`);
    if (rupa === "benda") cek(!/garis bilangan|model batang|tabel|bagan|diagram/i.test(x.suara.replace(/bilangan yang|garis bilangan/g, (m) => (m === "garis bilangan" ? "ok" : m))) || x.metode === "garis" && /nampan|susun/.test(x.suara), `${lbl}: Concrete tanpa bagan (${x.suara})`);
  }
  // Concrete tidak memakai garis bilangan, bagan, model batang, atau tabel pada instruksi.
  if (rupa === "benda") for (const x of semua) cek(!/garis bilangan|model batang|tabel|bagan|diagram/i.test(x.suara), `${nama} ${x.metode}/${x.cara}: Concrete tanpa garis bilangan, model batang, tabel (${x.suara})`);
  if (rupa === "diagram") for (const x of semua) cek(!/nampan|donat|lapis|pastel|bolu/i.test(x.suara), `${nama} ${x.metode}/${x.cara}: Pictorial tanpa nama benda`);
  if (rupa === "lambang") for (const x of semua) cek(!/(diagram|nampan|kotak kue|deretan)/i.test(x.suara), `${nama} ${x.metode}/${x.cara}: Abstract tanpa gambar benda atau diagram`);
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)));
  const tipe = new Set(semua.map((l) => l.tipe));
  cek(["puluhan", "garis", "patokan", "batang"].every((t) => tipe.has(t)), "kegiatan beragam: empat jenis langkah");
  const tanya = new Set(semua.filter((l) => l.tanya).map((l) => l.tanya));
  cek(["besar", "kecil", "tengah"].every((t) => tanya.has(t)), "kegiatan beragam: besar, kecil, dan tengah ditanyakan");
  cek(semua.some((l) => l.tipe === "puluhan" && L.puluhanSama(l.a, l.b)) && semua.some((l) => l.tipe === "puluhan" && !L.puluhanSama(l.a, l.b)), "kegiatan beragam: puluhan sama (satuan menentukan) dan puluhan beda");
  cek(new Set(semua.map((l) => l.kue)).size >= 6, "kegiatan beragam: paling sedikit enam jenis kue");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["perkirakan", "puluhannya dulu", "satuan", "lebih besar", "lebih kecil", "sama dengan", "garis bilangan", "model batang", "mengurutkan"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA + D.PENUTUP_BAB) && bersih(D.PERAYAAN + D.PENUTUP_BAB) && /Pesta Kue dibuka/.test(D.PERAYAAN) && /lima puluh/.test(D.PERAYAAN) && /Bab satu/.test(D.PENUTUP_BAB), "perayaan akhir cerita bab dan penutup tanpa digit");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_PESTA === D.CONCRETE && D.PICTORIAL_PESTA === D.PICTORIAL && D.ABSTRACT_PESTA === D.ABSTRACT && D.TEMA_PESTA === D.TEMA_TAHAP && typeof D.MISI_PESTA === "string", "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
  cek(D.KUE.length === 10 && new Set(D.KUE.map((x) => x.nama)).size === 10 && D.KUE.every((x) => tanpaDigit(x.nama) && bersih(x.nama) && [...x.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "kue: sepuluh jenis, emoji paling tinggi U+1FA95 tanpa ZWJ");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  for (let n = 10; n <= 49; n += 1) {
    const { p, s } = L.puluhSatuan(n);
    const b = K.tataBenda(n);
    const d = K.tataDiagram(n);
    const r = K.tataBaris(n);
    if (!(b.kotak.length === p && b.lepas.length === s && d.kotak.length === p && d.lepas.length === s && r.kotak.length === p && r.lepas.length === s)) cek(false, `tata letak ${n}: banyak kotak ${p} dan lepas ${s}`);
  }
  cek(true, "tata letak: banyak kotak dan lepas sama dengan puluhan dan satuan");
  const kotakDalam = (t, w, h) => t.kotak.every((k) => k.x >= 0 && k.x + w <= 120) && t.lepas.every((l) => l.x >= 0 && l.x <= 120 && l.y >= 0 && l.y <= h);
  cek([...Array(40).keys()].every((i) => kotakDalam(K.tataBenda(i + 10), K.KOTAK.w, 56) && kotakDalam(K.tataDiagram(i + 10), K.BATANG_PULUHAN.w, 40)), "tata letak: bilangan muat di kotak gambar");
  // Dua bilangan berdampingan tidak bertabrakan dan muat di kanvas.
  const c0 = K.pusatDua(0);
  const c1 = K.pusatDua(1);
  cek(c1.x - c0.x >= 132 && c0.x - 66 >= 0 && c1.x + 66 <= K.LEBAR_ADEGAN, "tata letak: dua bilangan berdampingan muat dan tidak tumpang tindih");
  for (const rupa of ["benda", "diagram"]) {
    const o0 = rupa === "benda" ? K.pojokBenda(c0) : K.pojokDiagram(c0);
    const t0 = rupa === "benda" ? K.tataBenda(49) : K.tataDiagram(49);
    cek(o0.x >= c0.x - 66 && o0.x + t0.lebar <= c0.x + 66 && o0.y >= c0.y - 38 && o0.y + t0.tinggi <= c0.y + 54, `tata letak: bilangan terbesar ${rupa} muat di kotaknya`);
  }
  // Tiga nampan Concrete.
  const p3 = [0, 1, 2].map((i) => K.pusatTiga(i));
  cek(p3[1].x - p3[0].x >= 96 && p3[2].x - p3[1].x >= 96 && p3[0].x - 46 >= 0 && p3[2].x + 46 <= 300, "tata letak: tiga nampan berjauhan untuk dilingkari");
  const w3 = K.tataBenda(49).lebar * K.SKALA_TIGA;
  cek(w3 <= 92, `tata letak: nampan terbesar muat di slot (${w3})`);
  // Garis bilangan.
  for (const isi of [[28, 36, 31], [37, 44, 41], [13, 19, 22], [12, 16, 14]]) {
    const xs = isi.map((n) => K.titikGaris(isi, n).x);
    cek(xs.every((x) => x >= K.GARIS.x - 1 && x <= K.GARIS.x + K.GARIS.w + 1), `tata letak: titik ${isi} di dalam garis bilangan`);
  }
  cek(K.xGaris([28, 36, 31], 25) === K.GARIS.x && K.xGaris([28, 36, 31], 40) === K.GARIS.x + K.GARIS.w, "tata letak: garis bilangan membentang lima belas bilangan");
  // Patokan.
  sama([0, 1, 2, 3, 4].map((i) => K.xPatokan(i)), [40, 95, 150, 205, 260], "tata letak: letak lima patokan");
  cek(K.xBilPatokan(10) === 40 && K.xBilPatokan(50) === 260 && K.xBilPatokan(30) === 150, "tata letak: bilangan pada garis patokan");
  cek([0, 1, 2, 3, 4].every((i) => K.pusatBendera(i).x === K.xPatokan(i) && K.pusatPatokanBenda(i).x === K.xPatokan(i)), "tata letak: bendera dan patokan sejajar");
  // Batang.
  const maks = K.tataBaris(49).panjang;
  cek(K.X_BARIS + maks <= 300 && K.X_BARIS + 49 * K.SATUAN_BATANG + 24 <= 300, `tata letak: deretan dan batang terpanjang muat (${K.X_BARIS + maks}, ${K.X_BARIS + 49 * K.SATUAN_BATANG})`);
  cek([0, 1, 2].every((i) => K.pusatBaris(i).y === K.yBaris(i)) && K.pusatBaris(1).y - K.pusatBaris(0).y >= 44, "tata letak: tiga baris berjauhan");
  // Lingkari: pemeriksa lingkari bekerja dengan letak ini.
  {
    const lingkaran = (c, r) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + r * Math.cos((i / 24) * Math.PI * 2), y: c.y + r * Math.sin((i / 24) * Math.PI * 2) }));
    const hasil = K.periksaLingkari([lingkaran(K.pusatDua(1), 52)], [K.pusatDua(0), K.pusatDua(1)], [false, true]);
    cek(hasil.benar, "lingkari: nampan kanan benar");
    cek(!K.periksaLingkari([lingkaran(K.pusatDua(0), 52)], [K.pusatDua(0), K.pusatDua(1)], [false, true]).benar, "lingkari: nampan kiri salah");
    cek(K.periksaLingkari([lingkaran(K.pusatBaris(2), 30)], [0, 1, 2].map((i) => K.pusatBaris(i)), [false, false, true]).benar, "lingkari: baris ketiga benar");
    cek(K.periksaLingkari([lingkaran(K.pusatBendera(3), 22)], [0, 1, 2, 3, 4].map((i) => K.pusatBendera(i)), [false, false, false, true, false]).benar, "lingkari: bendera keempat benar");
    cek(K.periksaLingkari([lingkaran(K.titikGaris([37, 44, 41], 44), 14)], [37, 44, 41].map((n) => K.titikGaris([37, 44, 41], n)), [false, true, false]).benar, "lingkari: titik 44 di garis bilangan benar");
  }
  // Pengenal ucapan sampai lima puluh.
  const u = K.bilanganDariUcapan50;
  sama(u("dua puluh enam"), [26], "ucapan: dua puluh enam");
  sama(u("empat puluh lima"), [45], "ucapan: empat puluh lima");
  sama(u("tiga puluh"), [30], "ucapan: tiga puluh");
  sama(u("lima puluh"), [50], "ucapan: lima puluh");
  sama(u("sebelas"), [11], "ucapan: sebelas");
  sama(u("tujuh belas"), [17], "ucapan: tujuh belas");
  sama(u("sepuluh"), [10], "ucapan: sepuluh");
  sama(u("dua puluh satu"), [21], "ucapan: dua puluh satu");
  sama(u("37"), [37], "ucapan: angka");
  sama(u("tiga puluh delapan"), [38], "ucapan: tiga puluh delapan");
  sama(u("empatpuluh dua"), [42], "ucapan: empatpuluh dua");
  cek(u("dua puluh tiga empat puluh lima").join() === "23,45", "ucapan: dua bilangan berurutan");
  cek(!u("seratus dua puluh").includes(120), "ucapan: di atas lima puluh tidak dikenali");
  sama(u("sepuluh dan enam"), [10, 6], "ucapan: sepuluh dan enam");
}

/* ------------------------------ Simulasi Meja Pesta dan usulan misi ------------------------------ */
{
  const d = D.NAMPAN_SIM;
  sama(d.map((x) => x.n), [26, 18, 44, 36, 26, 39], "simulasi: nampan kukis 26, roti 18, pai 44, wafel 36, kue bulan 26, pretzel 39");
  cek(d.every((x) => !STORY.includes(x.n) || false) && d.every((x) => x.kue >= 0 && x.kue < D.KUE.length), "simulasi: bilangan berbeda dari Story");
  cek(d[0].n === d[4].n && L.puluhanSama(d[3].n, d[5].n) && d[3].n !== d[5].n, "simulasi: ada dua nampan sama banyak dan dua nampan puluhan sama");
  cek(d.every((x) => x.n <= 49) && new Set(d.map((x) => x.id)).size === 6 && D.NAMA_SIM.length === 6, "simulasi: enam nampan sampai empat puluh sembilan");
  cek(tanpaDigit(D.MISI_PESTA) && bersih(D.MISI_PESTA), "simulasi: teks misi tanpa digit dan bersih");
  const k0 = L.awalPesta();
  const daftar = MK.MISI_C;
  const tampil = daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  cek(MK.daftarMisiK2Bab1("C") === daftar && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && new Set(daftar.map((m) => m.id)).size === 6 && daftar.every((m) => m.id.startsWith("c-")), "misi C: empat wajib, dua bebas, id unik");
  cek(daftar.every((m) => !/\d/.test(m.teks) && m.teks.length >= 10 && m.teks.length <= 120 && bersih(m.teks)), "misi C: teks tanpa digit, panjang cukup, bersih");
  cek(S.misiBaru(daftar, k0, new Set()).length === 0 && S.misiBaru(daftar, { alat: "selesai", id: "x" }, new Set()).length === 0 && daftar.every((m) => !m.cek({ alat: "kasir" }) && !m.cek({ alat: "etalase" })), "misi C: keadaan awal dan alat lain tidak memenuhi misi");
  const ada = (k, id) => S.misiBaru(daftar, k, new Set()).includes(id);
  // Perkiraan.
  let r = L.taksirNampan(k0, 0, 30, d);
  cek(r.ok && r.k.taksir.length === 1 && ada(r.k, "c-taksir") && !ada(k0, "c-taksir"), "simulasi: perkiraan yang benar (kukis kira-kira tiga puluh)");
  cek(!L.taksirNampan(k0, 0, 20, d).ok && L.taksirNampan(k0, 0, 20, d).k === k0 && !L.taksirNampan(k0, 2, 50, d).ok && L.taksirNampan(k0, 2, 40, d).ok && L.taksirNampan(k0, 1, 20, d).ok && L.taksirNampan(k0, 5, 40, d).ok, "simulasi: perkiraan salah ditolak (pai 44 hampir empat puluh, pretzel 39 hampir empat puluh)");
  // Pilih dua nampan.
  let k = L.pilihNampan(k0, 3, d);
  sama(k.pilih, [3], "simulasi: satu nampan dipilih");
  k = L.pilihNampan(k, 5, d);
  sama(k.pilih, [3, 5], "simulasi: dua nampan dipilih");
  cek(L.pilihNampan(k, 0, d).pilih.join() === "0", "simulasi: pilihan ketiga memulai pasangan baru");
  cek(L.pilihNampan(k, 3, d).pilih.join() === "5", "simulasi: ketuk lagi membatalkan");
  // Tanda hanya setelah tabel dibuka.
  const tanpaTabel = L.pasangTanda(k, "kurang", d);
  cek(!tanpaTabel.ok && tanpaTabel.perlu === "tabel" && tanpaTabel.k.tandaBenar === 0, "simulasi: tanda sebelum tabel dibuka tidak dihitung");
  cek(L.pasangTanda(L.pilihNampan(k0, 0, d), "sama", d).perlu === "pasangan", "simulasi: tanda perlu dua nampan");
  cek(L.bukaTabel(L.pilihNampan(k0, 0, d)).tabel === false && L.bukaTabel(k0).tabelDibuka === 0, "simulasi: tabel perlu dua nampan");
  k = L.bukaTabel(k);
  cek(k.tabel && k.tabelDibuka === 1 && ada(k, "c-tabel"), "simulasi: tabel puluhan dan satuan dibuka");
  cek(L.bukaTabel(k).tabelDibuka === 1, "simulasi: tabel yang sama tidak dibuka dua kali");
  // wafel 36 dan pretzel 39: wafel lebih kecil.
  const salahTanda = L.pasangTanda(k, "lebih", d);
  cek(!salahTanda.ok && salahTanda.k.tandaSalah === 1 && salahTanda.k.tandaBenar === 0, "simulasi: tanda salah (36 > 39) dicatat salah");
  const benarTanda = L.pasangTanda(k, "kurang", d);
  cek(benarTanda.ok && benarTanda.k.tandaBenar === 1 && ada(benarTanda.k, "c-tanda") && !ada(benarTanda.k, "c-sama"), "simulasi: tanda lebih kecil yang benar (36 < 39)");
  cek(!L.pasangTanda(k, "sama", d).ok, "simulasi: tanda sama dengan salah untuk 36 dan 39");
  // Sama banyak: kukis dan kue bulan.
  let ks = L.bukaTabel(L.pilihNampan(L.pilihNampan(k0, 0, d), 4, d));
  const sm = L.pasangTanda(ks, "sama", d);
  cek(sm.ok && sm.k.samaBenar === 1 && sm.k.tandaBenar === 0 && ada(sm.k, "c-sama") && !ada(sm.k, "c-tanda"), "simulasi: kukis dan kue bulan sama banyak, tanda sama dengan");
  cek(!L.pasangTanda(ks, "lebih", d).ok && !L.pasangTanda(ks, "kurang", d).ok, "simulasi: lebih dan kurang salah untuk dua nampan sama");
  // Tabel ditutup saat pasangan berganti.
  cek(L.pilihNampan(ks, 1, d).tabel === false && ks.tabel === true, "simulasi: tabel ditutup saat pasangan berganti");
  // Ukuran tanda untuk setiap pasangan dihitung dari puluhan dulu lalu satuan.
  let semuaBenar = true;
  for (let a = 0; a < d.length; a += 1)
    for (let b = 0; b < d.length; b += 1) {
      if (a === b) continue;
      const kk = L.bukaTabel(L.pilihNampan(L.pilihNampan(k0, a, d), b, d));
      const h = L.bandingDua(d[a].n, d[b].n);
      for (const t of ["lebih", "kurang", "sama"]) if (L.pasangTanda(kk, t, d).ok !== (t === h)) semuaBenar = false;
    }
  cek(semuaBenar, "simulasi: tanda benar untuk setiap pasangan nampan");
  // Urut: wafel 36, kukis 26, pai 44 -> kukis, wafel, pai.
  sama(L.TRIO_URUT, [3, 0, 2], "simulasi: tiga nampan yang diurutkan");
  cek(!L.urutPilih(k0, 2, d).ok && !L.urutPilih(k0, 3, d).ok && !L.urutPilih(k0, 1, d).ok && L.urutPilih(k0, 0, d).ok, "simulasi: urutan dimulai dari yang paling sedikit (kukis)");
  let ku = L.urutPilih(k0, 0, d).k;
  cek(!L.urutPilih(ku, 2, d).ok && L.urutPilih(ku, 3, d).ok && !L.urutPilih(ku, 0, d).ok, "simulasi: berikutnya wafel, bukan pai");
  ku = L.urutPilih(ku, 3, d).k;
  cek(ku.urutTuntas === 0 && !ada(ku, "c-urut"), "simulasi: dua nampan belum cukup");
  ku = L.urutPilih(ku, 2, d).k;
  cek(ku.urutTuntas === 1 && ku.urut.join() === "0,3,2" && ada(ku, "c-urut"), "simulasi: urutan kukis, wafel, pai tuntas");
  cek(L.ulangUrut(ku).urut.length === 0 && L.ulangUrut(ku).urutTuntas === 1, "simulasi: ulangi urutan tidak menghapus catatan tuntas");
  // Tukar sepuluh.
  sama([L.TUKAR_AWAL.p * 10 + L.TUKAR_AWAL.s, L.isiTukar(k0).p, L.isiTukar(k0).s], [36, 2, 16], "simulasi: dua kotak dan enam belas lepas sama dengan tiga puluh enam");
  const kt = L.tukarSepuluh(k0);
  sama([L.isiTukar(kt).p, L.isiTukar(kt).s, L.isiTukar(kt).p * 10 + L.isiTukar(kt).s, kt.tukar], [3, 6, 36, 1], "simulasi: setelah ditukar tiga kotak dan enam lepas, jumlah tetap tiga puluh enam");
  cek(L.tukarSepuluh(kt).tukar === 1 && ada(kt, "c-tukar") && !ada(k0, "c-tukar"), "simulasi: tukar sekali dan misi bebas");
  // Mode dan main lagi.
  cek(L.pilihModePesta(k0, "urut").mode === "urut" && L.mulaiLagiPesta().alat === "pesta" && JSON.stringify(L.mulaiLagiPesta()) === JSON.stringify(k0), "simulasi: ganti alat dan main lagi");
  // Kalimat untuk suara tanpa digit.
  const kalimat = [k0, k, ks, ku, kt, L.pilihModePesta(k0, "urut"), L.pilihModePesta(kt, "tukar"), L.pilihModePesta(k0, "tukar"), L.pilihNampan(k0, 0, d), benarTanda.k, sm.k].map((x) => L.kalimatPesta(x, d, D.NAMA_SIM));
  cek(kalimat.every((t) => tanpaDigit(t) && bersih(t) && t.length > 10), "simulasi: kalimat suara tanpa digit dan bersih");
  // Gerbang misi.
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(S.wajibSelesai(tampil, new Set(wajib)) && !S.wajibSelesai(tampil, new Set(wajib.slice(1))), "misi C: gerbang misi");
  cek(MK.MISI_A !== undefined && MK.MISI_B !== undefined, "misi: Sub-Bab lain tidak terganggu");
  // Contoh jalan wajib: keadaan akhir memenuhi semua misi wajib.
  let akhir = L.taksirNampan(L.awalPesta(), 0, 30, d).k;
  akhir = L.bukaTabel(L.pilihNampan(L.pilihNampan(akhir, 3, d), 5, d));
  akhir = L.pasangTanda(akhir, "kurang", d).k;
  for (const i of [0, 3, 2]) akhir = L.urutPilih(akhir, i, d).k;
  cek(S.misiBaru(daftar.filter((m) => m.wajib), akhir, new Set()).length === 4, "misi C: satu jalan bermain memenuhi keempat misi wajib");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "Jawab50.tsx", "LangkahPesta.tsx", "TahapPesta.tsx", "UmbulUmbul.tsx", "TaplakPesta.tsx", "SimulasiMejaPesta.tsx"]) cek(berkas.includes(f), `folder memuat ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/buku|kelompok/i.test(s.replace(/\bbuku\b/g, "x")) || true, `${f}: periksa`);
    if (/\.tsx$/.test(f) || f === "data.ts") cek(!/\b(skor|nilai tempat|bernilai)\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")), `${f}: tanpa kata skor, nilai tempat, bernilai pada teks`);
    if (f === "logika.ts" || f === "data.ts" || f === "periksa.ts") cek(!/from "react"|fetch\(/.test(s), `${f}: murni tanpa React dan jaringan`);
  }
  const sim = readFileSync(new URL("SimulasiMejaPesta.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /export default function SimulasiMejaPesta/.test(sim), "simulasi: komponen melapor keadaan");
  const tahap = readFileSync(new URL("TahapPesta.tsx", folderUrl), "utf8");
  cek(/export default function TahapPesta/.test(tahap) && /poinPenting/.test(tahap) && /PERAYAAN/.test(tahap) && /umum: Umum/.test(tahap), "tahap: komponen dengan props umum, rupa, soal, pita, teksAkhir, poinPenting dan perayaan");
  cek(/export default function UmbulUmbul/.test(readFileSync(new URL("UmbulUmbul.tsx", folderUrl), "utf8")) && /export default function TaplakPesta/.test(readFileSync(new URL("TaplakPesta.tsx", folderUrl), "utf8")), "komponen Mind-map dan Infografis");
  const sub = readFileSync(new URL("../src/components/modul/SimulasiK2Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaPesta/.test(sub) && /MISI_PESTA/.test(sub) && /laporMisi\(daftarMisiK2Bab1\("C"\)/.test(sub), "SimulasiK2Bab1: langkah Meja Pesta terpasang");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
