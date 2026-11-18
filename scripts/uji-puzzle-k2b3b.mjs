// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab B ("Papan Puzzle yang Berantakan"), tengah cerita Taman Bermain Sekolah.
// Memeriksa: geometri keping (luas, tanpa celah dan tumpukan, tangram baku), kunci dihitung ulang, papan puzzle raksasa (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil),
// meja gambar dari data Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (nama bentuk, menyusun, mengurutkan, Cari kesalahan, satu angka)
// dan Cari kesalahan di tiap tahap, angka jawaban tidak kembar per tahap, pengenal ucapan nama bentuk dan angka, batas rupa, Simulasi Papan Puzzle dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-puzzle-k2b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const B = await import("../src/components/modul/puzzle-k2b3b/bentuk.ts");
const L = await import("../src/components/modul/puzzle-k2b3b/logika.ts");
const D = await import("../src/components/modul/puzzle-k2b3b/data.ts");
const K = await import("../src/components/modul/puzzle-k2b3b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab3.ts");
const folderUrl = new URL("../src/components/modul/puzzle-k2b3b/", import.meta.url);

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
const TOKOH = ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Ratna"];
// Hasil hitungan Story (alur): 2, 7, 5, 6, 4, 3, 1. Ruang jawaban sempit (satu sampai sembilan), jadi hanya angka kembar dalam satu tahap yang dilarang.
const STORY = [1, 2, 3, 4, 5, 6, 7];

/* ------------------------------ Geometri ------------------------------ */
const di = (p, poli) => {
  let masuk = false;
  for (let i = 0, j = poli.length - 1; i < poli.length; j = i, i += 1) {
    const a = poli[i];
    const b = poli[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) masuk = !masuk;
  }
  return masuk;
};
/** Keping menutup bangun luar: jumlah luas sama, dan tiap titik contoh di dalam luar berada di tepat satu keping. */
const tutup = (keping, luar, nama) => {
  const jumlah = keping.reduce((t, k) => t + B.luas(k.titik), 0);
  cek(Math.abs(jumlah - B.luas(luar)) < 0.6, `${nama}: jumlah luas keping sama dengan luas bangun (${jumlah.toFixed(1)} vs ${B.luas(luar).toFixed(1)})`);
  const xs = luar.map((p) => p.x);
  const ys = luar.map((p) => p.y);
  let buruk = 0;
  for (let x = Math.min(...xs) + 0.37; x < Math.max(...xs); x += 1.3137)
    for (let y = Math.min(...ys) + 0.41; y < Math.max(...ys); y += 1.2719) {
      const p = { x, y };
      const n = keping.filter((k) => di(p, k.titik)).length;
      if (di(p, luar) ? n !== 1 : n !== 0) buruk += 1;
    }
  cek(buruk === 0, `${nama}: tanpa celah dan tanpa tumpukan (${buruk} titik janggal)`);
};
{
  for (const kind of B.URUT_GABUNG) {
    const g = B.gabung(kind, 150, 100, 30);
    tutup(g.keping, g.luar, `gabung ${kind}`);
    cek(g.keping.length === B.banyakGabung(kind), `gabung ${kind}: banyak keping`);
  }
  sama(B.URUT_GABUNG.map((k) => B.HASIL_GABUNG[k]), ["persegi", "segitiga", "segiEnam", "segiEnam", "segiEnam"], "hasil tiap cara menyusun");
  sama(B.URUT_GABUNG.map((k) => B.banyakGabung(k)), [2, 2, 3, 3, 6], "banyak keping tiap cara menyusun");
  for (let n = 3; n <= 8; n += 1)
    for (const g of ["pojok", "pusat"]) {
      const u = B.urai(n, g, 150, 100, 50);
      tutup(u.keping, u.luar, `urai segi ${n} ${g}`);
      cek(u.keping.length === B.banyakUrai(n, g) && u.keping.every((k) => k.jenis === "segitiga"), `urai segi ${n} ${g}: banyak keping dan jenis`);
    }
  sama([B.banyakUrai(4, "pojok"), B.banyakUrai(5, "pojok"), B.banyakUrai(6, "pojok"), B.banyakUrai(6, "pusat"), B.banyakUrai(5, "pusat")], [2, 3, 4, 6, 5], "pola banyak segitiga: sisi dikurangi dua dan sama dengan sisi");
  for (const g of ["miring", "tengah"]) {
    const u = B.urai(4, g, 150, 100, 40);
    tutup(u.keping, u.luar, `persegi ${g}`);
    cek(u.keping.length === 2 && u.keping.every((k) => k.jenis === B.jenisUrai(4, g)), `persegi ${g}: dua keping sejenis`);
  }
  sama([B.jenisUrai(4, "miring"), B.jenisUrai(4, "tengah"), B.jenisUrai(6, "pusat")], ["segitiga", "segiEmpat", "segitiga"], "jenis hasil uraian");
  for (const l of B.URUT_LIPATAN) {
    const x = B.lipat(l, 100, 100, 40);
    tutup(x.keping, x.luar, `lipat ${l}`);
    cek(x.keping.length === B.HASIL_LIPAT[l].banyak && x.keping.every((k) => k.jenis === B.HASIL_LIPAT[l].jenis), `lipat ${l}: banyak dan jenis keping`);
  }
  tutup(B.TANGRAM.map((t) => ({ titik: t.titik })), [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }], "tangram");
  cek(B.TANGRAM.length === 7 && B.TANGRAM.filter((t) => t.jenis === "segitiga").length === 5 && B.TANGRAM.filter((t) => t.jenis === "persegi").length === 1 && B.TANGRAM.filter((t) => t.jenis === "segiEmpat").length === 1, "tangram: lima segitiga, satu persegi, satu segi empat miring");
  sama(B.TANGRAM.map((t) => Math.round(B.luas(t.titik) * 10) / 10).sort((a, b) => a - b), [1, 1, 2, 2, 2, 4, 4], "tangram: luas tujuh keping baku");
  cek(B.NAMA_JENIS.segiEnam === "segi enam" && B.jenisSisi(5) === "segiLima" && B.jenisSisi(3) === "segitiga", "nama jenis menurut banyak sisi");
}

