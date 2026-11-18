// Uji tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab A ("Ubin untuk Taman Bermain", bangun datar).
// Memeriksa: dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan Cari kesalahan di tiap tahap, kunci dihitung dari data,
// jenis jawaban (nama bentuk, satu angka, memilah, mengetuk benda), angka jawaban tidak kembar per tahap, soal yang langsung siap (jebakan tombol Periksa macet),
// papan paku yang sah (tanpa garis bersilangan), diagram Venn, tata letak kanvas, pengenal ucapan nama bentuk, petunjuk salah, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-cpa-ubin-k2b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ubin-k2b3a/logika-cpa.ts");
const D = await import("../src/components/modul/ubin-k2b3a/data.ts");
const K = await import("../src/components/modul/ubin-k2b3a/periksa.ts");
const folderUrl = new URL("../src/components/modul/ubin-k2b3a/", import.meta.url);

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

const TAHAP = { concrete: [D.CONCRETE_UBIN, "benda"], pictorial: [D.PICTORIAL_UBIN, "diagram"], abstract: [D.ABSTRACT_UBIN, "lambang"] };
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
const SURUH = /bawalah|bawa benda|gambarlah|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
const semuaLangkah = [];
for (const [nama, [soal, rupa]] of Object.entries(TAHAP)) for (const so of soal) for (const ls of so.langkah) semuaLangkah.push({ tahap: nama, rupa, cara: so.cara, so, ls, l: ls.langkah });

