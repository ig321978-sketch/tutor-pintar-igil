/**
 * Uji aturan pemilihan Suara Guru seragam (pilot Materi Kelas 1 Bab 1 Sub-Bab A).
 * Jalankan: node --no-warnings scripts/uji-suara-seragam.mjs
 * Daftar suara di bawah meniru perangkat nyata. Yang diuji: pemilihan pasti, gender mengikuti guru terpilih,
 * parameter tetap (id-ID, laju 0,75, nada lembut), suara neural lebih dulu dengan cadangan lokal, jeda 2 detik antar paragraf, dan pemecahan naskah panjang.
 */
import { readFileSync } from "node:fs";
import { ejaanInggrisUntukSuaraId } from "../src/lib/ejaan-inggris-id.ts";
import { SUARA_SERAGAM, adalahSuaraIndonesia, pecahKalimat, pecahParagraf, pilihSuaraSeragam, potongBerjeda } from "../src/lib/suara-guru-seragam.ts";

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
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

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

// Parameter dasar: id-ID, laju 0,75 (diperlambat dari 0,85), nada 1,1 untuk guru wanita, jeda 2 detik antar paragraf.
cek(SUARA_SERAGAM.bahasa === "id-ID" && SUARA_SERAGAM.laju === 0.75 && SUARA_SERAGAM.nadaWanita === 1.1 && SUARA_SERAGAM.jedaAntarParagrafMs === 2000, "parameter dasar");

for (const [nama, daftar] of Object.entries(PERANGKAT)) {
  const wanita = pilihSuaraSeragam(daftar, "wanita");
  const pria = pilihSuaraSeragam(daftar, "pria");
  cek(wanita.laju === 0.75 && pria.laju === 0.75, `${nama}: laju 0,75 untuk keduanya`);
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
  cek(/Ardi/.test(p.suara?.name ?? ""), "Edge: pria memakai Ardi Online (Natural), bukan Andika yang lebih robotik");
  cek(/Natural/.test(w.suara?.name ?? "") && /Natural/.test(p.suara?.name ?? ""), "Edge: kedua guru memakai suara neural (Natural)");
  cek(/Andika/.test(p.cadangan?.name ?? "") && p.cadangan?.localService === true, "Edge: cadangan pria adalah suara lokal (Andika) untuk jalan tanpa sinyal");
  cek(w.cadangan === null, "Edge: wanita tidak punya suara lokal cadangan (hanya Gadis online)");
}

