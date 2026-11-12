// Uji mesin skenario umum: Kelas 1 (Bab 1, 2, 3, 4, 6, 7), Kelas 2, Kelas 3 Bab 1 sampai 5, dan Kelas 4 Bab 1.
// Jalankan: node --no-warnings scripts/uji-skenario-umum.mjs
import { awalSk, adeganSk, langkahSk, opsiHitung, semuaKetuk, ceritaSk } from "../src/components/modul/skenario-umum.ts";
import { SKENARIO_BAB1, SKENARIO_BAB2, SKENARIO_BAB3, SKENARIO_BAB4, SKENARIO_BAB6, SKENARIO_BAB7 } from "../src/components/modul/skenario-kelas1.ts";
import { SKENARIO_K2B1 } from "../src/components/modul/skenario-k2b1.ts";
import { SKENARIO_K2B2 } from "../src/components/modul/skenario-k2b2.ts";
import { SKENARIO_K2B3 } from "../src/components/modul/skenario-k2b3.ts";
import { SKENARIO_K2B4A, SKENARIO_K2B4B } from "../src/components/modul/skenario-k2b4.ts";
import { SKENARIO_K2B5A, SKENARIO_K2B5B, SKENARIO_K2B5C } from "../src/components/modul/skenario-k2b5.ts";
import { SKENARIO_K2B6B } from "../src/components/modul/skenario-k2b6.ts";
import { SKENARIO_K2B7B } from "../src/components/modul/skenario-k2b7.ts";
import { SKENARIO_K2B8B } from "../src/components/modul/skenario-k2b8.ts";
import { SKENARIO_K3B1A, SKENARIO_K3B1B, SKENARIO_K3B1C, SKENARIO_K3B1D, SKENARIO_K3B1E, SKENARIO_K3B1F, SKENARIO_K3B1G } from "../src/components/modul/skenario-k3b1.ts";
import { SKENARIO_K3B2A, SKENARIO_K3B2B } from "../src/components/modul/skenario-k3b2.ts";
import { SKENARIO_K3B3A, SKENARIO_K3B3B, SKENARIO_K3B3C, SKENARIO_K3B3D } from "../src/components/modul/skenario-k3b3.ts";
import { SKENARIO_K3B4A, SKENARIO_K3B4B, SKENARIO_K3B4C } from "../src/components/modul/skenario-k3b4.ts";
import { SKENARIO_K3B5A, SKENARIO_K3B5B } from "../src/components/modul/skenario-k3b5.ts";
import { SKENARIO_K4B1A, SKENARIO_K4B1B, SKENARIO_K4B1C, SKENARIO_K4B1D } from "../src/components/modul/skenario-k4b1-bilangan.ts";
import { SKENARIO_K4B1E, SKENARIO_K4B1F } from "../src/components/modul/skenario-k4b1-hitung.ts";
import { SKENARIO_K4B1G, SKENARIO_K4B1H, SKENARIO_K4B1I } from "../src/components/modul/skenario-k4b1-bagi.ts";
import { SKENARIO_K4B2A, SKENARIO_K4B2B, SKENARIO_K4B2C } from "../src/components/modul/skenario-k4b2-biasa.ts";
import { SKENARIO_K4B2D, SKENARIO_K4B2E } from "../src/components/modul/skenario-k4b2-desimal.ts";
import { SKENARIO_K4B3A, SKENARIO_K4B3B } from "../src/components/modul/skenario-k4b3.ts";
import { SKENARIO_K4B4A, SKENARIO_K4B4B } from "../src/components/modul/skenario-k4b4.ts";
import { SKENARIO_K4B5A, SKENARIO_K4B5B } from "../src/components/modul/skenario-k4b5.ts";
import { SKENARIO_K4B6A, SKENARIO_K4B6B } from "../src/components/modul/skenario-k4b6.ts";
import { SKENARIO_K5B1A, SKENARIO_K5B1B } from "../src/components/modul/skenario-k5b1.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};

