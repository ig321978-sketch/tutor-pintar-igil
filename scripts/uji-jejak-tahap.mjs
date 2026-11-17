// Uji posisi tahap bab: tidak mundur, gabungan akun, dan tempat kembali.
// Jalankan: node --no-warnings scripts/uji-jejak-tahap.mjs
import { jejakKosong, bukaTahap, selesaiSub, gabungJejak, tempatKembali, uraiJejak, jejakMasihAwal, catatTab } from "../src/lib/jejak-tahap.ts";

let lulus = 0;
let gagal = 0;
const cek = (ok, pesan) => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

const URUT = ["A", "B", "C", "D"];
let j = jejakKosong();
cek(jejakMasihAwal(j), "awal masih di silabus");

j = bukaTahap(j, "A", 2);
cek(j.tahap.A === 2 && j.tab === "materi", "membuka Mind-map menaikkan tahap A");
j = bukaTahap(j, "A", 1);
cek(j.tahap.A === 2, "tahap tidak mundur");

j = selesaiSub(j, "A", URUT);
cek(j.subSelesai.includes("A") && j.subAktif === "B" && j.tahap.A === 7 && j.tab === "materi", "selesai A pindah ke B");

const mundur = bukaTahap(j, "A", 3);
cek(mundur.tahap.A === 7, "sub yang sudah selesai tetap di tahap 7");

j = bukaTahap(j, "B", 4);
const tempat = tempatKembali(j, URUT);
sama(tempat, { sub: "B", tahap: 4, tab: "materi" }, "kembali ke tahap B yang belum selesai");

const usang = jejakKosong();
const gabung = gabungJejak(bukaTahap(usang, "A", 2), j);
cek(gabung.tahap.B === 4 && gabung.tahap.A === 7 && gabung.subSelesai.includes("A"), "gabungan mengambil yang lebih jauh");
sama(tempatKembali(gabungJejak(bukaTahap(jejakKosong(), "A", 2), j), URUT), { sub: "B", tahap: 4, tab: "materi" }, "perangkat yang lebih awal tidak menarik siswa ke belakang");

const rusak = uraiJejak({ tahap: { A: 99, Z: "x", nope: 3 }, subSelesai: ["B", "bb", 1], tab: "hack", subAktif: "QQ" });
cek(rusak.tahap.A === 7 && rusak.tahap.Z === 1 && rusak.subSelesai.includes("B") && rusak.tab === "silabus" && rusak.subAktif === "A", "data rusak diamankan");
cek(rusak.tahap.B === 7, "sub selesai membuka seluruh tahap");

const tuntas = URUT.reduce((acc, h) => selesaiSub(acc, h, URUT, "simulasi"), jejakKosong());
sama(tempatKembali(tuntas, URUT).tab, "simulasi", "bab tuntas kembali ke tab akhir");
cek(tempatKembali(catatTab(j, "ujian", "B"), URUT).tab === "materi", "ujian belum dibuka selama materi belum tuntas");

console.log(gagal === 0 ? `JEJAK_OK ${lulus}` : `JEJAK_GAGAL ${gagal}/${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
