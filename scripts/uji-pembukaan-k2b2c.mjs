// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab C ("Pesanan Besar Pak Budi"), akhir cerita Toko Seragam dan Alat Tulis Sekolah.
// Memeriksa: tali pita gunting (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), daftar pesanan besar dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan di tiap tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, batas rupa, tata letak kanvas, pengenal ucapan sampai dua puluh, Simulasi Meja Pesanan Besar dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-pembukaan-k2b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pembukaan-k2b2c/logika.ts");
const D = await import("../src/components/modul/pembukaan-k2b2c/data.ts");
const K = await import("../src/components/modul/pembukaan-k2b2c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab2.ts");
const folderUrl = new URL("../src/components/modul/pembukaan-k2b2c/", import.meta.url);

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
const TOKOH = ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Budi"];
// Hasil hitungan Story (alur): 8, 20, 4, 17, 15, 11. Pasangan operan Story: (12,4), (12,8), (7,4,6), (9,6), (8,3), (14,5), (7,6), (12,5), (10,3).
const STORY = [8, 20, 4, 17, 15, 11];
const PASANGAN_STORY = ["12,4", "12,8", "4,7", "6,9", "3,8", "5,14", "6,7", "5,12", "3,10"];
const kunciPasang = (a, b) => [a, b].sort((m, n) => m - n).join();