const SEMUA = [
  ["Bab 1", SKENARIO_BAB1, 10],
  ["Bab 2", SKENARIO_BAB2, 10],
  ["Bab 3", SKENARIO_BAB3, 10],
  ["Bab 4", SKENARIO_BAB4, 10],
  ["Bab 6", SKENARIO_BAB6, 20],
  ["Bab 7", SKENARIO_BAB7, 20],
  ["K2 Bab 1", SKENARIO_K2B1, 50],
  ["K2 Bab 2", SKENARIO_K2B2, 20],
  ["K2 Bab 3", SKENARIO_K2B3, 20],
  ["K2 Bab 4A", SKENARIO_K2B4A, 20],
  ["K2 Bab 4B", SKENARIO_K2B4B, 20],
  ["K2 Bab 5A", SKENARIO_K2B5A, 20],
  ["K2 Bab 5B", SKENARIO_K2B5B, 20],
  ["K2 Bab 5C", SKENARIO_K2B5C, 20],
  ["K2 Bab 6B", SKENARIO_K2B6B, 20],
  ["K2 Bab 7B", SKENARIO_K2B7B, 100],
  ["K2 Bab 8B", SKENARIO_K2B8B, 20],
  ["K3 Bab 1A", SKENARIO_K3B1A, 1000],
  ["K3 Bab 1B", SKENARIO_K3B1B, 1000],
  ["K3 Bab 1C", SKENARIO_K3B1C, 1000],
  ["K3 Bab 1D", SKENARIO_K3B1D, 100],
  ["K3 Bab 1E", SKENARIO_K3B1E, 100],
  ["K3 Bab 1F", SKENARIO_K3B1F, 100],
  ["K3 Bab 1G", SKENARIO_K3B1G, 1000],
  ["K3 Bab 2A", SKENARIO_K3B2A, 100],
  ["K3 Bab 2B", SKENARIO_K3B2B, 100],
  ["K3 Bab 3A", SKENARIO_K3B3A, 300],
  ["K3 Bab 3B", SKENARIO_K3B3B, 10000],
  ["K3 Bab 3C", SKENARIO_K3B3C, 5000],
  ["K3 Bab 3D", SKENARIO_K3B3D, 10000],
  ["K3 Bab 4A", SKENARIO_K3B4A, 150],
  ["K3 Bab 4B", SKENARIO_K3B4B, 360],
  ["K3 Bab 4C", SKENARIO_K3B4C, 100],
  ["K3 Bab 5A", SKENARIO_K3B5A, 25],
  ["K3 Bab 5B", SKENARIO_K3B5B, 20],
  ["K4 Bab 1A", SKENARIO_K4B1A, 10000],
  ["K4 Bab 1B", SKENARIO_K4B1B, 10000],
  ["K4 Bab 1C", SKENARIO_K4B1C, 10000],
  ["K4 Bab 1D", SKENARIO_K4B1D, 10000],
  ["K4 Bab 1E", SKENARIO_K4B1E, 1000],
  ["K4 Bab 1F", SKENARIO_K4B1F, 1000],
  ["K4 Bab 1G", SKENARIO_K4B1G, 1000],
  ["K4 Bab 1H", SKENARIO_K4B1H, 1000],
  ["K4 Bab 1I", SKENARIO_K4B1I, 10000],
  ["K4 Bab 2A", SKENARIO_K4B2A, 12],
  ["K4 Bab 2B", SKENARIO_K4B2B, 12],
  ["K4 Bab 2C", SKENARIO_K4B2C, 24],
  ["K4 Bab 2D", SKENARIO_K4B2D, 100],
  ["K4 Bab 2E", SKENARIO_K4B2E, 300],
  ["K4 Bab 3A", SKENARIO_K4B3A, 20],
  ["K4 Bab 3B", SKENARIO_K4B3B, 60],
  ["K4 Bab 4A", SKENARIO_K4B4A, 20],
  ["K4 Bab 4B", SKENARIO_K4B4B, 100],
  ["K4 Bab 5A", SKENARIO_K4B5A, 20],
  ["K4 Bab 5B", SKENARIO_K4B5B, 20],
  ["K4 Bab 6A", SKENARIO_K4B6A, 50],
  ["K4 Bab 6B", SKENARIO_K4B6B, 50],
  ["K5 Bab 1A", SKENARIO_K5B1A, 100000],
  ["K5 Bab 1B", SKENARIO_K5B1B, 100000],
];

const OBJEK_SAH = new Set(["pesawat", "mobil", "boneka", "bola", "gasing", "bola-merah", "bola-kuning", "bola-hijau", "bola-biru", "kelereng-merah", "kelereng-kuning", "kelereng-hijau", "kelereng-biru", "jagung", "wortel", "brokoli", "kol", "jeruk", "apel", "mangga", "belimbing", "ayam", "bebek", "kelinci", "karet", "stik"]);

// Hitung satu operasi: tambah, kurang (U+2212), kali (×), dan bagi (:, harus habis dibagi).
function operasi(a, op, b) {
  if (op === "+") return a + b;
  if (op === "×") return a * b;
  if (op === ":") return a % b === 0 ? a / b : NaN;
  return a - b;
}

// Satu pilihan benar atau satu jawaban di setiap adegan; tanda minus pakai "−".
function hitungTeks(teks) {
  const m = teks.match(/^(\d+) ([+−×:]) (\d+) = …$/);
  if (!m) return null;
  return operasi(Number(m[1]), m[2], Number(m[3]));
}