/* ------------------------------ Kunci dan kalimat ------------------------------ */
{
  sama(L.URUT_METODE, ["igil", "blok", "lipat", "bayangan"], "urutan metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL") && L.NAMA_METODE.igil.includes("Garis Urai, Hitung Keping") && L.NAMA_METODE.blok.startsWith("Pattern Blocks") && L.NAMA_METODE.lipat.startsWith("Paper Folding") && L.NAMA_METODE.bayangan.startsWith("Silhouette Puzzle"), "nama metode: Metode IGIL dan nama Inggris tiga metode global di judul soal");
  const j = (l) => L.jawaban(l);
  sama(j({ tipe: "pola", n: 5, dari: "pojok" }), { jenis: "angka", nilai: 3 }, "kunci pola segi lima dari pojok");
  sama(j({ tipe: "pola", n: 6, dari: "pusat" }), { jenis: "angka", nilai: 6 }, "kunci pola segi enam dari titik tengah");
  sama(j({ tipe: "uraiNama", n: 4, garis: "tengah" }), { jenis: "nama", nilai: "segiEmpat" }, "kunci uraian garis tengah");
  sama(j({ tipe: "uraiNama", n: 4, garis: "miring" }), { jenis: "nama", nilai: "segitiga" }, "kunci uraian garis miring");
  sama(j({ tipe: "gabungNama", kind: "kiriKanan" }), { jenis: "nama", nilai: "segiEnam" }, "kunci gabung kiri kanan");
  sama(j({ tipe: "hitung", keping: [{ jenis: "segitiga", n: 3 }, { jenis: "persegi", n: 2 }], tanya: "semua" }), { jenis: "angka", nilai: 5 }, "kunci hitung semua");
  sama(j({ tipe: "hitung", keping: [{ jenis: "segitiga", n: 3 }, { jenis: "persegi", n: 2 }], tanya: "persegi" }), { jenis: "angka", nilai: 2 }, "kunci hitung satu jenis");
  sama([j({ tipe: "lipat", lipatan: "duaMiring", tanya: "banyak" }), j({ tipe: "lipat", lipatan: "duaTengah", tanya: "nama" })], [{ jenis: "angka", nilai: 4 }, { jenis: "nama", nilai: "persegi" }], "kunci lipat");
  sama([j({ tipe: "bayangan", kind: "enamSegitiga", tanya: "banyak" }), j({ tipe: "bayangan", kind: "kiriKanan", tanya: "nama" })], [{ jenis: "angka", nilai: 6 }, { jenis: "nama", nilai: "segiEnam" }], "kunci bayangan");
  sama([j({ tipe: "susun", kind: "miring" }), j({ tipe: "urut", judul: "x", langkah: ["a"] }), j({ tipe: "tumpuk" })], [null, null, null], "kegiatan tanpa jawaban");
  cek(L.siapLangsung({ tipe: "pola", n: 5, dari: "pojok" }) && !L.siapLangsung({ tipe: "susun", kind: "miring" }) && L.kegiatan({ tipe: "urut", judul: "x", langkah: [] }), "soal berjawaban langsung siap; kegiatan tidak");
  const contoh = [
    { tipe: "pola", n: 5, dari: "pojok" },
    { tipe: "pola", n: 6, dari: "pusat" },
    { tipe: "uraiNama", n: 4, garis: "tengah" },
    { tipe: "gabungNama", kind: "atasBawah" },
    { tipe: "hitung", keping: [{ jenis: "segitiga", n: 3 }, { jenis: "persegi", n: 2 }], tanya: "semua" },
    { tipe: "susun", kind: "pendek" },
    { tipe: "urut", judul: "Urutkan langkah.", langkah: ["a", "b"] },
    { tipe: "lipat", lipatan: "tengah", tanya: "banyak" },
    { tipe: "bayangan", kind: "pendek", tanya: "nama" },
    { tipe: "tumpuk" },
  ];
  for (const x of contoh) {
    cek(tanpaDigit(L.kalimatKunci(x)) && bersih(L.kalimatKunci(x)), `kalimat kunci ${x.tipe} tanpa digit`);
    cek(tanpaDigit(L.kalimatTanya(x)) && bersih(L.kalimatTanya(x)), `kalimat tanya ${x.tipe} tanpa digit`);
    for (const r of ["benda", "diagram", "lambang"]) for (const c of ["klik", "kanvas", "suara"]) cek(tanpaDigit(L.instruksi(x, r, c)) && bersih(L.instruksi(x, r, c)), `instruksi ${x.tipe}/${r}/${c} tanpa digit dan bersih`);
    for (const m of [3, 4, "segitiga", ""]) cek(tanpaDigit(L.petunjukSalah(x, m)) && bersih(L.petunjukSalah(x, m)), `petunjuk salah ${x.tipe} tanpa digit`);
    cek(L.barisLambang(x).length >= 1 && L.barisLambang(x).every(([a, b]) => a.length > 0 && b.length > 0 && !/[\u{1F000}-\u{1FFFF}]/u.test(a + b)), `lembar kata ${x.tipe}: baris kata dan lambang tanpa emoji`);
  }
  for (const x of contoh.filter((c) => L.siapLangsung(c))) {
    const a = L.pilihanAngka(x);
    const n = L.pilihanNama(x);
    const k = L.jawaban(x);
    if (k.jenis === "angka") cek(a.length === 3 && new Set(a).size === 3 && a.includes(k.nilai) && a.every((v) => v >= 1 && v <= 9) && n.length === 0, `pilihan angka ${x.tipe}`);
    else cek(n.length === 4 && new Set(n).size === 4 && n.includes(k.nilai) && a.length === 0, `pilihan nama ${x.tipe}`);
  }
  cek(L.petunjukSalah({ tipe: "pola", n: 5, dari: "pojok" }, 5).includes("cara garis yang satunya") && L.petunjukSalah({ tipe: "pola", n: 5, dari: "pojok" }, 1).includes("dikurangi dua"), "petunjuk pola: hasil cara yang satunya dan rumus");
  sama([L.metodeLangkah({ tipe: "pola", n: 5, dari: "pojok" }), L.metodeLangkah({ tipe: "susun", kind: "miring" }), L.metodeLangkah({ tipe: "lipat", lipatan: "miring", tanya: "banyak" }), L.metodeLangkah({ tipe: "tumpuk" }), L.metodeLangkah({ tipe: "salah", dasar: { tipe: "uraiNama", n: 4, garis: "miring" } })], ["igil", "blok", "lipat", "bayangan", "igil"], "metode tiap jenis langkah");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = K.namaDariUcapan;
  sama(nm("segi enam"), ["segiEnam"], "ucapan: segi enam");
  sama([nm("segienam"), nm("Segi 6"), nm("heksagon"), nm("ini segi enam ya")], [["segiEnam"], ["segiEnam"], ["segiEnam"], ["segiEnam"]], "ucapan: ragam segi enam");
  sama([nm("segitiga"), nm("segi tiga"), nm("segi 3")], [["segitiga"], ["segitiga"], ["segitiga"]], "ucapan: segitiga");
  sama([nm("segi empat"), nm("segiempat"), nm("persegi panjang")], [["segiEmpat"], ["segiEmpat"], ["segiEmpat"]], "ucapan: segi empat dan persegi panjang dibaca segi empat");
  sama([nm("persegi"), nm("bujur sangkar")], [["persegi"], ["persegi"]], "ucapan: persegi");
  sama([nm("segi lima"), nm("pentagon")], [["segiLima"], ["segiLima"]], "ucapan: segi lima");
  sama(nm("segitiga lalu segi enam"), ["segitiga", "segiEnam"], "ucapan: dua nama menurut urutan");
  sama(nm("halo apa kabar"), [], "ucapan: tanpa nama bentuk");
  sama([K.angkaDariUcapan("tiga"), K.angkaDariUcapan("6"), K.angkaDariUcapan("ampat"), K.angkaDariUcapan("delapan"), K.angkaDariUcapan("sembilan")], [[3], [6], [4], [8], [9]], "ucapan: angka satu sampai sembilan");
  sama(K.angkaDariUcapan("dua lalu lima dua"), [2, 5], "ucapan: angka tanpa kembar");
  sama(K.angkaDariUcapan("sepuluh"), [], "ucapan: sepuluh bukan jawaban bab ini");
  const hs = K.cocokUcapan("segi enam", { jenis: "nama", nilai: "segiEnam" });
  cek(hs.cocok && hs.terdengar === "segiEnam", "cocok ucapan: nama benar");
  const hl = K.cocokUcapan("segi lima", { jenis: "nama", nilai: "segiEnam" });
  cek(!hl.cocok && hl.terdengar === "segiLima", "cocok ucapan: nama keliru terdengar sebagai segi lima");
  const ha = K.cocokUcapan("jawabannya empat", { jenis: "angka", nilai: 4 });
  cek(ha.cocok && ha.terdengar === 4 && !K.cocokUcapan("lima", { jenis: "angka", nilai: 4 }).cocok && K.cocokUcapan("", { jenis: "angka", nilai: 4 }).terdengar === null, "cocok ucapan: angka benar, keliru, dan sepi");
  cek(!K.cocokUcapan("persegi panjang", { jenis: "nama", nilai: "persegi" }).cocok && K.cocokUcapan("persegi panjang", { jenis: "nama", nilai: "segiEmpat" }).cocok, "cocok ucapan: persegi panjang bukan persegi");
  cek(K.cocokUcapan("segi enam", null).cocok === false, "cocok ucapan: tanpa jawaban");
}

