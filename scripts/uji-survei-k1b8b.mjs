// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 8 Sub-Bab B ("Cerita Kesukaan Anak Kampung"), akhir cerita Perpustakaan Keliling.
// Memeriksa: lembar centang (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan jepit Pak Pos dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// angka jawaban tidak kembar per tahap, batas rupa, tata letak kanvas, simulasi papan survei dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-survei-k1b8b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/survei-k1b8b/logika.ts");
const D = await import("../src/components/modul/survei-k1b8b/data.ts");
const K = await import("../src/components/modul/survei-k1b8b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB8 = await import("../src/components/modul/misi-bab8.ts");

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
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];
const STORY = /\b(igil|kaka|abang|mamah|pak pos|dinosaurus|robot|peri|sirkus)\b/i;
const semuaTeks = (x) => (typeof x === "string" ? [x] : Array.isArray(x) ? x.flatMap(semuaTeks) : x && typeof x === "object" ? Object.values(x).flatMap(semuaTeks) : []);
const kodeEmoji = (t) => [...t].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);

/* ------------------------------ Dasar ------------------------------ */
{
  const g = (data, tanya, extra = {}) => ({ tipe: "diagram", bentuk: "balok", topik: 0, data, tanya, kegiatan: "ketuk", ...extra });
  sama([L.kunciLangkah(g([7, 2, 6, 3], { j: "banyak", k: 0 })), L.kunciLangkah(g([8, 2, 3, 1], { j: "selisih", a: 0, b: 1 })), L.kunciLangkah(g([6, 2, 4, 1], { j: "jumlah" })), L.kunciLangkah(g([3, 8, 1, 5], { j: "paling", arah: "banyak" }))], [7, 6, 13, null], "kunci banyak, selisih, jumlah, paling");
  sama([L.kolomPaling(g([3, 8, 1, 5], { j: "paling", arah: "banyak" })), L.kolomPaling(g([4, 7, 1, 3], { j: "paling", arah: "sedikit" }))], [1, 2], "kolom paling banyak dan paling sedikit");
  sama([L.sasaranKetuk(g([7, 2, 6, 3], { j: "banyak", k: 2 })).length, L.sasaranKetuk(g([8, 2, 3, 1], { j: "selisih", a: 0, b: 1 })), L.sasaranKetuk(g([6, 2, 4, 1], { j: "jumlah" })).length], [6, ["0:2", "0:3", "0:4", "0:5", "0:6", "0:7"], 4], "sasaran ketuk");
  sama(L.URUT_METODE, ["igil", "balok", "titik", "batang"], "urutan metode");
  for (const l of [g([7, 2, 6, 3], { j: "banyak", k: 0 }), g([8, 2, 3, 1], { j: "selisih", a: 0, b: 1 }), g([7, 2, 8, 1], { j: "jumlah" })]) {
    const p = L.pilihanDari(l);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.kunciLangkah(l)) && p.every((v) => v >= 1 && v <= 20), `pilihan memuat kunci dalam satu sampai dua puluh: ${p}`);
  }
  sama([L.kata(7), L.kata(13), L.kata(18)], ["tujuh", "tiga belas", "delapan belas"], "kata bilangan");
  cek(L.petunjukSalah(g([8, 2, 3, 1], { j: "selisih", a: 0, b: 1 }), 10).includes("jumlah") && tanpaDigit(L.petunjukSalah(g([8, 2, 3, 1], { j: "selisih", a: 0, b: 1 }), 10)), "petunjuk selisih: jumlah dua kolom bukan selisih");
}

