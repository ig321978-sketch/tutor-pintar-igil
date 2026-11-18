// Uji Mind-map (Rak Kayu), Infografis (Kartu Denah), Simulasi Rak Pameran, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 4 Sub-Bab A ("Rak Pameran Pak Hasan"),
// awal cerita Pameran Kerajinan Sekolah.
// Memeriksa: logika murni simulasi (taruh sesuai kartu, kalimat lawan, baca kanan kiri, gabung petunjuk), misi (awal tidak memenuhi, wajib empat, bebas dua),
// rak kayu (Masalah tiga, Penyelesaian tujuh bernomor memuat semua metode Story, Hasil empat), kartu denah dari data Story, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (kata posisi, ketuk petak, ketuk benda, satu angka) dan Cari kesalahan di tiap tahap, kunci dihitung dari data
// (hubungan benda, petak Simon, jalur peta, sisa Sekat), angka jawaban tidak kembar per tahap, soal yang langsung siap (jebakan tombol Periksa macet),
// tata letak kanvas, pengenal ucapan kata posisi, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-rak-k2b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/rak-k2b4a/logika.ts");
const DP = await import("../src/components/modul/rak-k2b4a/data-peta.ts");
const LC = await import("../src/components/modul/rak-k2b4a/logika-cpa.ts");
const D = await import("../src/components/modul/rak-k2b4a/data.ts");
const K = await import("../src/components/modul/rak-k2b4a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab4.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/rak-k2b4a/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);

const D0 = DP.BENDA_SIM;
const TB = DP.TUGAS_BACA;
const TK = DP.TEKA_SIM;

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(D0.length === 6 && new Set(D0.map((b) => b.id)).size === 6 && new Set(D0.map((b) => b.nama)).size === 6, "simulasi: enam benda unik");
  sama(D0.map((b) => `${b.kol}${b.bar}`), ["00", "10", "20", "01", "11", "21"], "simulasi: petak tujuan tiga kolom dua baris, semua berbeda");
  for (const b of D0) {
    cek(emojiSah(b.emoji) && /^#[0-9A-Fa-f]{6}$/.test(b.warna) && tanpaDigit(b.nama) && bersih(b.nama), `${b.id}: emoji, warna, nama sah`);
    // Kartu denah sesuai petak tujuan: letak terhadap acuan dihitung dari petak.
    const y = D0[b.kartu.acuan];
    const sisi = b.kol < y.kol && b.bar === y.bar ? "kiri" : b.kol > y.kol && b.bar === y.bar ? "kanan" : b.bar < y.bar && b.kol === y.kol ? "atas" : b.bar > y.bar && b.kol === y.kol ? "bawah" : null;
    cek(sisi === b.kartu.kata, `${b.id}: kartu denah (${b.kartu.kata}) sama dengan letak sebenarnya (${sisi})`);
  }
  const nama = D0.map((b) => b.nama).join(" | ").toLowerCase();
  for (const s of ["guci", "kendi", "topeng", "lampion", "wayang", "boneka", "rak"]) cek(!nama.includes(s), `benda simulasi bukan data Story (${s})`);
  // Tugas Baca: jawaban adalah benda yang bersebelahan di baris yang sama.
  for (const t of TB) {
    const y = D0[t.acuan];
    const x = D0[t.jawab];
    cek(x.bar === y.bar && x.kol === y.kol + (t.kata === "kanan" ? 1 : -1), `baca: ${D0[t.jawab].id} di sebelah ${t.kata} ${y.id}`);
  }
  cek(TB.some((t) => t.kata === "kanan") && TB.some((t) => t.kata === "kiri"), "baca: ada tugas kanan dan kiri");
  // Teka-teki Gabung: tinggal satu benda.
  for (const [i, t] of TK.entries()) {
    sama(L.sisaTeka(t, D0), [t.jawab], `gabung ${i}: dua petunjuk menyisakan tepat satu benda`);
    cek(L.sisaTeka({ petunjuk: [t.petunjuk[0], t.petunjuk[0]], jawab: 0 }, D0).length > 1, `gabung ${i}: satu petunjuk saja belum cukup`);
    cek(tanpaDigit(L.kalimatPetunjukSim(t.petunjuk[0], D0) + L.kalimatPetunjukSim(t.petunjuk[1], D0)), `gabung ${i}: kalimat petunjuk tanpa digit`);
  }
  sama([3, 4, 5].map((n) => L.kata(n)), ["tiga", "empat", "lima"], "kata bilangan");
}

/* ------------------------------ Taruh sesuai kartu denah ------------------------------ */
{
  const a = L.awalRak();
  cek(a.alat === "rak" && a.mode === "taruh" && a.pilih === -1 && a.terpasang.length === 0 && a.lawanLihat.length === 0 && a.baca.length === 0 && a.gabung.length === 0, "awal: kosong");
  cek(MK.MISI_A.every((m) => !m.cek(a)), "awal: tidak ada misi yang sudah terpenuhi");
  sama(L.mulaiLagiRak(), a, "mulai lagi sama dengan awal");
  sama(L.pilihModeRak({ ...a, pilih: 2 }, "baca"), { ...a, mode: "baca" }, "ganti alat melepas benda yang dipegang");
  cek(L.taruhBenda(a, 0, 0, D0).perlu === "pilih", "taruh: perlu memegang benda");
  let k = L.pilihBendaRak(a, 1, D0);
  sama(k.pilih, 1, "pegang topi anyaman");
  sama(L.pilihBendaRak(k, 1, D0).pilih, -1, "ketuk lagi melepaskan");
  sama(L.pilihBendaRak(a, 99, D0).pilih, -1, "benda di luar daftar diabaikan");
  const salah = L.taruhBenda(k, 0, 1, D0);
  cek(!salah.ok && salah.k.salahTaruh === 1 && salah.k.terpasang.length === 0 && salah.k.pilih === 1, "taruh: petak yang keliru ditolak, benda tetap dipegang");
  const terbalik = L.taruhBenda(k, 2, 0, D0);
  cek(!terbalik.ok, "taruh: kanan dan kiri tertukar ditolak");
  const betul = L.taruhBenda(k, 1, 0, D0);
  cek(betul.ok && betul.k.terpasang.length === 1 && betul.k.pilih === -1, "taruh: petak sesuai kartu menerima benda");
  const dobel = L.taruhBenda(L.pilihBendaRak(betul.k, 0, D0), 1, 0, D0);
  cek(!dobel.ok && dobel.perlu === "terisi", "taruh: petak yang terisi menolak");
  sama(L.pilihBendaRak(betul.k, 1, D0).pilih, -1, "benda yang sudah ditaruh tidak bisa dipegang lagi");
  const semua = D0.reduce((z, b, i) => L.taruhBenda(L.pilihBendaRak(z, i, D0), b.kol, b.bar, D0).k, L.awalRak());
  cek(L.semuaTerpasangRak(semua, D0) && semua.terpasang.length === 6 && !L.semuaTerpasangRak(a, D0), "taruh: semua benda di tempatnya");
  // Kalimat kartu dan lawan.
  sama(L.kalimatKartu(0, D0), "payung kertas di atas keranjang", "kalimat kartu payung kertas");
  sama(L.kalimatLawan(0, D0), "keranjang di bawah payung kertas", "kalimat lawan payung kertas");
  sama(L.kalimatLawan(1, D0), "payung kertas di sebelah kiri topi anyaman", "kalimat lawan topi anyaman (kanan menjadi kiri)");
  sama(L.kalimatLawan(4, D0), "topi anyaman di atas layang-layang", "kalimat lawan layang-layang (bawah menjadi atas)");
  const lw0 = L.lihatLawan(a, 0, D0);
  cek(!lw0.ok && lw0.k.lawanLihat.length === 0, "lawan: benda yang belum ditaruh belum bisa dilihat lawannya");
  const lw1 = L.lihatLawan(semua, 1, D0);
  sama(lw1.k.lawanLihat, [1], "lawan: benda yang sudah ditaruh dicatat");
  sama(L.lihatLawan(lw1.k, 1, D0).k.lawanLihat, [1], "lawan: tidak tercatat dua kali");
  // Petunjuk salah menyebut kartu dan letak keliru, tanpa digit.
  const hint = L.petunjukTaruh(1, 2, 0, D0);
  cek(/payung kertas/.test(hint) && /kanan/.test(hint) && /bunga|di sebelah kanan/.test(hint) && /dari kita/.test(hint), "petunjuk taruh: menyebut kartu dan letak yang keliru");
  cek(/sendiri/.test(L.petunjukTaruh(1, 0, 0, D0)), "petunjuk taruh: petak acuan sendiri");
  for (const i of D0.keys()) for (let c = 0; c < 3; c += 1) for (let b = 0; b < 2; b += 1) { const t = L.petunjukTaruh(i, c, b, D0); cek(tanpaDigit(t) && bersih(t), `petunjuk taruh ${i}/${c}${b}: tanpa digit dan kata terlarang`); }
}

/* ------------------------------ Baca dan Gabung ------------------------------ */
{
  let k = L.awalRak();
  sama(L.tugasBacaBerikut(k, TB), 0, "baca: tugas pertama");
  const salah = L.ketukBaca(k, 3, TB);
  cek(!salah.ok && salah.k.salahBaca === 1 && salah.k.baca.length === 0 && salah.k.kananBenar === 0, "baca: benda yang keliru tidak mencatat kemajuan");
  for (const [n, t] of TB.entries()) {
    const r = L.ketukBaca(k, t.jawab, TB);
    cek(r.ok && r.k.baca.length === n + 1 && r.selesai === (n === TB.length - 1), `baca: tugas ${n} benar`);
    k = r.k;
  }
  cek(k.kananBenar === 2 && k.kiriBenar === 2 && L.tugasBacaBerikut(k, TB) === -1, "baca: dua kanan dan dua kiri benar, semua selesai");
  cek(L.ketukBaca(k, 0, TB).selesai, "baca: sesudah selesai tidak berubah");
  cek(/dari kita/.test(L.petunjukBaca(TB[0], 2, D0)) && /acuan/.test(L.petunjukBaca(TB[0], 0, D0)) && /baris/.test(L.petunjukBaca(TB[0], 3, D0)), "petunjuk baca: menunjuk kesalahan");
  let g = L.awalRak();
  for (const [n, t] of TK.entries()) {
    const keliru = L.ketukGabung(g, (t.jawab + 1) % 6, TK);
    cek(!keliru.ok && keliru.k.salahGabung === g.salahGabung + 1 && keliru.k.gabung.length === n, `gabung ${n}: benda keliru ditolak`);
    const r = L.ketukGabung(g, t.jawab, TK);
    cek(r.ok && r.k.gabung.length === n + 1 && r.selesai === (n === TK.length - 1), `gabung ${n}: benda benar`);
    g = r.k;
  }
  // Petunjuk gabung menyebut petunjuk yang tidak cocok.
  cek(/petunjuk pertama/.test(L.petunjukGabung(TK[0], 0, D0)) || /petunjuk kedua/.test(L.petunjukGabung(TK[0], 0, D0)), "petunjuk gabung: menyebut petunjuk yang tidak cocok");
  cek(/petunjuk kedua/.test(L.petunjukGabung(TK[0], 4, D0)) || /kedua petunjuk/.test(L.petunjukGabung(TK[0], 4, D0)), "petunjuk gabung: benda di baris lain");
  for (const t of TK) for (let i = 0; i < 6; i += 1) { const h = L.petunjukGabung(t, i, D0); cek(tanpaDigit(h) && bersih(h), `petunjuk gabung ${i}: tanpa digit`); }
  // Kalimat suara.
  const semuaKalimat = [];
  for (const mode of ["taruh", "baca", "gabung"]) {
    let z = L.pilihModeRak(L.awalRak(), mode);
    semuaKalimat.push(L.kalimatRak(z, D0, TB, TK));
    for (let i = 0; i < 6; i += 1) semuaKalimat.push(L.kalimatRak(L.pilihBendaRak(z, i, D0), D0, TB, TK));
    for (const [n, t] of TB.entries()) { z = { ...z, baca: [...z.baca, n] }; semuaKalimat.push(L.kalimatRak(z, D0, TB, TK)); void t; }
    z = { ...L.pilihModeRak(L.awalRak(), mode), gabung: [0], terpasang: [0, 1] };
    semuaKalimat.push(L.kalimatRak(z, D0, TB, TK));
    z = { ...z, gabung: [0, 1, 2], terpasang: [0, 1, 2, 3, 4, 5] };
    semuaKalimat.push(L.kalimatRak(z, D0, TB, TK));
  }
  cek(semuaKalimat.every((t) => tanpaDigit(t) && bersih(t) && t.length > 10), `kalimat suara tanpa digit dan kata terlarang (${semuaKalimat.length} kalimat)`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab4("A"), A, "daftarMisiK2Bab4 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  const sudah = new Set();
  sama(S.misiBaru(A, L.awalRak(), sudah), [], "misi A: keadaan awal tanpa misi baru");
  const taruh = (z, i) => L.taruhBenda(L.pilihBendaRak(z, i, D0), D0[i].kol, D0[i].bar, D0).k;
  let k = taruh(taruh(L.awalRak(), 3), 0);
  cek(!A.find((m) => m.id === "a-taruh").cek(k), "misi: dua benda belum cukup");
  k = taruh(k, 1);
  cek(A.find((m) => m.id === "a-taruh").cek(k) && !A.find((m) => m.id === "a-semua").cek(k), "misi: tiga benda ditaruh, belum semua");
  k = L.lihatLawan(k, 0, D0).k;
  cek(A.find((m) => m.id === "a-lawan").cek(k), "misi: kalimat lawan dilihat");
  cek(!A.find((m) => m.id === "a-kanankiri").cek(k), "misi: baca belum dikerjakan");
  k = L.ketukBaca(k, TB[0].jawab, TB).k;
  cek(!A.find((m) => m.id === "a-kanankiri").cek(k), "misi: hanya kanan belum cukup");
  k = L.ketukBaca(k, TB[1].jawab, TB).k;
  cek(A.find((m) => m.id === "a-kanankiri").cek(k), "misi: kanan dan kiri sudah dibaca");
  cek(!A.find((m) => m.id === "a-gabung").cek(k), "misi: gabung belum dikerjakan");
  k = L.ketukGabung(k, TK[0].jawab, TK).k;
  cek(A.find((m) => m.id === "a-gabung").cek(k) && !A.find((m) => m.id === "a-teka").cek(k), "misi: satu teka-teki selesai");
  cek(S.wajibSelesai(S.tampilMisi(A), new Set(A.filter((m) => m.cek(k)).map((m) => m.id))), "misi: semua wajib tercapai");
  for (const i of [2, 4, 5]) k = taruh(k, i);
  cek(A.find((m) => m.id === "a-semua").cek(k), "misi: semua benda di tempatnya");
  k = L.ketukGabung(L.ketukGabung(k, TK[1].jawab, TK).k, TK[2].jawab, TK).k;
  cek(A.find((m) => m.id === "a-teka").cek(k), "misi: ketiga teka-teki selesai");
  // Jalan pintas yang keliru tidak memenuhi misi.
  cek(!A.find((m) => m.id === "a-kanankiri").cek({ ...L.awalRak(), kananBenar: 1 }) && !A.find((m) => m.id === "a-taruh").cek({ ...L.awalRak(), salahTaruh: 5 }), "misi: percobaan keliru tidak dihitung");
}

/* ------------------------------ Mind-map rak kayu ------------------------------ */
{
  const t = DP.TEMPAT_RAK;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "rak: tiga masalah, tujuh petak bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "rak: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rak: petak bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["siapa yang melihat", "benda acuan", "kata posisinya", "kalimat tiga bagian", "simon berkata", "peta harta karun", "permainan sekat"]) cek(gab.includes(k), `rak: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["enam kata posisi", "lawan", "kalimat posisi", "dua petunjuk"]) cek(hasil.includes(k), `rak: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/salah letak/.test(masalah) && /tertukar/.test(masalah) && /kurang jelas/.test(masalah), "rak: masalah salah letak, kanan kiri tertukar, petunjuk kurang jelas");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|pak hasan|guci|kendi|topeng|lampion|wayang|boneka|karya|pameran|aula)\b/i.test(x.kunci)), "rak: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "rak: label tanpa kata terlarang");
  cek(tanpaDigit(DP.SUARA_RAK + DP.PETUNJUK_URUT_RAK) && bersih(DP.SUARA_RAK) && DP.PUSAT_RAK.length > 5 && tanpaDigit(DP.PUSAT_RAK), "rak: suara dan pusat tanpa digit");
  cek(Object.values(DP.KELOMPOK_RAK).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "rak: petunjuk kelompok bersih");
  const lb = LL.labelDari(t, 83);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (LL.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "rak: petak bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis kartu denah ------------------------------ */
{
  const b = DP.BARIS_DENAH;
  sama(b.length, 5, "denah: lima baris");
  sama(b.map((x) => x.nama), ["Guci", "Kendi", "Topeng", "Wayang kertas", "Boneka kain"], "denah: benda dari Story");
  sama(b.slice(0, 4).map((x) => x.kata), ["di atas", "di bawah", "di depan", "di sebelah kanan"], "denah: kata posisi Story");
  cek(b[0].kalimat.startsWith("guci") && b[0].lawan === "rak di bawah guci" && b[1].lawan === "rak di atas kendi" && b[2].lawan === "lampion di belakang topeng" && b[3].lawan === "guci di kiri wayang" && b[4].lawan === "lampion di kiri boneka", "denah: kalimat lawan memakai kata lawan");
  sama(DP.TEMPAT_DENAH.length, 15, "denah: lima belas kotak");
  cek(new Set(DP.TEMPAT_DENAH.map((x) => x.kunci)).size === 15, "denah: label unik");
  cek(DP.TEMPAT_DENAH.every((x) => x.kunci.length <= 30 && bersih(x.kunci) && tanpaDigit(x.kunci)) && tanpaDigit(DP.SUARA_DENAH) && bersih(DP.SUARA_DENAH), "denah: label pendek, suara tanpa digit");
  cek(DP.KOLOM_DENAH.length === 3 && Object.keys(DP.KELOMPOK_DENAH).every((k) => DP.TEMPAT_DENAH.some((x) => x.kelompok === k)), "denah: tiga kolom");
  cek(Object.values(DP.KELOMPOK_DENAH).every((x) => tanpaDigit(x) && bersih(x)), "denah: petunjuk kolom tanpa digit");
  cek(b.every((x) => emojiSah(x.ikon)), "denah: emoji paling tinggi U+1FA95");
  cek(tanpaDigit(DP.MISI_RAK_TEKS) && bersih(DP.MISI_RAK_TEKS) && DP.MISI_RAK_TEKS.includes("kartu denah"), "teks misi rak tanpa digit");
}

/* ------------------------------ CPA: struktur ------------------------------ */
const TAHAP = { concrete: [D.CONCRETE_RAK, "benda"], pictorial: [D.PICTORIAL_RAK, "diagram"], abstract: [D.ABSTRACT_RAK, "lambang"] };
const semuaLangkah = [];
for (const [nama, [soal, rupa]] of Object.entries(TAHAP)) for (const so of soal) for (const ls of so.langkah) semuaLangkah.push({ tahap: nama, rupa, cara: so.cara, so, ls, l: ls.langkah });
sama(D.CONCRETE_RAK.map((s) => s.nomor).concat(D.PICTORIAL_RAK.map((s) => s.nomor), D.ABSTRACT_RAK.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari Simulasi");
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara berurutan`);
  cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat metode per cara (dua belas tugas)`);
  for (const so of soal) sama(so.langkah.map((x) => x.metode), ["igil", "simon", "peta", "sekat"], `${nama}/${so.nomor}: urutan metode`);
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
    cek(l.betul ? l.jawabTokoh === undefined : l.jawabTokoh !== undefined && l.jawabTokoh !== LC.kunciJawab(l, "klik").nama, `${nama}: jawaban tokoh ${l.tokoh} keliru bila salah, tanpa jawaban bila benar`);
    cek(x.metode === "igil" && x.cara === "klik", `${nama}: Cari kesalahan memakai metode IGIL pada cara klik`);
  }
}
cek(D.CONCRETE_RAK.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah" && !x.langkah.betul).length === 1, "Concrete: satu Cari kesalahan di mana tokoh salah (Chacha)");
cek(D.PICTORIAL_RAK.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah" && x.langkah.betul).length === 1, "Pictorial: satu Cari kesalahan di mana tokoh benar (Dika)");
cek(D.ABSTRACT_RAK.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah" && !x.langkah.betul).length === 1 && D.ABSTRACT_RAK.flatMap((s) => s.langkah).some((x) => x.langkah.tipe === "salah" && x.langkah.dasar.tanya === "a"), "Abstract: satu Cari kesalahan memakai kata lawan (Dika)");

/* ------------------------------ CPA: data sah dan kunci dihitung dari data ------------------------------ */
const kenaKata = (k) => LC.URUT_KATA.includes(k);
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const d = LC.dasarDari(l);
  const nama = `${tahap}/${ls.metode}/${cara}`;
  if (d.tipe === "acuan" || d.tipe === "simon" || d.tipe === "sekat") {
    const ad = d.ad;
    cek(ad.isi.every((b) => b.k >= 0 && b.k < 8 && b.kol >= 0 && b.kol < ad.kol && b.bar >= 0 && b.bar < ad.bar), `${nama}: benda di dalam papan`);
    cek(new Set(ad.isi.map((b) => b.k)).size === ad.isi.length, `${nama}: kode benda unik (tiap benda bernama sendiri)`);
    const petak = ad.isi.map((b) => `${b.kol},${b.bar},${b.dep ?? 0}`);
    cek(new Set(petak).size === petak.length, `${nama}: tidak ada dua benda di tempat yang sama`);
    cek(ad.isi.every((b, i) => ad.isi.every((c, j) => j === i || b.kol !== c.kol || b.bar !== c.bar || (b.dep !== undefined && c.dep !== undefined && b.dep !== c.dep))), `${nama}: satu petak berdua harus punya kedalaman berbeda`);
    cek(ad.kol <= 6 && ad.bar <= 2 && ad.isi.length <= 8, `${nama}: ukuran papan sah`);
  }
  if (d.tipe === "acuan") {
    const h = LC.hubungan(d.ad, d.t, d.a);
    cek(h !== null && d.t !== d.a, `${nama}: benda dan acuan sejalur`);
    const k = LC.kunciJawab(l, cara);
    if (cara === "kanvas") {
      cek(d.ad.bar === 1 && d.ad.kol >= 5 && k.jenis === "angka" && k.n === d.ad.isi[d.t].kol + 1, `${nama}: urutan dari kiri pada papan satu baris`);
    } else {
      cek(k.jenis === "nama" && kenaKata(k.nama) && k.nama === (d.tanya === "a" ? LC.hubungan(d.ad, d.a, d.t) : h), `${nama}: kunci kata posisi sama dengan hubungan benda`);
    }
  }
  if (d.tipe === "simon") {
    const h = LC.hubungan(d.ad, d.t, d.a);
    cek(h === d.kata, `${nama}: benda dan acuan sesuai kata Simon (${h} vs ${d.kata})`);
    sama(LC.petakSimon(d).length, 1, `${nama}: tepat satu petak kosong yang sah untuk perintah Simon`);
    const k = LC.kunciJawab(l, cara);
    if (cara === "klik") cek(k === null, `${nama}: klik Simon selesai lewat mengetuk petak`);
    if (cara === "kanvas") cek(k.jenis === "angka" && k.n === d.ad.isi.filter((_, i) => i !== d.a && LC.sisiCocok(d.ad, i, d.a, d.kata)).length, `${nama}: banyak benda dihitung dari data`);
    if (cara === "suara") cek(k.jenis === "nama" && k.nama === LC.LAWAN[d.kata], `${nama}: jawaban lawan kata`);
  }
  if (d.tipe === "peta") {
    const jalur = LC.jalurPeta(d);
    cek(jalur.every(([x, y]) => x >= 0 && x < d.kol && y >= 0 && y < d.bar), `${nama}: seluruh jalur peta di dalam papan`);
    cek(new Set(jalur.map((p) => p.join())).size === jalur.length, `${nama}: jalur peta tidak melewati petak yang sama`);
    cek(d.arah.length >= 2 && d.arah.length <= 4, `${nama}: dua sampai empat petunjuk`);
    cek(d.kol * d.bar >= 6 && d.kol <= 6 && d.bar <= 4, `${nama}: ukuran peta sah`);
    const k = LC.kunciJawab(l, cara);
    const [hx, hy] = LC.petakHarta(d);
    if (cara === "kanvas") cek(k.n === (d.hitung === "baris" ? hy + 1 : hx + 1) && d.mulai[0] >= 0, `${nama}: nomor ${d.hitung} harta dari data`);
    if (cara === "suara") cek(d.arah.every((a) => a === d.arah[0]) && k.nama === LC.LAWAN[d.arah[0]], `${nama}: semua petunjuk searah, jawaban lawan kata`);
    if (cara === "klik") cek(k === null && d.arah.some((a) => a !== d.arah[0]), `${nama}: klik peta mengetuk petak harta, petunjuk tidak searah`);
  }
  if (d.tipe === "sekat") {
    sama(LC.sisaSekat(d), [d.sasaran], `${nama}: dua petunjuk menyisakan tepat satu benda`);
    cek(LC.jumlahPetunjukSatu(d) > 1, `${nama}: satu petunjuk saja belum cukup`);
    const k = LC.kunciJawab(l, cara);
    if (cara === "kanvas") cek(k.n === LC.jumlahPetunjukSatu(d), `${nama}: banyak benda dari petunjuk pertama`);
    if (cara === "suara") {
      const p2 = d.petunjuk[1];
      cek(p2.j === "rel" && k.nama === p2.kata && LC.hubungan(d.ad, d.sasaran, p2.a) === p2.kata, `${nama}: kata yang hilang sejalur dengan acuan`);
    }
    cek(d.petunjuk.every((p) => (p.j === "tingkat" ? p.bar >= 0 && p.bar < d.ad.bar : p.a >= 0 && p.a < d.ad.isi.length)), `${nama}: petunjuk sah`);
  }
}

// Angka jawaban Tulis di kanvas per tahap tidak kembar (soal berjawaban kata tidak dihitung).
const ANGKA_TAHAP = {};
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  const ang = soal.find((s) => s.cara === "kanvas").langkah.map((x) => LC.kunciJawab(x.langkah, "kanvas").n);
  ANGKA_TAHAP[nama] = ang;
  cek(ang.length === 4 && new Set(ang).size === 4, `${nama}: empat angka kanvas tidak kembar (${ang.join(", ")})`);
  cek(ang.every((n) => n >= 1 && n <= 9), `${nama}: angka kanvas satu angka (${ang.join(", ")})`);
}
sama(ANGKA_TAHAP, { concrete: [5, 4, 6, 7], pictorial: [6, 5, 4, 7], abstract: [4, 6, 5, 7] }, "angka jawaban kanvas per tahap");
cek(semuaLangkah.every(({ cara, l }) => cara !== "kanvas" || LC.kunciJawab(l, "kanvas").jenis === "angka"), "semua kanvas berjawab satu angka");
// Data Story A dihindari: tidak ada benda Story di papan CPA (benda CPA hanya delapan kode baru).
cek(LC.NAMA_BENDA.benda.every((n) => !/guci|kendi|topeng|lampion|wayang|boneka|rak\b/i.test(n)) && LC.NAMA_BENDA.diagram.every((n) => /^(lingkaran|persegi|segitiga) (biru|merah|hijau|kuning)$/.test(n)), "benda CPA bukan data Story");

// Jenis jawaban beragam: kata posisi, ketuk petak, ketuk benda, satu angka.
{
  const jenis = new Set(semuaLangkah.map(({ cara, l }) => { const k = LC.kunciJawab(l, cara); return k === null ? `ketuk-${LC.dasarDari(l).tipe}` : k.jenis; }));
  cek(["nama", "angka", "ketuk-simon", "ketuk-peta", "ketuk-sekat"].every((j) => jenis.has(j)), `jenis jawaban beragam (${[...jenis].join(", ")})`);
  // Tiap tahap memuat semua jenis jawaban.
  for (const [nama, [soal]] of Object.entries(TAHAP)) {
    const j = new Set(soal.flatMap((s) => s.langkah.map((x) => { const k = LC.kunciJawab(x.langkah, s.cara); return k === null ? `ketuk-${LC.dasarDari(x.langkah).tipe}` : k.jenis; })));
    cek(["nama", "angka", "ketuk-simon", "ketuk-peta", "ketuk-sekat"].every((x) => j.has(x)), `${nama}: semua jenis jawaban ada`);
  }
}

/* ------------------------------ CPA: soal langsung siap (jebakan tombol macet) ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const nama = `${tahap}/${ls.metode}/${cara}`;
  const siap = LC.siapLangsung(l, rupa, cara);
  const k = LC.kunciJawab(l, cara);
  if (l.tipe === "salah") cek(!siap, `${nama}: Cari kesalahan memakai kegiatan lebih dulu`);
  else if (cara !== "klik") cek(siap && k !== null, `${nama}: kanvas dan suara langsung siap dijawab`);
  else cek(siap === (l.tipe === "acuan") && (siap ? k !== null : k === null), `${nama}: klik siap langsung hanya untuk memilih kata`);
  // Hasil tidak bergantung pada rupa: Abstract (lambang) sama dengan Concrete dan Pictorial.
  cek(["benda", "diagram", "lambang"].every((r) => LC.siapLangsung(l, r, cara) === siap), `${nama}: siap langsung sama untuk semua rupa`);
  // Soal yang selesai lewat kegiatan tidak punya kunci angka atau kata, dan sebaliknya soal berkunci selalu punya pilihan atau jawaban.
  if (k !== null && k.jenis === "nama") {
    const p = cara === "klik" ? LC.pilihanKata(l) : LC.pilihanKataDari(k.nama);
    cek(p.length === 4 && p.includes(k.nama) && p.includes(LC.LAWAN[k.nama]), `${nama}: empat pilihan memuat jawaban dan lawannya`);
    if (l.tipe === "salah" && l.jawabTokoh) cek(p.includes(l.jawabTokoh), `${nama}: pilihan memuat jawaban tokoh`);
  }
}
{
  const p = LC.pilihanKataDari("kanan");
  sama(p, ["bawah", "atas", "kiri", "kanan"].sort((a, b) => LC.URUT_KATA.indexOf(a) - LC.URUT_KATA.indexOf(b)), "pilihan kata untuk kanan");
  sama(LC.pilihanKataDari("kiri", "belakang").length, 4, "pilihan kata memuat jawaban tokoh");
}

/* ------------------------------ CPA: instruksi, kalimat, petunjuk ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const nama = `${tahap}/${ls.metode}/${cara}`;
  cek(tanpaDigit(ls.suara) && bersih(ls.suara) && !/\bskor\b/i.test(ls.suara), `${nama}: instruksi tanpa digit dan kata terlarang`);
  cek(!/bawalah|bawa benda|gambarlah|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i.test(ls.suara), `${nama}: instruksi tanpa suruhan membawa benda atau bermain bersama`);
  const kal = LC.kalimatKunci(l, cara, rupa);
  cek(tanpaDigit(kal) && bersih(kal) && kal.length > 15, `${nama}: kalimat kunci tanpa digit`);
  cek(tanpaDigit(LC.kalimatTanya(l, cara)) && bersih(LC.kalimatTanya(l, cara)), `${nama}: kalimat tanya tanpa digit`);
  const d = LC.dasarDari(l);
  const nm = (i) => LC.namaBenda(rupa, d.ad.isi[i].k);
  if (l.tipe === "acuan") cek(ls.suara.toLowerCase().includes(nm(l.t).toLowerCase()) && (cara === "kanvas" || ls.suara.toLowerCase().includes(nm(l.a).toLowerCase())), `${nama}: instruksi menyebut benda dan acuan`);
  if (d.tipe === "simon") cek(ls.suara.startsWith("Simon berkata") && ls.suara.includes(nm(d.a)), `${nama}: instruksi dibuka dengan Simon berkata dan menyebut acuan`);
  if (d.tipe === "peta") cek(/bintang/.test(ls.suara) && (cara === "suara" || /satu kotak/.test(ls.suara)), `${nama}: instruksi peta menyebut bintang dan langkah`);
  if (d.tipe === "sekat") cek(/petunjuk/i.test(ls.suara) && ls.suara.includes(LC.kalimatPetunjuk(d.petunjuk[0], rupa, d.ad)), `${nama}: instruksi sekat menyebut petunjuk pertama`);
  // Petunjuk salah menunjuk kesalahan, tanpa digit.
  const k = LC.kunciJawab(l, cara);
  if (k && k.jenis === "nama") {
    for (const w of LC.URUT_KATA) if (w !== k.nama) { const h = LC.petunjukSalah(l, cara, w, rupa); cek(tanpaDigit(h) && bersih(h) && h.length > 20, `${nama}: petunjuk salah untuk ${w}`); }
    if (!(l.tipe === "salah" && l.jawabTokoh === LC.LAWAN[k.nama])) cek(new RegExp(`lawan kata ${k.nama}`).test(LC.petunjukSalah(l, cara, LC.LAWAN[k.nama], rupa)), `${nama}: kata lawan disebut sebagai lawan`);
    if (k.nama === "kanan" || k.nama === "kiri") cek(/dari kita/.test(LC.petunjukSalah(l, cara, "atas", rupa)), `${nama}: petunjuk kanan kiri menyebut dari kita`);
  }
  if (k && k.jenis === "angka") {
    const h = LC.petunjukSalah(l, cara, k.n + 1, rupa);
    cek(tanpaDigit(h) && bersih(h) && h.length > 20, `${nama}: petunjuk angka salah`);
  }
  if (l.tipe === "salah" && l.jawabTokoh) cek(LC.petunjukSalah(l, "klik", l.jawabTokoh, rupa).includes(l.keliru), `${nama}: pilihan jawaban tokoh dijawab dengan penjelasan kesalahannya`);
  if (d.tipe === "simon") {
    for (let c = 0; c < d.ad.kol; c += 1) for (let b = 0; b < d.ad.bar; b += 1) { const h = LC.petunjukPetakSimon(d, c, b, rupa); cek(tanpaDigit(h) && bersih(h), `${nama}: petunjuk petak ${c}${b}`); }
  }
  if (d.tipe === "peta") for (let c = 0; c < d.kol; c += 1) for (let b = 0; b < d.bar; b += 1) { const h = LC.petunjukPetakPeta(d, c, b); cek(tanpaDigit(h) && bersih(h), `${nama}: petunjuk petak peta ${c}${b}`); }
  if (d.tipe === "sekat") for (let i = 0; i < d.ad.isi.length; i += 1) if (i !== d.sasaran) { const h = LC.petunjukBendaSekat(d, i, rupa); cek(tanpaDigit(h) && bersih(h), `${nama}: petunjuk benda sekat ${i}`); }
}

/* ------------------------------ CPA: tata letak kanvas ------------------------------ */
{
  for (const { tahap, rupa, l, ls } of semuaLangkah) {
    const d = LC.dasarDari(l);
    const nama = `${tahap}/${ls.metode}`;
    if (d.tipe === "peta") {
      const t = K.tataPeta(d.kol, d.bar);
      cek(t.s >= 25 && t.x0 >= 0 && t.x0 + d.kol * t.s <= K.LEBAR_ADEGAN && t.y0 + d.bar * t.s <= K.TINGGI_ADEGAN - 8, `${nama}: peta masuk kanvas (s=${t.s})`);
    } else {
      const t = K.tataPapan(d.ad);
      cek(t.sx >= 38 && t.x0 >= 0 && t.x0 + d.ad.kol * t.sx <= K.LEBAR_ADEGAN && t.y0 + d.ad.bar * t.sy <= K.TINGGI_ADEGAN, `${nama}: papan masuk kanvas (sx=${t.sx})`);
      for (let i = 0; i < d.ad.isi.length; i += 1) {
        const p = K.pusatBenda(d.ad, i);
        cek(p.x > 10 && p.x < 290 && p.y > 20 && p.y < 190, `${nama}: benda ${i} masuk kanvas`);
      }
      // Dua benda satu petak terlihat berbeda letaknya.
      const ganda = d.ad.isi.map((b, i) => [b, i]).filter(([b]) => d.ad.isi.some((c) => c !== b && c.kol === b.kol && c.bar === b.bar));
      if (ganda.length === 2) cek(K.pusatBenda(d.ad, ganda[0][1]).x !== K.pusatBenda(d.ad, ganda[1][1]).x, `${nama}: benda depan dan belakang tidak menumpuk`);
    }
  }
  const a = K.pusatPetak({ kol: 3, bar: 2 }, 1, 1);
  cek(a.x === 150 && a.y > 100, "pusat petak tengah");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("di atas"), ["atas"], "ucapan: di atas");
  sama(K.kataDariUcapan("sebelah kiri"), ["kiri"], "ucapan: sebelah kiri");
  sama(K.kataDariUcapan("Kanan!"), ["kanan"], "ucapan: kanan dengan tanda baca");
  sama(K.kataDariUcapan("belakang"), ["belakang"], "ucapan: belakang");
  sama(K.kataDariUcapan("depan"), ["depan"], "ucapan: depan");
  sama(K.kataDariUcapan("dibawah"), ["bawah"], "ucapan: dibawah");
  sama(K.kataDariUcapan("Atas dan bawah"), ["atas", "bawah"], "ucapan: dua kata terdengar semua");
  sama(K.kataDariUcapan("kalimat posisi"), [], "ucapan: bukan kata posisi");
  cek(K.cocokUcapan("di sebelah kanan", { jenis: "nama", nama: "kanan" }).cocok && !K.cocokUcapan("kiri", { jenis: "nama", nama: "kanan" }).cocok, "cocok kata posisi");
  cek(sama(K.cocokUcapan("kiri", { jenis: "nama", nama: "kanan" }).terdengar, ["kiri"], "terdengar kiri") === undefined, "terdengar dilaporkan");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("6"), [6], "angka: digit 6");
  cek(K.cocokUcapan("empat", { jenis: "angka", n: 4 }).cocok && !K.cocokUcapan("lima", { jenis: "angka", n: 4 }).cocok, "cocok angka");
}

