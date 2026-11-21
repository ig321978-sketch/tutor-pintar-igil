// Uji Mind-map (Dua Jalur Pak Tarno, label kosong), Infografis (dua kartu), Simulasi Dua Lonceng, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 2 Sub-Bab B ("Dua Lonceng Pak Tarno").
// Memeriksa: logika KPK (daftar kelipatan, kelipatan persekutuan, KPK, banyak pertemuan, anggota daftar) diuji silang dengan hasil kali dibagi FPB dan penyaringan bilangan biasa,
// tabel bilangan dan jalur lonceng, logika simulasi (alat menolak bilangan yang hanya ada di satu daftar, Periksa sebelum kelipatan cocok, Bersama sebelum kedua lonceng berbunyi, dan bilangan yang bukan kelipatan ketiganya),
// misi, Mind-map dan Infografis label kosong (data bersambung dari Story: lonceng 4 dan 6 menit, belanja 4 dan 6 hari, tiga lonceng 4, 5, 6 menit), CPA dua belas langkah per tahap dengan jawaban benar dihitung dari bilangan,
// angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jadwal-k5b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/jadwal-k5b2b/logika.ts");
const LD = await import("../src/components/modul/jadwal-k5b2b/logika-data.ts");
const SKN = await import("../src/components/modul/jadwal-k5b2b/skenario.ts");
const DS = await import("../src/components/modul/jadwal-k5b2b/data-sim.ts");
const DP = await import("../src/components/modul/jadwal-k5b2b/data-peta.ts");
const DI = await import("../src/components/modul/jadwal-k5b2b/data-info.ts");
const LC = await import("../src/components/modul/jadwal-k5b2b/logika-cpa.ts");
const D = await import("../src/components/modul/jadwal-k5b2b/data.ts");
const K = await import("../src/components/modul/jadwal-k5b2b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k5b2.ts");
const folderUrl = new URL("../src/components/modul/jadwal-k5b2b/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani|pangkat/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);

/* Cara hitung mandiri (berbeda dari mendaftar): hasil kali dibagi FPB (Euclid) dan penyaringan bilangan biasa. */
const fpb = (a, b) => (b === 0 ? a : fpb(b, a % b));
const kpkFpb = (xs) => xs.reduce((t, x) => (t * x) / fpb(t, x));
const sarung = (xs, batas) => Array.from({ length: batas }, (_, i) => i + 1).filter((n) => xs.every((x) => n % x === 0));
const brute = (xs) => {
  for (let n = 1; n < 100000; n += 1) if (xs.every((x) => n % x === 0)) return n;
  return -1;
};

/* ------------------------------ Logika KPK ------------------------------ */
{
  cek(LD.fmt(1800) === "1.800" && LD.fmt(60) === "60" && LD.fmt(100000) === "100.000", "fmt titik ribuan");
  sama(LD.kelipatan(4, 36), [4, 8, 12, 16, 20, 24, 28, 32, 36], "kelipatan 4 sampai 36");
  sama(LD.kelipatan(7, 20), [7, 14], "kelipatan 7 sampai 20 (batas tidak terlewati)");
  cek(LD.kelipatan(5, 4).length === 0 && !LD.kelipatan(3, 30).includes(0), "nol bukan kelipatan, kelipatan di atas batas kosong");
  // KPK dengan cara mendaftar sama dengan hasil kali dibagi FPB untuk semua pasangan.
  let semua = true;
  for (let a = 1; a <= 24; a += 1) for (let b = 1; b <= 24; b += 1) semua = semua && LD.kpk([a, b]) === (a * b) / fpb(a, b);
  cek(semua, "kpk dua bilangan sama dengan hasil kali dibagi FPB untuk semua pasangan sampai 24");
  let tiga = true;
  for (const [a, b, c] of [[2, 3, 7], [3, 6, 9], [2, 5, 6], [4, 8, 10], [4, 5, 6], [2, 4, 5], [3, 4, 6], [6, 9, 15]]) tiga = tiga && LD.kpk([a, b, c]) === kpkFpb([a, b, c]) && LD.kpk([a, b, c]) === brute([a, b, c]);
  cek(tiga, "kpk tiga bilangan sama dengan cara hasil kali dibagi FPB dan penyaringan");
  cek(LD.kpk([4, 6]) === 12 && LD.kpk([4, 5, 6]) === 60 && LD.kpk([5, 7]) === 35 && LD.kpk([6, 8]) === 24 && LD.kpk([3, 4, 5]) === 60, "kpk contoh: 4 dan 6 menjadi 12, 4, 5, 6 menjadi 60, 6 dan 8 menjadi 24");
  // Kelipatan persekutuan sama dengan penyaringan biasa.
  let ps = true;
  for (const [a, b, s] of [[4, 6, 36], [3, 5, 30], [2, 8, 48], [5, 6, 30], [9, 12, 72], [15, 20, 120]]) ps = ps && JSON.stringify(LD.persekutuan([a, b], s)) === JSON.stringify(sarung([a, b], s));
  cek(ps, "persekutuan sama dengan penyaringan bilangan biasa");
  sama(LD.persekutuan([4, 6], 36), [12, 24, 36], "kelipatan persekutuan 4 dan 6 sampai 36");
  sama(LD.persekutuan([4, 5, 6], 60), [60], "kelipatan persekutuan 4, 5, 6 sampai 60");
  cek(LD.kaliBersamaLagi([3, 6], 24) === 4 && LD.kaliBersamaLagi([2, 5], 50) === 5 && LD.kaliBersamaLagi([15, 20], 120) === 2 && LD.kaliBersamaLagi([5, 8], 39) === 0, "banyak pertemuan lagi sama dengan lantai waktu dibagi KPK");
  cek(LD.kelipatanKe(7, 14) === 2 && LD.kelipatanKe(5, 15) === 3 && LD.kelipatanKe(3, 21) === 7, "kelipatan ke berapa");
  cek(LD.anggotaDaftar(2, 5, 10) === "keduanya" && LD.anggotaDaftar(3, 8, 16) === "kedua" && LD.anggotaDaftar(6, 9, 24) === "pertama" && LD.anggotaDaftar(2, 3, 5) === "tidak", "anggota daftar");
  cek(LD.kelipatanPersekutuan([6, 9], 18) && !LD.kelipatanPersekutuan([6, 9], 24) && LD.kelipatanPersekutuan([2, 3, 7], 42) && !LD.kelipatanPersekutuan([2, 3, 7], 21), "kelipatan persekutuan dua dan tiga bilangan");
  sama(LD.tulisDaftar([3, 6, 9]), "3, 6, 9", "tulis daftar");
  const t = LD.tabelBilangan([2, 3], 12);
  cek(t.length === 12 && t.filter((c) => c.dalam[0] && c.dalam[1]).map((c) => c.n).join() === "6,12" && t.filter((c) => c.dalam[0]).length === 6 && t.filter((c) => c.dalam[1]).length === 4, "tabel bilangan: kelipatan 2, kelipatan 3, dan keduanya (6 dan 12)");
  cek(LD.KOLOM_TABEL === 10 && LD.barisTabel(50) === 5 && LD.barisTabel(30) === 3, "tabel bilangan sepuluh kolom");
  const j = LD.buatJalur(36, 280, 16, 262);
  cek(LD.xJalur(j, 0) === 16 && LD.xJalur(j, 36) === 262 && Math.abs(LD.xJalur(j, 12) - (16 + (12 * 246) / 36)) < 0.01 && LD.jarakTitik(j, 12) > 80, "jalur: titik sebanding dengan waktunya");
}

/* ------------------------------ Latar CPA ------------------------------ */
{
  const semua = Object.values(SKN.SK);
  cek(semua.length === 9 && SKN.URUT_SK.length === 9 && SKN.URUT_SK.every((id) => SKN.SK[id]), "skenario: sembilan latar");
  cek(semua.every((s) => bersih(JSON.stringify(s)) && ["detik", "hari", "menit"].includes(s.satuan) && s.nama.length === 3 && new Set(s.nama).size === 3 && s.nama.every((n) => n.length <= 14)), "skenario: bersih, satuan waktu, tiga nama berbeda");
  for (const id of ["api", "ronda", "lampu"]) cek(SKN.SK[id].ikon && SKN.SK[id].ikon.every((e) => emojiSah(e) && adaEmoji(e)) && new Set(SKN.SK[id].ikon).size === 3, `Concrete ${id}: tiap pengulang beremoji lama berbeda`);
  for (const id of ["parkir", "kios", "tenda", "catatan", "belanja", "gerbang"]) cek(!SKN.SK[id].ikon, `${id}: tanpa emoji (Pictorial dan Abstract)`);
  cek(semua.every((s) => !/Marni|Tarno|Wati|stadion|tribun|bazar|kolam|batik|keramik/i.test(JSON.stringify(s))), "skenario: tanpa tokoh Story atau latar bab lain");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.DAFTAR_SIM.length === 4 && DS.KPK_SIM.length === 4 && DS.JADWAL_SIM.length === 4 && DS.TIGA_SIM.length === 4, "simulasi: empat sasaran tiap alat");
  for (const t of DS.DAFTAR_SIM) {
    const umum = sarung([t.a, t.b], t.w);
    cek(umum.length >= 1 && LD.kelipatan(Math.min(t.a, t.b), t.w).length <= 12 && t.w >= LD.kpk([t.a, t.b]), `simulasi daftar ${t.a} dan ${t.b}: ada kelipatan persekutuan dan deretnya muat`);
  }
  cek(DS.DAFTAR_SIM.some((t) => sarung([t.a, t.b], t.w).length === 1) && DS.DAFTAR_SIM.some((t) => sarung([t.a, t.b], t.w).length >= 2), "simulasi daftar: satu dan banyak kelipatan persekutuan");
  for (const t of DS.KPK_SIM) cek(kpkFpb([t.a, t.b]) % t.a === 0 && kpkFpb([t.a, t.b]) / t.a >= 2 && kpkFpb([t.a, t.b]) / t.a <= 9, `simulasi kpk ${t.a} dan ${t.b}: KPK ada di kelipatan 2 sampai 9 dari bilangan pertama`);
  for (const t of DS.JADWAL_SIM) cek(kpkFpb([t.a, t.b]) <= DS.WAKTU_MAKS / 2, `simulasi jadwal ${t.a} dan ${t.b}: KPK dicapai dalam waktu maksimal`);
  for (const t of DS.TIGA_SIM) {
    const kp = kpkFpb(t.angka);
    cek(t.kandidat.length === 6 && new Set(t.kandidat).size === 6 && t.kandidat.includes(kp) && t.kandidat.filter((n) => t.angka.every((a) => n % a === 0)).length >= 2 && t.kandidat.some((n) => !t.angka.every((a) => n % a === 0)), `simulasi tiga ${t.angka.join(",")}: enam bilangan memuat KPK, kelipatan lain, dan yang bukan`);
  }
  cek(new Set(DS.TIGA_SIM.map((t) => t.kandidat.indexOf(kpkFpb(t.angka)))).size >= 2, "simulasi tiga: posisi KPK bervariasi");
  const pasangan = (a, b) => [a, b].sort((p, q) => p - q).join("-");
  const sim = [...DS.DAFTAR_SIM.map((t) => pasangan(t.a, t.b)), ...DS.KPK_SIM.map((t) => pasangan(t.a, t.b)), ...DS.JADWAL_SIM.map((t) => pasangan(t.a, t.b))];
  const cpa = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => LC.dasarDari(x.langkah))).map((d) => (d.c === undefined ? pasangan(d.a, d.b) : null)).filter(Boolean);
  cek(sim.every((p) => !cpa.includes(p) && !["4-6", "4-5", "5-6"].includes(p) || (console.log("sim bertabrakan:", p), false)), "simulasi: pasangan bilangan berbeda dari Story, Infografis, dan CPA");
  cek(DS.TIGA_SIM.every((t) => t.angka.join() !== "4,5,6"), "simulasi tiga: bukan tiga bilangan Story");
  cek(tanpaDigit(DS.MISI_JADWAL_TEKS) && bersih(DS.MISI_JADWAL_TEKS) && DS.MISI_JADWAL_TEKS === MT.MISI_K5B2.B && D.MISI_JADWAL_TEKS === DS.MISI_JADWAL_TEKS && DS.MISI_JADWAL_TEKS.length >= 10, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k5b2");

  const a = L.awalJadwal();
  cek(a.alat === "jadwal" && a.mode === "daftar" && a.lingkar.length === 0 && a.kaliKpk === 1 && a.waktu === 0 && a.tigaPilih === -1 && !a.tolakDaftar && !a.tolakKpk && !a.tolakJadwal && !a.tolakTiga && ["daftarBenar", "kpkBenar", "jadwalBenar", "tigaBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiJadwal(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeJadwal(a, "tiga").mode, "tiga", "simulasi: ganti alat");

  // Daftar: sasaran pertama (2, 9) sampai 20: yang sama hanya 18.
  sama(L.umumDaftar(a), [18], "daftar: bilangan di kedua daftar dihitung dari kelipatan");
  const tolakD = L.lingkari(a, 4);
  cek(!tolakD.ok && tolakD.k.tolakDaftar === true && tolakD.k.lingkar.length === 0 && tolakD.k.salah === 0, "daftar: alat menolak bilangan yang hanya ada di satu daftar (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakD.k, new Set()), ["b-tolak"], "daftar: misi b-tolak");
  cek(!L.lingkari(a, 7).ok && L.lingkari(a, 7).k === a, "daftar: bilangan di luar kedua daftar diabaikan");
  const p0 = L.periksaDaftar(a);
  cek(!p0.ok && p0.k.salah === 1 && /Belum ada bilangan/.test(L.petunjukDaftar(a)), "daftar: Periksa tanpa lingkaran belum benar, petunjuk menunjuk langkah yang belum dilakukan");
  const l1 = L.lingkari(a, 18);
  cek(l1.ok && l1.k.lingkar.join() === "18" && L.lingkari(l1.k, 18).k.lingkar.length === 0, "daftar: lingkari dan lepas lingkaran");
  const dOk = L.periksaDaftar(l1.k);
  cek(dOk.ok && dOk.k.daftarBenar.join() === "0" && dOk.k.daftarKe === 1 && dOk.k.lingkar.length === 0, "daftar: lingkaran lengkap membuka pasangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, dOk.k, new Set()), ["b-daftar"], "daftar: misi b-daftar");
  // Sasaran kedua (3, 12) sampai 24: 12 dan 24; hanya satu belum lengkap.
  let kd = { ...a, daftarKe: 1 };
  sama(L.umumDaftar(kd), [12, 24], "daftar: dua bilangan persekutuan sasaran kedua");
  kd = L.lingkari(kd, 12).k;
  const kurang = L.periksaDaftar(kd);
  cek(!kurang.ok && /masih ada bilangan/i.test(L.petunjukDaftar(kd)) && tanpaDigit(L.petunjukDaftar(kd)), "daftar: lingkaran belum lengkap, petunjuk mengarahkan tanpa digit");
  for (let i = 0; i < DS.DAFTAR_SIM.length; i += 1) {
    let k0 = { ...a, daftarKe: i };
    for (const n of L.umumDaftar(k0)) k0 = L.lingkari(k0, n).k;
    cek(L.periksaDaftar(k0).ok && !k0.tolakDaftar, `daftar: sasaran ${i + 1} tercapai tanpa penolakan`);
  }

  // KPK: (6, 7) kelipatan ke 7 dari 6 adalah 42.
  cek(L.kunciKpk(a) === 42 && L.nilaiKpk(a) === 6 && L.nilaiKpk(L.ubahKali(a, 6)) === 42, "kpk: kunci dihitung dari data, nilai kelipatan ke berapa");
  const tolakK = L.periksaKpk(a);
  cek(!tolakK.ok && tolakK.ditolak === true && tolakK.k.tolakKpk === true && tolakK.k.salah === 0, "kpk: alat menolak Periksa bila bilangan belum kelipatan bilangan kedua (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakK.k, new Set()), [], "kpk: penolakan kpk bukan misi b-tolak");
  const kLebih = L.periksaKpk({ ...a, kaliKpk: 9, targetKpkSementara: 0 });
  cek(kLebih.ditolak === true, "kpk: kelipatan ke 9 dari 6 (54) bukan kelipatan 7, ditolak");
  const duaKali = { ...a, kpkKe: 2, kaliKpk: 4 }; // sasaran (9, 2): 36 adalah kelipatan persekutuan tetapi bukan yang terkecil (18)
  const masihLebih = L.periksaKpk(duaKali);
  cek(!masihLebih.ok && !masihLebih.ditolak && masihLebih.k.salah === 1 && /masih ada yang lebih kecil/.test(L.petunjukKpk(duaKali)) && tanpaDigit(L.petunjukKpk(duaKali)), "kpk: kelipatan persekutuan bukan yang terkecil, petunjuk mengarahkan tanpa digit");
  cek(/belum kelipatan bilangan kedua/.test(L.petunjukKpk(a)), "kpk: petunjuk saat bukan kelipatan bilangan kedua");
  const kOk = L.periksaKpk(L.ubahKali(a, 6));
  cek(kOk.ok && kOk.k.kpkBenar.join() === "0" && kOk.k.kpkKe === 1 && kOk.k.kaliKpk === 1, "kpk: KPK benar membuka pasangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, kOk.k, new Set()), ["b-kpk"], "kpk: misi b-kpk");
  sama(S.misiBaru(MK.MISI_B, { ...a, kpkBenar: [0, 1] }, new Set()), ["b-kpk", "b-dua"], "kpk: dua pasang memenuhi b-kpk dan b-dua");
  cek(L.ubahKali(a, -1).kaliKpk === 1 && L.ubahKali({ ...a, kaliKpk: 9 }, 1).kaliKpk === 9, "kpk: kelipatan dibatasi satu sampai sembilan");
  for (let i = 0; i < DS.KPK_SIM.length; i += 1) {
    const k0 = { ...a, kpkKe: i };
    const t = DS.KPK_SIM[i];
    cek(L.periksaKpk({ ...k0, kaliKpk: kpkFpb([t.a, t.b]) / t.a }).ok, `kpk: sasaran ${i + 1} tercapai`);
  }

  // Jadwal: (2, 6) pertama bersama pada 6.
  cek(L.kunciJadwal(a) === 6 && !L.bunyiJadwal(a).a && !L.bunyiJadwal(a).b, "jadwal: kunci dari data, pada awal tidak ada bunyi yang dihitung");
  const tolakJ = L.tekanBersama(L.majukan(a));
  cek(!tolakJ.ok && tolakJ.ditolak === true && tolakJ.k.tolakJadwal === true && tolakJ.k.salah === 0 && tolakJ.k.waktu === 1, "jadwal: alat menolak Bersama sebelum kedua lonceng berbunyi (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakJ.k, new Set()), [], "jadwal: penolakan jadwal bukan misi b-tolak");
  let w = a;
  for (let i = 0; i < 2; i += 1) w = L.majukan(w);
  cek(L.bunyiJadwal(w).a && !L.bunyiJadwal(w).b && !L.tekanBersama(w).ok && L.tekanBersama(w).ditolak === true, "jadwal: pada waktu 2 hanya lonceng pertama berbunyi, Bersama ditolak");
  for (let i = 0; i < 4; i += 1) w = L.majukan(w);
  cek(w.waktu === 6 && L.bunyiJadwal(w).a && L.bunyiJadwal(w).b, "jadwal: pada waktu 6 kedua lonceng berbunyi");
  const jOk = L.tekanBersama(w);
  cek(jOk.ok && jOk.k.jadwalBenar.join() === "0" && jOk.k.jadwalKe === 1 && jOk.k.waktu === 0, "jadwal: pertemuan pertama benar membuka pasangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, jOk.k, new Set()), ["b-jadwal"], "jadwal: misi b-jadwal");
  let lewat = { ...a, jadwalKe: 0, waktu: 12 }; // 12 adalah kelipatan persekutuan 2 dan 6, tetapi sudah ada pertemuan pada 6
  const jTelat = L.tekanBersama(lewat);
  cek(!jTelat.ok && !jTelat.ditolak && jTelat.k.salah === 1 && jTelat.k.waktu === 0 && /pertemuan yang lebih awal/.test(L.petunjukJadwal()) && tanpaDigit(L.petunjukJadwal()), "jadwal: bersama tetapi bukan yang pertama, waktu kembali ke awal, petunjuk tanpa digit");
  cek(L.ulangWaktu(w).waktu === 0 && L.majukan({ ...a, waktu: DS.WAKTU_MAKS }).waktu === DS.WAKTU_MAKS, "jadwal: ulang waktu dan batas waktu");
  for (let i = 0; i < DS.JADWAL_SIM.length; i += 1) {
    let k0 = { ...a, jadwalKe: i };
    const kp = L.kunciJadwal(k0);
    for (let q = 0; q < kp; q += 1) k0 = L.majukan(k0);
    cek(L.tekanBersama(k0).ok && !k0.tolakJadwal, `jadwal: sasaran ${i + 1} tercapai`);
  }

  // Tiga: (2, 3, 7) kandidat [14, 84, 42, 21, 126, 6], KPK 42 di posisi 2.
  cek(L.kunciTiga(a) === 42 && L.targetTiga(a).kandidat[2] === 42, "tiga: KPK dihitung dari data");
  const tolakT = L.pilihTiga(a, 0);
  cek(!tolakT.ok && tolakT.k.tolakTiga === true && tolakT.k.tigaPilih === -1 && tolakT.k.salah === 0, "tiga: alat menolak bilangan yang bukan kelipatan ketiga-tiganya (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakT.k, new Set()), [], "tiga: penolakan tiga bukan misi b-tolak");
  const besar = L.pilihTiga(a, 1);
  cek(besar.ok && besar.k.tigaPilih === 1 && !L.periksaTiga(besar.k).ok && /masih ada yang lebih kecil/.test(L.petunjukTiga(besar.k)) && L.periksaTiga(besar.k).k.salah === 1, "tiga: kelipatan persekutuan bukan yang terkecil, petunjuk mengarahkan");
  cek(/Belum ada bilangan/.test(L.petunjukTiga(a)) && !L.periksaTiga(a).ok, "tiga: tanpa pilihan, petunjuk menunjuk langkah yang belum dilakukan");
  cek(L.pilihTiga(a, 9).k === a, "tiga: pilihan di luar daftar diabaikan");
  const tOk = L.periksaTiga(L.pilihTiga(a, 2).k);
  cek(tOk.ok && tOk.k.tigaBenar.join() === "0" && tOk.k.tigaKe === 1 && tOk.k.tigaPilih === -1, "tiga: KPK benar membuka tiga bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, tOk.k, new Set()), ["b-tiga"], "tiga: misi b-tiga");
  for (let i = 0; i < DS.TIGA_SIM.length; i += 1) {
    const k0 = { ...a, tigaKe: i };
    const idx = DS.TIGA_SIM[i].kandidat.indexOf(kpkFpb(DS.TIGA_SIM[i].angka));
    cek(L.periksaTiga(L.pilihTiga(k0, idx).k).ok && !L.pilihTiga(k0, idx).k.tolakTiga, `tiga: sasaran ${i + 1} tercapai`);
  }

  for (const p of [L.petunjukDaftar(a), L.petunjukKpk(a), L.petunjukJadwal(), L.petunjukTiga(a), L.kalimatDaftar(a), L.kalimatKpk(a), L.kalimatJadwal(a), L.kalimatTiga(a)]) cek(bersih(p) && p.length > 20 && /^[A-Z]/.test(p), `simulasi: kalimat bersih (${p.slice(0, 30)})`);
  for (const p of [L.petunjukDaftar(a), L.petunjukKpk(a), L.petunjukJadwal(), L.petunjukTiga(a)]) cek(tanpaDigit(p), `simulasi: petunjuk tanpa digit (${p.slice(0, 30)})`);

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK5Bab2("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/hanya ada di satu daftar/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (bilangan yang hanya ada di satu daftar)");
  cek(S.misiBaru(B, { ...a, salah: 9, lingkar: [18], kaliKpk: 7, waktu: 6, tigaPilih: 2 }, new Set()).length === 0, "misi B: pilihan yang belum diperiksa tidak dihitung sebagai misi");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })) && B.every((m) => !m.cek({ alat: "lonceng" })), "misi B: alat lain tidak memenuhi misi");
  cek(MT.misiAwalK5Bab2("B").startsWith("Simulasi 1. Misi: "), "misi awal Sub-Bab B");
}

/* ------------------------------ Mind-map: dua jalur lonceng (label kosong) ------------------------------ */
{
  const P = DP.LANGKAH_JADWAL;
  cek(P.length >= 3 && P.length <= 6, `mind-map: jumlah label 3 sampai 6 sesuai langkah materi (${P.length})`);
  cek(new Set(P.map((x) => x.judul)).size === P.length && P.every((x) => x.judul.length >= 8 && x.judul.length <= 24 && x.judul.split(/\s+/).every((w) => w.length <= 12)), "mind-map: judul langkah unik, pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const NOMOR = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(P.every((x, i) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && x.arti.startsWith(`Langkah ${NOMOR[i]}.`)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  cek(P.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && !/[A-Za-z0-9]/.test(x.ikon)), "mind-map: ikon sah (emoji lama tanpa huruf)");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["daftar", "kelipatan", "bilangan yang sama", "persekutuan", "terkecil", "kpk", "bertemu lagi", "jarak", "tiga bilangan", "tiga daftar"]) cek(gab.includes(s), `mind-map: memuat "${s}"`);
  cek(!/\b(bima|citra|fajar|pak arif|pak tarno|bu marni|bu wati)\b/.test(gab), "mind-map: hanya langkah pelajaran (tanpa tokoh)");
  const gp = DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA;
  cek(tanpaDigit(gp) && bersih(gp) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  const pt = readFileSync(new URL("PetaJadwal.tsx", folderUrl), "utf8");
  cek(!/PetaLabel/.test(pt.replace(/\(bukan PetaLabel[^)]*\)/, "")), "PetaJadwal: komponen sendiri, tidak membungkus PetaLabel");
  cek(/LANGKAH_JADWAL/.test(pt) && /speakGuru/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt) && /lm-muncul/.test(pt) && /export default function PetaJadwalK5B2/.test(pt) && /export \{ PetaJadwalK5B2 \}/.test(pt), "PetaJadwal: label kosong diketuk, suara Guru, ekspor PetaJadwalK5B2");
  cek(/data-uji="dua-jalur"/.test(pt) && /data-uji="jalur-bertemu"/.test(pt) && /data-lonceng/.test(pt) && /data-jalur="kiri"/.test(pt) && /data-jalur="kanan"/.test(pt) && /data-jalur="tengah"/.test(pt), "PetaJadwal: dua jalur lonceng turun lalu bertemu menjadi satu jalur");
  cek(P.length === 5, "PetaJadwal: lima lonceng");
}

/* ------------------------------ Infografis: dua jalur lonceng, belanja, dan tiga lonceng ------------------------------ */
{
  cek(DI.WEDANG === 4 && DI.BAKSO === 6 && DI.JAGUNG === 5 && DI.BATAS_1 === 36 && DI.BATAS_3 === 60, "infografis: data bersambung dari Story (lonceng 4, 6, dan 5 menit)");
  sama(DI.TIK_WEDANG, [4, 8, 12, 16, 20, 24, 28, 32, 36], "infografis: titik jalur wedang kelipatan 4");
  sama(DI.TIK_BAKSO, [6, 12, 18, 24, 30, 36], "infografis: titik jalur bakso kelipatan 6");
  sama(DI.BERSAMA, sarung([4, 6], 36), "infografis: titik bersama dihitung ulang dengan penyaringan (12, 24, 36)");
  cek(DI.KPK_DUA === kpkFpb([4, 6]) && DI.KPK_DUA === 12 && DI.KPK_TIGA === kpkFpb([4, 5, 6]) && DI.KPK_TIGA === 60 && DI.BELANJA_LAGI === 12 && DI.BELANJA_BERIKUT === 24, "infografis: KPK 12, belanja bertemu lagi 12 hari lalu 24 hari, KPK tiga bilangan 60");
  sama(DI.TIGA, [4, 5, 6], "infografis: tiga lonceng 4, 5, 6");
  sama(DI.TIK_TIGA.map((x) => x.length), [15, 12, 10], "infografis: banyak penanda tiga jalur sampai 60");
  cek(DI.TIK_TIGA.every((t, i) => t.every((n) => n % DI.TIGA[i] === 0)) && DI.TIK_TIGA.filter((t) => t.includes(60)).length === 3 && [...Array(59).keys()].every((n) => !(DI.TIGA.every((a) => (n + 1) % a === 0))), "infografis: ketiga jalur bertemu pertama kali di 60");
  for (const [j, sampai] of [[DI.J1, 36], [DI.J3, 60], [DI.JB, 36]]) cek(j.sampai === sampai && j.x1 > j.x0 && j.lebar === 280 && LD.xJalur(j, sampai) === j.x1 && j.x1 <= 270, `infografis: jalur sampai ${sampai} muat dalam lebar 280`);
  cek(DI.TIK_WEDANG.every((t, q) => q === 0 || LD.xJalur(DI.J1, t) - LD.xJalur(DI.J1, DI.TIK_WEDANG[q - 1]) > 20), "infografis: label jalur wedang tidak bertabrakan");
  for (const n of DI.BERSAMA) cek(tanpaDigit(DI.SUARA_BERSAMA[n]) && bersih(DI.SUARA_BERSAMA[n]) && /^[A-Z]/.test(DI.SUARA_BERSAMA[n]) && !/\s[.,!?;:]/.test(DI.SUARA_BERSAMA[n]) && /kelipatan persekutuan/.test(DI.SUARA_BERSAMA[n]), `infografis: suara titik ${n} tanpa digit`);
  cek(/dua belas ada di jalur lonceng wedang/i.test(DI.SUARA_BERSAMA[12]) && /tiga puluh enam/i.test(DI.SUARA_BERSAMA[36]) && /dua puluh empat/i.test(DI.SUARA_BERSAMA[24]), "infografis: suara mengeja 12, 24, 36");
  for (const s of [DI.SUARA_KPK, DI.SUARA_JARAK, DI.SUARA_BERIKUT, DI.SUARA_TIGA]) cek(tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s) && !/\s[.,!?;:]/.test(s) && s.length > 30, `infografis: suara tanpa digit (${s.slice(0, 30)})`);
  cek(/dua belas.*KPK/.test(DI.SUARA_KPK) && /dua belas hari/.test(DI.SUARA_JARAK) && /dua puluh empat/.test(DI.SUARA_BERIKUT) && /enam puluh/.test(DI.SUARA_TIGA), "infografis: suara memuat KPK, jarak, hari berikutnya, dan KPK tiga bilangan");
  const gabP = DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.SELESAI_INFO_2 + DI.JUDUL_INFO_1 + DI.JUDUL_INFO_2;
  cek(tanpaDigit(gabP) && bersih(gabP) && emojiSah(DI.IKON_JALUR), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  const info = readFileSync(new URL("InfoJadwal.tsx", folderUrl), "utf8");
  const semuaTopik = (gabP + info + DI.SUARA_KPK + DI.SUARA_JARAK + DI.SUARA_TIGA).toLowerCase();
  for (const s of ["kelipatan persekutuan", "kpk", "jalur", "belanja", "hari", "tiga lonceng", "terkecil", "tanda tanya"]) cek(semuaTopik.includes(s), `infografis: topik inti "${s}" muncul`);
  cek(!/InfoKartu/.test(info.replace(/\(bukan InfoKartu[^)]*\)/, "")), "InfoJadwal: komponen sendiri, tidak membungkus InfoKartu");
  cek(/Gelembung/.test(info) && /ketukB/.test(info) && /ketukKpk/.test(info) && /xJalur\(J1/.test(info) && /xJalur\(J3/.test(info) && /xJalur\(JB/.test(info) && /setKartu\(2\)/.test(info) && /speakGuru/.test(info) && /onLanjut/.test(info) && /teksLanjut/.test(info) && /export default function InfoJadwalK5B2/.test(info) && /export \{ InfoJadwalK5B2 \}/.test(info), "InfoJadwal: sel kosong diketuk, jalur digambar dari data, dua kartu, ekspor InfoJadwalK5B2");
  cek(/Kartu \$\{kartu\} dari 2|Kartu \{kartu\} dari 2/.test(info), "InfoJadwal: penanda dua kartu");
  cek(/viewBox="0 0 280 166"/.test(info) && /viewBox="0 0 280 218"/.test(info) && /BERSAMA\.map/.test(info) && /TIK_WEDANG\.map/.test(info) && /TIK_BAKSO\.map/.test(info) && /TIK_TIGA\[i\]\.map/.test(info), "InfoJadwal: titik jalur digambar sebanyak kelipatannya (viewBox 280 dan tinggi satu layar)");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  const KATA = ["benar", "salah", "mungkin", "pertama", "kedua", "keduanya"];
  for (const kata of KATA) cek(K.cocokUcapan(kata, nm(kata)).cocok && K.kataDariUcapan(kata).length === 1, `cocok: kata ${kata} dikenali tepat satu`);
  cek(K.cocokUcapan("betul", nm("benar")).cocok && K.cocokUcapan("keliru", nm("salah")).cocok && K.cocokUcapan("ada di keduanya", nm("keduanya")).cocok && K.cocokUcapan("daftar kedua", nm("kedua")).cocok, "ucapan: ragam dan kata dalam kalimat dikenali");
  sama(K.kataDariUcapan("bukan benar"), [], "ucapan: bukan benar tidak dihitung");
  cek(!K.cocokUcapan("roti", nm("benar")).cocok && K.cocokUcapan("hmm", nm("salah")).terdengar.length === 0, "ucapan: kata lain atau tidak terdengar bukan jawaban");
  for (const x of KATA) for (const y of KATA) if (x !== y) cek(!K.kataDariUcapan(x).includes(y), `ucapan: ${x} tidak dikenali sebagai ${y}`);
  for (const [teks, n] of [["tujuh", 7], ["lima", 5], ["delapan", 8], ["6", 6], ["tiga", 3]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  for (const [teks, n] of [["dua puluh empat", 24], ["tiga puluh enam", 36], ["enam puluh", 60], ["seratus dua puluh", 120], ["36", 36], ["1.800", 1800]]) cek(K.angkaDariUcapan(teks).includes(n), `ucapan: bilangan ${teks}`);
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = {
    klik: ["kpk", "persekutuan", "terkecil", "bertemu"],
    kanvas: ["kpkSatu", "banyakSama", "kelipatanKe", "kaliBertemu"],
    suara: ["klaimKpk", "adaDi", "klaimSama", "klaimWaktu"],
  };
  const SK_TAHAP = { Concrete: ["api", "ronda", "lampu"], Pictorial: ["parkir", "kios", "tenda"], Abstract: ["catatan", "belanja", "gerbang"] };
  const SALAH_LANGKAH = { Concrete: 0, Pictorial: 1, Abstract: 3 };
  const posisiBenar = [];
  const posisiAlasan = [];
  const metodeNama = ["igil", "daftar", "sama", "ulang"];
  const kanvasSemua = {};
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === metodeNama.join()), `${namaT}: empat langkah tiap misi berurut IGIL, List Both, Spot the Match, Meet Again`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]) && soal[0].langkah.indexOf(salahT[0]) === SALAH_LANGKAH[namaT], `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    const kanvasAngka = [];
    for (const [si, s] of soal.entries()) {
      for (let i = 0; i < 4; i += 1) {
        const dasar = LC.dasarDari(s.langkah[i].langkah);
        cek(dasar.tipe === TIPE[s.cara][i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas (${dasar.tipe})`);
        cek(LC.CARA_TIPE[dasar.tipe] === s.cara, `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas cocok dengan caranya`);
      }
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const S0 = SKN.SK[d.s];
        const an = d.c === undefined ? [d.a, d.b] : [d.a, d.b, d.c];
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        const K0 = brute(an);
        cek(!!S0 && d.s === SK_TAHAP[namaT][si], `${tag}: latar ${d.s} milik misi ini`);
        cek(kunci !== null, `${tag}: jawaban benar ada`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(!/\s[.,!?;:]/.test(ls.suara) && /^[A-Z]/.test(ls.suara) && !/[.?!]\s+[a-z]/.test(ls.suara), `${tag}: instruksi berhuruf kapital dan tanpa spasi sebelum tanda baca`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        cek(an.every((x) => Number.isInteger(x) && x >= 2 && x <= 20) && new Set(an).size === an.length && Number.isInteger(d.w) && d.w <= 120, `${tag}: bilangan tugas bulat dan berbeda`);
        // Bilangan Story (4 dan 6, 4 dan 5, 4, 5, dan 6) tidak jadi jawaban CPA.
        const kunciSt = [...an].sort((p, q) => p - q).join();
        cek(!["4,6", "4,5", "4,5,6"].includes(kunciSt), `${tag}: bukan pasangan bilangan Story (${kunciSt})`);
        // Daftar yang digambar memuat semua bilangan yang dibutuhkan.
        if (["kpk", "kpkSatu", "terkecil", "bertemu", "kelipatanKe", "kaliBertemu"].includes(d.tipe)) cek(d.w >= K0, `${tag}: batas daftar ${d.w} memuat KPK ${K0}`);
        if (["adaDi", "klaimSama", "klaimWaktu"].includes(d.tipe)) cek(d.w >= d.n, `${tag}: batas daftar memuat bilangan ${d.n}`);
        if (d.tipe === "klaimKpk") cek(d.w >= Math.min(K0, d.n) && d.n !== undefined, `${tag}: batas daftar memuat KPK atau klaim`);
        const daftar = LC.daftarTugas(d);
        cek(daftar.every((x, q) => JSON.stringify(x) === JSON.stringify(Array.from({ length: Math.floor(d.w / an[q]) }, (_, z) => (z + 1) * an[q]))), `${tag}: deret kelipatan digambar sungguh sampai ${d.w}`);
        cek(rupa === "diagram" && an.length === 2 ? d.w <= 50 : daftar.every((x) => x.length <= 16), `${tag}: daftar muat (tabel sampai 50, atau paling banyak enam belas bilangan)`);
        // Jawaban dihitung ulang dengan cara berbeda.
        if (d.tipe === "kpk") cek(kunci.nama === String(K0) && kunci.nama === String(kpkFpb(an)), `${tag}: KPK ${kunci.nama}`);
        if (d.tipe === "kpkSatu") cek(kunci.n === K0 && kunci.n === kpkFpb(an) && K0 <= 9, `${tag}: KPK satu angka ${kunci.n}`);
        if (d.tipe === "klaimKpk") cek(kunci.nama === (K0 === d.n ? "benar" : "salah"), `${tag}: klaim KPK ${kunci.nama}`);
        if (d.tipe === "persekutuan") {
          const umum = l.tipe === "salah" ? d.pil.filter((p) => an.every((x) => Number(p) % x === 0)) : d.pil.filter((p) => an.every((x) => Number(p) % x === 0));
          cek(umum.length === 1 && kunci.nama === umum[0] && d.w >= Number(umum[0]) && d.pil.every((p) => Number(p) >= 2), `${tag}: tepat satu pilihan ada di kedua daftar (${kunci.nama})`);
        }
        if (d.tipe === "banyakSama") cek(kunci.n === sarung(an, d.w).length && kunci.n >= 1 && kunci.n <= 9, `${tag}: banyak bilangan sama ${kunci.n}`);
        if (d.tipe === "adaDi") {
          const A = d.n % d.a === 0;
          const B = d.n % d.b === 0;
          cek(kunci.nama === (A && B ? "keduanya" : A ? "pertama" : B ? "kedua" : "x") && (A || B), `${tag}: ada di daftar ${kunci.nama}`);
        }
        if (d.tipe === "terkecil") cek(kunci.nama === String(K0) && d.pil.includes(String(K0)) && d.pil.filter((p) => Number(p) === K0).length === 1 && d.pil.every((p) => Number(p) >= K0 || !an.every((x) => Number(p) % x === 0)), `${tag}: kelipatan persekutuan terkecil ${kunci.nama}`);
        if (d.tipe === "kelipatanKe") cek(kunci.n === K0 / d.a && Number.isInteger(K0 / d.a) && kunci.n >= 1 && kunci.n <= 9, `${tag}: kelipatan ke ${kunci.n} dari ${d.a}`);
        if (d.tipe === "klaimSama") cek(kunci.nama === (an.every((x) => d.n % x === 0) ? "benar" : "salah"), `${tag}: klaim kelipatan persekutuan ${kunci.nama}`);
        if (d.tipe === "bertemu") cek(kunci.nama === `${K0} ${S0.satuan} lagi` && d.pil.includes(kunci.nama) && d.pil.every((p) => /^\d+ (detik|hari|menit) lagi$/.test(p)), `${tag}: bertemu lagi ${kunci.nama}`);
        if (d.tipe === "kaliBertemu") cek(kunci.n === Math.floor(d.w / K0) && kunci.n >= 1 && kunci.n <= 9 && kunci.n === sarung(an, d.w).length, `${tag}: bertemu lagi ${kunci.n} kali`);
        if (d.tipe === "klaimWaktu") cek(kunci.nama === (d.n % K0 === 0 ? "benar" : "salah") && d.n > 0, `${tag}: klaim waktu ${kunci.nama}`);
        if (kunci?.jenis === "angka") {
          cek(s.cara === "kanvas", `${tag}: jawaban angka hanya di kanvas`);
          kanvasAngka.push(kunci.n);
          cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (l.tipe === "salah") {
            cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
            posisiAlasan.push(l.posisi);
          }
          posisiBenar.push(pil.indexOf(benar));
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) {
          const kk = LC.kalimatKunci(l, s.cara);
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca (${kk.slice(0, 50)})`);
          if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(kk), `${tag}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(pet + kt + ls.suara), `${tag}: petunjuk, pertanyaan, dan instruksi Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Kartu kata dan keterangan gambar.
        const bk = LC.barisKartu(d);
        cek(bk.length >= 4 && bk.every((x) => bersih(x) && !/gambar/i.test(x)) && /\?$/.test(bk[bk.length - 1]) && LC.ketGambar(d)[LC.ketGambar(d).length - 1] === bk[bk.length - 1], `${tag}: kartu kata memuat jadwal dan hal yang dicari`);
        cek(an.every((x) => bk.some((b) => b.includes(`tiap ${x} ${S0.satuan}`))) && an.every((x) => bk.some((b) => b.startsWith(`kelipatan ${x}: `))), `${tag}: kartu memuat tiap jarak ulang dan daftar kelipatannya`);
        cek(rupa === "benda" || !SKN.SK[d.s].ikon, `${tag}: hanya Concrete beremoji`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Bima", "Citra", "Fajar"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(/Pikirkan lagi/.test(pj) && !new RegExp(l.alasan[l.benar].slice(0, 20)).test(pj) && tanpaDigit(pj), `${tag}: petunjuk Cari kesalahan tidak membocorkan alasan`);
        }
      }
    }
    kanvasSemua[namaT] = kanvasAngka;
    cek(kanvasAngka.length === 4 && new Set(kanvasAngka).size === 4, `${namaT}: empat angka kanvas tidak kembar (${kanvasAngka.join(",")})`);
    const semuaTugas = soal.flatMap((s) => s.langkah.map((x) => JSON.stringify(LC.dasarDari(x.langkah))));
    cek(new Set(semuaTugas).size === semuaTugas.length, `${namaT}: tanpa tugas kembar dalam satu tahap`);
    cek(new Set(soal.flatMap((s) => s.langkah.map((x) => x.judul))).size === 12, `${namaT}: dua belas instruksi berbeda`);
    const pasang = soal.flatMap((s) => s.langkah.map((x) => { const d = LC.dasarDari(x.langkah); return [d.a, d.b, d.c ?? ""].join("-"); }));
    cek(new Set(pasang).size === pasang.length, `${namaT}: tanpa pasangan bilangan yang sama dalam satu tahap`);
  }
  sama(kanvasSemua, { Concrete: [6, 3, 2, 4], Pictorial: [8, 6, 3, 5], Abstract: [9, 3, 7, 2] }, "angka kanvas per tahap");
  // Tugas Cari kesalahan: Fajar salah di Concrete (hasil kali), Bima benar di Pictorial (30), Citra salah di Abstract (pembagi bersama).
  const [sc, sp, sa] = [D.CONCRETE[0].langkah[0].langkah, D.PICTORIAL[0].langkah[1].langkah, D.ABSTRACT[0].langkah[3].langkah];
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "kpk" && sc.dasar.a === 6 && sc.dasar.b === 8 && sc.jawabTokoh === String(6 * 8) && LC.kunciJawab(sc, "klik").nama === "24" && /lebih kecil/.test(sc.alasan[sc.benar]), "Cari kesalahan Concrete: Fajar menjawab KPK 6 dan 8 adalah 48 (hasil kali), yang benar 24");
  cek(sp.tokoh === "Bima" && sp.betul && sp.dasar.tipe === "persekutuan" && sp.dasar.a === 5 && sp.dasar.b === 6 && LC.kunciJawab(sp, "klik").nama === "30" && sp.jawabTokoh === "30" && sarung([5, 6], 30).join() === "30", "Cari kesalahan Pictorial: Bima benar, 30 kelipatan persekutuan 5 dan 6");
  cek(sa.tokoh === "Citra" && !sa.betul && sa.dasar.tipe === "bertemu" && sa.jawabTokoh === `${fpb(8, 12)} menit lagi` && LC.kunciJawab(sa, "klik").nama === "24 menit lagi" && /pembagi/.test(sa.alasan[sa.benar]), "Cari kesalahan Abstract: Citra memakai pembagi bersama (4) padahal yang dicari kelipatan (24)");
  cek(new Set(posisiBenar).size >= 2, `pilihan klik: posisi jawaban benar bervariasi (${[...new Set(posisiBenar)].join(",")})`);
  cek(new Set(posisiAlasan).size === 3, `Cari kesalahan: posisi alasan benar bervariasi (${posisiAlasan.join(",")})`);
  // Alasan benar tidak selalu yang terpanjang.
  const panjangBenar = [sc, sp, sa].map((x) => x.alasan[x.benar].length >= Math.max(...x.alasan.map((y) => y.length)));
  cek(panjangBenar.some((b) => !b), "Cari kesalahan: alasan benar tidak selalu yang terpanjang");
  // Poin penting, penutup, tema.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && bersih(p) && !/\s[.,!?;:]/.test(p)), "poin penting: enam butir, suara tanpa digit");
  const gabPoin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["kelipatan persekutuan", "kpk", "paling kecil", "hasil kali", "berulang", "tiga bilangan", "daftar keduanya", "cari yang sama", "bertemu lagi"]) cek(gabPoin.includes(s), `poin penting memuat ${s}`);
  cek(/Bu Wati/.test(D.PENUTUP_B) && /klepon/.test(D.PENUTUP_B) && /piring/.test(D.PENUTUP_B) && tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && !/perayaan|PASAR KULINER MALAM/.test(D.PENUTUP_B), "penutup: jembatan ke Sub-Bab C (Bu Wati dengan klepon), bukan perayaan");
  cek(D.CONCRETE_JADWAL === D.CONCRETE && D.PICTORIAL_JADWAL === D.PICTORIAL && D.ABSTRACT_JADWAL === D.ABSTRACT && ["concrete", "pictorial", "abstract"].every((k) => D.TEMA_JADWAL[k].nama && D.TEMA_JADWAL[k].cara && emojiSah(D.TEMA_JADWAL[k].ikon) && bersih(D.TEMA_JADWAL[k].cara)), "ekspor pemasang: CONCRETE_JADWAL, PICTORIAL_JADWAL, ABSTRACT_JADWAL, TEMA_JADWAL");
  const tahap = readFileSync(new URL("TahapJadwal.tsx", folderUrl), "utf8");
  cek(/PENUTUP_B/.test(tahap) && /POIN_PENTING_SUARA/.test(tahap) && /export default function TahapJadwal/.test(tahap) && /data-uji="jembatan"/.test(tahap) && !/perayaan|PASAR KULINER MALAM/.test(tahap.replace(/\/\*\*[\s\S]*?\*\//, "")), "TahapJadwal: Poin Penting lalu jembatan, bukan perayaan");
}

/* ------------------------------ Berkas folder: akhir baris, kata terlarang, emoji ------------------------------ */
{
  const semua = readdirSync(folderUrl);
  cek(semua.length >= 16, `folder berisi ${semua.length} berkas`);
  for (const nama of semua) {
    const isi = readFileSync(new URL(nama, folderUrl), "utf8");
    cek(!isi.includes("\r") && !isi.startsWith("﻿"), `${nama}: akhir baris LF tanpa BOM`);
    const tanpaKomentar = isi.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    // Teks layar: string literal dan JSX. Peubah kode diabaikan; cek hanya kata yang dilarang pada teks tampak.
    const literal = (tanpaKomentar.match(/"[^"\n]{3,}"|`[^`\n]{3,}`|>[^<>{}\n]{3,}</g) ?? []).join(" ").replace(/\$\{[^}]*\}/g, "");
    cek(!/\bkelas\b|\bbuku\b|teman|kelompok|\bskor\b|\bsoal\b|tebak|latihan|senilai|\bnilai\b|bernilai|pangkat/i.test(literal), `${nama}: tanpa kata terlarang pada teks layar`);
    for (const c of isi) {
      const cp = c.codePointAt(0);
      if (cp > 0x1fa95 && cp !== 0xfe0f) cek(false, `${nama}: emoji di atas U+1FA95 (${cp.toString(16)})`);
    }
    cek(!/‍/.test(isi), `${nama}: tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(isi), `${nama}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
  }
  cek(["PetaJadwal.tsx", "InfoJadwal.tsx", "TahapJadwal.tsx", "SimulasiDuaLonceng.tsx", "LangkahJadwal.tsx", "JawabJadwal.tsx", "GambarJadwal.tsx", "logika.ts", "logika-cpa.ts", "logika-data.ts", "skenario.ts", "periksa.ts", "data.ts", "data-sim.ts", "data-peta.ts", "data-info.ts"].every((f) => semua.includes(f)), "folder: semua berkas utama ada");
  const sim = readFileSync(new URL("SimulasiDuaLonceng.tsx", folderUrl), "utf8");
  cek(/grid grid-cols-2/.test(sim) && /MODE\.map/.test(sim) && /data-uji="simulasi-dua-lonceng"/.test(sim) && /laporRef/.test(sim) && /MISI_JADWAL_TEKS/.test(sim) && (sim.match(/Alat menolak/g) ?? []).length >= 4, "simulasi: empat alat grid dua kolom, laporan keadaan, pesan penolakan");
  cek(/min-w-0 flex-1/.test(sim) && /w-12 shrink-0/.test(sim) && /flex flex-wrap justify-center/.test(sim), "simulasi: nama di antara tombol kurang dan tambah tidak terjepit, baris kontrol membungkus");
  cek(/ubah\(r\.k, "Alat menolak/.test(sim) && /const ubah = \(baru: KeadaanJadwal, ucap\?: string\)/.test(sim), "simulasi: pesan lama dikosongkan saat keadaan berganti");
  const gambar = readFileSync(new URL("GambarJadwal.tsx", folderUrl), "utf8");
  cek(/DaftarKelipatan/.test(gambar) && /TabelBilanganGambar/.test(gambar) && /KartuKata/.test(gambar) && /export function TampilDasar/.test(gambar) && /Math\.ceil\(d\.w \/ KOLOM_TABEL\)/.test(gambar), "gambar: deret kelipatan, tabel bilangan, kartu kata, TampilDasar");
  const sm = readFileSync(new URL("../src/components/modul/SimulasiK5Bab2.tsx", import.meta.url), "utf8");
  cek(/SimulasiDuaLonceng/.test(sm) && /laporMisiJadwal\(daftarMisiK5Bab2\("B"\)/.test(sm), "SimulasiK5Bab2: Sub-Bab B memasang SimulasiDuaLonceng");
}

console.log(`\nLulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
