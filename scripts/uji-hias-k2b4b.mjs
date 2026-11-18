// Uji Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah: tahap Concrete, Pictorial, Abstract; Mind-map (Pita Hias),
// Infografis (Lembar Hiasan), dan Simulasi Meja Rangkai.
// Memeriksa: dua belas tugas per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan di tiap tahap, kunci dihitung dari data, jenis jawaban
// (kata, satu angka, mengisi kotak, menyusun kartu huruf, melanjutkan irama, pola atau bukan), angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol Periksa macet di Abstract), data pola yang sah, pengenal ucapan, logika simulasi dan misi, Mind-map, Infografis, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-hias-k2b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/hias-k2b4b/logika-cpa.ts");
const D = await import("../src/components/modul/hias-k2b4b/data.ts");
const DP = await import("../src/components/modul/hias-k2b4b/data-peta.ts");
const K = await import("../src/components/modul/hias-k2b4b/periksa.ts");
const G = await import("../src/components/modul/hias-k2b4b/logika.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab4.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/hias-k2b4b/", import.meta.url);

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
const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)/i;
const SURUH = /bawalah|bawa benda|gambarlah|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
const TAHAP = { concrete: [D.CONCRETE_HIAS, "benda"], pictorial: [D.PICTORIAL_HIAS, "diagram"], abstract: [D.ABSTRACT_HIAS, "lambang"] };
const semuaLangkah = [];
for (const [nama, [soal, rupa]] of Object.entries(TAHAP)) for (const so of soal) for (const ls of so.langkah) semuaLangkah.push({ tahap: nama, rupa, cara: so.cara, so, ls, l: ls.langkah });

/* ------------------------------ Struktur ------------------------------ */
sama(D.CONCRETE_HIAS.map((s) => s.nomor).concat(D.PICTORIAL_HIAS.map((s) => s.nomor), D.ABSTRACT_HIAS.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari Simulasi");
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara berurutan`);
  cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat metode per cara (dua belas tugas)`);
  for (const so of soal) sama(so.langkah.map((x) => x.metode), ["igil", "pita", "kode", "tepuk"], `${nama}/${so.nomor}: urutan metode`);
  for (const so of soal) cek(so.langkah.every((x) => x.cara === so.cara && x.suara === x.judul && x.suara.length > 20), `${nama}/${so.nomor}: cara, suara, dan judul`);
  const salah = soal.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1, `${nama}: paling sedikit satu Cari kesalahan (ada ${salah.length})`);
  for (const x of salah) {
    const l = x.langkah;
    cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3 && l.keliru.length > 20 && l.kataTokoh.length > 10, `${nama}: cari kesalahan lengkap (${l.tokoh})`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut.indexOf(l.benar) !== 0, `${nama}: alasan benar bukan tombol pertama (${l.tokoh})`);
    cek(["Chacha", "Dika", "Nia"].includes(l.tokoh), `${nama}: tokoh Cari kesalahan`);
    const kk = L.kunciJawab(l, "klik");
    cek(l.betul ? l.jawabTokoh === undefined : kk === null ? l.jawabTokoh === undefined : l.jawabTokoh !== undefined && l.jawabTokoh !== kk.kata, `${nama}: jawaban tokoh ${l.tokoh} keliru bila ada jawaban kata`);
  }
}
{
  const s = (t, i, j) => D[t][i].langkah[j].langkah;
  const c = s("CONCRETE_HIAS", 0, 0);
  cek(c.tipe === "salah" && c.dasar.tipe === "satuan" && c.tokoh === "Chacha" && c.jawabTokoh === "ungu" && L.kunciJawab(c, "klik").kata === "hijau", "Concrete: Chacha melanjutkan ungu ungu hijau dengan ungu (berikutnya hijau)");
  const p = s("PICTORIAL_HIAS", 0, 0);
  cek(p.tipe === "salah" && p.dasar.tipe === "bukan" && p.tokoh === "Nia" && L.kunciJawab(p, "klik").kata === "bukan pola" && p.jawabTokoh === "pola", "Pictorial: Nia mengira barisan segitiga semua sama adalah pola");
  const a = s("ABSTRACT_HIAS", 0, 2);
  cek(a.tipe === "salah" && a.dasar.tipe === "kode" && a.tokoh === "Chacha" && L.kodeSatuan(a.dasar).join("") === "AAB", "Abstract: Chacha salah menulis kode satuan kuning kuning ungu (benar A A B)");
}

