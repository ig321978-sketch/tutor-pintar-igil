// Uji logika simulasi Matematika Kelas 2 Bab 1 (lab PhET + mesin tukar).
// Jalankan: node --no-warnings scripts/uji-lab-k2b1.mjs
import * as L from "../src/components/modul/lab-bilangan-k2b1.ts";
import * as T from "../src/components/modul/mesin-tukar-k2b1.ts";

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

/* -------------------------------- Lab 50 -------------------------------- */
sama(L.batas(-3), 0, "batas bawah");
sama(L.batas(99), 50, "batas atas");
sama(L.batas(26.4), 26, "batas bulat");
sama(L.uraiNilai(26), { puluhan: 2, satuan: 6 }, "urai 26");
sama(L.uraiNilai(50), { puluhan: 5, satuan: 0 }, "urai 50");
sama(L.uraiNilai(7), { puluhan: 0, satuan: 7 }, "urai 7");
sama(L.kalimatNilai(34), "34 = 3 puluhan + 4 satuan", "kalimat nilai");
sama(L.ketukBatang(26, 1), 16, "ketuk batang ke-2 saat 2 puluhan mengurangi");
sama(L.ketukBatang(16, 2), 36, "ketuk batang ke-3 menaikkan puluhan");
sama(L.ketukSatuan(26, 5), 25, "ketuk satuan terakhir mengurangi");
sama(L.ketukSatuan(20, 3), 24, "ketuk satuan menambah");
cek(L.bisaIkat(10) && !L.bisaIkat(9), "bisa ikat dari 10");
sama(L.bandingkanNilaiTempat(26, 32).simbol, "<", "26 < 32");
sama(L.bandingkanNilaiTempat(32, 26).simbol, ">", "32 > 26");
sama(L.bandingkanNilaiTempat(26, 26).simbol, "=", "26 = 26");
sama(L.bandingkanNilaiTempat(28, 25).simbol, ">", "puluhan sama, satuan lebih");
cek(/Puluhan/.test(L.bandingkanNilaiTempat(26, 32).alasan), "alasan banding puluhan");
cek(/Bilangan 26\./.test(L.ucapanLab50(26, true)), "ucapan lab");
cek(L.AWAL_N === 26 && L.AWAL_M === 32, "awal lab dari buku");

/* ------------------------------ Mesin tukar ------------------------------ */
{
  // Invarian misi
  for (const m of T.MISI_TUKAR) {
    cek(T.nilai(m.puluhan, m.satuan) === m.target, `misi ${m.target} konsisten`);
    cek(m.satuan >= 10, `misi ${m.target} mulai tidak ringkas`);
  }

  let x = T.awalTukar(0);
  cek(T.konsisten(x) && x.keadaan === "mulai" && x.satuan === 26, "awal misi 1");
  const dini = T.langkahTukar(x, { t: "IKAT" });
  cek(dini.pesan !== "" && dini.ditolak === 1, "ikat di Mulai ditolak");
  x = T.langkahTukar(x, { t: "BACA" });
  sama(x.keadaan, "tukar", "mulai → tukar");

  const lompatDini = T.langkahTukar(x, { t: "LOMPAT", ke: "ringkas" });
  cek(lompatDini.pesan !== "" && lompatDini.keadaan === "tukar", "maju ke ringkas sebelum ikat ditolak");

  x = T.langkahTukar(x, { t: "IKAT" });
  sama([x.puluhan, x.satuan], [1, 16], "ikat pertama 0p26s → 1p16s");
  cek(T.konsisten(x), "konsisten setelah ikat 1");
  x = T.langkahTukar(x, { t: "IKAT" });
  sama([x.puluhan, x.satuan], [2, 6], "ikat kedua → 2p6s");
  cek(T.isRingkas(x.satuan), "sudah ringkas");
  const ikatLebih = T.langkahTukar(x, { t: "IKAT" });
  cek(ikatLebih.pesan !== "" && ikatLebih.ditolak === x.ditolak + 1, "ikat saat ringkas ditolak");

  x = T.langkahTukar(x, { t: "BUKA" });
  sama([x.puluhan, x.satuan], [1, 16], "buka kembali");
  x = T.langkahTukar(x, { t: "IKAT" });
  x = T.langkahTukar(x, { t: "LANJUT" });
  sama(x.keadaan, "ringkas", "tukar → ringkas");

  x = T.langkahTukar(x, { t: "LANJUT" });
  cek(x.misi === 1 && x.keadaan === "mulai" && x.satuan === 24, "misi 2 mulai");

  // Selesaikan misi 2 dan 3
  for (let misi = 0; misi < 2; misi += 1) {
    x = T.langkahTukar(x, { t: "BACA" });
    while (!T.isRingkas(x.satuan)) x = T.langkahTukar(x, { t: "IKAT" });
    x = T.langkahTukar(x, { t: "LANJUT" }); // ke ringkas
    x = T.langkahTukar(x, { t: "LANJUT" }); // misi berikutnya atau selesai
  }
  cek(x.selesai && x.keadaan === "selesai", "semua misi selesai");
  cek(T.langkahTukar(x, { t: "IKAT" }).pesan !== "", "ikat setelah selesai ditolak");

  const ulang = T.langkahTukar(x, { t: "ULANG" });
  sama([ulang.misi, ulang.keadaan, ulang.selesai], [0, "mulai", false], "main lagi");

  // Mundur stasiun
  let y = T.awalTukar(0);
  y = T.langkahTukar(y, { t: "BACA" });
  y = T.langkahTukar(y, { t: "IKAT" });
  y = T.langkahTukar(y, { t: "IKAT" });
  y = T.langkahTukar(y, { t: "LANJUT" });
  y = T.langkahTukar(y, { t: "LOMPAT", ke: "tukar" });
  sama(y.keadaan, "tukar", "mundur ke tukar");
  cek(/Misi 1/.test(T.petunjukTukar(T.awalTukar(0))), "petunjuk misi");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