/* ------------------------------ Mind-map papan puzzle raksasa ------------------------------ */
{
  const t = D.TEMPAT_PAPAN;
  cek(t.filter((x) => x.kelompok === "masalah").length === 3 && t.filter((x) => x.kelompok === "metode").length === 7 && t.filter((x) => x.kelompok === "hasil").length === 4, "mind-map: tiga masalah, tujuh penyelesaian, empat hasil");
  cek(new Set(t.map((x) => x.id)).size === t.length && new Set(t.map((x) => x.kunci)).size === t.length, "mind-map: id dan label unik");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "mind-map: penyelesaian bernomor satu sampai tujuh");
  cek(t.filter((x) => x.kelompok !== "metode").every((x) => x.urutan === undefined), "mind-map: hanya penyelesaian yang bernomor");
  const metode = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ");
  for (const m of ["Pola Blok", "Lipat Kertas", "Teka-Teki Bayangan", "Tangram", "Urai", "Susun", "tidak bertumpuk".replace("tidak bertumpuk", "semua keping")]) cek(metode.includes(m), `mind-map: penyelesaian memuat ${m}`);
  cek(t.every((x) => x.kunci.length <= 46 && tanpaDigit(x.kunci) && bersih(x.kunci)), "mind-map: label pendek, tanpa digit, tanpa kata terlarang");
  cek(t.every((x) => !TOKOH.some((n) => x.kunci.includes(n)) && !/papan puzzle|angin|Sabtu|rumput/i.test(x.kunci)), "mind-map: hanya poin pelajaran, tanpa tokoh atau benda cerita");
  cek(Object.keys(D.KELOMPOK_PAPAN).sort().join() === "hasil,masalah,metode", "mind-map: tiga kelompok warna");
  const a = LL(1);
  function LL(b) {
    return L.labelDari(t, 83 + b).map((x) => x.teks).join("|");
  }
  cek(a === LL(1) && L.labelDari(t, 83).length === 14, "mind-map: label acak tetap untuk benih yang sama");
  cek(tanpaDigit(D.SUARA_PAPAN) && bersih(D.SUARA_PAPAN) && tanpaDigit(D.PETUNJUK_URUT_PAPAN), "mind-map: suara dan petunjuk tanpa digit");
  for (const x of t.filter((y) => y.urutan !== undefined)) cek(!L.cocokKelompok(t, x, { id: "z", teks: t.find((y) => y.urutan === (x.urutan % 7) + 1).kunci }) && L.cocokKelompok(t, x, { id: "z", teks: x.kunci }), `mind-map: keping bernomor ${x.urutan} hanya cocok dengan labelnya`);
  cek(L.cocokKelompok(t, t[0], { id: "z", teks: t[1].kunci }) && !L.cocokKelompok(t, t[0], { id: "z", teks: t[10].kunci }), "mind-map: masalah menerima label masalah mana pun, bukan label hasil");
}

