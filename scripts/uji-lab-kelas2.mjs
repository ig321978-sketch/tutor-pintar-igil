// Uji misi hibrida Matematika Kelas 2 (mulai Bab 1).
// Jalankan: node --no-warnings scripts/uji-lab-kelas2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B1 from "../src/components/modul/misi-k2bab1.ts";
import * as L from "../src/components/modul/lab-bilangan-k2b1.ts";

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

/* --------------------------- Kelas 2 Bab 1: lab + misi --------------------------- */
sama(L.AWAL_N, 12, "awal n netral");
sama(L.AWAL_M, 18, "awal m netral");
cek(L.AWAL_N !== 26 && L.AWAL_N !== 40 && L.AWAL_N !== 50 && L.AWAL_N !== 30 && L.AWAL_N !== 11 && L.AWAL_N !== 35, "awal bukan target misi A/B");

{
  const kosong = new Set();
  const Lab = (o) => ({
    alat: "lab50",
    n: L.AWAL_N,
    m: L.AWAL_M,
    batang: true,
    tabel: false,
    kalimat: true,
    garis: true,
    banding: false,
    ...o,
  });
  const awalSub = {
    A: Lab({}),
    B: Lab({ tabel: true }),
    C: Lab({ tabel: true, banding: false }),
  };
  ujiStruktur("k2bab1", K2B1.daftarMisiK2Bab1, ["A", "B", "C"], awalSub);

  for (const sub of ["A", "B", "C"]) {
    const daftar = K2B1.daftarMisiK2Bab1(sub);
    cek(M0.misiBaru(daftar, awalSub[sub], kosong).length === 0, `k2bab1 ${sub}: ulang cek awal`);
  }

  const ada = (sub, k, id) => M0.misiBaru(K2B1.daftarMisiK2Bab1(sub), k, kosong).includes(id);
  const SEL = (id) => ({ alat: "selesai", id });

  // Sub-Bab A
  cek(ada("A", Lab({ n: 26 }), "a-26") && !ada("A", Lab({ n: 26, batang: false }), "a-26"), "k2bab1 A: 26 butuh batang");
  cek(ada("A", Lab({ n: 40 }), "a-40") && ada("A", Lab({ n: 50 }), "a-50"), "k2bab1 A: 40 dan 50");
  cek(ada("A", Lab({ n: 30 }), "a-garis") && !ada("A", Lab({ n: 30, garis: false }), "a-garis"), "k2bab1 A: garis 30");
  cek(ada("A", Lab({ n: 35 }), "a-kalimat") && !ada("A", Lab({ n: 35, kalimat: false }), "a-kalimat"), "k2bab1 A: kalimat");
  cek(ada("A", Lab({ n: 21 }), "a-21") && !ada("A", Lab({}), "a-21"), "k2bab1 A: 21 bebas");
  cek(!ada("A", Lab({}), "a-26") && !ada("A", Lab({}), "a-40") && !ada("A", Lab({}), "a-50"), "k2bab1 A: awal tidak memenuhi wajib");

  // Sub-Bab B
  const B = (o) => Lab({ tabel: true, ...o });
  cek(ada("B", B({ n: 26 }), "b-tabel-26") && !ada("B", Lab({ n: 26, tabel: false }), "b-tabel-26"), "k2bab1 B: tabel 26");
  cek(ada("B", B({ n: 11 }), "b-tabel-11") && ada("B", B({ n: 50 }), "b-tabel-50"), "k2bab1 B: 11 dan 50");
  cek(ada("B", SEL("tukar"), "b-tukar") && !ada("B", SEL("stoples"), "b-tukar"), "k2bab1 B: mesin tukar");
  cek(ada("B", B({ n: 34 }), "b-34") && ada("B", Lab({ n: 26, batang: true }), "b-ingat"), "k2bab1 B: bebas");
  cek(!ada("B", B({}), "b-tabel-26") && !ada("B", B({}), "b-tabel-11"), "k2bab1 B: awal tidak memenuhi tabel");

  // Sub-Bab C
  const C = (o) => Lab({ tabel: true, banding: true, ...o });
  cek(ada("C", C({ n: 32, m: 26 }), "c-puluhan") && ada("C", C({ n: 26, m: 32 }), "c-puluhan"), "k2bab1 C: puluhan");
  cek(!ada("C", Lab({ n: 32, m: 26, banding: false }), "c-puluhan"), "k2bab1 C: banding harus menyala");
  cek(ada("C", C({ n: 28, m: 25 }), "c-satuan") && ada("C", C({ n: 26, m: 26 }), "c-sama"), "k2bab1 C: satuan dan sama");
  cek(ada("C", SEL("stoples"), "c-stoples") && ada("C", SEL("tukar"), "c-ingat-tukar"), "k2bab1 C: stoples dan ingat");
  cek(ada("C", C({ n: 40, m: 10 }), "c-ujung") && !ada("C", C({ n: 25, m: 22 }), "c-ujung"), "k2bab1 C: selisih puluhan");
  cek(!ada("C", Lab({ tabel: true, banding: false }), "c-puluhan") && !ada("C", Lab({ tabel: true, banding: false }), "c-sama"), "k2bab1 C: awal tidak memenuhi banding");
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
