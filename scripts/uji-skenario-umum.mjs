// Uji mesin skenario umum: Kelas 1 (Bab 1, 2, 3, 4, 6, 7) dan Kelas 2 Bab 1.
// Jalankan: node --no-warnings scripts/uji-skenario-umum.mjs
import { awalSk, adeganSk, langkahSk, opsiHitung, semuaKetuk, ceritaSk } from "../src/components/modul/skenario-umum.ts";
import { SKENARIO_BAB1, SKENARIO_BAB2, SKENARIO_BAB3, SKENARIO_BAB4, SKENARIO_BAB6, SKENARIO_BAB7 } from "../src/components/modul/skenario-kelas1.ts";
import { SKENARIO_K2B1 } from "../src/components/modul/skenario-k2b1.ts";
import { SKENARIO_K2B2 } from "../src/components/modul/skenario-k2b2.ts";
import { SKENARIO_K2B3 } from "../src/components/modul/skenario-k2b3.ts";
import { SKENARIO_K2B4A, SKENARIO_K2B4B } from "../src/components/modul/skenario-k2b4.ts";

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
];

const OBJEK_SAH = new Set(["pesawat", "mobil", "boneka", "bola", "gasing", "bola-merah", "bola-kuning", "bola-hijau", "bola-biru", "kelereng-merah", "kelereng-kuning", "kelereng-hijau", "kelereng-biru", "jagung", "wortel", "brokoli", "kol", "jeruk", "apel", "mangga", "belimbing", "ayam", "bebek", "kelinci", "karet", "stik"]);

// Satu pilihan benar atau satu jawaban di setiap adegan; tanda minus pakai "−".
function hitungTeks(teks) {
  const m = teks.match(/^(\d+) ([+−]) (\d+) = …$/);
  if (!m) return null;
  return m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
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
      const eq = b.teks.match(/(\d+) ([+−]) (\d+) = (\d+)/);
      if (eq) {
        const hasil = eq[2] === "+" ? Number(eq[1]) + Number(eq[3]) : Number(eq[1]) - Number(eq[3]);
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