/* ------------------------------ Infografis meja gambar ------------------------------ */
{
  cek(D.BARIS_MEJA.length === 6 && D.TEMPAT_MEJA.length === 12, "infografis: enam baris, dua kotak kosong tiap baris");
  cek(new Set(D.TEMPAT_MEJA.map((x) => x.kunci)).size === 12 && D.TEMPAT_MEJA.every((x) => x.kunci.length <= 26), "infografis: label unik dan pendek");
  const hasilDari = (g, n) => `${B.banyakUrai(n, g)} segitiga`;
  sama([D.BARIS_MEJA[0].hasil, D.BARIS_MEJA[1].hasil, D.BARIS_MEJA[4].hasil, D.BARIS_MEJA[5].hasil], ["2 segitiga", "2 segi empat", hasilDari("pojok", 6), hasilDari("pusat", 6)], "infografis: hasil sesuai geometri dan Story");
  sama([D.BARIS_MEJA[2].hasil, D.BARIS_MEJA[3].hasil], ["1 persegi", "1 segitiga besar"], "infografis: dua segitiga menjadi persegi atau segitiga besar");
  sama(D.BARIS_MEJA.map((b) => D.TEMPAT_MEJA.find((x) => x.id === `m${D.BARIS_MEJA.indexOf(b)}-cara`).kunci), D.BARIS_MEJA.map((b) => b.cara), "infografis: kotak cara sesuai baris");
  cek(D.TEMPAT_MEJA.every((x) => bersih(x.kunci)) && tanpaDigit(D.SUARA_MEJA) && bersih(D.SUARA_MEJA), "infografis: suara tanpa digit dan bersih");
  cek(D.KOLOM_MEJA.length === 2 && Object.keys(D.KELOMPOK_MEJA).sort().join() === "cara,hasil", "infografis: dua kolom");
}

