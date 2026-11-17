// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab C ("Tangga Gudang Loteng").
// Memeriksa: tangga belajar (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan gabus dari data Story, CPA dua belas soal
// per tahap (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan berbeda dari Story,
// pemeriksa kanvas (urutan garis, lingkari jalur, tanda langkah, lompatan tongkat), simulasi tangga loteng dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-loteng-k1b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/loteng-k1b1c/logika.ts");
const D = await import("../src/components/modul/loteng-k1b1c/data.ts");
const K = await import("../src/components/modul/loteng-k1b1c/periksa.ts");
const M = await import("../src/components/modul/misi-bab1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|tambah|kurang|jumlah|skor|nilai)\b/i;

/* ------------------------------ Mind-map tangga ------------------------------ */
{
  const t = D.TEMPAT_TANGGA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 9, 3], "tangga: tiga masalah, sembilan anak tangga, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "tangga: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7, 8, 9], "tangga: anak tangga bernomor satu sampai sembilan");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["maju", "mundur", "mana saja", "lanjut", "sebelum", "sesudah", "jalur", "tongkat", "hilang"]) cek(gab.includes(k), `tangga: langkah memuat "${k}"`);
  const CERITA = /kardus|loteng|igil|kaka|abang|mamah|gudang|pesta|rak\b/i;
  cek(t.every((x) => !CERITA.test(x.kunci)) && !CERITA.test(D.PUSAT_TANGGA), "tangga: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_TANGGA + D.PETUNJUK_URUT_TANGGA) && !TERLARANG.test(D.SUARA_TANGGA), "tangga: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 53);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "tangga: anak tangga hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan gabus ------------------------------ */
{
  const b = D.BARIS_GABUS;
  sama(b.map((x) => x.angka), ["1 sampai 10", "10 sampai 0", "5, 6, 7, 8", "5 dan 7", "1, 2, ?, 4", "9, 8, ?, 6"], "gabus: deret angka dari Story");
  sama(b.map((x) => x.hasil), ["Makin besar", "Makin kecil", "Tidak dari 1", "Tetangga 6", "Hilang 3", "Hilang 7"], "gabus: hasil dari Story");
  // Nomor yang hilang dihitung ulang dari deret.
  for (const [i, h] of [[4, 3], [5, 7]]) {
    const d = b[i].angka.split(", ").map((v) => (v === "?" ? null : Number(v)));
    sama(L.kunciLangkah({ tipe: "lengkapi", deret: d }), h, `gabus: hilang ${h} dihitung ulang`);
  }
  sama(D.TEMPAT_GABUS.length, 18, "gabus: delapan belas kertas");
  cek(D.TEMPAT_GABUS.every((x) => x.kunci.length <= 20) && !/\d/.test(D.SUARA_GABUS), "gabus: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const STORY = { lengkapi: new Set(["3", "7"]), jalur: new Set([4, 6]), lanjut: new Set(["6-maju-3"]), tongkat: new Set(["7-5", "3-5"]) };
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga kelompok cara`);
  sama(soal.map((s) => Number(/Loteng (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: jawaban nol sampai sepuluh`);
  for (const x of semua) {
    const l = x.langkah;
    let harus = null;
    if (l.tipe === "lengkapi") {
      const i = l.deret.indexOf(null);
      const isi = l.deret.map((v, j) => [v, j]).filter(([v]) => v !== null);
      const beda = (isi[1][0] - isi[0][0]) / (isi[1][1] - isi[0][1]);
      harus = isi[0][0] + beda * (i - isi[0][1]);
      cek(L.deretUrut(l.deret) && Math.abs(beda) === 1, `${nama}: deret lengkapi urut satu-satu`);
      cek(!STORY.lengkapi.has(String(harus)), `${nama}: nomor hilang berbeda dari Story`);
    }
    if (l.tipe === "jalur") {
      harus = l.tanya === "sesudah" ? l.n + 1 : l.n - 1;
      cek(!STORY.jalur.has(l.n), `${nama}: jalur berbeda dari Story`);
    }
    if (l.tipe === "lanjut") {
      harus = l.arah === "maju" ? l.mulai + l.langkah : l.mulai - l.langkah;
      cek(!STORY.lanjut.has(`${l.mulai}-${l.arah}-${l.langkah}`) && l.langkah >= 2, `${nama}: hitung lanjut berbeda dari Story`);
      sama(L.deretLanjut(l).at(-1), harus, `${nama}: deret hitung lanjut berakhir di kunci`);
    }
    if (l.tipe === "tongkat") {
      harus = l.tutup;
      cek(!STORY.tongkat.has(`${l.tutup}-${l.dari}`) && l.tutup !== l.dari && Math.abs(l.tutup - l.dari) <= 5, `${nama}: tongkat berbeda dari Story dan dekat angka yang terlihat`);
      sama(L.deretTongkat(l).at(-1), l.tutup, `${nama}: deret tongkat berakhir di tanda tanya`);
    }
    if (l.tipe === "susun") {
      cek(L.deretUrut(l.deret) && l.deret.length === 5 && l.deret.every((v) => v >= 0 && v <= 10), `${nama}: deret susun urut lima kartu`);
      const a = L.acakSusun(l.deret, 7);
      cek(a.join() !== l.deret.join() && [...a].sort().join() === [...l.deret].sort().join(), `${nama}: kartu susun diacak`);
      cek(x.cara !== "suara", `${nama}: susun bukan soal suara`);
    }
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci (${p})`);
      cek(harus >= 0 && harus <= 10, `${nama}: kunci nol sampai sepuluh`);
    }
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "susun" && L.arahDeret(l.deret) === "maju") || L2.some((l) => l.tipe === "susun" && L.arahDeret(l.deret) === "mundur"), `${nama}: ada susun`);
  cek(L2.some((l) => l.tipe === "jalur" && l.tanya === "sebelum") && L2.some((l) => l.tipe === "jalur" && l.tanya === "sesudah"), `${nama}: sebelum dan sesudah`);
  cek(L2.some((l) => l.tipe === "lanjut" && l.arah === "maju") && L2.some((l) => l.tipe === "lanjut" && l.arah === "mundur"), `${nama}: hitung lanjut maju dan mundur`);
}
{
  const semua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((s) => s.langkah.map((x) => x.langkah));
  cek(semua.filter((l) => l.tipe === "susun").some((l) => L.arahDeret(l.deret) === "maju") && semua.filter((l) => l.tipe === "susun").some((l) => L.arahDeret(l.deret) === "mundur"), "CPA: susun maju dan mundur (Story: naik dan turun)");
  cek(semua.filter((l) => l.tipe === "lengkapi").some((l) => L.arahLengkapi(l.deret) === "maju") && semua.filter((l) => l.tipe === "lengkapi").some((l) => L.arahLengkapi(l.deret) === "mundur"), "CPA: lengkapi maju dan mundur (Story: hilang tiga dan tujuh)");
  cek(semua.filter((l) => l.tipe === "tongkat").some((l) => l.dari === 0) && semua.filter((l) => l.tipe === "tongkat").some((l) => l.dari === 5) && semua.filter((l) => l.tipe === "tongkat").some((l) => l.dari === 10), "CPA: tongkat dari nol, lima, dan sepuluh");
  cek(semua.some((l) => l.tipe === "susun" && l.deret[0] !== 1 && l.deret[0] !== 10), "CPA: mulai dari tengah (Story: dari lima)");
}

/* ------------------------------ Kanvas ------------------------------ */
{
  const garis = (pts) => pts.flatMap((p, i) => (i === 0 ? [p] : Array.from({ length: 6 }, (_, j) => ({ x: pts[i - 1].x + ((p.x - pts[i - 1].x) * (j + 1)) / 6, y: pts[i - 1].y + ((p.y - pts[i - 1].y) * (j + 1)) / 6 }))));
  const urut = [0, 1, 2, 3, 4].map((i) => K.letakSusun(i));
  cek(K.periksaUrutan([garis(urut)], urut).benar, "urutan: satu garis berurutan diterima");
  cek(K.periksaUrutan([garis(urut.slice(0, 3)), garis(urut.slice(2))], urut).benar, "urutan: beberapa garis berurutan diterima");
  cek(!K.periksaUrutan([garis([urut[1], urut[0], urut[2], urut[3], urut[4]])], urut).benar, "urutan: salah urut ditolak");
  cek(!K.periksaUrutan([garis(urut.slice(0, 4))], urut).benar, "urutan: terlewat ditolak");
  const lingkar = (c, r) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + r * Math.cos((i / 23) * 2 * Math.PI), y: c.y + r * Math.sin((i / 23) * 2 * Math.PI) }))];
  for (const rupa of ["benda", "diagram", "lambang"]) for (let n = 0; n <= 10; n += 1) {
    const r = K.periksaLingkariJalur(lingkar(K.pusatJalur(rupa, n), 11), rupa, n);
    if (!r.benar) cek(false, `lingkari jalur ${rupa} ${n}`);
    if (K.periksaLingkariJalur(lingkar(K.pusatJalur(rupa, n), 11), rupa, n === 10 ? 9 : n + 1).benar) cek(false, `lingkari jalur ${rupa} ${n}: tempat lain ditolak`);
  }
  cek(true, "lingkari jalur");
  const t = K.tataLanjut(2, 4, true);
  const tanda = (pts) => pts.map((p) => [{ x: p.x - 4, y: p.y }, { x: p.x, y: p.y + 4 }, { x: p.x + 6, y: p.y - 6 }]);
  cek(K.periksaTandaLanjut(tanda(t.dihitung), t.dihitung).benar && !K.periksaTandaLanjut(tanda(t.dihitung.slice(1)), t.dihitung).benar, "tanda hitung lanjut maju");
  const m = K.tataLanjut(7, 2, false);
  sama(m.dihitung.length, 2, "hitung lanjut mundur: dua yang diambil");
  cek(m.dihitung[0].x > m.dihitung[1].x, "hitung lanjut mundur: mulai dari paling kanan");
  cek(K.periksaLompat([garis([K.titikTongkat(10), K.titikTongkat(7)])], 10, 7) && !K.periksaLompat([garis([K.titikTongkat(5), K.titikTongkat(7)])], 10, 7), "lompatan tongkat dari angka yang terlihat");
  for (let n = 0; n <= 10; n += 1) cek(K.pusatJalur("benda", n).y > 10 && K.titikTongkat(n).x < 290, `tata jalur dan tongkat ${n} masuk kanvas`);
}

/* ------------------------------ Simulasi tangga loteng ------------------------------ */
{
  let k = L.awalLoteng(D.HILANG_SIM, 5);
  sama([k.pos, k.kardus.length, k.kardus.filter((x) => !x.bernomor).map((x) => x.nomor).sort((a, b) => a - b)], [0, 10, [4, 9]], "loteng: awal di lantai, sepuluh kardus, empat dan sembilan tanpa nomor");
  cek(!D.HILANG_SIM.includes(3) && !D.HILANG_SIM.includes(7), "loteng: berbeda dari Story");
  for (let i = 0; i < 12; i += 1) k = L.langkahTangga(k, 1);
  sama([k.pos, k.puncak, k.turun], [10, true, false], "loteng: naik sampai sepuluh, berhenti");
  for (let i = 0; i < 12; i += 1) k = L.langkahTangga(k, -1);
  sama([k.pos, k.turun], [0, true], "loteng: turun sampai nol");
  const id = (n) => `kd${n}`;
  cek(L.taruhKardus(k, id(5), 6).tolak === "nomor", "loteng: kardus lima ditolak di tempat enam");
  cek(L.taruhKardus(k, id(4), 4).tolak === "tetangga", "loteng: tanpa nomor ditolak sebelum tetangga terisi");
  for (const n of [1, 2, 3, 5, 6, 7, 8, 10]) k = L.taruhKardus(k, id(n), n).k;
  cek(L.bernomorDiRak(k) && !L.hilangTerisi(k), "loteng: kardus bernomor tersusun");
  cek(L.taruhKardus(k, id(4), 9).tolak === "nomor" && !L.taruhKardus(k, id(4), 4).tolak, "loteng: empat masuk di tempat empat");
  k = L.taruhKardus(L.taruhKardus(k, id(4), 4).k, id(9), 9).k;
  cek(L.hilangTerisi(k) && L.rakPenuh(k), "loteng: rak penuh");
  cek(L.taruhKardus(k, id(9), 9).tolak === "terisi", "loteng: tempat terisi ditolak");
  for (let p = 0; p <= 10; p += 1) cek(!/\d/.test(L.kalimatTangga({ ...k, pos: p })), `loteng: kalimat tanpa digit ${p}`);
  const daftar = M.daftarMisiBab1("C");
  const ada = (st, mid) => S.misiBaru(daftar, st, new Set()).includes(mid);
  const awal = L.awalLoteng(D.HILANG_SIM, 5);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi C: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi C: awal belum tercapai");
  cek(ada(k, "c-naik") && ada(k, "c-turun") && ada(k, "c-susun") && ada(k, "c-hilang"), "misi C: semua wajib bisa dicapai");
  cek(ada({ ...k, bacaMundur: true }, "c-baca") && ada({ ...awal, pos: 8 }, "c-sesudah"), "misi C: bebas");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/loteng-k1b1c/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas loteng-k1b1c (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