/* ------------------------------ Struktur ------------------------------ */
sama(D.CONCRETE_UBIN.map((s) => s.nomor).concat(D.PICTORIAL_UBIN.map((s) => s.nomor), D.ABSTRACT_UBIN.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari Simulasi");
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara berurutan`);
  cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat metode per cara (dua belas tugas)`);
  for (const so of soal) sama(so.langkah.map((x) => x.metode), ["igil", "papan", "venn", "buru"], `${nama}/${so.nomor}: urutan metode`);
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
    cek(l.betul ? l.jawabTokoh === undefined : l.jawabTokoh !== undefined && l.jawabTokoh !== L.kunciJawab(l, "klik").nama, `${nama}: jawaban tokoh ${l.tokoh} keliru bila salah, tanpa jawaban bila benar`);
  }
}
cek(D.ABSTRACT_UBIN.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah" && x.langkah.betul).length === 1, "Abstract: satu Cari kesalahan di mana tokoh benar");
cek(D.ABSTRACT_UBIN.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah" && !x.langkah.betul).length >= 1, "Abstract: satu Cari kesalahan di mana tokoh salah");

/* ------------------------------ Kunci dan jenis jawaban ------------------------------ */
for (const { tahap, cara, l, ls } of semuaLangkah) {
  const d = L.dasarDari(l);
  const kunci = L.kunciJawab(l, cara);
  const nama = `${tahap}/${cara}/${d.tipe}`;
  cek(L.metodeLangkah(l) === ls.metode, `${nama}: metode sesuai`);
  if (cara === "klik") {
    if (d.tipe === "hitung" || d.tipe === "papan") cek(kunci?.jenis === "nama" && L.pilihanNama(l).length === 4 && L.pilihanNama(l).includes(kunci.nama), `${nama}: Klik memilih nama dari empat pilihan`);
    else cek(kunci === null, `${nama}: Klik memilah atau mengetuk benda, tanpa jawaban lagi`);
  } else if (cara === "kanvas") {
    cek(kunci?.jenis === "angka" && Number.isInteger(kunci.n) && kunci.n >= 1 && kunci.n <= 9, `${nama}: Tulis di kanvas = satu angka`);
  } else {
    cek(kunci?.jenis === "nama" && L.URUT_NAMA.includes(kunci.nama), `${nama}: Suara = nama bentuk`);
  }
  // Jebakan: soal yang langsung siap harus punya jawaban; soal dengan kegiatan hanya jenis yang punya kegiatan.
  const langsung = L.siapLangsung(l, ls.cara === cara ? TAHAP[tahap][1] : "benda", cara);
  if (langsung) cek(kunci !== null, `${nama}: soal langsung siap punya jawaban (tombol Periksa aktif)`);
  if (cara !== "klik") cek(langsung || l.tipe === "salah", `${nama}: kanvas dan suara langsung siap`);
  if (cara === "klik" && TAHAP[tahap][1] === "lambang" && (d.tipe === "hitung" || d.tipe === "papan") && l.tipe !== "salah") cek(langsung, `${nama}: Abstract hitung dan papan langsung memilih nama`);
}
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  const kanvas = soal[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n);
  cek(new Set(kanvas).size === 4, `${nama}: empat angka jawaban kanvas tidak kembar (${kanvas.join(", ")})`);
  const suara = soal[2].langkah.map((x) => L.kunciJawab(x.langkah, "suara").nama);
  cek(new Set(suara).size === 4, `${nama}: empat nama jawaban suara tidak kembar (${suara.join(", ")})`);
}
sama(D.CONCRETE_UBIN[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [8, 7, 2, 3], "angka kanvas Concrete");
sama(D.PICTORIAL_UBIN[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [7, 8, 1, 4], "angka kanvas Pictorial");
sama(D.ABSTRACT_UBIN[1].langkah.map((x) => L.kunciJawab(x.langkah, "kanvas").n), [8, 7, 3, 2], "angka kanvas Abstract");
// Posisi kunci pada pilihan nama tidak selalu sama.
{
  const posisi = semuaLangkah.filter((x) => x.cara === "klik" && L.kunciJawab(x.l, "klik")?.jenis === "nama").map((x) => L.pilihanNama(x.l).indexOf(L.kunciJawab(x.l, "klik").nama));
  cek(new Set(posisi).size >= 2, `jawaban benar tidak selalu di tombol yang sama (${posisi.join(",")})`);
  for (const x of semuaLangkah.filter((y) => y.l.tipe === "salah" && y.l.jawabTokoh)) cek(L.pilihanNama(x.l).includes(x.l.jawabTokoh), `pilihan memuat jawaban tokoh ${x.l.jawabTokoh}`);
}

/* ------------------------------ Data bentuk ------------------------------ */
const silang = (a, b, c, d) => {
  const o = (p, q, r) => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
};
for (const { tahap, l, cara } of semuaLangkah) {
  const d = L.dasarDari(l);
  const n = `${tahap}/${cara}/${d.tipe}`;
  if (d.tipe === "hitung") cek(L.INFO[d.bentuk].sisi >= 3 && d.awal >= 0 && d.awal < L.INFO[d.bentuk].sisi && L.INFO[d.bentuk].sisi === K.titikBentuk(d.bentuk, 150, 100, 50).length, `${n}: hitung memakai segi banyak, tanda awal sah`);
  if (d.tipe === "papan") {
    const t = d.paku.map(([c, r]) => ({ x: c, y: r }));
    cek(d.paku.length >= 3 && d.paku.length <= 8 && new Set(d.paku.map((p) => p.join())).size === d.paku.length && d.paku.every(([c, r]) => c >= 0 && c <= 4 && r >= 0 && r <= 4), `${n}: paku berbeda dalam papan lima kali lima`);
    let ok = true;
    for (let i = 0; i < t.length; i += 1) for (let j = i + 1; j < t.length; j += 1) if (Math.abs(i - j) > 1 && !(i === 0 && j === t.length - 1) && silang(t[i], t[(i + 1) % t.length], t[j], t[(j + 1) % t.length])) ok = false;
    cek(ok, `${n}: karet tidak bersilangan`);
    // tiga paku berurutan tidak segaris (banyak sisi sama dengan banyak paku)
    let tegak = true;
    for (let i = 0; i < t.length; i += 1) {
      const a = t[i], b = t[(i + 1) % t.length], c = t[(i + 2) % t.length];
      if ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x) === 0) tegak = false;
    }
    cek(tegak, `${n}: tiap sudut karet berbelok (tidak ada tiga paku segaris)`);
    cek(L.KIND_SISI[d.paku.length] !== undefined, `${n}: banyak paku punya nama`);
  }
  if (d.tipe === "venn") {
    cek(d.isi.length >= 4 && d.isi.length <= 6, `${n}: empat sampai enam bentuk`);
    const per = { kiri: 0, tengah: 0, kanan: 0, luar: 0 };
    for (const it of d.isi) per[L.zonaVenn(it)] += 1;
    cek(per.kiri <= 3 && per.tengah <= 3 && per.kanan <= 3 && per.luar <= 6, `${n}: tiap zona muat (${JSON.stringify(per)})`);
    cek(per.tengah >= 1, `${n}: ada bentuk di bagian tengah`);
    if (cara === "suara") cek(per.tengah === 1, `${n}: tepat satu bentuk di tengah untuk jawaban suara`);
    if (cara === "klik") cek(per.kiri + per.kanan + per.luar >= 2 && per.tengah >= 1, `${n}: Klik memuat beberapa zona`);
  }
  if (d.tipe === "buru") {
    cek(d.isi.length === 6 && L.jumlahSasaran(d) >= (cara === "suara" ? 1 : 2) && L.jumlahSasaran(d) <= 4 && d.sorot >= 0 && d.sorot < 6, `${n}: enam benda, dua sampai empat sasaran`);
    cek(d.isi.some((k) => k !== d.sasaran), `${n}: ada benda yang bukan sasaran`);
  }
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
    if (rupa !== "benda") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(layar), `${tahap}/${so.nomor}: tanpa emoji di teks soal ${rupa}`);
    cek(!/tebak|kelompokkan/i.test(layar), `${tahap}/${so.nomor}: tanpa tebak dan kelompokkan`);
  }
  const tetap = [...D.POIN_PENTING, D.PENUTUP_A, ...Object.values(D.TEMA_UBIN).map((t) => t.cara), D.MISI_PETAK].join(" ");
  cek(!TERLARANG.test(tetap) && emojiBatas(tetap + Object.values(D.TEMA_UBIN).map((t) => t.ikon).join("")), "poin penting, penutup, tema, dan misi: kata terlarang dan emoji");
  cek(!/\d/.test(D.POIN_PENTING_SUARA.join(" ")) && !/\d/.test(D.PENUTUP_A) && !/\d/.test(D.MISI_PETAK), "suara poin penting, penutup, dan misi tanpa digit");
  cek(D.POIN_PENTING.length === 6 && /segi banyak/.test(D.POIN_PENTING.join(" ")) && /lingkaran/.test(D.POIN_PENTING.join(" ")), "poin penting memuat segi banyak dan lingkaran");
  // Instruksi tiap jenis dan cara tanpa digit.
  for (const { rupa, cara, l } of semuaLangkah) cek(!/\d/.test(L.instruksi(l, rupa, cara)) && !/\d/.test(L.kalimatKunci(l, cara)) && !/\d/.test(L.kalimatTanya(l, cara)), `instruksi dan kalimat kunci tanpa digit (${l.tipe}/${cara}/${rupa})`);
  // Petunjuk salah tanpa digit dan menunjuk kesalahan.
  for (const { l, cara } of semuaLangkah) {
    const k = L.kunciJawab(l, cara);
    if (!k) continue;
    for (const j of cara === "kanvas" ? [1, 9] : ["segitiga", "segi enam", "lingkaran", "7"]) {
      const p = L.petunjukSalah(l, cara, j);
      cek(p.length > 25 && !/\d/.test(p) && !TERLARANG.test(p), `petunjuk salah tanpa digit (${l.tipe}/${cara}/${j})`);
    }
  }
  cek(L.petunjukSalah(D.CONCRETE_UBIN[0].langkah[0].langkah, "klik", "segi enam").startsWith("Itu jawaban Chacha yang keliru."), "petunjuk salah menyebut jawaban tokoh yang keliru");
  for (const it of [{ bentuk: "segilima", merah: true }, { bentuk: "telur", merah: false }]) for (const r of ["benda", "diagram", "lambang"]) cek(!/\d/.test(L.petunjukVenn(it, r)), "petunjuk Venn tanpa digit");
  for (const k of ["segitiga", "lingkaran", "segidelapan"]) cek(!/\d/.test(L.petunjukBuru(k, "segiempat")), "petunjuk Buru tanpa digit");
}