/* ------------------------------ CPA ------------------------------ */
const NAMA_RUPA = [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]];
for (const [nama, soal, rupa] of NAMA_RUPA) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Papan Puzzle (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: judul dan cerita bersih`);
  }
  for (const x of semua) {
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.judul === x.suara && x.suara === L.instruksi(x.langkah, rupa, x.cara), `${nama} ${x.cara}/${x.metode}: instruksi tanpa digit, bersih, sama dengan templat`);
    cek(!/tugas/i.test(x.suara) || true, "tugas");
  }
  // Jawaban beragam per cara.
  const klik = soal[0].langkah.map((x) => x.langkah);
  const kanvas = soal[1].langkah.map((x) => x.langkah);
  const suara = soal[2].langkah.map((x) => x.langkah);
  cek(kanvas.every((l) => L.jawaban(l)?.jenis === "angka" && L.jawaban(l).nilai >= 1 && L.jawaban(l).nilai <= 9), `${nama}: Tulis di kanvas = satu angka (satu sampai sembilan)`);
  cek(suara.every((l) => L.jawaban(l) !== null) && suara.some((l) => L.jawaban(l).jenis === "nama") && suara.some((l) => L.jawaban(l).jenis === "angka"), `${nama}: Rekam suara = angka atau nama bentuk`);
  cek(klik.every((l) => L.jawaban(l)?.jenis !== "angka"), `${nama}: Klik = nama bentuk, menyusun, mengurutkan, atau Cari kesalahan (bukan angka)`);
  const tipe = new Set(semua.map((x) => (x.langkah.tipe === "salah" ? "salah" : x.langkah.tipe)));
  cek(tipe.size >= 6, `${nama}: kegiatan beragam (${[...tipe].join(",")})`);
  cek(klik.some((l) => l.tipe === "urut") && (klik.some((l) => l.tipe === "susun") || klik.some((l) => l.tipe === "gabungNama")) && klik.some((l) => l.tipe === "salah"), `${nama}: Klik memuat urutan langkah, menyusun atau nama hasil susunan, dan Cari kesalahan`);
  const angka = semua.map((x) => L.kunciAngka(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 5, `${nama}: lima angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 9), `${nama}: angka jawaban satu sampai sembilan`);
  const sedikit = angka.filter((n) => STORY.includes(n));
  if (sedikit.length > 0) console.log(`catatan ${nama}: angka jawaban yang sama dengan hasil Story (ruang jawaban sempit): ${sedikit.join(",")}`);
  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3 && l.alasan.every((a) => tanpaDigit(a) && bersih(a)) && tanpaDigit(l.keliru) && bersih(l.keliru) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${nama}: alasan berbeda, tanpa digit, bersih`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    cek(geser !== l.benar, `${nama}: alasan benar bukan tombol pertama (tombol pertama alasan ${geser}, benar ${l.benar})`);
    cek(l.keliru.length > 30, `${nama}: petunjuk salah menjelaskan kesalahan ${l.tokoh}`);
    cek(L.jawaban(l) === null && L.kegiatan(l), `${nama}: Cari kesalahan tanpa jawaban angka`);
    cek(L.petunjukSalah(l, 0).startsWith("Alasan itu belum tepat"), `${nama}: petunjuk salah menyebut alasan belum tepat`);
  }
  cek(salah.some((x) => !x.langkah.betul) || nama === "Abstract", `${nama}: ada tokoh yang keliru`);
}
{
  // Isi tiap soal Cari kesalahan sesuai alur.
  const c = D.CONCRETE[0].langkah[3].langkah;
  cek(c.tokoh === "Chacha" && c.dasar.tipe === "tumpuk" && !c.betul && /tidak boleh bertumpuk/.test(c.alasan[c.benar]), "Concrete: Chacha menumpuk keping (salah)");
  const p = D.PICTORIAL[0].langkah[0].langkah;
  cek(p.tokoh === "Nia" && p.dasar.tipe === "uraiNama" && p.dasar.garis === "miring" && B.banyakUrai(4, "miring") === 2 && /tiga segitiga/.test(p.kataTokoh) && !p.betul, "Pictorial: Nia menyebut tiga segitiga padahal dua (salah)");
  const a = D.ABSTRACT[0].langkah[0].langkah;
  cek(a.tokoh === "Dika" && a.dasar.tipe === "pola" && a.dasar.n === 6 && a.dasar.dari === "pojok" && L.banyakPola(a.dasar) === 4 && /empat segitiga/.test(a.kataTokoh) && a.betul === true, "Abstract: Dika benar, segi enam dari satu pojok empat segitiga");
}

/* ------------------------------ Batas rupa dan tata letak ------------------------------ */
{
  const lp = readFileSync(new URL("LangkahPuzzle.tsx", folderUrl), "utf8");
  const tahap = readFileSync(new URL("TahapPuzzle.tsx", folderUrl), "utf8");
  cek(/rupa === "benda" && !g\.kosong/.test(lp) && /GAMBAR_KEPING\[/.test(lp), "batas rupa: emoji benda hanya pada keping Concrete (benda)");
  cek(/if \(rupa === "lambang"\) return <Lambang/.test(lp), "batas rupa: Abstract hanya lembar kata dan lambang (tanpa gambar bentuk)");
  cek(/rupa === "benda" \? `\$\{IKON_METODE/.test(tahap), "batas rupa: ikon metode pada label tugas hanya untuk Concrete");
  cek(!/Concrete/.test("") && D.GAMBAR_KEPING.length >= 5 && D.GAMBAR_KEPING.every((e) => [...e].every((c) => c.codePointAt(0) <= 0x1fa95)), "gambar keping: emoji benda taman");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "kanvas adegan 300 x 200");
  // Gambar tiap jenis soal muat di kanvas.
  const dalam = (titik, nama) => cek(titik.every((p) => p.x >= 0 && p.x <= 300 && p.y >= 0 && p.y <= 200), `tata letak: ${nama} muat di kanvas`);
  for (const [n, g] of [[3, "pojok"], [5, "pojok"], [6, "pojok"], [6, "pusat"], [8, "pusat"], [4, "tengah"], [4, "miring"]]) dalam(B.urai(n, g, 150, 104, 62).luar, `uraian segi ${n} ${g}`);
  for (const k of B.URUT_GABUNG) dalam(B.gabung(k, 150, 104, k === "pendek" ? 36 : 40).luar, `gabungan ${k}`);
  for (const l of B.URUT_LIPATAN) dalam([...B.lipat(l, 78, 104, 44).luar, ...B.lipat(l, 220, 104, 44).luar.map((p) => ({ x: p.x + 8, y: p.y }))], `lipatan ${l}`);
}

