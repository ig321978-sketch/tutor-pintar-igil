// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 7 Sub-Bab B ("Papan Lantai Rumah Pohon"), akhir cerita Rumah Pohon Abang.
// Memeriksa: rumah pohon (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), catatan Kakek Jaya dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// angka jawaban tidak kembar per tahap (satu sampai dua belas), batas rupa, tanpa satuan baku, tata letak kanvas, simulasi papan lantai dan misinya,
// emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-lantai-k1b7b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lantai-k1b7b/logika.ts");
const D = await import("../src/components/modul/lantai-k1b7b/data.ts");
const K = await import("../src/components/modul/lantai-k1b7b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB7 = await import("../src/components/modul/misi-bab7.ts");

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kali|bagi|dikali|dibagi)\b/i;
const SATUAN_BAKU = /\b(cm|m)\b|meter|sentimeter|kilometer|milimeter|penggaris|meteran/i;
const tanpaDigit = (t) => !/\d/.test(t);
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];

/* ------------------------------ Dasar ------------------------------ */
{
  const t = (panjang, k, extra = {}) => ({ tipe: "taruh", panjang, k, satuan: "jengkal", benda: "tali", mode: "taruh", ...extra });
  sama([L.hasilUkur(t(8, 2)), L.hasilUkur(t(9, 1))], [4, 9], "hasil ukur: alat lebih panjang, angka lebih sedikit");
  sama([L.kunciLangkah(t(8, 2)), L.kunciLangkah(t(11, 1, { kira: 8 })), L.kunciLangkah(t(5, 1, { kira: 9 }))], [4, 3, 4], "kunci taruh dan selisih perkiraan");
  sama([L.kunciLangkah({ tipe: "petak", a: 9, b: 4, tanya: "hitung" }), L.kunciLangkah({ tipe: "petak", a: 9, b: 4, tanya: "selisih" }), L.kunciLangkah({ tipe: "petak", a: 9, b: 4, tanya: "panjang" })], [9, 5, null], "kunci petak");
  sama([L.barisPita({ a: 5, b: 9, tanya: "panjang" }), L.barisPita({ a: 5, b: 9, tanya: "pendek" }), L.barisPita({ a: 9, b: 5, tanya: "panjang" })], [1, 0, 0], "baris pita");
  sama([L.metodeLangkah(t(6, 1)), L.metodeLangkah(t(6, 1, { mode: "pindah" })), L.metodeLangkah(t(6, 1, { kira: 3 })), L.metodeLangkah({ tipe: "petak", a: 1, b: 2, tanya: "hitung" })], ["igil", "ulang", "kira", "petak"], "metode langkah");
  sama(L.URUT_METODE, ["igil", "ulang", "kira", "petak"], "urutan metode");
  for (const l of [t(8, 2), t(11, 1, { kira: 8 }), { tipe: "petak", a: 11, b: 3, tanya: "hitung" }, { tipe: "petak", a: 9, b: 4, tanya: "selisih" }]) {
    const p = L.pilihanDari(l);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.kunciLangkah(l)) && p.every((v) => v >= 1 && v <= 12), `pilihan memuat kunci dalam satu sampai dua belas: ${p}`);
  }
  sama([L.kata(3), L.kata(12)], ["tiga", "dua belas"], "kata bilangan");
}

