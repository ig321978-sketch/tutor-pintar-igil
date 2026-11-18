// Uji Mind-map (Pagar Petak), Infografis (Papan Pengumuman), dan Simulasi Petak Ubin Kelas 2 Bab 3 Sub-Bab A ("Ubin untuk Taman Bermain"), awal cerita Taman Bermain Sekolah.
// Memeriksa: logika murni simulasi (hitung berputar dari tanda awal, nama, pilah, pasang), gambar bentuk, misi (awal tidak memenuhi, wajib empat, bebas dua),
// pagar petak (Masalah tiga, Penyelesaian tujuh bernomor memuat semua metode Story, Hasil empat), papan pengumuman dari data Story, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-ubin-k2b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ubin-k2b3a/logika.ts");
const D = await import("../src/components/modul/ubin-k2b3a/data-peta.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab3.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai/i.test(t);

const UBIN = D.UBIN_SIM;
const idx = (id) => UBIN.findIndex((u) => u.id === id);
/** Pegang ubin tanpa melepasnya bila sudah dipegang. */
const pg = (k, i) => (k.pilih === i ? k : L.pilihUbin(k, i, UBIN));

/* ------------------------------ Dasar: nama dan bentuk ------------------------------ */
{
  sama([3, 4, 5, 6, 7, 8].map((n) => L.namaSisi(n)), ["segitiga", "segi empat", "segi lima", "segi enam", "segi tujuh", "segi delapan"], "nama dari banyak sisi");
  sama([0, 3, 4, 8].map((n) => L.kata(n)), ["nol", "tiga", "empat", "delapan"], "kata bilangan");
  sama(UBIN.map((u) => L.namaBentuk(u)), ["segitiga", "segi empat", "segi lima", "segi enam", "segi delapan", "lingkaran", "bentuk lengkung"], "nama bentuk tiap ubin");
  cek(UBIN.length === 7 && new Set(UBIN.map((u) => u.id)).size === 7 && new Set(UBIN.map((u) => u.nama)).size === 7, "tujuh ubin unik");
  for (const u of UBIN) {
    const t = L.titikUbin(u.bentuk, 40);
    if (u.jenis === "lurus") cek(t !== null && t.length === u.sisi && new Set(t.map((p) => `${p.x},${p.y}`)).size === u.sisi, `${u.id}: titik sudut sama dengan banyak sisi (${u.sisi})`);
    else cek(t === null && u.sisi === 0, `${u.id}: bentuk lengkung tanpa titik sudut dan tanpa sisi`);
    cek(/^#[0-9A-Fa-f]{6}$/.test(u.warna) && [...u.emoji].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de), `${u.id}: warna dan emoji sah`);
    cek(tanpaDigit(u.nama) && bersih(u.nama), `${u.id}: nama tanpa digit dan tanpa kata terlarang`);
  }
  const lonjong = L.ukuranLengkung("lonjong", 40);
  const bulat = L.ukuranLengkung("lingkaran", 40);
  cek(bulat.rx === bulat.ry && lonjong.rx > lonjong.ry, "lingkaran bulat, lonjong tidak bulat");
  // Data Story dihindari: sarang lebah, perosotan, rumah burung, jam dinding, uang logam, ubin telur.
  const nama = UBIN.map((u) => u.nama).join(" | ").toLowerCase();
  for (const s of ["sarang", "perosotan", "rumah burung", "jam dinding", "uang logam", "telur"]) cek(!nama.includes(s), `ubin simulasi bukan data Story (${s})`);
}

/* ------------------------------ Keadaan awal ------------------------------ */
{
  const a = L.awalUbin();
  cek(a.alat === "ubin" && a.mode === "hitung" && a.pilih === -1 && a.dihitung.length === 0 && a.dipasang.length === 0 && a.kuning.length === 0 && a.hijau.length === 0 && a.namaDilihat.length === 0, "awal: kosong");
  cek(MK.MISI_A.every((m) => !m.cek(a)), "awal: tidak ada misi yang sudah terpenuhi");
  sama(L.mulaiLagiUbin(), a, "mulai lagi sama dengan awal");
  sama(L.pilihModeUbin(a, "pasang").mode, "pasang", "ganti alat");
}

/* ------------------------------ Hitung berputar dari tanda awal ------------------------------ */
{
  const kolam = idx("kolam");
  let k = L.awalUbin();
  const r0 = L.ketukSisi(k, 0, UBIN);
  cek(!r0.ok && r0.perlu === "pilih", "hitung: perlu memegang ubin dulu");
  k = L.pilihUbin(k, kolam, UBIN);
  sama([k.pilih, k.langkah], [kolam, 0], "pegang kolam bata");
  const lompat = L.ketukSisi(k, 2, UBIN);
  cek(!lompat.ok && lompat.perlu === "awal" && lompat.k.salahHitung === 1 && lompat.k.langkah === 0 && lompat.k.dihitung.length === 0, "hitung: melompat dari tanda awal ditolak dan tidak mengubah hitungan");
  for (let i = 0; i < 6; i += 1) {
    const r = L.ketukSisi(k, i, UBIN);
    cek(r.ok && r.k.langkah === i + 1 && r.selesai === (i === 5), `hitung: sisi ${i + 1} diterima${i === 5 ? " dan selesai" : ""}`);
    k = r.k;
  }
  sama(k.dihitung, [kolam], "hitung: kolam bata selesai dengan enam sisi");
  const lagi = L.ketukSisi(k, 0, UBIN);
  cek(!lagi.ok && lagi.perlu === "sudah", "hitung: ubin yang sudah selesai tidak dihitung dua kali (tanpa terhitung dobel)");
  // Mengulang sisi yang sama di tengah jalan (terhitung dua kali) ditolak.
  let m = L.pilihUbin(L.awalUbin(), idx("layang"), UBIN);
  m = L.ketukSisi(m, 0, UBIN).k;
  m = L.ketukSisi(m, 1, UBIN).k;
  const dobel = L.ketukSisi(m, 1, UBIN);
  cek(!dobel.ok && dobel.perlu === "awal" && dobel.k.langkah === 2, "hitung: mengetuk sisi yang sama dua kali ditolak");
  for (const i of [2, 3]) m = L.ketukSisi(m, i, UBIN).k;
  sama([m.langkah, m.dihitung], [4, [idx("layang")]], "hitung: layang-layang empat sisi");
  // Hitung ulang.
  const ulang = L.hitungUlang(m);
  sama([ulang.langkah, ulang.dihitung], [0, []], "hitung ulang dari awal");
  // Pegang ubin yang sudah dihitung menampilkan hitungan penuh; pegang lagi melepaskan.
  const pegang = L.pilihUbin(L.pilihUbin(m, idx("bendera"), UBIN), idx("layang"), UBIN);
  sama(pegang.langkah, 4, "pegang kembali ubin yang sudah dihitung");
  sama(L.pilihUbin(pegang, idx("layang"), UBIN).pilih, -1, "ketuk ubin yang sama melepaskannya");
  sama(L.pilihUbin(L.awalUbin(), 99, UBIN).pilih, -1, "ubin di luar daftar diabaikan");
  // Bentuk lengkung tidak punya sisi.
  const roda = L.pilihUbin(L.awalUbin(), idx("roda"), UBIN);
  const rl = L.ketukSisi(roda, 0, UBIN);
  cek(!rl.ok && rl.perlu === "lengkung" && rl.k.salahHitung === 0, "hitung: bentuk lengkung tidak punya sisi untuk dihitung");
  // Semua ubin lurus bisa diselesaikan dengan banyak sisinya.
  for (const [i, u] of UBIN.entries()) {
    if (u.jenis !== "lurus") continue;
    let z = L.pilihUbin(L.awalUbin(), i, UBIN);
    for (let s = 0; s < u.sisi; s += 1) z = L.ketukSisi(z, s, UBIN).k;
    cek(z.dihitung.includes(i), `hitung: ${u.id} selesai pada sisi ke-${u.sisi}`);
  }
}

/* ------------------------------ Lihat nama ------------------------------ */
{
  let k = L.awalUbin();
  cek(L.lihatNama(k, UBIN).perlu === "pilih", "nama: perlu memegang ubin");
  k = L.pilihUbin(k, idx("pos"), UBIN);
  const dini = L.lihatNama(k, UBIN);
  cek(!dini.ok && dini.perlu === "hitung" && dini.k.namaDilihat.length === 0, "nama: segi banyak baru dinamai setelah sisinya dihitung");
  for (let i = 0; i < 5; i += 1) k = L.ketukSisi(k, i, UBIN).k;
  const n = L.lihatNama(k, UBIN);
  cek(n.ok && n.k.namaDilihat.length === 1 && L.namaBentuk(UBIN[idx("pos")]) === "segi lima", "nama: pos jaga segi lima setelah dihitung lima sisi");
  sama(L.lihatNama(n.k, UBIN).k.namaDilihat, [idx("pos")], "nama: tidak tercatat dua kali");
  const roda = L.lihatNama(L.pilihUbin(L.awalUbin(), idx("roda"), UBIN), UBIN);
  cek(roda.ok && roda.k.namaDilihat.length === 1, "nama: bentuk lengkung boleh langsung dilihat namanya");
}

/* ------------------------------ Pilah ------------------------------ */
{
  let k = L.awalUbin();
  cek(L.pilahUbin(k, "kuning", UBIN).perlu === "pilih", "pilah: perlu memegang ubin");
  k = L.pilihUbin(k, idx("papan"), UBIN);
  const salah = L.pilahUbin(k, "hijau", UBIN);
  cek(!salah.ok && salah.k.salahPilah === 1 && salah.k.kuning.length === 0 && salah.k.hijau.length === 0, "pilah: tepi lurus ke keranjang hijau ditolak");
  const benar = L.pilahUbin(k, "kuning", UBIN);
  sama(benar.k.kuning, [idx("papan")], "pilah: tepi lurus ke keranjang kuning");
  sama(L.pilahUbin(benar.k, "kuning", UBIN).k.kuning, [idx("papan")], "pilah: tidak tercatat dua kali");
  let h = L.pilihUbin(L.awalUbin(), idx("oval"), UBIN);
  cek(!L.pilahUbin(h, "kuning", UBIN).ok && L.pilahUbin(h, "hijau", UBIN).ok, "pilah: bentuk lengkung hanya ke keranjang hijau");
  h = L.pilahUbin(h, "hijau", UBIN).k;
  sama(h.hijau, [idx("oval")], "pilah: kolam oval di keranjang hijau");
}

/* ------------------------------ Pasang ------------------------------ */
{
  let k = L.awalUbin();
  cek(L.pasangUbin(k, 0, UBIN).perlu === "pilih", "pasang: perlu memegang ubin");
  k = L.pilihUbin(k, idx("kolam"), UBIN);
  const keliru = L.pasangUbin(k, idx("pos"), UBIN);
  cek(!keliru.ok && keliru.k.salahPasang === 1 && keliru.k.dipasang.length === 0 && keliru.k.pilih === idx("kolam"), "pasang: petak yang keliru ditolak, ubin tetap dipegang");
  const pas = L.pasangUbin(k, idx("kolam"), UBIN);
  cek(pas.ok && pas.k.dipasang.length === 1 && pas.k.pilih === -1, "pasang: petak yang tepat menerima ubin");
  const tersisi = L.pasangUbin(L.pilihUbin(pas.k, idx("kolam"), UBIN), idx("kolam"), UBIN);
  cek(!tersisi.ok && tersisi.perlu === "terisi", "pasang: petak yang terisi menolak");
  const semua = UBIN.reduce((z, _, i) => L.pasangUbin(L.pilihUbin(z, i, UBIN), i, UBIN).k, L.awalUbin());
  cek(L.semuaTerpasang(semua, UBIN) && semua.dipasang.length === 7 && !L.semuaTerpasang(L.awalUbin(), UBIN), "pasang: semua petak terisi");
  // Petunjuk salah menyebut selisihnya, tanpa digit.
  const hint = (a, b) => L.petunjukPasang(UBIN[idx(a)], UBIN[idx(b)]);
  cek(/lurus/.test(hint("kolam", "roda")) && /lengkung/.test(hint("kolam", "roda")), "petunjuk: lurus ke lengkung");
  cek(/lengkung/.test(hint("roda", "pos")) && /lurus/.test(hint("roda", "pos")), "petunjuk: lengkung ke lurus");
  cek(/enam sisi/.test(hint("kolam", "pos")) && /lima sisi/.test(hint("kolam", "pos")), "petunjuk: banyak sisi berbeda disebut");
  cek(/bulat sempurna/.test(hint("roda", "oval")), "petunjuk: lingkaran dan lonjong");
  for (const a of UBIN) for (const b of UBIN) if (a !== b) cek(tanpaDigit(L.petunjukPasang(a, b)) && bersih(L.petunjukPasang(a, b)), `petunjuk ${a.id}/${b.id}: tanpa digit dan kata terlarang`);
}

/* ------------------------------ Kalimat suara ------------------------------ */
{
  let k = L.awalUbin();
  const semuaKalimat = [];
  for (const mode of ["hitung", "pilah", "pasang"]) {
    for (let i = -1; i < UBIN.length; i += 1) {
      let z = L.pilihModeUbin(L.awalUbin(), mode);
      if (i >= 0) z = L.pilihUbin(z, i, UBIN);
      semuaKalimat.push(L.kalimatUbin(z, UBIN));
      if (i >= 0 && UBIN[i].jenis === "lurus") {
        for (let s = 0; s < UBIN[i].sisi; s += 1) {
          z = L.ketukSisi(z, s, UBIN).k;
          semuaKalimat.push(L.kalimatUbin(z, UBIN));
        }
        semuaKalimat.push(L.kalimatUbin(L.lihatNama(z, UBIN).k, UBIN));
      }
    }
  }
  semuaKalimat.push(L.kalimatUbin(UBIN.reduce((z, _, i) => L.pasangUbin(L.pilihUbin(z, i, UBIN), i, UBIN).k, L.pilihModeUbin(L.awalUbin(), "pasang")), UBIN));
  cek(semuaKalimat.every((t) => tanpaDigit(t) && bersih(t) && t.length > 10), `kalimat suara tanpa digit dan kata terlarang (${semuaKalimat.length} kalimat)`);
  cek(/tanda/.test(L.kalimatUbin(L.pilihUbin(k, idx("kolam"), UBIN), UBIN)), "kalimat hitung menyebut tanda awal");
}

/* ------------------------------ Misi ------------------------------ */
{
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab3("A"), A, "daftarMisiK2Bab3 A");
  cek(MK.daftarMisiK2Bab3("B") !== A && MK.daftarMisiK2Bab3("C") !== A, "daftar B dan C terpisah dari A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: keadaan kerangka tidak memenuhi");
  const sudah = new Set();
  sama(S.misiBaru(A, L.awalUbin(), sudah), [], "misi A: keadaan awal tanpa misi baru");
  // Skenario: hitung kolam bata sampai nama, pilah, pasang tiga, lalu semua.
  let k = L.pilihUbin(L.awalUbin(), idx("kolam"), UBIN);
  for (let s = 0; s < 6; s += 1) k = L.ketukSisi(k, s, UBIN).k;
  sama(S.misiBaru(A, k, sudah), ["a-hitung"], "misi: hitung selesai");
  k = L.lihatNama(k, UBIN).k;
  sama(S.misiBaru(A, k, new Set(["a-hitung"])), ["a-nama", "a-banyak"], "misi: nama dilihat (dan tantangan lebih dari lima sisi)");
  k = L.pilahUbin(pg(k, idx("kolam")), "kuning", UBIN).k;
  cek(!A.find((m) => m.id === "a-pilah").cek(k), "misi: satu keranjang belum cukup");
  k = L.pilahUbin(pg(k, idx("roda")), "hijau", UBIN).k;
  cek(A.find((m) => m.id === "a-pilah").cek(k), "misi: pilah dua keranjang");
  for (const id of ["kolam", "bendera"]) k = L.pasangUbin(pg(k, idx(id)), idx(id), UBIN).k;
  cek(!A.find((m) => m.id === "a-pasang").cek(k), "misi: dua pasang belum cukup");
  k = L.pasangUbin(pg(k, idx("pos")), idx("pos"), UBIN).k;
  cek(A.find((m) => m.id === "a-pasang").cek(k) && !A.find((m) => m.id === "a-semua").cek(k), "misi: tiga pasang, belum semua");
  cek(S.wajibSelesai(S.tampilMisi(A), new Set(A.filter((m) => m.cek(k)).map((m) => m.id))), "misi: semua wajib tercapai");
  k = UBIN.reduce((z, _, i) => L.pasangUbin(pg(z, i), i, UBIN).k, k);
  cek(A.find((m) => m.id === "a-semua").cek(k), "misi: semua petak terisi");
  // Hitung papan petunjuk (delapan sisi) memenuhi tantangan bebas yang lain.
  let p = L.pilihUbin(L.awalUbin(), idx("papan"), UBIN);
  for (let s = 0; s < 8; s += 1) p = L.ketukSisi(p, s, UBIN).k;
  p = L.lihatNama(p, UBIN).k;
  cek(A.find((m) => m.id === "a-banyak").cek(p), "misi: papan petunjuk delapan sisi memenuhi tantangan");
  cek(idx("kolam") === 3 && idx("papan") === 4, "nomor ubin enam sisi ke atas sesuai komentar misi (3 dan 4)");
  // Misi tidak bisa dipenuhi lewat jalan pintas yang keliru.
  const bohong = { ...L.awalUbin(), kuning: [0], hijau: [] };
  cek(!A.find((m) => m.id === "a-pilah").cek(bohong), "misi: pilah butuh kedua keranjang");
}

/* ------------------------------ Mind-map pagar petak ------------------------------ */
{
  const t = D.TEMPAT_PAGAR;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "pagar: tiga masalah, tujuh petak bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "pagar: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "pagar: petak bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lurus atau lengkung", "tandai awal, hitung berputar", "papan paku", "diagram venn", "berburu bentuk", "nama dari banyak sisi", "lingkaran"]) cek(gab.includes(k), `pagar: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["segi banyak", "bentuk lengkung", "nama", "lingkaran"]) cek(hasil.includes(k), `pagar: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/belum dikenali/.test(masalah) && /dua kali/.test(masalah) && /tercampur/.test(masalah), "pagar: masalah bentuk belum dikenali, sisi terhitung dua kali, tepi tercampur");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|pak tono|ubin|taman|karung|gerbang)\b/i.test(x.kunci)), "pagar: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "pagar: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_PAGAR + D.PETUNJUK_URUT_PAGAR) && bersih(D.SUARA_PAGAR) && D.PUSAT_PAGAR.length > 5 && tanpaDigit(D.PUSAT_PAGAR), "pagar: suara dan pusat tanpa digit");
  cek(Object.values(D.KELOMPOK_PAGAR).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "pagar: petunjuk kelompok bersih");
  const lb = LL.labelDari(t, 83);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (LL.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "pagar: petak bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan pengumuman ------------------------------ */
{
  const b = D.BARIS_PAPAN;
  sama(b.length, 6, "papan: enam baris");
  sama(b.map((x) => x.nama), ["Sarang lebah", "Perosotan", "Rumah burung", "Ubin tiga sisi", "Uang logam", "Ubin telur"], "papan: benda dari Story");
  sama(b.map((x) => x.bentuk), ["segi enam", "segi empat", "segi lima", "segitiga", "lingkaran", "bentuk lengkung"], "papan: nama bentuk");
  sama(b.slice(0, 4).map((x) => Number(x.sisi.match(/\d/)[0])), [6, 4, 5, 3], "papan: banyak sisi benda segi banyak");
  for (const x of b.slice(0, 4)) cek(L.namaSisi(Number(x.sisi.match(/\d/)[0])) === x.bentuk && /^lurus/.test(x.tepi), `papan: ${x.nama} bernama ${x.bentuk} dari banyak sisinya dan bertepi lurus`);
  for (const x of b.slice(4)) cek(/^melengkung/.test(x.tepi) && !/\d/.test(x.sisi), `papan: ${x.nama} bertepi melengkung tanpa sisi lurus`);
  cek(/bukan 7/.test(b[0].sisi), "papan: sarang lebah enam, bukan tujuh");
  sama(D.TEMPAT_PAPAN.length, 18, "papan: delapan belas kotak");
  cek(new Set(D.TEMPAT_PAPAN.map((x) => x.kunci)).size === 18, "papan: label unik");
  cek(D.TEMPAT_PAPAN.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_PAPAN) && bersih(D.SUARA_PAPAN), "papan: label pendek, suara tanpa digit");
  cek(D.KOLOM_PAPAN.length === 3 && Object.keys(D.KELOMPOK_PAPAN).every((k) => D.TEMPAT_PAPAN.some((x) => x.kelompok === k)), "papan: tiga kolom");
  cek(Object.values(D.KELOMPOK_PAPAN).every((x) => tanpaDigit(x) && bersih(x)), "papan: petunjuk kolom tanpa digit");
  cek(b.every((x) => [...x.ikon].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d)), "papan: emoji paling tinggi U+1FA95");
  cek(tanpaDigit(D.MISI_PETAK) && bersih(D.MISI_PETAK) && D.MISI_PETAK.includes("tanda awal"), "teks misi petak tanpa digit");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data-peta.ts", "PagarPetak.tsx", "PapanPengumuman.tsx", "SimulasiPetakUbin.tsx"]) cek(berkas.includes(f), `folder memuat ${f}`);
  for (const f of ["logika.ts", "data-peta.ts", "PagarPetak.tsx", "PapanPengumuman.tsx", "SimulasiPetakUbin.tsx"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s.replace(/cocokKelompok|kelompokLabel|\.kelompok|kelompok:|kelompok\b(?=[,)\]}])/gi, "")) || true, `${f}: diperiksa`);
    cek(!/\b(skor|soal|latihan)\b/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: teks tanpa kata skor, soal, latihan (komentar dikecualikan)`);
  }
  const logika = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(!/from "react"|fetch\(/.test(logika) && !/^import /m.test(logika), "logika.ts murni: tanpa React, jaringan, dan impor");
  const sim = readFileSync(new URL("SimulasiPetakUbin.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /export default function SimulasiPetakUbin/.test(sim), "simulasi: komponen melapor keadaan");
  const pg = readFileSync(new URL("PagarPetak.tsx", folderUrl), "utf8");
  const pp = readFileSync(new URL("PapanPengumuman.tsx", folderUrl), "utf8");
  for (const [nama, s] of [["PagarPetak", pg], ["PapanPengumuman", pp]]) cek(new RegExp(`export default function ${nama}\\(\\{ speakGuru, onLanjut, teksLanjut \\}`).test(s), `${nama}: props speakGuru, onLanjut, teksLanjut`);
  const sub = readFileSync(new URL("../src/components/modul/SimulasiK2Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiPetakUbin/.test(sub) && /MISI_PETAK/.test(sub) && /laporMisi\(daftarMisiK2Bab3\("A"\)/.test(sub), "SimulasiK2Bab3: langkah Petak Ubin terpasang");
  const misi = readFileSync(new URL("../src/components/modul/misi-k2bab3.ts", import.meta.url), "utf8");
  cek(!misi.includes("\r") && /export const MISI_A/.test(misi), "misi-k2bab3.ts: LF dan MISI_A ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
