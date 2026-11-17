// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab D ("Lapak Ikan Dibuka"), akhir cerita Akuarium Ikan Hias Abang.
// Memeriksa: payung lapak (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan pesanan dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap dan berbeda dari Story, batas rupa, tata letak kanvas, simulasi lapak ikan dan usulan misinya,
// emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-lapak-k1b5d.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lapak-k1b5d/logika.ts");
const D = await import("../src/components/modul/lapak-k1b5d/data.ts");
const K = await import("../src/components/modul/lapak-k1b5d/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB5 = await import("../src/components/modul/misi-bab5.ts");
const folderUrl = new URL("../src/components/modul/lapak-k1b5d/", import.meta.url);
const misiSementara = existsSync(new URL("misi.ts", folderUrl));
const M = misiSementara ? await import("../src/components/modul/lapak-k1b5d/misi.ts") : MB5;
const MISI_D = misiSementara ? M.MISI_D : MB5.daftarMisiBab5("D");

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
  sama(L.urutkan([17, 5, 10], "naik"), [5, 10, 17], "urut naik");
  sama(L.urutkan([17, 5, 10], "turun"), [17, 10, 5], "urut turun");
  sama(["pertama", "tengah", "terakhir"].map((p) => L.indeksPosisi(p, 3)), [0, 1, 2], "indeks posisi");
  sama([L.puluhan(17), L.satuan(17), L.puluhan(8), L.puluhan(20), L.satuan(20)], [1, 7, 0, 2, 0], "puluhan dan satuan");
  sama([L.indeksPaling([6, 11, 4], "banyak"), L.indeksPaling([6, 11, 4], "sedikit")], [1, 2], "indeks paling");
  sama([L.sisiBanding({ a: 14, b: 8, tanya: "banyak" }), L.sisiBanding({ a: 14, b: 8, tanya: "sedikit" })], [0, 1], "sisi banding");
  sama([L.barisPasang({ a: 7, b: 10, tanya: "banyak" }), L.barisPasang({ a: 9, b: 6, tanya: "sedikit" })], [1, 1], "baris pasang");
  cek(/Puluhannya beda/.test(L.kalimatBanding(14, 8)) && /Puluhannya sama/.test(L.kalimatBanding(17, 14)) && /sama banyak/.test(L.kalimatBanding(11, 11)), "kalimat banding puluhan dulu");
  for (const [a, b] of [[14, 8], [17, 14], [11, 11], [20, 17], [0, 5]]) cek(tanpaDigit(L.kalimatBanding(a, b)) && !/lebih besar dari|lebih kecil dari/.test(L.kalimatBanding(a, b)), `kalimat banding ${a} ${b} tanpa digit`);
}