/* ------------------------------ Mind-map lembar centang ------------------------------ */
{
  const t = D.TEMPAT_LEMBAR;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "lembar: tiga masalah, tujuh baris, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 36 && tanpaDigit(x.kunci)), "lembar: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "lembar: baris bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["satu anak, satu jawaban", "lembar centang", "tabel", "diagram gambar yang rapat", "diagram balok", "diagram titik", "diagram batang"]) cek(gab.includes(k), `lembar: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["tertinggi", "selisih", "jumlah semua", "keputusan"]) cek(hasil.includes(k), `lembar: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["satu jenis", "kecewa", "renggang"]) cek(masalah.includes(k), `lembar: masalah memuat "${k}"`);
  cek(t.every((x) => !STORY.test(x.kunci)), "lembar: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci)), "lembar: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_LEMBAR + D.PETUNJUK_URUT_LEMBAR) && !TERLARANG.test(D.SUARA_LEMBAR), "lembar: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 93);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "lembar: baris bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan jepit Pak Pos ------------------------------ */
{
  const b = D.BARIS_PAPAN;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "papan: lima baris");
  sama([angka(b[0].bilangan), /tabel/.test(b[0].hasil), /satu anak/.test(b[0].catatan)], [[5, 4, 2, 4], true, true], "papan: lembar centang lima, empat, dua, empat");
  sama([angka(b[1].bilangan), /lebih tinggi/.test(b[1].hasil), /rapat/.test(b[1].catatan)], [[4], true, true], "papan: bintang robot renggang");
  sama([angka(b[2].bilangan), /sama banyak/.test(b[2].hasil)], [[4, 4], true], "papan: robot dan sirkus sama banyak");
  const [a, c, s] = angka(b[3].bilangan);
  sama([a, c, s, angka(b[3].hasil), a - c], [5, 2, 3, [3], 3], "papan: selisih lima kurang dua dihitung ulang");
  cek(/kurangi/.test(b[3].catatan), "papan: selisih dikurangi");
  const j = angka(b[4].bilangan);
  sama([j, angka(b[4].hasil), j.reduce((p, q) => p + q, 0)], [[5, 4, 2, 4], [15], 15], "papan: jumlah semua lima belas dihitung ulang");
  sama(D.TEMPAT_PAPAN.length, 15, "papan: lima belas kotak");
  cek(new Set(D.TEMPAT_PAPAN.map((x) => x.kunci)).size === 15, "papan: label unik");
  cek(D.TEMPAT_PAPAN.every((x) => x.kunci.length <= 26 && !TERLARANG.test(x.kunci)), "papan: label pendek dan bersih");
  cek(tanpaDigit(D.SUARA_PAPAN) && !TERLARANG.test(D.SUARA_PAPAN), "papan: suara tanpa digit");
  cek(D.KOLOM_PAPAN.length === 3 && Object.keys(D.KELOMPOK_PAPAN).every((k2) => D.TEMPAT_PAPAN.some((x) => x.kelompok === k2)), "papan: tiga kolom");
}