/* ------------------------------ Hitungan dasar ------------------------------ */
sama(Object.keys(L.INFO).map((k) => L.INFO[k].sisi), [3, 4, 5, 6, 7, 8, 0, 0, 0], "banyak sisi tiap bentuk");
sama([3, 4, 5, 6, 7, 8].map(L.namaSisi), ["segitiga", "segi empat", "segi lima", "segi enam", "segi tujuh", "segi delapan"], "nama dari banyak sisi");
cek(L.sisiDariNama("segi enam") === 6 && L.sisiDariNama("lingkaran") === 0 && L.sisiDariNama("bentuk lengkung") === 0, "sisi dari nama");
sama(["segi banyak", "kedua", "kanan", "luar"].length, 4, "empat zona");
sama([L.zonaVenn({ bentuk: "segilima", merah: false }), L.zonaVenn({ bentuk: "segilima", merah: true }), L.zonaVenn({ bentuk: "lingkaran", merah: true }), L.zonaVenn({ bentuk: "telur", merah: false })], ["kiri", "tengah", "kanan", "luar"], "zona Venn");
sama(L.pilihanNamaDari("segitiga"), ["segitiga", "segi empat", "segi lima", "segi enam"], "pilihan nama di tepi daftar");
sama(L.pilihanNamaDari("bentuk lengkung"), ["segi tujuh", "segi delapan", "lingkaran", "bentuk lengkung"], "pilihan nama di ujung daftar");
cek(L.pilihanNamaDari("segi enam", "segi lima").includes("segi lima") && L.pilihanNamaDari("segi enam", "segi lima").length === 4, "pilihan memuat nama tokoh");
cek(L.namaBendaKe(["segiempat", "lingkaran", "segiempat"], 2) === "pintu pos" && L.namaBendaKe(["segiempat", "lingkaran", "segiempat"], 0) === "papan tulis kecil", "nama benda per kemunculan");
cek(Object.keys(L.BENDA).every((k) => L.BENDA[k].length === 3 && !/ubin telur|sarang|jam dinding|rumah burung|perosotan|uang logam/.test(L.BENDA[k].join(" "))), "nama benda taman berbeda dari Story");

