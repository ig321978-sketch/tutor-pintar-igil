// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 8 Sub-Bab A ("Kotak Cerita Berantakan"), awal cerita Perpustakaan Keliling.
// Memeriksa: rak kayu lipat (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), laci kartu dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, batas rupa, tata letak kanvas, simulasi Meja Pilah dan usulan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-pustaka-k1b8a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pustaka-k1b8a/logika.ts");
const D = await import("../src/components/modul/pustaka-k1b8a/data.ts");
const K = await import("../src/components/modul/pustaka-k1b8a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB8 = await import("../src/components/modul/misi-bab8.ts");
const folderUrl = new URL("../src/components/modul/pustaka-k1b8a/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku/i.test(t);
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];
const STORY = [3, 4, 5, 6, 10, 15, 18];
const jumlah = (a) => a.reduce((p, q) => p + q, 0);

/* ------------------------------ Dasar ------------------------------ */
{
  sama(Object.keys(L.NAMA_METODE), ["igil", "lingkaran", "pasang", "tabel"], "empat metode");
  cek(L.NAMA_METODE.igil.startsWith("Metode IGIL") && L.NAMA_METODE.lingkaran.startsWith("Sorting Hoops") && L.NAMA_METODE.pasang.startsWith("One-to-One Matching") && L.NAMA_METODE.tabel.startsWith("Frequency Table"), "nama Inggris di judul soal");
  sama(L.URUT_METODE, ["igil", "lingkaran", "pasang", "tabel"], "urutan metode");
  const isi = [7, 3, 5];
  sama([L.jumlahSemua(isi), L.indeksTerbanyak(isi), L.indeksTersedikit(isi), L.terbanyakTunggal([5, 5, 2]), L.tersedikitTunggal([5, 5, 2])], [15, 0, 1, false, true], "jumlah, terbanyak, tersedikit, tunggal");
  sama([{ t: "jenis", j: 2 }, { t: "terbanyak" }, { t: "tersedikit" }, { t: "jumlah" }, { t: "selisih", a: 0, b: 1 }].map((t) => L.kunciTanya(isi, t)), [5, 7, 3, 15, 4], "kunci tanya");
  const t1 = { tipe: "turus", set: "buah", isi: [7, 3, 5], j: 0, benih: 1 };
  const l1 = { tipe: "lingkaran", set: "buah", isi, tanya: { t: "tersedikit" }, benih: 1 };
  const p1 = { tipe: "pasang", set: "buah", isi: [9, 4], angka: true, benih: 1 };
  const b1 = { tipe: "tabel", set: "buah", isi, tanya: { t: "jumlah" }, benih: 1 };
  sama([t1, l1, p1, { ...p1, angka: false }, b1].map((x) => L.kunciLangkah(x)), [7, 3, 5, null, 15], "kunci tiap jenis langkah");
  sama([t1, l1, p1, b1].map((x) => L.metodeLangkah(x)), ["igil", "lingkaran", "pasang", "tabel"], "metode tiap jenis langkah");
  sama(L.urutanCampur([2, 3], 5).sort(), [0, 0, 1, 1, 1], "urutan campur memuat tiap jenis sebanyak isinya");
  sama(L.urutanCampur([4, 4, 3], 9), L.urutanCampur([4, 4, 3], 9), "urutan campur tetap menurut benih");
  sama([L.turusTeks(0), L.turusTeks(3), L.turusTeks(5), L.turusTeks(8), L.turusTeks(12)], ["-", "|||", "||||/", "||||/ |||", "||||/ ||||/ ||"], "turus teks: lima dicoret miring");
  for (const x of [t1, l1, p1, b1]) {
    const n = L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n), `kalimat kunci ${x.tipe} tanpa digit`);
  }
  sama(L.kalimatTanya({ t: "selisih", a: 0, b: 1 }, ["apel", "pisang"]), "Berapa selisih apel dan pisang?", "kalimat tanya selisih");
  for (const x of [{ t: "jenis", j: 0 }, { t: "terbanyak" }, { t: "tersedikit" }, { t: "jumlah" }, { t: "selisih", a: 0, b: 1 }]) cek(tanpaDigit(L.kalimatTanya(x, ["apel", "pisang"])), `kalimat tanya ${x.t} tanpa digit`);
}

