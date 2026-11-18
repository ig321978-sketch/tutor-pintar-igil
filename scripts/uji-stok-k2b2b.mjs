// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab B ("Rak Seragam Diserbu"), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
// Memeriksa: papan kartu stok (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), lembar stok dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan satu tugas Cari kesalahan per tahap, jawaban dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, mode tiap tugas (jawaban langsung atau kegiatan dulu), batas rupa, tata letak kanvas, pengenal ucapan sampai dua puluh,
// simulasi Meja Stok dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-stok-k2b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/stok-k2b2b/logika.ts");
const D = await import("../src/components/modul/stok-k2b2b/data.ts");
const K = await import("../src/components/modul/stok-k2b2b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB = await import("../src/components/modul/misi-k2bab2.ts");
const folderUrl = new URL("../src/components/modul/stok-k2b2b/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku/i.test(t) && !/nilai tempat/i.test(t);
const TOKOH = ["Chacha", "Dika", "Nia", "Bu Sari"];
/** Hasil hitungan Story B yang dihindari sebagai jawaban CPA (alur dan naskah). */
const STORY_HASIL = [5, 15, 4, 6, 12, 14];
/** Pasangan operan Story B (a dikurangi b) yang tidak dipakai ulang di CPA. */
const STORY_OPERAN = ["17-12", "19-4", "12-8", "15-9", "15-7", "15-8", "14-9", "13-8", "9-5"];

/* ------------------------------ Dasar ------------------------------ */
const tb = { tipe: "susun", set: "topi", a: 17, b: 8, benih: 1 };
const pk = { tipe: "pikir", set: "topi", a: 17, b: 8, benih: 1 };
const kl = { tipe: "keluarga", set: "topi", x: 7, y: 10, tanya: "kurang", benih: 1 };
const sp = { tipe: "sepuluh", set: "topi", a: 16, b: 9, benih: 1 };
const bd = { tipe: "banding", set: "topi", a: 16, b: 9, benih: 1 };
{
  sama([0, 1, 9, 10, 11, 12, 19, 20].map((n) => L.kata(n)), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "dua belas", "sembilan belas", "dua puluh"], "kata bilangan sampai dua puluh");
  cek(Array.from({ length: 21 }, (_, n) => L.kata(n)).every((w, n) => tanpaDigit(w) && w.length > 0 && Array.from({ length: n }, (_, m) => L.kata(m)).every((x) => x !== w)), "kata: tiap bilangan nol sampai dua puluh punya nama tanpa digit dan unik");
  cek(L.kata(21) === "21" && L.kata(-1) === "-1" && L.BATAS === 20, "kata: di luar batas dikembalikan apa adanya");
  sama(Object.keys(L.NAMA_METODE), ["igil", "pikir", "keluarga", "sepuluh"], "empat metode");
  sama(L.URUT_METODE, ["igil", "pikir", "keluarga", "sepuluh"], "urutan metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL: Susun dan Periksa") && L.NAMA_METODE.pikir.startsWith("Think Addition") && L.NAMA_METODE.keluarga.startsWith("Fact Family") && L.NAMA_METODE.sepuluh.startsWith("Subtract from Ten"), "nama Inggris di judul tugas");
  sama([tb, pk, kl, { ...kl, tanya: "kurang2" }, { ...kl, tanya: "tambah" }, { ...kl, tanya: "kalimat" }, sp, bd, { tipe: "salah", dasar: tb }].map((x) => L.kunciLangkah(x)), [9, 9, 10, 7, 17, null, 7, null, 9], "kunci tiap jenis langkah");
  sama([tb, pk, kl, sp].map((x) => L.metodeLangkah(x)), ["igil", "pikir", "keluarga", "sepuluh"], "metode tiap jenis langkah");
  sama(L.metodeLangkah({ tipe: "salah", dasar: tb }), "igil", "metode Cari kesalahan dari soal dasarnya");
  sama([L.perluBuka(17, 8), L.perluBuka(16, 5), L.perluBuka(20, 6), L.perluBuka(19, 11), L.perluBuka(12, 9)], [true, false, true, false, true], "perlu buka satu puluhan");
  sama([L.balikSatuan(17, 9), L.balikSatuan(12, 8), L.balikSatuan(16, 9)], [2, 6, 3], "kesalahan lazim: satuan dibalik");
  sama([L.caraTermudah(16, 9), L.caraTermudah(17, 2), L.caraTermudah(19, 8), L.caraTermudah(11, 3)], ["sepuluh", "mundur", "sepuluh", "mundur"], "cara termudah");
  sama(L.kalimatKeluarga(7, 10), { benar: ["7 + 10 = 17", "10 + 7 = 17", "17 − 7 = 10", "17 − 10 = 7"], salah: ["7 − 10 = 17", "17 − 10 = 10"] }, "empat kalimat keluarga dan dua kartu menipu");
  for (const [x, y, benih] of [[5, 13, 1], [7, 12, 1], [6, 10, 1], [4, 9, 5]]) {
    const kt = L.kartuKalimat(x, y, benih);
    sama([...kt].sort(), [...L.kalimatKeluarga(x, y).benar, ...L.kalimatKeluarga(x, y).salah].sort(), `kartu kalimat ${x} dan ${y}: enam kartu`);
    sama(L.kartuKalimat(x, y, benih), kt, `kartu kalimat ${x} dan ${y} tetap menurut benih`);
    cek(L.kalimatKeluarga(x, y).salah.every((t) => !L.kalimatKeluarga(x, y).benar.includes(t)) && kt.every((t) => (t.match(/\d+/g) ?? []).every((v) => Number(v) <= 20)), `kartu kalimat ${x} dan ${y}: kartu menipu benar-benar salah dan paling besar dua puluh`);
  }
  for (const x of [tb, pk, kl, { ...kl, tanya: "tambah" }, { ...kl, tanya: "kalimat" }, sp, bd, { ...tb, a: 18, b: 5 }]) {
    const n = L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n) && n.length > 10, `kalimat kunci ${x.tipe} ${x.tanya ?? ""} tanpa digit`);
  }
  // Rak: ambil dan buka satu puluhan.
  {
    let r = L.rakAwal(20, 6);
    sama([r.p, r.s, L.sisaRak(r)], [2, 0, 20], "rak 20 dikurangi 6: dua ikat tanpa barang lepas");
    sama([L.ambilDariRak(r).ok, L.ambilDariRak(r).sebab], [false, "habis"], "barang lepas habis: harus buka ikat");
    r = L.bukaDiRak(r).r;
    sama([r.p, r.s, r.dibuka], [1, 10, 1], "buka satu ikat jadi sepuluh barang lepas");
    for (let i = 0; i < 6; i += 1) r = L.ambilDariRak(r).r;
    sama([L.rakSelesai(r), L.sisaRak(r), L.ambilDariRak(r).sebab], [true, 14, "cukup"], "enam diambil, sisa empat belas");
    sama(L.bukaDiRak(r).ok, false, "tidak membuka ikat bila barang lepas masih cukup");
    const r2 = L.rakAwal(13, 3);
    sama([L.bukaDiRak(r2).ok, L.bukaDiRak(r2).sebab], [false, "cukup"], "13 dikurangi 3: barang lepas cukup, ikat tidak dibuka");
    sama(L.bukaDiRak({ b: 3, p: 0, s: 1, diambil: 0, dibuka: 0 }).sebab, "tanpaIkat", "tanpa ikat tidak bisa dibuka");
    let r3 = L.rakAwal(18, 11);
    for (let i = 0; i < 8; i += 1) r3 = L.ambilDariRak(r3).r;
    sama([L.bukaDiRak(r3).ok, L.rakSelesai(r3)], [true, false], "18 dikurangi 11: delapan lepas habis, buka satu ikat");
    r3 = L.bukaDiRak(r3).r;
    for (let i = 0; i < 3; i += 1) r3 = L.ambilDariRak(r3).r;
    sama([L.rakSelesai(r3), L.sisaRak(r3)], [true, 7], "18 dikurangi 11 sama dengan 7");
  }
  // Mode tiap tugas.
  for (const rupa of ["benda", "diagram", "lambang"])
    for (const cara of ["klik", "kanvas", "suara"]) {
      const lb = `${rupa}/${cara}`;
      sama(L.modeLangkah(tb, rupa, cara), rupa === "lambang" || cara === "suara" ? "langsung" : "ambil", `mode susun ${lb}`);
      sama(L.modeLangkah(pk, rupa, cara), rupa === "lambang" || cara === "suara" ? "langsung" : "sisa", `mode pikir ${lb}`);
      sama(L.modeLangkah(kl, rupa, cara), cara === "kanvas" ? "total" : "langsung", `mode keluarga kurang ${lb}`);
      sama(L.modeLangkah({ ...kl, tanya: "kalimat" }, rupa, cara), "kalimat", `mode keluarga kalimat ${lb}`);
      sama(L.modeLangkah(sp, rupa, cara), cara === "suara" ? "langsung" : "dua", `mode sepuluh ${lb}`);
      sama(L.modeLangkah(bd, rupa, cara), "banding", `mode banding ${lb}`);
    }
}