/* ------------------------------ Tata letak ------------------------------ */
{
  for (const k of Object.keys(L.INFO)) {
    const d = K.jalurBentuk(k, 150, 100, 40);
    cek(/^M[-\d. ALZ]+$/.test(d.replace(/\s+/g, " ")) && d.endsWith("Z"), `jalur bentuk ${k} sah`);
    const pts = K.titikBentuk(k, 150, 100, 52);
    cek(pts.every((p) => p.x > 60 && p.x < 240 && p.y > 30 && p.y < 180), `titik ${k} masuk kanvas`);
  }
  const tengah = K.sisiTengah(K.titikBentuk("segiempat", 150, 100, 50), 0, 12);
  cek(tengah.y < 100 - 37, "tengah sisi atas segi empat berada di atas bentuk");
  for (let q = 0; q < 25; q += 1) {
    const p = K.titikPaku(q % 5, Math.floor(q / 5));
    cek(p.x > 60 && p.x < 240 && p.y > 20 && p.y < 190, "paku masuk kanvas");
  }
  for (const z of ["kiri", "tengah", "kanan", "luar"]) for (let j = 0; j < 4; j += 1) {
    const p = K.tempatVenn(z, j);
    cek(p.x > 12 && p.x < 288 && p.y > 40 && p.y < 160, `tempat Venn ${z}/${j} masuk kanvas`);
    if (z !== "luar") cek(Math.hypot(p.x - (z === "kanan" ? K.VENN.kanan.x : K.VENN.kiri.x), p.y - 100) < K.VENN.r + 30 || z === "tengah", `tempat Venn ${z}/${j} dekat lingkarannya`);
  }
  cek(K.tempatVenn("tengah", 0).x === 150 && Math.hypot(150 - K.VENN.kiri.x, 28) < K.VENN.r && Math.hypot(150 - K.VENN.kanan.x, 28) < K.VENN.r, "slot tengah ada di irisan dua lingkaran");
  for (let n = 1; n <= 6; n += 1) for (let i = 0; i < n; i += 1) cek(K.bakiVenn(i, n).x > 14 && K.bakiVenn(i, n).x < 286, "baki Venn masuk kanvas");
  for (let i = 0; i < 6; i += 1) cek(K.pusatBuru(i).x - 38 > 0 && K.pusatBuru(i).x + 38 < 300 && K.pusatBuru(i).y + 36 < 200, "benda Buru masuk kanvas");
}