/* ------------------------------ Kunci dan jenis jawaban ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const d = L.dasarDari(l);
  const kunci = L.kunciJawab(l, cara);
  const nama = `${tahap}/${cara}/${d.tipe}`;
  cek(L.metodeLangkah(l) === ls.metode, `${nama}: metode sesuai`);
  if (cara === "klik") {
    if (d.tipe === "satuan" || d.tipe === "bukan") cek(kunci?.jenis === "kata" && L.pilihanKata(l).includes(kunci.kata) && L.pilihanKata(l).length >= 2, `${nama}: Klik memilih kata dari pilihan`);
    else cek(kunci === null, `${nama}: Klik mengisi, menyusun kartu, atau melanjutkan irama, tanpa jawaban lagi`);
  } else if (cara === "kanvas") {
    cek(kunci?.jenis === "angka" && Number.isInteger(kunci.n) && kunci.n >= 1 && kunci.n <= 9, `${nama}: Tulis di kanvas = satu angka`);
  } else {
    cek(kunci?.jenis === "kata" && L.SEMUA_KATA.includes(kunci.kata), `${nama}: Suara = satu kata`);
  }
  // Jebakan: tugas yang langsung siap harus punya jawaban; kegiatan hanya untuk jenis yang punya kegiatan, aktif di semua rupa termasuk lambang.
  const langsung = L.siapLangsung(l, rupa, cara);
  if (langsung) cek(kunci !== null, `${nama}: tugas langsung siap punya jawaban (tombol Periksa aktif)`);
  if (cara !== "klik") cek(langsung, `${nama}: kanvas dan suara langsung siap`);
  if (cara === "klik" && l.tipe !== "salah") cek(langsung === (d.tipe === "satuan" || d.tipe === "bukan"), `${nama}: hanya memilih unsur dan pola atau bukan yang langsung siap`);
  if (l.tipe === "salah") cek(!langsung, `${nama}: Cari kesalahan selalu memakai kegiatan`);
  for (const r of ["benda", "diagram", "lambang"]) if (cara === "klik" && l.tipe !== "salah") cek(L.siapLangsung(l, r, cara) === langsung, `${nama}: siap langsung sama di semua rupa (${r})`);
  // Kegiatan memiliki urutan jawaban yang bisa dihitung.
  if (d.tipe === "pita") cek(L.unsurIsi(d).length === d.kosong && d.kosong >= 2, `${nama}: kotak kosong diisi sesuai satuan`);
  if (d.tipe === "tepuk") cek(L.unsurIsi(d).length === d.lanjut, `${nama}: irama dilanjutkan sebanyak ${d.lanjut}`);
  if (d.tipe === "kode") cek(L.kodeSatuan(d).length === d.unit.length && L.kodeSatuan(d)[0] === "A", `${nama}: kode satu satuan dimulai A`);
}
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  const kanvas = soal[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n);
  cek(new Set(kanvas).size === 4, `${nama}: empat angka jawaban kanvas tidak kembar (${kanvas.join(", ")})`);
  const suara = soal[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara").kata);
  cek(new Set(suara).size === 4, `${nama}: empat kata jawaban suara tidak kembar (${suara.join(", ")})`);
  cek(!suara.includes("biru"), `${nama}: jawaban suara bukan data Story (biru)`);
}
sama(D.CONCRETE_HIAS[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [4, 3, 6, 5], "angka kanvas Concrete");
sama(D.PICTORIAL_HIAS[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [3, 4, 5, 2], "angka kanvas Pictorial");
sama(D.ABSTRACT_HIAS[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [2, 5, 6, 3], "angka kanvas Abstract");
sama(D.CONCRETE_HIAS[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara").kata), ["hijau", "ungu", "daun", "diam"], "kata suara Concrete");
sama(D.PICTORIAL_HIAS[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara").kata), ["putih", "kotak", "segitiga", "diam"], "kata suara Pictorial");
sama(D.ABSTRACT_HIAS[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara").kata), ["hijau", "merah", "bintang", "keras"], "kata suara Abstract");
// Posisi kunci pada pilihan tidak selalu sama, dan pilihan memuat jawaban tokoh.
{
  const posisi = semuaLangkah.filter((x) => x.cara === "klik" && L.kunciJawab(x.l, "klik")?.jenis === "kata").map((x) => L.pilihanKata(x.l).indexOf(L.kunciJawab(x.l, "klik").kata));
  cek(posisi.length >= 3, `ada tugas Klik dengan pilihan kata (${posisi.length})`);
  for (const x of semuaLangkah.filter((y) => y.l.tipe === "salah" && y.l.jawabTokoh)) cek(L.pilihanKata(x.l).includes(x.l.jawabTokoh), `pilihan memuat jawaban tokoh ${x.l.jawabTokoh}`);
  const suaraPos = semuaLangkah.filter((x) => x.cara === "suara").map((x) => L.pilihanKata(x.l).indexOf(L.kunciJawab(x.l, "suara").kata));
  cek(new Set(suaraPos).size >= 2, `jawaban benar tidak selalu di pilihan yang sama (${suaraPos.join(",")})`);
  cek(suaraPos.every((i) => i >= 0), "pilihan cadangan suara memuat kata yang benar");
}

/* ------------------------------ Data pola ------------------------------ */
const STORY = [["merah", "biru"], ["jingga", "jingga", "biru"], ["bintang", "bulat"], ["daun", "daun", "bunga"], ["hijau", "kuning", "kuning"], ["keras", "pelan"], ["keras", "pelan", "pelan"]];
for (const { tahap, l, cara } of semuaLangkah) {
  const d = L.dasarDari(l);
  const n = `${tahap}/${cara}/${d.tipe}`;
  if (d.tipe === "bukan") {
    cek(d.barisan.length >= 4 && d.barisan.length <= 10 && !L.adalahPola(d.barisan), `${n}: susunan yang bukan pola`);
    continue;
  }
  cek(d.unit.length >= 2 && d.unit.length <= 4 && new Set(d.unit).size >= 2, `${n}: satuan dua sampai empat unsur dengan paling sedikit dua unsur berbeda`);
  cek(d.ulang >= 2 && L.barisan(d).length <= 10, `${n}: satuan berulang paling sedikit dua kali, barisan paling panjang sepuluh (${L.barisan(d).length})`);
  cek(L.satuanPola(L.barisan(d)) === d.unit.length || (d.tipe === "pita" && L.satuanPola(L.barisan(d)) !== null), `${n}: barisan memang berpola dengan satuan yang diberikan`);
  cek(!STORY.some((u) => JSON.stringify(u) === JSON.stringify(d.unit)), `${n}: satuan bukan data Story`);
  if (d.tipe === "satuan" || d.tipe === "kode" || d.tipe === "tepuk") cek(d.sisa >= 0 && d.sisa < d.unit.length, `${n}: sisa kurang dari satuan`);
  if (d.tipe === "pita") cek(d.kosong >= 2 && d.kosong <= 3 && d.kosong < d.unit.length * d.ulang, `${n}: dua sampai tiga kotak kosong`);
  if (d.tipe === "kode") cek(new Set(d.unit).size === 2, `${n}: kode hanya dua jenis unsur`);
  if (d.tipe === "tepuk") cek(d.unit.every((u) => L.DAFTAR_BUNYI.includes(u)) && d.unit.includes(d.hitung) && d.lanjut === 3, `${n}: irama dari bunyi, yang dihitung ada dalam satuan`);
  else cek(d.unit.every((u) => !L.DAFTAR_BUNYI.includes(u)), `${n}: unsur bukan bunyi`);
  const jenis = new Set(d.unit.map(L.jenisUnsur));
  cek(jenis.size === 1, `${n}: satuan satu jenis unsur`);
}
// Batas rupa pada data: Concrete tanpa bentuk polos, Pictorial tanpa bentuk benda beremoji.
for (const { tahap, l } of semuaLangkah) {
  const d = L.dasarDari(l);
  const unit = d.tipe === "bukan" ? d.barisan : d.unit;
  if (tahap === "concrete") cek(unit.every((u) => L.jenisUnsur(u) !== "polos"), `concrete: unsur berupa benda, warna, atau bunyi (${unit.join(",")})`);
  if (tahap === "pictorial") cek(unit.every((u) => L.jenisUnsur(u) !== "benda"), `pictorial: unsur polos tanpa benda beremoji (${unit.join(",")})`);
}
{
  const per = { warna: 0, benda: 0, polos: 0, bunyi: 0 };
  for (const { l } of semuaLangkah) {
    const d = L.dasarDari(l);
    for (const u of d.tipe === "bukan" ? d.barisan : d.unit) per[L.jenisUnsur(u)] += 1;
  }
  cek(per.warna > 0 && per.benda > 0 && per.polos > 0 && per.bunyi > 0, "data memuat pola warna, bentuk benda, bentuk polos, dan bunyi");
}

