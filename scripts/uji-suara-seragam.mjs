/**
 * Uji aturan pemilihan Suara Guru seragam (pilot Materi Kelas 1 Bab 1 Sub-Bab A).
 * Jalankan: node --no-warnings scripts/uji-suara-seragam.mjs
 * Daftar suara di bawah meniru perangkat nyata. Yang diuji: pemilihan pasti, gender mengikuti guru terpilih,
 * parameter tetap (id-ID, laju 0,85, nada lembut), dan pemecahan naskah panjang.
 */
import { SUARA_SERAGAM, adalahSuaraIndonesia, pecahKalimat, pilihSuaraSeragam } from "../src/lib/suara-guru-seragam.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const v = (name, lang, localService = true) => ({ name, lang, localService });

const PERANGKAT = {
  "Android Chrome (satu suara Google)": [v("Indonesian (Indonesia)", "id-ID"), v("English (United States)", "en-US")],
  "Android lama (kode in_ID)": [v("Indonesian", "in_ID"), v("English", "en_US")],
  "iPhone Safari (Damayanti)": [v("Damayanti", "id-ID"), v("Samantha", "en-US")],
  "Mac Safari (Damayanti)": [v("Damayanti", "id-ID"), v("Alex", "en-US")],
  "Windows Chrome (Google dan Andika)": [
    v("Microsoft Zira - English (United States)", "en-US"),
    v("Microsoft Andika - Indonesian (Indonesia)", "id-ID"),
    v("Google Bahasa Indonesia", "id-ID", false),
  ],
  "Windows Edge (Gadis, Ardi, Andika online dan lokal)": [
    v("Microsoft Ardi Online (Natural) - Indonesian (Indonesia)", "id-ID", false),
    v("Microsoft Andika - Indonesian (Indonesia)", "id-ID"),
    v("Microsoft Gadis Online (Natural) - Indonesian (Indonesia)", "id-ID", false),
  ],
  "Windows tanpa paket Indonesia": [v("Microsoft David - English (United States)", "en-US"), v("Microsoft Zira - English (United States)", "en-US")],
  "Hanya suara pria Indonesia": [v("Microsoft Andika - Indonesian (Indonesia)", "id-ID")],
};

// Parameter dasar sesuai permintaan: id-ID, laju 0,85, nada 1,1 untuk guru wanita.
cek(SUARA_SERAGAM.bahasa === "id-ID" && SUARA_SERAGAM.laju === 0.85 && SUARA_SERAGAM.nadaWanita === 1.1, "parameter dasar");

for (const [nama, daftar] of Object.entries(PERANGKAT)) {
  const wanita = pilihSuaraSeragam(daftar, "wanita");
  const pria = pilihSuaraSeragam(daftar, "pria");
  cek(wanita.laju === 0.85 && pria.laju === 0.85, `${nama}: laju 0,85 untuk keduanya`);
  const adaIndonesia = daftar.some(adalahSuaraIndonesia);
  if (!adaIndonesia) {
    cek(wanita.suara === null && pria.suara === null, `${nama}: tanpa suara Indonesia, tidak boleh memilih suara asing`);
    cek(/belum punya suara Bahasa Indonesia/.test(wanita.keterangan), `${nama}: keterangan memberi tahu cara memasang suara`);
    continue;
  }
  cek(wanita.suara !== null && adalahSuaraIndonesia(wanita.suara), `${nama}: wanita memakai suara Indonesia`);
  cek(pria.suara !== null && adalahSuaraIndonesia(pria.suara), `${nama}: pria memakai suara Indonesia`);

  // Urutan daftar perangkat tidak boleh mengubah hasil.
  for (const urut of [[...daftar].reverse(), [...daftar].sort((a, b) => b.name.localeCompare(a.name))]) {
    cek(pilihSuaraSeragam(urut, "wanita").suara?.name === wanita.suara?.name, `${nama}: wanita tetap sama walau urutan daftar berbeda`);
    cek(pilihSuaraSeragam(urut, "pria").suara?.name === pria.suara?.name, `${nama}: pria tetap sama walau urutan daftar berbeda`);
  }
}

