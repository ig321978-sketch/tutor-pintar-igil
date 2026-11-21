// Uji misi hibrida Matematika Kelas 5 Bab 2 (KPK dan FPB, Pasar Kuliner Malam).
// Jalankan: node --no-warnings scripts/uji-lab-k5b2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab2.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

function ujiStruktur(nama, daftarFn, subs, awalSub) {
  for (const sub of subs) {
    const daftar = daftarFn(sub);
    const awal = awalSub[sub];
    cek(M0.misiBaru(daftar, awal, new Set()).length === 0, `${nama} ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `${nama} ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `${nama} ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `${nama} ${sub}: teks misi ringkas`);
  }
}

/* --------------------------- Kelas 5 Bab 2: misi (Pasar Kuliner Malam) --------------------------- */
{
  void ujiStruktur;
  void sama;
  void K5;
  void M0;
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Lompat Lonceng; rincian di scripts/uji-lonceng-k5b2a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = {
      alat: "lonceng", mode: "lompat", lompatKe: 0, lompatBuat: 0, lompatBenar: [], warnaiKe: 0, warnaiPilih: [], warnaiBenar: [], cekKe: 0, cekSisa: 65, cekPilih: -1, cekBenar: [],
      kaliKe: 0, kaliP: 1, kaliBenar: [], tolak: false, salah: 0,
    };
    ujiStruktur("K5B2", K5.daftarMisiK5Bab2, ["A"], { A: awalA });
    sama(K5.MISI_A.map((m) => m.id), ["a-lompat", "a-warnai", "a-cek", "a-kali", "a-tolak", "a-dua"], "K5B2 A: id misi");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, lompatBenar: [0], warnaiBenar: [0], cekBenar: [0], kaliBenar: [0] }, new Set()), ["a-lompat", "a-warnai", "a-cek", "a-kali"], "K5B2 A: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, tolak: true }, new Set()), ["a-tolak"], "K5B2 A: tantangan tolak dari penolakan pengali nol pada alat Kali");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, salah: 3 }, new Set()), [], "K5B2 A: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, warnaiBenar: [0, 1] }, new Set()), ["a-warnai", "a-dua"], "K5B2 A: dua tabel benar");
    sama(M0.misiBaru(K5.MISI_A, { alat: "kerangka" }, new Set()), [], "K5B2 A: keadaan alat lain tidak memenuhi misi A");
  }
  // BAGIAN B (Dua Lonceng; rincian di scripts/uji-jadwal-k5b2b.mjs): keadaan awal ditulis langsung.
  {
    const awalB = {
      alat: "jadwal", mode: "daftar", daftarKe: 0, lingkar: [], tolakDaftar: false, daftarBenar: [], kpkKe: 0, kaliKpk: 1, tolakKpk: false, kpkBenar: [],
      jadwalKe: 0, waktu: 0, tolakJadwal: false, jadwalBenar: [], tigaKe: 0, tigaPilih: -1, tolakTiga: false, tigaBenar: [], salah: 0,
    };
    ujiStruktur("K5B2", K5.daftarMisiK5Bab2, ["B"], { B: awalB });
    sama(K5.MISI_B.map((m) => m.id), ["b-daftar", "b-kpk", "b-jadwal", "b-tiga", "b-tolak", "b-dua"], "K5B2 B: id misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, daftarBenar: [0], kpkBenar: [0], jadwalBenar: [0], tigaBenar: [0] }, new Set()), ["b-daftar", "b-kpk", "b-jadwal", "b-tiga"], "K5B2 B: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakDaftar: true }, new Set()), ["b-tolak"], "K5B2 B: tantangan tolak dari penolakan bilangan yang hanya ada di satu daftar");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakKpk: true, tolakJadwal: true, tolakTiga: true }, new Set()), [], "K5B2 B: penolakan alat KPK, Jadwal, dan Tiga bukan tantangan tolak");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, salah: 3 }, new Set()), [], "K5B2 B: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, kpkBenar: [0, 1] }, new Set()), ["b-kpk", "b-dua"], "K5B2 B: dua pasang KPK benar");
    sama(M0.misiBaru(K5.MISI_B, { alat: "kerangka" }, new Set()), [], "K5B2 B: keadaan alat lain tidak memenuhi misi B");
  }
  // BAGIAN C (Tata Piring; rincian di scripts/uji-piring-k5b2c.mjs): keadaan awal ditulis langsung.
  {
    const awalC = {
      alat: "piring", mode: "tata", tataKe: 0, tataP: 1, tataTemu: [], tataBenar: [], pasangKe: 0, pasangPilih: -1, pasangTemu: [], pasangBenar: [],
      cekKe: 0, cekSisa: -1, cekBenar: [], daftarKe: 0, daftarPilih: [false, false, false, false, false, false, false, false, false, false, false, false], daftarBenar: [], tolak: false, salah: 0,
    };
    ujiStruktur("K5B2", K5.daftarMisiK5Bab2, ["C"], { C: awalC });
    sama(K5.MISI_C.map((m) => m.id), ["c-tata", "c-pasang", "c-cek", "c-daftar", "c-tolak", "c-dua"], "K5B2 C: id misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tataBenar: [0], pasangBenar: [0], cekBenar: [0], daftarBenar: [0] }, new Set()), ["c-tata", "c-pasang", "c-cek", "c-daftar"], "K5B2 C: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tolak: true }, new Set()), ["c-tolak"], "K5B2 C: tantangan tolak dari penolakan isi piring yang menyisakan klepon");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, salah: 3 }, new Set()), [], "K5B2 C: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tataBenar: [0, 1] }, new Set()), ["c-tata", "c-dua"], "K5B2 C: dua bilangan Tata benar");
    sama(M0.misiBaru(K5.MISI_C, { alat: "kerangka" }, new Set()), [], "K5B2 C: keadaan alat lain tidak memenuhi misi C");
  }
  // BAGIAN D (Isi Kotak; rincian di scripts/uji-kotak-k5b2d.mjs): keadaan awal ditulis langsung.
  {
    const awalD = {
      alat: "kotak", mode: "congklak", congKe: 0, pilihLubang: [], tolakLubang: false, congBenar: [],
      kotakKe: 0, banyakK: 1, tolakKotak: false, kotakBenar: [], tigaKe: 0, banyakT: 1, tigaBenar: [],
      besarKe: 0, pilihBesar: -1, besarBenar: [], salah: 0,
    };
    ujiStruktur("K5B2", K5.daftarMisiK5Bab2, ["D"], { D: awalD });
    sama(K5.MISI_D.map((m) => m.id), ["d-congklak", "d-kotak", "d-tiga", "d-besar", "d-tolak", "d-dua"], "K5B2 D: id misi");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, congBenar: [0], kotakBenar: [0], tigaBenar: [0], besarBenar: [0] }, new Set()), ["d-congklak", "d-kotak", "d-tiga", "d-besar"], "K5B2 D: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, tolakKotak: true }, new Set()), ["d-tolak"], "K5B2 D: tantangan tolak dari penolakan Periksa kotak yang bersisa");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, tolakLubang: true }, new Set()), [], "K5B2 D: penolakan lubang congklak bukan tantangan tolak");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, kotakBenar: [0, 1] }, new Set()), ["d-kotak", "d-dua"], "K5B2 D: dua sasaran kotak benar");
    sama(M0.misiBaru(K5.MISI_D, { alat: "lonceng" }, new Set()), [], "K5B2 D: keadaan alat lain tidak memenuhi misi D");
  }
  // BAGIAN E (Pohon Papan; rincian di scripts/uji-papan-k5b2e.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalE = {
      alat: "papan", mode: "saring", saringKe: 0, satuDihapus: false, diambil: [], tolakHapus: false, tolakGiliran: false, saringBenar: [],
      pohonKe: 0, daun: [32], pilihDaun: -1, tolakPohon: false, pohonBenar: [], gabungKe: 0, pilihGabung: null, pasang: [], tolakGabung: false, gabungBenar: [],
      bagiKe: 0, pembagiDipakai: [], tolakBagi: false, bagiBenar: [], salah: 0,
    };
    ujiStruktur("K5B2", K5.daftarMisiK5Bab2, ["E"], { E: awalE });
    sama(K5.MISI_E.map((m) => m.id), ["e-saring", "e-pohon", "e-gabung", "e-bagi", "e-tolak", "e-dua"], "K5B2 E: id misi");
    sama(M0.misiBaru(K5.MISI_E, { ...awalE, saringBenar: [0], pohonBenar: [0], gabungBenar: [0], bagiBenar: [0] }, new Set()), ["e-saring", "e-pohon", "e-gabung", "e-bagi"], "K5B2 E: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_E, { ...awalE, tolakHapus: true }, new Set()), ["e-tolak"], "K5B2 E: tantangan tolak dari bilangan terhapus pada alat Saring");
    sama(M0.misiBaru(K5.MISI_E, { ...awalE, tolakGiliran: true, tolakPohon: true, tolakGabung: true, tolakBagi: true, salah: 3 }, new Set()), [], "K5B2 E: penolakan lain dan percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_E, { ...awalE, pohonBenar: [0, 1] }, new Set()), ["e-pohon", "e-dua"], "K5B2 E: dua pohon faktor benar");
    sama(M0.misiBaru(K5.MISI_E, { alat: "kerangka" }, new Set()), [], "K5B2 E: keadaan alat lain tidak memenuhi misi E");
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