/* ------------------------------ Hitungan dasar ------------------------------ */
sama([L.satuanPola(["a", "b", "a", "b"]), L.satuanPola(["a", "b", "a", "b", "a"]), L.satuanPola(["a", "a", "b", "a", "a", "b", "a"]), L.satuanPola(["a", "a", "a", "a"]), L.satuanPola(["a", "b", "b", "a", "b"]), L.satuanPola(["a", "b"]), L.satuanPola(["a", "b", "c", "a", "b", "c"])], [2, 2, 3, null, null, null, 3], "satuan pola");
cek(L.adalahPola(["x", "y", "x", "y"]) && !L.adalahPola(["x", "x", "x", "x"]) && !L.adalahPola(["x", "y", "y", "x", "y", "x"]), "pola atau bukan");
{
  const b = { tipe: "satuan", unit: ["a", "b", "c"], ulang: 2, sisa: 1 };
  sama([L.barisan(b).join(""), L.unsurBerikut(b)], ["abcabca", "b"], "barisan dan unsur berikutnya");
  const pi = { tipe: "pita", unit: ["a", "b"], ulang: 3, kosong: 3 };
  sama([L.barisan(pi).join(""), L.banyakTampak(pi), L.unsurIsi(pi).join(""), L.unsurBerikut(pi)], ["ababab", 3, "bab", "b"], "pita: kotak kosong");
  const kd = { tipe: "kode", unit: ["x", "x", "y"], ulang: 2, sisa: 0 };
  sama([L.kodeSatuan(kd).join(""), L.unsurB(kd), L.kunciJawab(kd, "kanvas").n], ["AAB", "y", 2], "kode huruf");
  const tp = { tipe: "tepuk", unit: ["keras", "pelan", "pelan"], ulang: 2, sisa: 1, lanjut: 3, hitung: "pelan" };
  sama([L.kunciJawab(tp, "kanvas").n, L.kunciJawab(tp, "suara").kata, L.unsurIsi(tp).join()], [4, "pelan", "pelan,pelan,keras"], "tepuk irama");
  sama(L.kunciJawab({ tipe: "bukan", barisan: ["a", "a", "a", "a"] }, "klik"), { jenis: "kata", kata: "bukan pola" }, "bukan pola");
  sama(L.pilihanKataDari({ tipe: "bukan", barisan: ["a", "b"] }), ["pola", "bukan pola"], "pilihan pola atau bukan");
  sama(L.pilihanKataDari({ tipe: "satuan", unit: ["ungu", "hijau"], ulang: 2, sisa: 0 }), ["hijau", "ungu", "kuning", "putih"], "pilihan kata mengikuti urutan daftar");
  cek(L.pilihanKataDari({ tipe: "satuan", unit: ["keras", "pelan"], ulang: 2, sisa: 0 }).length === 3, "pilihan bunyi hanya tiga");
  cek(L.pilihanIsi({ tipe: "pita", unit: ["ungu", "hijau"], ulang: 3, kosong: 2 }).length === 4 && L.pilihanIsi({ tipe: "tepuk", unit: ["keras", "pelan"], ulang: 2, sisa: 0, lanjut: 3, hitung: "keras" }).length === 2, "pilihan mengisi: satuan ditambah pengecoh");
}