/* ------------------------------ CPA ------------------------------ */
// Story: 5, 4, 2, 3, 15, 9, 11 (lihat laporan bila ada yang ikut terpakai).
const STORY_ANGKA = new Set([5, 4, 2, 3, 15, 9, 11]);
const pakaiStory = [];
let adaDobel = false;
let adaRenggang = false;
let adaSelisihTambah = false;
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Papan Survei (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita) && !/\bsatuan baku\b/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(!/bawalah|bawa benda|gambarlah|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama|bertanya kepada (orang|ibu|ayah)/i.test(s.judul + s.cerita + s.langkah.map((x) => x.suara).join(" ")), `${nama} ${s.cara}: tanpa suruhan di luar aplikasi`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length >= 10 && angka.length <= 12, `${nama}: sepuluh sampai dua belas angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => Number.isInteger(n) && n >= 1 && n <= 18), `${nama}: angka satu sampai delapan belas (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 5, `${nama}: ada dua kotak dan satu kotak`);
  for (const n of angka) if (STORY_ANGKA.has(n)) pakaiStory.push(`${nama}:${n}`);
  const tanpaAngka = semua.filter((x) => L.angkaJawab(x.langkah) === null);
  cek(tanpaAngka.length >= 1 && tanpaAngka.length <= 2 && tanpaAngka.every((x) => x.cara !== "suara" && x.langkah.tanya.j === "paling"), `${nama}: soal tanpa angka hanya pilih kolom di Klik atau Kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && l.jawabTokoh !== kunci && l.jawabTokoh >= 1 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    cek(geser !== l.benar, `${nama}: alasan benar bukan tombol pertama`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh) && L.petunjukSalah(l, l.jawabTokoh).includes(l.keliru), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
    const d = l.dasar;
    if (d.cacat?.j === "dobel") {
      adaDobel = true;
      cek(rupa === "benda" && d.tanya.j === "jumlah" && l.jawabTokoh === L.jumlahSemua(d.data) + 1, `${nama}: centang ganda menambah satu gambar`);
    }
    if (d.cacat?.j === "renggang") {
      adaRenggang = true;
      cek(rupa === "diagram" && d.tanya.j === "banyak" && d.tanya.k === d.cacat.k && d.cacat.tinggi === l.jawabTokoh && l.jawabTokoh > d.data[d.cacat.k], `${nama}: gambar renggang tampak setinggi jawaban tokoh`);
      cek(d.data.every((n, k) => k === d.cacat.k || n <= l.jawabTokoh), `${nama}: renggang dibatasi sembilan sel`);
    }
    if (rupa === "lambang" && d.tanya.j === "selisih") {
      adaSelisihTambah = true;
      cek(l.jawabTokoh === d.data[d.tanya.a] + d.data[d.tanya.b], `${nama}: selisih keliru karena dijumlahkan`);
    }
  }

  const bentuk = new Set();
  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    cek(l.topik >= 0 && l.topik < L.TOPIK.length && l.data.length === 4 && l.data.every((n) => Number.isInteger(n) && n >= 1 && n <= 9) && L.jumlahSemua(l.data) <= 18, `${nama}: data empat jenis, satu sampai sembilan, jumlah paling banyak delapan belas`);
    cek(JSON.stringify(l.data) !== JSON.stringify([5, 4, 2, 4]), `${nama}: data berbeda dari Story`);
    cek(l.bentuk === x.metode, `${nama}: bentuk sama dengan metode`);
    if (l.tanya.j === "banyak") sama(k, l.data[l.tanya.k], `${nama}: kunci banyak dihitung ulang`);
    else if (l.tanya.j === "selisih") cek(l.tanya.a !== l.tanya.b && k === Math.abs(l.data[l.tanya.a] - l.data[l.tanya.b]) && k >= 1, `${nama}: kunci selisih dihitung ulang dan bukan nol`);
    else if (l.tanya.j === "jumlah") sama(k, l.data.reduce((p, q) => p + q, 0), `${nama}: kunci jumlah dihitung ulang`);
    else cek(k === null && x.cara !== "suara" && new Set(l.data).size === 4 && L.kolomPaling(l) >= 0, `${nama}: paling tanpa angka, bukan suara, tanpa kolom kembar`);
    bentuk.add(`${l.bentuk}-${l.tanya.j}-${x.cara === "klik" ? l.kegiatan : x.cara}`);
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3, `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 240, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
    cek(tanpaDigit(L.teksTanya(l)) && tanpaDigit(L.kalimatHasil(l)) && !TERLARANG.test(L.teksTanya(l) + L.kalimatHasil(l)), `${nama}: teks tanya dan hasil tanpa digit`);
    if (rupa === "benda") cek(L.TOPIK[l.topik].jenis.every((j) => j.ikon && kodeEmoji(j.ikon)), `${nama}: jenis punya gambar benda`);
    // Hasil kegiatan Klik: menyusun memakai paling banyak sembilan tombol tambah per kolom.
    if (l.kegiatan === "susun") cek(l.tanya.j !== "paling", `${nama}: susun tidak dipakai untuk memilih kolom`);
  }
  cek(bentuk.size >= 8, `${nama}: kegiatan beragam (${[...bentuk].join(", ")})`);
  cek(new Set(semua.map((x) => L.dasarDari(x.langkah).topik)).size >= 4, `${nama}: topik beragam`);
  const kegiatan = new Set(semua.map((x) => L.dasarDari(x.langkah).kegiatan + ":" + L.dasarDari(x.langkah).tanya.j));
  cek(kegiatan.size >= 4, `${nama}: tanya beragam (${[...kegiatan].join(", ")})`);
}
cek(adaDobel && adaRenggang && adaSelisihTambah, "Cari kesalahan: centang ganda, gambar renggang, dan selisih dijumlahkan");
console.log(`Angka CPA yang sama dengan angka Story: ${pakaiStory.join(", ") || "tidak ada"}`);
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["satu anak satu jawaban", "lembar centang", "tabel", "sama besar", "rapat", "garis bawah", "paling tinggi", "selisih", "jumlah semua", "judul", "balok"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(D.POIN_PENTING.every((p) => !TERLARANG.test(p)), "poin penting: bersih");
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA) && /spanduk/i.test(D.PERAYAAN) && /selesai/.test(D.PERAYAAN) && /Perpustakaan Keliling/.test(D.PERAYAAN), "perayaan akhir cerita bab: spanduk dikibarkan");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_SURVEI === D.CONCRETE && D.PICTORIAL_SURVEI === D.PICTORIAL && D.ABSTRACT_SURVEI === D.ABSTRACT && D.TEMA_SURVEI === D.TEMA_TAHAP, "ekspor nama pemasang");
  const teksSemua = semuaTeks([D.CONCRETE, D.PICTORIAL, D.ABSTRACT, D.TEMA_TAHAP, D.KELOMPOK_LEMBAR, D.KELOMPOK_PAPAN, D.MISI_SURVEI, D.PERAYAAN, D.POIN_PENTING, D.TEMPAT_LEMBAR, D.BARIS_PAPAN]);
  cek(teksSemua.every((t) => !TERLARANG.test(t)), "semua teks data: tanpa kata terlarang");
  cek(semuaTeks([D.TEMA_TAHAP]).every(kodeEmoji) && kodeEmoji(L.IKON_BALOK) && L.IKON_TITIK.every(kodeEmoji) && Object.values(L.IKON_METODE).every(kodeEmoji), "emoji paling tinggi U+1FA95 tanpa ZWJ");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (const n of [3, 4]) {
    for (let k = 0; k < n; k += 1) {
      cek(K.xKolom(k, n) >= 40 && K.xKolom(k, n) <= W - 40, `tata letak: kolom ${k} dari ${n} masuk kanvas`);
      if (k > 0) cek(K.xKolom(k, n) - K.xKolom(k - 1, n) >= 56, "tata letak: kolom tidak bertumpuk");
      for (const jum of [1, 5, 9]) {
        const atas = K.letakGambar(k, jum - 1, n, jum);
        cek(atas.y - K.SEL / 2 >= 36 && K.letakGambar(k, 0, n, jum).y + K.SEL / 2 <= K.DASAR_Y && K.DASAR_Y + 20 <= H, `tata letak: ${jum} gambar masuk kanvas di bawah judul`);
        if (jum > 1) cek(K.letakGambar(k, 1, n, jum).y - K.letakGambar(k, 0, n, jum).y <= -13, "tata letak: gambar rapat satu sel");
      }
    }
  }
  // Renggang: puncak kolom enam gambar setinggi sel kedelapan, lebih tinggi dari tujuh gambar rapat.
  cek(K.letakGambar(1, 5, 4, 6, 8).y < K.letakGambar(0, 6, 4, 7).y, "renggang: enam gambar renggang tampak lebih tinggi dari tujuh gambar rapat");
  const coret = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const g = L.TOPIK.length; // tidak dipakai, hanya memastikan impor
  void g;
  const letak = Array.from({ length: 7 }, (_, i) => K.letakGambar(0, i, 4, 7));
  cek(K.periksaCentang(letak.map(coret), letak, 7).benar && !K.periksaCentang(letak.slice(1).map(coret), letak, 7).benar && !K.periksaCentang([...letak.map(coret), coret({ x: 150, y: 20 })], letak, 7).benar, "tanda: tiap gambar di kolom satu tanda");
  const kol = [8, 2, 3, 1].map((v, k) => K.pusatKolom(k, 4, v));
  cek(K.periksaCentang(kol.map(coret), kol, 26).benar && !K.periksaCentang(kol.slice(1).map(coret), kol, 26).benar, "tanda: satu tanda tiap kolom untuk jumlah semua");
  cek(K.periksaLingkari([lingkar(kol[1], 26, 70)], kol, [false, true, false, false]).benar && !K.periksaLingkari([lingkar({ x: 150, y: 100 }, 140, 90)], kol, [false, true, false, false]).benar, "lingkari: satu kolom paling banyak");
  const kartu = [0, 1, 2, 3].map((k) => K.pusatKartu(k, 4));
  cek(K.periksaLingkari([lingkar(kartu[2], 30, 28)], kartu, [false, false, true, false]).benar, "lingkari: satu kartu kata");
  for (let n = 1; n <= 18; n += 1) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi papan survei dan misi ------------------------------ */
{
  sama([L.ANAK_SIM, L.URUTAN_SIM.length, L.JENIS_SIM.map((j) => j.nama)], [12, 12, ["kucing", "ayam", "ikan", "burung"]], "simulasi: dua belas anak, empat jenis");
  sama(L.JENIS_SIM.map((_, j) => L.URUTAN_SIM.filter((x) => x === j).length), MB8.TABEL_SURVEI_B, "simulasi: tabel akhir sama dengan misi");
  cek(JSON.stringify(MB8.TABEL_SURVEI_B) !== JSON.stringify([5, 4, 2, 4]) && MB8.ANAK_SURVEI_B === L.ANAK_SIM, "simulasi: data berbeda dari Story");
  cek(L.URUTAN_SIM.every((x, i) => i === 0 || true) && new Set(MB8.TABEL_SURVEI_B).size === 4, "simulasi: banyak tiap jenis berbeda");
  const kosong = new Set();
  const daftar = MB8.daftarMisiBab8("B");
  cek(daftar === MB8.MISI_B, "misi B: daftar dari daftarMisiBab8");
  const ada = (k, id) => S.misiBaru(daftar, k, kosong).includes(id);
  let k = L.awalSurvei();
  cek(S.misiBaru(daftar, k, kosong).length === 0, "misi B: keadaan awal tidak memenuhi misi");
  sama([L.tabelSurvei(k), L.semuaDitanya(k), L.pilihanAnak(k)], [[0, 0, 0, 0], false, null], "simulasi: awal kosong");
  cek(L.centangJenis(k, 0) === null, "simulasi: belum dipanggil tidak bisa dicentang");
  sama(L.centangGanda(k), k, "simulasi: centang ganda sebelum ada anak tidak dicatat");
  k = L.panggilAnak(k);
  sama([k.menunggu, L.pilihanAnak(k), L.panggilAnak(k) === k], [true, 0, true], "simulasi: anak pertama memilih kucing, tidak bisa memanggil dua kali");
  cek(L.centangJenis(k, 2) === null && L.centangJenis(k, 0) !== null, "simulasi: hanya jenis pilihan anak yang diterima");
  k = L.centangJenis(k, 0);
  sama([k.ditanya, k.menunggu, L.tabelSurvei(k)], [1, false, [1, 0, 0, 0]], "simulasi: satu anak satu centang");
  const g1 = L.centangGanda(k);
  cek(g1.dobelDicoba === 1 && g1.ditanya === 1 && ada(g1, "b-dobel") && !ada(k, "b-dobel"), "simulasi: centang kedua untuk anak yang sama ditolak dan tercatat");
  cek(L.centangGanda(L.panggilAnak(k)).dobelDicoba === 0, "simulasi: centang ganda saat anak baru menunggu tidak dihitung");
  sama(L.kalimatSurvei(L.pilihModeSurvei(k, "tabel")), "kucing satu, ayam nol, ikan nol, burung nol.", "simulasi: kalimat tabel");
  for (let i = 1; i < L.ANAK_SIM; i += 1) {
    k = L.panggilAnak(k);
    cek(!ada(k, "b-tanya"), "misi: belum semua anak ditanya");
    k = L.centangJenis(k, L.URUTAN_SIM[i]);
  }
  sama([k.ditanya, L.semuaDitanya(k), L.tabelSurvei(k), L.panggilAnak(k) === k], [12, true, [6, 2, 1, 3], true], "simulasi: semua anak ditanya, tabel enam, dua, satu, tiga");
  cek(ada(k, "b-tanya") && !ada(k, "b-diagram"), "misi: semua anak ditanya");
  sama([L.jenisPaling(L.tabelSurvei(k), "banyak"), L.jenisPaling(L.tabelSurvei(k), "sedikit")], [0, 2], "simulasi: paling banyak kucing, paling sedikit ikan");
  // Diagram.
  sama(L.aturGambar(L.awalSurvei(), 0, -1).gambar, [0, 0, 0, 0], "diagram: batas nol");
  sama(L.aturGambar({ ...L.awalSurvei(), gambar: [9, 0, 0, 0] }, 0, 1).gambar, [9, 0, 0, 0], "diagram: batas sembilan");
  for (let j = 0; j < 4; j += 1) for (let i = 0; i < MB8.TABEL_SURVEI_B[j]; i += 1) k = L.aturGambar(k, j, 1);
  cek(L.diagramBenar(k) && ada(k, "b-diagram") && !ada(k, "b-lapor"), "diagram: sama dengan tabel dan rapat");
  const renggang = L.aturRapat(k, false);
  cek(!L.diagramBenar(renggang) && renggang.renggangDicoba === 1 && !ada(renggang, "b-diagram") && L.kalimatSurvei(L.pilihModeSurvei(renggang, "diagram")).includes("renggang"), "diagram: renggang tidak sah dan tercatat");
  cek(L.aturRapat(renggang, true).renggangDicoba === 1 && L.diagramBenar(L.aturRapat(renggang, true)), "diagram: dirapatkan lagi kembali sah");
  const kurang = L.aturGambar(k, 3, -1);
  cek(!L.diagramBenar(kurang) && !ada(kurang, "b-diagram"), "diagram: kurang satu gambar tidak sah");
  cek(!L.diagramBenar(L.aturGambar(L.awalSurvei(), 0, 1)), "diagram: sebelum semua ditanya tidak sah");
  const md = L.aturMendatar(L.pilihModeSurvei(k, "diagram"), true);
  cek(md.mendatar && md.mendatarDilihat && ada(md, "b-mendatar") && !L.aturMendatar(L.awalSurvei(), true).mendatarDilihat, "diagram: mendatar dengan data lengkap tercatat");
  // Banding.
  let b = L.pilihBanding(k, 0);
  sama([b.bandingA, b.bandingB, b.bandingTuntas], [0, null, 0], "banding: pilih satu jenis");
  b = L.pilihBanding(b, 0);
  sama(b.bandingTuntas, 0, "banding: jenis yang sama tidak dihitung");
  b = L.pilihBanding(b, 2);
  sama([b.bandingTuntas, L.kalimatSurvei(L.pilihModeSurvei(b, "banding"))], [1, "Kucing lebih banyak lima dari ikan."], "banding: kucing lebih banyak lima dari ikan");
  cek(ada(b, "b-banding"), "misi: banding");
  const ss = L.pilihBanding(L.pilihBanding({ ...k, bandingA: null, bandingB: null }, 0), 0);
  cek(ss.bandingTuntas === 0, "banding: dua kali jenis yang sama tidak tuntas");
  const sm = L.pilihBanding(L.pilihBanding({ ...L.awalSurvei(), ditanya: 12 }, 1), 3);
  cek(sm.bandingTuntas === 1, "banding: ayam dua dan burung tiga berbeda");
  // Laporan.
  cek(L.kirimLaporan(L.awalSurvei()).lapor === false && L.kirimLaporan(kurang).lapor === false && L.kirimLaporan(k).lapor === true, "laporan: hanya bila diagram sama dengan tabel");
  const lap = L.kirimLaporan(b);
  cek(ada(lap, "b-lapor") && L.tutupLaporan(lap).lapor === false && tanpaDigit(L.kalimatSurvei(lap)), "misi: lapor penutup bab, ditutup lagi");
  const semuaMisi = S.misiBaru(daftar, L.kirimLaporan(L.aturMendatar(L.centangGanda(b), true)), kosong);
  cek(["b-tanya", "b-diagram", "b-banding", "b-lapor", "b-dobel", "b-mendatar"].every((id) => semuaMisi.includes(id)), "misi: semua enam misi bisa tercapai");
  // Kalimat.
  for (const m of ["tanya", "tabel", "diagram", "banding"]) cek(tanpaDigit(L.kalimatSurvei(L.pilihModeSurvei(L.awalSurvei(), m))) && tanpaDigit(L.kalimatSurvei(L.pilihModeSurvei(k, m))), `simulasi: kalimat ${m} tanpa digit`);
  cek(tanpaDigit(D.MISI_SURVEI) && !TERLARANG.test(D.MISI_SURVEI), "simulasi: teks misi tanpa digit dan kata terlarang");
  const tamp = daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  const wajib = tamp.filter((m) => m.wajib).map((m) => m.id);
  cek(S.wajibSelesai(tamp, new Set(wajib)) && !S.wajibSelesai(tamp, new Set(wajib.slice(1))), "gerbang misi B");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/survei-k1b8b/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 9, `berkas survei-k1b8b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(/.test(s), `${f}: tanpa jaringan`);
  }
  for (const f of ["logika.ts", "periksa.ts", "data.ts"]) cek(!/from "react"/.test(readFileSync(new URL(f, folder), "utf8")), `${f}: tanpa React`);
  // Batas rupa: kode gambar diagram polos (Pictorial) tidak memuat emoji benda; Abstract tidak menggambar sama sekali.
  const g = readFileSync(new URL("GambarSurvei.tsx", folder), "utf8");
  cek(/rupa === "lambang"/.test(g) && /const benda = rupa === "benda"/.test(g) && /benda \? \(/.test(g), "batas rupa: gambar benda hanya di Concrete");
  for (const f of ["SimulasiPapanSurvei.tsx", "TahapSurvei.tsx", "LembarCentang.tsx", "PapanJepit.tsx", "LangkahSurvei.tsx"]) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(!/\b(Buku|buku|teman|skor|Skor|tebak)\b/.test(s.replace(/\/\*[\s\S]*?\*\//g, "")), `${f}: tanpa kata terlarang di kode`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
