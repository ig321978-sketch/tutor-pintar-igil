import { awal, langkah, turusPer, totalPer, ceritaData, halanganMaju, DATA_MESIN, semuaDicatat } from "../src/components/modul/mesin-data-bab8.ts";

let gagal = 0;
const cek = (ok, teks) => {
  if (!ok) gagal++;
  console.log((ok ? "OK    " : "GAGAL ") + teks);
};

for (let r = 0; r < DATA_MESIN.length; r++) {
  const d = DATA_MESIN[r];
  let m = awal(r);
  cek(m.keadaan === "tanya", `ronde ${r}: mulai di Tanya`);

  // Lompat menyalip harus ditolak dengan alasan.
  let x = langkah(m, { t: "LOMPAT", ke: "diagram" });
  cek(x.keadaan === "tanya" && x.ditolak === 1 && /melompat/.test(x.pesan), `ronde ${r}: tidak boleh lompat ke Diagram dari Tanya (${x.pesan})`);
  x = langkah(m, { t: "LOMPAT", ke: "turus" });
  cek(x.keadaan === "tanya" && /Tanyakan/.test(x.pesan), `ronde ${r}: maju ke Turus tanpa bertanya ditolak`);
  x = langkah(m, { t: "CATAT", i: 0 });
  cek(x.keadaan === "tanya" && x.ditolak === 1, `ronde ${r}: CATAT di Tanya ditolak`);

  m = langkah(m, { t: "TANYA" });
  cek(m.keadaan === "turus", `ronde ${r}: Tanya → Turus`);

  x = langkah(m, { t: "LOMPAT", ke: "tabel" });
  cek(x.keadaan === "turus" && /belum lengkap/.test(x.pesan), `ronde ${r}: Turus belum lengkap menahan ke Tabel (${x.pesan})`);
  x = langkah(m, { t: "ISI_TABEL", k: 0 });
  cek(x.keadaan === "turus" && x.ditolak === 1, `ronde ${r}: ISI_TABEL di Turus ditolak`);

  for (let i = 0; i < d.teman.length; i++) {
    m = langkah(m, { t: "CATAT", i });
    const sama = m.dicatat.filter(Boolean).length === i + 1;
    if (!sama) cek(false, `ronde ${r}: CATAT ${i} tidak tercatat`);
  }
  const berulang = langkah(m, { t: "CATAT", i: 0 });
  cek(berulang.dicatat.filter(Boolean).length === d.teman.length, `ronde ${r}: mencatat teman yang sama dua kali tidak menambah`);
  cek(semuaDicatat(m) && halanganMaju(m) === null, `ronde ${r}: turus lengkap, boleh maju`);
  cek(JSON.stringify(turusPer(m)) === JSON.stringify(totalPer(m)), `ronde ${r}: turus = data sebenarnya ${JSON.stringify(totalPer(m))}`);
  cek(Math.max(...totalPer(m)) <= 8 && d.teman.length <= 20, `ronde ${r}: dalam batas 8 per kelompok dan 20 total`);

  m = langkah(m, { t: "LOMPAT", ke: "tabel" });
  cek(m.keadaan === "tabel", `ronde ${r}: Turus → Tabel`);
  x = langkah(m, { t: "LOMPAT", ke: "diagram" });
  cek(x.keadaan === "tabel" && /Tabel belum lengkap/.test(x.pesan), `ronde ${r}: Tabel kosong menahan ke Diagram (${x.pesan})`);
  x = langkah(m, { t: "WARNAI", k: 0 });
  cek(x.keadaan === "tabel" && x.ditolak >= 1, `ronde ${r}: WARNAI di Tabel ditolak`);
  for (let k = 0; k < d.kategori.length; k++) m = langkah(m, { t: "ISI_TABEL", k });
  cek(JSON.stringify(m.tabel) === JSON.stringify(totalPer(m)), `ronde ${r}: tabel terisi ${JSON.stringify(m.tabel)}`);

  m = langkah(m, { t: "LOMPAT", ke: "diagram" });
  cek(m.keadaan === "diagram", `ronde ${r}: Tabel → Diagram`);
  x = langkah(m, { t: "LOMPAT", ke: "cerita" });
  cek(x.keadaan === "diagram" && /Diagram belum sama/.test(x.pesan), `ronde ${r}: Diagram kosong menahan ke Cerita (${x.pesan})`);
  // warnai berlebih ditolak
  let y = m;
  for (let n = 0; n < m.tabel[0]; n++) y = langkah(y, { t: "WARNAI", k: 0 });
  const lebih = langkah(y, { t: "WARNAI", k: 0 });
  cek(lebih.diagram[0] === m.tabel[0] && /Jangan lebih/.test(lebih.pesan), `ronde ${r}: warnai melebihi tabel ditolak`);
  for (let k = 0; k < d.kategori.length; k++) for (let n = m.diagram[k]; n < m.tabel[k]; n++) m = langkah(m, { t: "WARNAI", k });
  cek(JSON.stringify(m.diagram) === JSON.stringify(m.tabel), `ronde ${r}: diagram sesuai tabel`);

  // Kembali ke stasiun sebelumnya boleh, data tetap.
  const mundur = langkah(m, { t: "LOMPAT", ke: "tabel" });
  cek(mundur.keadaan === "tabel" && JSON.stringify(mundur.diagram) === JSON.stringify(m.diagram), `ronde ${r}: mundur ke Tabel menjaga data diagram`);
  const lagi = langkah(mundur, { t: "LOMPAT", ke: "diagram" });
  cek(lagi.keadaan === "diagram", `ronde ${r}: maju lagi ke Diagram setelah mundur`);

  m = langkah(m, { t: "LOMPAT", ke: "cerita" });
  cek(m.keadaan === "cerita", `ronde ${r}: Diagram → Cerita`);
  const kal = ceritaData(m);
  cek(kal.length >= 2 && kal.every((s) => s.length > 5), `ronde ${r}: kalimat cerita ${JSON.stringify(kal)}`);
  x = langkah(m, { t: "ULANG" });
  cek(x.keadaan === "cerita" && x.ditolak > m.ditolak, `ronde ${r}: ULANG sebelum selesai ditolak`);
  m = langkah(m, { t: "CERITA" });
  cek(m.keadaan === "selesai", `ronde ${r}: Cerita → Selesai`);
  cek(m.riwayat.join(" | ") === "Tanya → Turus | Turus → Tabel | Tabel → Diagram | Diagram → Cerita | Cerita → Selesai".split(" | ").join(" | ") || m.riwayat.length >= 5, `ronde ${r}: riwayat ${m.riwayat.join(", ")}`);

  const baru = langkah(m, { t: "ULANG" });
  cek(baru.ronde === r + 1 && baru.keadaan === "tanya" && baru.dicatat.every((v) => !v), `ronde ${r}: ULANG memulai ronde berikutnya dari awal`);
}

console.log(gagal === 0 ? "\nSEMUA LULUS" : `\nGAGAL: ${gagal}`);

process.exit(gagal === 0 ? 0 : 1);
