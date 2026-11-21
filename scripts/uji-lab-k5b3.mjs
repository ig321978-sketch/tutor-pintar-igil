// Uji misi hibrida Matematika Kelas 5 Bab 3 (Bilangan Pecahan, Toko Roti Keliling).
// Jalankan: node --no-warnings scripts/uji-lab-k5b3.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab3.ts";
import * as MT from "../src/components/modul/misi-teks-k5b3.ts";

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

/* --------------------------- Kelas 5 Bab 3: misi (Toko Roti Keliling) --------------------------- */
{
  void ujiStruktur;
  void sama;
  void K5;
  void M0;
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Garis Timbang; rincian di scripts/uji-timbang-k5b3a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = {
      alat: "timbang", mode: "garis", garisKe: 0, garisPilih: -1, garisBenar: [], ubahKe: 0, ubahP: 1, ubahBenar: [], bandingKe: 0, bandingD: 2, bandingTanda: "", bandingBenar: [],
      urutKe: 0, urutIsi: [], urutBenar: [], tolak: false, salah: 0,
    };
    ujiStruktur("K5B3", K5.daftarMisiK5Bab3, ["A"], { A: awalA });
    sama(K5.MISI_A.map((m) => m.id), ["a-garis", "a-ubah", "a-banding", "a-urut", "a-tolak", "a-dua"], "K5B3 A: id misi");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, garisBenar: [0], ubahBenar: [0], bandingBenar: [0], urutBenar: [0] }, new Set()), ["a-garis", "a-ubah", "a-banding", "a-urut"], "K5B3 A: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, tolak: true }, new Set()), ["a-tolak"], "K5B3 A: tantangan tolak dari penolakan penyebut baru yang bukan kelipatan kedua penyebut");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, salah: 3 }, new Set()), [], "K5B3 A: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, bandingBenar: [0, 1] }, new Set()), ["a-banding", "a-dua"], "K5B3 A: dua pasangan Banding benar");
    sama(M0.misiBaru(K5.MISI_A, { alat: "kerangka" }, new Set()), [], "K5B3 A: keadaan alat lain tidak memenuhi misi A");
    cek(MT.MISI_K5B3.A.includes("Geser tanda") && MT.misiAwalK5Bab3("A").includes(MT.MISI_K5B3.A), "K5B3 A: teks misi awal");
  }
  // BAGIAN B (Gabung Loyang; rincian di scripts/uji-loyang-k5b3b.mjs): keadaan awal ditulis langsung.
  {
    const awalB = {
      alat: "loyang", mode: "gabung", gabungKe: 0, gabungN: 1, gabungD: 9, gabungBenar: [], samaKe: 0, samaM: 0, samaBenar: [], campKe: 0, campW: 0, campN: 0, campBenar: [],
      sedKe: 0, sedPilih: -1, sedBenar: [], tolakPenyebut: false, tolakKelipatan: false, tolakCampur: false, salah: 0,
    };
    ujiStruktur("K5B3", K5.daftarMisiK5Bab3, ["B"], { B: awalB });
    sama(K5.MISI_B.map((m) => m.id), ["b-gabung", "b-samakan", "b-campur", "b-sederhana", "b-tolak", "b-dua"], "K5B3 B: id misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, gabungBenar: [0], samaBenar: [0], campBenar: [0], sedBenar: [0] }, new Set()), ["b-gabung", "b-samakan", "b-campur", "b-sederhana"], "K5B3 B: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakPenyebut: true }, new Set()), ["b-tolak"], "K5B3 B: tantangan tolak dari penolakan penyebut yang diubah pada alat Gabung");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakKelipatan: true, tolakCampur: true, salah: 3 }, new Set()), [], "K5B3 B: penolakan alat lain dan percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, samaBenar: [0, 1] }, new Set()), ["b-samakan", "b-dua"], "K5B3 B: dua sasaran Samakan benar");
    sama(M0.misiBaru(K5.MISI_B, { alat: "kerangka" }, new Set()), [], "K5B3 B: keadaan alat lain tidak memenuhi misi B");
    cek(MT.MISI_K5B3.B.includes("Gabungkan pecahan") && MT.misiAwalK5Bab3("B").includes(MT.MISI_K5B3.B), "K5B3 B: teks misi awal");
  }
  // BAGIAN C (Sisa Adonan; rincian di scripts/uji-adonan-k5b3c.mjs): keadaan awal ditulis langsung.
  {
    const awalC = {
      alat: "adonan", mode: "coret", coretKe: 0, coretPilih: [], coretBenar: [], samakanKe: 0, samakanV: 1, samakanBenar: [], tolak: false,
      kurangKe: 0, kurangN: -1, kurangBenar: [], pisahKe: 0, pisahB: -1, pisahN: -1, pisahBenar: [], salah: 0,
    };
    ujiStruktur("K5B3", K5.daftarMisiK5Bab3, ["C"], { C: awalC });
    sama(K5.MISI_C.map((m) => m.id), ["c-coret", "c-samakan", "c-kurang", "c-pisah", "c-tolak", "c-dua"], "K5B3 C: id misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, coretBenar: [0], samakanBenar: [0], kurangBenar: [0], pisahBenar: [0] }, new Set()), ["c-coret", "c-samakan", "c-kurang", "c-pisah"], "K5B3 C: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tolak: true }, new Set()), ["c-tolak"], "K5B3 C: tantangan tolak dari penolakan Kurangkan pada alat Samakan");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, salah: 3 }, new Set()), [], "K5B3 C: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, coretBenar: [0, 1] }, new Set()), ["c-coret", "c-dua"], "K5B3 C: dua loyang Coret benar");
    sama(M0.misiBaru(K5.MISI_C, { alat: "kerangka" }, new Set()), [], "K5B3 C: keadaan alat lain tidak memenuhi misi C");
    cek(MT.MISI_K5B3.C.includes("Coret bagian loyang") && MT.misiAwalK5Bab3("C").includes(MT.MISI_K5B3.C), "K5B3 C: teks misi awal");
  }
}

console.log(`\nUji misi K5B3: ${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal ? 1 : 0);