/* ------------------------------ Mind-map payung lapak ------------------------------ */
{
  const t = D.TEMPAT_PAYUNG;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "payung: tiga masalah, tujuh rusuk, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && tanpaDigit(x.kunci)), "payung: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "payung: rusuk bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pasangkan satu-satu", "tanpa pasangan", "puluhan dulu, lalu satuan", "paling banyak", "urutkan terkecil", "menara kubus", "urut di garis bilangan"]) cek(gab.includes(k), `payung: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lebih banyak", "sama banyak", "puluhan", "makin besar"]) cek(hasil.includes(k), `payung: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(ikan|guppy|koki|akuarium|lapak|pembeli|pesanan|igil|kaka|abang|mamah|rt|tetangga)\b/i.test(x.kunci)), "payung: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci)), "payung: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_PAYUNG + D.PETUNJUK_URUT_PAYUNG) && !TERLARANG.test(D.SUARA_PAYUNG), "payung: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 59);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "payung: rusuk hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan pesanan ------------------------------ */
{
  const b = D.BARIS_PESANAN;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "pesanan: lima baris");
  const [g, k] = angka(b[0].bilangan);
  sama([g, k], [15, 12], "pesanan: guppy lima belas dan koki dua belas");
  sama(angka(b[0].catatan), [g - k], "pesanan: sisa pasangan dihitung ulang");
  cek(/guppy lebih banyak/.test(b[0].hasil) && /pasangkan/.test(b[0].catatan), "pesanan: guppy lebih banyak dengan pasangkan");
  cek(/sama banyak/.test(b[1].hasil) && /tanpa sisa/.test(b[1].catatan), "pesanan: sama banyak tanpa sisa");
  const tiga = angka(b[2].bilangan);
  sama(tiga, [18, 9, 13], "pesanan: tiga akuarium Story");
  sama([angka(b[2].hasil)[0], angka(b[2].catatan)[0]], [Math.max(...tiga), Math.min(...tiga)], "pesanan: paling banyak dan paling sedikit dihitung ulang");
  sama([angka(b[3].hasil), angka(b[3].catatan)], [L.urutkan(tiga, "naik"), L.urutkan(tiga, "turun")], "pesanan: urutan terkecil dan terbesar dihitung ulang");
  const ps = angka(b[4].bilangan);
  sama(ps, [16, 19], "pesanan: Pak RT enam belas dan tetangga sembilan belas");
  sama(angka(b[4].hasil), [Math.max(...ps)], "pesanan: yang lebih banyak dihitung ulang");
  cek(L.puluhan(ps[0]) === L.puluhan(ps[1]) && /puluhan sama/.test(b[4].catatan), "pesanan: puluhan sama, cek satuan");
  sama(D.TEMPAT_PESANAN.length, 15, "pesanan: lima belas kotak");
  cek(new Set(D.TEMPAT_PESANAN.map((x) => x.kunci)).size === 15, "pesanan: label unik");
  cek(D.TEMPAT_PESANAN.every((x) => x.kunci.length <= 24) && tanpaDigit(D.SUARA_PESANAN) && !TERLARANG.test(D.SUARA_PESANAN), "pesanan: label pendek, suara tanpa digit");
  cek(D.KOLOM_PESANAN.length === 3 && Object.keys(D.KELOMPOK_PESANAN).every((k2) => D.TEMPAT_PESANAN.some((x) => x.kelompok === k2)), "pesanan: tiga kolom");
}