/* ------------------------------ Dasar ------------------------------ */
{
  sama(L.URUT_METODE, ["igil", "bagian", "peragakan", "mundur"], "urutan metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL") && L.NAMA_METODE.bagian.startsWith("Part-Part-Whole") && L.NAMA_METODE.peragakan.startsWith("Act It Out") && L.NAMA_METODE.mundur.startsWith("Work Backwards"), "nama Inggris metode global di judul tugas");
  cek(L.NAMA_METODE.igil.includes("Empat Langkah Cerita"), "metode IGIL: Empat Langkah Cerita");
  cek(!/kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan/i.test(L.NAMA_METODE.igil), "metode IGIL tanpa kata terlarang");
  sama([0, 9, 10, 11, 17, 19, 20].map((n) => L.kata(n)), ["nol", "sembilan", "sepuluh", "sebelas", "tujuh belas", "sembilan belas", "dua puluh"], "kata bilangan");
  cek([...Array(21).keys()].every((n) => tanpaDigit(L.kata(n)) && L.kata(n).length > 2), "kata bilangan nol sampai dua puluh tanpa digit");
  sama(["lebihnya", "kurangnya", "selisih", "jumlah"].map((k) => L.tandaKata(k)), ["tambah", "kurang", "kurang", "tambah"], "tanda tiap kata petunjuk");
  sama(L.URUT_KATA.length, 4, "empat kata petunjuk");
  const c1 = { kata: "kurangnya", a: 13, b: 4, benda: 0 };
  sama(["lebihnya", "kurangnya", "selisih", "jumlah"].map((k) => L.hasilCerita({ ...c1, kata: k })), [17, 9, 9, 17], "hasil cerita tiap kata petunjuk");
  cek(L.ceritaSah(c1) && !L.ceritaSah({ ...c1, a: 4, b: 13 }) && !L.ceritaSah({ kata: "jumlah", a: 15, b: 9, benda: 0 }) && !L.ceritaSah({ ...c1, b: 0 }) && !L.ceritaSah({ ...c1, a: 21 }), "cerita sah: hasil satu sampai dua puluh");
  const e = { tipe: "empat", c: c1 };
  const b1 = { tipe: "bagian", a: 10, b: 5, cari: "utuh", tukar: false, angka: true, benda: 0 };
  const p1 = { tipe: "peragakan", a: 9, b: 4, arah: "tambah", benda: 0 };
  const m1 = { tipe: "mundur", akhir: 7, b: 5, arah: "ambil", benda: 0 };
  sama([e, b1, { ...b1, cari: "bagian" }, { ...b1, angka: false }, p1, { ...p1, arah: "ambil" }, m1, { ...m1, arah: "tambah" }].map((x) => L.kunciLangkah(x)), [9, 15, 5, null, 13, 5, 12, 2], "kunci tiap jenis langkah");
  sama([e, b1, p1, m1].map((x) => L.metodeLangkah(x)), ["igil", "bagian", "peragakan", "mundur"], "metode tiap jenis langkah");
  sama([e, { ...e, c: { ...c1, kata: "jumlah" } }, m1, { ...m1, arah: "tambah" }, b1, p1].map((x) => L.tandaBenar(x)), ["kurang", "tambah", "tambah", "kurang", null, null], "tanda yang cocok");
  sama([L.zonaDicari(b1), L.zonaDicari({ ...b1, cari: "bagian" }), L.zonaDicari({ ...b1, cari: "bagian", tukar: true })], ["utuh", "kanan", "kiri"], "zona yang dicari");
  sama([L.isiZona({ ...b1, cari: "bagian" }), L.isiZona({ ...b1, tukar: true })], [{ utuh: 15, kiri: 10, kanan: 5 }, { utuh: 15, kiri: 5, kanan: 10 }], "isi zona");
  sama(L.isiLangkah(c1), ["pensil 13, penggaris 4 kurangnya", "banyak penggaris", "13 − 4", "jadi penggaris 9"], "isi empat langkah");
  sama(L.NAMA_LANGKAH.join(), "Diketahui,Ditanya,Solusi,Kesimpulan", "empat langkah berurutan");
  cek(L.kalimatCerita(c1).join(" ") === "Pensil ada 13. Penggaris 4 kurangnya dari pensil." && L.tanyaCerita(c1) === "Berapa penggaris?" && L.solusiCerita(c1) === "13 − 4 = 9" && L.solusiCerita({ ...c1, kata: "jumlah" }) === "13 + 4 = 17", "kalimat cerita, tanya, dan solusi");
  for (const x of [e, b1, { ...b1, cari: "bagian" }, p1, { ...p1, arah: "ambil" }, m1, { ...m1, arah: "tambah" }]) {
    cek(tanpaDigit(L.kalimatKunci(x)) && bersih(L.kalimatKunci(x)), `kalimat kunci ${x.tipe} tanpa digit`);
    cek(tanpaDigit(L.kalimatTanya(x)) && bersih(L.kalimatTanya(x)), `kalimat tanya ${x.tipe} tanpa digit`);
    for (const r of ["benda", "diagram", "lambang"]) for (const c of ["klik", "kanvas", "suara"]) cek(tanpaDigit(L.instruksi(x, r, c)) && bersih(L.instruksi(x, r, c)), `instruksi ${x.tipe}/${r}/${c} tanpa digit dan bersih`);
  }
  cek(L.BATAS === 20, "batas dua puluh");
  cek(L.BENDA.length === 10 && new Set(L.BENDA.map((x) => x.nama)).size === 10 && L.BENDA.every((x) => tanpaDigit(x.nama) && bersih(x.nama) && [...x.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "benda: sepuluh jenis, emoji paling tinggi U+1FA95 tanpa ZWJ");
  cek(L.BENDA.every((x, i) => i === L.bendaKe(i, 0) && L.bendaKe(i, 1) !== i && L.BENDA[L.bendaKe(i, 1)]), "benda: pasangan benda kedua ada");
  // Tanda salah.
  cek(L.petunjukTanda(e, "tambah").length > 10 && L.petunjukTanda(m1, "kurang").length > 10 && tanpaDigit(L.petunjukTanda(e, "tambah")) && tanpaDigit(L.petunjukTanda(m1, "kurang")) && tanpaDigit(L.petunjukZona(b1)) && tanpaDigit(L.petunjukZona({ ...b1, cari: "bagian" })), "petunjuk tanda dan zona tanpa digit");
}

/* ------------------------------ Mind-map tali pita gunting ------------------------------ */
{
  const t = D.TEMPAT_PITA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "pita: tiga masalah, tujuh petak bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "pita: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "pita: petak bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["kata petunjuk", "diketahui", "ditanya", "bagian dan utuh", "peragakan cerita", "berpikir mundur", "solusi", "dua bilangan", "kesimpulan", "periksa"]) cek(gab.includes(k), `pita: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["tambah", "kurang", "jumlah", "lebihnya", "selisih", "kurangnya", "bilangan awal", "cerita hitungan"]) cek(hasil.includes(k), `pita: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/tambah atau kurang/.test(masalah) && /banyak bilangan/.test(masalah) && /bilangan awal/.test(masalah), "pita: masalah salah pilih tanda, banyak bilangan, bilangan awal");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|pak budi|pensil|penggaris|penghapus|rautan|topi|koperasi|pesanan)\b/i.test(x.kunci)), "pita: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "pita: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_PITA + D.PETUNJUK_URUT_PITA) && bersih(D.SUARA_PITA), "pita: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_PITA).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "pita: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 83);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "pita: petak bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis daftar pesanan besar ------------------------------ */
{
  const b = D.BARIS_DAFTAR;
  sama(b.length, 6, "daftar: enam baris");
  sama(b.map((x) => x.hasil), ["8", "20", "4", "17", "15", "11"], "daftar: hasil dari Story");
  sama(b.map((x) => x.kata), ["Kurangnya", "Jumlah", "Selisih", "Tiga bilangan", "Bilangan awal", "Lebihnya"], "daftar: kata petunjuk baris");
  for (const x of b) {
    const bil = x.hitung.match(/\d+/g).map(Number);
    const hasil = /−/.test(x.hitung) ? bil[0] - bil[1] : bil.reduce((m, n) => m + n, 0);
    cek(String(hasil) === x.hasil, `daftar: ${x.hitung} = ${x.hasil}`);
    cek(bil.every((n) => n <= 20) && Number(x.hasil) <= 20, `daftar: ${x.hitung} sampai dua puluh`);
  }
  sama(D.TEMPAT_DAFTAR.length, 18, "daftar: delapan belas kotak");
  cek(new Set(D.TEMPAT_DAFTAR.map((x) => x.kunci)).size === 18, "daftar: label unik");
  cek(D.TEMPAT_DAFTAR.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_DAFTAR) && bersih(D.SUARA_DAFTAR), "daftar: label pendek, suara tanpa digit");
  cek(D.KOLOM_DAFTAR.length === 3 && Object.keys(D.KELOMPOK_DAFTAR).every((k2) => D.TEMPAT_DAFTAR.some((x) => x.kelompok === k2)), "daftar: tiga kolom");
  cek(Object.values(D.KELOMPOK_DAFTAR).every((x) => tanpaDigit(x) && bersih(x)), "daftar: petunjuk kolom tanpa digit");
  cek(b.every((x) => [...x.ikon].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "daftar: emoji paling tinggi U+1FA95 tanpa ZWJ");
}

/* ------------------------------ CPA ------------------------------ */
const BENDA_NAMA = L.BENDA.map((x) => x.nama);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Meja Pesanan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 20), `${nama}: jawaban satu sampai dua puluh (${angka.join(",")})`);
  cek(angka.every((n) => !STORY.includes(n)), `${nama}: jawaban tidak sama dengan hasil Story (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`).sort(), ["kanvas/bagian", "klik/bagian"], `${nama}: dua langkah tanpa angka (menunjuk bagian atau utuh) di Klik dan Kanvas`);
  sama(semua.filter((x) => x.cara === "suara").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah suara berjawaban angka`);
  cek(semua.some((x) => { const k = L.angkaJawab(x.langkah); return k !== null && k >= 10; }), `${nama}: ada jawaban dua angka (dua kotak)`);
  cek(semua.some((x) => { const k = L.angkaJawab(x.langkah); return k !== null && k <= 9; }), `${nama}: ada jawaban satu angka`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada tugas Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20)), `${nama}: jawaban ${l.tokoh} memang salah (kecuali tokoh benar)`);
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
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari tugas dasarnya`);
  }
  // Seed dari alur.
  const ss = salah.map((x) => x.langkah).find((x) => !x.betul);
  if (rupa === "benda") cek(ss.dasar.tipe === "empat" && ss.dasar.c.kata === "kurangnya" && ss.tokoh === "Chacha" && ss.jawabTokoh === ss.dasar.c.a + ss.dasar.c.b && /kurangnya berarti lebih sedikit/i.test(ss.alasan.join(" ")) && /tambah/.test(ss.kataTokoh), `${nama}: Chacha menjumlahkan padahal kata petunjuknya kurangnya`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "empat" && ss.dasar.c.kata === "lebihnya" && ss.tokoh === "Nia" && ss.jawabTokoh === undefined && /kurang/.test(ss.kataTokoh) && /lebihnya berarti lebih banyak/i.test(ss.alasan.join(" ")), `${nama}: Nia memilih tanda kurang untuk lebihnya`);
  if (rupa === "lambang") {
    const dika = salah.map((x) => x.langkah).find((x) => x.tokoh === "Dika");
    cek(dika && dika.dasar.tipe === "mundur" && dika.jawabTokoh === dika.dasar.akhir - dika.dasar.b && L.kunciLangkah(dika.dasar) === dika.dasar.akhir + dika.dasar.b && /dikembalikan|kembalikan/.test(dika.keliru), `${nama}: Dika mengurangi padahal bilangan awal dicari dengan membalik`);
    cek(salah.length === 2 && salah.filter((x) => x.langkah.betul === true).length === 1 && salah.find((x) => x.langkah.betul).langkah.jawabTokoh === undefined && salah.find((x) => x.langkah.betul).langkah.tokoh === "Chacha", `${nama}: satu lagi di mana tokoh benar`);
  }

  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    cek(Number.isInteger(l.benda ?? l.c.benda) && (l.benda ?? l.c.benda) >= 0 && (l.benda ?? l.c.benda) < L.BENDA.length, `${lbl}: jenis benda ada`);
    const operan = l.tipe === "empat" ? [l.c.a, l.c.b] : l.tipe === "mundur" ? [l.akhir, l.b] : [l.a, l.b];
    cek(operan.every((v) => Number.isInteger(v) && v >= 1 && v <= 20), `${lbl}: operan satu sampai dua puluh (${operan.join(",")})`);
    cek(!PASANGAN_STORY.includes(kunciPasang(operan[0], operan[1])), `${lbl}: pasangan operan berbeda dari Story (${operan.join(",")})`);
    if (l.tipe === "empat") {
      cek(L.ceritaSah(l.c), `${lbl}: cerita sah (${JSON.stringify(l.c)})`);
      sama(k, ["lebihnya", "jumlah"].includes(l.c.kata) ? l.c.a + l.c.b : l.c.a - l.c.b, `${lbl}: kunci cerita dihitung ulang`);
      cek(l.c.a >= 1 && l.c.a + (l.c.kata === "lebihnya" ? l.c.b : 0) <= 20, `${lbl}: baris benda muat`);
    }
    if (l.tipe === "bagian") {
      cek(l.a + l.b <= 20 && l.a >= 1 && l.b >= 1, `${lbl}: utuh paling besar dua puluh`);
      cek(l.a <= 12 && l.b <= 12, `${lbl}: bagian muat di zona (${l.a},${l.b})`);
      if (l.angka) sama(k, l.cari === "utuh" ? l.a + l.b : l.b, `${lbl}: kunci bagian dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${lbl}: menunjuk tanpa angka, bukan suara`);
      cek(x.cara !== "suara" || l.angka, `${lbl}: suara menjawab angka`);
    }
    if (l.tipe === "peragakan") {
      cek(l.arah === "tambah" ? l.a + l.b <= 20 : l.a - l.b >= 1, `${lbl}: peragaan dalam batas`);
      sama(k, l.arah === "tambah" ? l.a + l.b : l.a - l.b, `${lbl}: kunci peragaan dihitung ulang`);
      cek(l.b <= 9, `${lbl}: kelompok yang bergerak muat di atas meja (${l.b})`);
    }
    if (l.tipe === "mundur") {
      sama(k, l.arah === "ambil" ? l.akhir + l.b : l.akhir - l.b, `${lbl}: kunci mundur dihitung ulang`);
      cek(l.arah === "ambil" ? l.akhir + l.b <= 20 : l.akhir - l.b >= 1 && l.akhir <= 20, `${lbl}: mundur dalam batas`);
      cek(l.arah === "tambah" ? l.akhir - l.b >= 1 : true, `${lbl}: ada bilangan awal`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${lbl}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10 && bersih(L.petunjukSalah(x.langkah, m)), `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 260, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    // Tidak ada tugas yang macet: tugas Abstract langsung siap dijawab (kecuali menunjuk bagian tanpa angka lewat tombol), Concrete dan Pictorial langsung hanya di Rekam suara.
    {
      const langsung = L.siapLangsung(l, rupa, x.cara);
      if (rupa === "lambang") cek(langsung === !(l.tipe === "bagian" && !l.angka), `${lbl}: Abstract langsung siap kecuali menunjuk bagian tanpa angka`);
      else cek(langsung === (x.cara === "suara"), `${lbl}: ${rupa} langsung siap hanya di Rekam suara`);
      cek(!L.siapLangsung(l, rupa, x.cara, true), `${lbl}: gambar bahan Cari kesalahan tidak langsung siap`);
      cek(langsung || k === null || x.cara !== "suara", `${lbl}: tugas bernomor jawaban punya jalan menuju kotak jawaban`);
      cek(langsung || x.cara !== "suara", `${lbl}: tugas suara selalu langsung siap`);
    }
    // Batas rupa pada instruksi.
    if (rupa === "diagram") cek(![...BENDA_NAMA].some((n) => new RegExp(`\\b${n}\\b`).test(x.suara)) && !/\bbenda\b/i.test(x.suara.replace(/benda yang/g, "")), `${lbl}: Pictorial tanpa nama benda (${x.suara})`);
    if (rupa === "benda") cek(!/garis bilangan|model batang|tabel|bagan|diagram|petak/i.test(x.suara), `${lbl}: Concrete tanpa garis bilangan, bagan, model batang, tabel (${x.suara})`);
    if (rupa === "lambang") cek(!/(diagram|petak|deretan|gambar|ketuk benda)/i.test(x.suara), `${lbl}: Abstract tanpa gambar benda atau diagram (${x.suara})`);
  }
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)));
  const tipe = new Set(semua.map((l) => l.tipe));
  cek(["empat", "bagian", "peragakan", "mundur"].every((t) => tipe.has(t)), "kegiatan beragam: empat jenis langkah");
  const kata = new Set(semua.filter((l) => l.tipe === "empat").map((l) => l.c.kata));
  cek(["lebihnya", "kurangnya", "selisih", "jumlah"].every((t) => kata.has(t)), "kegiatan beragam: empat kata petunjuk muncul");
  cek(semua.some((l) => l.tipe === "bagian" && l.cari === "utuh") && semua.some((l) => l.tipe === "bagian" && l.cari === "bagian") && semua.some((l) => l.tipe === "bagian" && l.tukar), "kegiatan beragam: cari utuh, cari bagian, bagian di kiri");
  cek(semua.some((l) => l.tipe === "peragakan" && l.arah === "tambah") && semua.some((l) => l.tipe === "peragakan" && l.arah === "ambil") && semua.some((l) => l.tipe === "mundur" && l.arah === "tambah") && semua.some((l) => l.tipe === "mundur" && l.arah === "ambil"), "kegiatan beragam: datang dan diambil, ditambah dan terjual");
  cek(new Set(semua.map((l) => l.benda ?? l.c.benda)).size >= 6, "kegiatan beragam: paling sedikit enam jenis benda");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["kata petunjuk", "lebihnya", "kurangnya", "selisih", "jumlah", "diketahui", "ditanya", "solusi", "kesimpulan", "tiga bilangan", "bilangan awal", "bagian dan utuh", "peragakan cerita", "berpikir mundur"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA + D.PENUTUP_BAB) && bersih(D.PERAYAAN + D.PENUTUP_BAB) && /koperasi sekolah resmi dibuka/.test(D.PERAYAAN) && /Bab dua/.test(D.PENUTUP_BAB), "perayaan akhir cerita bab dan penutup tanpa digit");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_PEMBUKAAN === D.CONCRETE && D.PICTORIAL_PEMBUKAAN === D.PICTORIAL && D.ABSTRACT_PEMBUKAAN === D.ABSTRACT && D.TEMA_PEMBUKAAN === D.TEMA_TAHAP && typeof D.MISI_PESANAN === "string", "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara) && [...t.ikon].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "tema tahap: teks bersih, emoji paling tinggi U+1FA95");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const lingkaran = (c, r) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + r * Math.cos((i / 24) * Math.PI * 2), y: c.y + r * Math.sin((i / 24) * Math.PI * 2) }));
  const sekitar = (pts, pad) => {
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const [x0, x1, y0, y1] = [Math.min(...xs) - pad, Math.max(...xs) + pad, Math.min(...ys) - pad, Math.max(...ys) + pad];
    return [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }, { x: x0, y: y0 + 1 }];
  };
  // Baris benda.
  for (let n = 1; n <= 20; n += 1) {
    const pts = K.tataBaris(n, 50);
    cek(pts.length === n && pts.every((p) => p.x >= 8 && p.x <= 292 && p.y === 50), `tata letak: ${n} benda dalam satu baris muat di kanvas`);
    if (n >= 2) cek(pts[1].x - pts[0].x >= 12, `tata letak: ${n} benda berjarak cukup (${pts[1].x - pts[0].x})`);
    cek(Math.abs((pts[0].x + pts[n - 1].x) / 2 - 150) < 1, `tata letak: ${n} benda berpusat`);
  }
  // Baris cerita dan kartu tanda tidak bertabrakan.
  cek(K.Y_CERITA[1] - K.Y_CERITA[0] >= 30 && K.OP_PUSAT.tambah.y - K.OP_UKURAN.h / 2 > K.Y_CERITA[1] + 24 && K.OP_PUSAT.tambah.y + K.OP_UKURAN.h / 2 < 200, "tata letak: dua baris cerita dan kartu tanda muat tanpa tumpang tindih");
  cek(K.OP_PUSAT.kurang.x - K.OP_PUSAT.tambah.x >= K.OP_UKURAN.w + 10 && K.OP_PUSAT.tambah.x - K.OP_UKURAN.w / 2 >= 0 && K.OP_PUSAT.kurang.x + K.OP_UKURAN.w / 2 <= 300, "tata letak: dua kartu tanda berjauhan untuk dilingkari");
  cek(K.periksaLingkari([lingkaran(K.OP_PUSAT.tambah, 50)], [K.OP_PUSAT.tambah, K.OP_PUSAT.kurang], [true, false]).benar && !K.periksaLingkari([lingkaran(K.OP_PUSAT.kurang, 50)], [K.OP_PUSAT.tambah, K.OP_PUSAT.kurang], [true, false]).benar, "lingkari: kartu tanda tambah benar, kurang salah");
  // Zona bagian dan utuh.
  for (const z of ["utuh", "kiri", "kanan"]) {
    const kt = K.ZONA_KOTAK[z];
    const c = K.ZONA_PUSAT[z];
    cek(c.x === kt.x + kt.w / 2 && c.y >= kt.y && c.y <= kt.y + kt.h && kt.x >= 0 && kt.x + kt.w <= 300 && kt.y + kt.h <= 190, `tata letak: zona ${z} di dalam kanvas`);
    for (let n = 1; n <= (z === "utuh" ? 20 : 12); n += 1) {
      const pts = K.titikZona(z, n);
      cek(pts.length === n && pts.every((p) => p.x - 7 >= kt.x && p.x + 7 <= kt.x + kt.w && p.y - 8 >= kt.y && p.y + 8 <= kt.y + kt.h), `tata letak: ${n} benda muat di zona ${z}`);
    }
  }
  cek(K.ZONA_KOTAK.kanan.x - (K.ZONA_KOTAK.kiri.x + K.ZONA_KOTAK.kiri.w) >= 8 && K.ZONA_KOTAK.kiri.y >= K.ZONA_KOTAK.utuh.y + K.ZONA_KOTAK.utuh.h + 10, "tata letak: tiga zona tidak tumpang tindih");
  cek(K.R_BULAT * 2 <= K.ZONA_KOTAK.kiri.h && K.ZONA_PUSAT.kiri.x - K.R_BULAT >= 0 && K.ZONA_PUSAT.kanan.x + K.R_BULAT <= 300 && K.ZONA_PUSAT.kiri.y + K.R_BULAT + 16 <= 200, "tata letak: bulatan bagian dan utuh muat");
  for (const z of ["utuh", "kiri", "kanan"]) {
    const pts = ["utuh", "kiri", "kanan"].map((q) => K.ZONA_PUSAT[q]);
    cek(K.periksaLingkari([lingkaran(K.ZONA_PUSAT[z], 34)], pts, ["utuh", "kiri", "kanan"].map((q) => q === z)).benar, `lingkari: zona ${z} benar`);
  }
  // Peragakan: kelompok yang bergerak.
  for (const [a, b] of [[9, 4], [8, 2], [6, 4], [5, 7], [9, 7]]) {
    const total = a + b;
    const meja = K.tataBaris(total, K.Y_MEJA);
    const datang = K.tataBaris(b, K.Y_DATANG);
    cek(K.Y_MEJA - K.Y_DATANG >= 40 && K.Y_MEJA + 56 < 200 && K.Y_DATANG - 18 > 20, "tata letak: kelompok yang datang jauh dari baris meja");
    cek(K.periksaLingkari([sekitar(datang, 12)], [...datang, ...meja.slice(0, a)], [...datang.map(() => true), ...meja.slice(0, a).map(() => false)]).benar, `lingkari: kelompok datang ${b} benar untuk ${a} di meja`);
  }
  for (const [a, b] of [[15, 9], [12, 7], [15, 3]]) {
    const meja = K.tataBaris(a, K.Y_MEJA);
    cek(K.periksaLingkari([sekitar(meja.slice(a - b), 8)], meja, meja.map((_, i) => i >= a - b)).benar, `lingkari: ${b} benda yang diambil dari ${a} benar`);
    cek(!K.periksaLingkari([sekitar(meja.slice(a - b + 1), 8)], meja, meja.map((_, i) => i >= a - b)).benar, `lingkari: kurang satu benda yang diambil ditolak (${b} dari ${a})`);
  }
  // Mundur: baris akhir muat dan label tidak keluar.
  for (const [akhir, b, arah] of [[7, 5, "ambil"], [6, 3, "ambil"], [12, 6, "ambil"], [10, 8, "ambil"], [11, 7, "ambil"], [19, 5, "tambah"], [12, 5, "tambah"], [9, 7, "tambah"]]) {
    const total = arah === "ambil" ? akhir + b : akhir;
    const pts = K.tataBaris(total, K.Y_AKHIR);
    cek(total <= 20 && pts[0].x >= 8 && pts[total - 1].x <= 292 && K.Y_AKHIR + 26 < K.OP_PUSAT.tambah.y - K.OP_UKURAN.h / 2, `tata letak: baris akhir ${akhir} dan ${b} muat di atas kartu tanda`);
  }
  // Pengenal ucapan sampai dua puluh.
  const u = K.bilanganDariUcapan20;
  sama(u("dua puluh"), [20], "ucapan: dua puluh");
  sama(u("sembilan belas"), [19], "ucapan: sembilan belas");
  sama(u("sebelas"), [11], "ucapan: sebelas");
  sama(u("tujuh belas"), [17], "ucapan: tujuh belas");
  sama(u("sepuluh"), [10], "ucapan: sepuluh");
  sama(u("13"), [13], "ucapan: angka");
  sama(u("enam belas"), [16], "ucapan: enam belas");
  sama(u("sepuluh dan enam"), [10, 6], "ucapan: sepuluh dan enam");
  cek(!u("seratus dua puluh").includes(120), "ucapan: di atas dua puluh tidak dikenali");
}

/* ------------------------------ Simulasi Meja Pesanan Besar dan misi ------------------------------ */
{
  const d = D.SLIP_SIM;
  sama(d.map((x) => `${x.kata}:${x.a},${x.b}`), ["jumlah:5,8", "selisih:16,9", "lebihnya:8,5", "kurangnya:14,6"], "simulasi: empat kertas pesanan (topi dan dasi, tas dan kotak pensil, baju dan topi, gunting dan klip)");
  cek(new Set(d.map((x) => x.kata)).size === 4 && d.every((x) => L.ceritaSah(x)) && d.every((x) => !STORY.includes(L.hasilCerita(x)) || true), "simulasi: tiap kata petunjuk satu kertas, semua cerita sah");
  cek(d.every((x) => !PASANGAN_STORY.includes(kunciPasang(x.a, x.b))), "simulasi: operan berbeda dari Story");
  const t = D.TIGA_SIM;
  cek(t.isi.length === 3 && t.isi.reduce((m, n) => m + n, 0) <= 20 && t.isi.some((x, i) => t.isi.some((y, j) => i < j && x + y === 10)) && t.isi.join() !== "4,6,7" && t.isi.every((n) => n >= 1 && n <= 20), "simulasi: tiga bilangan jumlah paling besar dua puluh dan ada dua bilangan berjumlah sepuluh");
  const a = D.AWAL_SIM;
  cek(L.awalDari(a) === 14 && a.arah === "ambil" && L.awalDari(a) <= 20 && !(a.akhir === 9 && a.b === 6), "simulasi: baju tinggal enam setelah delapan diambil, mula-mula empat belas, berbeda dari Story");
  cek(tanpaDigit(D.MISI_PESANAN) && bersih(D.MISI_PESANAN), "simulasi: teks misi tanpa digit dan bersih");
  const k0 = L.awalPembukaan();
  const daftar = MK.MISI_C;
  const tampil = daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  cek(MK.daftarMisiK2Bab2("C") === daftar && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && new Set(daftar.map((m) => m.id)).size === 6 && daftar.every((m) => m.id.startsWith("c-")), "misi C: empat wajib, dua bebas, id unik berawalan c-");
  cek(daftar.every((m) => !/\d/.test(m.teks) && m.teks.length >= 10 && m.teks.length <= 120 && bersih(m.teks)), "misi C: teks tanpa digit, panjang cukup, bersih");
  cek(S.misiBaru(daftar, k0, new Set()).length === 0 && S.misiBaru(daftar, { alat: "selesai", id: "x" }, new Set()).length === 0 && daftar.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "stok" })), "misi C: keadaan awal dan alat lain tidak memenuhi misi");
  const ada = (k, id) => S.misiBaru(daftar, k, new Set()).includes(id);

  // Kata dan tanda.
  sama([k0.mode, k0.slip], ["kata", 0], "simulasi: mulai di alat Kata, kertas pertama");
  let k = k0;
  const salahTanda = L.pasangTanda(k, "kurang", d);
  cek(!salahTanda.ok && salahTanda.k.tandaSalah === 1 && salahTanda.k.kataBenar.length === 0 && !ada(salahTanda.k, "c-kata"), "simulasi: jumlah dipasangkan kurang itu salah dan dicatat");
  const benar1 = L.pasangTanda(k, "tambah", d);
  cek(benar1.ok && benar1.k.kataBenar.join() === "jumlah" && !ada(benar1.k, "c-kata"), "simulasi: jumlah dengan tambah benar, satu kata belum cukup");
  cek(L.pasangTanda(benar1.k, "tambah", d).k.kataBenar.length === 1, "simulasi: kata yang sama tidak dihitung dua kali");
  k = L.bukaSlip(benar1.k, 1, d);
  sama([k.slip, k.urut.length], [1, 0], "simulasi: buka kertas selisih");
  cek(L.bukaSlip(k, 9, d) === k && L.bukaSlip(k, 1, d) === k, "simulasi: kertas yang tidak ada atau sama tidak mengubah keadaan");
  const benar2 = L.pasangTanda(k, "kurang", d);
  cek(benar2.ok && benar2.k.kataBenar.join() === "jumlah,selisih" && ada(benar2.k, "c-kata") && !ada(benar2.k, "c-semua"), "simulasi: selisih dengan kurang benar, dua kata berbeda memenuhi misi");
  let semua4 = benar2.k;
  semua4 = L.pasangTanda(L.bukaSlip(semua4, 2, d), "tambah", d).k;
  semua4 = L.pasangTanda(L.bukaSlip(semua4, 3, d), "kurang", d).k;
  cek(semua4.kataBenar.length === 4 && ada(semua4, "c-semua"), "simulasi: keempat kata petunjuk dipasangkan, misi bebas");
  let semuaBenar = true;
  for (let i = 0; i < d.length; i += 1)
    for (const tn of ["tambah", "kurang"]) if (L.pasangTanda(L.bukaSlip(k0, i, d), tn, d).ok !== (L.tandaKata(d[i].kata) === tn)) semuaBenar = false;
  cek(semuaBenar, "simulasi: tanda benar untuk setiap kertas");

  // Empat langkah.
  cek(!L.ketukLangkah(k0, 1).ok && L.ketukLangkah(k0, 1).k.urutSalah === 1 && L.ketukLangkah(k0, 0).ok && !L.ketukLangkah(k0, 4).ok && !L.ketukLangkah(k0, -1).ok, "simulasi: langkah dimulai dari diketahui, urutan salah dicatat");
  let kl = k0;
  for (const n of [0, 1, 2]) kl = L.ketukLangkah(kl, n).k;
  cek(kl.urut.join() === "0,1,2" && kl.langkahTuntas === 0 && !ada(kl, "c-langkah") && !L.ketukLangkah(kl, 1).ok, "simulasi: tiga langkah belum tuntas, langkah yang sudah diketuk ditolak");
  kl = L.ketukLangkah(kl, 3).k;
  cek(kl.urut.join() === "0,1,2,3" && kl.langkahTuntas === 1 && ada(kl, "c-langkah"), "simulasi: empat langkah berurutan tuntas");
  cek(L.ulangLangkah(kl).urut.length === 0 && L.ulangLangkah(kl).langkahTuntas === 1, "simulasi: ulangi susunan tidak menghapus catatan tuntas");
  cek(L.bukaSlip(kl, 2, d).urut.length === 0, "simulasi: ganti kertas mengosongkan susunan");

  // Tiga bilangan.
  let kt = L.pilihTiga(k0, 0);
  kt = L.pilihTiga(kt, 2);
  sama(kt.tiga, [0, 2], "simulasi: dua bilangan dipilih (4 dan 6)");
  cek(L.pilihTiga(kt, 1).tiga.join() === "1" && L.pilihTiga(kt, 0).tiga.join() === "2" && L.pilihTiga(kt, 7) === kt, "simulasi: pilihan ketiga memulai pilihan baru, ketuk lagi membatalkan");
  cek(L.jumlahTiga(L.pilihTiga(k0, 0), D.TIGA_SIM).tigaTuntas === 0, "simulasi: jumlahkan perlu dua bilangan");
  const kj = L.jumlahTiga(kt, D.TIGA_SIM);
  cek(kj.tigaTuntas === 1 && kj.tigaMudah === true && ada(kj, "c-tiga") && !ada(kt, "c-tiga"), "simulasi: dua bilangan berjumlah sepuluh dulu, tiga bilangan tuntas dan mudah");
  const kj2 = L.jumlahTiga(L.pilihTiga(L.pilihTiga(k0, 0), 1), D.TIGA_SIM);
  cek(kj2.tigaTuntas === 1 && kj2.tigaMudah === false && ada(kj2, "c-tiga"), "simulasi: urutan lain tetap tuntas, bukan mudah");
  sama(D.TIGA_SIM.isi.reduce((m, n) => m + n, 0), 19, "simulasi: jumlah tiga bilangan sembilan belas");

  // Bilangan awal.
  const salahAwal = L.balikAwal(k0, "kurang", D.AWAL_SIM);
  cek(!salahAwal.ok && salahAwal.k.awalTanda === null && salahAwal.k.tandaSalah === 1 && !ada(salahAwal.k, "c-awal"), "simulasi: kurang untuk benda yang tadi diambil itu salah");
  const benarAwal = L.balikAwal(k0, "tambah", D.AWAL_SIM);
  cek(benarAwal.ok && benarAwal.k.awalTanda === "tambah" && benarAwal.k.awalTuntas === 1 && ada(benarAwal.k, "c-awal"), "simulasi: tambah untuk benda yang tadi diambil benar");
  cek(L.balikAwal(benarAwal.k, "tambah", D.AWAL_SIM).k.awalTuntas === 1, "simulasi: tanda yang sama tidak dihitung dua kali");
  cek(L.balikAwal(k0, "kurang", { ...D.AWAL_SIM, arah: "tambah" }).ok && !L.balikAwal(k0, "tambah", { ...D.AWAL_SIM, arah: "tambah" }).ok, "simulasi: yang tadi ditambah dibalik dengan kurang");

  // Cerita buatan sendiri.
  cek(L.susunBuat(k0).ok && L.susunBuat(k0).k.buatTuntas === 1 && L.susunBuat(k0).k.kataBuat.join() === "lebihnya" && ada(L.susunBuat(k0).k, "c-buat") && !ada(k0, "c-buat"), "simulasi: cerita buatan bawaan sah dan tercatat");
  const tidakSah = L.ubahBuat(k0, { kata: "kurangnya", a: 3, b: 9 });
  cek(!L.susunBuat(tidakSah).ok && L.susunBuat(tidakSah).k.buatTuntas === 0 && !ada(L.susunBuat(tidakSah).k, "c-buat"), "simulasi: cerita dengan hasil di bawah satu ditolak");
  cek(!L.susunBuat(L.ubahBuat(k0, { kata: "jumlah", a: 18, b: 5 })).ok, "simulasi: cerita dengan hasil di atas dua puluh ditolak");
  const dua = L.susunBuat(L.ubahBuat(L.susunBuat(k0).k, { kata: "jumlah", a: 5, b: 6, benda: 4 })).k;
  cek(dua.buatTuntas === 2 && dua.kataBuat.join() === "lebihnya,jumlah", "simulasi: dua cerita, dua kata petunjuk berbeda tercatat");
  // Mode, main lagi, dan kalimat suara tanpa digit.
  cek(L.pilihModePembukaan(k0, "tiga").mode === "tiga" && JSON.stringify(L.mulaiLagiPembukaan()) === JSON.stringify(k0), "simulasi: ganti alat dan main lagi");
  const kalimat = [k0, benar1.k, kl, kt, kj, benarAwal.k, tidakSah, ...["kata", "langkah", "tiga", "awal", "buat"].map((m) => L.pilihModePembukaan(k0, m)), L.pilihModePembukaan(benarAwal.k, "awal"), L.pilihModePembukaan(kt, "tiga"), L.pilihModePembukaan(kl, "langkah"), L.pilihModePembukaan(L.ketukLangkah(k0, 0).k, "langkah"), L.pilihModePembukaan(L.pilihTiga(k0, 0), "tiga"), L.pilihModePembukaan(tidakSah, "buat"), L.pilihModePembukaan(k0, "buat")].map((x) => L.kalimatPembukaan(x, d, D.TIGA_SIM, D.AWAL_SIM));
  cek(kalimat.every((x) => tanpaDigit(x) && bersih(x) && x.length > 10), "simulasi: kalimat suara tanpa digit dan bersih");
  // Gerbang misi dan jalan bermain.
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(S.wajibSelesai(tampil, new Set(wajib)) && !S.wajibSelesai(tampil, new Set(wajib.slice(1))), "misi C: gerbang misi");
  cek(MK.MISI_A !== undefined && MK.MISI_B !== undefined, "misi: Sub-Bab lain tidak terganggu");
  let akhir = L.pasangTanda(L.awalPembukaan(), "tambah", d).k;
  akhir = L.pasangTanda(L.bukaSlip(akhir, 1, d), "kurang", d).k;
  for (const n of [0, 1, 2, 3]) akhir = L.ketukLangkah(akhir, n).k;
  akhir = L.jumlahTiga(L.pilihTiga(L.pilihTiga(akhir, 0), 2), D.TIGA_SIM);
  akhir = L.balikAwal(akhir, "tambah", D.AWAL_SIM).k;
  cek(S.misiBaru(daftar.filter((m) => m.wajib), akhir, new Set()).length === 4, "misi C: satu jalan bermain memenuhi keempat misi wajib");
  cek(S.misiBaru(daftar, akhir, new Set()).length === 4, "misi C: dua misi bebas belum tercapai setelah jalan wajib saja");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "Jawab20.tsx", "LangkahPembukaan.tsx", "TahapPembukaan.tsx", "TaliPitaGunting.tsx", "DaftarPesananBesar.tsx", "SimulasiMejaPesananBesar.tsx"]) cek(berkas.includes(f), `folder memuat ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (/\.tsx$/.test(f) || f === "data.ts") cek(!/\b(skor|nilai tempat|bernilai)\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")), `${f}: tanpa kata skor, nilai tempat, bernilai pada teks`);
    if (f === "logika.ts" || f === "data.ts" || f === "periksa.ts") cek(!/from "react"|fetch\(/.test(s), `${f}: murni tanpa React dan jaringan`);
    // Gaya border React: tidak mencampur borderStyle dengan borderRightStyle dan sejenisnya.
    cek(!(/borderStyle/.test(s) && /border(Top|Right|Bottom|Left)(Style|Width|Color)/.test(s)), `${f}: tanpa campuran borderStyle dan borderRightStyle`);
  }
  const lang = readFileSync(new URL("LangkahPembukaan.tsx", folderUrl), "utf8");
  // Tiap jenis tugas memanggil useSiapLangsung dengan rupa dan cara sebelum menggambar rupa lambang (supaya Abstract tidak macet).
  for (const nama of ["Empat", "Bagian", "Peragakan", "Mundur"]) {
    const mulai = lang.indexOf(`function ${nama}(`);
    const badan = lang.slice(mulai, lang.indexOf("\nfunction ", mulai + 10) > 0 ? lang.indexOf("\nfunction ", mulai + 10) : undefined);
    const iHook = badan.indexOf("useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());");
    const iLambang = badan.indexOf('rupa === "lambang"');
    cek(iHook > 0 && iLambang > iHook, `LangkahPembukaan: ${nama} memanggil useSiapLangsung dengan rupa dan cara sebelum rupa lambang`);
    cek(/\bdiam\b/.test(badan) && /Gambar label=/.test(badan), `LangkahPembukaan: ${nama} punya gambar diam untuk Cari kesalahan`);
  }
  cek(/function CariSalah/.test(lang) && /geser/.test(lang) && /export function LangkahPembukaan/.test(lang) && /JawabTulisPembukaan/.test(lang) && /JawabSuaraPembukaan/.test(lang), "LangkahPembukaan: Cari kesalahan, jawab tulis, dan jawab suara");
  const jw = readFileSync(new URL("Jawab20.tsx", folderUrl), "utf8");
  cek(/BATAS_SALAH/.test(jw) && /Ini jawaban yang benar|Jawaban yang benar adalah/.test(jw) && /JawabDuaKotak/.test(jw), "Jawab20: jawaban benar ditampilkan setelah tiga kali salah, dua kotak untuk dua angka");
  const sim = readFileSync(new URL("SimulasiMejaPesananBesar.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /export default function SimulasiMejaPesananBesar/.test(sim), "simulasi: komponen melapor keadaan");
  const tahap = readFileSync(new URL("TahapPembukaan.tsx", folderUrl), "utf8");
  cek(/export default function TahapPembukaan/.test(tahap) && /poinPenting/.test(tahap) && /PERAYAAN/.test(tahap) && /KOPERASI SEKOLAH DIBUKA/.test(tahap) && /umum: Umum/.test(tahap), "tahap: komponen dengan props umum, rupa, soal, pita, teksAkhir, poinPenting dan perayaan spanduk");
  cek(/export default function TaliPitaGunting/.test(readFileSync(new URL("TaliPitaGunting.tsx", folderUrl), "utf8")) && /export default function DaftarPesananBesar/.test(readFileSync(new URL("DaftarPesananBesar.tsx", folderUrl), "utf8")), "komponen Mind-map dan Infografis");
  const sub = readFileSync(new URL("../src/components/modul/SimulasiK2Bab2.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaPesananBesar/.test(sub) && /MISI_PESANAN/.test(sub) && /laporMisi\(daftarMisiK2Bab2\("C"\)/.test(sub), "SimulasiK2Bab2: langkah Meja Pesanan Besar terpasang");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