/* ------------------------------ Teks: tanpa digit di suara, kata terlarang, emoji ------------------------------ */
{
  const emojiBatas = (s) => ![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de);
  for (const { tahap, rupa, so, ls, l } of semuaLangkah) {
    const layar = [so.judul, so.cerita, ls.judul, ls.suara, ...(l.tipe === "salah" ? [l.kataTokoh, l.keliru, ...l.alasan] : [])].join(" ");
    cek(!/\d/.test(ls.suara) && !/\d/.test(so.cerita) && !/\d/.test(so.judul.replace(/\d+$/, "").replace(/ \d+:/, ":")), `${tahap}/${so.nomor}: suara dan cerita tanpa digit`);
    cek(!TERLARANG.test(layar), `${tahap}/${so.nomor}: tanpa kata terlarang`);
    cek(!SURUH.test(layar), `${tahap}/${so.nomor}: tanpa suruhan membawa benda atau bermain bersama`);
    cek(emojiBatas(layar), `${tahap}/${so.nomor}: emoji paling tinggi U+1FA95`);
    if (rupa !== "benda") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(layar), `${tahap}/${so.nomor}: tanpa emoji di teks tugas ${rupa}`);
    cek(!/tebak|kelompokkan/i.test(layar), `${tahap}/${so.nomor}: tanpa tebak dan kelompokkan`);
  }
  const tetap = [...D.POIN_PENTING, D.PENUTUP_B, D.SPANDUK, ...Object.values(D.TEMA_HIAS).map((t) => t.cara), DP.MISI_HIAS_TEKS].join(" ");
  cek(!TERLARANG.test(tetap) && emojiBatas(tetap + Object.values(D.TEMA_HIAS).map((t) => t.ikon).join("")), "poin penting, penutup, tema, dan misi: kata terlarang dan emoji");
  cek(!/\d/.test(D.POIN_PENTING_SUARA.join(" ")) && !/\d/.test(D.PENUTUP_B) && !/\d/.test(DP.MISI_HIAS_TEKS), "suara poin penting, penutup, dan misi tanpa digit");
  cek(D.POIN_PENTING.length === 6 && /satuan/.test(D.POIN_PENTING.join(" ")) && /bukan pola/.test(D.POIN_PENTING.join(" ")), "poin penting memuat satuan dan bukan pola");
  cek(D.SPANDUK === "PAMERAN DIBUKA" && /Bu Mira/.test(D.PENUTUP_B), "spanduk perayaan akhir cerita bab");
  // Instruksi tiap jenis dan cara tanpa digit.
  for (const { rupa, cara, l } of semuaLangkah) cek(!/\d/.test(L.instruksi(l, rupa, cara)) && !/\d/.test(L.kalimatKunci(l, cara)) && !/\d/.test(L.kalimatTanya(l, cara)), `instruksi dan kalimat kunci tanpa digit (${l.tipe}/${cara}/${rupa})`);
  for (const { rupa, cara, l } of semuaLangkah) cek(!TERLARANG.test(L.instruksi(l, rupa, cara) + L.kalimatKunci(l, cara) + L.kalimatTanya(l, cara)), `instruksi tanpa kata terlarang (${l.tipe}/${cara}/${rupa})`);
  // Petunjuk salah tanpa digit dan menunjuk kesalahan.
  for (const { l, cara } of semuaLangkah) {
    const k = L.kunciJawab(l, cara);
    if (!k) continue;
    for (const j of cara === "kanvas" ? [1, 9] : ["merah", "pola", "bukan pola", "keras"]) {
      const p = L.petunjukSalah(l, cara, j);
      cek(p.length > 25 && !/\d/.test(p) && !TERLARANG.test(p), `petunjuk salah tanpa digit (${l.tipe}/${cara}/${j})`);
    }
  }
  cek(L.petunjukSalah(D.CONCRETE_HIAS[0].langkah[0].langkah, "klik", "ungu").startsWith("Itu jawaban Chacha yang keliru."), "petunjuk salah menyebut jawaban tokoh yang keliru");
  cek(!L.petunjukSalah(D.CONCRETE_HIAS[0].langkah[0].langkah, "klik", "biru").startsWith("Itu jawaban Chacha"), "petunjuk salah lain bukan jawaban tokoh");
  for (const l of [{ tipe: "pita", unit: ["a", "b"], ulang: 3, kosong: 2 }, { tipe: "tepuk", unit: ["keras", "pelan"], ulang: 3, sisa: 0, lanjut: 3, hitung: "keras" }]) for (const [p, t] of [["b", "b"], ["a", "b"]]) {
    const h = L.petunjukIsi(l, p, t);
    cek(h.length > 25 && !/\d/.test(h) && !TERLARANG.test(h), `petunjuk mengisi (${l.tipe}/${p})`);
  }
  const hk = L.petunjukKode({ tipe: "kode", unit: ["x", "y"], ulang: 2, sisa: 0 }, 1);
  cek(hk.length > 25 && !/\d/.test(hk) && /huruf/.test(hk), "petunjuk kartu kode huruf");
}