// Perangkat dengan satu suara dasar: pria dan wanita memakai suara yang sama, dibedakan oleh nada.
for (const nama of ["Android Chrome (satu suara Google)", "Android lama (kode in_ID)", "iPhone Safari (Damayanti)", "Mac Safari (Damayanti)"]) {
  const w = pilihSuaraSeragam(PERANGKAT[nama], "wanita");
  const p = pilihSuaraSeragam(PERANGKAT[nama], "pria");
  cek(w.suara?.name === p.suara?.name, `${nama}: satu suara dasar untuk pria dan wanita`);
  cek(w.nada === 1.1, `${nama}: nada wanita 1,1`);
  cek(p.nada === SUARA_SERAGAM.nadaPriaTurun && p.nada < w.nada, `${nama}: nada pria diturunkan`);
}

// Windows Chrome: wanita memakai suara Google (bukan Andika yang suara pria), pria memakai Andika asli.
{
  const d = PERANGKAT["Windows Chrome (Google dan Andika)"];
  const w = pilihSuaraSeragam(d, "wanita");
  const p = pilihSuaraSeragam(d, "pria");
  cek(w.suara?.name === "Google Bahasa Indonesia" && w.nada === 1.1, "Windows Chrome: wanita memakai Google Bahasa Indonesia, nada 1,1");
  cek(p.suara?.name === "Microsoft Andika - Indonesian (Indonesia)" && p.nada === SUARA_SERAGAM.nadaPriaAsli, "Windows Chrome: pria memakai Andika asli");
}

// Windows Edge: suara wanita asli (Gadis) dan pria asli (Ardi atau Andika), bukan sebaliknya.
{
  const d = PERANGKAT["Windows Edge (Gadis, Ardi, Andika online dan lokal)"];
  const w = pilihSuaraSeragam(d, "wanita");
  const p = pilihSuaraSeragam(d, "pria");
  cek(/Gadis/.test(w.suara?.name ?? ""), "Edge: wanita memakai Gadis");
  cek(/Ardi|Andika/.test(p.suara?.name ?? ""), "Edge: pria memakai suara pria asli");
  cek(p.suara?.localService === true, "Edge: pria memilih suara lokal (bekerja tanpa sinyal) dibanding suara jaringan");
}

// Hanya suara pria di perangkat: pria asli, wanita memakai suara itu dengan nada dinaikkan.
{
  const d = PERANGKAT["Hanya suara pria Indonesia"];
  const w = pilihSuaraSeragam(d, "wanita");
  const p = pilihSuaraSeragam(d, "pria");
  cek(w.suara?.name === p.suara?.name && w.nada === SUARA_SERAGAM.nadaWanitaNaik && p.nada === SUARA_SERAGAM.nadaPriaAsli, "hanya suara pria: wanita dinaikkan, pria asli");
}

// Pemecahan naskah panjang.
{
  const panjang = "Malosi dan teman-temannya bermain di taman. Mereka sangat senang, dan bermain dengan aman. ".repeat(8);
  const potong = pecahKalimat(panjang, 170);
  cek(potong.length > 1 && potong.every((x) => x.length <= 170), "naskah panjang terpecah, tiap potongan 170 huruf atau kurang");
  cek(potong.join(" ").replace(/\s+/g, " ") === panjang.replace(/\s+/g, " ").trim(), "pemecahan tidak menghilangkan atau menambah kata");
  cek(pecahKalimat("Halo.").length === 1 && pecahKalimat("").length === 0, "naskah pendek dan kosong");
  const tanpaTitik = "kata ".repeat(80).trim();
  cek(pecahKalimat(tanpaTitik, 100).every((x) => x.length <= 100), "kalimat panjang tanpa tanda baca tetap dipecah");
  cek(pecahKalimat("Satu, dua, tiga? Empat! Lima.").join(" ") === "Satu, dua, tiga? Empat! Lima.", "kalimat pendek tidak dipecah");
}

console.log(`\nUji suara seragam: ${lulus} cek lulus, ${gagal} gagal.`);
process.exit(gagal === 0 ? 0 : 1);