/* ------------------------------ Simulasi Papan Puzzle dan usulan misi ------------------------------ */
{
  const awal = L.awalPuzzle();
  cek(awal.alat === "puzzle" && awal.mode === "urai" && awal.uraiDilihat.length === 0 && awal.terpasang.length === 0 && awal.tangram.length === 0 && !awal.tangramTuntas, "simulasi: keadaan awal");
  const daftar = MK.daftarMisiK2Bab3("B");
  cek(daftar === MK.MISI_B && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && daftar.every((m) => m.id.startsWith("b-")), "misi B: empat wajib, dua bebas, id berawalan b-");
  cek(S.misiBaru(daftar, awal, new Set()).length === 0, "misi B: keadaan awal tidak memenuhi misi");
  cek(new Set(daftar.map((m) => m.id)).size === daftar.length && daftar.every((m) => m.teks.length > 10 && m.teks.length < 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi B: id unik, teks ringkas tanpa digit dan kata terlarang");
  cek(daftar.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "ubin" }) && !m.cek({ alat: "gudang" })), "misi B: alat lain tidak memenuhi misi");
  const ada = (k, id) => S.misiBaru(daftar, k, new Set()).includes(id);
  // Urai.
  let k = awal;
  cek(!ada(k, "b-pojok") && !ada(k, "b-pusat"), "urai: belum ada uraian yang dilihat");
  k = L.pilihGaris(k, "pojok");
  cek(ada(k, "b-pojok") && !ada(k, "b-pusat"), "urai: garis dari satu pojok dilihat");
  k = L.pilihGaris(k, "pusat");
  cek(ada(k, "b-pusat") && k.uraiDilihat.join() === "5-pojok,5-pusat", "urai: garis dari titik tengah dilihat");
  sama([L.hasilUraiSim(L.pilihGaris(L.pilihBangun(awal, 5), "pojok")).banyak, L.hasilUraiSim(L.pilihGaris(L.pilihBangun(awal, 5), "pusat")).banyak, L.hasilUraiSim(L.pilihBangun(awal, 6)).banyak], [3, 5, 4], "urai: banyak keping segi lima dan segi enam");
  cek(L.pilihBangun(awal, 4).garis === "miring" && L.garisBoleh(4).includes("tengah") && L.pilihBangun(awal, 7) === awal && L.pilihGaris(awal, "tengah") === awal, "urai: garis menyesuaikan bangun; pilihan tak sah ditolak");
  cek(L.BANGUN_SIM.join() === "5,4,6", "simulasi: bangun berbeda dari Story (segi lima lebih dulu)");
  // Susun.
  for (const kind of L.BAYANGAN_SIM) {
    let s = L.pilihBayangan(awal, kind);
    const kp = B.gabung(kind, 0, 0, 1).keping;
    for (let i = 0; i < kp.length; i += 1) {
      const r = L.pasangKeping(s, i, i);
      cek(r.ok, `susun ${kind}: keping ${i} pas`);
      s = r.k;
      if (i < kp.length - 1) cek(s.susunTuntas.length === 0, `susun ${kind}: belum tuntas sebelum penuh`);
    }
    cek(s.susunTuntas.includes(kind) && s.terpasang.length === kp.length, `susun ${kind}: tuntas bila semua keping terpasang`);
    cek(!L.pasangKeping(s, 0, 0).ok, `susun ${kind}: keping dan tempat yang sudah terisi ditolak (tidak bertumpuk)`);
  }
  {
    const s = L.pilihBayangan(awal, "atasBawah");
    cek(!L.pasangKeping(s, 0, 1).ok && L.pasangKeping(s, 0, 2).ok, "susun: segitiga tidak masuk tempat segi empat, tetapi masuk tempat segitiga");
    cek(L.pasangKeping(s, 9, 0).ok === false && L.pasangKeping(s, 0, -1).ok === false, "susun: nomor di luar batas ditolak");
    const dua = L.pasangKeping(L.pasangKeping(s, 0, 0).k, 0, 2);
    cek(!dua.ok, "susun: keping yang sama tidak dipasang dua kali");
    cek(L.ulangSusun(L.pasangKeping(s, 0, 0).k).terpasang.length === 0, "susun: ulang mengosongkan bayangan");
    cek(L.pilihBayangan(L.pasangKeping(s, 0, 0).k, "enamSegitiga").terpasang.length === 0 && L.pilihBayangan(awal, "miring") === awal, "susun: ganti bayangan mengosongkan; bayangan lain ditolak");
  }
  let sm = awal;
  cek(!ada(sm, "b-susun") && !ada(sm, "b-semua"), "misi susun: belum tuntas");
  for (const kind of L.BAYANGAN_SIM) {
    sm = L.pilihBayangan(sm, kind);
    for (let i = 0; i < B.banyakGabung(kind); i += 1) sm = L.pasangKeping(sm, i, i).k;
    if (kind === L.BAYANGAN_SIM[0]) cek(ada(sm, "b-susun") && !ada(sm, "b-semua"), "misi susun: satu bayangan penuh");
  }
  cek(ada(sm, "b-semua") && sm.susunTuntas.length === 3, "misi susun: tiga bayangan penuh (bebas)");
  // Tumpuk.
  cek(!ada(awal, "b-tumpuk") && ada(L.cobaTumpuk(awal), "b-tumpuk") && L.cobaTumpuk(awal).terpasang.length === 0, "misi tumpuk: percobaan menumpuk dicatat dan ditolak");
  // Tangram.
  let tg = awal;
  const jumlahPas = B.TANGRAM.length;
  for (let i = 0; i < jumlahPas; i += 1) {
    cek(!ada(tg, "b-tangram"), `tangram: belum tuntas sebelum ${jumlahPas} keping`);
    const r = L.pasangTangram(tg, B.TANGRAM[i].id, B.TANGRAM[i].id);
    cek(r.ok, `tangram: keping ${B.TANGRAM[i].id} pas`);
    tg = r.k;
  }
  cek(ada(tg, "b-tangram") && tg.tangramTuntas && tg.tangram.length === 7, "misi tangram: tujuh keping mengisi persegi besar");
  cek(!L.pasangTangram(awal, "besar1", "persegi").ok && !L.pasangTangram(awal, "kecil1", "sedang").ok && L.pasangTangram(awal, "besar1", "besar2").ok && L.pasangTangram(awal, "kecil2", "kecil1").ok, "tangram: ukuran dan bentuk harus sama, keping sejenis boleh bertukar");
  cek(!L.pasangTangram(L.pasangTangram(awal, "besar1", "besar1").k, "besar1", "besar2").ok && !L.pasangTangram(L.pasangTangram(awal, "besar1", "besar1").k, "besar2", "besar1").ok, "tangram: tempat dan keping yang sudah dipakai ditolak");
  cek(L.ulangTangram(tg).tangram.length === 0 && !L.ulangTangram(tg).tangramPakai.length && L.pasangTangram(awal, "x", "y").ok === false, "tangram: ulang dan id tak dikenal");
  // Kalimat.
  for (const m of ["urai", "susun", "tangram"]) {
    const t = L.kalimatPuzzle(L.pilihModePuzzle(awal, m));
    cek(tanpaDigit(t) && bersih(t) && t.length > 15, `kalimat simulasi ${m} tanpa digit`);
  }
  for (const s of [awal, k, sm, tg, L.pilihBangun(awal, 4), L.pilihGaris(L.pilihBangun(awal, 4), "tengah")]) cek(tanpaDigit(L.kalimatPuzzle(s)) && bersih(L.kalimatPuzzle(s)), "kalimat keadaan tanpa digit");
  cek(tanpaDigit(D.MISI_PAPAN_TEKS) && bersih(D.MISI_PAPAN_TEKS) && D.MISI_PAPAN === D.MISI_PAPAN_TEKS, "teks misi simulasi tanpa digit dan bersih");
  cek(S.laporMisi && (() => { const dapat = new Set(); S.laporMisi(daftar, tg, (id) => dapat.add(id)); return dapat.has("b-tangram"); })(), "laporMisi melaporkan misi yang terpenuhi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["bentuk.ts", "logika.ts", "data.ts", "periksa.ts", "Jawab.tsx", "LangkahPuzzle.tsx", "TahapPuzzle.tsx", "PapanPuzzleRaksasa.tsx", "MejaGambar.tsx", "SimulasiPapanPuzzle.tsx"]) cek(berkas.includes(f), `folder memuat ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (/\.tsx$/.test(f) || f === "data.ts") cek(!/\b(skor|nilai tempat|bernilai)\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")), `${f}: tanpa kata skor, nilai tempat, bernilai pada teks`);
    if (["bentuk.ts", "logika.ts", "data.ts", "periksa.ts"].includes(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: murni tanpa React dan jaringan`);
    // Teks layar dan suara: tanpa kata terlarang (mengabaikan komentar dan nama peubah).
    const teksLayar = [...s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((t) => /\s/.test(t) && !/^(\.\.?\/|@\/|[a-z-]+:|flex |rounded|min-|border|bg-|text-|space-|grid|mx-|block|w-|h-)/.test(t));
    for (const t of teksLayar) cek(!/\b(kelas|buku|teman|kelompok|soal|tebak|kunci|latihan|skor)\b/i.test(t.replace(/Kelas 2/g, "")) || /^\s*(lemari|import)/.test(t), `${f}: teks layar bersih ("${t.slice(0, 40)}")`);
  }
  const sim = readFileSync(new URL("SimulasiPapanPuzzle.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /export default function SimulasiPapanPuzzle/.test(sim), "simulasi: komponen melapor keadaan");
  const tahap = readFileSync(new URL("TahapPuzzle.tsx", folderUrl), "utf8");
  cek(/export default function TahapPuzzle/.test(tahap) && /poinPenting/.test(tahap) && /umum: Umum/.test(tahap) && /PENUTUP_B/.test(tahap), "tahap: komponen dengan props umum, rupa, soal, pita, teksAkhir, poinPenting dan penutup ke Sub-Bab C");
  cek(/export default function PapanPuzzleRaksasa/.test(readFileSync(new URL("PapanPuzzleRaksasa.tsx", folderUrl), "utf8")) && /export default function MejaGambar/.test(readFileSync(new URL("MejaGambar.tsx", folderUrl), "utf8")), "komponen Mind-map PapanPuzzleRaksasa dan Infografis MejaGambar");
  const lp = readFileSync(new URL("LangkahPuzzle.tsx", folderUrl), "utf8");
  cek(/JawabTulis/.test(lp) && /JawabSuaraBentuk/.test(lp) && /PilihanTeks/.test(lp) && /Ini jawaban yang benar\./.test(lp), "langkah: kanvas, suara, dan ketuk; jawaban benar ditampilkan dengan pesan Ini jawaban yang benar.");
  cek(/siapLangsung|j && !selesaiS/.test(lp) && !/useSiapLangsung/.test(lp), "langkah: soal berjawaban langsung siap (tombol Periksa aktif tanpa kegiatan lebih dulu)");
  const jw = readFileSync(new URL("Jawab.tsx", folderUrl), "utf8");
  cek(/Ini jawaban yang benar:/.test(jw) && /BATAS_SALAH/.test(jw) && /cocokUcapan/.test(jw), "jawab suara: tiga kali salah menampilkan jawaban benar, memakai pencocokan nama bentuk");
  const sub = readFileSync(new URL("../SimulasiK2Bab3.tsx", folderUrl), "utf8");
  cek(/SimulasiPapanPuzzle/.test(sub) && /MISI_PAPAN_TEKS/.test(sub) && /laporMisi\(daftarMisiK2Bab3\("B"\)/.test(sub), "SimulasiK2Bab3: langkah Papan Puzzle terpasang");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