/* ------------------------------ CPA ------------------------------ */
// Story: guppy lima belas, koki dua belas, sisa tiga, tiga akuarium delapan belas, sembilan, tiga belas, pesanan enam belas dan sembilan belas.
const STORY = new Set([3, 9, 12, 13, 15, 16, 18, 19]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Lapak Ikan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 20 && !STORY.has(n)), `${nama}: angka nol sampai dua puluh, berbeda dari Story (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 3, `${nama}: ada belasan dan satuan`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal tanpa angka di Klik dan Kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t)), `${nama}: Cari kesalahan tanpa digit`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }

  const tanyaBanding = new Set();
  const arahUrut = new Set();
  const tanyaPasang = new Set();
  for (const x of semua) {
    const l = x.langkah.tipe === "salah" ? x.langkah.dasar : x.langkah;
    const k = L.kunciLangkah(x.langkah);
    // Batas rupa.
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: hewan ${l.jenis} punya gambar dan warna`);
    else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    if (l.tipe === "banding") {
      tanyaBanding.add(l.tanya);
      cek(l.a !== l.b && [l.a, l.b].every((n) => n >= 1 && n <= 20), `${nama}: dua bilangan berbeda`);
      sama(k, l.tanya === "banyak" ? Math.max(l.a, l.b) : Math.min(l.a, l.b), `${nama}: kunci banding dihitung ulang`);
      cek(Math.max(l.a, l.b) >= 10, `${nama}: banding memuat belasan`);
    }
    if (l.tipe === "pasang") {
      tanyaPasang.add(l.tanya === "sisa" ? "sisa" : "mana");
      cek(l.a >= 1 && l.b >= 1 && l.a <= 11 && l.b <= 11 && l.a !== l.b, `${nama}: baris pasang satu sampai sebelas, berbeda`);
      if (l.tanya === "sisa") sama(k, Math.abs(l.a - l.b), `${nama}: kunci sisa dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${nama}: pilih baris tanpa angka, bukan suara`);
    }
    if (l.tipe === "menara") {
      const m = l.tanya === "banyak" ? Math.max(...l.isi) : Math.min(...l.isi);
      cek(l.isi.filter((v) => v === m).length === 1 && l.isi.every((v) => v >= 1 && v <= 20), `${nama}: menara paling ${l.tanya} tunggal`);
      sama(k, m, `${nama}: kunci menara dihitung ulang`);
    }
    if (l.tipe === "urut") {
      arahUrut.add(l.arah);
      cek(new Set(l.isi).size === l.isi.length && l.isi.length === 3 && l.isi.every((v) => v >= 0 && v <= 20), `${nama}: tiga bilangan urut berbeda`);
      const u = [...l.isi].sort((p, q) => (l.arah === "naik" ? p - q : q - p));
      sama(k, u[{ pertama: 0, tengah: 1, terakhir: 2 }[l.tanya]], `${nama}: kunci urut dihitung ulang`);
      cek(JSON.stringify(u) !== JSON.stringify(l.isi), `${nama}: bilangan urut belum terurut`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  sama([...tanyaBanding].sort(), ["banyak", "sedikit"], `${nama}: lebih banyak dan lebih sedikit`);
  sama([...arahUrut].sort(), ["naik", "turun"], `${nama}: urut dari terkecil dan dari terbesar`);
  sama([...tanyaPasang].sort(), ["mana", "sisa"], `${nama}: pasangkan memuat sisa dan pilih baris`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["pasangkan", "sama banyak", "puluhan dulu", "paling banyak", "paling sedikit", "terkecil", "terbesar"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA) && /buka/i.test(D.PERAYAAN) && /selesai/.test(D.PERAYAAN), "perayaan akhir cerita bab: lapak dibuka");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_LAPAK === D.CONCRETE && D.PICTORIAL_LAPAK === D.PICTORIAL && D.ABSTRACT_LAPAK === D.ABSTRACT && D.TEMA_LAPAK === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (let i = 0; i < 2; i += 1) {
    const c = K.letakBanding(i);
    cek(c.x - K.KOTAK_BANDING.w / 2 >= 0 && c.x + K.KOTAK_BANDING.w / 2 <= W && c.y - K.KOTAK_BANDING.h / 2 >= 26 && c.y + K.KOTAK_BANDING.h / 2 <= H, `kumpulan ${i} masuk kanvas`);
  }
  cek(K.letakBanding(1).x - K.letakBanding(0).x >= K.KOTAK_BANDING.w + 6, "dua kumpulan tidak bertumpuk");
  for (let n = 1; n <= 20; n += 1) {
    const t = Array.from({ length: n }, (_, i) => K.letakIsiBanding(i, n));
    cek(t.every((p) => Math.abs(p.x) <= K.KOTAK_BANDING.w / 2 - 8 && Math.abs(p.y) <= K.KOTAK_BANDING.h / 2 - 8), `isi kumpulan ${n} di dalam kotak`);
    cek(t.every((p, i) => t.every((q, j) => i === j || Math.hypot(p.x - q.x, p.y - q.y) >= 11)), `isi kumpulan ${n} tidak bertumpuk`);
  }
  for (let b = 0; b < 2; b += 1) {
    for (let i = 0; i < 11; i += 1) {
      const p = K.letakPasang(b, i);
      cek(p.x + 10 <= W && p.x - 10 > K.letakBaris(b).x + K.KARTU_BARIS.w / 2, `pasang ${b}/${i} masuk kanvas, tidak menutupi kartu`);
    }
    cek(K.letakBaris(b).x - K.KARTU_BARIS.w / 2 >= 0, `kartu baris ${b} masuk kanvas`);
  }
  cek(K.letakDipasang(0).y - 10 > K.letakPasang(0, 0).y + 10 && K.letakDipasang(0).y + 10 < K.letakPasang(1, 0).y - 9, "benda yang dipindahkan di antara dua baris");
  cek(K.letakBaris(1).y - K.letakBaris(0).y > K.KARTU_BARIS.h + 20, "kartu baris tidak bertumpuk");
  for (let i = 0; i < 3; i += 1) {
    const m = K.letakMenara(i);
    cek(m.x - 22 >= 0 && m.x + 22 <= W && m.y <= H - 10 && m.y - 20 * K.KUBUS.h - 24 >= 0, `menara ${i} setinggi dua puluh masuk kanvas`);
    if (i > 0) cek(m.x - K.letakMenara(i - 1).x >= 60, `menara ${i} berjarak`);
  }
  for (let i = 0; i < 3; i += 1) {
    const a = K.letakKartu(i, 3);
    const s = K.letakSlot(i, 3);
    cek(a.x - K.KARTU_URUT.w / 2 >= 0 && a.x + K.KARTU_URUT.w / 2 <= W && a.y - K.KARTU_URUT.h / 2 >= 26, `kartu urut ${i} masuk kanvas`);
    cek(s.y - K.KARTU_URUT.h / 2 > a.y + K.KARTU_URUT.h / 2 && s.y + K.KARTU_URUT.h / 2 + 12 < K.GARIS_URUT.y - 4, `tempat urut ${i} di antara kartu dan garis`);
    if (i > 0) cek(a.x - K.letakKartu(i - 1, 3).x > K.KARTU_URUT.w, `kartu urut ${i} tidak bertumpuk`);
  }
  cek(K.xGaris(0) >= 0 && K.xGaris(20) <= W && K.GARIS_URUT.y + 16 <= H && K.xGaris(1) - K.xGaris(0) >= 10, "garis bilangan nol sampai dua puluh masuk kanvas");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const kb = [0, 1].map(K.letakBanding);
  cek(K.periksaLingkari([lingkar(kb[0], 66)], kb, [true, false]).benar && !K.periksaLingkari([lingkar(kb[0], 160)], kb, [true, false]).benar, "banding: lingkari satu kumpulan");
  const br = [0, 1].map(K.letakBaris);
  cek(K.periksaLingkari([lingkar(br[1], 24, 20)], br, [false, true]).benar && !K.periksaLingkari([lingkar(br[1], 24, 80)], br, [false, true]).benar, "pasang: lingkari satu kartu baris");
  const sisa = [8, 9, 10].map((i) => K.letakPasang(0, i));
  cek(K.periksaCentang(sisa.map(coret), sisa, 10).benar && !K.periksaCentang([...sisa.map(coret), coret(K.letakPasang(0, 7))], sisa, 10).benar, "pasang: tanda hanya di yang tanpa pasangan");
  const mn = [6, 11, 4].map((n, i) => K.pusatMenara(i, n));
  cek(K.periksaLingkari([lingkar(mn[1], 26, 50)], mn, [false, true, false]).benar && !K.periksaLingkari([lingkar(mn[1], 90, 50)], mn, [false, true, false]).benar, "menara: lingkari satu menara");
  const ku = [0, 1, 2].map((i) => K.letakKartu(i, 3));
  cek(K.periksaLingkari([lingkar(ku[2], 36, 30)], ku, [false, false, true]).benar, "urut: lingkari satu kartu");
  for (const n of [0, 4, 11, 14, 17, 20]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi lapak ikan dan usulan misi ------------------------------ */
{
  const A = D.AKUARIUM_SIM;
  const P = D.PEMBELI_SIM;
  const isiM = misiSementara ? M.ISI_LAPAK_D : MB5.ISI_LAPAK_D;
  const pesM = misiSementara ? M.PESANAN_LAPAK_D : MB5.PESANAN_LAPAK_D;
  sama(Object.fromEntries(A.map((a) => [a.id, a.isi])), isiM, "lapak: isi akuarium sama dengan misi");
  sama(P.map((p) => p.mau), [...pesM], "lapak: pesanan sama dengan misi");
  cek(A.every((a) => !STORY.has(a.isi) && a.isi >= 1 && a.isi <= 20 && D.EMOJI[a.jenis]) && P.every((p) => !STORY.has(p.mau)), "lapak: bilangan berbeda dari Story");
  cek(new Set(A.map((a) => a.isi)).size < A.length, "lapak: ada dua akuarium sama banyak");
  cek(tanpaDigit(D.MISI_LAPAK) && !TERLARANG.test(D.MISI_LAPAK), "lapak: teks misi tanpa digit");
  let k = L.awalLapak(P);
  sama([k.alat, k.mode, k.kiri, k.pasangTuntas, k.urutan.length, k.layani, k.buka], ["lapak", "pasang", null, 0, 0, [null, null, null], false], "lapak: awal");
  k = L.pilihPasang(k, "cupang");
  k = L.pilihPasang(k, "molly");
  sama([k.kiri, k.kanan, L.batasPasang(k, A), L.sisaPasang(k, A)], ["cupang", "molly", 11, 3], "lapak: pasangkan cupang dan molly");
  for (let i = 0; i < 10; i += 1) k = L.pasangSatu(k, A);
  sama([k.dipasang, k.pasangTuntas], [10, 0], "lapak: belum tuntas sebelum pasangan terakhir");
  k = L.pasangSatu(k, A);
  sama([k.dipasang, k.pasangTuntas, L.pasangSatu(k, A) === k], [11, 1, true], "lapak: pasangan terakhir menuntaskan");
  k = L.pilihPasang(L.pilihPasang(k, "molly"), "siput");
  sama([k.kiri, k.kanan, k.dipasang], ["molly", "siput", 0], "lapak: pilih pasangan baru");
  for (let i = 0; i < 11; i += 1) k = L.pasangSatu(k, A);
  sama([k.samaTuntas, L.sisaPasang(k, A)], [1, 0], "lapak: sama banyak tanpa sisa");
  sama(L.pilihPasang(L.pilihPasang(L.awalLapak(P), "udang"), "udang").kiri, null, "lapak: ketuk lagi membatalkan");
  sama(L.palingSim(A), { banyak: "buntal", sedikit: "udang" }, "lapak: paling banyak dan paling sedikit");
  k = L.tandai(L.gantiPenanda(L.tandai(k, "buntal"), "sedikit"), "udang");
  sama([k.palingBanyak, k.palingSedikit], ["buntal", "udang"], "lapak: tandai");
  const naik = [...A].sort((p, q) => p.isi - q.isi).map((a) => a.id);
  let u = k;
  for (const id of naik) u = L.taruhUrut(u, id, A);
  sama([u.urutNaik, u.urutTurun, L.arahSusunan(u, A)], [true, false, "naik"], "lapak: urut dari paling sedikit");
  sama(L.taruhUrut(u, "cupang", A), u, "lapak: akuarium tidak dipindah dua kali");
  u = L.ulangUrut(u);
  for (const id of [...naik].reverse()) u = L.taruhUrut(u, id, A);
  sama([u.urutNaik, u.urutTurun, L.arahSusunan(u, A)], [true, true, "turun"], "lapak: urut dari paling banyak");
  let acak = L.awalLapak(P);
  for (const id of ["cupang", "udang", "buntal", "molly", "siput"]) acak = L.taruhUrut(acak, id, A);
  sama([acak.urutNaik, acak.urutTurun, L.arahSusunan(acak, A)], [false, false, null], "lapak: susunan acak belum urut");
  let r = L.layaniPembeli(L.awalLapak(P), "udang", A, P);
  sama([r.hasil, r.pembeli], ["kurang", 0], "lapak: udang tidak cukup untuk pesanan pertama");
  r = L.layaniPembeli(L.awalLapak(P), "buntal", A, P);
  sama([r.hasil, L.masihBisa(r.k, A, P)], ["cukup", false], "lapak: buntal dipakai duluan, pembeli kedua tidak bisa dilayani");
  sama(L.layaniPembeli(r.k, "buntal", A, P).hasil, "dipakai", "lapak: akuarium tidak dipakai dua kali");
  let ly = L.awalLapak(P);
  for (const id of ["cupang", "buntal", "molly"]) ly = L.layaniPembeli(ly, id, A, P).k;
  sama([L.semuaTerlayani(ly), L.layaniPembeli(ly, "siput", A, P).hasil], [true, "habis"], "lapak: semua pembeli terlayani");
  sama(L.bukaLapak(L.awalLapak(P)).buka, false, "lapak: belum bisa buka sebelum semua dilayani");
  const buka = L.bukaLapak(ly);
  sama(buka.buka, true, "lapak: buka lapak");
  sama([L.tutupLapak(buka, P).buka, L.tutupLapak(buka, P).layani, L.tutupLapak(buka, P).mode, L.tutupLapak(ly, P).buka], [false, [null, null, null], "pasang", false], "lapak: tutup lapak (Main lagi) mereset ke awal");
  sama([L.ulangLayani(buka).buka, L.ulangLayani(buka).layani], [false, [null, null, null]], "lapak: ulang pesanan");
  for (const mode of ["pasang", "tanda", "urut", "layani"])
    for (const st of [L.awalLapak(P), k, u, ly, buka]) {
      const t = L.kalimatLapak(L.pilihMode(st, mode), A, P);
      cek(tanpaDigit(t) && !TERLARANG.test(t), `lapak: kalimat ${mode} tanpa digit ("${t}")`);
    }

  const daftar = MISI_D;
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalLapak(P);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi D: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("d-")), "misi D: id unik berawalan d-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi D: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.some((x) => x.wajib && /penutup bab/i.test(x.teks) && /buka lapak/i.test(x.teks)), "misi D: satu misi penutup bab membuka lapak");
  cek(daftar.every((x) => !x.cek(awal)), "misi D: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "rak" }) && !x.cek({ alat: "puluhan", n: 13, m: 16, banding: true }) && !x.cek({ alat: "banding", jumlah: [12, 15, 17] })), "misi D: keadaan alat lain tidak memenuhi");
  let ps = L.pilihPasang(L.pilihPasang(awal, "cupang"), "buntal");
  for (let i = 0; i < 13; i += 1) ps = L.pasangSatu(ps, A);
  cek(!ada(ps, "d-pasang") && ada(L.pasangSatu(ps, A), "d-pasang") && !ada(L.pasangSatu(ps, A), "d-sama"), "misi D: pasangkan sampai ada sisa");
  cek(ada(k, "d-sama"), "misi D: pasangkan sama banyak");
  cek(ada(k, "d-paling") && !ada(L.tandai(k, "molly"), "d-paling") && !ada(L.tandai(awal, "buntal"), "d-paling"), "misi D: tandai paling banyak dan paling sedikit");
  let un = awal;
  for (const id of naik) un = L.taruhUrut(un, id, A);
  cek(ada(un, "d-urut") && !ada(un, "d-turun") && !ada(acak, "d-urut"), "misi D: urut dari paling sedikit");
  let ut = awal;
  for (const id of [...naik].reverse()) ut = L.taruhUrut(ut, id, A);
  cek(ada(ut, "d-turun") && !ada(ut, "d-urut"), "misi D: urut dari paling banyak");
  cek(ada(buka, "d-buka") && !ada(ly, "d-buka") && !ada({ ...buka, layani: ["udang", "buntal", "molly"] }, "d-buka"), "misi D: buka lapak setelah semua pesanan cukup");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahLapak.tsx", "TahapLapak.tsx", "PayungLapak.tsx", "PapanPesanan.tsx", "SimulasiLapakIkan.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapLapak.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /PERAYAAN/.test(tahap), "TahapLapak: Abstract diakhiri Poin Penting dan perayaan akhir cerita bab");
  for (const f of ["LangkahLapak.tsx", "TahapLapak.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahLapak.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahLapak: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahLapak: Cari kesalahan dan petunjuk yang menunjuk kesalahan");
  const sim = readFileSync(new URL("SimulasiLapakIkan.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalLapak/.test(sim) && /speakGuru/.test(sim) && /bukaLapak/.test(sim) && /tutupLapak/.test(sim) && /Main lagi/.test(sim), "SimulasiLapakIkan: melaporkan keadaan lapak dan penutup bab");
  for (const f of ["PayungLapak.tsx", "PapanPesanan.tsx", "SimulasiLapakIkan.tsx", "TahapLapak.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
}

if (!misiSementara) {
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab5.tsx", import.meta.url), "utf8");
  cek(/D: "Misi Lapak Ikan[^"\d]*"/.test(ms), "SimulasiBab5: teks misi D tanpa digit");
  cek(ms.includes("SimulasiLapakIkan") && /huruf === "D"/.test(ms), "SimulasiBab5: tab Sub-Bab D memakai lapak ikan");
  for (const f of ["misi-bab5.ts", "SimulasiBab5.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

{ const sl = readFileSync(new URL("../src/components/modul/lapak-k1b5d/LangkahLapak.tsx", import.meta.url), "utf8"); cek(sl.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(sl) && sl.includes("onBenar={(t) => jawab(n, \"\", t)}"), "lapak-k1b5d/LangkahLapak: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar."); }
console.log(`Lulus ${lulus}, gagal ${gagal}${misiSementara ? " (misi masih di lapak-k1b5d/misi.ts)" : ""}`);
process.exit(gagal ? 1 : 0);