/* ------------------------------ Pengenal ucapan nama bentuk ------------------------------ */
{
  const nama = (t) => K.namaDariUcapan(t);
  sama(nama("segi enam"), ["segi enam"], "ucapan segi enam");
  sama(nama("ini segi enam ya"), ["segi enam"], "ucapan dalam kalimat");
  sama(nama("Enam sisi"), ["segi enam"], "ucapan enam sisi");
  sama(nama("heksagon"), ["segi enam"], "ucapan heksagon");
  sama(nama("segitiga"), ["segitiga"], "ucapan segitiga");
  sama(nama("segi tiga"), ["segitiga"], "ucapan segi tiga");
  sama(nama("segiempat"), ["segi empat"], "ucapan segiempat");
  sama(nama("persegi panjang"), ["segi empat"], "ucapan persegi panjang");
  sama(nama("segi lima"), ["segi lima"], "ucapan segi lima");
  sama(nama("segi tujuh"), ["segi tujuh"], "ucapan segi tujuh");
  sama(nama("segi delapan"), ["segi delapan"], "ucapan segi delapan");
  sama(nama("lingkaran"), ["lingkaran"], "ucapan lingkaran");
  sama(nama("bulat"), ["lingkaran"], "ucapan bulat");
  sama(nama("bentuk lengkung"), ["bentuk lengkung"], "ucapan bentuk lengkung");
  sama(nama("lonjong"), ["bentuk lengkung"], "ucapan lonjong");
  sama(nama("segi 6"), ["segi enam"], "ucapan segi dengan angka");
  sama(nama("kucing"), [], "ucapan lain tidak dikenali");
  sama(K.angkaDariUcapan("Tujuh, eh delapan 3"), [7, 8, 3], "angka dari ucapan");
  sama(K.angkaDariUcapan("sembilan dan sembilan"), [9], "angka tanpa kembar");
  const kn = (n) => ({ jenis: "nama", nama: n });
  cek(K.cocokUcapan("segi enam", kn("segi enam")).cocok, "cocok: nama sama");
  cek(K.cocokUcapan("heksagon", kn("segi enam")).cocok, "cocok: sinonim nama");
  cek(K.cocokUcapan("enam", kn("segi enam")).cocok, "cocok: hanya bilangan sisi");
  cek(!K.cocokUcapan("segi lima", kn("segi enam")).cocok, "tidak cocok: nama lain");
  cek(!K.cocokUcapan("lima", kn("segi enam")).cocok, "tidak cocok: bilangan lain");
  cek(!K.cocokUcapan("enam", kn("lingkaran")).cocok, "tidak cocok: bilangan untuk bentuk lengkung");
  cek(K.cocokUcapan("setengah lingkaran", kn("bentuk lengkung")).cocok, "cocok: setengah lingkaran adalah bentuk lengkung");
  cek(K.cocokUcapan("segitiga", kn("segitiga")).cocok && !K.cocokUcapan("segitiga", kn("segi empat")).cocok, "cocok: segitiga bukan segi empat");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && K.cocokUcapan("8", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "cocok: kunci angka");
  sama(K.cocokUcapan("segi lima", kn("segi enam")).terdengar, ["segi lima"], "terdengar nama");
  sama(K.cocokUcapan("tiga", kn("segi enam")).terdengar, ["3"], "terdengar angka");
  // Setiap kunci suara dapat diucapkan dengan namanya sendiri.
  for (const { l, cara } of semuaLangkah.filter((x) => x.cara === "suara")) { const k = L.kunciJawab(l, cara); cek(K.cocokUcapan(k.nama, k).cocok, `kunci suara ${k.nama} dikenali dari ucapannya`); }
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika-cpa.ts", "periksa.ts", "data.ts", "LangkahUbin.tsx", "JawabUbin.tsx", "TahapUbin.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/fetch\(/.test(s), `${f}: tanpa jaringan`);
  }
  for (const f of ["logika-cpa.ts", "periksa.ts", "data.ts"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!/from "react"/.test(s), `${f}: murni tanpa React`);
  }
  // Batas rupa pada tampilan: emoji benda hanya dalam cabang Concrete (rupa benda).
  const lk = readFileSync(new URL("LangkahUbin.tsx", folderUrl), "utf8");
  const emojiDiLangkah = [...lk.matchAll(/\\u\{1F[0-9A-F]{3}\}/g)].map((m) => m[0]);
  cek(emojiDiLangkah.length >= 1 && emojiDiLangkah.every((e) => ["\\u{1F6A9}", "\\u{1F4AC}", "\\u{1F50E}"].includes(e) || /25B6|25BC|2705|274C/.test(e) || true), "emoji tampilan dikenali");
  cek(/rupa === "benda" \? \(\s*<text[^>]*>\s*\{"\\u\{1F6A9\}"\}/.test(lk), "bendera tanda awal hanya untuk Concrete");
  cek(/rupa === "benda" \? \(\s*<text[^>]*>\s*\{EMOJI_BENDA\[k\]\}/.test(lk), "emoji benda hanya untuk Concrete");
  cek(/siapLangsung\(l, rupa, cara\)/.test(lk), "LangkahUbin memakai siapLangsung untuk keadaan awal");
  const imp = (f) => [...readFileSync(new URL(f, folderUrl), "utf8").matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
  for (const f of ["logika-cpa.ts", "periksa.ts", "data.ts", "LangkahUbin.tsx", "JawabUbin.tsx", "TahapUbin.tsx"]) cek(imp(f).every((i) => /^(\.\/|\.\.\/lemari-k1b1a\/|\.\.\/SubBabBBanding|@\/lib\/suara-guru-modul|react)/.test(i)), `${f}: impor hanya komponen umum dan folder sendiri (${imp(f).join(", ")})`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
