// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab C ("Tutup Pasar Malam"), akhir cerita Pasar Malam Kampung.
// Memeriksa: kincir ria (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan laporan dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// dua belas angka jawaban tidak kembar per tahap dan pasangan bilangan berbeda dari Story, batas rupa, tata letak kanvas,
// simulasi Meja Tutup Lapak dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-tutup-k1b6c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tutup-k1b6c/logika.ts");
const D = await import("../src/components/modul/tutup-k1b6c/data.ts");
const K = await import("../src/components/modul/tutup-k1b6c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const M6 = await import("../src/components/modul/misi-bab6.ts");
const folderUrl = new URL("../src/components/modul/tutup-k1b6c/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|kali|bagi|dikali|dibagi)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];

/* ------------------------------ Dasar ------------------------------ */
{
  sama([L.satuan(17), L.satuan(20), L.bagianSatuan({ a: 15 }), L.bagianSepuluh({ a: 15, b: 8 })], [7, 0, 5, 3], "satuan dan bagian lewat sepuluh");
  sama([L.kunciLangkah({ tipe: "igil", a: 14, b: 3, jenis: "x" }), L.kunciLangkah({ tipe: "pikir", a: 19, b: 9, jenis: "x" })], [11, 10], "kunci sisa");
  cek(L.soalSah({ tipe: "igil", a: 14, b: 3, jenis: "x" }) && !L.soalSah({ tipe: "igil", a: 14, b: 6, jenis: "x" }), "igil sah bila satuannya cukup");
  cek(L.soalSah({ tipe: "lewat", a: 15, b: 8, jenis: "x" }) && !L.soalSah({ tipe: "lewat", a: 17, b: 5, jenis: "x" }), "lewat sah bila satuannya kurang");
  cek(L.soalSah({ tipe: "keluarga", a: 13, b: 6, jenis: "x" }) && !L.soalSah({ tipe: "keluarga", a: 14, b: 7, jenis: "x" }) && !L.soalSah({ tipe: "keluarga", a: 12, b: 3, jenis: "x" }), "keluarga: dua bagian empat sampai sembilan dan berbeda");
  for (const l of [{ tipe: "igil", a: 17, b: 2, jenis: "x" }, { tipe: "lewat", a: 13, b: 9, jenis: "x" }, { tipe: "pikir", a: 11, b: 8, jenis: "x" }]) {
    const i = L.instruksi(l, "benda", "klik", "apel");
    cek(tanpaDigit(i) && i.length <= 170, `instruksi contoh tanpa digit ("${i}")`);
  }
}

/* ------------------------------ Mind-map kincir ria ------------------------------ */
{
  const t = D.TEMPAT_KINCIR;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "kincir: tiga masalah, tujuh gondola, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "kincir: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "kincir: gondola bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["hitung mundur", "kurangi satuan, puluhan tetap", "periksa dengan menambah", "pikir penjumlahan", "keluarga kalimat", "kurangi lewat sepuluh", "pilih cara"]) cek(gab.includes(k), `kincir: langkah memuat "${k}"`);
  const urutan = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci);
  cek(urutan.indexOf("Pikir Penjumlahan") < urutan.indexOf("Keluarga Kalimat") && urutan.indexOf("Keluarga Kalimat") < urutan.indexOf("Kurangi Lewat Sepuluh") && urutan[6] === "Pilih cara yang pas", "kincir: tiga metode global berurutan, memilih cara paling akhir");
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["sisa", "puluhan tetap", "ditambah kembali", "hasilnya sama"]) cek(hasil.includes(k), `kincir: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(kue|balon|lapak|pasar|dagangan|karcis|loket|nampan|lampion|igil|kaka|abang|mamah|rt)\b/i.test(x.kunci)), "kincir: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci) && !/[=+–]/.test(x.kunci)), "kincir: label tanpa kata terlarang dan lambang");
  cek(tanpaDigit(D.SUARA_KINCIR + D.PETUNJUK_URUT_KINCIR) && !TERLARANG.test(D.SUARA_KINCIR), "kincir: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 61);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "kincir: gondola hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan laporan ------------------------------ */
{
  const b = D.BARIS_LAPORAN;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "laporan: lima baris");
  const [a1, d1, h1] = [angka(b[0].semula)[0], angka(b[0].ubah)[0], angka(b[0].hasil)[0]];
  sama([a1, d1, h1], [16, 3, 13], "laporan: kue cubit enam belas dimakan tiga sisa tiga belas");
  sama([angka(b[1].semula)[0] - angka(b[1].ubah)[0], angka(b[1].hasil)[0]], [14, 14], "laporan: balon delapan belas lepas empat dihitung ulang");
  sama([angka(b[2].semula)[0] - angka(b[2].ubah)[0], angka(b[2].hasil)[0]], [12, 12], "laporan: mundur tiga dari lima belas dihitung ulang");
  sama([angka(b[3].semula)[0] + angka(b[3].ubah)[0], angka(b[3].hasil)[0]], [16, 16], "laporan: periksa dengan menambah kembali ke enam belas");
  sama([angka(b[4].semula)[0] - angka(b[4].ubah)[0], angka(b[4].hasil)[0]], [12, 12], "laporan: tujuh belas dikurangi lima");
  sama(D.TEMPAT_LAPORAN.length, 15, "laporan: lima belas kotak");
  cek(new Set(D.TEMPAT_LAPORAN.map((x) => x.kunci)).size === 15, "laporan: label unik");
  cek(D.TEMPAT_LAPORAN.every((x) => x.kunci.length <= 24) && tanpaDigit(D.SUARA_LAPORAN) && !TERLARANG.test(D.SUARA_LAPORAN), "laporan: label pendek, suara tanpa digit");
  cek(D.KOLOM_LAPORAN.length === 3 && Object.keys(D.KELOMPOK_LAPORAN).every((k2) => D.TEMPAT_LAPORAN.some((x) => x.kelompok === k2)), "laporan: tiga kolom");
}

/* ------------------------------ CPA ------------------------------ */
// Story: enam belas dikurangi tiga, lima belas mundur tiga, delapan belas dikurangi empat, tujuh belas dikurangi lima, empat belas dikurangi sembilan,
// serta contoh metode global (lima belas dikurangi tujuh, empat belas dikurangi enam, dua belas dikurangi lima atau tujuh, tiga belas dikurangi lima, sembilan belas dikurangi dua).
const PASANGAN_STORY = new Set(["16-3", "15-3", "18-4", "17-5", "15-7", "14-6", "12-5", "12-7", "13-5", "19-2", "14-9", "16-7", "16-9", "13-3", "14-4"]);
const HASIL_STORY = new Set([12, 13, 14, 16, 18]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Pasar Malam (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(s.langkah.every((x) => /Think Addition|Fact Family|Subtract Through Ten|Metode IGIL/.test(L.NAMA_METODE[x.metode])), `${nama} ${s.cara}: nama Inggris metode di judul soal`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah));
  cek(new Set(angka).size === angka.length && angka.length === 12, `${nama}: dua belas angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 2 && n <= 19), `${nama}: angka dua sampai sembilan belas (${angka.join(",")})`);
  cek(angka.filter((n) => HASIL_STORY.has(n)).length <= 2, `${nama}: paling banyak dua jawaban sama dengan hasil Story (${angka.filter((n) => HASIL_STORY.has(n)).join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 3, `${nama}: ada belasan dan satuan`);
  cek(semua.filter((x) => L.angkaJawab(x.langkah) >= 10 && x.cara === "kanvas").length >= 1 || nama !== "Concrete", `${nama}: ada jawaban dua angka di kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t)), `${nama}: Cari kesalahan tanpa digit`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }

  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    cek(L.soalSah(l), `${nama} ${x.metode}/${x.cara}: soal sah menurut metodenya (${l.a} - ${l.b})`);
    cek(!PASANGAN_STORY.has(`${l.a}-${l.b}`), `${nama}: pasangan ${l.a}-${l.b} berbeda dari Story`);
    sama(k, l.a - l.b, `${nama}: kunci dihitung ulang`);
    // Batas rupa.
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: benda ${l.jenis} punya gambar dan warna`);
    else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    const p = L.pilihanDari(x.langkah);
    cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit dan paling panjang 170 huruf ("${x.suara}")`);
  }
  // Tiap metode muncul di tiga cara dengan bilangan yang berbeda.
  for (const m of L.URUT_METODE) {
    const pasangan = semua.filter((x) => x.metode === m).map((x) => `${L.dasarDari(x.langkah).a}-${L.dasarDari(x.langkah).b}`);
    cek(new Set(pasangan).size === 3, `${nama} ${m}: tiga pasangan bilangan berbeda`);
  }
}
{
  // Pasangan yang sama tidak diulang di dalam satu tahap.
  cek(
    [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].every((soal) => {
      const p = soal.flatMap((s) => s.langkah.map((x) => `${L.dasarDari(x.langkah).a}-${L.dasarDari(x.langkah).b}`));
      return new Set(p).size === p.length;
    }),
    "pasangan bilangan tidak diulang dalam satu tahap",
  );
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every((t) => tanpaDigit(t) && !/[=+–?]/.test(t)), "poin penting: suara tanpa digit dan lambang");
  for (const k of ["satuannya dulu", "puluhannya tetap", "mundur", "Pikir Penjumlahan", "Keluarga Kalimat", "Kurangi Lewat Sepuluh", "Periksa", "menambah"]) cek(D.POIN_PENTING.some((p) => p.includes(k)), `poin penting memuat "${k}"`);
  cek(D.POIN_PENTING.every((p) => (p.match(/\d+/g) ?? []).every((d) => Number(d) <= 20)), "poin penting: angka paling besar dua puluh");
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA) && /ditutup/i.test(D.PERAYAAN) && /selesai/.test(D.PERAYAAN), "perayaan akhir cerita bab: pasar malam ditutup");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_TUTUP === D.CONCRETE && D.PICTORIAL_TUTUP === D.PICTORIAL && D.ABSTRACT_TUTUP === D.ABSTRACT && D.TEMA_TUTUP === D.TEMA_TAHAP, "ekspor nama pemasang");
  sama(D.LANGKAH_LEWAT.length, 3, "urutan langkah lewat sepuluh: tiga langkah");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const r = K.KISI.ukuran / 2;
  const t = Array.from({ length: 20 }, (_, i) => K.letakKisi(i));
  cek(t.every((p) => p.x - r >= 0 && p.x + r <= W && p.y - r >= 28 && p.y + r <= H), "kisi: dua puluh butir masuk kanvas");
  cek(t.every((p, i) => t.every((q, j) => i === j || Math.hypot(p.x - q.x, p.y - q.y) >= K.KISI.ukuran + 2)), "kisi: butir tidak bertumpuk");
  cek(t.slice(0, 10).every((p) => p.x - r > K.IKATAN.x && p.x + r < K.IKATAN.x + K.IKATAN.w && p.y - r > K.IKATAN.y && p.y + r < K.IKATAN.y + K.IKATAN.h), "kisi: sepuluh butir pertama di dalam bingkai ikatan");
  cek(t.slice(10).every((p) => p.y - r > K.IKATAN.y + K.IKATAN.h), "kisi: satuan di bawah bingkai ikatan");
  cek(K.IKATAN.y - 12 > 28, "kisi: tulisan ikatan di bawah judul");
  for (let g = 0; g < 2; g += 1) {
    const b = K.BAGIAN[g];
    cek(b.x >= 0 && b.x + b.w <= W && b.y >= 28 && b.y + b.h + 20 <= H, `bagian ${g} masuk kanvas`);
    const p = Array.from({ length: 9 }, (_, i) => K.letakBagian(g, i));
    cek(p.every((q) => q.x - 11 > b.x && q.x + 11 < b.x + b.w && q.y - 11 > b.y && q.y + 11 < b.y + b.h), `bagian ${g}: sembilan butir di dalam kotak`);
    cek(p.every((q, i) => p.every((s, j) => i === j || Math.hypot(q.x - s.x, q.y - s.y) >= 24)), `bagian ${g}: butir tidak bertumpuk`);
  }
  cek(K.BAGIAN[1].x - (K.BAGIAN[0].x + K.BAGIAN[0].w) >= 8, "dua bagian tidak bertumpuk");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const sasaran = (n, kurang) => Array.from({ length: n }, (_, i) => i < n - kurang);
  const semua = Array.from({ length: 17 }, (_, i) => K.letakKisi(i));
  // Igil: tujuh belas butir, dua dicoret (indeks lima belas dan enam belas): lingkari sepuluh di atas dan lima di bawah.
  const atas = lingkar({ x: 150, y: K.KISI.y0 }, 150, 22);
  const bawah = lingkar({ x: K.letakKisi(12).x - 4, y: K.letakKisi(12).y }, 70, 20);
  cek(K.periksaLingkari([atas, bawah], semua, sasaran(17, 2)).benar, "igil: dua lingkaran untuk sisa");
  cek(!K.periksaLingkari([lingkar({ x: 150, y: 110 }, 150, 80)], semua, sasaran(17, 2)).benar, "igil: satu lingkaran terlalu besar ditolak");
  const bg = [0, 1].map(K.pusatBagian);
  cek(K.periksaLingkari([lingkar(bg[1], 60, 45)], bg, [false, true]).benar && !K.periksaLingkari([lingkar(bg[0], 60, 45)], bg, [false, true]).benar && !K.periksaLingkari([lingkar({ x: 150, y: 100 }, 150, 60)], bg, [false, true]).benar, "keluarga: lingkari bagian sisa saja");
  for (const n of [2, 5, 11, 15, 17, 19]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi Meja Tutup Lapak dan usulan misi ------------------------------ */
{
  const A = D.DAGANG_SIM;
  const isiM = M6.LAPAK_TUTUP_C;
  sama(Object.fromEntries(A.map((a) => [a.id, { awal: a.awal, jual: a.jual }])), isiM, "meja tutup: dagangan sama dengan misi");
  cek(A.every((a) => !PASANGAN_STORY.has(`${a.awal}-${a.jual}`) && a.awal >= 11 && a.awal <= 19 && a.jual >= 1 && a.jual <= 9), "meja tutup: bilangan berbeda dari Story");
  cek(A.some((a) => L.bisaCara("satuan", a)) && A.some((a) => L.bisaCara("lewat", a)) && A.every((a) => L.bisaCara("satuan", a) !== L.bisaCara("lewat", a)), "meja tutup: tiap lapak cocok untuk satu dari dua cara");
  cek(new Set(A.map((a) => L.sisaDagang(a))).size === A.length, "meja tutup: sisa tiap lapak berbeda");
  cek(tanpaDigit(D.MISI_TUTUP) && !TERLARANG.test(D.MISI_TUTUP), "meja tutup: teks misi tanpa digit");
  const sosis = A.find((a) => a.id === "sosis");
  const jagung = A.find((a) => a.id === "jagung");
  let k = L.awalTutup();
  sama([k.alat, k.cara, k.lapak, k.langkah, k.lapor, k.periksa, k.tutup], ["tutup", "mundur", null, 0, {}, [], false], "meja tutup: awal");
  sama(L.majuTutup(k, A), k, "meja tutup: tanpa lapak belum bisa maju");
  k = L.pilihLapak(k, "sosis", A);
  sama([k.lapak, L.langkahSelesai("mundur", sosis), L.langkahSelesai("pikir", sosis), L.posisiTutup("mundur", sosis, 3), L.posisiTutup("pikir", sosis, 3), L.posisiTutup("lewat", jagung, 5), L.posisiTutup("lewat", jagung, 6), L.posisiTutup("lewat", jagung, 9)], ["sosis", 6, 11, 14, 9, 10, 9, 6], "meja tutup: langkah dan posisi tiap cara");
  for (let i = 0; i < 5; i += 1) k = L.majuTutup(k, A);
  sama([L.tuntasTutup(k, A), L.laporkan(k, A) === k], [false, true], "meja tutup: belum tuntas sebelum langkah terakhir");
  k = L.majuTutup(k, A);
  sama([k.langkah, L.tuntasTutup(k, A), L.majuTutup(k, A) === k], [6, true, true], "meja tutup: langkah terakhir menuntaskan");
  k = L.laporkan(k, A);
  sama(k.lapor, { sosis: ["mundur"] }, "meja tutup: lapor mundur");
  sama(L.laporkan(k, A).lapor, { sosis: ["mundur"] }, "meja tutup: cara yang sama tidak dicatat dua kali");
  k = L.pilihCara(k, "satuan");
  sama([k.langkah, L.bisaCara("satuan", sosis), L.bisaCara("lewat", sosis), L.bisaCara("satuan", jagung), L.bisaCara("lewat", jagung)], [0, true, false, false, true], "meja tutup: ganti cara mengulang langkah");
  for (let i = 0; i < 6; i += 1) k = L.majuTutup(k, A);
  k = L.laporkan(k, A);
  sama(k.lapor.sosis, ["mundur", "satuan"], "meja tutup: dua cara untuk satu lapak");
  let j = L.pilihCara(L.pilihLapak(k, "jagung", A), "satuan");
  sama([L.majuTutup(j, A) === j, L.laporkan(j, A) === j], [true, true], "meja tutup: Kurangi satuan tidak jalan di lapak satuan kurang");
  j = L.pilihCara(j, "lewat");
  for (let i = 0; i < 9; i += 1) j = L.majuTutup(j, A);
  j = L.laporkan(j, A);
  sama(j.lapor.jagung, ["lewat"], "meja tutup: lewat sepuluh untuk jagung");
  {
    const ulang = L.pilihLapak(L.pilihLapak(k, "jagung", A), "sosis", A);
    sama([ulang.lapak, ulang.langkah, L.pilihLapak(k, "sosis", A) === k], ["sosis", 6, true], "meja tutup: memilih lapak yang sama tidak mengatur ulang langkah");
    const kembali = L.pilihLapak(L.pilihLapak(L.pilihCara(k, "mundur"), "jagung", A), "sosis", A);
    sama([kembali.langkah, L.tuntasTutup(kembali, A), L.kalimatTutup(kembali, A).includes("dilaporkan")], [6, true, true], "meja tutup: lapak yang sudah dilaporkan tampil selesai, bukan nol langkah");
  }
  sama(L.periksaTambah(L.pilihLapak(L.awalTutup(), "sosis", A)).periksa, [], "meja tutup: periksa hanya setelah dilaporkan");
  sama(L.periksaTambah(j).periksa, ["jagung"], "meja tutup: periksa jagung");
  sama(L.tutupPasar(j, A).tutup, false, "meja tutup: belum bisa tutup sebelum semua dilaporkan dan diperiksa");
  // Selesaikan semua lapak dengan cara yang cocok.
  let semua = L.awalTutup();
  for (const a of A) {
    semua = L.pilihCara(L.pilihLapak(semua, a.id, A), L.bisaCara("satuan", a) ? "satuan" : "lewat");
    for (let i = 0; i < L.langkahSelesai(semua.cara, a); i += 1) semua = L.majuTutup(semua, A);
    semua = L.periksaTambah(L.laporkan(semua, A));
  }
  sama([L.semuaDilaporkan(semua, A), L.semuaDiperiksa(semua, A)], [true, true], "meja tutup: semua lapak dilaporkan dan diperiksa");
  const tutup = L.tutupPasar(semua, A);
  sama(tutup.tutup, true, "meja tutup: tutup pasar malam");
  sama([L.pilihLapak(tutup, "sosis", A) === tutup, L.pilihCara(tutup, "pikir") === tutup, L.majuTutup(tutup, A) === tutup], [true, true, true], "meja tutup: sesudah tutup tidak berubah");
  const lagi = L.mainLagi(tutup);
  sama([lagi.tutup, lagi.lapor, lagi.periksa, lagi.lapak, L.mainLagi(semua) === semua], [false, {}, [], null, true], "meja tutup: main lagi mereset ke awal");
  for (const st of [L.awalTutup(), k, j, semua, tutup, L.pilihCara(L.pilihLapak(L.awalTutup(), "jagung", A), "satuan"), L.pilihCara(L.pilihLapak(L.awalTutup(), "sosis", A), "lewat")]) {
    const t = L.kalimatTutup(st, A);
    cek(tanpaDigit(t) && !TERLARANG.test(t), `meja tutup: kalimat tanpa digit ("${t}")`);
  }

  const daftar = M6.daftarMisiBab6("C");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("c-")), "misi C: id unik berawalan c-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi C: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.some((x) => x.wajib && /penutup bab/i.test(x.teks) && /tutup pasar malam/i.test(x.teks)), "misi C: satu misi penutup bab menutup pasar malam");
  cek(daftar.every((x) => !x.cek(L.awalTutup())), "misi C: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "banding", jumlah: [12, 15, 17], pas: 0 }) && !x.cek({ alat: "loncat", op: "kurang", a: 15, b: 6 }) && !x.cek({ alat: "belasan", op: "kurang", a: 17, b: 5 }) && !x.cek({ alat: "selesai", id: "loket" })), "misi C: keadaan alat lain tidak memenuhi");
  cek(ada(k, "c-mundur") && ada(k, "c-satuan") && ada(k, "c-dua") && !ada(k, "c-lewat") && !ada(k, "c-pikir") && !ada(k, "c-tutup"), "misi C: mundur, satuan, dan dua cara");
  let jf = L.pilihCara(L.pilihLapak(L.awalTutup(), "jagung", A), "lewat");
  for (let i = 0; i < 9; i += 1) jf = L.majuTutup(jf, A);
  jf = L.laporkan(jf, A);
  cek(ada(jf, "c-lewat") && !ada(jf, "c-satuan") && !ada(jf, "c-mundur"), "misi C: lewat sepuluh");
  let pk = L.pilihCara(L.pilihLapak(L.awalTutup(), "donat", A), "pikir");
  for (let i = 0; i < 4; i += 1) pk = L.majuTutup(pk, A);
  pk = L.laporkan(pk, A);
  cek(ada(pk, "c-pikir") && !ada(pk, "c-mundur"), "misi C: pikir penjumlahan");
  cek(ada(tutup, "c-tutup") && !ada(semua, "c-tutup") && !ada({ ...tutup, periksa: ["sosis"] }, "c-tutup") && !ada({ ...tutup, lapor: { sosis: ["mundur"] } }, "c-tutup"), "misi C: tutup pasar malam setelah semua dilaporkan dan diperiksa");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahTutup.tsx", "TahapTutup.tsx", "KincirRia.tsx", "PapanLaporan.tsx", "SimulasiMejaTutup.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
  const tahap = readFileSync(new URL("TahapTutup.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /PERAYAAN/.test(tahap), "TahapTutup: Abstract diakhiri Poin Penting dan perayaan akhir cerita bab");
  cek(/balon/.test(tahap) && /peta/.test(tahap) && /langit/.test(tahap), "TahapTutup: tiga pola visual baru");
  for (const f of ["LangkahTutup.tsx", "TahapTutup.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahTutup.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahTutup: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah) && /UrutLangkah/.test(langkah), "LangkahTutup: Cari kesalahan, petunjuk yang menunjuk kesalahan, dan mengurutkan langkah");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahTutup: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  const sim = readFileSync(new URL("SimulasiMejaTutup.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalTutup/.test(sim) && /speakGuru/.test(sim) && /tutupPasar/.test(sim) && /mainLagi/.test(sim) && /Main lagi/.test(sim), "SimulasiMejaTutup: melaporkan keadaan dan penutup bab");
  for (const f of ["KincirRia.tsx", "PapanLaporan.tsx", "SimulasiMejaTutup.tsx", "TahapTutup.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab6.tsx", import.meta.url), "utf8");
  cek(/C: "Misi Pasar Malam bagian dua[^"\d]*"/.test(ms), "SimulasiBab6: teks misi C tanpa digit");
  cek(ms.includes("SimulasiMejaTutup") && ms.includes('id: "tutup"'), "SimulasiBab6: tab Sub-Bab C memakai meja tutup lapak");
  for (const f of ["misi-bab6.ts", "SimulasiBab6.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
