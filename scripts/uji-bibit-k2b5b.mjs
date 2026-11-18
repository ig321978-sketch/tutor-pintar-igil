// Uji Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda), tengah cerita Kebun Sekolah: tahap Concrete, Pictorial, Abstract;
// Mind-map (Dua Bedeng), Infografis (Daftar Tanam), dan Simulasi Bedeng Bibit.
// Memeriksa: dua belas tugas per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan di tiap tahap, kunci dihitung dari data, jenis jawaban
// (satu angka, satu kata, mengurutkan langkah, memindahkan benda, menggandakan), angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol Periksa macet di Abstract), data yang sah, pengenal ucapan, logika simulasi dan misi, Mind-map, Infografis, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-bibit-k2b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bibit-k2b5b/logika-cpa.ts");
const D = await import("../src/components/modul/bibit-k2b5b/data.ts");
const DP = await import("../src/components/modul/bibit-k2b5b/data-peta.ts");
const K = await import("../src/components/modul/bibit-k2b5b/periksa.ts");
const G = await import("../src/components/modul/bibit-k2b5b/logika.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab5.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/bibit-k2b5b/", import.meta.url);

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
const TAHAP = { concrete: [D.CONCRETE_BIBIT, "benda"], pictorial: [D.PICTORIAL_BIBIT, "diagram"], abstract: [D.ABSTRACT_BIBIT, "lambang"] };
const semuaLangkah = [];
for (const [nama, [soal, rupa]] of Object.entries(TAHAP)) for (const so of soal) for (const ls of so.langkah) semuaLangkah.push({ tahap: nama, rupa, cara: so.cara, so, ls, l: ls.langkah });

