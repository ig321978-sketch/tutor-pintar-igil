// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab A ("Ikan Baru Datang"), awal Akuarium Ikan Hias Abang.
// Memeriksa: akuarium bergelembung (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), label kaca akuarium dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, sepuluh angka jawaban tidak kembar per tahap dan berbeda
// dari Story, batas rupa (Concrete hewan air, Pictorial titik polos, Abstract kata dan angka), tata letak kanvas, pengenal ucapan sampai dua puluh,
// simulasi wadah sekat sepuluh dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-ikan-k1b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ikan-k1b5a/logika.ts");
const D = await import("../src/components/modul/ikan-k1b5a/data.ts");
const K = await import("../src/components/modul/ikan-k1b5a/periksa.ts");
const M = await import("../src/components/modul/misi-bab5.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|kali|bagi|dikali|dibagi)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 9, 10, 11, 12, 16, 19, 20].map(L.kata), ["nol", "sembilan", "sepuluh", "sebelas", "dua belas", "enam belas", "sembilan belas", "dua puluh"], "kata: nol sampai dua puluh");
  cek(Array.from({ length: 21 }, (_, n) => L.kata(n)).every(tanpaDigit), "kata: tanpa digit sampai dua puluh");
  sama([L.kataSepuluh(14), L.kataSepuluh(20), L.kataSepuluh(7)], ["sepuluh dan empat", "sepuluh dan sepuluh", "tujuh"], "kataSepuluh");
}

/* ------------------------------ Pengenal ucapan sampai dua puluh ------------------------------ */
{
  for (let n = 0; n <= 20; n += 1) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
  sama(K.bilanganDariUcapan20("Enam Belas"), [16], "ucapan huruf besar");
  sama(K.bilanganDariUcapan20("duapuluh"), [20], "ucapan dua puluh disambung");
  sama(K.bilanganDariUcapan20("se belas"), [11], "ucapan se belas");
  sama(K.bilanganDariUcapan20("tujuhbelas"), [17], "ucapan belas disambung");
  sama(K.bilanganDariUcapan20("15"), [15], "ucapan angka");
  sama(K.bilanganDariUcapan20("lima belas tiga"), [15, 3], "ucapan dua bilangan");
  sama(K.bilanganDariUcapan20("dua puluh lima"), [20, 5], "ucapan di atas dua puluh tidak dibaca dua puluh lima");
}