/* ------------------------------ Tata letak ------------------------------ */
{
  for (let n = 2; n <= 10; n += 1) {
    const t = K.tataBaris(n);
    cek(t.s >= 20 && t.x0 - t.s / 2 >= 4 && t.x0 + t.d * (n - 1) + t.s / 2 <= 296, `baris ${n} kotak masuk kanvas (s=${t.s}, x0=${t.x0})`);
    for (let i = 0; i < n; i += 1) cek(K.pusatKotak(i, n, 96).x > 10 && K.pusatKotak(i, n, 96).x < 290, `kotak ${i}/${n} masuk kanvas`);
  }
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const kt = (t) => K.kataDariUcapan(t);
  sama(kt("ungu"), ["ungu"], "ucapan ungu");
  sama(kt("warnanya hijau"), ["hijau"], "ucapan dalam kalimat");
  sama(kt("Oranye"), ["jingga"], "ucapan oranye adalah jingga");
  sama(kt("segi tiga"), ["segitiga"], "ucapan segi tiga");
  sama(kt("persegi"), ["kotak"], "ucapan persegi adalah kotak");
  sama(kt("lingkaran"), ["bulat"], "ucapan lingkaran adalah bulat");
  sama(kt("keras"), ["keras"], "ucapan keras");
  sama(kt("pelan"), ["pelan"], "ucapan pelan");
  sama(kt("hening"), ["diam"], "ucapan hening adalah diam");
  sama(kt("bukan pola"), ["bukan pola"], "ucapan bukan pola");
  sama(kt("ini pola"), ["pola"], "ucapan pola");
  sama(kt("kucing"), [], "ucapan lain tidak dikenali");
  sama(K.angkaDariUcapan("Tujuh, eh delapan 3"), [7, 8, 3], "angka dari ucapan");
  sama(K.angkaDariUcapan("sembilan dan sembilan"), [9], "angka tanpa kembar");
  const kn = (k) => ({ jenis: "kata", kata: k });
  cek(K.cocokUcapan("ungu", kn("ungu")).cocok && K.cocokUcapan("ya ungu", kn("ungu")).cocok, "cocok: kata sama");
  cek(!K.cocokUcapan("hijau", kn("ungu")).cocok && !K.cocokUcapan("biru", kn("ungu")).cocok, "tidak cocok: kata lain");
  cek(K.cocokUcapan("bukan pola", kn("bukan pola")).cocok && !K.cocokUcapan("bukan pola", kn("pola")).cocok && K.cocokUcapan("pola", kn("pola")).cocok, "cocok: pola dan bukan pola tidak tertukar");
  cek(K.cocokUcapan("lima", { jenis: "angka", n: 5 }).cocok && K.cocokUcapan("5", { jenis: "angka", n: 5 }).cocok && !K.cocokUcapan("enam", { jenis: "angka", n: 5 }).cocok, "cocok: kunci angka");
  sama(K.cocokUcapan("hijau", kn("ungu")).terdengar, ["hijau"], "terdengar kata");
  sama(K.cocokUcapan("tiga", kn("ungu")).terdengar, ["3"], "terdengar angka");
  for (const { l, cara } of semuaLangkah.filter((x) => x.cara === "suara")) {
    const k = L.kunciJawab(l, cara);
    cek(K.cocokUcapan(k.kata, k).cocok, `kunci suara ${k.kata} dikenali dari ucapannya`);
  }
  for (const w of L.SEMUA_KATA) cek(K.kataDariUcapan(w).includes(w), `kata ${w} dikenali dari ucapannya sendiri`);
}