const idGlobal = new Set();
const posisiBenarPerSkenario = [];

for (const [nama, def, batas] of SEMUA) {
  cek(!idGlobal.has(def.id), `${nama}: id skenario unik`);
  idGlobal.add(def.id);
  cek(def.adegan[0].jenis === "narasi", `${nama}: adegan pertama narasi`);
  cek(def.adegan[def.adegan.length - 1].jenis === "akhir", `${nama}: adegan terakhir akhir`);
  cek(def.adegan.filter((a) => a.jenis === "akhir").length === 1, `${nama}: tepat satu akhir`);
  cek(new Set(def.adegan.map((a) => a.id)).size === def.adegan.length, `${nama}: id adegan unik`);
  cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${nama}: 5 sampai 8 adegan (ada ${def.adegan.length})`);
  const jenisPakai = new Set(def.adegan.map((a) => a.jenis));
  cek(jenisPakai.size >= 4, `${nama}: minimal 4 jenis adegan berbeda (ada ${jenisPakai.size})`);

  const posisi = [];
  for (const a of def.adegan) {
    cek(a.cerita.trim().length > 10, `${nama}/${a.id}: cerita tidak kosong`);
    cek(!/[A-Z]{2}.*\bAPI\b/.test(a.cerita), `${nama}/${a.id}: tidak menyebut hal teknis`);
    if (a.jenis === "pilih") {
      cek(a.opsi.length >= 2 && a.opsi.length <= 4, `${nama}/${a.id}: 2 sampai 4 pilihan`);
      cek(a.opsi.filter((o) => o.benar).length === 1, `${nama}/${a.id}: tepat satu pilihan benar`);
      cek(new Set(a.opsi.map((o) => o.teks)).size === a.opsi.length, `${nama}/${a.id}: teks pilihan unik`);
      cek(a.opsi.every((o) => o.umpan.length > 8), `${nama}/${a.id}: setiap pilihan punya akibat`);
      posisi.push(a.opsi.findIndex((o) => o.benar));
      const b = a.opsi.find((o) => o.benar);
      const eq = b.teks.match(/(\d+) ([+−×:]) (\d+) = (\d+)/);
      if (eq) {
        const hasil = operasi(Number(eq[1]), eq[2], Number(eq[3]));
        cek(hasil === Number(eq[4]), `${nama}/${a.id}: kalimat benar ${eq[0]} ternyata salah hitung`);
      }
    }
    if (a.jenis === "soal") {
      cek(a.soal.length >= 1 && a.soal.length <= 4, `${nama}/${a.id}: 1 sampai 4 pertanyaan`);
      for (const q of a.soal) {
        cek(q.opsi.includes(q.jawaban), `${nama}/${a.id}: jawaban "${q.jawaban}" ada di pilihan (${q.teks})`);
        cek(new Set(q.opsi).size === q.opsi.length, `${nama}/${a.id}: pilihan jawaban unik (${q.teks})`);
        cek(q.opsi.length === 3, `${nama}/${a.id}: tiga pilihan (${q.teks})`);
        const h = hitungTeks(q.teks);
        if (h !== null) cek(String(h) === q.jawaban, `${nama}/${a.id}: ${q.teks} kuncinya ${q.jawaban}, hitungan ${h}`);
        if (/^\d+$/.test(q.jawaban)) cek(Number(q.jawaban) <= batas, `${nama}/${a.id}: jawaban ${q.jawaban} melebihi batas ${batas}`);
        posisi.push(q.opsi.indexOf(q.jawaban));
      }
    }
    if (a.jenis === "hitung") {
      cek(a.jumlah >= 2 && a.jumlah <= batas, `${nama}/${a.id}: jumlah ${a.jumlah} dalam batas`);
      cek(OBJEK_SAH.has(a.objek), `${nama}/${a.id}: objek ${a.objek} dikenal`);
      const o = opsiHitung(a);
      cek(o.includes(String(a.jumlah)) && new Set(o).size === o.length, `${nama}/${a.id}: opsi hitung memuat jawaban dan unik`);
    }
    if (a.jenis === "isi") {
      cek(a.target >= 1 && a.target <= a.maks && a.maks <= 20, `${nama}/${a.id}: target ${a.target} <= maks ${a.maks}`);
      cek(a.target <= batas, `${nama}/${a.id}: target ${a.target} dalam batas ${batas}`);
      cek(OBJEK_SAH.has(a.objek), `${nama}/${a.id}: objek ${a.objek} dikenal`);
    }
  }
  posisiBenarPerSkenario.push([nama, posisi.join("")]);
  cek(new Set(posisi).size >= 2, `${nama}: letak jawaban benar bervariasi (${posisi.join("")})`);

  // Main sampai akhir lewat jalur benar.
  let s = awalSk(def);
  let langkah = 0;
  while (adeganSk(def, s).jenis !== "akhir" && langkah < 200) {
    langkah += 1;
    const a = adeganSk(def, s);
    const i0 = s.i;
    if (a.jenis === "narasi") s = langkahSk(def, s, { t: "LANJUT" });
    if (a.jenis === "pilih") {
      // salah dulu: tetap di adegan, ulang bertambah, ada umpan
      const salah = a.opsi.findIndex((o) => !o.benar);
      const sebelum = s.ulang;
      const t = langkahSk(def, s, { t: "PILIH", i: salah });
      cek(t.i === i0 && t.ulang === sebelum + 1 && t.umpan === a.opsi[salah].umpan && !t.umpanBaik, `${nama}/${a.id}: salah pilih tetap di adegan`);
      s = langkahSk(def, t, { t: "PILIH", i: a.opsi.findIndex((o) => o.benar) });
      cek(s.i === i0 + 1 && s.umpanBaik, `${nama}/${a.id}: pilihan benar membuka adegan berikut`);
    }
    if (a.jenis === "soal") {
      for (let k = 0; k < a.soal.length; k += 1) {
        const q = a.soal[k];
        const salahJawab = q.opsi.find((x) => x !== q.jawaban);
        const t = langkahSk(def, s, { t: "JAWAB", nilai: salahJawab });
        cek(t.i === i0 && t.soalKe === k && !t.umpanBaik, `${nama}/${a.id}: jawaban salah tidak maju (pertanyaan ${k + 1})`);
        s = langkahSk(def, t, { t: "JAWAB", nilai: q.jawaban });
      }
      cek(s.i === i0 + 1, `${nama}/${a.id}: semua soal benar membuka adegan berikut`);
    }
    if (a.jenis === "hitung") {
      const dini = langkahSk(def, s, { t: "JAWAB", nilai: String(a.jumlah) });
      cek(dini.i === i0 && !dini.umpanBaik, `${nama}/${a.id}: menjawab sebelum menghitung ditolak`);
      for (let k = 0; k < a.jumlah; k += 1) s = langkahSk(def, s, { t: "KETUK", i: k });
      cek(semuaKetuk(s), `${nama}/${a.id}: semua benda terhitung`);
      const salah = String(a.jumlah + 1);
      const t = langkahSk(def, s, { t: "JAWAB", nilai: salah });
      cek(t.i === i0 && !t.umpanBaik, `${nama}/${a.id}: jawaban hitung salah tidak maju`);
      s = langkahSk(def, t, { t: "JAWAB", nilai: String(a.jumlah) });
      cek(s.i === i0 + 1, `${nama}/${a.id}: jawaban hitung benar maju`);
    }
    if (a.jenis === "isi") {
      const kosong = langkahSk(def, s, { t: "PERIKSA" });
      cek(kosong.i === i0 && !kosong.umpanBaik && kosong.umpan.length > 5, `${nama}/${a.id}: periksa saat kosong tidak maju`);
      let t = s;
      for (let k = 0; k < a.maks + 3; k += 1) t = langkahSk(def, t, { t: "UBAH", delta: 1 });
      cek(t.isi === a.maks, `${nama}/${a.id}: isi dibatasi maks ${a.maks}`);
      if (a.target < a.maks) {
        const lebih = langkahSk(def, t, { t: "PERIKSA" });
        cek(lebih.i === i0 && !lebih.umpanBaik, `${nama}/${a.id}: terlalu banyak tidak maju`);
      }
      let b = langkahSk(def, t, { t: "UBAH", delta: -100 });
      cek(b.isi === 0, `${nama}/${a.id}: isi tidak di bawah nol`);
      for (let k = 0; k < a.target; k += 1) b = langkahSk(def, b, { t: "UBAH", delta: 1 });
      s = langkahSk(def, b, { t: "PERIKSA" });
      cek(s.i === i0 + 1, `${nama}/${a.id}: isi sesuai target maju`);
    }
    cek(ceritaSk(def, s).length > 5, `${nama}: ucapan tokoh tersedia`);
    cek(s.i > i0, `${nama}: langkah selalu menuju akhir (adegan ${a.id})`);
  }
  cek(adeganSk(def, s).jenis === "akhir", `${nama}: dapat diselesaikan sampai akhir`);
  const ulang = langkahSk(def, s, { t: "ULANG" });
  cek(ulang.i === 0 && ulang.ulang === 0, `${nama}: Main lagi kembali ke awal`);
}

console.log("Letak jawaban benar per skenario:", posisiBenarPerSkenario.map(([n, p]) => `${n}=${p}`).join(" "));
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