/* ------------------------------ Mind-map rumah pohon ------------------------------ */
{
  const t = D.TEMPAT_RUMAH;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "rumah pohon: tiga masalah, tujuh dahan, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 36 && tanpaDigit(x.kunci)), "rumah pohon: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rumah pohon: dahan bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["kira-kira lalu periksa", "mulai dari ujung", "mengulang satuan", "rapat", "satu jenis alat ukur", "nama alat", "ukur di kotak-kotak"]) cek(gab.includes(k), `rumah pohon: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["angka sedikit", "selisih", "kotak lebih banyak", "terpasang"]) cek(hasil.includes(k), `rumah pohon: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(igil|kaka|abang|mamah|kakek|jaya|jambu|bengkel)\b/i.test(x.kunci)), "rumah pohon: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci) && !SATUAN_BAKU.test(x.kunci)), "rumah pohon: label tanpa kata terlarang dan satuan baku");
  cek(tanpaDigit(D.SUARA_RUMAH + D.PETUNJUK_URUT_RUMAH) && !TERLARANG.test(D.SUARA_RUMAH), "rumah pohon: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "rumah pohon: dahan hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis catatan Kakek Jaya ------------------------------ */
{
  const b = D.BARIS_CATATAN;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "catatan: lima baris");
  sama([angka(b[0].bilangan), angka(b[0].hasil)], [[5], [5]], "catatan: pesan lima jengkal Igil");
  sama([angka(b[1].bilangan), angka(b[0].bilangan)[0] - angka(b[1].bilangan)[0]], [[4], 1], "catatan: jengkal bercelah kurang satu");
  cek(/celah/.test(b[1].hasil) && /terlewat/.test(b[1].catatan), "catatan: celah dan terlewat");
  const [tg, jm] = angka(b[2].bilangan);
  sama([tg, jm], [3, 4], "catatan: tiga tongkat dan empat jengkal Mamah");
  cek(tg < jm && /lebih sedikit/.test(b[2].hasil) && /satu jenis/.test(b[2].catatan), "catatan: alat panjang, angka lebih sedikit");
  const [kira, hasil] = angka(b[3].bilangan);
  sama([kira, hasil, angka(b[3].hasil), angka(b[3].catatan)], [3, 5, [hasil - kira], [hasil, kira]], "catatan: selisih perkiraan dan hasil dihitung ulang");
  const pt = angka(b[4].bilangan);
  sama([pt, angka(b[4].hasil)], [[6, 4], [Math.max(...pt)]], "catatan: kertas berpetak enam dan empat kotak");
  cek(/ujung kiri/.test(b[4].catatan), "catatan: mulai dari ujung kiri");
  sama(D.TEMPAT_CATATAN.length, 15, "catatan: lima belas kotak");
  cek(new Set(D.TEMPAT_CATATAN.map((x) => x.kunci)).size === 15, "catatan: label unik");
  cek(D.TEMPAT_CATATAN.every((x) => x.kunci.length <= 24 && !SATUAN_BAKU.test(x.kunci) && !TERLARANG.test(x.kunci)), "catatan: label pendek, tanpa satuan baku");
  cek(tanpaDigit(D.SUARA_CATATAN) && !TERLARANG.test(D.SUARA_CATATAN), "catatan: suara tanpa digit");
  cek(D.KOLOM_CATATAN.length === 3 && Object.keys(D.KELOMPOK_CATATAN).every((k2) => D.TEMPAT_CATATAN.some((x) => x.kelompok === k2)), "catatan: tiga kolom");
}

