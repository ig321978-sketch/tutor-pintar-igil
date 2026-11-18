// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab A ("Kiriman dari Gudang"), awal cerita Toko Seragam dan Alat Tulis Sekolah.
// Memeriksa: gantungan seragam (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), lemari laci dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan, tokoh yang sudah benar, dan memilih cara termudah, jumlah dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap (dua tugas tanpa angka), batas rupa, tata letak kanvas, pengenal ucapan sampai dua puluh, Simulasi Kardus Kiriman dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-gudang-k2b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/gudang-k2b2a/logika.ts");
const D = await import("../src/components/modul/gudang-k2b2a/data.ts");
const K = await import("../src/components/modul/gudang-k2b2a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab2.ts");
const folderUrl = new URL("../src/components/modul/gudang-k2b2a/", import.meta.url);

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
// Pasangan operan di Story (tidak dipakai di CPA dan Simulasi, urutan bebas).
const PASANGAN_STORY = [[13, 5], [16, 4], [8, 5], [7, 8], [7, 7], [9, 7], [9, 5], [6, 6], [3, 5], [10, 3], [2, 3], [3, 12], [8, 9], [9, 1], [6, 4], [5, 8], [18, 2]];
const pasanganStory = (a, b) => PASANGAN_STORY.some(([p, q]) => (p === a && q === b) || (p === b && q === a));
const operan = (l) => (l.tipe === "maju" ? [l.besar, l.kecil] : l.tipe === "kembar" ? [l.x, l.x + 1] : [l.a, l.b]);

/* ------------------------------ Dasar ------------------------------ */
{
  sama(L.URUT_METODE, ["igil", "sepuluh", "kembar", "bulat"], "urutan metode");
  cek(L.NAMA_METODE.igil === "Metode IGIL: Maju dari yang Besar" && L.NAMA_METODE.sepuluh.startsWith("Make a Ten") && L.NAMA_METODE.kembar.startsWith("Doubles Plus One") && L.NAMA_METODE.bulat.startsWith("Round and Adjust"), "nama Inggris di judul tugas");
  sama(["Maju dari yang Besar", "Membuat Sepuluh", "Kembar Tambah Satu", "Bulatkan Lalu Sesuaikan"], L.URUT_METODE.map((m) => L.NAMA_CARA_ID[m]), "nama pendek bahasa Indonesia");
  sama([0, 5, 9, 10, 11, 14, 19, 20].map(L.kata), ["nol", "lima", "sembilan", "sepuluh", "sebelas", "empat belas", "sembilan belas", "dua puluh"], "kata bilangan sampai dua puluh");
  const maju = { tipe: "maju", set: "pensil", besar: 14, kecil: 3 };
  const sepuluh = { tipe: "sepuluh", set: "pensil", a: 9, b: 4 };
  const kembar = { tipe: "kembar", set: "pensil", x: 5 };
  const bulat = { tipe: "bulat", set: "pensil", a: 8, b: 6 };
  sama([maju, sepuluh, kembar, bulat].map((x) => L.kunciLangkah(x)), [17, 13, 11, 14], "jumlah tiap jenis langkah");
  sama([maju, sepuluh, kembar, bulat].map((x) => L.metodeLangkah(x)), ["igil", "sepuluh", "kembar", "bulat"], "metode tiap jenis langkah");
  sama([L.puluhan(17), L.satuan(17), L.puluhan(20), L.satuan(20), L.kurangSepuluh(8)], [1, 7, 2, 0, 2], "puluhan, satuan, dan kurang sepuluh");
  for (const x of [maju, sepuluh, kembar, bulat, { ...maju, besar: 17, kecil: 3 }, { ...bulat, a: 9, b: 9 }]) {
    const n = L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n) && n.length > 30, `kalimat jumlah ${x.tipe} tanpa digit ("${n}")`);
  }
  cek(L.kalimatTanya() === "Berapa jumlahnya?", "kalimat tanya");
  sama(L.pilihanDari(sepuluh), [12, 13, 14], "pilihan memuat jumlah dan tetangganya");
  cek(L.pilihanDari({ ...maju, besar: 17, kecil: 3 }).every((v) => v >= 1 && v <= 20) && new Set(L.pilihanDari({ ...maju, besar: 17, kecil: 3 })).size === 3 && L.pilihanDari({ ...maju, besar: 17, kecil: 3 }).includes(20), "pilihan paling besar dua puluh");
  sama(L.sesuaikan("Ketuk tiap benda kecil.", "diagram"), "Ketuk tiap titik kecil.", "sesuaikan: Pictorial menyebut titik");
  sama(L.sesuaikan("Ketuk tiap benda.", "benda"), "Ketuk tiap benda.", "sesuaikan: Concrete tetap benda");
  cek(L.angkaJawab({ tipe: "banding", set: "pensil", a: 6, b: 7, pilihan: ["igil", "kembar", "bulat"], benar: "kembar", alasan: "x", petunjuk: {} }) === null && L.angkaJawab({ tipe: "salah", dasar: kembar, tokoh: "Dika", jawabTokoh: 11, kataTokoh: "x", alasan: ["a", "b", "c"], benar: 0, keliru: "k", betul: true }) === null && L.angkaJawab(maju) === 17, "tugas tanpa angka: memilih cara dan tokoh yang sudah benar");
}