/* ------------------------------ Mind-map rak kayu lipat ------------------------------ */
{
  const t = D.TEMPAT_RAK;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "rak: tiga masalah, tujuh petak bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "rak: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rak: petak bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pilah menurut jenis", "lingkaran pilah", "turus", "lima dicoret miring", "tabel frekuensi", "baris dan kolom", "pasangkan satu-satu", "jumlahkan semuanya"]) cek(gab.includes(k), `rak: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["paling banyak", "paling sedikit", "sama banyak", "selisih", "jumlah"]) cek(hasil.includes(k), `rak: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/bercampur/.test(masalah) && /dua kali/.test(masalah) && /belum diketahui/.test(masalah), "rak: masalah bercampur, terhitung dua kali, banyak tiap jenis belum diketahui");
  cek(t.every((x) => !/\b(tiang|tupai|burung|igil|kaka|abang|mamah|pak pos|kotak|hewan|laut|roket|mobil|cerita|pustaka)\b/i.test(x.kunci)), "rak: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "rak: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_RAK + D.PETUNJUK_URUT_RAK) && bersih(D.SUARA_RAK), "rak: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_RAK).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "rak: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 83);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "rak: petak bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis laci kartu ------------------------------ */
{
  const b = D.BARIS_LACI;
  sama(b.length, 5, "laci: lima kartu");
  sama(b.map((x) => x.banyak), ["6", "4", "5", "3", "18"], "laci: banyak dari Story (hewan 6, laut 4, roket 5, bunga 3, semuanya 18)");
  sama(b.map((x) => x.nama), ["Hewan", "Laut", "Roket", "Bunga", "Semuanya"], "laci: nama kartu");
  sama(b.slice(0, 4).map((x) => x.turus), [L.turusTeks(6), L.turusTeks(4), L.turusTeks(5), L.turusTeks(3)], "laci: turus lima dicoret miring");
  cek(/paling banyak/.test(b[0].catatan) && /kurang satu dari roket/.test(b[1].catatan) && /kurang satu dari hewan/.test(b[2].catatan) && /paling sedikit/.test(b[3].catatan) && /jumlah/.test(b[4].catatan), "laci: catatan paling banyak, kurang satu, paling sedikit, jumlah");
  cek(b[4].turus === [0, 1, 2, 3].map((q) => b[q].turus).join(" "), "laci: jumlah semuanya menyambung goresan keempat jenis");
  sama(D.TEMPAT_LACI.length, 15, "laci: lima belas kotak");
  cek(new Set(D.TEMPAT_LACI.map((x) => x.kunci)).size === 15, "laci: label unik");
  cek(D.TEMPAT_LACI.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_LACI) && bersih(D.SUARA_LACI), "laci: label pendek, suara tanpa digit");
  cek(D.KOLOM_LACI.length === 3 && Object.keys(D.KELOMPOK_LACI).every((k2) => D.TEMPAT_LACI.some((x) => x.kelompok === k2)), "laci: tiga kolom");
  cek(Object.values(D.KELOMPOK_LACI).every(tanpaDigit), "laci: petunjuk kolom tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
// Story: hewan 6, laut 4, roket 5, bunga 3, semuanya 18, selisih 3, jumlah berjalan 10 dan 15; jawaban CPA menghindari semuanya.
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Meja Pilah (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 17), `${nama}: angka satu sampai tujuh belas (${angka.join(",")})`);
  cek(angka.every((n) => !STORY.includes(n)), `${nama}: jawaban tidak sama dengan hasil hitungan Story (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`), ["klik/pasang", "kanvas/pasang"], `${nama}: dua langkah tanpa angka (menandai yang tidak berpasangan) di Klik dan Kanvas`);
  sama(semua.filter((x) => x.cara === "suara").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah suara berjawaban angka`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 18)), `${nama}: jawaban ${l.tokoh} memang salah`);
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
  if (rupa === "benda") cek(ss.dasar.tipe === "turus" && ss.tokoh === "Igil" && ss.jawabTokoh === L.kunciLangkah(ss.dasar) + 1 && /Pilah dulu menurut jenis/.test(ss.alasan.join(" ")) && /campur/.test(ss.kataTokoh), `${nama}: Igil menghitung tumpukan campur, satu benda terhitung dua kali (alasan: pilah dulu)`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "tabel" && ss.tokoh === "Kaka" && /kolom/.test(ss.kataTokoh) && /Garis ke samping adalah baris/.test(ss.alasan.join(" ")) && ss.jawabTokoh === undefined, `${nama}: Kaka menyebut garis ke samping kolom (salah: baris)`);
  if (rupa === "lambang") cek(ss.dasar.tipe === "tabel" && ss.dasar.tanya.t === "jumlah" && ss.jawabTokoh === ss.dasar.isi[0] + ss.dasar.isi[1] && /dua jenis/.test(ss.kataTokoh) && /semua jenis/.test(ss.alasan.join(" ")), `${nama}: Igil menjumlahkan hanya dua jenis`);

  const tipeKlik = [];
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    const lbl = `${nama} ${x.metode}/${x.cara}`;
    const set = D.SETS[l.set];
    cek(set !== undefined && set.nama.length === 4 && set.emoji.length === 4, `${lbl}: kumpulan benda ${l.set} lengkap`);
    // Banyak tiap jenis dan jumlah.
    const isiJenis = l.tipe === "pasang" ? l.isi : l.isi;
    cek(isiJenis.every((v) => Number.isInteger(v) && v >= 1 && v <= 9) && jumlah(isiJenis) <= 18 && isiJenis.length >= 2 && isiJenis.length <= set.nama.length, `${lbl}: tiap jenis satu sampai sembilan, jumlah paling besar delapan belas`);
    cek(JSON.stringify([...isiJenis].sort()) !== JSON.stringify([3, 4, 5, 6]) && JSON.stringify(isiJenis) !== JSON.stringify([6, 4, 5, 3]), `${lbl}: data berbeda dari Story`);
    if (l.tipe === "turus") {
      sama(k, l.isi[l.j], `${lbl}: kunci turus dihitung ulang`);
      cek(l.j >= 0 && l.j < l.isi.length, `${lbl}: jenis yang dihitung ada`);
      cek(x.cara === "suara" || rupa === "lambang" || jumlah(l.isi) <= 15, `${lbl}: tumpukan paling banyak lima belas benda`);
    }
    if (l.tipe === "lingkaran") {
      const kk = { jenis: l.isi[l.tanya.j], terbanyak: Math.max(...l.isi), tersedikit: Math.min(...l.isi), jumlah: jumlah(l.isi), selisih: Math.abs(l.isi[l.tanya.a] - l.isi[l.tanya.b]) }[l.tanya.t];
      sama(k, kk, `${lbl}: kunci lingkaran dihitung ulang`);
      if (x.cara === "kanvas" && rupa !== "lambang") cek(l.lingkari !== undefined && (l.lingkari === "terbanyak" ? L.terbanyakTunggal(l.isi) : L.tersedikitTunggal(l.isi)), `${lbl}: lingkaran yang dilingkari tunggal`);
      if (x.cara === "klik" && rupa !== "lambang") cek(jumlah(l.isi) <= 12, `${lbl}: klik memindahkan paling banyak dua belas benda`);
      cek(l.isi.length === 3, `${lbl}: tiga lingkaran`);
    }
    if (l.tipe === "pasang") {
      cek(l.isi[0] !== l.isi[1] && l.isi.length === 2, `${lbl}: dua jenis dengan banyak berbeda`);
      cek(x.cara !== "suara" ? l.angka === false : l.angka === true, `${lbl}: angka hanya di suara`);
      if (l.angka) sama(k, Math.abs(l.isi[0] - l.isi[1]), `${lbl}: kunci pasang dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${lbl}: tandai tanpa angka, bukan suara`);
      cek(JSON.stringify(l.isi) !== JSON.stringify([6, 3]) && JSON.stringify(l.isi) !== JSON.stringify([5, 8]), `${lbl}: pasangan berbeda dari Story dan contoh metode global`);
    }
    if (l.tipe === "tabel") {
      const kk = { jenis: l.isi[l.tanya.j], terbanyak: Math.max(...l.isi), tersedikit: Math.min(...l.isi), jumlah: jumlah(l.isi), selisih: Math.abs(l.isi[l.tanya.a] - l.isi[l.tanya.b]) }[l.tanya.t];
      sama(k, kk, `${lbl}: kunci tabel dihitung ulang`);
      if (x.cara === "kanvas" && rupa !== "lambang") cek(l.lingkari !== undefined && (l.lingkari === "terbanyak" ? L.terbanyakTunggal(l.isi) : L.tersedikitTunggal(l.isi)), `${lbl}: baris yang dilingkari tunggal`);
      if (x.cara === "klik" && rupa !== "lambang" && x.langkah.tipe !== "salah") cek(jumlah(l.isi) <= 12, `${lbl}: klik memberi goresan paling banyak dua belas kali`);
    }
    tipeKlik.push(l.tipe);
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 18), `${lbl}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${lbl}: petunjuk salah untuk ${m} tanpa digit`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 260, `${lbl}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    cek(/benda|bentuk|tabel|lingkaran|turus|jenis|garis|papan/i.test(x.suara) || x.langkah.tipe === "salah", `${lbl}: instruksi menyebut bendanya`);
    // Batas rupa: nama jenis hanya benda di Concrete dan Abstract, bentuk di Pictorial.
    if (rupa === "diagram") cek(D.BENTUK.some((b) => x.suara.includes(b)) || x.langkah.tipe === "salah" || l.tipe === "pasang" || l.tipe === "lingkaran" || l.tipe === "tabel", `${lbl}: Pictorial menyebut bentuk polos`);
    if (rupa === "diagram") cek(!set.nama.some((nm) => new RegExp(`\\b${nm}\\b`).test(x.suara)), `${lbl}: Pictorial tanpa nama benda (${x.suara})`);
  }
  cek(new Set(tipeKlik).size === 4, `${nama}: keempat jenis langkah dipakai`);
}
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah)));
  const tanya = new Set(semua.filter((l) => l.tipe === "tabel" || l.tipe === "lingkaran").map((l) => l.tanya.t));
  cek(["jumlah", "terbanyak", "tersedikit"].every((t) => tanya.has(t)), "kegiatan beragam: jumlah, terbanyak, dan tersedikit ditanyakan");
  cek(new Set(semua.map((l) => l.set)).size >= 5, "kegiatan beragam: paling sedikit lima kumpulan benda");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["pilah", "turus", "baris", "kolom", "paling banyak", "selisih", "jumlah"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.JEMBATAN + D.JEMBATAN_SUARA) && /Sub-Bab B/.test(D.JEMBATAN) && /diagram gambar/.test(D.JEMBATAN) && /disukai/.test(D.JEMBATAN), "jembatan ke Sub-Bab B: cerita yang paling disukai dan diagram gambar");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_PUSTAKA === D.CONCRETE && D.PICTORIAL_PUSTAKA === D.PICTORIAL && D.ABSTRACT_PUSTAKA === D.ABSTRACT && D.TEMA_PUSTAKA === D.TEMA_TAHAP && D.MISI_MEJA_PUSTAKA === D.MISI_MEJA, "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
  for (const s of Object.values(D.SETS)) cek(s.nama.every((n) => tanpaDigit(n) && bersih(n) && !/\b(hewan|laut|roket|bunga)\b/i.test(n)) && new Set(s.nama).size === 4 && s.emoji.every((e) => [...e].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), `kumpulan ${s.id}: nama unik, bukan jenis Story, emoji sampai U+1FA95`);
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  // Tumpukan bercampur.
  for (let n = 2; n <= 18; n += 1)
    for (const benih of [1, 2, 3, 5, 9]) {
      const p = K.letakTumpukan(n, benih);
      cek(p.length === n && p.every((t) => t.x - 14 > 4 && t.x + 14 < W - 4 && t.y - 14 > 24 && t.y + 14 < K.TURUS_TUMPUK.y - 8), `tumpukan ${n} benda (benih ${benih}) masuk kanvas dan di atas baris turus`);
      let minJ = 999;
      for (let a = 0; a < n; a += 1) for (let b = a + 1; b < n; b += 1) minJ = Math.min(minJ, jarak(p[a], p[b]));
      cek(minJ >= K.UKURAN_TUMPUK + 2 && K.JARI_TUMPUK * 2 <= minJ, `tumpukan ${n} benda (benih ${benih}): tidak bertumpuk dan jari tanda tidak melewati tetangga (jarak terdekat ${minJ.toFixed(1)})`);
    }
  // Lingkaran.
  for (const k of [3, 4]) {
    const r = K.rLingkaran(k);
    const pusat = Array.from({ length: k }, (_, j) => K.pusatLingkaran(j, k));
    cek(pusat.every((c) => c.x - r > 2 && c.x + r < W - 2 && c.y - r > 70 && c.y + r + 24 < H), `${k} lingkaran masuk kanvas, di bawah kolam benda dan memberi tempat gambar jenis`);
    cek(pusat.every((c, j) => j === 0 || c.x - pusat[j - 1].x >= 2 * r + 4), `${k} lingkaran tidak bertumpuk`);
    for (let j = 0; j < k; j += 1) for (let s = 0; s < 9; s += 1) cek(jarak(K.letakDalam(j, k, s), pusat[j]) + (k === 4 ? 7 : K.UKURAN_DALAM / 2) < r, `benda ke-${s} di lingkaran ${j} dari ${k} masuk lingkaran`);
  }
  for (let n = 2; n <= 9; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakKolam(i, n));
    cek(xs.every((t) => t.x - 12 > 2 && t.x + 12 < W - 2) && xs.every((t, i) => i === 0 || t.x - xs[i - 1].x >= 24) && xs[0].y + 14 < K.Y_LINGKARAN - K.R_LINGKARAN - 4, `kolam ${n} benda masuk kanvas, tidak bertumpuk, di atas lingkaran`);
  }
  // Pasangan.
  for (let n = 1; n <= 9; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakPasang(0, i, n));
    cek(xs.every((t) => t.x - 13 > 2 && t.x + 13 < W - 2 && t.y > 30), `${n} benda berpasangan masuk kanvas`);
    cek(n < 2 || (xs[1].x - xs[0].x >= 2 * K.JARI_PASANG && K.jarakPasang(n) >= 2 * K.JARI_PASANG), `${n} benda: jari tanda pasangan tidak melewati tetangga`);
  }
  cek(K.Y_PASANG[1] - K.Y_PASANG[0] >= K.UKURAN_PASANG + 20 && K.Y_PASANG[1] + 14 < H, "dua baris pasangan berjauhan dan masuk kanvas");
  // Tabel.
  for (let r = 0; r < 4; r += 1) cek(K.barisAtas(r) + K.TABEL.h < H - 4 && K.pusatBaris(r).y === K.barisAtas(r) + K.TABEL.h / 2 && (r === 0 || K.barisAtas(r) - K.barisAtas(r - 1) >= K.TABEL.h + 1), `baris tabel ${r} masuk kanvas dan tidak bertumpuk`);
  cek(K.barisAtas(0) >= 56, "tabel di bawah strip benda yang muncul");
  for (let n = 2; n <= 12; n += 1) {
    const xs = Array.from({ length: n }, (_, i) => K.letakKejadian(i, n));
    cek(xs.every((t) => t.x - 9 > 2 && t.x + 9 < W - 2) && xs.every((t, i) => i === 0 || t.x - xs[i - 1].x >= 17), `${n} kejadian masuk kanvas dan tidak bertumpuk`);
  }
  // Pemeriksa kanvas.
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const p = K.letakTumpukan(14, 4);
  const target = [0, 3, 5, 6, 9, 11, 12];
  const pts = target.map((i) => p[i]);
  cek(K.periksaCentang(pts.map(coret), pts, K.JARI_TUMPUK).benar && !K.periksaCentang([...pts.map(coret), coret(p[1])], pts, K.JARI_TUMPUK).benar && !K.periksaCentang(pts.slice(1).map(coret), pts, K.JARI_TUMPUK).benar, "turus: tanda hanya di benda sejenis, satu benda satu tanda");
  const pusat = [0, 1, 2].map((j) => K.pusatLingkaran(j, 3));
  cek(K.periksaLingkari([lingkar(pusat[0], 38, 40)], pusat, [true, false, false]).benar && !K.periksaLingkari([lingkar(pusat[0], 150, 60)], pusat, [true, false, false]).benar, "lingkaran: melingkari satu lingkaran");
  const barisP = [0, 1, 2].map((r) => K.pusatBaris(r));
  cek(K.periksaLingkari([lingkar(barisP[1], 120, 14)], barisP, [false, true, false]).benar && !K.periksaLingkari([lingkar(barisP[1], 120, 50)], barisP, [false, true, false]).benar, "tabel: melingkari satu baris");
  const sisaP = [4, 5, 6].map((i) => K.letakPasang(0, i, 7));
  cek(K.periksaCentang(sisaP.map(coret), sisaP, K.JARI_PASANG).benar && !K.periksaCentang(sisaP.slice(1).map(coret), sisaP, K.JARI_PASANG).benar, "pasang: tanda di benda yang tidak berpasangan");
  for (const x of [1, 7, 9, 12, 17]) sama(K.bilanganDariUcapan20(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
}

/* ------------------------------ Simulasi Meja Pilah dan usulan misi ------------------------------ */
{
  const T = D.BENDA_SIM;
  const nama = D.SETS[D.SET_SIM].nama;
  cek(T.length === 10 && new Set(T.map((x) => x.id)).size === 10 && D.URUT_MEJA.length === 10 && [...D.URUT_MEJA].sort((a, b) => a - b).join() === [...Array(10).keys()].join(), "meja: sepuluh benda unik dan urutan meja memuat semuanya");
  sama(D.JENIS_SIM.map((j) => L.banyakJenis(T, j)), [4, 2, 4], "meja: pensil empat, gunting dua, klip empat");
  cek(L.banyakJenis(T, 0) === L.banyakJenis(T, 2) && L.banyakJenis(T, 1) < L.banyakJenis(T, 0), "meja: dua jenis sama banyak dan satu lebih sedikit");
  cek(JSON.stringify(D.JENIS_SIM.map((j) => L.banyakJenis(T, j))) !== JSON.stringify([6, 4, 5, 3]), "meja: berbeda dari Story");
  cek(tanpaDigit(D.MISI_MEJA) && bersih(D.MISI_MEJA), "meja: teks misi tanpa digit");
  let k = L.awalMeja(T);
  sama([k.alat, k.mode, k.terpilah, k.dihitung.length, k.datar, k.bandingTuntas, k.tempat.every((t) => t === -1)], ["meja", "pilah", false, 0, false, 0, true], "meja: awal");
  // Pilah: hanya rak jenisnya yang menerima.
  let r = L.taruhDiRak(k, 0, 1, T);
  sama([r.ok, r.k === k], [false, true], "meja: rak jenis lain menolak dan keadaan tidak berubah");
  r = L.taruhDiRak(k, 0, 0, T);
  sama([r.ok, r.k.tempat[0], r.k.terpilah], [true, 0, false], "meja: benda masuk rak jenisnya");
  sama(L.taruhDiRak(r.k, 0, 0, T).ok, false, "meja: benda tidak dipindah dua kali");
  let rapi = k;
  for (let i = 0; i < T.length; i += 1) rapi = L.taruhDiRak(rapi, i, T[i].jenis, T).k;
  sama([rapi.terpilah, L.semuaTerpilah(rapi, T), D.JENIS_SIM.map((j) => L.banyakDiRak(rapi, T, j))], [true, true, [4, 2, 4]], "meja: semua benda rapi di rak");
  // Turus.
  sama(L.hitungRak(k, 0, T), k, "meja: rak kosong belum bisa dihitung");
  let t = L.hitungRak(r.k, 0, T);
  sama([t.dihitung, L.hitungRak(t, 0, T) === t], [[0], true], "meja: turus satu rak, tidak dihitung dua kali");
  let tt = rapi;
  for (const j of [0, 1, 2]) tt = L.hitungRak(tt, j, T);
  sama(tt.dihitung, [0, 1, 2], "meja: turus tiga rak");
  // Tabel.
  const pt = L.putarTabel(rapi);
  sama([pt.datar, pt.pernahDatar, L.putarTabel(pt).datar, L.putarTabel(pt).pernahDatar, L.lihatJumlah(rapi).jumlahDilihat], [true, true, false, true, true], "meja: tabel diputar mendatar dan kembali, tercatat pernah mendatar");
  // Banding: baru tuntas setelah rak rapi.
  let b = L.pilihBandingMeja(k, 0, T);
  sama([b.k.banding, b.hasil], [[0], null], "meja: pilih satu jenis");
  b = L.pilihBandingMeja(b.k, 1, T);
  sama([b.k.banding, b.hasil.hasil, b.hasil.lebihBanyak, b.hasil.selisih, b.hasil.tuntas, b.k.bandingTuntas], [[0, 1], "lebih", 0, 2, false, 0], "meja: pensil lebih banyak dari gunting, tetapi rak belum rapi jadi belum tuntas");
  b = L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 1, T);
  sama([b.hasil.tuntas, b.k.bandingTuntas, b.k.samaTuntas], [true, 1, 0], "meja: rak rapi, perbandingan tuntas");
  b = L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 2, T);
  sama([b.hasil.hasil, b.hasil.lebihBanyak, b.hasil.selisih, b.k.samaTuntas], ["sama", null, 0, 1], "meja: pensil dan klip sama banyak");
  sama(L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 0, T).k.banding, [], "meja: ketuk jenis yang sama membatalkan");
  sama(L.pilihBandingMeja(b.k, 1, T).k.banding, [1], "meja: pilihan ketiga memulai lagi");
  sama([L.mulaiLagiMeja(T).terpilah, L.mulaiLagiMeja(T).tempat.every((x) => x === -1)], [false, true], "meja: main lagi mereset");
  for (const mode of ["pilah", "turus", "tabel", "banding"])
    for (const st of [k, r.k, rapi, tt, pt, b.k, L.pilihBandingMeja(L.pilihBandingMeja(k, 0, T).k, 1, T).k]) {
      const kal = L.kalimatMeja(L.pilihModeMeja(st, mode), T, nama);
      cek(tanpaDigit(kal) && bersih(kal), `meja: kalimat ${mode} tanpa digit ("${kal}")`);
    }
  // Misi.
  const daftar = MB8.daftarMisiBab8("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("a-")), "misi A: id unik berawalan a-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && bersih(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  const awal = L.awalMeja(T);
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "survei" }) && !x.cek({ alat: "kerangka" })), "misi A: keadaan alat lain tidak memenuhi");
  cek(ada(rapi, "a-pilah") && !ada(awal, "a-pilah") && !ada(r.k, "a-pilah"), "misi A: pilah semua benda");
  cek(ada(tt, "a-turus") && !ada(t, "a-turus"), "misi A: turus di tiga rak");
  cek(ada(pt, "a-tabel") && !ada(L.putarTabel(awal), "a-tabel"), "misi A: putar tabel setelah rak rapi");
  cek(ada(L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 1, T).k, "a-banding") && !ada(L.pilihBandingMeja(L.pilihBandingMeja(awal, 0, T).k, 1, T).k, "a-banding"), "misi A: banding hanya dihitung setelah rak rapi");
  cek(ada(L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 2, T).k, "a-sama") && !ada(L.pilihBandingMeja(L.pilihBandingMeja(rapi, 0, T).k, 1, T).k, "a-sama"), "misi A: bandingkan dua jenis sama banyak");
  cek(ada(L.lihatJumlah(rapi), "a-jumlah") && !ada(L.lihatJumlah(awal), "a-jumlah"), "misi A: jumlah semuanya setelah rak rapi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahPustaka.tsx", "TahapPustaka.tsx", "RakLipat.tsx", "LaciKartu.tsx", "SimulasiMejaPilah.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    cek(!/buku/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa kata buku`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x) && !/&&|className|=>/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|tebak|kunci|latihan)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
  const tahap = readFileSync(new URL("TahapPustaka.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapPustaka: Abstract diakhiri Poin Penting dan jembatan (bukan perayaan akhir bab)");
  cek(/lantai/.test(tahap) && /label/.test(tahap) && /kapur/.test(tahap) && /Goresan/.test(tahap) && /Titik/.test(tahap) && /Kotak cerita/.test(tahap), "TahapPustaka: tiga pola visual (lantai bak mobil, kertas label, papan kapur) dengan kemajuan kotak, titik, goresan");
  for (const f of ["LangkahPustaka.tsx", "TahapPustaka.tsx", "SimulasiMejaPilah.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahPustaka.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahPustaka: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahPustaka: Cari kesalahan dan petunjuk yang menunjuk kesalahan");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahPustaka: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  cek(/rupa === "benda"/.test(langkah) && /SETS\[set\]\.emoji/.test(langkah) && (langkah.match(/SETS\[/g) ?? []).length >= 2, "LangkahPustaka: emoji benda dari SETS");
  const aman = [...langkah.matchAll(/SETS\[set\]\.emoji/g)].every((m) => /rupa === "benda"/.test(langkah.slice(Math.max(0, m.index - 400), m.index)));
  cek(aman, "LangkahPustaka: emoji benda hanya di rupa benda (Concrete)");
  cek(/rupa === "lambang"/.test(langkah) && (langkah.match(/rupa === "lambang"/g) ?? []).length >= 4 && /Pernyataan/.test(langkah), "LangkahPustaka: Abstract memakai kata dan angka saja");
  cek(/jenis === 0/.test(langkah) && /polygon/.test(langkah), "LangkahPustaka: Pictorial memakai bentuk polos (bulat, kotak, segitiga, belah ketupat)");
  const sim = readFileSync(new URL("SimulasiMejaPilah.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalMeja/.test(sim) && /speakGuru/.test(sim) && /Main lagi/.test(sim) && /taruhDiRak/.test(sim) && /hitungRak/.test(sim) && /putarTabel/.test(sim) && /pilihBandingMeja/.test(sim), "SimulasiMejaPilah: melaporkan keadaan dan memuat empat alat");
  for (const f of ["RakLipat.tsx", "LaciKartu.tsx", "SimulasiMejaPilah.tsx", "TahapPustaka.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const lc = readFileSync(new URL("LaciKartu.tsx", folderUrl), "utf8");
  cek(/BARIS_LACI\[baris\]\.nama/.test(lc) && /barisnya keliru/.test(lc), "LaciKartu: petunjuk salah menyebut kartu yang keliru");
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab8.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiMejaPilah") && /sub === "A"/.test(ms), "SimulasiBab8: Sub-Bab A memakai Meja Pilah");
  /* Soal lambang (Abstract) harus langsung siap dijawab di tiap kegiatan, atau soal klik, kanvas, dan suara macet tanpa kotak jawaban. */
  const lp = readFileSync(new URL("LangkahPustaka.tsx", folderUrl), "utf8");
  const siapLangsung = lp.match(/useSiapLangsung\(.*\);/g) ?? [];
  cek(siapLangsung.length === 4 && siapLangsung.every((x) => x.includes("lambang") || x.includes("l.angka")), "LangkahPustaka: tiap kegiatan (Turus, Lingkaran, Pasang, Tabel) siap dijawab pada rupa lambang");
  cek(!/benda/.test(L.sesuaikan("Ketuk benda dulu", "diagram")) && !/benda/.test(L.sesuaikan("Ketuk benda dulu", "lambang")) && L.sesuaikan("Ketuk benda dulu", "benda").includes("benda"), "sesuaikan: Pictorial dan Abstract tanpa kata benda");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