/* ------------------------------ Simulasi: logika Meja Rangkai ------------------------------ */
{
  const a = G.awalMeja();
  sama([a.alat, a.mode, a.rangkai, a.irama, a.polaPita, a.polaIrama, a.kartu, a.diputuskan, a.satuanDitandai, a.dilanjut], ["meja", "rangkai", [], [], [], [], -1, [], [], []], "keadaan awal");
  cek(JSON.stringify(G.mulaiLagiMeja()) === JSON.stringify(a), "mulai lagi = keadaan awal");
  cek(G.pilihModeMeja(a, "irama").mode === "irama" && G.pilihModeMeja(a, "rangkai") === a, "pilih alat");
  // Rangkai
  let k = a;
  for (const w of ["ungu", "hijau", "ungu"]) k = G.pasangManik(k, w).k;
  sama(k.rangkai, ["ungu", "hijau", "ungu"], "pasang manik berurutan");
  cek(!G.periksaPita(k).ok && G.periksaPita(k).k === k, "terlalu pendek belum bisa diperiksa");
  k = G.pasangManik(k, "hijau").k;
  let r = G.periksaPita(k);
  cek(r.ok && r.pola && r.satuan === 2 && r.k.polaPita.length === 1 && r.k.polaPita[0] === "ungu-hijau", "ungu hijau ungu hijau adalah pola dengan satuan dua");
  cek(G.periksaPita(r.k).k.polaPita.length === 1, "pola yang sama tidak dicatat dua kali");
  k = G.kosongkanPita(r.k);
  sama(k.rangkai, [], "kosongkan pita");
  cek(k.polaPita.length === 1, "pola yang sudah dinyatakan tetap tercatat");
  for (const w of ["kuning", "kuning", "kuning", "kuning"]) k = G.pasangManik(k, w).k;
  r = G.periksaPita(k);
  cek(r.ok && !r.pola && r.k.polaPita.length === 1, "semuanya sama bukan pola");
  cek(/sama/.test(G.alasanBukanPola(k.rangkai)) && /pendek/.test(G.alasanBukanPola(["a", "b"])) && /satuan/.test(G.alasanBukanPola(["a", "b", "b", "a", "b"])), "alasan bukan pola menunjuk sebabnya");
  k = G.kosongkanPita(k);
  for (const w of ["ungu", "hijau", "hijau", "ungu", "hijau", "ungu"]) k = G.pasangManik(k, w).k;
  cek(G.periksaPita(k).ok && !G.periksaPita(k).pola, "susunan acak bukan pola");
  k = G.kosongkanPita(k);
  for (let i = 0; i < G.PANJANG_PITA; i += 1) k = G.pasangManik(k, i % 2 ? "kuning" : "cokelat").k;
  cek(k.rangkai.length === 8 && !G.pasangManik(k, "ungu").ok && G.pasangManik(k, "ungu").perlu === "penuh", "pita penuh paling panjang delapan");
  cek(G.lepasManik(k).k.rangkai.length === 7 && !G.lepasManik(G.awalMeja()).ok, "lepas satu manik");
  r = G.periksaPita(k);
  cek(r.pola && r.satuan === 2 && r.k.polaPita.includes("cokelat-kuning"), "pita cokelat kuning penuh adalah pola");
  // Irama
  let m = G.awalMeja();
  for (const b of ["keras", "pelan", "pelan", "keras", "pelan", "pelan"]) m = G.ketukIrama(m, b).k;
  const ri = G.periksaIrama(m);
  cek(ri.ok && ri.pola && ri.satuan === 3 && ri.k.polaIrama[0] === "keras-pelan-pelan", "irama keras pelan pelan berulang adalah pola");
  cek(!G.periksaIrama(G.ketukIrama(G.awalMeja(), "keras").k).ok, "irama pendek belum diperiksa");
  m = G.kosongkanIrama(m);
  for (const b of ["keras", "keras", "keras", "keras"]) m = G.ketukIrama(m, b).k;
  cek(G.periksaIrama(m).ok && !G.periksaIrama(m).pola, "irama semuanya keras bukan pola");
  m = G.kosongkanIrama(m);
  for (const b of ["keras", "diam", "keras", "diam"]) m = G.ketukIrama(m, b).k;
  cek(G.periksaIrama(m).pola, "keras diam berulang adalah pola (diam termasuk unsur)");
  for (let i = 0; i < 6; i += 1) m = G.ketukIrama(m, "pelan").k;
  cek(m.irama.length === 8 && !G.ketukIrama(m, "keras").ok && G.lepasIrama(m).k.irama.length === 7 && !G.lepasIrama(G.awalMeja()).ok, "irama paling panjang delapan");
  // Kartu periksa
  sama(G.KARTU_PITA.map((c) => G.satuanPola(c.unsur)), [2, null, 3, null, 3, 4], "satuan tiap kartu pita");
  sama(G.KARTU_PITA.map((c) => G.unsurBerikutMeja(c.unsur)), ["ungu", null, "ungu", null, "hijau", "ungu"], "unsur berikutnya tiap kartu");
  cek(G.KARTU_PITA.every((c) => c.unsur.length >= 6 && c.unsur.length <= 8 && c.unsur.every((u) => G.WARNA_MEJA.includes(u))), "kartu pita memakai warna manik meja");
  cek(G.KARTU_PITA.filter((c) => G.adalahPola(c.unsur)).length === 4 && G.KARTU_PITA.filter((c) => !G.adalahPola(c.unsur)).length === 2, "empat kartu berpola, dua bukan pola");
  cek(!G.putuskanKartu(G.awalMeja(), true).ok && G.putuskanKartu(G.awalMeja(), true).perlu === "pilih", "putuskan butuh kartu terpilih");
  let p = G.pilihKartu(G.awalMeja(), 0);
  cek(p.kartu === 0 && G.pilihKartu(p, 99) === p, "pilih kartu");
  cek(G.putuskanKartu(p, true).ok && G.putuskanKartu(p, true).k.diputuskan.join() === "0", "kartu kalung adalah pola: benar");
  cek(!G.putuskanKartu(p, false).ok && G.putuskanKartu(p, false).k.salahPeriksa === 1 && G.putuskanKartu(p, false).perlu === "keliru", "kartu kalung bukan pola: salah, dicatat untuk petunjuk");
  p = G.pilihKartu(p, 1);
  cek(G.putuskanKartu(p, false).ok && !G.putuskanKartu(p, true).ok, "kartu gelang bukan pola");
  p = G.pilihKartu(p, 3);
  cek(G.putuskanKartu(p, false).ok && !G.tandaiSatuan(p, 2).ok && !G.lanjutkanKartu(p, "kuning").ok, "kartu taplak acak: tidak ada satuan dan tidak bisa dilanjutkan");
  p = G.pilihKartu(p, 2);
  cek(!G.tandaiSatuan(p, 2).ok && G.tandaiSatuan(p, 3).ok && G.tandaiSatuan(p, 3).k.satuanDitandai.join() === "2", "satuan bando tiga kotak");
  cek(!G.lanjutkanKartu(p, "cokelat").ok && G.lanjutkanKartu(p, "ungu").ok && G.lanjutkanKartu(p, "ungu").k.dilanjut.join() === "2", "bando dilanjutkan dengan ungu");
  p = G.pilihKartu(p, 4);
  cek(G.lanjutkanKartu(p, "hijau").ok && !G.lanjutkanKartu(p, "ungu").ok, "tirai dilanjutkan dengan hijau");
  p = G.pilihKartu(p, 5);
  cek(G.tandaiSatuan(p, 4).ok && !G.tandaiSatuan(p, 2).ok, "satuan ikat pinggang empat kotak");
  for (const aksi of ["putus", "satuan", "lanjut"]) for (const i of [0, 1, 3]) {
    const t = G.petunjukKartuKeliru(G.pilihKartu(G.awalMeja(), i), aksi);
    cek(t.length > 25 && !/\d/.test(t) && !TERLARANG.test(t), `petunjuk kartu ${i}/${aksi} tanpa digit`);
  }
  cek(!/\d/.test(G.petunjukKartuKeliru(G.awalMeja(), "putus")), "petunjuk tanpa kartu terpilih tanpa digit");
  for (const t of [G.kalimatMeja(G.awalMeja()), G.kalimatMeja(G.pilihModeMeja(G.awalMeja(), "irama")), G.kalimatMeja(G.pilihModeMeja(G.awalMeja(), "periksa")), G.kalimatMeja(G.pilihKartu(G.pilihModeMeja(G.awalMeja(), "periksa"), 2)), G.kalimatMeja({ ...G.awalMeja(), rangkai: ["ungu", "hijau", "ungu"] }), G.kalimatMeja({ ...G.pilihModeMeja(G.awalMeja(), "irama"), irama: ["keras", "pelan"] })])
    cek(t.length > 15 && !/\d/.test(t) && !TERLARANG.test(t), `kalimat simulasi tanpa digit (${t.slice(0, 24)})`);
  sama([G.kata(1), G.kata(5), G.kata(8)], ["satu", "lima", "delapan"], "kata bilangan");
}