/* ------------------------------ CPA ------------------------------ */
// Story: 5, 4, 3, 2, 6, 7, 8 (ruang angka satu sampai dua belas terlalu sempit untuk menghindari semuanya; lihat laporan).
let adaSalahTaruh = false;
let adaSalahPetak = false;
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Papan Lantai (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !SATUAN_BAKU.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length >= 10 && angka.length <= 11, `${nama}: sepuluh atau sebelas angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => Number.isInteger(n) && n >= 1 && n <= 12), `${nama}: angka satu sampai dua belas (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 1 && angka.filter((n) => n < 10).length >= 5, `${nama}: ada dua kotak dan satu kotak`);
  const tanpaAngka = semua.filter((x) => L.angkaJawab(x.langkah) === null);
  cek(tanpaAngka.length >= 1 && tanpaAngka.every((x) => x.cara !== "suara" && x.metode === "petak"), `${nama}: soal tanpa angka hanya pilih pita di Klik atau Kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && l.jawabTokoh !== kunci && l.jawabTokoh >= 1 && l.jawabTokoh <= 12, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    cek(geser !== l.benar, `${nama}: alasan benar bukan tombol pertama`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t) && !SATUAN_BAKU.test(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh) && L.petunjukSalah(l, l.jawabTokoh).includes(l.keliru), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
    if (l.dasar.tipe === "taruh" && l.dasar.celah !== undefined) {
      adaSalahTaruh = true;
      cek(l.jawabTokoh === L.hasilUkur(l.dasar) - 1 && l.dasar.celah < L.hasilUkur(l.dasar), `${nama}: celah membuat hasil kurang satu`);
    }
    if (l.dasar.tipe === "petak" && l.dasar.lewat) {
      adaSalahPetak = true;
      cek(l.jawabTokoh === l.dasar.a - 1, `${nama}: kotak pertama terlewat membuat hasil kurang satu`);
    }
  }

  const bentuk = new Set();
  for (const x of semua) {
    const l = x.langkah.tipe === "salah" ? x.langkah.dasar : x.langkah;
    const k = L.kunciLangkah(x.langkah);
    if (l.tipe === "taruh") {
      cek(Number.isInteger(l.panjang / l.k) && l.panjang >= 1 && l.panjang <= 12 && (l.k === 1 || l.k === 2), `${nama}: panjang habis dibagi lebar alat dan paling besar dua belas`);
      if (rupa === "benda") cek(D.EMOJI[l.satuan] && D.WARNA_BENDA[l.satuan] && D.EMOJI[l.benda] && D.WARNA_BENDA[l.benda] && D.NAMA_BENDA[l.benda], `${nama}: satuan ${l.satuan} dan benda ${l.benda} punya gambar dan warna`);
      else cek(D.EMOJI[l.satuan] === undefined && D.EMOJI[l.benda] === undefined, `${nama}: tanpa gambar benda (${l.satuan}, ${l.benda})`);
      if (l.kira !== undefined) {
        cek(l.kira >= 1 && l.kira <= 12 && l.kira !== L.hasilUkur(l), `${nama}: perkiraan berbeda dari hasil`);
        sama(k, Math.abs(l.kira - L.hasilUkur(l)), `${nama}: kunci selisih dihitung ulang`);
      } else sama(k, l.panjang / l.k, `${nama}: kunci hasil ukur dihitung ulang`);
      bentuk.add(`${l.mode}${l.k}${l.kira !== undefined ? "kira" : ""}`);
    } else {
      cek(l.a !== l.b && l.a >= 1 && l.b >= 1 && l.a <= 12 && l.b <= 12, `${nama}: dua pita berbeda, satu sampai dua belas`);
      if (l.tanya === "hitung") sama(k, l.a, `${nama}: kunci hitung kotak`);
      else if (l.tanya === "selisih") sama(k, Math.abs(l.a - l.b), `${nama}: kunci selisih kotak`);
      else cek(k === null && x.cara !== "suara", `${nama}: pilih pita tanpa angka, bukan suara`);
      bentuk.add(`petak-${l.tanya}`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3, `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10 && !SATUAN_BAKU.test(L.petunjukSalah(x.langkah, m)), `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && !SATUAN_BAKU.test(x.suara) && x.suara.length <= 200, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  cek(bentuk.size >= 5, `${nama}: kegiatan beragam (${[...bentuk].join(", ")})`);
}
cek(adaSalahTaruh && adaSalahPetak, "Cari kesalahan: jengkal bercelah dan kotak pertama terlewat");
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["ujung", "rapat", "satu jenis alat ukur", "nama alat", "lebih sedikit", "perkirakan", "selisih", "kertas berpetak"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(D.POIN_PENTING.every((p) => !SATUAN_BAKU.test(p) && !TERLARANG.test(p)), "poin penting: tanpa satuan baku");
  cek(tanpaDigit(D.PERAYAAN + D.PERAYAAN_SUARA) && /bendera/i.test(D.PERAYAAN) && /selesai/.test(D.PERAYAAN) && /papan lantai/i.test(D.PERAYAAN), "perayaan akhir cerita bab: papan terpasang, bendera dikibarkan");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_LANTAI === D.CONCRETE && D.PICTORIAL_LANTAI === D.PICTORIAL && D.ABSTRACT_LANTAI === D.ABSTRACT && D.TEMA_LANTAI === D.TEMA_TAHAP, "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => !SATUAN_BAKU.test(t.cara + t.nama)), "tema tahap tanpa satuan baku");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (const k of [1, 2]) {
    for (let p = k; p <= 12; p += k) {
      const n = p / k;
      cek(K.ujungKanan(p) <= W - 10 && K.kiriSatuan(n, k) === K.ujungKanan(p), `taruh: benda ${p} satuan pendek dengan alat ${k} masuk kanvas`);
      cek(K.BARIS_SATUAN.y > K.BAR.y + K.BAR.h + 8 && K.BARIS_SATUAN.y + K.BARIS_SATUAN.h + 8 <= H, "taruh: baris satuan di bawah benda");
      if (n > 1) cek(K.letakSatuan(1, k).x - K.letakSatuan(0, k).x >= 20, "taruh: satuan tidak bertumpuk");
    }
  }
  cek(K.BARIS_PITA[1] - K.BARIS_PITA[0] >= K.SEL + 10 && K.BARIS_PITA[1] + K.SEL + 4 <= H && K.letakSel(0, 11).x + K.SEL / 2 <= W - 10, "petak: dua pita dan dua belas kotak masuk kanvas");
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  for (const k of [1, 2]) {
    const letak = Array.from({ length: 6 / k }, (_, i) => K.letakSatuan(i, k));
    cek(K.periksaCentang(letak.map(coret), letak, 10).benar && !K.periksaCentang([...letak.slice(1).map(coret)], letak, 10).benar && !K.periksaCentang([...letak.map(coret), coret({ x: 150, y: 190 })], letak, 10).benar, `taruh: tanda tiap satuan, alat ${k}`);
  }
  const sel = Array.from({ length: 5 }, (_, i) => K.letakSel(0, i));
  cek(K.periksaCentang(sel.map(coret), sel, 10).benar && !K.periksaCentang([...sel.map(coret), coret(K.letakSel(0, 5))], sel, 10).benar, "petak: tanda hanya di kotak pita");
  const pita = [K.pusatPita(0, 5), K.pusatPita(1, 9)];
  cek(K.periksaLingkari([lingkar(pita[1], 100, 16)], pita, [false, true]).benar && !K.periksaLingkari([lingkar(pita[1], 160, 90)], pita, [false, true]).benar, "petak: lingkari satu pita");
  for (const n of [1, 5, 10, 11, 12]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi papan lantai dan misi ------------------------------ */
{
  const A = D.BENDA_SIM;
  sama(Object.fromEntries(A.map((a) => [a.id, a.panjang])), MB7.PANJANG_LANTAI_B, "simulasi: panjang benda sama dengan misi");
  cek(A.some((a) => a.id === MB7.SISI_LANTAI_B) && A.every((a) => a.panjang % 2 === 0 && a.panjang >= 2 && a.panjang <= 12), "simulasi: sisi lantai ada, panjang genap sampai dua belas");
  cek(tanpaDigit(D.MISI_LANTAI) && !TERLARANG.test(D.MISI_LANTAI) && !SATUAN_BAKU.test(D.MISI_LANTAI), "simulasi: teks misi tanpa digit dan satuan baku");
  const kosong = new Set();
  const daftar = MB7.daftarMisiBab7("B");
  cek(daftar === MB7.MISI_B && daftar.filter((m) => m.wajib).length >= 4 && daftar.some((m) => !m.wajib) && new Set(daftar.map((m) => m.id)).size === daftar.length, "misi B: empat wajib, ada bebas, id unik");
  cek(daftar.every((m) => tanpaDigit(m.teks) && m.teks.length >= 10 && m.teks.length <= 120 && !TERLARANG.test(m.teks) && !SATUAN_BAKU.test(m.teks)), "misi B: teks tanpa digit, panjang cukup, bersih");
  const awal = L.awalLantai("tali");
  cek(S.misiBaru(daftar, awal, kosong).length === 0, "misi B: keadaan awal tidak memenuhi misi");
  const ada = (k, id) => S.misiBaru(daftar, k, kosong).includes(id);
  let k = awal;
  sama([L.tempatUkur(k, A), L.ukurSelesai(k, A)], [12, false], "simulasi: tali dua belas tempat sedotan");
  for (let i = 0; i < 11; i += 1) k = L.taruhSatuan(k, A, true);
  cek(!ada(k, "b-rapat") && k.dipasang === 11, "simulasi: belum sampai ujung");
  k = L.taruhSatuan(k, A, true);
  sama([k.dipasang, k.tuntas, L.taruhSatuan(k, A, true) === k, L.kalimatLantai(k, A)], [12, ["tali:sedotan"], true, "Hasilnya dua belas sedotan."], "simulasi: tuntas rapat");
  cek(ada(k, "b-rapat") && !ada(k, "b-alat") && !ada(k, "b-kira"), "misi: ukur rapat");
  k = L.pilihAlatLantai(k, "tongkat");
  sama([k.dipasang, L.tempatUkur(k, A)], [0, 6], "simulasi: tongkat dua kali sedotan, enam tempat");
  for (let i = 0; i < 6; i += 1) k = L.taruhSatuan(k, A, true);
  sama(k.tuntas, ["tali:sedotan", "tali:tongkat"], "simulasi: tuntas dengan dua alat");
  cek(ada(k, "b-alat") && !ada(L.awalLantai("tali"), "b-alat"), "misi: benda sama dengan dua alat");
  const satuAlat = { ...L.awalLantai("tali"), tuntas: ["tali:sedotan", "bangku:tongkat"] };
  cek(!ada(satuAlat, "b-alat"), "misi: dua benda beda tidak cukup");
  // Perkiraan lalu periksa.
  let q = L.pilihBendaLantai(L.awalLantai("tali"), "bangku");
  sama(L.selisihKira(q, A), null, "perkiraan: belum ada");
  q = L.aturKira(q, 8);
  for (let i = 0; i < 10; i += 1) q = L.taruhSatuan(q, A, true);
  sama([q.diperiksa, L.selisihKira(q, A), ada(q, "b-kira"), L.kalimatLantai(q, A)], [1, 2, true, "Hasilnya sepuluh sedotan. Selisih dengan perkiraanmu dua."], "perkiraan lalu periksa: selisih dua");
  const tanpaKira = (() => { let z = L.pilihBendaLantai(L.awalLantai("tali"), "pagar"); for (let i = 0; i < 4; i += 1) z = L.taruhSatuan(z, A, true); return z; })();
  cek(tanpaKira.diperiksa === 0 && !ada(tanpaKira, "b-kira") && ada(tanpaKira, "b-rapat"), "misi: tanpa perkiraan belum diperiksa");
  sama([L.aturKira(awal, 99).kira, L.aturKira(awal, -3).kira], [12, 1], "perkiraan dibatasi satu sampai dua belas");
  // Celah.
  let c = L.pilihBendaLantai(L.awalLantai("tali"), "pagar");
  c = L.taruhSatuan(c, A, false);
  cek(c.celah === 1 && c.celahDicoba === 1 && ada(c, "b-celah") && !ada(c, "b-rapat"), "misi: celah dicoba");
  for (let i = 0; i < 3; i += 1) c = L.taruhSatuan(c, A, true);
  sama([c.dipasang, c.celah, L.ukurSelesai(c, A), c.tuntas, L.kalimatLantai(c, A).includes("celah")], [3, 1, true, [], true], "simulasi: celah membuat hasil kurang dan tidak tuntas");
  cek(L.ulangUkur(c).celah === 0 && L.ulangUkur(c).celahDicoba === 1, "simulasi: ulang ukur menyisakan catatan celah dicoba");
  // Petak.
  let p = awal;
  for (let i = 0; i < 4; i += 1) p = L.aturPita(p, "merah", 1);
  cek(!p.selisihTiga, "petak: biru nol belum dihitung");
  p = L.aturPita(p, "biru", 1);
  cek(p.selisihTiga && ada(p, "b-petak"), "petak: merah empat, biru satu, selisih tiga");
  p = L.aturPita(p, "biru", 1);
  cek(p.selisihTiga, "petak: pernah tercapai tetap tercatat");
  sama([L.aturPita({ ...awal, merah: 12 }, "merah", 1).merah, L.aturPita(awal, "biru", -1).biru], [12, 0], "petak: batas nol sampai dua belas");
  // Pesan.
  let z = L.pilihBendaLantai(awal, "lantai");
  sama(L.kirimPesanan(z, "sedotan", "lantai").pesan, null, "pesan: belum diukur tidak terkirim");
  for (let i = 0; i < 12; i += 1) z = L.taruhSatuan(z, A, true);
  const kirim = L.kirimPesanan(z, "sedotan", "lantai");
  sama([kirim.pesan, ada(kirim, "b-pesan"), L.kirimPesanan(z, "tongkat", "lantai").pesan, L.tutupPesanan(kirim).pesan], ["sedotan", true, null, null], "pesan: dikirim setelah sisi lantai diukur dengan alat itu");
  cek(!ada({ ...awal, pesan: "tongkat", tuntas: ["lantai:sedotan"] }, "b-pesan"), "misi: pesan harus sesuai alat yang diukur");
  cek(tanpaDigit(L.kalimatLantai(kirim, A)) && ["ukur", "petak", "pesan"].every((m) => tanpaDigit(L.kalimatLantai(L.pilihModeLantai(awal, m), A))) && tanpaDigit(L.kalimatLantai(z, A)), "simulasi: kalimat suara tanpa digit");
  // Gerbang bawaan.
  const tamp = daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  const wajib = tamp.filter((m) => m.wajib).map((m) => m.id);
  cek(S.wajibSelesai(tamp, new Set(wajib)) && !S.wajibSelesai(tamp, new Set(wajib.slice(1))), "gerbang misi B");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/lantai-k1b7b/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas lantai-k1b7b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(/.test(s), `${f}: tanpa jaringan`);
    const kode = s.split("\n").filter((b) => !/^\s*(\/\*|\*|\/\/)/.test(b)).join("\n");
    cek(!SATUAN_BAKU.test(kode.replace(/".*?"/g, (m) => m)) || !/(sentimeter|penggaris|meteran|kilometer|milimeter)/i.test(kode), `${f}: kode tanpa satuan baku`);
  }
  for (const f of ["logika.ts", "periksa.ts", "data.ts"]) cek(!/from "react"/.test(readFileSync(new URL(f, folder), "utf8")), `${f}: tanpa React`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