/* ------------------------------ Mind-map gantungan seragam ------------------------------ */
{
  const t = D.TEMPAT_GANTUNGAN;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "gantungan: tiga masalah, tujuh hanger bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "gantungan: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "gantungan: hanger bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["maju dari bilangan yang besar", "pasangan", "tabel puluhan satuan", "tukar sepuluh satuan", "membuat sepuluh", "kembar tambah satu", "bulatkan lalu sesuaikan"]) cek(gab.includes(k), `gantungan: langkah memuat "${k}"`);
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.kunci.toLowerCase().split(" ")[0]), ["maju", "pecah", "susun", "tukar", "membuat", "kembar", "bulatkan"], "gantungan: urutan langkah mengikuti Story (maju, pasangan, bersusun, tukar, lalu tiga metode global)");
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["hasilnya sama", "satu angka", "termudah", "dua puluh"]) cek(hasil.includes(k), `gantungan: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/dari awal/.test(masalah) && /tidak muat/.test(masalah) && /memilih cara/.test(masalah), "gantungan: masalah menghitung dari awal, tidak muat, bingung memilih cara");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|pak ujang|koperasi|kardus|pensil|baju|gantungan|papan harga|kucing)\b/i.test(x.kunci)), "gantungan: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "gantungan: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_GANTUNGAN + D.PETUNJUK_URUT_GANTUNGAN) && bersih(D.SUARA_GANTUNGAN), "gantungan: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_GANTUNGAN).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "gantungan: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 73);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "gantungan: hanger bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis lemari laci ------------------------------ */
{
  const b = D.BARIS_LACI;
  sama(b.length, 5, "laci: lima laci");
  sama(b.map((x) => x.penjumlahan), ["13 + 5", "16 + 4", "8 + 5", "7 + 8", "9 + 7"], "laci: penjumlahan dari Story (pensil, baju olahraga, tiga contoh metode global)");
  sama(b.map((x) => x.hasil), ["18", "20", "13", "15", "16"], "laci: hasil dari Story");
  sama(b.map((x) => x.dibaca), [18, 20, 13, 15, 16].map(L.kata), "laci: nama bilangan benar");
  cek(b.every((x) => x.penjumlahan.split(" + ").map(Number).reduce((p, q) => p + q, 0) === Number(x.hasil)), "laci: tiap penjumlahan sama dengan hasilnya");
  sama(D.TEMPAT_LACI.length, 15, "laci: lima belas kotak");
  cek(new Set(D.TEMPAT_LACI.map((x) => x.kunci)).size === 15, "laci: label unik");
  cek(D.TEMPAT_LACI.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_LACI) && bersih(D.SUARA_LACI), "laci: label pendek, suara tanpa digit");
  cek(D.KOLOM_LACI.length === 3 && Object.keys(D.KELOMPOK_LACI).every((k2) => D.TEMPAT_LACI.some((x) => x.kelompok === k2)), "laci: tiga kolom");
  cek(Object.values(D.KELOMPOK_LACI).every(tanpaDigit), "laci: petunjuk kolom tanpa digit");
  cek(b.every((x) => bersih(x.nama)), "laci: nama laci bersih");
}

/* ------------------------------ CPA ------------------------------ */
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Kardus Kiriman (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah));
  const adaAngka = angka.filter((n) => n !== null);
  cek(angka.length - adaAngka.length === 2, `${nama}: dua tugas tanpa angka (${angka.join(",")})`);
  cek(new Set(adaAngka).size === adaAngka.length && adaAngka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${adaAngka.join(",")})`);
  cek(adaAngka.every((n) => n >= 9 && n <= 20), `${nama}: angka sembilan sampai dua puluh (${adaAngka.join(",")})`);
  cek(semua.every((x) => x.langkah.tipe !== "banding" || x.cara === "klik") && semua.every((x) => x.langkah.tipe !== "salah" || x.cara === "klik"), `${nama}: Cari kesalahan dan memilih cara hanya di Klik`);

  // Cari kesalahan dan tokoh yang sudah benar.
  const salahSemua = semua.filter((x) => x.langkah.tipe === "salah");
  const salah = salahSemua.filter((x) => !x.langkah.betul);
  const betul = salahSemua.filter((x) => x.langkah.betul);
  cek(salah.length === 1 && betul.length === 1, `${nama}: satu Cari kesalahan dengan jawaban salah dan satu dengan jawaban yang sudah benar`);
  for (const x of salahSemua) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    if (l.betul) cek(l.jawabTokoh === kunci, `${nama}: jawaban ${l.tokoh} memang benar`);
    else cek(l.jawabTokoh !== kunci && l.jawabTokoh >= 1 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut[0] !== l.benar && urut.length === 3, `${nama}: alasan benar bukan tombol pertama (urutan ${urut.join("")}, benar ${l.benar})`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && bersih(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(kunci) && (l.betul || L.pilihanDari(l).includes(l.jawabTokoh)), `${nama}: pilihan memuat jumlah dan jawaban tokoh`);
    cek(L.petunjukSalah(l, l.jawabTokoh).length > 10, `${nama}: petunjuk salah tersedia`);
    if (!l.betul) cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara) && (l.betul ? !/lalu pilih jawaban yang benar/.test(x.suara) : /lalu pilih jawaban yang benar/.test(x.suara)), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari tugas dasarnya`);
  }
  // Memilih cara termudah.
  const bandingSemua = semua.filter((x) => x.langkah.tipe === "banding");
  cek(bandingSemua.length === 1, `${nama}: satu tugas memilih cara termudah`);
  for (const x of bandingSemua) {
    const l = x.langkah;
    cek(l.pilihan.includes(l.benar) && new Set(l.pilihan).size === 3 && l.pilihan[0] !== l.benar && x.metode === l.benar, `${nama}: tiga cara, cara benar bukan yang pertama, metode sesuai`);
    cek(l.pilihan.filter((m) => m !== l.benar).every((m) => (l.petunjuk[m] ?? "").length > 20 && tanpaDigit(l.petunjuk[m]) && bersih(l.petunjuk[m])), `${nama}: petunjuk salah memilih cara`);
    cek(tanpaDigit(l.alasan) && bersih(l.alasan) && l.alasan.length > 20, `${nama}: alasan cara termudah`);
    cek(L.petunjukBanding(l, l.pilihan.find((m) => m !== l.benar)).length > 20, `${nama}: petunjukBanding`);
    cek(tanpaDigit(x.suara) && bersih(x.suara) && /Cara mana/.test(x.suara), `${nama}: instruksi memilih cara`);
    cek(["kembar", "igil"].includes(l.benar), `${nama}: cara termudah yang jelas (hampir sama besar atau satu bilangan kecil)`);
    cek(l.a + l.b <= 20 && (l.benar === "kembar" ? Math.abs(l.a - l.b) === 1 : Math.min(l.a, l.b) <= 3), `${nama}: bilangan cocok dengan cara termudahnya`);
  }

  const tipe = [];
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    if (l === null) continue;
    cek(D.SETS[l.set] !== undefined, `${lbl}: jenis benda ${l.set} ada`);
    const k = L.kunciLangkah(x.langkah);
    const [p, q] = operan(l);
    cek(!pasanganStory(p, q), `${lbl}: operan ${p} dan ${q} berbeda dari Story`);
    cek(k >= 9 && k <= 20 && p <= 20 && q <= 20, `${lbl}: bilangan, operan, dan jumlah paling besar dua puluh`);
    if (l.tipe === "maju") {
      sama(k, l.besar + l.kecil, `${lbl}: jumlah maju dihitung ulang`);
      cek(l.besar >= l.kecil && l.kecil >= 2 && l.kecil <= 8, `${lbl}: bilangan besar dan benda kecil dua sampai delapan`);
    }
    if (l.tipe === "sepuluh") {
      sama(k, l.a + l.b, `${lbl}: jumlah sepuluh dihitung ulang`);
      cek([7, 8, 9].includes(l.a) && l.b >= 11 - l.a && l.b <= 9, `${lbl}: kotak berisi 7, 8, atau 9 dan tumpukan kedua lebih dari yang diambil (${l.a}, ${l.b})`);
    }
    if (l.tipe === "kembar") {
      sama(k, 2 * l.x + 1, `${lbl}: jumlah kembar dihitung ulang`);
      cek(l.x >= 4 && l.x <= 9, `${lbl}: baris atas empat sampai sembilan`);
    }
    if (l.tipe === "bulat") {
      sama(k, l.a + l.b, `${lbl}: jumlah bulat dihitung ulang`);
      cek([8, 9].includes(l.a) && l.b >= 3 && l.b <= 9, `${lbl}: bilangan hampir sepuluh dan bilangan kedua tiga sampai sembilan (${l.a}, ${l.b})`);
    }
    tipe.push(l.tipe);
    if (L.angkaJawab(x.langkah) !== null || x.langkah.tipe === "salah") {
      const pl = L.pilihanDari(x.langkah);
      cek(pl.includes(k) && new Set(pl).size === 3 && pl.every((v) => v >= 1 && v <= 20), `${lbl}: pilihan memuat jumlah`);
      for (const m of pl.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10 && bersih(L.petunjukSalah(x.langkah, m)), `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 330, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    cek(/benda|titik|kotak|bilangan|hitung|kembar/i.test(x.suara) || x.langkah.tipe === "salah", `${lbl}: instruksi menyebut bendanya`);
    cek(L.NAMA_METODE[x.metode].length > 10, `${lbl}: nama metode di judul tugas`);
    if (rupa === "diagram") cek(!/\bbenda\b/i.test(x.suara) || x.langkah.tipe === "salah" || x.langkah.tipe === "banding", `${lbl}: Pictorial tanpa kata benda (${x.suara})`);
    if (rupa === "benda" && x.langkah.tipe !== "salah" && x.langkah.tipe !== "banding") cek(/benda|petak|tumpukan/i.test(x.suara), `${lbl}: Concrete menyebut bendanya`);
  }
  cek(new Set(tipe).size === 4, `${nama}: keempat jenis langkah dipakai`);
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)).filter((x) => x !== null));
  cek(new Set(semua.map((l) => l.set)).size >= 6, "kegiatan beragam: paling sedikit enam jenis benda");
  cek(semua.some((l) => l.tipe === "sepuluh" && l.a === 7) && semua.some((l) => l.tipe === "sepuluh" && l.a === 9) && semua.some((l) => l.tipe === "bulat" && l.a === 8) && semua.some((l) => l.tipe === "bulat" && l.a === 9), "kegiatan beragam: kotak berisi tujuh dan sembilan, bilangan bulat delapan dan sembilan");
  cek(D.POIN_PENTING.length >= 8 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["maju", "pasangan", "bersusun", "ditukar", "make a ten", "doubles plus one", "round and adjust", "sama", "periksa"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.JEMBATAN + D.JEMBATAN_SUARA) && /Sub-Bab B/.test(D.JEMBATAN) && /pengurangan/.test(D.JEMBATAN) && /satuannya/.test(D.JEMBATAN) && bersih(D.JEMBATAN), "jembatan ke Sub-Bab B: pertanyaan satuan dan puluhan, pengurangan");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_GUDANG === D.CONCRETE && D.PICTORIAL_GUDANG === D.PICTORIAL && D.ABSTRACT_GUDANG === D.ABSTRACT && D.TEMA_GUDANG === D.TEMA_TAHAP && typeof D.MISI_KARDUS === "string", "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
  for (const s of Object.values(D.SETS)) cek(tanpaDigit(s.nama) && bersih(s.nama) && [...s.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d) && /^#[0-9A-F]{6}$/i.test(s.warna), `jenis benda ${s.id}: nama bersih, emoji sampai U+1FA95`);
  cek(new Set(Object.values(D.SETS).map((s) => s.emoji)).size === Object.keys(D.SETS).length, "jenis benda: emoji unik");
  cek(Object.values(D.SETS).every((s) => !/kue|etalase|kantin/i.test(s.nama)), "jenis benda: alat tulis dan seragam, bukan kue");
}

