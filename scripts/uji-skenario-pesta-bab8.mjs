import {
  VARIAN,
  awalSkenario,
  langkahSkenario as L,
  pilihanAdegan,
  pertanyaanBaca,
  totalSkenario,
  ceritaAdegan,
  varianKe,
  terbanyakTersedikit,
} from "../src/components/modul/skenario-pesta-bab8.ts";

let gagal = 0;
const cek = (ok, teks) => {
  if (!ok) gagal++;
  console.log((ok ? "OK    " : "GAGAL ") + teks);
};
const posisiBenar = { cara: [], baca: [], putus: [] };

for (let v = 0; v < VARIAN.length; v++) {
  const va = VARIAN[v];
  const n = totalSkenario(va);
  const { nBanyak, nSedikit } = terbanyakTersedikit(va);
  cek(n.reduce((a, b) => a + b, 0) === va.teman.length, `varian ${v}: total data ${n.join(",")} = ${va.teman.length} teman`);
  cek(Math.max(...n) <= 8 && va.teman.length <= 20, `varian ${v}: dalam batas 8 per kelompok dan 20 total`);
  cek(new Set(n).size === n.length, `varian ${v}: tidak ada nilai kembar, terbanyak dan tersedikit jelas`);

  let s = awalSkenario(v);
  cek(s.adegan === "mulai", `varian ${v}: mulai di adegan mulai`);
  cek(ceritaAdegan(s).length > 40, `varian ${v}: ada cerita pembuka`);
  s = L(s, { t: "LANJUT" });
  cek(s.adegan === "cara", `varian ${v}: mulai → cara`);

  // cara: pilihan salah mengulang, benar maju
  const opsiCara = pilihanAdegan(s);
  cek(opsiCara.length === 3, `varian ${v}: tiga pilihan cara`);
  const benarCara = opsiCara.findIndex((o) => /semua teman/.test(o.teks));
  posisiBenar.cara.push(benarCara);
  for (let i = 0; i < 3; i++) {
    if (i === benarCara) continue;
    const x = L(s, { t: "PILIH", i });
    cek(x.adegan === "cara" && !x.umpanBaik && x.percobaanUlang === s.percobaanUlang + 1 && x.umpan.length > 10, `varian ${v}: cara salah ${i} mengulang ("${x.umpan.slice(0, 40)}…")`);
  }
  s = L(s, { t: "PILIH", i: benarCara });
  cek(s.adegan === "kumpul" && s.umpanBaik, `varian ${v}: cara benar → kumpul`);

  // kumpul: belum lengkap tidak bisa lanjut
  let x = L(s, { t: "LANJUT" });
  cek(x.adegan === "kumpul" && /belum kamu tanya/.test(x.umpan), `varian ${v}: kumpul belum lengkap menahan (${x.umpan})`);
  for (let i = 0; i < va.teman.length; i++) s = L(s, { t: "CATAT", i });
  const dobel = L(s, { t: "CATAT", i: 0 });
  cek(dobel.dicatat.filter(Boolean).length === va.teman.length, `varian ${v}: catat dua kali tidak menambah`);
  s = L(s, { t: "LANJUT" });
  cek(s.adegan === "sajikan", `varian ${v}: kumpul lengkap → sajikan`);

  // sajikan: "diingat di kepala" ditolak, tiga cara lain diterima
  const opsiSaji = pilihanAdegan(s);
  const kepala = opsiSaji.findIndex((o) => /kepala/.test(o.teks));
  x = L(s, { t: "PILIH", i: kepala });
  cek(x.adegan === "sajikan" && !x.umpanBaik, `varian ${v}: "diingat di kepala" mengulang`);
  const caraSaji = ["tabel", "diagram", "daftar"];
  for (let c = 0; c < 3; c++) {
    const y = L(s, { t: "PILIH", i: c });
    cek(y.adegan === "baca" && y.saji === caraSaji[c] && y.bacaKe === 0, `varian ${v}: sajikan ${caraSaji[c]} → baca`);
  }
  s = L(s, { t: "PILIH", i: 1 });

  // baca: tiga pertanyaan, salah mengulang, benar maju
  for (let q = 0; q < 3; q++) {
    const pq = pertanyaanBaca(s);
    cek(pq.opsi.includes(pq.jawaban), `varian ${v}: pertanyaan ${q + 1} "${pq.teks}" jawaban ${pq.jawaban} ada di opsi ${JSON.stringify(pq.opsi)}`);
    cek(new Set(pq.opsi).size === pq.opsi.length, `varian ${v}: opsi pertanyaan ${q + 1} tidak kembar`);
    posisiBenar.baca.push(pq.opsi.indexOf(pq.jawaban));
    const salah = pq.opsi.find((o) => o !== pq.jawaban);
    const bukan = L(s, { t: "JAWAB", nilai: salah });
    cek(bukan.adegan === "baca" && bukan.bacaKe === q && !bukan.umpanBaik, `varian ${v}: jawaban salah pertanyaan ${q + 1} mengulang`);
    s = L(s, { t: "JAWAB", nilai: pq.jawaban });
  }
  cek(s.adegan === "putuskan", `varian ${v}: tiga pertanyaan terjawab → putuskan`);
  const dataBenar = [String(n[1]), terbanyakTersedikit(va).banyak];
  cek(nBanyak > nSedikit, `varian ${v}: selisih ${nBanyak - nSedikit} > 0 ${dataBenar.length ? "" : ""}`);

  // putuskan
  const opsiPutus = pilihanAdegan(s);
  const sesuai = opsiPutus.findIndex((o) => va.kategori.every((c, k) => o.teks.includes(`${n[k]} ${c.nama.toLowerCase()}`)));
  cek(sesuai >= 0, `varian ${v}: ada pilihan keputusan sesuai data ("${opsiPutus[sesuai]?.teks}")`);
  posisiBenar.putus.push(sesuai);
  for (let i = 0; i < 3; i++) {
    if (i === sesuai) continue;
    const y = L(s, { t: "PILIH", i });
    cek(y.adegan === "putuskan" && !y.umpanBaik && y.umpan.length > 20, `varian ${v}: keputusan salah ${i} mengulang ("${y.umpan.slice(0, 50)}…")`);
  }
  s = L(s, { t: "PILIH", i: sesuai });
  cek(s.adegan === "akhir", `varian ${v}: keputusan sesuai data → akhir`);
  cek(JSON.stringify(s.jejak) === JSON.stringify(["mulai", "cara", "kumpul", "sajikan", "baca", "putuskan", "akhir"]), `varian ${v}: jejak adegan berurutan`);
  cek(/Hebat/.test(ceritaAdegan(s)), `varian ${v}: cerita akhir`);
  x = L(s, { t: "PILIH", i: 0 });
  cek(x.adegan === "akhir", `varian ${v}: di akhir pilihan tidak mengubah apa pun`);
  const baru = L(s, { t: "ULANG" });
  cek(baru.varian === v + 1 && baru.adegan === "mulai" && baru.dicatat.every((z) => !z), `varian ${v}: ULANG memulai varian berikutnya`);
  // peristiwa di adegan yang salah tidak berpengaruh
  const awal = awalSkenario(v);
  cek(L(awal, { t: "CATAT", i: 0 }).dicatat.every((z) => !z) && L(awal, { t: "ULANG" }).adegan === "mulai", `varian ${v}: peristiwa di adegan yang salah diabaikan`);
}

console.log("posisi jawaban benar per jenis soal:", JSON.stringify(posisiBenar));
cek(new Set(posisiBenar.cara).size > 1, "posisi pilihan cara benar berbeda antarvarian");
cek(new Set(posisiBenar.putus).size > 1, "posisi pilihan keputusan benar berbeda antarvarian");
console.log(gagal === 0 ? "\nSEMUA LULUS" : `\nGAGAL: ${gagal}`);

process.exit(gagal === 0 ? 0 : 1);