// Suara neural mengalahkan suara lokal biasa, suara Google mengalahkan suara lokal lama, dan tanpa itu suara lokal didahulukan.
{
  const acak = (d) => [d, [...d].reverse()];
  for (const d of acak([v("Microsoft Gadis Online (Natural) - Indonesian (Indonesia)", "id-ID", false), v("Damayanti", "id-ID", true)])) cek(pilihSuaraSeragam(d, "wanita").suara?.name.includes("Natural"), "neural online mengalahkan suara lokal");
  for (const d of acak([v("Damayanti (Premium)", "id-ID", true), v("Damayanti", "id-ID", true)])) cek(pilihSuaraSeragam(d, "wanita").suara?.name === "Damayanti (Premium)", "Apple Premium mengalahkan versi biasa");
  for (const d of acak([v("Indonesian Lokal A", "id-ID", true), v("Indonesian Lokal B", "id-ID", false)])) cek(pilihSuaraSeragam(d, "wanita").suara?.name === "Indonesian Lokal A", "tanpa suara neural, suara lokal didahulukan (bekerja tanpa sinyal)");
  cek(pilihSuaraSeragam([v("Indonesian (Indonesia)", "id-ID")], "wanita").cadangan === null, "satu suara saja: tidak ada cadangan");
  cek(pilihSuaraSeragam([], "wanita").cadangan === null, "tanpa suara Indonesia: tidak ada cadangan");
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

// Jeda 2 detik antar paragraf: paragraf dipisah pindah baris; jeda hanya sebelum potongan pertama tiap paragraf kedua dan seterusnya.
{
  sama(pecahParagraf("Satu.\n\n  Dua   tiga.\r\nEmpat.\n"), ["Satu.", "Dua tiga.", "Empat."], "paragraf dipisah baris kosong dan pindah baris");
  sama(pecahParagraf("  \n \n"), [], "naskah hanya spasi: tanpa paragraf");
  const p = potongBerjeda("Halo anak-anak. Ayo belajar.\nIni paragraf kedua.\nIni paragraf ketiga.");
  sama(p.map((x) => x.jedaSebelumMs), [0, 2000, 2000], "jeda 2 detik sebelum paragraf kedua dan ketiga saja");
  sama(p.map((x) => x.teks), ["Halo anak-anak. Ayo belajar.", "Ini paragraf kedua.", "Ini paragraf ketiga."], "isi potongan tetap");
  const panjang = potongBerjeda(`${"Kalimat pendek satu. ".repeat(20).trim()}\nParagraf dua.`, 2000, 60);
  cek(panjang.length > 2 && panjang.filter((x) => x.jedaSebelumMs > 0).length === 1 && panjang.at(-1).teks === "Paragraf dua." && panjang.at(-1).jedaSebelumMs === 2000, "paragraf panjang dipecah per kalimat, jeda hanya di awal paragraf berikutnya");
  cek(potongBerjeda("Satu kalimat tanpa baris baru.").every((x) => x.jedaSebelumMs === 0), "satu paragraf: tanpa jeda");
  cek(potongBerjeda("").length === 0, "naskah kosong: tanpa potongan");
  sama(potongBerjeda("A.\nB.", 500).map((x) => x.jedaSebelumMs), [0, 500], "jeda bisa diatur");
}

// Terpasang di jalur yang dipakai Story Kelas 1: laju lebih pelan dari 0,70 (Kelas 4 sampai 6), jeda 2 detik, suara neural lebih dulu.
{
  const baca = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
  cek(SUARA_SERAGAM.lajuCeritaKelas1 === 0.6 && SUARA_SERAGAM.lajuCeritaKelas1 < 0.7, "laju Story Kelas 1: 0,60 (lebih pelan dari 0,70)");
  const player = baca("src/components/IgilModulePlayer.tsx");
  cek(/SUARA_SERAGAM\.lajuCeritaKelas1/.test(player) && /bab\.startsWith\("mtk-1-"\)/.test(player) && /jedaAntarParagrafMs: suaraGayaK46 && suaraKelas1/.test(player), "pemutar: Kelas 1 memakai laju 0,60 dan jeda 2 detik; kelas lain tidak berubah");
  const guru = baca("src/lib/guru.ts");
  cek(/pilihSuaraSeragam\(window\.speechSynthesis\.getVoices\(\), kelamin\)/.test(guru) && /cadangan \? hasil\.cadangan : hasil\.suara/.test(guru), "guru.ts: suara perangkat dipilih dengan aturan neural lebih dulu dan cadangan lokal");
  const modul = baca("src/lib/suara-guru-modul.ts");
  cek(/antrePotongan\(/.test(modul) && !/antreKalimatId/.test(modul), "suara-guru-modul: semua jalur suara perangkat memakai antrean berjeda dengan cadangan");
  cek(/jedaAntarParagrafMs\?: number/.test(modul), "suara-guru-modul: opsi jedaAntarParagrafMs tersedia");
  const video = baca("src/components/modul/video-k1b1a.tsx");
  cek(/jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(video), "video Story Kelas 1 Bab 1 Sub-Bab A: jeda 2 detik antar paragraf layar");
}

// Kata Inggris dibaca dengan logat Indonesia: dieja ulang dengan huruf Indonesia supaya suara id-ID tidak membacanya mentah.
{
  const e = (t) => ejaanInggrisUntukSuaraId(t);
  cek(e("One-to-One") === "wan tu wan", "One-to-One dieja wan tu wan");
  cek(e("Cardinality") === "kar di na li ti", "Cardinality dieja kar di na li ti");
  cek(e("Subitizing") === "su bi tai zing", "Subitizing dieja su bi tai zing");
  cek(e("Mind-Map") === "main map", "Mind-Map dieja main map");
  cek(e("Metode One-to-One, atau Korespondensi Satu-satu.") === "Metode wan tu wan, atau Korespondensi Satu-satu.", "kata Indonesia tetap utuh di sekitar istilah Inggris");
  cek(e("Kita lihat tiga metode global.") === "Kita lihat tiga metode global.", "kalimat Indonesia murni tidak diubah");
}

console.log(`\nUji suara seragam: ${lulus} cek lulus, ${gagal} gagal.`);
process.exit(gagal === 0 ? 0 : 1);