/* ------------------------------ Kanvas, tata letak, dan ucapan ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  // Kotak sepuluh petak.
  const petak = Array.from({ length: 10 }, (_, i) => K.letakPetak(i));
  cek(petak.every((p) => p.x - K.UKURAN_PETAK / 2 > K.KOTAK_P.x && p.x + K.UKURAN_PETAK / 2 < K.KOTAK_P.x + K.KOTAK_P.w && p.y - 14 > K.KOTAK_P.y - 2 && p.y + 14 < K.KOTAK_P.y + K.KOTAK_P.h + 2) && new Set(petak.map((p) => p.x)).size === 10, "sepuluh petak di dalam kotak dan tidak kembar");
  cek(jarak(petak[0], petak[1]) > 2 * K.JARI_PETAK && K.KOTAK_P.x > 2 && K.KOTAK_P.x + K.KOTAK_P.w < W - 2 && K.KOTAK_P.y + K.KOTAK_P.h < 90, "jari tanda tidak melewati petak tetangga, kotak masuk kanvas di atas tumpukan");
  // Tumpukan kedua.
  for (let n = 1; n <= 10; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakTumpuk(i, n));
    cek(xs.every((t) => t.x - 13 > 2 && t.x + 13 < W - 2 && t.y - 14 > K.KOTAK_P.y + K.KOTAK_P.h + 4 && t.y + 14 < K.Y_HITUNGAN - 14) && (n < 2 || xs[1].x - xs[0].x >= 2 * K.JARI_TUMPUK), `${n} benda di tumpukan kedua masuk kanvas, di bawah kotak, di atas hitungan`);
  }
  // Dua baris kembar.
  for (let x = 4; x <= 9; x += 1) {
    const a = Array.from({ length: x }, (_, i) => K.letakBaris(0, i, x));
    const b = Array.from({ length: x + 1 }, (_, i) => K.letakBaris(1, i, x + 1));
    cek([...a, ...b].every((t) => t.x - 13 > 2 && t.x + 13 < W - 2 && t.y - 14 > 24 && t.y + 14 < K.Y_HITUNGAN - 14) && b[1].x - b[0].x >= 2 * K.JARI_BARIS && b[0].y - a[0].y >= 2 * K.JARI_BARIS, `kembar ${x} dan ${x + 1}: dua baris masuk kanvas, jari tanda tidak melewati tetangga`);
  }
  // Maju dari yang besar.
  const lj = Array.from({ length: 8 }, (_, i) => K.letakKecil(i));
  cek(lj.every((t) => t.x - 18 > K.KARTU_AWAL.x + K.KARTU_AWAL.w && t.x + 18 < W - 2 && t.y - 18 > 24 && t.y + 18 < K.Y_HITUNGAN - 14) && lj[1].x - lj[0].x >= 2 * K.JARI_KECIL && lj[4].y - lj[0].y >= 2 * K.JARI_KECIL, "delapan benda kecil masuk kanvas, di kanan kartu bilangan awal, jari tanda tidak melewati tetangga");
  cek(K.KARTU_AWAL.x > 2 && K.KARTU_AWAL.y + K.KARTU_AWAL.h < K.Y_HITUNGAN - 14, "kartu bilangan awal masuk kanvas");
  cek(K.Y_HITUNGAN < H - 20, "papan hitungan masuk kanvas");
  // Pemeriksa kanvas.
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const kosong = [petak[7], petak[8], petak[9]];
  cek(K.periksaCentang(kosong.map(coret), kosong, K.JARI_PETAK).benar && !K.periksaCentang([...kosong.map(coret), coret(petak[3])], kosong, K.JARI_PETAK).benar && !K.periksaCentang(kosong.slice(1).map(coret), kosong, K.JARI_PETAK).benar, "sepuluh dan bulat: tanda di tiap petak yang diminta, tidak di petak lain");
  const tanpaPasangan = [K.letakBaris(1, 6, 7)];
  cek(K.periksaCentang(tanpaPasangan.map(coret), tanpaPasangan, K.JARI_BARIS).benar && !K.periksaCentang([...tanpaPasangan.map(coret), coret(K.letakBaris(1, 5, 7))], tanpaPasangan, K.JARI_BARIS).benar, "kembar: satu tanda di benda yang tidak punya pasangan");
  const kecilP = Array.from({ length: 5 }, (_, i) => K.letakKecil(i));
  cek(K.periksaCentang(kecilP.map(coret), kecilP, K.JARI_KECIL).benar && !K.periksaCentang([...kecilP.map(coret), coret(K.KARTU_AWAL)], kecilP, K.JARI_KECIL).benar, "maju: tanda di tiap benda kecil, bukan di kartu bilangan awal");
  // Ucapan sampai dua puluh.
  for (const x of [1, 7, 9, 10, 11, 14, 19, 20, 12, 13, 15, 16, 17, 18]) sama(K.bilanganDariUcapan20(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
  sama(K.bilanganDariUcapan20("dua puluh"), [20], "ucapan: dua puluh satu bilangan");
  sama(K.bilanganDariUcapan20("duapuluh"), [20], "ucapan: dua puluh digabung");
  sama(K.bilanganDariUcapan20("Tiga belas, eh lima belas"), [13, 15], "ucapan: dua bilangan berurutan");
  sama(K.bilanganDariUcapan20("tigabelas"), [13], "ucapan: belasan digabung");
  sama(K.bilanganDariUcapan20("sepuluh"), [10], "ucapan: sepuluh");
  sama(K.bilanganDariUcapan20("17 dan 3"), [17, 3], "ucapan: angka");
  cek(!K.bilanganDariUcapan20("seratus dua puluh").includes(120) && K.bilanganDariUcapan20("dua puluh satu").every((v) => v <= 20), "ucapan: paling besar dua puluh");
}

/* ------------------------------ Simulasi Kardus Kiriman dan usulan misi ------------------------------ */
{
  const T = D.TUGAS_SIM;
  const awal = L.awalGudang();
  cek(T.length === 3 && D.SET_SIM === "kertas" && D.SETS[D.SET_SIM] !== undefined, "kardus kiriman: tiga tugas di meja, kertas lipat");
  cek(T.every((x) => !pasanganStory(x.a, x.b) && x.a + x.b <= 20 && L.besarTugas(x) >= 10), "kardus kiriman: berbeda dari Story, jumlah paling besar dua puluh, bilangan besar paling sedikit sepuluh");
  sama(T.map((x) => L.perluTukar(x)), [false, true, false], "kardus kiriman: hanya empat belas dan enam yang satuannya penuh sepuluh");
  cek(tanpaDigit(D.MISI_KARDUS) && bersih(D.MISI_KARDUS), "kardus kiriman: teks misi tanpa digit");
  sama([awal.alat, awal.mode, awal.tugas, awal.digabung, awal.posisi, awal.jalurTuntas, awal.pecah, awal.pasanganTuntas, awal.tabelTahap, awal.tabelTuntas, awal.tukarTuntas], ["gudang", "gabung", 0, [], 0, [], 0, [], 0, [], []], "kardus kiriman: awal");
  // Gabung.
  const g = L.gabungKardus(awal);
  sama([g.digabung, L.gabungKardus(g).digabung], [[0], [0]], "kardus kiriman: gabung dicatat sekali");
  // Jalur.
  let j = awal;
  const t0 = T[0];
  for (let i = 0; i < L.kecilTugas(t0) - 1; i += 1) j = L.majuSatu(j, t0);
  sama([j.posisi, j.jalurTuntas], [L.kecilTugas(t0) - 1, []], "kardus kiriman: belum sampai di jumlahnya");
  j = L.majuSatu(j, t0);
  sama([j.posisi, j.jalurTuntas, L.majuSatu(j, t0) === j], [L.kecilTugas(t0), [0], true], "kardus kiriman: berhenti di jumlahnya, tidak melebihi");
  sama(L.mulaiLagiJalur(j).posisi, 0, "kardus kiriman: jalur mulai lagi");
  cek(L.mulaiLagiJalur(j).jalurTuntas.length === 1, "kardus kiriman: mulai lagi tidak menghapus yang sudah tuntas");
  // Pasangan.
  let p = awal;
  p = L.pecahLanjut(p);
  p = L.pecahLanjut(p);
  sama([p.pecah, p.pasanganTuntas], [2, []], "kardus kiriman: pasangan belum tuntas di tahap dua");
  p = L.pecahLanjut(p);
  sama([p.pecah, p.pasanganTuntas, L.pecahLanjut(p) === p], [3, [0], true], "kardus kiriman: pasangan tuntas, tidak melebihi");
  // Tabel.
  let b = L.pilihTugas(awal, 1);
  for (let i = 0; i < 3; i += 1) b = L.tabelLanjut(b);
  sama([b.tabelTahap, b.tabelTuntas, L.tabelLanjut(b) === b], [3, [1], true], "kardus kiriman: tabel tuntas pada tugas kedua");
  // Tukar.
  sama([L.tukarSepuluh(awal, T[0]) === awal, L.tukarSepuluh(L.pilihTugas(awal, 1), T[1]).tukarTuntas], [true, [1]], "kardus kiriman: tukar hanya untuk satuan yang penuh sepuluh");
  // Ganti tugas.
  const gt = L.pilihTugas(L.pecahLanjut(L.majuSatu(awal, t0)), 2);
  sama([gt.tugas, gt.posisi, gt.pecah, gt.tabelTahap, L.pilihTugas(gt, 2) === gt], [2, 0, 0, 0, true], "kardus kiriman: ganti tugas memulai langkah lagi");
  sama(L.pilihModeKardus(awal, "tabel").mode, "tabel", "kardus kiriman: pilih alat");
  // Dua cara.
  let dc = awal;
  for (let i = 0; i < 3; i += 1) dc = L.pecahLanjut(dc);
  for (let i = 0; i < L.kecilTugas(t0); i += 1) dc = L.majuSatu(dc, t0);
  sama(L.tugasDuaCara(dc), [0], "kardus kiriman: satu tugas dihitung dengan dua cara");
  sama(L.tugasDuaCara(g), [], "kardus kiriman: gabung bukan cara menghitung");
  const sem = [awal, g, j, p, b, gt, dc, L.pilihTugas(awal, 1)];
  for (const mode of ["gabung", "jalur", "pasangan", "tabel", "tukar"])
    for (let i = 0; i < 3; i += 1)
      for (const st of sem) {
        const kal = L.kalimatKardus(L.pilihModeKardus(L.pilihTugas(st, i), mode), T[i]);
        cek(tanpaDigit(kal) && bersih(kal) && kal.length > 15, `kardus kiriman: kalimat ${mode} tugas ${i} tanpa digit ("${kal}")`);
      }
  // Misi.
  const daftar = MK.daftarMisiK2Bab2("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar === MK.MISI_A && daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("a-")), "misi A: id unik berawalan a-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && bersih(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)) && S.misiBaru(daftar, awal, new Set()).length === 0, "misi A: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "kerangka" }) && !x.cek({ alat: "stok" }) && !x.cek({ alat: "pembukaan" })), "misi A: keadaan alat lain tidak memenuhi");
  cek(ada(g, "a-gabung") && !ada(awal, "a-gabung"), "misi A: gabung dua kardus");
  cek(ada(j, "a-jalur") && !ada(L.pilihModeKardus(awal, "jalur"), "a-jalur") && !ada(L.majuSatu(awal, t0), "a-jalur"), "misi A: maju di jalur sampai berhenti");
  cek(ada(p, "a-pasangan") && !ada(L.pecahLanjut(L.pecahLanjut(awal)), "a-pasangan"), "misi A: pecah jadi pasangan sampai hasil");
  cek(ada(b, "a-tabel") && !ada(L.tabelLanjut(awal), "a-tabel"), "misi A: tabel puluhan dan satuan sampai hasil");
  cek(ada(L.tukarSepuluh(L.pilihTugas(awal, 1), T[1]), "a-tukar") && !ada(L.tukarSepuluh(awal, T[0]), "a-tukar"), "misi A: tukar sepuluh satuan");
  cek(ada(dc, "a-sama") && !ada(j, "a-sama") && !ada(p, "a-sama"), "misi A: satu kardus dengan dua cara berbeda");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "Jawab20.tsx", "LangkahGudang.tsx", "TahapGudang.tsx", "GantunganSeragam.tsx", "LaciAlatTulis.tsx", "SimulasiKardusKiriman.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
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
    cek(!/\b(borderStyle)\b[\s\S]*\bborder(Right|Left|Top|Bottom)Style\b/.test(s), `${f}: tidak mencampur borderStyle dengan borderRightStyle dan sejenisnya`);
  }
  const tahap = readFileSync(new URL("TahapGudang.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapGudang: Abstract diakhiri Poin Penting dan jembatan (bukan perayaan akhir bab)");
  cek(/"rak"/.test(tahap) && /"karton"/.test(tahap) && /"kartu"/.test(tahap) && /bungkusKartu/.test(tahap) && /Manik/.test(tahap) && /Baju \$\{/.test(tahap) && /Langkah \$\{/.test(tahap), "TahapGudang: tiga pola visual (rak seragam, karton berpetak, kartu harga bertali) dengan kemajuan baju, jalur bilangan, manik");
  cek(!/etalase|struk|kantin|karcis/i.test(tahap.replace(/\/\*[\s\S]*?\*\//g, "")), "TahapGudang: bukan pola Bab 1 (etalase, struk, kantin)");
  for (const f of ["LangkahGudang.tsx", "TahapGudang.tsx", "SimulasiKardusKiriman.tsx", "Jawab20.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahGudang.tsx", folderUrl), "utf8");
  cek(/from "\.\/Jawab20"/.test(langkah) && /JawabSuara20/.test(langkah) && /JawabTulis20/.test(langkah) && /PilihanAngka/.test(langkah), "LangkahGudang: jawaban sampai dua puluh memakai Jawab20");
  const j20 = readFileSync(new URL("Jawab20.tsx", folderUrl), "utf8");
  cek(/<= 20/.test(j20) && !/<= 50/.test(j20) && /bilanganDariUcapan20/.test(j20) && /periksaTulis\(kiri, p\)/.test(j20) && /periksaTulis\(kanan, s\)/.test(j20) && /kunci <= 9/.test(j20), "Jawab20: dua kotak tulis (puluhan dan satuan) dengan batas dua puluh");
  cek(j20.includes("Ini jawaban yang benar") && /BATAS_SALAH/.test(j20), "Jawab20: jawaban benar ditampilkan setelah tiga kali salah (Ini jawaban yang benar)");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahGudang: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah) && /l\.betul/.test(langkah) && /Banding/.test(langkah) && /petunjukBanding/.test(langkah), "LangkahGudang: Cari kesalahan (salah dan sudah benar), petunjuk yang menunjuk kesalahannya, dan memilih cara termudah");
  cek(/rupa === "benda"/.test(langkah) && /SETS\[set\]\.emoji/.test(langkah), "LangkahGudang: emoji benda dari SETS");
  const aman = [...langkah.matchAll(/SETS\[(set|l\.set)\]\.emoji/g)].every((m) => /rupa === "benda"/.test(langkah.slice(Math.max(0, m.index - 600), m.index)));
  cek(aman, "LangkahGudang: emoji benda hanya di rupa benda (Concrete)");
  cek(/rupa === "lambang"/.test(langkah) && (langkah.match(/rupa === "lambang"/g) ?? []).length >= 5 && /Pernyataan/.test(langkah), "LangkahGudang: Abstract memakai kata dan angka saja");
  cek(/<circle/.test(langkah) && /titik/.test(langkah), "LangkahGudang: Pictorial memakai titik polos");
  /* Tugas lambang (Abstract) dan Rekam suara harus langsung siap dijawab di tiap kegiatan, atau tugas klik, kanvas, dan suara macet tanpa kotak jawaban. */
  const siapLangsung = langkah.match(/useSiapLangsung\(.*\);/g) ?? [];
  cek(siapLangsung.length === 4 && siapLangsung.every((x) => x.includes("langsung(rupa, cara, diam)")), "LangkahGudang: tiap kegiatan (Maju, Sepuluh, Kembar, Bulat) siap dijawab pada rupa lambang dan suara");
  cek(/rupa === "lambang" \|\| cara === "suara"/.test(langkah), "LangkahGudang: langsung siap pada rupa lambang atau cara suara");
  cek(/n !== null/.test(langkah) && /tuntas\(/.test(langkah), "LangkahGudang: tugas tanpa angka selesai tanpa kotak jawaban");
  const sim = readFileSync(new URL("SimulasiKardusKiriman.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalGudang/.test(sim) && /speakGuru/.test(sim) && /Main lagi/.test(sim) && /gabungKardus/.test(sim) && /majuSatu/.test(sim) && /pecahLanjut/.test(sim) && /tabelLanjut/.test(sim) && /tukarSepuluh/.test(sim), "SimulasiKardusKiriman: melaporkan keadaan dan memuat lima alat");
  for (const f of ["GantunganSeragam.tsx", "LaciAlatTulis.tsx", "SimulasiKardusKiriman.tsx", "TahapGudang.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const gl = readFileSync(new URL("LaciAlatTulis.tsx", folderUrl), "utf8");
  cek(/BARIS_LACI\[baris\]\.nama/.test(gl) && /lacinya keliru/.test(gl), "LaciAlatTulis: petunjuk salah menyebut laci yang keliru");
  const gs = readFileSync(new URL("GantunganSeragam.tsx", folderUrl), "utf8");
  cek(/hanger/.test(gs) && /PETUNJUK_URUT_GANTUNGAN/.test(gs) && /cocokKelompok/.test(gs), "GantunganSeragam: hanger bernomor berurutan");
  const ms = readFileSync(new URL("../src/components/modul/SimulasiK2Bab2.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiKardusKiriman") && ms.includes("MISI_KARDUS") && ms.includes("langkahKardusA") && !/misi: "KERANGKA"[\s\S]{0,80}Kardus/.test(ms), "SimulasiK2Bab2: Sub-Bab A memakai Kardus Kiriman");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
