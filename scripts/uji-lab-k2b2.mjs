// Uji logika simulasi Matematika Kelas 2 Bab 2 (lab PhET + mesin simpan/urai).
// Jalankan: node --no-warnings scripts/uji-lab-k2b2.mjs
import * as L from "../src/components/modul/lab-cara-k2b2.ts";
import * as M from "../src/components/modul/mesin-simpan-k2b2.ts";

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

/* ----------------------------- Lab cara hitung --------------------------- */
sama(L.rapikan({ a: 8, b: 5 }, "tambah"), { a: 8, b: 5 }, "rapikan 8+5");
sama(L.rapikan({ a: 18, b: 5 }, "tambah"), { a: 18, b: 2 }, "rapikan tambah dibatasi 20");
sama(L.rapikan({ a: 8, b: 9 }, "kurang"), { a: 8, b: 8 }, "rapikan kurang dibatasi a");
sama(L.hasilCara({ a: 8, b: 5 }, "tambah"), 13, "8+5");
sama(L.hasilCara({ a: 14, b: 6 }, "kurang"), 8, "14-6");
sama(L.rencanaGaris({ a: 8, b: 3 }, "tambah").length, 3, "3 lompatan maju");
sama(L.rencanaGaris({ a: 8, b: 3 }, "kurang").length, 3, "3 lompatan mundur");
sama(L.kalimatCara({ a: 8, b: 5 }, "tambah"), "8 + 5 = 13", "kalimat tambah");
sama(L.catatanSusun({ a: 8, b: 5 }, "tambah").jenis, "simpan", "8+5 perlu simpan");
sama(L.catatanSusun({ a: 3, b: 4 }, "tambah").jenis, "aman", "3+4 aman");
sama(L.catatanSusun({ a: 14, b: 6 }, "kurang").jenis, "urai", "14-6 perlu urai");
sama(L.catatanSusun({ a: 18, b: 5 }, "kurang").jenis, "aman", "18-5 aman");
sama(L.hasilKolom({ a: 8, b: 5 }, "tambah"), { puluhan: 1, satuan: 3 }, "kolom 13");
cek(/ditambah/.test(L.ucapanCara({ a: 8, b: 5 }, "tambah")), "ucapan tambah");

/* ----------------------------- Mesin simpan ------------------------------ */
{
  for (const m of M.MISI_SIMPAN) {
    cek(M.hasilMisi(m) >= 0 && M.hasilMisi(m) <= 20, `hasil misi ${m.a}${m.op}${m.b} dalam 0-20`);
    cek(M.perluTukar(m), `misi ${m.a}${m.op}${m.b} memang perlu tukar`);
  }

  let x = M.awalSimpan(0);
  sama(x.keadaan, "soal", "awal soal");
  const dini = M.langkahSimpan(x, { t: "TUKAR" });
  cek(dini.pesan !== "" && dini.ditolak === 1, "tukar di soal ditolak");

  x = M.langkahSimpan(x, { t: "BACA" });
  sama(x.keadaan, "susun", "soal → susun");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "tukar", "susun → tukar");

  const lompatHasil = M.langkahSimpan(x, { t: "LOMPAT", ke: "hasil" });
  cek(lompatHasil.pesan !== "" && lompatHasil.keadaan === "tukar", "hasil sebelum tukar ditolak");

  x = M.langkahSimpan(x, { t: "TUKAR" });
  cek(x.sudahTukar && /Simpan/.test(x.riwayat[x.riwayat.length - 1]), "simpan tercatat");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "hasil", "tukar → hasil");

  const salah = M.langkahSimpan(x, { t: "JAWAB", nilai: 12 });
  cek(salah.pesan !== "" && salah.keadaan === "hasil", "jawaban salah ditolak");
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 13 });
  cek(x.misi === 1 && x.keadaan === "soal", "misi 2 mulai setelah 8+5");

  // Misi 2: 14-6 urai
  x = M.langkahSimpan(x, { t: "BACA" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "tukar", "misi 2 tukar");
  cek(M.perluUrai(M.misiAktif(x)), "misi 2 perlu urai");
  x = M.langkahSimpan(x, { t: "TUKAR" });
  cek(/Urai/.test(x.riwayat[x.riwayat.length - 1]), "urai tercatat");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 8 });
  cek(x.misi === 2 && x.keadaan === "soal", "misi 3 mulai");

  // Misi 3: 9+7
  x = M.langkahSimpan(x, { t: "BACA" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "TUKAR" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 16 });
  cek(x.selesai && x.keadaan === "selesai", "semua misi selesai");

  const ulang = M.langkahSimpan(x, { t: "ULANG" });
  sama([ulang.misi, ulang.keadaan, ulang.selesai], [0, "soal", false], "main lagi");

  const pil = M.pilihanHasil(0);
  cek(pil.includes(13) && pil.length === 3, "pilihan hasil memuat 13");
  cek(/Misi 1/.test(M.petunjukSimpan(M.awalSimpan(0))), "petunjuk");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