/* ------------------------------ Struktur ------------------------------ */
sama(D.CONCRETE_BIBIT.map((s) => s.nomor).concat(D.PICTORIAL_BIBIT.map((s) => s.nomor), D.ABSTRACT_BIBIT.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari Simulasi");
cek(D.CONCRETE_BIBIT === D.CONCRETE && D.PICTORIAL_BIBIT === D.PICTORIAL && D.ABSTRACT_BIBIT === D.ABSTRACT && typeof D.MISI_BIBIT_TEKS === "string" && D.TEMA_BIBIT.concrete && D.TEMA_BIBIT.pictorial && D.TEMA_BIBIT.abstract, "ekspor CONCRETE_BIBIT, PICTORIAL_BIBIT, ABSTRACT_BIBIT, TEMA_BIBIT, MISI_BIBIT_TEKS");
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara berurutan`);
  cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat metode per cara (dua belas tugas)`);
  for (const so of soal) sama(so.langkah.map((x) => x.metode), ["igil", "bagi", "neraca", "kali"], `${nama}/${so.nomor}: urutan metode`);
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
    cek(l.betul || kk === null || (l.jawabTokoh !== undefined && l.jawabTokoh !== String(kk.n)), `${nama}: jawaban tokoh ${l.tokoh} keliru bila ada jawaban angka`);
  }
}
{
  const s = (t, i, j) => D[t][i].langkah[j].langkah;
  const c = s("CONCRETE_BIBIT", 0, 0);
  cek(c.tipe === "salah" && c.dasar.tipe === "bagi" && c.tokoh === "Chacha" && c.jawabTokoh === "5" && c.dasar.total === 8 && sama0(c.dasar.pisah, [5, 3]) && L.kunciJawab(c, "klik").n === 4, "Concrete: Chacha membagi delapan jadi lima dan tiga, lima disebut setengah (benar empat)");
  const p = s("PICTORIAL_BIBIT", 0, 0);
  cek(p.tipe === "salah" && p.dasar.tipe === "bagi" && p.tokoh === "Nia" && p.dasar.total === 7 && L.kunciJawab(p, "klik") === null && !p.betul, "Pictorial: Nia mengira setengah dari tujuh adalah tiga (salah, tersisa satu)");
  const a = s("ABSTRACT_BIBIT", 0, 0);
  cek(a.tipe === "salah" && a.dasar.tipe === "bagi" && a.tokoh === "Chacha" && a.betul === true && a.dasar.total % 2 === 1 && L.kunciJawab(a, "klik") === null, "Abstract: Chacha benar, bilangan ganjil tidak bisa dibagi dua sama banyak tanpa memecah");
}
function sama0(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/* ------------------------------ Kunci dan jenis jawaban ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const d = L.dasarDari(l);
  const kunci = L.kunciJawab(l, cara);
  const nama = `${tahap}/${cara}/${d.tipe}`;
  cek(L.metodeLangkah(l) === ls.metode, `${nama}: metode sesuai`);
  if (cara === "klik") {
    if (d.tipe === "bagi") cek(l.tipe === "salah" ? (d.total % 2 === 0 ? kunci?.jenis === "angka" && kunci.n === d.total / 2 : kunci === null) : kunci?.jenis === "angka", `${nama}: Klik membagi lalu memilih angka (atau bilangan ganjil tanpa jawaban lagi)`);
    else if (d.tipe === "kali") cek(kunci?.jenis === "angka" && kunci.n === 2 * d.h, `${nama}: Klik menggandakan lalu memilih angka`);
    else cek(kunci === null, `${nama}: Klik mengurutkan langkah atau memindahkan benda, tanpa jawaban lagi`);
  } else if (cara === "kanvas") {
    cek(kunci?.jenis === "angka" && Number.isInteger(kunci.n) && kunci.n >= 1 && kunci.n <= 9, `${nama}: Tulis di kanvas = satu angka 1 sampai 9`);
  } else {
    cek((kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9) || (kunci?.jenis === "kata" && ["setengah", "bukan", "sama"].includes(kunci.kata)), `${nama}: Suara = satu bilangan atau satu kata`);
  }
  // Jebakan: tugas yang langsung siap harus punya jawaban; kegiatan klik aktif di semua rupa termasuk lambang.
  const langsung = L.siapLangsung(l, rupa, cara);
  if (langsung) cek(kunci !== null, `${nama}: tugas langsung siap punya jawaban (tombol Periksa aktif)`);
  cek(langsung === (cara !== "klik" && l.tipe !== "salah"), `${nama}: hanya kanvas dan suara yang langsung siap`);
  for (const r of ["benda", "diagram", "lambang"]) cek(L.siapLangsung(l, r, cara) === langsung, `${nama}: siap langsung sama di semua rupa (${r})`);
  if (l.tipe === "salah") cek(!langsung, `${nama}: Cari kesalahan selalu memakai kegiatan`);
}
{
  const angka = (x, cara) => L.kunciJawab(x.langkah, cara)?.n;
  for (const [nama, [soal]] of Object.entries(TAHAP)) {
    const kanvas = soal[1].langkah.map((x) => angka(x, "kanvas"));
    cek(new Set(kanvas).size === 4, `${nama}: empat angka jawaban kanvas tidak kembar (${kanvas.join(", ")})`);
    const sa = soal[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara")).filter((k) => k.jenis === "angka").map((k) => k.n);
    cek(new Set(sa).size === sa.length && sa.length === 2, `${nama}: dua bilangan jawaban suara tidak kembar (${sa.join(", ")})`);
    const sk = soal[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara")).filter((k) => k.jenis === "kata").map((k) => k.kata);
    cek(sk.length === 2 && sk.every((w) => ["setengah", "bukan", "sama"].includes(w)), `${nama}: dua kata jawaban suara (${sk.join(", ")})`);
    const kl = soal[0].langkah.map((x) => L.kunciJawab(x.langkah, "klik")).filter((k) => k?.jenis === "angka").map((k) => k.n);
    cek(new Set(kl).size === kl.length, `${nama}: angka pilihan Klik tidak kembar (${kl.join(", ")})`);
    // Operan yang sama tidak dipakai dua kali dalam satu tahap untuk jenis yang sama.
    for (const tipe of ["bagi", "giliran", "neraca", "kali"]) {
      const operan = soal.flatMap((s) => s.langkah).map((x) => L.dasarDari(x.langkah)).filter((d) => d.tipe === tipe).map((d) => JSON.stringify(d.tipe === "bagi" ? d.total : d.tipe === "giliran" ? [d.total, d.putaran] : d.tipe === "neraca" ? [d.kiri, d.kanan] : [d.h, d.semula]));
      cek(new Set(operan).size === operan.length, `${nama}: operan ${tipe} tidak kembar dalam satu tahap`);
    }
  }
  sama(D.CONCRETE_BIBIT[1].langkah.map((x) => angka(x, "kanvas")), [5, 4, 3, 8], "angka kanvas Concrete");
  sama(D.PICTORIAL_BIBIT[1].langkah.map((x) => angka(x, "kanvas")), [3, 4, 2, 6], "angka kanvas Pictorial");
  sama(D.ABSTRACT_BIBIT[1].langkah.map((x) => angka(x, "kanvas")), [2, 8, 3, 4], "angka kanvas Abstract");
  sama(D.CONCRETE_BIBIT[2].langkah.map((x) => JSON.stringify(L.kunciJawab(x.langkah, "suara"))), ['{"jenis":"angka","n":3}', '{"jenis":"angka","n":4}', '{"jenis":"kata","kata":"setengah"}', '{"jenis":"kata","kata":"bukan"}'], "jawaban suara Concrete");
  sama(D.PICTORIAL_BIBIT[2].langkah.map((x) => JSON.stringify(L.kunciJawab(x.langkah, "suara"))), ['{"jenis":"angka","n":4}', '{"jenis":"angka","n":2}', '{"jenis":"kata","kata":"bukan"}', '{"jenis":"kata","kata":"sama"}'], "jawaban suara Pictorial");
  sama(D.ABSTRACT_BIBIT[2].langkah.map((x) => JSON.stringify(L.kunciJawab(x.langkah, "suara"))), ['{"jenis":"angka","n":5}', '{"jenis":"angka","n":3}', '{"jenis":"kata","kata":"setengah"}', '{"jenis":"kata","kata":"bukan"}'], "jawaban suara Abstract");
}
// Pilihan angka dan kata: memuat jawaban benar dan jawaban tokoh, paling banyak empat, bukan selalu di posisi yang sama.
{
  const pos = [];
  for (const x of semuaLangkah.filter((y) => y.cara === "klik" && L.kunciJawab(y.l, "klik")?.jenis === "angka")) {
    const p = L.pilihanAngka(x.l);
    const kk = L.kunciJawab(x.l, "klik").n;
    cek(p.length >= 3 && p.length <= 4 && p.includes(kk) && p.every((n) => n >= 1 && n <= 10) && p.join() === [...p].sort((a, b) => a - b).join(), `pilihan angka Klik memuat kunci (${p.join(",")})`);
    if (x.l.tipe === "salah" && x.l.jawabTokoh) cek(p.includes(Number(x.l.jawabTokoh)), `pilihan angka memuat jawaban tokoh ${x.l.jawabTokoh}`);
    pos.push(p.indexOf(kk));
  }
  cek(pos.length >= 4, `ada tugas Klik dengan pilihan angka (${pos.length})`);
  for (const x of semuaLangkah.filter((y) => y.cara === "suara")) {
    const k = L.kunciJawab(x.l, "suara");
    if (k.jenis === "angka") cek(L.pilihanAngka(x.l).includes(k.n), "pilihan cadangan suara angka memuat jawaban");
    else cek(L.pilihanKata(x.l).includes(k.kata) && L.pilihanKata(x.l).length === 2, "pilihan cadangan suara kata memuat jawaban");
  }
}

/* ------------------------------ Data yang sah ------------------------------ */
for (const { tahap, l, cara } of semuaLangkah) {
  const d = L.dasarDari(l);
  const n = `${tahap}/${cara}/${d.tipe}`;
  if (d.tipe === "bagi") {
    cek(d.total >= 4 && d.total <= 10, `${n}: total empat sampai sepuluh`);
    if (l.tipe !== "salah") cek(d.total % 2 === 0 && !d.pisah, `${n}: tugas biasa memakai bilangan genap tanpa pembagian tokoh`);
    if (d.pisah) cek(d.pisah[0] + d.pisah[1] <= d.total && d.pisah[0] > 0 && d.pisah[1] > 0 && (d.total % 2 === 1 || d.pisah[0] !== d.pisah[1]), `${n}: pembagian tokoh sah dan keliru`);
  }
  if (d.tipe === "giliran") cek(d.total % 2 === 0 && d.total <= 10 && d.putaran >= 1 && d.putaran * 2 <= d.total, `${n}: putaran tidak melebihi separuh total`);
  if (d.tipe === "neraca") {
    cek(d.kiri >= 1 && d.kanan >= 1 && d.kiri + d.kanan <= 10 && (d.kiri - d.kanan) % 2 === 0, `${n}: dua piringan terisi, selisih genap, jumlah paling banyak sepuluh`);
    if (cara !== "suara") cek(d.kiri !== d.kanan, `${n}: neraca miring untuk Klik dan kanvas`);
  }
  if (d.tipe === "kali") cek(d.h >= 2 && d.h <= 5 && d.semula >= 4 && d.semula <= 10 && true, `${n}: setengah dua sampai lima`);
  if (tahap === "concrete") cek(!d.benda || L.DAFTAR_BENDA.includes(d.benda), `${n}: benda Concrete dikenal`);
  if (tahap !== "concrete") cek(!d.benda, `${n}: Pictorial dan Abstract tanpa nama benda`);
}
{
  const benda = new Set(D.CONCRETE_BIBIT.flatMap((s) => s.langkah).map((x) => L.dasarDari(x.langkah).benda ?? "bibit"));
  cek(benda.size >= 5, `Concrete memakai paling sedikit lima benda berbeda (${[...benda].join(",")})`);
  cek(Object.keys(L.EMOJI_BENDA).every((b) => [...L.EMOJI_BENDA[b]].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "emoji benda paling tinggi U+1FA95 tanpa ZWJ");
  // Rupa: Concrete beremoji; Pictorial dan Abstract tanpa emoji di teks.
  const salahNeraca = semuaLangkah.filter((x) => L.dasarDari(x.l).tipe === "neraca");
  cek(salahNeraca.length === 9, "sembilan tugas neraca");
}

/* ------------------------------ Hitungan dasar ------------------------------ */
sama([L.setengahDari(8), L.setengahDari(7), L.banyakPindah({ tipe: "neraca", kiri: 9, kanan: 3 }), L.seimbangSetiap({ tipe: "neraca", kiri: 9, kanan: 3 }), L.sisaSetelah({ tipe: "giliran", total: 10, putaran: 3 }), L.gandaan({ tipe: "kali", h: 3, semula: 6 }), L.gandaanSama({ tipe: "kali", h: 3, semula: 7 })], [4, null, 3, 6, 4, 6, false], "hitungan dasar");
sama([L.kunciJawab({ tipe: "bagi", total: 10 }, "kanvas"), L.kunciJawab({ tipe: "bagi", total: 9 }, "klik"), L.kunciJawab({ tipe: "giliran", total: 8, putaran: 3 }, "suara"), L.kunciJawab({ tipe: "giliran", total: 8, putaran: 3 }, "kanvas"), L.kunciJawab({ tipe: "giliran", total: 8, putaran: 3 }, "klik")], [{ jenis: "angka", n: 5 }, null, { jenis: "angka", n: 3 }, { jenis: "angka", n: 2 }, null], "kunci bagi dan giliran");
sama([L.kunciJawab({ tipe: "neraca", kiri: 4, kanan: 4 }, "suara"), L.kunciJawab({ tipe: "neraca", kiri: 6, kanan: 4 }, "suara"), L.kunciJawab({ tipe: "kali", h: 3, semula: 6 }, "suara"), L.kunciJawab({ tipe: "kali", h: 3, semula: 7 }, "suara"), L.kunciJawab({ tipe: "kali", h: 4, semula: 8 }, "klik")], [{ jenis: "kata", kata: "setengah" }, { jenis: "kata", kata: "bukan" }, { jenis: "kata", kata: "sama" }, { jenis: "kata", kata: "bukan" }, { jenis: "angka", n: 8 }], "kunci neraca dan kali");
{
  const u = L.langkahUrut({ tipe: "giliran", total: 6, putaran: 2, benda: "tomat" }, "benda");
  cek(u.length === 4 && /enam tomat/.test(u[0]) && /kiri/.test(u[1]) && /habis/.test(u[2]) && /Hitung/.test(u[3]) && u.every((t) => !/\d/.test(t)), "langkah urut: kumpulkan, bagi bergantian, ulangi, hitung");
  for (const total of [4, 6, 8, 10]) {
    const t = L.urutTampil({ tipe: "giliran", total, putaran: 1 });
    cek([...t].sort().join() === "0,1,2,3" && t[0] !== 0, `urutan tampil kartu langkah acak tetap (total ${total}: ${t.join("")})`);
  }
}

/* ------------------------------ Teks: tanpa digit di suara, kata terlarang, emoji ------------------------------ */
{
  const emojiBatas = (s) => ![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de);
  for (const { tahap, rupa, so, ls, l } of semuaLangkah) {
    const layar = [so.judul, so.cerita, ls.judul, ls.suara, ...(l.tipe === "salah" ? [l.kataTokoh, l.keliru, ...l.alasan] : [])].join(" ");
    cek(!/\d/.test(ls.suara) && !/\d/.test(so.cerita) && !/\d/.test(so.judul.replace(/\d+:/, ":")), `${tahap}/${so.nomor}: suara dan cerita tanpa digit`);
    cek(!/\d/.test(l.tipe === "salah" ? [l.kataTokoh, l.keliru, ...l.alasan].join(" ") : ""), `${tahap}/${so.nomor}: kata tokoh, alasan, dan petunjuk tanpa digit`);
    cek(!TERLARANG.test(layar), `${tahap}/${so.nomor}: tanpa kata terlarang`);
    cek(!SURUH.test(layar), `${tahap}/${so.nomor}: tanpa suruhan membawa benda atau bermain bersama`);
    cek(emojiBatas(layar), `${tahap}/${so.nomor}: emoji paling tinggi U+1FA95`);
    if (rupa !== "benda") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(layar), `${tahap}/${so.nomor}: tanpa emoji di teks tugas ${rupa}`);
    cek(!/tebak|kelompokkan/i.test(layar), `${tahap}/${so.nomor}: tanpa tebak dan kelompokkan`);
    cek(!/ikan|akuarium|semangka|labu|pameran|manik|kantin|koperasi|seragam/i.test(layar), `${tahap}/${so.nomor}: tanpa tokoh atau latar bab lain`);
  }
  const tetap = [...D.POIN_PENTING, D.PENUTUP_B, ...Object.values(D.TEMA_BIBIT).map((t) => t.cara), DP.MISI_BIBIT_TEKS].join(" ");
  cek(!TERLARANG.test(tetap) && emojiBatas(tetap + Object.values(D.TEMA_BIBIT).map((t) => t.ikon).join("")), "poin penting, penutup, tema, dan misi: kata terlarang dan emoji");
  cek(!/\d/.test(D.POIN_PENTING_SUARA.join(" ")) && !/\d/.test(D.PENUTUP_B) && !/\d/.test(DP.MISI_BIBIT_TEKS), "suara poin penting, penutup, dan misi tanpa digit");
  cek(D.POIN_PENTING.length === 6 && /sama banyak/.test(D.POIN_PENTING.join(" ")) && /ganjil/.test(D.POIN_PENTING.join(" ")) && /Dua kali setengahnya/.test(D.POIN_PENTING.join(" ")), "poin penting memuat sama banyak, ganjil, dan dua kali setengahnya");
  cek(/Pak Joko/.test(D.PENUTUP_B) && !/PANEN RAYA|konfeti/i.test(D.PENUTUP_B), "penutup jembatan ke Sub-Bab C, bukan perayaan akhir bab");
  for (const { rupa, cara, l } of semuaLangkah) {
    const t = L.instruksi(l, rupa, cara) + L.kalimatKunci(l, cara) + L.kalimatTanya(l, cara);
    cek(!/\d/.test(t), `instruksi dan kalimat kunci tanpa digit (${l.tipe}/${cara}/${rupa})`);
    cek(!TERLARANG.test(t), `instruksi tanpa kata terlarang (${l.tipe}/${cara}/${rupa})`);
    if (rupa === "diagram") cek(/titik/.test(L.instruksi(l, rupa, cara)) || L.dasarDari(l).tipe === "kali" || L.dasarDari(l).tipe === "neraca" || L.dasarDari(l).tipe === "giliran" || l.tipe === "salah", `Pictorial menyebut titik (${l.tipe}/${cara})`);
  }
  // Petunjuk salah tanpa digit dan menunjuk kesalahan.
  for (const { l, cara } of semuaLangkah) {
    const k = L.kunciJawab(l, cara);
    if (!k) continue;
    for (const j of cara === "kanvas" ? [1, 9] : ["lima", "setengah", "bukan", "sama"]) {
      const p = L.petunjukSalah(l, cara, j);
      cek(!/\d/.test(p) && p.length > 25 && !TERLARANG.test(p), `petunjuk salah (${l.tipe}/${cara}/${j})`);
    }
  }
  for (const p of [L.petunjukBagi(0), L.petunjukBagi(1), L.petunjukPindah(), L.petunjukUrut(0), L.petunjukUrut(2)]) cek(!/\d/.test(p) && p.length > 20, "petunjuk kegiatan tanpa digit");
  cek(/pertama/.test(L.petunjukUrut(0)) && /ketiga/.test(L.petunjukUrut(2)) && /kanan/.test(L.petunjukBagi(0)) && /kiri/.test(L.petunjukBagi(1)), "petunjuk kegiatan menyebut giliran yang benar");
  // Petunjuk Cari kesalahan menunjuk jawaban tokoh.
  const c = D.CONCRETE_BIBIT[0].langkah[0].langkah;
  cek(/Chacha yang keliru/.test(L.petunjukSalah(c, "klik", 5)), "petunjuk salah menyebut jawaban Chacha");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama([K.kataDariUcapan("setengah"), K.kataDariUcapan("separuh"), K.kataDariUcapan("bukan"), K.kataDariUcapan("sama banyak"), K.kataDariUcapan("seimbang"), K.kataDariUcapan("tidak sama")], [["setengah"], ["setengah"], ["bukan"], ["sama"], ["sama"], ["bukan", "sama"]], "kata dari ucapan");
  sama([K.angkaDariUcapan("tiga"), K.angkaDariUcapan("5"), K.angkaDariUcapan("sepuluh"), K.angkaDariUcapan("ampat lima")], [[3], [5], [10], [4, 5]], "angka dari ucapan");
  cek(K.cocokUcapan("tiga", { jenis: "angka", n: 3 }).cocok && K.cocokUcapan("mm lima", { jenis: "angka", n: 5 }).cocok && !K.cocokUcapan("empat", { jenis: "angka", n: 3 }).cocok, "cocok ucapan angka");
  cek(K.cocokUcapan("setengah", { jenis: "kata", kata: "setengah" }).cocok && !K.cocokUcapan("bukan setengah", { jenis: "kata", kata: "setengah" }).cocok && K.cocokUcapan("bukan setengah", { jenis: "kata", kata: "bukan" }).cocok, "cocok ucapan setengah dan bukan");
  cek(K.cocokUcapan("sama", { jenis: "kata", kata: "sama" }).cocok && K.cocokUcapan("seimbang", { jenis: "kata", kata: "sama" }).cocok && !K.cocokUcapan("bukan", { jenis: "kata", kata: "sama" }).cocok, "cocok ucapan sama");
  sama(K.cocokUcapan("coba lagi", { jenis: "angka", n: 2 }).terdengar, [], "tidak terdengar apa pun");
  // Tata letak adegan.
  for (const n of [1, 2, 4, 5, 8, 10]) {
    const g = K.tataGrid(n, 0, 0, 120, 70, 5);
    cek(g.titik.length === n && g.titik.every((p) => p.x >= 0 && p.x <= 120 && p.y >= 0 && p.y <= 70) && g.s > 8 && g.s <= 26, `tata grid ${n} benda masuk kotak (s=${g.s})`);
  }
}

/* ------------------------------ Logika simulasi ------------------------------ */
{
  let k = G.awalBibit();
  cek(k.alat === "bibit" && k.mode === "bagi" && k.sisa === 4 && k.kiri === 0 && k.kanan === 0 && k.terbagi.length === 0 && k.neracaSet.length === 0 && k.digandakan.length === 0, "keadaan awal");
  sama(G.TUMPUK_BAGI.map((t) => t.total), [4, 8, 5, 9, 10], "tumpukan simulasi");
  cek(G.TUMPUK_BAGI.every((t) => !["bibit", "tomat"].includes(t.benda)) && G.PAKET_NERACA.every((p) => !["bibit", "tomat"].includes(p.benda) && (p.kiri - p.kanan) % 2 === 0 && p.kiri !== p.kanan), "benda simulasi berbeda dari Story dan neraca selalu bisa diseimbangkan");
  // Bagi tumpukan genap (empat).
  let r = G.beriSatu(k, 0);
  cek(r.ok && r.k.kiri === 1 && r.k.sisa === 3 && r.k.terakhir === 0, "beri satu ke kiri");
  const sama2 = G.beriSatu(r.k, 0);
  cek(!sama2.ok && sama2.perlu === "gantian" && sama2.k.salahCoba === 1 && sama2.k.kiri === 1, "petak yang sama dua kali berturut-turut ditolak");
  k = r.k;
  for (const sisi of [1, 0, 1]) {
    r = G.beriSatu(k, sisi);
    k = r.k;
    cek(r.ok, `beri bergantian ke ${sisi}`);
  }
  cek(k.sisa === 0 && k.kiri === 2 && k.kanan === 2 && k.terbagi.join() === "0" && k.ganjilSelesai.length === 0, "empat benda habis, dua dan dua, tercatat terbagi");
  cek(!G.beriSatu(k, 0).ok && G.beriSatu(k, 0).perlu === "habis", "benda habis tidak bisa diberi lagi");
  cek(/Sama banyak/.test(G.kalimatBibit(k)) && /setengah dari empat adalah dua/.test(G.kalimatBibit(k)), "kalimat hasil bagi");
  // Tumpukan ganjil (lima).
  k = G.pilihTumpuk(k, 2);
  cek(k.sisa === 5 && k.kiri === 0 && k.kanan === 0 && k.terakhir === -1 && k.terbagi.join() === "0" && !G.tumpukGenap(k), "pilih tumpukan ganjil mengisi meja lagi dan menyimpan catatan");
  for (const sisi of [1, 0, 1, 0]) k = G.beriSatu(k, sisi).k;
  cek(k.sisa === 1 && k.kiri === 2 && k.kanan === 2 && k.ganjilSelesai.join() === "2", "lima benda: tersisa satu setelah dua dan dua, tercatat ganjil");
  const gj = G.beriSatu(k, 1);
  cek(!gj.ok && gj.perlu === "ganjil" && gj.k.sisa === 1 && /tidak punya setengah utuh/.test(G.kalimatBibit(k)), "benda terakhir tidak bisa dibagi dan tidak dipecah");
  // Bagi dimulai dari kanan dan mulai lagi.
  k = G.ulangBagi(G.pilihTumpuk(k, 1));
  for (const sisi of [1, 0, 1, 0, 1, 0, 1, 0]) k = G.beriSatu(k, sisi).k;
  cek(k.sisa === 0 && k.kiri === 4 && k.kanan === 4 && k.terbagi.join() === "0,1", "delapan benda dibagi mulai dari kanan, dua tumpukan tercatat");
  cek(G.pilihTumpuk(k, 99) === k && G.pilihTumpuk(k, -1) === k, "tumpukan di luar daftar diabaikan");
  // Neraca.
  k = G.pilihModeBibit(k, "neraca");
  cek(k.mode === "neraca" && G.pilihModeBibit(k, "neraca") === k, "ganti alat");
  cek(k.piringKiri === 6 && k.piringKanan === 2 && !G.neracaSeimbang(k) && G.miringNeraca(k) === -1, "neraca awal miring ke kiri");
  const salahArah = G.pindahBenda(k, "kanan");
  cek(!salahArah.ok && salahArah.perlu === "arah" && salahArah.k.salahCoba === 1 && salahArah.k.piringKanan === 2, "memindahkan dari piringan yang lebih sedikit ditolak");
  for (let i = 0; i < 2; i += 1) {
    r = G.pindahBenda(k, "kiri");
    k = r.k;
    cek(r.ok, `pindah dari kiri ${i + 1}`);
  }
  cek(G.neracaSeimbang(k) && k.piringKiri === 4 && k.piringKanan === 4 && k.neracaSet.join() === "0" && G.miringNeraca(k) === 0, "empat dan empat seimbang, tercatat");
  cek(G.pindahBenda(k, "kanan").ok && !G.neracaSeimbang(G.pindahBenda(k, "kanan").k), "saat seimbang boleh mencoba memindahkan dari piringan mana pun");
  k = G.pilihPaket(k, 1);
  cek(k.piringKiri === 3 && k.piringKanan === 9 && G.miringNeraca(k) === 1, "paket kedua miring ke kanan");
  for (let i = 0; i < 3; i += 1) k = G.pindahBenda(k, "kanan").k;
  cek(G.neracaSeimbang(k) && k.neracaSet.join() === "0,1", "dua paket seimbang tercatat");
  cek(G.pindahBenda(G.pilihPaket(k, 3), "kanan").ok && G.pindahBenda({ ...G.pilihPaket(k, 3), piringKanan: 0, piringKiri: 5 }, "kanan").perlu === "kosong", "piringan kosong tidak bisa dipindahkan");
  cek(G.ulangNeraca(k).piringKiri === 3 && G.ulangNeraca(k).neracaSet.join() === "0,1", "ulangi neraca menyimpan catatan");
  // Gabung.
  k = G.pilihModeBibit(k, "gabung");
  cek(G.setengahSekarang(k) === 2 && !k.digandakanSekarang, "gabung: setengah awal dua");
  r = G.gandakan(k);
  cek(r.ok && r.k.digandakanSekarang && r.k.digandakan.join() === "2" && /Dua kali dua adalah empat/.test(G.kalimatBibit(r.k)), "gandakan setengah dua menjadi empat");
  cek(!G.gandakan(r.k).ok && G.gandakan(r.k).perlu === "habis", "tidak digandakan dua kali");
  k = G.pilihSetengah(G.bagiLagi(r.k), 3);
  cek(!k.digandakanSekarang && G.setengahSekarang(k) === 5 && G.gandakan(k).k.digandakan.join() === "2,5", "setengah lima digandakan, tercatat");
  // Kalimat tanpa digit.
  for (const kk of [G.awalBibit(), k, G.pilihModeBibit(k, "neraca"), G.pilihModeBibit(k, "bagi")]) {
    const t = G.kalimatBibit(kk);
    cek(t.length > 15 && !/\d/.test(t) && !TERLARANG.test(t), `kalimat simulasi tanpa digit (${kk.mode})`);
  }
  for (const perlu of ["gantian", "habis", "ganjil", "arah", "kosong"]) {
    const t = G.petunjukBibit(perlu, { ...G.awalBibit(), terakhir: 0 });
    cek(!/\d/.test(t) && t.length > 15, `petunjuk simulasi ${perlu}`);
  }
}

/* ------------------------------ Misi ------------------------------ */
{
  const daftar = MK.daftarMisiK2Bab5("B");
  const awal = { alat: "bibit", mode: "bagi", tumpuk: 0, sisa: 4, kiri: 0, kanan: 0, terakhir: -1, terbagi: [], ganjilSelesai: [], paket: 0, piringKiri: 6, piringKanan: 2, neracaSet: [], setengah: 0, digandakanSekarang: false, digandakan: [], salahCoba: 0 };
  cek(JSON.stringify(G.awalBibit()) === JSON.stringify(awal), "keadaan awal sama dengan yang ditulis di uji bersama");
  cek(daftar === MK.MISI_B && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && daftar.every((m) => m.id.startsWith("b-")), "empat wajib, dua bebas, id berawalan b-");
  cek(S.misiBaru(daftar, awal, new Set()).length === 0, "keadaan awal tidak memenuhi misi");
  cek(daftar.every((m) => m.teks.length >= 10 && m.teks.length <= 120 && !/\d/.test(m.teks) && !TERLARANG.test(m.teks) && !/tebakan/i.test(m.teks)), "teks misi 10 sampai 120 huruf, tanpa digit dan kata terlarang");
  cek(new Set(daftar.map((m) => m.id)).size === 6 && daftar.every((m) => !m.cek({ alat: "kerangka" })), "id unik, alat lain tidak memenuhi misi");
  const baru = (o) => S.misiBaru(daftar, { ...awal, ...o }, new Set());
  sama(baru({ terbagi: [0] }), ["b-bagi"], "satu tumpukan terbagi memenuhi b-bagi");
  sama(baru({ ganjilSelesai: [2] }), ["b-ganjil"], "satu tumpukan ganjil memenuhi b-ganjil");
  sama(baru({ neracaSet: [0] }), ["b-neraca"], "satu neraca seimbang memenuhi b-neraca");
  sama(baru({ digandakan: [2] }), ["b-gandakan"], "satu setengah digandakan memenuhi b-gandakan");
  sama(baru({ terbagi: [0, 1, 3], neracaSet: [0, 2] }), ["b-bagi", "b-neraca", "b-semua", "b-dua"], "tantangan bebas");
  sama(baru({ terbagi: [0, 1] }), ["b-bagi"], "dua tumpukan belum memenuhi b-semua");
  cek(S.misiBaru(daftar, { ...awal, salahCoba: 9 }, new Set()).length === 0, "percobaan keliru tidak dihitung sebagai misi");
  // Alur lengkap lewat logika: semua misi wajib tercapai.
  let k = G.awalBibit();
  for (const sisi of [0, 1, 0, 1]) k = G.beriSatu(k, sisi).k;
  k = G.pilihTumpuk(k, 2);
  for (const sisi of [1, 0, 1, 0, 1]) k = G.beriSatu(k, sisi).k;
  k = G.pindahBenda(G.pindahBenda(G.pilihPaket(k, 0), "kiri").k, "kiri").k;
  k = G.gandakan(k).k;
  cek(S.wajibSelesai(daftar, new Set(S.misiBaru(daftar, k, new Set()))), "alur lengkap memenuhi semua misi wajib");
}

/* ------------------------------ Mind-map ------------------------------ */
{
  const kelompok = (nama) => DP.TEMPAT_BEDENG.filter((t) => t.kelompok === nama);
  cek(DP.TEMPAT_BEDENG.length === 14 && kelompok("masalah").length === 3 && kelompok("metode").length === 7 && kelompok("hasil").length === 4, "mind-map: masalah 3, penyelesaian 7, hasil 4");
  sama(kelompok("metode").map((t) => t.urutan), [1, 2, 3, 4, 5, 6, 7], "mind-map: penyelesaian bernomor berurutan");
  cek(kelompok("masalah").every((t) => t.urutan === undefined) && kelompok("hasil").every((t) => t.urutan === undefined), "mind-map: masalah dan hasil tanpa nomor");
  cek(new Set(DP.TEMPAT_BEDENG.map((t) => t.kunci)).size === 14 && new Set(DP.TEMPAT_BEDENG.map((t) => t.id)).size === 14, "mind-map: label dan id unik");
  const semua = DP.TEMPAT_BEDENG.map((t) => t.kunci).join(" ");
  cek(!/\d/.test(semua) && !TERLARANG.test(semua), "mind-map: label tanpa digit dan kata terlarang");
  cek(!/Chacha|Dika|Nia|Bu Sari|Bu Wati|Pak Joko|bibit|tomat|keranjang|bedeng|petak/i.test(semua), "mind-map: hanya poin pelajaran, tanpa tokoh dan benda cerita");
  cek(/Bagi Satu-Satu/.test(semua) && /Neraca Seimbang/.test(semua) && /Cek Dua Kali Lipat/.test(semua) && /satu-satu sampai habis/.test(semua) && /ganjil/i.test(semua) && /sama banyak/.test(semua) && /Gabungkan dua setengah/.test(semua), "mind-map memuat semua metode Story, ganjil, dan menggabung");
  cek(["masalah", "metode", "hasil"].every((g) => DP.KELOMPOK_BEDENG[g] && DP.KELOMPOK_BEDENG[g].petunjuk.length > 15 && !/\d/.test(DP.KELOMPOK_BEDENG[g].petunjuk)), "mind-map: petunjuk tiap warna");
  cek(!/\d/.test(DP.SUARA_BEDENG) && !/\d/.test(DP.PETUNJUK_URUT_BEDENG) && /tujuh petak/.test(DP.SUARA_BEDENG) && /nomor/i.test(DP.PETUNJUK_URUT_BEDENG), "mind-map: suara tanpa digit");
  const tempat = DP.TEMPAT_BEDENG;
  const label = LL.labelDari(tempat, 83);
  cek(label.length === 14, "mind-map: satu label untuk tiap tempat");
  cek(tempat.filter((t) => t.urutan !== undefined).every((t) => label.every((l) => LL.cocokKelompok(tempat, t, l) === (l.teks === t.kunci))), "mind-map: petak bernomor hanya menerima labelnya sendiri");
  const m1 = tempat.find((t) => t.id === "bd-m1");
  const m2 = tempat.find((t) => t.id === "bd-m2");
  const lm1 = label.find((l) => l.teks === m2.kunci);
  cek(LL.cocokKelompok(tempat, m1, lm1) && !LL.cocokKelompok(tempat, tempat.find((t) => t.id === "bd-h1"), lm1), "mind-map: label sewarna boleh di petak sekelompok, bukan di warna lain");
}

/* ------------------------------ Infografis ------------------------------ */
{
  cek(DP.BARIS_DAFTAR.length === 5 && DP.TEMPAT_DAFTAR.length === 15 && DP.KOLOM_DAFTAR.length === 3, "infografis: lima baris, tiga kolom, lima belas label");
  cek(new Set(DP.TEMPAT_DAFTAR.map((t) => t.kunci)).size === 15 && new Set(DP.TEMPAT_DAFTAR.map((t) => t.id)).size === 15, "infografis: label dan id unik");
  const semua = DP.TEMPAT_DAFTAR.map((t) => t.kunci).join(" ");
  cek(!/\d/.test(semua) && !TERLARANG.test(semua) && label2(), "infografis: label tanpa digit dan kata terlarang, kata pendek");
  function label2() {
    return DP.TEMPAT_DAFTAR.every((t) => t.kunci.length <= 40);
  }
  for (const [i, kata] of [["enam jadi tiga dan tiga", "tiga"], ["enam jadi empat dan dua", "dua"], ["delapan jadi empat dan empat", "empat"], ["lima jadi dua, dua, sisa satu", "satu"], ["sepuluh jadi lima dan lima", "lima"]].entries()) cek(DP.BARIS_DAFTAR[i].bagi === kata[0], `infografis: baris ${i + 1} memakai data Story (${kata[0]})`);
  sama(DP.BARIS_DAFTAR.map((b) => b.hasil), ["setengah dari enam adalah tiga", "bukan setengah", "setengah dari delapan adalah empat", "tidak punya setengah utuh", "setengah dari sepuluh adalah lima"], "infografis: hasil tiap baris");
  sama(DP.TEMPAT_DAFTAR.slice(0, 3).map((t) => t.kelompok), ["bagi", "bagian", "hasil"], "infografis: kolom tiap baris");
  cek(DP.TEMPAT_DAFTAR.every((t, i) => t.kelompok === ["bagi", "bagian", "hasil"][i % 3] && t.id.startsWith(`d${Math.floor(i / 3)}-`)), "infografis: id memuat nomor baris");
  cek(DP.BARIS_DAFTAR.every((b) => b.nama.length > 5 && b.ikon.length > 0) && Object.keys(DP.KELOMPOK_DAFTAR).length === 3 && !/\d/.test(DP.SUARA_DAFTAR), "infografis: nama baris, petunjuk kolom, suara");
  const emojiBatas = (s) => ![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de);
  cek(emojiBatas(DP.BARIS_DAFTAR.map((b) => b.ikon).join("") + Object.values(DP.KELOMPOK_BEDENG).map((g) => g.ikon).join("")), "ikon infografis dan mind-map paling tinggi U+1FA95");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  sama(berkas.sort(), ["DaftarTanam.tsx", "DuaBedeng.tsx", "JawabBibit.tsx", "LangkahBibit.tsx", "SimulasiBedengBibit.tsx", "TahapBibit.tsx", "data-peta.ts", "data.ts", "logika-cpa.ts", "logika.ts", "periksa.ts"], "berkas folder");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/.test(s), `${f}: tanpa jaringan`);
  }
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!/from "react"/.test(s), `${f}: logika dan data murni tanpa React`);
  }
  const lg = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(!/^import /m.test(lg), "logika.ts tidak mengimpor berkas lain");
  const sim = readFileSync(new URL("../src/components/modul/SimulasiK2Bab5.tsx", import.meta.url), "utf8");
  cek(/SimulasiBedengBibit/.test(sim) && /MISI_BIBIT_TEKS/.test(sim) && /KeadaanBibit/.test(sim), "SimulasiK2Bab5.tsx memasang Simulasi Bedeng Bibit");
}
{
  // Tahap memakai cara jawab yang sama untuk ketiga rupa (jebakan Periksa macet): siapLangsung tidak bergantung pada rupa.
  const lt = readFileSync(new URL("LangkahBibit.tsx", folderUrl), "utf8");
  cek(/siapLangsung\(l, rupa, cara\)/.test(lt) && /JawabTulis/.test(lt) && /JawabSuaraBibit/.test(lt) && /Pilihan /.test(lt), "LangkahBibit memakai siapLangsung dan tiga cara menjawab");
  cek(/Ini jawaban yang benar\./.test(lt) && /BATAS_SALAH/.test(readFileSync(new URL("JawabBibit.tsx", folderUrl), "utf8")), "jawaban benar ditampilkan setelah tiga kali salah: Ini jawaban yang benar.");
  const th = readFileSync(new URL("TahapBibit.tsx", folderUrl), "utf8");
  cek(/umum, rupa, soal, pita, teksAkhir, poinPenting|umum,\s*rupa,\s*soal,\s*pita,\s*teksAkhir,\s*poinPenting/.test(th) && /Poin Penting/.test(th) && !/konfeti|PANEN RAYA/i.test(th), "TahapBibit: props sama dengan TahapRak, Poin Penting, bukan perayaan akhir bab");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