/* ------------------------------ Batas rupa dan teks ------------------------------ */
{
  // Concrete memakai emoji benda; Pictorial hanya bangun polos berwarna; Abstract kata saja.
  cek(LC.EMOJI_BENDA.length === 8 && LC.EMOJI_BENDA.every(emojiSah), "emoji benda Concrete paling tinggi U+1FA95");
  cek(LC.BENTUK_BENDA.length === 8 && LC.BENTUK_BENDA.every((b) => ["lingkaran", "persegi", "segitiga"].includes(b.bentuk) && /^#[0-9A-Fa-f]{6}$/.test(b.warna)), "bangun polos Pictorial: lingkaran, persegi, segitiga");
  const nb = LC.BENTUK_BENDA.map((b, i) => `${b.bentuk}|${LC.NAMA_BENDA.diagram[i]}`);
  cek(nb.every((s) => s.split("|")[1].startsWith(s.split("|")[0])), "nama bangun polos sesuai bentuknya");
  cek(new Set(LC.NAMA_BENDA.diagram).size === 8 && new Set(LC.NAMA_BENDA.benda).size === 8, "nama benda unik");
  for (const r of ["benda", "diagram", "lambang"]) cek(LC.NAMA_BENDA[r].every((n) => tanpaDigit(n) && bersih(n)), `nama benda ${r} bersih`);
  // Ikon metode di label tugas hanya dipakai pada Concrete (di komponen); data tidak memuat emoji di instruksi Pictorial dan Abstract.
  for (const { rupa, ls } of semuaLangkah) if (rupa !== "benda") cek(![...ls.suara].some((c) => c.codePointAt(0) > 0x2000), `${rupa}: instruksi tanpa emoji`);
  cek(Object.values(LC.NAMA_METODE).every((n) => /(Metode IGIL: Acuan, Kata, Kalimat|Simon Says: Simon Berkata|Treasure Map: Peta Harta Karun|Barrier Game: Permainan Sekat)/.test(n)), "judul tugas: Metode IGIL dan tiga metode global dengan nama Inggris");
  cek(Object.values(LC.IKON_METODE).every(emojiSah) && D.POIN_PENTING.length === 6 && D.POIN_PENTING.every((p) => bersih(p)), "ikon metode dan poin penting sah");
  cek(tanpaDigit(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_A) && /manik/.test(D.PENUTUP_A) && /warna apa/.test(D.PENUTUP_A) && bersih(D.PENUTUP_A), "poin penting dan jembatan ke Sub-Bab B tanpa digit");
  for (const [k, v] of Object.entries(D.TEMA_RAK)) cek(emojiSah(v.ikon) && v.nama.length > 5 && bersih(v.cara) && tanpaDigit(v.cara), `tema ${k}`);
  sama([D.CONCRETE_RAK, D.PICTORIAL_RAK, D.ABSTRACT_RAK].map((x) => x.length), [3, 3, 3], "tiga tugas per cara pada tiap tahap");
  for (const so of [...D.CONCRETE_RAK, ...D.PICTORIAL_RAK, ...D.ABSTRACT_RAK]) cek(/^Misi Rak Pameran \d+: /.test(so.judul) && bersih(so.judul) && bersih(so.cerita) && so.cerita.length > 20, `judul dan cerita misi ${so.nomor}`);
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  const WAJIB = ["logika.ts", "data-peta.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "JawabRak.tsx", "LangkahRak.tsx", "TahapRak.tsx", "RakKayu.tsx", "KartuDenah.tsx", "SimulasiRakPameran.tsx"];
  for (const f of WAJIB) cek(berkas.includes(f), `folder memuat ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    cek(!/\b(skor|soal|latihan|tebak|tebakan)\b/i.test(f === "TahapRak.tsx" ? tanpaKomentar.replace(/\bsoal\b/g, "") : tanpaKomentar), `${f}: teks tanpa kata skor, soal, latihan, tebak (komentar dikecualikan; prop soal di TahapRak sama dengan TahapUbin)`);
    cek(!/buku|bernilai/i.test(tanpaKomentar), `${f}: teks tanpa kata buku dan bernilai`);
  }
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
  }
  const logika = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(!/^import /m.test(logika), "logika.ts murni: tanpa impor");
  const sim = readFileSync(new URL("SimulasiRakPameran.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /export default function SimulasiRakPameran/.test(sim), "simulasi: komponen melapor keadaan");
  const rk = readFileSync(new URL("RakKayu.tsx", folderUrl), "utf8");
  const kd = readFileSync(new URL("KartuDenah.tsx", folderUrl), "utf8");
  for (const [nama, s] of [["RakKayu", rk], ["KartuDenah", kd]]) cek(new RegExp(`export default function ${nama}\\(\\{ speakGuru, onLanjut, teksLanjut \\}`).test(s), `${nama}: props speakGuru, onLanjut, teksLanjut`);
  const tahap = readFileSync(new URL("TahapRak.tsx", folderUrl), "utf8");
  cek(/export default function TahapRak\(/.test(tahap) && /umum/.test(tahap) && /rupa/.test(tahap) && /soal/.test(tahap) && /pita/.test(tahap) && /teksAkhir/.test(tahap) && /poinPenting/.test(tahap), "TahapRak: props sama dengan TahapUbin");
  const langkah = readFileSync(new URL("LangkahRak.tsx", folderUrl), "utf8");
  cek(/export function LangkahRak/.test(langkah) && /siapLangsung/.test(langkah) && /JawabTulis/.test(langkah) && /JawabSuaraRak/.test(langkah), "LangkahRak: memakai siapLangsung, JawabTulis, dan JawabSuaraRak");
  const jawab = readFileSync(new URL("JawabRak.tsx", folderUrl), "utf8");
  cek(/export function JawabSuaraRak/.test(jawab) && /export function PilihanKata/.test(jawab) && /Ini jawaban yang benar/.test(jawab + langkah) && /BATAS_SALAH/.test(jawab), "JawabRak: suara, pilihan kata, dan jawaban benar setelah tiga kali salah");
  const subs = readFileSync(new URL("../src/components/modul/SimulasiK2Bab4.tsx", import.meta.url), "utf8");
  cek(/SimulasiRakPameran/.test(subs) && /MISI_RAK_TEKS/.test(subs) && /laporMisi\(daftarMisiK2Bab4\("A"\)/.test(subs), "SimulasiK2Bab4: langkah Rak Pameran terpasang");
  const misi = readFileSync(new URL("../src/components/modul/misi-k2bab4.ts", import.meta.url), "utf8");
  cek(!misi.includes("\r") && /export const MISI_A/.test(misi), "misi-k2bab4.ts: LF dan MISI_A ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