/* ------------------------------ Mind-map akuarium bergelembung ------------------------------ */
{
  const t = D.TEMPAT_GELEMBUNG;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "gelembung: tiga masalah, tujuh gelembung, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && tanpaDigit(x.kunci)), "gelembung: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "gelembung: bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["satu benda satu hitungan", "sepuluh dulu", "sisanya", "lambang dan nama", "dua bingkai sepuluh", "manik hitung", "toples tebakan"]) cek(gab.includes(k), `gelembung: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["belasan", "sebelas", "dua puluh", "tebakan"]) cek(hasil.includes(k), `gelembung: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(ikan|guppy|koki|neon|kantong|akuarium|igil|kaka|abang|mamah)\b/i.test(x.kunci)), "gelembung: label hanya poin pelajaran");
  cek(tanpaDigit(D.SUARA_GELEMBUNG + D.PETUNJUK_URUT_GELEMBUNG) && !TERLARANG.test(D.SUARA_GELEMBUNG), "gelembung: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 51);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "gelembung: gelembung hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis label kaca akuarium ------------------------------ */
{
  const b = D.BARIS_LABEL;
  sama(b.map((x) => [x.nama, x.banyak]), [["Guppy", 14], ["Koki", 11], ["Neon", 20]], "label: data dari Story");
  for (const x of b) {
    cek(x.sepuluh === 10 && x.sepuluh + x.sisa === x.banyak, `label: ${x.nama} sepuluh dan sisa sama dengan banyak`);
    cek(D.EMOJI[x.jenis] !== undefined, `label: ${x.nama} punya gambar`);
  }
  cek(/13/.test(b[0].catatan) && /15/.test(b[0].catatan) && /10/.test(b[1].catatan) && /17/.test(b[2].catatan) && /3/.test(b[2].catatan), "label: catatan hitung dari Story (tiga belas lalu lima belas, tebak sepuluh, tujuh belas lalu tiga)");
  sama(D.TEMPAT_LABEL.length, 12, "label: dua belas kotak");
  cek(new Set(D.TEMPAT_LABEL.map((x) => x.kunci)).size === 12, "label: label unik");
  sama(D.TEMPAT_LABEL.filter((x) => x.kelompok === "nama").map((x) => x.kunci), ["empat belas", "sebelas", "dua puluh"], "label: nama bilangan");
  cek(D.TEMPAT_LABEL.every((x) => x.kunci.length <= 16) && tanpaDigit(D.SUARA_LABEL) && !TERLARANG.test(D.SUARA_LABEL), "label: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
// Story: guppy empat belas, koki sebelas, neon tujuh belas ditambah tiga menjadi dua puluh, hitungan Igil tiga belas dan lima belas.
const STORY = new Set([3, 11, 13, 14, 15, 17, 20]);
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
  cek(angka.filter((n) => n > 10).length >= 4 && angka.some((n) => n < 10), `${nama}: ada belasan dan satuan`);
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    // Batas rupa.
    if ("jenis" in l) {
      if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: hewan ${l.jenis} punya gambar dan warna`);
      else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    }
    if (l.tipe === "jaring") {
      sama(k, l.ikan, `${nama}: kunci jaring`);
      cek(l.ikan >= 1 && l.ikan <= 19, `${nama}: jaring muat di kantong`);
      if (x.cara === "kanvas" && rupa !== "lambang") cek(l.ikan > 10, `${nama}: jaring kanvas, wadah pertama penuh dan ada sisa di kantong`);
      if (rupa === "lambang") cek(l.ikan >= 10 ? l.ikan - 9 <= 10 : l.ikan <= 10, `${nama}: kartu kata muat sepuluh petak`);
    }
    if (l.tipe === "bingkai") {
      sama(k, l.jawab === "angka" ? l.isi : null, `${nama}: kunci bingkai`);
      cek(l.isi >= 10 && l.isi <= 20, `${nama}: bingkai berisi sepuluh sampai dua puluh`);
      if (l.jawab === "nama") {
        cek(x.cara !== "suara", `${nama}: nama bilangan tidak untuk suara`);
        const p = L.pilihanNama(l.isi);
        cek(p.length === 3 && p.includes(l.isi) && p.every((m) => m >= 0 && m <= 20) && !STORY.has(l.isi), `${nama}: tiga pilihan nama untuk ${l.isi}`);
      } else cek(x.cara === "suara", `${nama}: bingkai berjawaban angka untuk suara`);
    }
    if (l.tipe === "manik") {
      cek(l.sasaran >= 11 && l.sasaran <= 19, `${nama}: manik sasaran belasan`);
      sama(k, l.tanya === "bawah" ? l.sasaran - 10 : l.sasaran, `${nama}: kunci manik`);
      cek((l.tanya === "semua") === (x.cara === "kanvas"), `${nama}: manik semua untuk kanvas`);
      // Rekenrek: geser manik sampai sasaran dengan baris atas penuh lebih dulu.
      let t = [0, 0];
      t[0] = L.geserManik(t[0], 9);
      t[1] = L.geserManik(t[1], l.sasaran - 11);
      sama(t, [10, l.sasaran - 10], `${nama}: manik bisa digeser ke sasaran`);
    }
    if (l.tipe === "toples") {
      sama(k, l.ikan, `${nama}: kunci toples`);
      cek(l.ikan >= 1 && l.ikan <= 12 && l.tebakan.length === 3 && L.tebakanDekat(l.tebakan, l.ikan) >= 0, `${nama}: toples muat dan ada satu tebakan paling dekat`);
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    if (x.cara === "kanvas" && k !== null) cek(k <= 20, `${nama}: tulisan kanvas satu atau dua kotak`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  // Dua soal tanpa jawaban angka (nama bilangan), hanya Klik dan Kanvas.
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal nama bilangan di Klik dan Kanvas`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  cek(D.POIN_PENTING.some((p) => /sepuluh dulu/.test(p)) && D.POIN_PENTING.some((p) => /dua puluh/.test(p)) && D.POIN_PENTING.some((p) => /sebelas/.test(p)), "poin penting: sepuluh dulu, sebelas, dua puluh");
  sama(L.pilihanNama(13), [3, 13, 14], "pilihan nama: satuan saja dan tetangga");
  sama(L.tebakanDekat([5, 10, 15], 12), 1, "tebakan dekat");
  sama(L.tebakanDekat([10, 14], 12), -1, "tebakan sama dekat");
  sama([L.geserManik(3, 7), L.geserManik(8, 2)], [8, 2], "geser manik maju dan mundur");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_IKAN === D.CONCRETE && D.PICTORIAL_IKAN === D.PICTORIAL && D.ABSTRACT_IKAN === D.ABSTRACT && D.TEMA_IKAN === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const jauh = (a, b, d) => Math.hypot(a.x - b.x, a.y - b.y) >= d;
  for (let i = 0; i < 20; i += 1) {
    const p = K.letakKantong(i);
    cek(p.x - 13 >= K.KANTONG.x && p.x + 13 <= K.KANTONG.x + K.KANTONG.w && p.y - 13 >= K.KANTONG.y + 16 && p.y + 13 <= K.KANTONG.y + K.KANTONG.h, `kantong ${i} di dalam kantong`);
    const s = K.letakSekat(i);
    const w = K.WADAH[Math.floor(i / 10)];
    cek(s.x - K.SEKAT / 2 >= w.x && s.x + K.SEKAT / 2 <= w.x + w.w && s.y - K.SEKAT / 2 >= w.y && s.y + K.SEKAT / 2 <= w.y + w.h && s.x + 13 <= 300, `sekat ${i} di dalam wadah`);
    const kt = K.letakKotak(i);
    const b = K.BINGKAI[Math.floor(i / 10)];
    cek(kt.x - 13 >= b.x && kt.x + 13 <= b.x + b.w && kt.y - 13 >= b.y && kt.y + 13 <= b.y + b.h && b.x + b.w <= 300, `kotak bingkai ${i} di dalam bingkai`);
  }
  cek(K.WADAH[0].x >= K.KANTONG.x + K.KANTONG.w + 4 && K.WADAH[0].y + K.WADAH[0].h < K.WADAH[1].y - 10 && K.WADAH[1].y + K.WADAH[1].h <= 196, "wadah tidak bertumpuk dengan kantong");
  for (let i = 0; i < 19; i += 1) cek(jauh(K.letakKantong(i), K.letakKantong(i + 1), 30), `kantong ${i} berjarak untuk tanda`);
  for (let i = 0; i < 3; i += 1) {
    const p = K.letakNama(i);
    cek(p.x - K.LEBAR_NAMA / 2 >= 0 && p.x + K.LEBAR_NAMA / 2 <= 300 && p.y - 16 > K.BINGKAI[0].y + K.BINGKAI[0].h && p.y + 16 <= 200, `kartu nama ${i} di bawah bingkai`);
  }
  for (const t of [0, 3, 7, 10]) for (const b of [0, 1]) for (let i = 0; i < 10; i += 1) {
    const p = K.letakManik(b, i, t);
    cek(p.x - K.JARI_MANIK >= 6 && p.x + K.JARI_MANIK <= 294, `manik ${b}/${i} tergeser ${t} masuk papan`);
    if (i < 9) cek(K.letakManik(b, i + 1, t).x - p.x >= 2 * K.JARI_MANIK, `manik ${b}/${i} tidak bertumpuk (tergeser ${t})`);
  }
  for (let i = 0; i < 12; i += 1) {
    const p = K.letakToples(i);
    cek(p.x - 16 >= K.TOPLES.x + 4 && p.x + 16 <= K.TOPLES.x + K.TOPLES.w - 4 && p.y - 16 >= K.TOPLES.y && p.y + 16 <= K.TOPLES.y + K.TOPLES.h, `toples ${i} di dalam toples`);
  }
  for (let i = 0; i < 10; i += 1) {
    const p = K.letakPetak(i);
    cek(p.x - 27 >= 0 && p.x + 27 <= 300 && p.y - 22 >= 30 && p.y + 22 <= 200, `petak kata ${i} masuk kanvas di bawah judul`);
  }
  const coret = (p) => [{ x: p.x - 6, y: p.y - 6 }, { x: p.x + 6, y: p.y + 6 }];
  const kp = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(K.letakKantong);
  cek(K.periksaCentang(kp.map(coret), kp, 14).benar, "jaring: tanda di sembilan isi kantong diterima");
  cek(!K.periksaCentang(kp.slice(0, 8).map(coret), kp, 14).benar, "jaring: kurang satu tanda ditolak");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const titik = [0, 1].flatMap((b) => Array.from({ length: 10 }, (_, i) => K.letakManik(b, i, b === 0 ? 10 : 6)));
  const sasaran = titik.map((_, n) => n >= 10 && n - 10 < 6);
  const pusat = { x: (titik[10].x + titik[15].x) / 2, y: titik[10].y };
  cek(K.periksaLingkari([lingkar(pusat, 70, 20)], titik, sasaran).benar, "manik: lingkari enam manik tergeser di baris bawah diterima");
  cek(!K.periksaLingkari([lingkar(pusat, 70, 80)], titik, sasaran).benar, "manik: lingkaran ikut baris atas ditolak");
  const nama = [0, 1, 2].map(K.letakNama);
  cek(K.periksaLingkari([lingkar(nama[1], 46, 22)], nama, [false, true, false]).benar, "bingkai: lingkari satu nama diterima");
}

/* ------------------------------ Simulasi wadah sekat sepuluh ------------------------------ */
{
  const B = D.KANTONG_SIM;
  sama(B.map((b) => b.total), [12, 16, 19], "kantong: banyak ikan");
  cek(B.every((b) => !/guppy|koki|neon/i.test(b.nama) && !STORY.has(b.total) && D.EMOJI[b.jenis]), "kantong: berbeda dari Story dan bergambar");
  sama(M.TOTAL_IKAN_A, Object.fromEntries(B.map((b) => [b.id, b.total])), "kantong: misi memakai banyak yang sama dengan data");
  cek(L.TEBAKAN_SIM.every((t) => t >= 0 && t <= 20) && B.every((b) => L.TEBAKAN_SIM.some((t) => Math.abs(t - b.total) <= 2)), "kantong: tiap kantong punya tebakan dekat");
  let k = L.awalIkan(B);
  sama([k.alat, k.pilih, k.pindah.molly, k.tebak.buntal, k.angka.cupang, k.ulang], ["ikan", "cupang", 0, null, null, []], "ikan: awal");
  for (let i = 0; i < 15; i += 1) k = L.jaringSatu(k, B);
  sama([k.pindah.cupang, L.sisaKantong(k, B), L.sudahDihitung(k, B)], [12, 0, true], "ikan: jaring berhenti saat kantong kosong");
  k = L.kembalikanSatu(k);
  sama([k.pindah.cupang, k.ulang], [11, ["cupang"]], "ikan: kembalikan satu tercatat");
  k = L.kembalikanSatu(L.jaringSatu(k, B));
  sama(k.ulang, ["cupang"], "ikan: catatan kembali tidak kembar");
  k = L.pilihKantong(k, "molly");
  const kosong = L.kembalikanSatu(k);
  sama(kosong.pindah.molly, 0, "ikan: tidak bisa kembali di bawah nol");
  k = L.pasangNama(L.pasangAngka(L.tebakIkan(k, 15), 16), 16);
  sama([k.tebak.molly, k.angka.molly, k.nama.molly], [15, 16, 16], "ikan: tebak dan label");
  for (const b of B) for (const n of [0, 5, 10, b.total]) {
    let x = L.pilihKantong(L.awalIkan(B), b.id);
    for (let i = 0; i < n; i += 1) x = L.jaringSatu(x, B);
    cek(tanpaDigit(L.kalimatIkan(x, B)) && !TERLARANG.test(L.kalimatIkan(x, B)), `ikan: kalimat ${b.id} ${n} tanpa digit`);
  }
  const daftar = M.daftarMisiBab5("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalIkan(B);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  const isi = (st, id) => {
    let x = L.pilihKantong(st, id);
    while (!L.sudahDihitung(x, B)) x = L.jaringSatu(x, B);
    return x;
  };
  cek(ada(isi(L.tebakIkan(awal, 10), "cupang"), "a-tebak") && !ada(isi(awal, "cupang"), "a-tebak"), "misi A: tebak lalu hitung semua");
  let p = awal;
  for (let i = 0; i < 11; i += 1) p = L.jaringSatu(p, B);
  cek(ada(p, "a-sepuluh") && !ada(L.kembalikanSatu(p), "a-sepuluh"), "misi A: wadah kedua mulai terisi");
  let lb = awal;
  for (const b of B) lb = L.pasangNama(L.pasangAngka(isi(lb, b.id), b.total), b.total);
  sama(L.labelTepat(lb, B), 3, "ikan: tiga label tepat");
  cek(ada(lb, "a-label") && ada(lb, "a-semua") && !ada(L.pasangNama(lb, 18), "a-semua"), "misi A: semua label tepat");
  cek(!ada(L.pasangNama(L.pasangAngka(awal, 12), 12), "a-label"), "misi A: label belum dihitung tidak memenuhi");
  cek(ada(isi(L.tebakIkan(L.pilihKantong(awal, "buntal"), 20), "buntal"), "a-dekat") && !ada(isi(L.tebakIkan(L.pilihKantong(awal, "buntal"), 5), "buntal"), "a-dekat"), "misi A: tebakan dekat");
  cek(ada(isi(L.kembalikanSatu(L.jaringSatu(awal, B)), "cupang"), "a-ulang") && !ada(L.kembalikanSatu(L.jaringSatu(awal, B)), "a-ulang"), "misi A: kembalikan lalu hitung lagi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/ikan-k1b5a/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 9, `berkas ikan-k1b5a (${berkas.length})`);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahIkan.tsx", "TahapIkan.tsx", "GelembungAkuarium.tsx", "LabelAkuarium.tsx", "SimulasiJaringIkan.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab5.tsx", import.meta.url), "utf8");
  cek(/A: "Misi Lapak Ikan[^"\d]*"/.test(ms), "SimulasiBab5: teks misi A tanpa digit");
  cek(ms.includes("SimulasiJaringIkan") && /huruf === "A" \? \[wadahIkan\]/.test(ms), "SimulasiBab5: tab Sub-Bab A memakai wadah ikan");
  for (const f of ["misi-bab5.ts", "SimulasiBab5.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
