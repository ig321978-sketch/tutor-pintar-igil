// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab B ("Pesanan Kue Hari Olahraga"), tengah cerita Kue di Kantin Sekolah.
// Memeriksa: rel kertas pesanan (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), laci kasir dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan satu tugas Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, mode tiap tugas (jawaban langsung atau kegiatan dulu), batas rupa, tata letak kanvas, pengenal ucapan sampai lima puluh,
// simulasi Meja Kasir dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-kasir-k2b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kasir-k2b1b/logika.ts");
const D = await import("../src/components/modul/kasir-k2b1b/data.ts");
const K = await import("../src/components/modul/kasir-k2b1b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB = await import("../src/components/modul/misi-k2bab1.ts");
const folderUrl = new URL("../src/components/modul/kasir-k2b1b/", import.meta.url);

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
const STORY = [2, 3, 4, 5, 7, 8, 9, 20, 25, 29, 30, 34, 36, 38, 40, 41, 42, 43, 47];
const jumlah = (a) => a.reduce((p, q) => p + q, 0);
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/* ------------------------------ Dasar ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 12, 19, 20, 21, 30, 36, 45, 50].map((n) => L.kata(n)), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "dua belas", "sembilan belas", "dua puluh", "dua puluh satu", "tiga puluh", "tiga puluh enam", "empat puluh lima", "lima puluh"], "kata bilangan sampai lima puluh");
  cek(Array.from({ length: 51 }, (_, n) => L.kata(n)).every((w, n) => tanpaDigit(w) && w.length > 0 && Array.from({ length: n }, (_, m) => L.kata(m)).every((x) => x !== w)), "kata: tiap bilangan nol sampai lima puluh punya nama tanpa digit dan unik");
  cek(L.kata(51) === "51" && L.kata(-1) === "-1", "kata: di luar batas dikembalikan apa adanya");
  sama(Object.keys(L.NAMA_METODE), ["igil", "balok", "bagan", "panjang"], "empat metode");
  sama(L.URUT_METODE, ["igil", "balok", "bagan", "panjang"], "urutan metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL: Tabel Puluhan dan Satuan") && L.NAMA_METODE.balok.startsWith("Base-Ten Blocks") && L.NAMA_METODE.bagan.startsWith("Place Value Chart") && L.NAMA_METODE.panjang.startsWith("Expanded Form"), "nama Inggris di judul soal");
  sama([L.bilanganDari(3, 4), L.bilanganTukar(3, 4), L.bilanganTukar(1, 2), L.bolehTukar(3, 4), L.bolehTukar(4, 5), L.bolehTukar(2, 5), L.bolehTukar(5, 0)], [34, 43, 21, true, false, false, true], "bilangan dan tukar");
  const tb = { tipe: "tabel", set: "kue", t: 2, s: 6, tanya: "bilangan", benih: 1 };
  const bl = { tipe: "balok", set: "kue", t: 1, s: 12, benih: 1 };
  const bg = { tipe: "bagan", set: "kue", t: 2, s: 3, tanya: { t: "tukar" }, benih: 1 };
  const pj = { tipe: "panjang", set: "kue", t: 4, s: 6, tanya: "susun", benih: 1 };
  sama(
    [tb, { ...tb, tanya: "puluhan" }, { ...tb, tanya: "satuan" }, bl, bg, { ...bg, tanya: { t: "bilangan" } }, { ...bg, tanya: { t: "arti", kolom: "puluhan" } }, { ...bg, tanya: { t: "arti", kolom: "satuan" } }, { ...bg, lingkari: "puluhan" }, pj, { ...pj, tanya: "gabung" }, { ...pj, tanya: "satuan" }, { ...pj, tanya: "puluhan" }].map((x) => L.kunciLangkah(x)),
    [26, 2, 6, 22, 32, 23, 20, 3, null, null, 46, 6, 40],
    "kunci tiap jenis langkah",
  );
  sama([tb, bl, bg, pj].map((x) => L.metodeLangkah(x)), ["igil", "balok", "bagan", "panjang"], "metode tiap jenis langkah");
  sama(L.metodeLangkah({ tipe: "salah", dasar: bg }), "bagan", "metode Cari kesalahan dari soal dasarnya");
  sama(L.kartuPanjang(4, 6), { puluhan: [40, 30], satuan: [6, 16] }, "kartu bentuk panjang: pas dan belum ringkas");
  for (const [t, s] of [[1, 7], [2, 1], [4, 9], [5, 0], [3, 2], [1, 8]]) {
    const k = L.kartuAngka(t, s, 3);
    cek(k.length === 4 && k.includes(t) && k.includes(s) && k.every((v) => v >= 0 && v <= 9) && new Set(k.filter((v) => v !== t && v !== s)).size === 2, `kartu angka untuk ${t} dan ${s}: empat kartu, dua pengecoh berbeda`);
    sama(L.kartuAngka(t, s, 3), k, `kartu angka ${t} dan ${s} tetap menurut benih`);
  }
  for (const x of [tb, { ...tb, tanya: "puluhan" }, bl, bg, { ...bg, lingkari: "satuan" }, pj, { ...pj, tanya: "gabung" }]) {
    const n = L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n), `kalimat kunci ${x.tipe} tanpa digit`);
  }
  // Mode tiap tugas.
  for (const rupa of ["benda", "diagram", "lambang"])
    for (const cara of ["klik", "kanvas", "suara"]) {
      const lb = `${rupa}/${cara}`;
      sama(L.modeLangkah(tb, rupa, cara), rupa === "lambang" || cara === "suara" ? "langsung" : cara === "klik" ? "pindah" : "tanda", `mode tabel ${lb}`);
      sama(L.modeLangkah(bl, rupa, cara), rupa === "lambang" || cara === "suara" ? "langsung" : cara === "klik" ? "ketuk" : "tanda", `mode balok ${lb}`);
      sama(L.modeLangkah({ ...bg, tanya: { t: "bilangan" } }, rupa, cara), cara === "klik" ? "susun" : "langsung", `mode bagan bilangan ${lb}`);
      sama(L.modeLangkah({ ...bg, tanya: { t: "bilangan" }, lingkari: "puluhan" }, rupa, cara), cara === "kanvas" ? "lingkari" : cara === "klik" ? "susun" : "langsung", `mode bagan lingkari ${lb}`);
      sama(L.modeLangkah(bg, rupa, cara), "langsung", `mode bagan tukar ${lb}`);
      sama(L.modeLangkah(pj, rupa, cara), cara === "klik" ? "susun" : "langsung", `mode panjang susun ${lb}`);
      sama(L.modeLangkah({ ...pj, tanya: "gabung" }, rupa, cara), "langsung", `mode panjang gabung ${lb}`);
    }
}

/* ------------------------------ Pengenal ucapan sampai lima puluh ------------------------------ */
{
  for (let x = 0; x <= 50; x += 1) sama(K.bilanganDariUcapan50(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
  sama(K.bilanganDariUcapan50("dua puluh lima"), [25], "ucapan dua puluh lima");
  sama(K.bilanganDariUcapan50("Sepuluh, sebelas, tiga puluh dua. 45 dan lima puluh"), [10, 11, 32, 45, 50], "ucapan beberapa bilangan dan angka");
  sama(K.bilanganDariUcapan50("empat puluh"), [40], "ucapan empat puluh");
  sama(K.bilanganDariUcapan50("enam puluh dua"), [6, 2], "ucapan di atas lima puluh tidak dikenali sebagai bilangan besar");
  sama(K.bilanganDariUcapan50("tiga belas"), [13], "ucapan belasan");
  sama(K.bilanganDariUcapan50("sepuluh lima"), [10, 5], "ucapan dua bilangan terpisah");
}

/* ------------------------------ Mind-map rel kertas pesanan ------------------------------ */
{
  const t = D.TEMPAT_REL;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "rel: tiga masalah, tujuh jepitan bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 44 && tanpaDigit(x.kunci)), "rel: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rel: jepitan bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["kemas sepuluh", "tabel puluhan dan satuan", "angka menurut letaknya", "nol", "balok puluhan dan satuan", "bagan puluhan dan satuan", "bentuk panjang"]) cek(gab.includes(k), `rel: langkah memuat "${k}"`);
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).slice(4), ["Balok Puluhan dan Satuan", "Bagan Puluhan dan Satuan", "Bentuk Panjang: puluhan ditambah satuan"], "rel: tiga metode global dengan nama Indonesia berurutan di akhir");
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["terbaca benar", "bergantung letaknya", "nol", "puluhan ditambah satuan"]) cek(hasil.includes(k), `rel: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/satu per satu/.test(masalah) && /tertukar/.test(masalah) && /nol/.test(masalah), "rel: masalah angka dibaca satu per satu, letak tertukar, nol dianggap tidak berguna");
  cek(t.every((x) => !/\b(chacha|dika|nia|sari|anto|dewi|kue|kotak|pesanan|kantin|kasir|pelari|lomba|nampan)\b/i.test(x.kunci)), "rel: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "rel: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_REL + D.PETUNJUK_URUT_REL) && bersih(D.SUARA_REL), "rel: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_REL).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "rel: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "rel: jepitan bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis laci kasir ------------------------------ */
{
  const b = D.BARIS_LACI;
  sama(b.length, 3, "laci: tiga pesanan");
  sama(b.map((x) => x.bil), ["25", "38", "40"], "laci: bilangan dari Story (dua puluh lima, tiga puluh delapan, empat puluh)");
  sama(b.map((x) => x.puluhan), ["dua puluh", "tiga puluh", "empat puluh"], "laci: puluhan");
  sama(b.map((x) => x.satuan), ["lima", "delapan", "nol"], "laci: satuan (nol di empat puluh)");
  sama(b.map((x) => x.panjang), ["20 + 5", "30 + 8", "40 + 0"], "laci: bentuk panjang");
  for (const x of b) cek(L.kata(Number(x.puluhan === "dua puluh" ? 20 : x.puluhan === "tiga puluh" ? 30 : 40)) === x.puluhan && Number(x.bil) === Number(x.panjang.split(" + ")[0]) + Number(x.panjang.split(" + ")[1]), `laci: ${x.bil} sama dengan puluhan ditambah satuan`);
  sama(D.TEMPAT_LACI.length, 9, "laci: sembilan bilik");
  cek(new Set(D.TEMPAT_LACI.map((x) => x.kunci)).size === 9, "laci: label unik");
  cek(D.TEMPAT_LACI.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_LACI) && bersih(D.SUARA_LACI), "laci: label pendek, suara tanpa digit");
  cek(D.KOLOM_LACI.length === 3 && Object.keys(D.KELOMPOK_LACI).every((k2) => D.TEMPAT_LACI.some((x) => x.kelompok === k2)), "laci: tiga kolom");
  cek(Object.values(D.KELOMPOK_LACI).every((t2) => tanpaDigit(t2) && bersih(t2)), "laci: petunjuk kolom tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Meja Kasir (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  sama(soal.map((s) => s.nomor), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor di data sama dengan judul`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 50), `${nama}: angka satu sampai lima puluh (${angka.join(",")})`);
  cek(angka.every((n) => !STORY.includes(n)), `${nama}: jawaban tidak sama dengan hasil hitungan Story (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`), ["klik/panjang", "kanvas/bagan"], `${nama}: dua langkah tanpa angka (susun bentuk panjang di Klik, lingkari angka di Kanvas)`);
  sama(semua.filter((x) => x.cara === "suara").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah suara berjawaban angka`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length === 1 && salah.every((x) => x.cara === "klik"), `${nama}: satu tugas Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 50)), `${nama}: jawaban ${l.tokoh} memang salah`);
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
  // Seed dari alur (angka dan benda disesuaikan agar berbeda dari Story).
  const ss = salah[0].langkah;
  if (rupa === "benda") cek(ss.dasar.tipe === "tabel" && ss.tokoh === "Chacha" && ss.jawabTokoh === ss.dasar.t + ss.dasar.s && /ditambah/.test(ss.kataTokoh) && /puluhan, bukan/.test(ss.keliru), `${nama}: Chacha menjumlahkan banyak kotak dan kue lepas (salah: kotak penuh itu puluhan)`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "bagan" && ss.dasar.tanya.t === "bilangan" && ss.tokoh === "Nia" && ss.jawabTokoh === L.bilanganTukar(ss.dasar.t, ss.dasar.s) && /kolom puluhan dan angka dua di kolom satuan/.test(ss.kataTokoh) && /tertukar/.test(ss.keliru), `${nama}: Nia menaruh angka tertukar di kolom (salah: letak tertukar)`);
  if (rupa === "lambang") cek(ss.dasar.tipe === "bagan" && ss.dasar.tanya.t === "arti" && ss.dasar.tanya.kolom === "puluhan" && ss.tokoh === "Dika" && ss.jawabTokoh === ss.dasar.t && L.kunciLangkah(ss.dasar) === 10 * ss.dasar.t && /puluhan itu sepuluh/.test(ss.keliru), `${nama}: Dika bilang angka di kolom puluhan artinya angkanya saja (salah: sepuluh kali)`);

  const tipeKlik = [];
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    const set = D.SETS[l.set];
    cek(set !== undefined && set.emoji.length > 0, `${lbl}: jenis kue ${l.set} ada`);
    cek(Number.isInteger(l.t) && Number.isInteger(l.s) && l.t >= 0 && l.s >= 0 && 10 * l.t + l.s <= 50, `${lbl}: bilangan paling besar lima puluh`);
    cek(JSON.stringify([l.t, l.s]) !== JSON.stringify([2, 5]) && JSON.stringify([l.t, l.s]) !== JSON.stringify([3, 4]) && JSON.stringify([l.t, l.s]) !== JSON.stringify([4, 3]) && JSON.stringify([l.t, l.s]) !== JSON.stringify([4, 0]) && JSON.stringify([l.t, l.s]) !== JSON.stringify([3, 8]), `${lbl}: data berbeda dari Story`);
    const mode = L.modeLangkah(l, rupa, x.cara);
    if (l.tipe === "tabel") {
      sama(k, l.tanya === "bilangan" ? 10 * l.t + l.s : l.tanya === "puluhan" ? l.t : l.s, `${lbl}: kunci tabel dihitung ulang`);
      cek(l.t >= 1 && l.t <= 5 && l.s >= 0 && l.s <= 9, `${lbl}: tabel puluhan satu sampai lima, satuan nol sampai sembilan`);
      if (mode === "pindah") cek(l.t + l.s <= 12, `${lbl}: klik memindahkan paling banyak dua belas benda`);
    }
    if (l.tipe === "balok") {
      sama(k, 10 * l.t + l.s, `${lbl}: kunci balok dihitung ulang`);
      cek(l.t >= 1 && l.s >= 1 && l.s <= 19 && l.t + (l.s >= 10 ? 1 : 0) <= 5, `${lbl}: balok panjang dan kubus kecil muat di kanvas`);
      if (l.s >= 10) cek(x.cara === "klik", `${lbl}: tukar sepuluh kubus hanya di Klik atau Abstract`) || 0;
    }
    if (l.tipe === "bagan") {
      cek(l.t >= 1 && l.t <= 5 && l.s >= 0 && l.s <= 9, `${lbl}: bagan puluhan satu sampai lima, satuan nol sampai sembilan`);
      if (l.tanya.t === "tukar") cek(L.bolehTukar(l.t, l.s) && l.t !== l.s && l.s >= 1 && k === 10 * l.s + l.t, `${lbl}: tukar kartu sah dan berbeda`);
      if (l.tanya.t === "bilangan") sama(k, l.lingkari ? null : 10 * l.t + l.s, `${lbl}: kunci bagan bilangan`);
      if (l.tanya.t === "arti") sama(k, l.tanya.kolom === "puluhan" ? 10 * l.t : l.s, `${lbl}: kunci arti angka`);
      if (l.lingkari) cek(x.cara === "kanvas" && l.t !== l.s && k === null, `${lbl}: lingkari hanya di Kanvas, angka berbeda, tanpa angka jawaban`);
      if (mode === "susun") cek(L.kartuAngka(l.t, l.s, l.benih).length === 4, `${lbl}: kartu angka untuk disusun`);
    }
    if (l.tipe === "panjang") {
      if (l.tanya === "susun") cek(k === null && x.cara === "klik" && l.t >= 2, `${lbl}: susun bentuk panjang tanpa angka, di Klik, puluhan paling sedikit dua`);
      else sama(k, l.tanya === "gabung" ? 10 * l.t + l.s : l.tanya === "satuan" ? l.s : 10 * l.t, `${lbl}: kunci bentuk panjang dihitung ulang`);
    }
    tipeKlik.push(l.tipe);
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 50), `${lbl}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && bersih(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
      cek(L.petunjukSalah(x.langkah, k + 1).length > 10 && L.petunjukSalah(x.langkah, 0).length > 10, `${lbl}: petunjuk salah umum`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 300, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    cek(x.judul === x.suara, `${lbl}: judul dan suara sama`);
    // Batas rupa: kata benda hanya di Concrete; Pictorial memakai bingkai dan titik; Abstract tanpa benda.
    if (x.langkah.tipe !== "salah") {
      if (rupa === "benda" && (mode === "pindah" || mode === "tanda") && l.tipe === "tabel") cek(/kotak kue penuh/.test(x.suara) && /kue lepas/.test(x.suara), `${lbl}: Concrete menyebut kotak kue dan kue lepas`);
      if (rupa !== "benda") cek(!/\bkue\b|kotak kue|donat|kukis|pastel/i.test(x.suara), `${lbl}: ${nama} tanpa nama kue (${x.suara})`);
      if (rupa === "diagram" && l.tipe === "tabel" && (mode === "pindah" || mode === "tanda")) cek(/bingkai penuh/.test(x.suara) && /titik lepas/.test(x.suara), `${lbl}: Pictorial menyebut bingkai dan titik`);
      if (rupa === "lambang") cek(!/ketuk tiap|beri tanda|pindahkan|pilih tiap/i.test(x.suara) || l.tipe === "bagan" || l.tipe === "panjang", `${lbl}: Abstract tanpa kegiatan memindahkan benda`);
    }
    // Tugas jawaban langsung atau kegiatan: pastikan jenis mode sesuai rupa dan cara.
    if (x.langkah.tipe !== "salah") {
      if (rupa === "lambang") cek(["langsung", "susun", "lingkari"].includes(mode), `${lbl}: Abstract bermode ${mode}`);
      cek(mode !== "pindah" || (x.cara === "klik" && rupa !== "lambang"), `${lbl}: pindah hanya di Klik bukan lambang`);
      cek(mode !== "tanda" || (x.cara === "kanvas" && rupa !== "lambang"), `${lbl}: tanda hanya di Kanvas bukan lambang`);
      cek(mode !== "ketuk" || (x.cara === "klik" && rupa !== "lambang"), `${lbl}: ketuk hanya di Klik bukan lambang`);
    }
  }
  cek(new Set(tipeKlik).size === 4, `${nama}: keempat jenis langkah dipakai`);
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)));
  const tanyaT = new Set(semua.filter((l) => l.tipe === "bagan").map((l) => (l.lingkari ? "lingkari" : l.tanya.t)));
  cek(["bilangan", "arti", "tukar", "lingkari"].every((t) => tanyaT.has(t)), "kegiatan beragam: bagan bilangan, arti angka, tukar kartu, dan lingkari");
  const tanyaP = new Set(semua.filter((l) => l.tipe === "panjang").map((l) => l.tanya));
  cek(["susun", "gabung", "satuan"].every((t) => tanyaP.has(t)), "kegiatan beragam: bentuk panjang susun, gabung, dan satuan hilang");
  cek(semua.some((l) => l.tipe === "balok" && l.s >= 10), "menukar sepuluh kubus dengan satu balok ada");
  cek(semua.some((l) => l.tipe === "tabel" && l.s === 0), "angka nol di satuan ada");
  cek(semua.some((l) => l.tipe === "bagan" && l.tanya.t === "tukar") && semua.some((l) => l.tipe === "panjang" && l.tanya === "susun"), "letak angka dan cara paling ringkas ada");
  cek(new Set(semua.map((l) => l.set)).size >= 4, "kegiatan beragam: paling sedikit empat jenis kue");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=+]/.test(p)) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit dan lambang");
  for (const k of ["sepuluh", "puluhan", "satuan", "letaknya", "nol", "ringkas", "bentuk panjang"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.JEMBATAN + D.JEMBATAN_SUARA) && /Sub-Bab C/.test(D.JEMBATAN) && /nampan/.test(D.JEMBATAN) && /membandingkan/.test(D.JEMBATAN), "jembatan ke Sub-Bab C: dua nampan dibandingkan");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_KASIR === D.CONCRETE && D.PICTORIAL_KASIR === D.PICTORIAL && D.ABSTRACT_KASIR === D.ABSTRACT && D.TEMA_KASIR === D.TEMA_TAHAP && D.MISI_MEJA_KASIR === D.MISI_MEJA, "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
  for (const s of Object.values(D.SETS)) cek(tanpaDigit(s.nama) && bersih(s.nama) && [...s.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d), `kue ${s.id}: nama bersih, emoji sampai U+1FA95`);
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  // Tabel: kotak penuh dan kue lepas.
  const pakets = Array.from({ length: 5 }, (_, i) => K.letakPaket(i));
  const lepasan = Array.from({ length: 9 }, (_, j) => K.letakLepas(j));
  cek(pakets.every((p) => p.x - K.UKURAN_PAKET.w / 2 > 2 && p.x + K.UKURAN_PAKET.w / 2 < W - 2 && p.y - K.UKURAN_PAKET.h / 2 > 22) && pakets.every((p, i) => i === 0 || p.x - pakets[i - 1].x >= K.UKURAN_PAKET.w + 4), "tabel: lima kotak penuh masuk kanvas dan tidak bertumpuk");
  cek(lepasan.every((p) => p.x - 12 > 2 && p.x + 12 < W - 2 && p.y + 12 < K.KOLOM_TABEL.y - 2) && lepasan.every((p, j) => j === 0 || p.x - lepasan[j - 1].x >= K.UKURAN_LEPAS + 4), "tabel: sembilan kue lepas masuk kanvas, tidak bertumpuk, di atas kolom");
  let minPL = 999;
  for (const p of pakets) for (const q of lepasan) minPL = Math.min(minPL, jarak(p, q));
  cek(K.JARI_PAKET * 2 <= minPL && K.JARI_PAKET * 2 <= K.UKURAN_PAKET.w + 8, `tabel: jari tanda kotak penuh tidak menjangkau kue lepas atau kotak tetangga (jarak ${minPL.toFixed(1)})`);
  const kt = K.KOLOM_TABEL;
  cek(kt.p.x + kt.p.w < kt.s.x && kt.s.x + kt.s.w < W - 2 && kt.y + kt.h < H - 2, "tabel: dua kolom masuk kanvas");
  for (let i = 0; i < 5; i += 1) cek(K.letakPaketKolom(i).x - 11 > kt.p.x && K.letakPaketKolom(i).x + 11 < kt.p.x + kt.p.w && K.letakPaketKolom(i).y + 8 < kt.y + kt.h, `tabel: kotak mini ${i} di dalam kolom puluhan`);
  for (let j = 0; j < 9; j += 1) {
    const p = K.letakLepasKolom(j);
    cek(p.x - 8 > kt.s.x && p.x + 8 < kt.s.x + kt.s.w && p.y - 8 > kt.y + 16 && p.y + 8 < kt.y + kt.h, `tabel: kue mini ${j} di dalam kolom satuan`);
  }
  // Balok dan kubus.
  const bars = Array.from({ length: 5 }, (_, i) => K.letakBalok(i));
  const cubes = Array.from({ length: 19 }, (_, j) => K.letakKubus(j));
  cek(bars.every((p) => p.x - K.UKURAN_BALOK.w / 2 > 2 && p.x + K.UKURAN_BALOK.w / 2 < 186 && p.y - K.UKURAN_BALOK.h / 2 > 24 && p.y + K.UKURAN_BALOK.h / 2 < 146) && bars.every((p, i) => i === 0 || p.x - bars[i - 1].x >= K.UKURAN_BALOK.w + 8), "balok: lima balok panjang masuk kanvas dan tidak bertumpuk");
  cek(cubes.every((p) => p.x - 8 > 186 && p.x + 8 < W - 2 && p.y - 8 > 24 && p.y + 8 < 148) && cubes.every((p, j) => cubes.every((q, m) => m <= j || jarak(p, q) >= K.UKURAN_KUBUS + 4)), "balok: sembilan belas kubus masuk kanvas dan tidak bertumpuk");
  let minBK = 999;
  for (const p of bars) for (const q of cubes) minBK = Math.min(minBK, jarak(p, q));
  cek(K.JARI_BALOK * 2 <= K.UKURAN_BALOK.w + 16 && K.JARI_BALOK * 2 < minBK && K.JARI_BALOK * 2 <= bars[1].x - bars[0].x, `balok: jari tanda tidak menjangkau kubus atau balok tetangga (jarak ${minBK.toFixed(1)})`);
  // Bagan.
  const B = K.BAGAN;
  cek(B.p.x + B.p.w < B.s.x && B.s.x + B.s.w < W - 2 && B.y > 60 && B.y + B.h < K.letakKartu(0, 4).y - K.UKURAN_KARTU.h / 2, "bagan: dua kolom masuk kanvas, di bawah contoh dan di atas kartu angka");
  const pP = K.pusatBagan("puluhan");
  const pS = K.pusatBagan("satuan");
  cek(pP.x < B.p.x + B.p.w && pP.x > B.p.x && pS.x > B.s.x && pS.x < B.s.x + B.s.w && jarak(pP, pS) > 80, "bagan: pusat lingkari di tiap kolom, berjauhan");
  for (let n = 2; n <= 4; n += 1) {
    const ks = Array.from({ length: n }, (_, i) => K.letakKartu(i, n));
    cek(ks.every((p) => p.x - K.UKURAN_KARTU.w / 2 > 2 && p.x + K.UKURAN_KARTU.w / 2 < W - 2 && p.y + K.UKURAN_KARTU.h / 2 < H - 2) && ks.every((p, i) => i === 0 || p.x - ks[i - 1].x >= K.UKURAN_KARTU.w + 4), `bagan: ${n} kartu angka masuk kanvas dan tidak bertumpuk`);
  }
  const ref = [...Array.from({ length: 5 }, (_, i) => K.letakRefPaket(i)), ...Array.from({ length: 9 }, (_, j) => K.letakRefLepas(j))];
  cek(ref.every((p) => p.x - 14 > 2 && p.x + 14 < W - 2 && p.y + 10 < B.y - 2 && p.y - 10 > 18) && K.letakRefPaket(4).x + 12 < K.letakRefLepas(0).x - 5, "bagan: contoh bilangan di atas bagan, tidak bertumpuk");
  const B2 = K.BAGAN2;
  cek(B2.atas.y + B2.atas.h < 90 && B2.bawah.y > 96 && B2.bawah.y + B2.bawah.h < H - 2 && B2.p.x + B2.p.w < B2.s.x && B2.s.x + B2.s.w < W - 2, "bagan tukar: dua bagan atas dan bawah masuk kanvas");
  // Bentuk panjang.
  cek(K.SLOT_P.x + K.SLOT_P.w < 150 && K.SLOT_S.x > 150 && K.SLOT_S.x + K.SLOT_S.w < W - 2 && K.SLOT_P.y > 60 && K.SLOT_P.y + K.SLOT_P.h < K.letakChip(0).y - K.UKURAN_CHIP.h / 2, "bentuk panjang: dua tempat masuk kanvas di atas kartu pilihan");
  const chips = Array.from({ length: 4 }, (_, i) => K.letakChip(i));
  cek(chips.every((p) => p.x - K.UKURAN_CHIP.w / 2 > 2 && p.x + K.UKURAN_CHIP.w / 2 < W - 2 && p.y + K.UKURAN_CHIP.h / 2 < H - 2) && chips.every((p, i) => i === 0 || p.x - chips[i - 1].x >= K.UKURAN_CHIP.w + 4), "bentuk panjang: empat kartu pilihan masuk kanvas dan tidak bertumpuk");
  const pu = Array.from({ length: 5 }, (_, i) => K.letakPaketUraian(i));
  const le = Array.from({ length: 9 }, (_, j) => K.letakLepasUraian(j));
  cek(pu.every((p) => p.x + 14 < 166 && p.x - 14 > 2) && le.every((p) => p.x - 10 > 180 && p.x + 10 < W - 2 && p.y + 10 < 106), "bentuk panjang: kelompok puluhan di kiri dan satuan di kanan tidak bertumpuk");
  // Pemeriksa kanvas.
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const tPak = pakets.slice(0, 3);
  cek(K.periksaCentang(tPak.map(coret), tPak, K.JARI_PAKET).benar && !K.periksaCentang([...tPak.map(coret), coret(lepasan[0])], tPak, K.JARI_PAKET).benar && !K.periksaCentang(tPak.slice(1).map(coret), tPak, K.JARI_PAKET).benar, "tabel: tanda hanya di kotak penuh, satu kotak satu tanda");
  const tBar = bars.slice(0, 4);
  cek(K.periksaCentang(tBar.map(coret), tBar, K.JARI_BALOK).benar && !K.periksaCentang([...tBar.map(coret), coret(cubes[0])], tBar, K.JARI_BALOK).benar, "balok: tanda hanya di balok panjang");
  cek(K.periksaLingkari([lingkar(pP, 44, 30)], [pP, pS], [true, false]).benar && !K.periksaLingkari([lingkar(pP, 150, 50)], [pP, pS], [true, false]).benar && K.periksaLingkari([lingkar(pS, 44, 30)], [pP, pS], [false, true]).benar, "bagan: melingkari satu kolom");
}

/* ------------------------------ Simulasi Meja Kasir dan usulan misi ------------------------------ */
{
  cek(tanpaDigit(D.MISI_MEJA) && bersih(D.MISI_MEJA), "meja: teks misi tanpa digit");
  sama([...L.CONTOH_PESANAN], [17, 26, 32, 45, 50], "meja: pesanan contoh");
  cek(L.CONTOH_PESANAN.every((n) => !STORY.includes(n)) && L.CONTOH_PESANAN.every((n) => n <= 50), "meja: pesanan contoh berbeda dari Story");
  let k = L.awalKasir();
  sama([k.alat, k.mode, k.kotak, k.lepas, k.kartuP, k.kartuS, k.susun, k.kemas, k.tabelDilihat, k.uraianDilihat, k.tukarTuntas, k.nolDilihat], ["kasir", "meja", 0, 0, 1, 2, false, 0, false, false, 0, false], "meja: awal");
  cek(!L.bilanganMeja(k) && JSON.stringify([k.kartuP, k.kartuS]) !== JSON.stringify([3, 4]) && L.bilanganKartu(k) === 12, "meja: kartu awal berbeda dari Story");
  // Susun.
  let r = L.tambahKotak(k);
  sama([r.ok, r.k.kotak, r.k.susun], [true, 1, false], "meja: tambah kotak belum menyusun");
  let k1 = r.k;
  r = L.tambahLepas(k1);
  sama([r.ok, r.k.kotak, r.k.lepas, r.k.susun, L.bilanganMeja(r.k)], [true, 1, 1, true, 11], "meja: ada kotak dan kue lepas, tersusun");
  sama([L.kurangiKotak(k).ok, L.kurangiLepas(k).ok], [false, false], "meja: tidak bisa mengurangi dari kosong");
  let penuh = k;
  for (let i = 0; i < 5; i += 1) penuh = L.tambahKotak(penuh).k;
  sama([L.bilanganMeja(penuh), L.tambahKotak(penuh).ok, L.tambahLepas(penuh).ok, L.tambahKotak(penuh).k === penuh], [50, false, false, true], "meja: paling besar lima puluh");
  let sepuluh = k;
  for (let i = 0; i < 10; i += 1) sepuluh = L.tambahLepas(sepuluh).k;
  sama([sepuluh.lepas, L.sudahRingkas(sepuluh), L.kemasSepuluh(k1).ok, L.kemasSepuluh(k1).k === k1], [10, false, false, true], "meja: sepuluh kue lepas belum ringkas, kemas butuh sepuluh");
  let dua = sepuluh;
  dua = L.tambahKotak(dua).k;
  const kemas = L.kemasSepuluh(dua);
  sama([kemas.ok, kemas.k.kotak, kemas.k.lepas, kemas.k.kemas, L.bilanganMeja(kemas.k) === L.bilanganMeja(dua)], [true, 2, 0, 1, true], "meja: kemas sepuluh jadi satu kotak, jumlah tetap");
  sama([L.bukaKotak(kemas.k).ok, L.bukaKotak(kemas.k).k.kotak, L.bukaKotak(kemas.k).k.lepas, L.bukaKotak(sepuluh).ok, L.bukaKotak(k).ok], [true, 1, 10, false, false], "meja: buka kotak jadi sepuluh kue lepas, tidak bila sudah banyak atau tidak ada kotak");
  let teliti = L.awalKasir();
  while (L.tambahLepas(teliti).ok) teliti = L.tambahLepas(teliti).k;
  sama([teliti.lepas, L.bilanganMeja(teliti)], [19, 19], "meja: kue lepas paling banyak sembilan belas");
  // Pesanan contoh dan catatan.
  const p17 = L.aturPesanan(k, 17);
  sama([p17.kotak, p17.lepas, p17.susun, L.aturPesanan(k, 51) === k, L.aturPesanan(k, 50).kotak, L.aturPesanan(k, 50).lepas], [1, 7, true, true, 5, 0], "meja: pesanan contoh menyusun kotak dan kue lepas");
  // Tabel.
  const tb0 = L.pilihModeKasir(k, "tabel");
  const tb1 = L.pilihModeKasir(p17, "tabel");
  const tb50 = L.pilihModeKasir(L.aturPesanan(k, 50), "tabel");
  const tb10 = L.pilihModeKasir(sepuluh, "tabel");
  sama([tb0.tabelDilihat, tb1.tabelDilihat, tb50.tabelDilihat, tb50.nolDilihat, tb1.nolDilihat, tb10.tabelDilihat, L.pilihModeKasir(L.pilihModeKasir(p17, "tabel"), "meja").tabelDilihat], [false, true, false, true, false, false, true], "meja: tabel dibaca, nol di satuan, catatan tidak dicabut");
  // Kartu.
  let kt = L.awalKasir();
  kt = L.ubahKartu(kt, "puluhan");
  sama([kt.kartuP, kt.kartuS], [2, 2], "kartu: puluhan naik");
  kt = L.ubahKartu(kt, "satuan");
  sama([kt.kartuP, kt.kartuS, L.bilanganKartu(kt)], [2, 3, 23], "kartu: satuan naik");
  let t5 = { ...L.awalKasir(), kartuP: 4, kartuS: 7 };
  t5 = L.ubahKartu(t5, "puluhan");
  sama([t5.kartuP, t5.kartuS, L.bilanganKartu(t5)], [5, 0, 50], "kartu: puluhan lima membuat satuan nol (paling besar lima puluh)");
  t5 = L.ubahKartu(t5, "satuan");
  sama([t5.kartuP, t5.kartuS], [5, 0], "kartu: satuan tidak naik bila puluhan lima");
  cek([0, 1, 2, 3, 4, 5, 6, 7].every((n) => { let q = L.awalKasir(); for (let i = 0; i < n * 3; i += 1) q = L.ubahKartu(L.ubahKartu(q, "puluhan"), "satuan"); return L.bilanganKartu(q) <= 50; }), "kartu: bilangan tidak pernah lebih dari lima puluh");
  const tk = L.tukarKartu(L.awalKasir());
  sama([tk.ok, tk.k.kartuP, tk.k.kartuS, tk.k.tukarTuntas, L.tukarKartu(tk.k).k.kartuP], [true, 2, 1, 1, 1], "kartu: tukar tempat satu dua jadi dua satu");
  sama([L.tukarKartu({ ...L.awalKasir(), kartuP: 4, kartuS: 5 }).ok, L.tukarKartu({ ...L.awalKasir(), kartuP: 3, kartuS: 3 }).k.tukarTuntas, L.tukarKartu({ ...L.awalKasir(), kartuP: 3, kartuS: 3 }).ok], [false, 0, true], "kartu: tukar lebih dari lima puluh ditolak, angka sama tidak dihitung");
  // Uraian.
  const ur = L.pilihModeKasir(p17, "uraian");
  sama([ur.uraianDilihat, L.pilihModeKasir(L.aturPesanan(k, 50), "uraian").uraianDilihat, L.pilihModeKasir(sepuluh, "uraian").uraianDilihat, L.caraTulis(p17), L.caraTulis(L.aturPesanan(k, 8))], [true, false, false, { ringkas: [10, 7], lain: [0, 17] }, { ringkas: [0, 8], lain: null }], "uraian: cara ringkas dan cara lain");
  cek(L.caraTulis(p17).ringkas[0] + L.caraTulis(p17).ringkas[1] === 17 && L.caraTulis(p17).lain[0] + L.caraTulis(p17).lain[1] === 17, "uraian: dua cara jumlahnya sama");
  // Kalimat suara.
  const contoh = [k, k1, p17, sepuluh, tb1, tb10, tb50, kt, tk.k, ur, L.pilihModeKasir(sepuluh, "uraian"), L.pilihModeKasir(k, "uraian"), L.pilihModeKasir(k, "kartu"), L.aturPesanan(L.pilihModeKasir(k, "uraian"), 50)];
  for (const st of contoh) {
    const kal = L.kalimatKasir(st);
    cek(tanpaDigit(kal) && bersih(kal) && kal.length > 10, `meja: kalimat ${st.mode} tanpa digit ("${kal}")`);
  }
  // Misi.
  const daftar = MB.daftarMisiK2Bab1("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar === MB.MISI_B && daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("b-")), "misi B: id unik berawalan b-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && bersih(x.teks)), "misi B: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  const awal = L.awalKasir();
  cek(daftar.every((x) => !x.cek(awal)), "misi B: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "kerangka" }) && !x.cek({ alat: "etalase" }) && !x.cek({ alat: "pesta" })), "misi B: keadaan alat lain tidak memenuhi");
  cek(ada(L.tambahLepas(L.tambahKotak(awal).k).k, "b-susun") && !ada(L.tambahKotak(awal).k, "b-susun") && !ada(L.tambahLepas(awal).k, "b-susun"), "misi B: susun butuh kotak dan kue lepas");
  cek(ada(kemas.k, "b-kemas") && !ada(sepuluh, "b-kemas") && !ada(p17, "b-kemas"), "misi B: kemas sepuluh jadi satu kotak");
  cek(ada(tb1, "b-tabel") && !ada(p17, "b-tabel") && !ada(tb0, "b-tabel") && !ada(tb50, "b-tabel"), "misi B: tabel dibuka untuk pesanan yang ringkas");
  cek(ada(ur, "b-panjang") && !ada(p17, "b-panjang") && !ada(L.pilihModeKasir(sepuluh, "uraian"), "b-panjang"), "misi B: bentuk panjang dibuka untuk pesanan yang ringkas");
  cek(ada(tk.k, "b-tukar") && !ada(L.awalKasir(), "b-tukar") && !ada(L.tukarKartu({ ...L.awalKasir(), kartuP: 3, kartuS: 3 }).k, "b-tukar"), "misi B: tukar kartu dengan angka berbeda");
  cek(ada(tb50, "b-nol") && !ada(tb1, "b-nol") && !ada(L.aturPesanan(k, 50), "b-nol"), "misi B: nol di satuan terlihat di tabel");
  const tamp = daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  const wajib = tamp.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(tamp, new Set(wajib)) && !S.wajibSelesai(tamp, new Set(wajib.slice(1))), "misi B: gerbang misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "Jawab50.tsx", "LangkahKasir.tsx", "TahapKasir.tsx", "RelPesanan.tsx", "LaciKasir.tsx", "SimulasiMejaKasir.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    cek(!/buku/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa kata buku`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x) && !/&&|className|=>/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|tebak|kunci|latihan)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/nilai tempat/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa kata nilai tempat`);
  }
  const tahap = readFileSync(new URL("TahapKasir.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapKasir: Abstract diakhiri Poin Penting dan jembatan (bukan perayaan akhir bab)");
  cek(/kayu/.test(tahap) && /kolom/.test(tahap) && /tiket/.test(tahap) && /Koin/.test(tahap) && /Batang/.test(tahap) && /Tiket/.test(tahap), "TahapKasir: tiga pola visual (meja kayu, kertas kolom, tiket) dengan kemajuan koin, batang, tiket");
  for (const f of ["LangkahKasir.tsx", "TahapKasir.tsx", "SimulasiMejaKasir.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahKasir.tsx", folderUrl), "utf8");
  cek(/from "\.\/Jawab50"/.test(langkah) && berkas.includes("Jawab50.tsx"), "LangkahKasir: jawaban dua kotak memakai salinan Jawab50 di folder sendiri");
  cek(!/ikan-k1b5a\/Jawab20/.test(langkah), "LangkahKasir: tidak memakai Jawab20 (batas dua puluh)");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahKasir: Cari kesalahan dan petunjuk yang menunjuk kesalahan");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahKasir: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  const jawab = readFileSync(new URL("Jawab50.tsx", folderUrl), "utf8");
  cek(/BATAS_SALAH/.test(jawab) && /bilanganDariUcapan50/.test(jawab) && !/bilanganDariUcapan20/.test(jawab) && /data-uji="jawab-dua-kotak"/.test(jawab) && jawab.includes("Ini jawaban yang benar"), "Jawab50: dua kotak, ucapan sampai lima puluh, jawaban ditunjukkan");
  const aman = [...langkah.matchAll(/\.emoji/g)].every((m) => /rupa === "benda"/.test(langkah.slice(Math.max(0, m.index - 700), m.index)));
  cek(aman && (langkah.match(/\.emoji/g) ?? []).length >= 3, "LangkahKasir: emoji kue hanya di rupa benda (Concrete)");
  cek(/rupa === "lambang"/.test(langkah) && (langkah.match(/rupa === "lambang"/g) ?? []).length >= 5 && /Pernyataan/.test(langkah), "LangkahKasir: Abstract memakai kata dan angka saja");
  cek(/<circle/.test(langkah) && /<rect/.test(langkah) && /rupa === "diagram"/.test(langkah), "LangkahKasir: Pictorial memakai bingkai, titik, dan batang polos");
  const siapLangsung = langkah.match(/useSiapLangsung\(.*\);/g) ?? [];
  cek(siapLangsung.length === 4 && siapLangsung.every((x) => x.includes('mode === "langsung"') && x.includes("!diam")), "LangkahKasir: tiap kegiatan (Tabel, Balok, Bagan, Panjang) siap dijawab bila modeLangkah langsung (lambang, suara, dan soal tanpa kegiatan)");
  for (const [komponen, awal, akhir] of [["Tabel", "function Tabel(", "function Balokan("], ["Balokan", "function Balokan(", "function Bagan1("], ["Bagan", "function Bagan({", "function Panjang("], ["Panjang", "function Panjang(", "function Dasar("]]) {
    const potong = langkah.slice(langkah.indexOf(awal), langkah.indexOf(akhir));
    const iHook = potong.indexOf("useSiapLangsung");
    const iRet = potong.search(/if \(rupa === "lambang"\)\s*return/);
    cek(iHook > 0 && (iRet < 0 || iHook < iRet), `LangkahKasir ${komponen}: useSiapLangsung dipanggil sebelum percabangan rupa lambang (urutan hook tetap)`);
  }
  const lc = readFileSync(new URL("LaciKasir.tsx", folderUrl), "utf8");
  cek(/BARIS_LACI\[baris\]\.nama/.test(lc) && /barisnya keliru/.test(lc), "LaciKasir: petunjuk salah menyebut baris yang keliru");
  const sim = readFileSync(new URL("SimulasiMejaKasir.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalKasir/.test(sim) && /speakGuru/.test(sim) && /Main lagi/.test(sim) && /tambahKotak/.test(sim) && /kemasSepuluh/.test(sim) && /tukarKartu/.test(sim) && /caraTulis/.test(sim) && /pilihModeKasir/.test(sim), "SimulasiMejaKasir: melaporkan keadaan dan memuat empat alat");
  for (const f of ["RelPesanan.tsx", "LaciKasir.tsx", "SimulasiMejaKasir.tsx", "TahapKasir.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const ms = readFileSync(new URL("../src/components/modul/SimulasiK2Bab1.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiMejaKasir") && ms.includes("MISI_MEJA_KASIR") && /daftarMisiK2Bab1\("B"\)/.test(ms), "SimulasiK2Bab1: Sub-Bab B memakai Meja Kasir");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