/* ------------------------------ Misi ------------------------------ */
{
  const daftar = MK.MISI_B;
  const awal = G.awalMeja();
  const kosong = new Set();
  cek(MK.daftarMisiK2Bab4("B") === daftar && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && daftar.every((m) => m.id.startsWith("b-")), "k2bab4 B: empat wajib, dua bebas, id berawalan b-");
  cek(daftar.every((m) => !/\d/.test(m.teks) && !TERLARANG.test(m.teks) && m.teks.length >= 10 && m.teks.length <= 120), "k2bab4 B: teks misi tanpa digit dan kata terlarang, 10 sampai 120 huruf");
  cek(S.misiBaru(daftar, awal, kosong).length === 0, "k2bab4 B: keadaan awal tidak memenuhi misi");
  cek(daftar.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "rak" })), "k2bab4 B: alat lain tidak memenuhi misi");
  const baru = (o) => S.misiBaru(daftar, { ...awal, ...o }, kosong);
  sama(baru({ polaPita: ["ungu-hijau"] }), ["b-rangkai"], "misi: rangkai pita berpola");
  sama(baru({ polaIrama: ["keras-pelan"] }), ["b-irama"], "misi: irama berpola");
  sama(baru({ diputuskan: [0] }), [], "misi: satu kartu belum cukup");
  sama(baru({ diputuskan: [0, 1] }), ["b-putus"], "misi: dua kartu diputuskan");
  sama(baru({ satuanDitandai: [2] }), ["b-satuan"], "misi: satuan ditandai");
  sama(baru({ dilanjut: [4] }), ["b-lanjut"], "misi bebas: melanjutkan kartu");
  sama(baru({ polaPita: ["ungu-hijau", "kuning-cokelat"] }), ["b-rangkai", "b-dua"], "misi bebas: dua pola pita berbeda");
  cek(S.wajibSelesai(daftar, new Set(["b-rangkai", "b-irama", "b-putus", "b-satuan"])) && !S.wajibSelesai(daftar, new Set(["b-rangkai", "b-irama", "b-putus"])), "gerbang: empat misi wajib");
  // Keadaan nyata dari logika memenuhi misi.
  let k = awal;
  for (const w of ["ungu", "hijau", "ungu", "hijau"]) k = G.pasangManik(k, w).k;
  k = G.periksaPita(k).k;
  k = G.pilihKartu(k, 0);
  k = G.putuskanKartu(k, true).k;
  k = G.pilihKartu(k, 1);
  k = G.putuskanKartu(k, false).k;
  k = G.pilihKartu(k, 2);
  k = G.tandaiSatuan(k, 3).k;
  k = G.lanjutkanKartu(k, "ungu").k;
  for (const b of ["keras", "pelan", "keras", "pelan"]) k = G.ketukIrama(k, b).k;
  k = G.periksaIrama(k).k;
  sama(S.misiBaru(daftar, k, kosong), ["b-rangkai", "b-irama", "b-putus", "b-satuan", "b-lanjut"], "misi dari keadaan nyata");
  sama(LL.kata(2), "dua", "kata bersama tersedia");
}

/* ------------------------------ Mind-map: Pita Hias ------------------------------ */
{
  const T = DP.TEMPAT_PITA;
  const per = (kel) => T.filter((t) => t.kelompok === kel);
  sama([per("masalah").length, per("metode").length, per("hasil").length], [3, 7, 4], "mind-map: Masalah tiga, Penyelesaian tujuh, Hasil empat");
  sama(per("metode").map((t) => t.urutan), [1, 2, 3, 4, 5, 6, 7], "mind-map: Penyelesaian bernomor berurutan");
  cek(per("masalah").concat(per("hasil")).every((t) => t.urutan === undefined), "mind-map: hanya Penyelesaian yang bernomor");
  cek(new Set(T.map((t) => t.kunci)).size === T.length && new Set(T.map((t) => t.id)).size === T.length, "mind-map: label dan id unik");
  cek(T.every((t) => t.kunci.length <= 42), "mind-map: label pendek");
  const metode = per("metode").map((t) => t.kunci).join(" | ");
  for (const m of ["satuan", "Ulangi", "Periksa", "Pita Pola", "Kode Huruf", "Tepuk Irama", "Buat pola"]) cek(metode.includes(m), `mind-map memuat metode ${m}`);
  cek(!/Pattern|Letter|Rhythm/.test(T.map((t) => t.kunci).join(" ")), "mind-map: nama metode global dalam bahasa Indonesia");
  const semua = T.map((t) => t.kunci).join(" ") + DP.SUARA_PITA + DP.PETUNJUK_URUT_PITA + DP.PUSAT_PITA;
  cek(!/Chacha|Dika|Nia|Bu Sari|Bu Mira|manik|pameran|stan/i.test(semua), "mind-map: hanya poin pelajaran, tanpa nama tokoh atau benda cerita");
  cek(!TERLARANG.test(semua), "mind-map: tanpa kata terlarang");
  cek(!/\d/.test(DP.SUARA_PITA) && !/\d/.test(DP.PETUNJUK_URUT_PITA) && Object.values(DP.KELOMPOK_PITA).every((g) => !/\d/.test(g.petunjuk)), "mind-map: suara tanpa digit");
  const info = Object.keys(DP.KELOMPOK_PITA).sort().join();
  cek(info === "hasil,masalah,metode", "mind-map: tiga kelompok warna");
  const labelAcak = LL.labelDari(T, 97);
  cek(labelAcak.length === 14 && T.every((t) => labelAcak.some((l) => l.teks === t.kunci)), "mind-map: satu label untuk tiap kotak");
  cek(T.every((t) => LL.cocokKelompok(T, t, { id: "x", teks: t.kunci }) === (t.urutan === undefined ? true : true)), "mind-map: label cocok dengan kotaknya sendiri");
  const m1 = per("metode")[0];
  const m2 = per("metode")[1];
  cek(!LL.cocokKelompok(T, m2, { id: "x", teks: m1.kunci }) && LL.cocokKelompok(T, per("masalah")[0], { id: "x", teks: per("masalah")[1].kunci }), "mind-map: kotak bernomor hanya menerima labelnya, kelompok lain menerima sewarna");
  cek(!LL.cocokKelompok(T, per("masalah")[0], { id: "x", teks: per("hasil")[0].kunci }), "mind-map: label hasil ditolak di kotak masalah");
}