/* ------------------------------ Pengenal ucapan sampai dua puluh ------------------------------ */
{
  for (let x = 0; x <= 20; x += 1) sama(K.bilanganDariUcapan20(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
  sama(K.bilanganDariUcapan20("Sepuluh, sebelas, dua puluh. 17 dan sembilan belas"), [10, 11, 20, 17, 19], "ucapan beberapa bilangan dan angka");
  sama(K.bilanganDariUcapan20("dua puluh satu"), [20, 1], "ucapan di atas dua puluh tidak dikenali sebagai bilangan besar");
  sama(K.bilanganDariUcapan20("tiga belas"), [13], "ucapan belasan");
  sama(K.bilanganDariUcapan20("sepuluh lima"), [10, 5], "ucapan dua bilangan terpisah");
  sama(K.bilanganDariUcapan20("se belas"), [11], "ucapan sebelas yang terpisah dikenali");
}

/* ------------------------------ Tata letak kanvas ------------------------------ */
{
  const dalam = (p, r) => p.x - r >= 0 && p.x + r <= K.LEBAR_ADEGAN && p.y - r >= 0 && p.y + r <= K.TINGGI_ADEGAN;
  cek([0, 1].every((i) => dalam(K.letakIkat(i), K.UKURAN_IKAT.h / 2) && K.letakIkat(i).x + K.UKURAN_IKAT.w / 2 <= 300 && K.letakIkat(i).x - K.UKURAN_IKAT.w / 2 >= 0), "ikat sepuluh muat di kanvas");
  cek(Array.from({ length: 20 }, (_, j) => j).every((j) => dalam(K.letakLepas(j), K.UKURAN_LEPAS / 2)), "dua puluh barang lepas muat di kanvas");
  cek(Array.from({ length: 20 }, (_, j) => j).every((j) => dalam(K.letakDeret(j), K.UKURAN_DERET / 2)), "dua puluh tempat deret muat di kanvas");
  const jarak = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
  cek(Array.from({ length: 20 }, (_, j) => j).every((j) => Array.from({ length: 20 }, (_, m) => m).filter((m) => m !== j).every((m) => jarak(K.letakLepas(j), K.letakLepas(m)) >= K.UKURAN_LEPAS)), "barang lepas tidak saling tumpuk");
  cek(Array.from({ length: 20 }, (_, j) => j).every((j) => Array.from({ length: 20 }, (_, m) => m).filter((m) => m !== j).every((m) => jarak(K.letakDeret(j), K.letakDeret(m)) >= K.UKURAN_DERET)), "tempat deret tidak saling tumpuk");
  cek([0, 1].every((i) => Array.from({ length: 20 }, (_, j) => j).every((j) => Math.abs(K.letakLepas(j).y - K.letakIkat(i).y) >= (K.UKURAN_IKAT.h + K.UKURAN_LEPAS) / 2)), "barang lepas tidak menimpa ikat sepuluh");
  const sim = [K.SIMPUL_ATAS, K.SIMPUL_KIRI, K.SIMPUL_KANAN];
  cek(sim.every((p) => p.x - K.UKURAN_SIMPUL.w / 2 >= 0 && p.x + K.UKURAN_SIMPUL.w / 2 <= 300 && p.y - K.UKURAN_SIMPUL.h / 2 >= 0 && p.y + K.UKURAN_SIMPUL.h / 2 <= 200), "tiga simpul keluarga muat di kanvas");
  cek(Array.from({ length: 6 }, (_, i) => i).every((i) => dalam(K.letakKartuKalimat(i), K.UKURAN_KARTU_KALIMAT.h / 2) && K.letakKartuKalimat(i).x - K.UKURAN_KARTU_KALIMAT.w / 2 >= 0 && K.letakKartuKalimat(i).x + K.UKURAN_KARTU_KALIMAT.w / 2 <= 300), "enam kartu kalimat muat di kanvas");
  cek(Array.from({ length: 10 }, (_, i) => i).every((i) => dalam(K.letakSepuluh(i), 11) && dalam(K.letakSisaSepuluh(i), 11)), "dua deret Kurangi dari Sepuluh muat di kanvas");
}

/* ------------------------------ Mind-map papan kartu stok ------------------------------ */
{
  const t = D.TEMPAT_PAPAN;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "papan: tiga masalah, tujuh paku bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 44 && tanpaDigit(x.kunci)), "papan: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "papan: paku bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pasangkan", "selisih", "mundur", "bersusun", "pasangan bilangan", "buka satu puluhan", "periksa dengan penjumlahan", "berpikir penjumlahan", "keluarga bilangan", "kurangi dari sepuluh"]) cek(gab.includes(k), `papan: langkah memuat "${k}"`);
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).slice(4), ["Berpikir Penjumlahan", "Keluarga Bilangan", "Kurangi dari Sepuluh"], "papan: tiga metode global dengan nama Indonesia berurutan di akhir");
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["selisih", "cocok dengan penjumlahan", "buka puluhan", "dipilih sesuai bilangannya"]) cek(hasil.includes(k), `papan: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/menjumlahkan/.test(masalah) && /dibalik/.test(masalah) && /diperiksa/.test(masalah), "papan: masalah menjumlahkan, dibalik, tidak diperiksa");
  cek(t.every((x) => !/\b(chacha|dika|nia|sari|rina|topi|dasi|penggaris|kartu stok|rak|koperasi|seragam)\b/i.test(x.kunci)), "papan: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "papan: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_PAPAN + D.PETUNJUK_URUT_PAPAN) && bersih(D.SUARA_PAPAN), "papan: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_PAPAN).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "papan: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "papan: paku bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis lembar stok ------------------------------ */
{
  const b = D.BARIS_LEMBAR;
  sama(b.length, 3, "lembar: tiga baris");
  sama(b.map((x) => x.awal), ["19 penggaris", "12 kotak", "17 topi"], "lembar: banyak awal dari Story");
  sama(b.map((x) => x.kurang), ["4 terjual", "8 terjual", "12 dasi"], "lembar: yang dikurangkan dari Story");
  sama(b.map((x) => x.hasil), ["15 sisa", "4 sisa", "5 selisih"], "lembar: hasil dari Story");
  for (const x of b) cek(Number.parseInt(x.awal, 10) - Number.parseInt(x.kurang, 10) === Number.parseInt(x.hasil, 10), `lembar: ${x.nama} awal dikurangi dikurangkan sama dengan hasil`);
  sama(D.TEMPAT_LEMBAR.length, 9, "lembar: sembilan sel");
  cek(new Set(D.TEMPAT_LEMBAR.map((x) => x.kunci)).size === 9, "lembar: label unik");
  cek(D.TEMPAT_LEMBAR.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_LEMBAR) && bersih(D.SUARA_LEMBAR), "lembar: label pendek, suara tanpa digit");
  sama(D.KOLOM_LEMBAR, ["Awal", "Dikurangi", "Hasil"], "lembar: tiga kolom");
  cek(Object.keys(D.KELOMPOK_LEMBAR).every((k2) => D.TEMPAT_LEMBAR.some((x) => x.kelompok === k2)), "lembar: tiap kolom punya sel");
  cek(Object.values(D.KELOMPOK_LEMBAR).every((t2) => tanpaDigit(t2) && bersih(t2)), "lembar: petunjuk kolom tanpa digit");
  const asal = (id) => Number(id.slice(1, 2));
  cek(D.TEMPAT_LEMBAR.every((x, i) => asal(x.id) === Math.floor(i / 3)), "lembar: id sel memuat nomor baris untuk petunjuk baris keliru");
}

/* ------------------------------ CPA ------------------------------ */
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  const nomorMisi = { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa];
  sama(soal.map((s) => Number(/Meja Stok (\d+)/.exec(s.judul)[1])), nomorMisi, `${nama}: nomor misi berlanjut`);
  sama(soal.map((s) => s.nomor), nomorMisi, `${nama}: nomor di data sama dengan judul`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 20), `${nama}: angka satu sampai dua puluh (${angka.join(",")})`);
  cek(angka.every((n) => !STORY_HASIL.includes(n)), `${nama}: jawaban tidak sama dengan hasil hitungan Story (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`), ["klik/keluarga", "klik/sepuluh"], `${nama}: dua langkah tanpa angka (memilih empat kalimat keluarga dan membandingkan dua cara)`);
  sama(semua.filter((x) => x.cara === "suara" || x.cara === "kanvas").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah kanvas dan suara berjawaban angka`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length === 1 && salah.every((x) => x.cara === "klik" && x.metode === "igil"), `${nama}: satu tugas Cari kesalahan di Klik (Susun dan Periksa)`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20)), `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut[0] !== l.benar && urut.length === 3, `${nama}: alasan benar bukan tombol pertama (urutan ${urut.join("")}, benar ${l.benar})`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && bersih(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(kunci) && (l.jawabTokoh === undefined || L.pilihanDari(l).includes(l.jawabTokoh)), `${nama}: pilihan memuat jawaban benar dan jawaban tokoh`);
    cek(L.petunjukSalah(l, l.jawabTokoh ?? -1).length > 10, `${nama}: petunjuk salah tersedia`);
    if (l.jawabTokoh !== undefined) cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }
  // Seed dari alur (angka dan benda disesuaikan agar berbeda dari Story).
  const ss = salah[0].langkah;
  if (rupa === "benda") cek(ss.dasar.tipe === "susun" && ss.tokoh === "Chacha" && ss.jawabTokoh === ss.dasar.a + ss.dasar.b && /ditambah/.test(ss.kataTokoh) && /dikurangi/.test(ss.keliru), `${nama}: Chacha menjumlahkan padahal terjual (salah: dikurangkan)`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "susun" && ss.tokoh === "Nia" && ss.jawabTokoh === L.balikSatuan(ss.dasar.a, ss.dasar.b) && L.perluBuka(ss.dasar.a, ss.dasar.b) && /dibalik|balik/.test(ss.kataTokoh) && /dibalik/.test(ss.keliru), `${nama}: Nia membalik satuan yang kurang (salah: buka satu puluhan)`);
  if (rupa === "lambang") cek(ss.dasar.tipe === "susun" && ss.tokoh === "Chacha" && ss.jawabTokoh === L.kunciLangkah(ss.dasar) - 1 && /dikurangi/.test(ss.kataTokoh) && /diperiksa/.test(ss.keliru) && ss.jawabTokoh + ss.dasar.b !== ss.dasar.a, `${nama}: Chacha tidak memeriksa dengan penjumlahan (salah: jumlahnya tidak cocok)`);

  let adaAmbilBuka = false;
  let bukaPerlu = 0;
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    const set = D.SETS[l.set];
    cek(set !== undefined && set.emoji.length > 0, `${lbl}: barang ${l.set} ada`);
    const mode = L.modeLangkah(l, rupa, x.cara);
    if (l.tipe === "keluarga") {
      cek(l.x >= 1 && l.y >= 1 && l.x !== l.y && l.x + l.y <= 20, `${lbl}: keluarga bilangan paling besar dua puluh`);
      sama(k, l.tanya === "kalimat" ? null : l.tanya === "kurang" ? l.y : l.tanya === "kurang2" ? l.x : l.x + l.y, `${lbl}: jawaban keluarga dihitung ulang`);
      cek(!STORY_OPERAN.includes(`${l.x + l.y}-${l.x}`) && !STORY_OPERAN.includes(`${l.x + l.y}-${l.y}`) && JSON.stringify([l.x, l.y].sort()) !== JSON.stringify([7, 8]), `${lbl}: keluarga berbeda dari Story`);
    } else {
      cek(Number.isInteger(l.a) && Number.isInteger(l.b) && l.a >= 2 && l.a <= 20 && l.b >= 1 && l.b <= l.a, `${lbl}: operan paling besar dua puluh`);
      cek(!STORY_OPERAN.includes(`${l.a}-${l.b}`), `${lbl}: operan berbeda dari Story (${l.a} dikurangi ${l.b})`);
      if (l.tipe !== "banding") sama(k, l.a - l.b, `${lbl}: jawaban dihitung ulang`);
    }
    if (l.tipe === "susun") {
      if (mode === "ambil") {
        cek(l.a >= 10 && l.a <= 20 && l.b <= l.a, `${lbl}: ambil punya ikat sepuluh dan muat di kanvas`);
        adaAmbilBuka = adaAmbilBuka || L.perluBuka(l.a, l.b);
        if (L.perluBuka(l.a, l.b)) bukaPerlu += 1;
        // Ambil yang benar selalu bisa dituntaskan: buka ikat hanya bila perlu.
        let r = L.rakAwal(l.a, l.b);
        let langkahTotal = 0;
        while (!L.rakSelesai(r) && langkahTotal < 60) {
          const h = L.ambilDariRak(r);
          if (h.ok) r = h.r;
          else {
            const b2 = L.bukaDiRak(r);
            if (!b2.ok) break;
            r = b2.r;
          }
          langkahTotal += 1;
        }
        cek(L.rakSelesai(r) && L.sisaRak(r) === l.a - l.b, `${lbl}: ambil dituntaskan dan sisanya ${l.a - l.b}`);
      }
    }
    if (l.tipe === "pikir") cek(l.a <= 20 && l.b >= 1 && l.a - l.b >= 1, `${lbl}: deret tempat kosong muat`);
    if (l.tipe === "sepuluh") cek(l.a >= 11 && l.a <= 19 && l.b >= 8 && l.b <= 10 && l.a - l.b >= 1, `${lbl}: Kurangi dari Sepuluh untuk bilangan sebelas sampai sembilan belas dan yang dikurangkan hampir sepuluh`);
    if (l.tipe === "banding") cek((l.a >= 11 && l.b >= 8) || l.b <= 3, `${lbl}: pembanding punya cara termudah yang jelas`);
    // Instruksi dan pilihan.
    const ins = L.instruksi(x.langkah, rupa, x.cara);
    cek(x.suara === ins && x.judul === ins && ins.length > 20 && tanpaDigit(ins) && bersih(ins), `${lbl}: instruksi bersih tanpa digit`);
    if (rupa === "diagram") cek(!/\b(barang|ikat|topi|dasi|baju|pensil)\b/i.test(ins), `${lbl}: instruksi Pictorial tanpa nama barang dan ikat`);
    if (rupa === "lambang") cek(!/\b(barang|ikat|titik|bingkai|topi|dasi|baju|pensil)\b/i.test(ins), `${lbl}: instruksi Abstract hanya puluhan dan satuan`);
    if (k !== null) {
      const pil = L.pilihanDari(x.langkah);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(k) && pil.every((n) => n >= 0 && n <= 20), `${lbl}: tiga pilihan berbeda memuat jawaban`);
      for (const m of pil) if (m !== k) cek(L.petunjukSalah(x.langkah, m).length > 10 && tanpaDigit(L.petunjukSalah(x.langkah, m)) && bersih(L.petunjukSalah(x.langkah, m)), `${lbl}: petunjuk salah untuk ${m} bersih`);
    }
  }
  cek(semua.filter((x) => x.cara === "kanvas" && x.langkah.tipe === "susun").every((x) => L.modeLangkah(x.langkah, rupa, "kanvas") === (rupa === "lambang" ? "langsung" : "ambil")), `${nama}: Kanvas Susun dan Periksa memakai kegiatan ambil (kecuali Abstract)`);
  if (rupa !== "lambang") cek(adaAmbilBuka && bukaPerlu >= 1, `${nama}: ada tugas ambil yang harus membuka satu puluhan`);
  // Kegiatan beragam: banding, memilih kalimat, memilih alasan.
  cek(semua.some((x) => L.modeLangkah(L.dasarDari(x.langkah), rupa, x.cara) === "banding") && semua.some((x) => L.modeLangkah(L.dasarDari(x.langkah), rupa, x.cara) === "kalimat") && semua.some((x) => x.langkah.tipe === "salah"), `${nama}: kegiatan beragam (bandingkan, pilih kalimat, pilih alasan)`);
}

/* ------------------------------ Isi pembantu ------------------------------ */
{
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING_SUARA.every((t) => tanpaDigit(t) && !/[=−+?]/.test(t) && bersih(t)), "poin penting: tujuh poin, suara tanpa digit dan lambang");
  cek(tanpaDigit(D.JEMBATAN_SUARA) && bersih(D.JEMBATAN_SUARA) && /Sub-Bab C/.test(D.JEMBATAN) && /pembukaan koperasi/.test(D.JEMBATAN), "jembatan ke Sub-Bab C");
  cek(Object.keys(D.TEMA_STOK).join() === "concrete,pictorial,abstract" && Object.values(D.TEMA_STOK).every((t) => bersih(t.cara)), "tema tiga tahap");
  cek(tanpaDigit(D.MISI_STOK) && bersih(D.MISI_STOK) && /Misi Meja Stok bagian satu/.test(D.MISI_STOK), "misi simulasi bagian satu tanpa digit");
  cek(D.CONCRETE_STOK === D.CONCRETE && D.PICTORIAL_STOK === D.PICTORIAL && D.ABSTRACT_STOK === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Simulasi Meja Stok dan misinya ------------------------------ */
{
  const kosong = new Set();
  const awal = L.awalStok();
  const dB = MB.daftarMisiK2Bab2("B");
  cek(dB === MB.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "misi B: empat wajib, dua bebas, id berawalan b-");
  cek(dB.every((m) => !/\d/.test(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit, bersih, ringkas");
  cek(S.misiBaru(dB, awal, kosong).length === 0, "misi B: keadaan awal tidak memenuhi misi");
  cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  sama(L.CONTOH_STOK.map((c) => `${c.a}-${c.b}`), ["18-11", "16-7", "20-6", "13-3"], "contoh stok di meja");
  cek(L.CONTOH_STOK.every((c) => !STORY_OPERAN.includes(`${c.a}-${c.b}`) && c.b >= 1 && c.b < c.a && c.a <= 20), "contoh stok berbeda dari Story dan paling besar dua puluh");
  const ada = (k, id) => S.misiBaru(dB, k, kosong).includes(id);
  // Pasangkan.
  {
    let k = awal;
    sama([k.mode, k.a, k.b, k.pasang], ["pasang", 18, 11, 0], "awal: mode pasang untuk contoh pertama");
    for (let i = 0; i < 10; i += 1) k = L.pasangSatu(k).k;
    cek(!ada(k, "b-pasang") && k.pasang === 10, "pasang: belum semua berpasangan");
    k = L.pasangSatu(k).k;
    cek(ada(k, "b-pasang") && L.selisihStok(k) === 7, "pasang: semua dasi berpasangan, selisih tujuh");
    cek(!L.pasangSatu(k).ok, "pasang: tidak melebihi banyak dasi");
    sama(L.kalimatStok(k), "Semua dasi sudah berpasangan. Ada tujuh topi yang tidak berpasangan. Itulah selisihnya.", "pasang: kalimat selisih");
  }
  // Kurangi tanpa buka, dan buka puluhan.
  {
    let k = L.pilihContohStok(awal, 13, 3);
    sama([k.p, k.s], [1, 3], "13 dikurangi 3: satu ikat, tiga barang lepas");
    sama(L.bukaPuluhan(k).sebab, "cukup", "13 dikurangi 3: barang lepas cukup, tidak perlu membuka ikat");
    for (let i = 0; i < 3; i += 1) k = L.ambilSatu(k).k;
    cek(ada(k, "b-kurang") && !ada(k, "b-buka") && L.sisaStok(k) === 10 && L.sudahAmbilSemua(k), "13 dikurangi 3: kurang tuntas tanpa buka, sisa sepuluh");
    sama(L.ambilSatu(k).sebab, "cukup", "13 dikurangi 3: tidak mengambil lebih");
    let b = L.pilihContohStok(awal, 20, 6);
    const habis = L.ambilSatu(b);
    cek(!habis.ok && habis.sebab === "habis" && !ada(b, "b-kurang"), "20 dikurangi 6: barang lepas habis, harus buka satu ikat");
    b = L.bukaPuluhan(b).k;
    sama([b.p, b.s, b.dibuka], [1, 10, 1], "20 dikurangi 6: buka satu ikat");
    for (let i = 0; i < 5; i += 1) b = L.ambilSatu(b).k;
    cek(!ada(b, "b-buka") && !ada(b, "b-kurang"), "20 dikurangi 6: belum selesai bila baru lima diambil");
    b = L.ambilSatu(b).k;
    cek(ada(b, "b-buka") && ada(b, "b-kurang") && L.sisaStok(b) === 14, "20 dikurangi 6: tuntas dengan membuka, sisa empat belas");
    // Periksa.
    cek(!L.periksaStok(L.pilihContohStok(awal, 20, 6)).ok, "periksa: belum bisa sebelum semua diambil");
    cek(!ada(L.pilihModeStok(b, "periksa"), "b-periksa"), "periksa: mode saja tidak cukup");
    const p = L.periksaStok(L.pilihModeStok(b, "periksa"));
    cek(p.ok && ada(p.k, "b-periksa"), "periksa: sisa ditambah yang terjual sama dengan awal");
    sama(L.kalimatStok(p.k), "Empat belas ditambah enam sama dengan dua puluh. Kartu stok cocok dengan isi rak.", "periksa: kalimat");
    // Ulang mempertahankan yang tercapai.
    const u = L.ulangStok(b);
    cek(u.diambil === 0 && u.p === 2 && u.s === 0 && u.bukaTuntas === 1 && u.kurangTuntas === 1, "ulang: rak dirapikan, yang sudah tercapai tetap tercatat");
    cek(L.pilihContohStok(awal, 5, 9) === awal && L.pilihContohStok(awal, 21, 3) === awal, "contoh di luar batas ditolak");
  }
  // Keluarga.
  {
    let k = L.pilihContohStok(awal, 16, 7);
    sama(L.kalimatContoh(k), ["7 + 9 = 16", "9 + 7 = 16", "16 − 7 = 9", "16 − 9 = 7"], "keluarga: empat kalimat contoh");
    for (let i = 0; i < 3; i += 1) k = L.bukaKalimat(k, i);
    cek(!ada(k, "b-keluarga") && k.keluargaMask === 7, "keluarga: tiga kalimat belum cukup");
    k = L.bukaKalimat(k, 3);
    cek(ada(k, "b-keluarga") && k.keluargaMask === 15, "keluarga: keempat kalimat dibuka");
    cek(L.bukaKalimat(k, 4) === k && L.bukaKalimat(k, -1) === k, "keluarga: nomor kalimat di luar batas diabaikan");
  }
  // Kurangi dari Sepuluh.
  {
    let k = L.pilihModeStok(L.pilihContohStok(awal, 16, 7), "sepuluh");
    cek(L.bolehSepuluh(k) && !ada(k, "b-sepuluh"), "sepuluh: contoh 16 dikurangi 7 boleh");
    k = L.sepuluhMaju(k).k;
    sama(k.sepuluhLangkah, 1, "sepuluh: langkah pertama");
    cek(!ada(k, "b-sepuluh"), "sepuluh: belum tuntas setelah langkah pertama");
    sama(L.kalimatStok(k), "Sepuluh dikurangi tujuh sama dengan tiga. Sekarang tambahkan enam.", "sepuluh: kalimat langkah pertama");
    k = L.sepuluhMaju(k).k;
    cek(ada(k, "b-sepuluh") && !L.sepuluhMaju(k).ok, "sepuluh: tuntas setelah langkah kedua");
    sama(L.kalimatStok(k), "Tiga ditambah enam sama dengan sembilan.", "sepuluh: kalimat hasil");
    cek(!L.bolehSepuluh(L.pilihContohStok(awal, 13, 12)) && !L.sepuluhMaju(L.pilihContohStok(awal, 13, 12)).ok, "sepuluh: yang dikurangkan lebih dari sepuluh ditolak");
    cek(!L.sepuluhMaju(L.pilihContohStok(awal, 10, 4)).ok, "sepuluh: bilangan awal sepuluh ditolak");
  }
  for (const m of ["pasang", "kurang", "periksa", "keluarga", "sepuluh"]) {
    const t = L.kalimatStok(L.pilihModeStok(L.pilihContohStok(awal, 18, 8), m));
    cek(tanpaDigit(t) && bersih(t) && t.length > 15, `kalimat stok mode ${m} tanpa digit`);
  }
}

/* ------------------------------ Berkas: emoji, akhir baris, kata terlarang, rupa ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  sama(berkas.sort(), ["Jawab20.tsx", "LangkahStok.tsx", "LembarStok.tsx", "PapanKartuStok.tsx", "SimulasiMejaStok.tsx", "TahapStok.tsx", "data.ts", "logika.ts", "periksa.ts"], "berkas folder stok-k2b2b");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    cek(!/borderStyle[\s\S]{0,400}border(Top|Right|Bottom|Left)Style|border(Top|Right|Bottom|Left)Style[\s\S]{0,400}borderStyle/.test(s), `${f}: tidak mencampur borderStyle dengan border sisi (galat konsol)`);
    const k = tanpaKomentar(s);
    const teksLayar = [...k.matchAll(/"([^"\\\n]|\\.)*"|`([^`\\]|\\.)*`/g)].map((m) => m[0]).concat([...k.matchAll(/>([^<>{}]+)</g)].map((m) => m[1]));
    for (const t of teksLayar) if (TERLARANG.test(t.replace(/\$\{[^}]*\}/g, "").replace(/\\u\{[0-9A-Fa-f]+\}/g, ""))) cek(false, `${f}: kata terlarang di teks layar (${t.slice(0, 50)})`);
  }
  const lang = readFileSync(new URL("LangkahStok.tsx", folderUrl), "utf8");
  cek(/useSiapLangsung\(l\.tipe !== "salah" && modeLangkah\(l, rupa, cara\) === "langsung", siap\)/.test(lang) && /function useSiapLangsung/.test(lang) && /if \(aktif\) siap\(\)/.test(lang), "LangkahStok: tugas langsung siap saat dibuka dengan memperhitungkan rupa lambang (tidak macet)");
  cek(/lm-goyang/.test(lang) && /Ini jawaban yang benar\./.test(lang), "LangkahStok: salah goyang dan jawaban benar setelah tiga kali salah");
  const jawab = readFileSync(new URL("Jawab20.tsx", folderUrl), "utf8");
  cek(/Ini jawaban yang benar/.test(jawab) && /BATAS_SALAH/.test(jawab) && /bilanganDariUcapan20/.test(jawab) && /<= 20/.test(jawab) && !/\b50\b/.test(jawab), "Jawab20: batas dua puluh dan jawaban benar setelah tiga kali salah");
  const tahap = readFileSync(new URL("TahapStok.tsx", folderUrl), "utf8");
  cek(/IKON_METODE\[ls\.metode\]/.test(tahap) && /rupa === "benda"/.test(tahap), "TahapStok: ikon metode hanya di Concrete");
  cek(/POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && /poinPenting/.test(tahap), "TahapStok: Poin Penting dan jembatan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