/* ------------------------------ Infografis: Lembar Hiasan ------------------------------ */
{
  const T = DP.TEMPAT_LEMBAR;
  sama(DP.KOLOM_LEMBAR, ["Contoh", "Satuan pola", "Kode huruf"], "infografis: tiga kolom");
  sama([DP.BARIS_LEMBAR.length, T.length], [5, 15], "infografis: lima baris, lima belas kotak");
  cek(new Set(T.map((t) => t.kunci)).size === T.length && new Set(T.map((t) => t.id)).size === T.length, "infografis: label unik");
  cek(T.every((t) => t.kunci.length <= 38), "infografis: label pendek");
  sama(DP.BARIS_LEMBAR.map((b) => b.nama), ["Pola warna", "Pola bentuk", "Pola gerakan", "Pola suara", "Bukan pola"], "infografis: jenis pola dari Story");
  const isi = DP.BARIS_LEMBAR.map((b) => `${b.contoh} ${b.satuan} ${b.kode}`).join(" ");
  for (const kata of ["jingga", "bintang", "membungkuk", "keras", "biru"]) cek(isi.includes(kata), `infografis memakai data Story (${kata})`);
  cek(DP.BARIS_LEMBAR.slice(0, 4).every((b) => b.contoh.startsWith(b.satuan.split(", ")[0]) && b.contoh.split(", ").length >= b.satuan.split(", ").length + 1), "infografis: contoh memuat satuan dan berulang");
  cek(DP.BARIS_LEMBAR.slice(0, 4).every((b) => b.kode.replace(/ /g, "").length >= 3 && /^[AB ]+$/.test(b.kode)), "infografis: kode huruf A dan B");
  cek(!TERLARANG.test(isi + DP.SUARA_LEMBAR) && !/\d/.test(DP.SUARA_LEMBAR) && Object.values(DP.KELOMPOK_LEMBAR).every((t) => !/\d/.test(t)), "infografis: tanpa kata terlarang dan digit di suara");
  for (const t of T) cek(["contoh", "satuan", "kode"].includes(t.kelompok) && /^l\d-/.test(t.id), `infografis: kotak ${t.id} punya kolom`);
  cek(T.every((t, i) => t.id.startsWith(`l${Math.floor(i / 3)}-`)), "infografis: id kotak berawalan nomor baris");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "LangkahHias.tsx", "JawabHias.tsx", "TahapHias.tsx", "PitaHias.tsx", "LembarHiasan.tsx", "SimulasiMejaRangkai.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/fetch\(/.test(s), `${f}: tanpa jaringan`);
  }
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!/from "react"/.test(s), `${f}: murni tanpa React`);
  }
  cek(!/^import /m.test(readFileSync(new URL("logika.ts", folderUrl), "utf8")), "logika.ts simulasi tidak mengimpor berkas lain");
  // Batas rupa pada tampilan: emoji benda hanya dalam cabang Concrete.
  const lk = readFileSync(new URL("LangkahHias.tsx", folderUrl), "utf8");
  cek(/siapLangsung\(l, rupa, cara\)/.test(lk), "LangkahHias memakai siapLangsung untuk keadaan awal");
  cek(/j === "benda"\s*\)\s*return\s*\(\s*<text[^>]*>\s*\{EMOJI_BENDA\[u\]\}/.test(lk), "emoji benda hanya digambar untuk unsur bertipe benda");
  cek(/if \(rupa === "benda"\)\s*return \(\s*<text[^>]*>\s*\{EMOJI_BUNYI\[u\]\}/.test(lk), "emoji tepuk hanya untuk Concrete");
  cek(/rupa === "lambang"\)\s*return \(\s*<div/.test(lk) && /rupa !== "lambang" \? \(\s*<svg/.test(lk), "Abstract memakai kartu kata, bukan gambar, termasuk pada tombol pilihan");
  cek(/<Isi \{\.\.\.props\}/.test(lk) && /<SusunKode \{\.\.\.props\}/.test(lk) && !/rupa !== "lambang" && cara === "klik"/.test(lk), "kegiatan mengisi dan menyusun aktif di semua rupa (Abstract tidak macet)");
  const th = readFileSync(new URL("TahapHias.tsx", folderUrl), "utf8");
  cek(/SPANDUK/.test(th) && /hs-konfeti/.test(th) && /rupa === "benda" \? `\$\{IKON_METODE/.test(th), "Tahap: spanduk konfeti di Abstract, ikon metode hanya untuk Concrete");
  cek(/PitaHias|LembarHiasan/.test(readFileSync(new URL("PitaHias.tsx", folderUrl), "utf8") + readFileSync(new URL("LembarHiasan.tsx", folderUrl), "utf8")), "komponen Mind-map dan Infografis ada");
  const imp = (f) => [...readFileSync(new URL(f, folderUrl), "utf8").matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
  for (const f of ["logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "LangkahHias.tsx", "JawabHias.tsx", "TahapHias.tsx", "PitaHias.tsx", "LembarHiasan.tsx", "SimulasiMejaRangkai.tsx"]) cek(imp(f).every((i) => /^(\.\/|\.\.\/lemari-k1b1a\/|\.\.\/SubBabBBanding|@\/lib\/suara-guru-modul|react)/.test(i)), `${f}: impor hanya komponen umum dan folder sendiri (${imp(f).join(", ")})`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
