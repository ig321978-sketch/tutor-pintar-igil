// Uji logika Rapor Perkembangan (src/lib/rapor-perkembangan.ts): status bab, jejak SMISCPA, telemetri,
// diagnosis tanpa bocor soal, fase, lencana, dan panduan rumah.
// Jalankan: node --no-warnings scripts/uji-rapor-perkembangan.mjs
const C = await import("../src/lib/capaian.ts");
const R = await import("../src/lib/rapor-perkembangan.ts");

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

const BAB = "mtk-2-bab3";
const T = new Date("2026-11-16T10:00:00+07:00");
const jejak = (tahap, subSelesai = []) => ({ tahap, subSelesai, subAktif: "A", tab: "materi" });

/* Status bab */
sama(R.statusBab(undefined, undefined, false), "belum", "tanpa catatan: belum ditempuh");
sama(R.statusBab(undefined, jejak({ A: 3 }), false), "belajar", "jejak tahap saja: sedang dipelajari");
let g = C.catatUjian({}, BAB, 70, T, 600);
sama(R.statusBab(g[BAB], undefined, false), "mengulang", "Ujian belum 100: mengulang");
sama(R.statusBab(g[BAB], undefined, true), "lulus", "lulus menang");

/* Jejak SMISCPA */
const sub = R.jejakSmiscpa({ ...C.babKosong(), subBab: ["A"] }, jejak({ A: 2, B: 5 }), 3);
sama(sub.map((s) => [s.huruf, s.tahapTerbuka, s.selesai, s.simulasiDibuka]), [["A", 7, true, true], ["B", 5, false, true], ["C", 1, false, false]], "jejak per Sub-Bab");
sama(R.persenEksplorasi(sub), Math.round(((7 + 4 + 0) / 21) * 100), "persen eksplorasi");
sama(R.namaTahap(5), "Concrete", "tahap 5 = Concrete");

/* Telemetri */
g = C.catatUjian(g, BAB, 90, T, 400);
g = C.catatJawabanLatihan(g, BAB, "a", true, T, { level: "LOTS", detik: 20 });
g = C.catatJawabanLatihan(g, BAB, "b", false, T, { level: "HOTS", detik: 900 });
g = C.catatJawabanLatihan(g, BAB, "c", false, T, { level: "HOTS", detik: 30 });
const t = R.telemetriBab(g[BAB]);
sama([t.percobaanUjian, t.skorTerbaik, t.detikUjianPerSoal, t.detikLatihan, t.tren, t.latihanBenar], [2, 90, 50, 30, "naik", 1], "telemetri bab");
sama(t.kecepatan, "matang", "50 detik per soal: matang");
sama(R.kategoriKecepatan(5), "terburu", "5 detik per soal: terburu-buru");
sama(R.kategoriKecepatan(null), "belum", "tanpa stopwatch: belum tercatat");
sama(R.telemetriBab(undefined).riwayat, [], "bab kosong tanpa riwayat");

/* Diagnosis */
const d = R.diagnosisBab(g[BAB], sub, false);
sama(d.map((x) => [x.subBab, x.tahap]), [["B", 5], ["C", 1], [null, 7]], "diagnosis: Sub-Bab belum tuntas lalu level paling banyak salah");
cek(d.every((x) => !/soal nomor|kunci|jawaban benar/i.test(x.alasan)), "diagnosis tidak menyebut nomor soal atau kunci");
sama(R.diagnosisBab(g[BAB], sub, true), [], "bab lulus tanpa diagnosis");
const semuaSelesai = R.jejakSmiscpa({ ...C.babKosong(), subBab: ["A", "B"] }, undefined, 2);
sama(R.diagnosisBab(C.catatUjian({}, BAB, 80, T)[BAB], semuaSelesai, false).map((x) => x.tahap), [6, 7], "semua tahap tuntas tapi Ujian kurang: Pictorial dan Abstract");

/* Praktikum */
cek(!R.praktikumTerbuka("2026-11", "2026-11"), "nilai Praktikum tersembunyi di bulan yang sama");
cek(R.praktikumTerbuka("2026-11", "2026-12"), "nilai Praktikum terbuka bulan berikutnya");
sama(R.PARAMETER_PRAKTIKUM.reduce((n, p) => n + p.bobot, 0), 100, "bobot parameter Praktikum 100%");

/* Fase dan lencana */
sama([1, 2, 3, 4, 5, 6].map(R.faseKelas).join(""), "AABBCC", "fase per kelas");
sama(R.kelasDariTeks("Kelas 4 SD"), 4, "kelas dari teks");
sama(R.kelasDariTeks("Siswa"), null, "teks tanpa kelas");
sama(R.lencanaSiswa({ babLulus: 0, babKelas: 8, lulusPertama: 0, percobaanTotal: 0, adaAktivitas: false }), [], "tanpa aktivitas tanpa lencana");
sama(R.lencanaSiswa({ babLulus: 1, babKelas: 8, lulusPertama: 1, percobaanTotal: 3, adaAktivitas: true }).map((l) => l.kode), ["kapten-sebaya", "penjelajah-tekun"], "dua lencana");
sama(R.lencanaSiswa({ babLulus: 4, babKelas: 8, lulusPertama: 0, percobaanTotal: 6, adaAktivitas: true })[0].kode, "kapten-sebaya", "separuh bab tuntas: Kapten Sebaya");

/* Panduan rumah */
const bab = (n, status, saran = []) => ({ bab: { kode: `mtk-2-bab${n}`, nomor: n, judul: `Judul ${n}` }, status, saran });
cek(R.panduanRumah([bab(1, "lulus"), bab(2, "mengulang", [{ subBab: "B", tahap: 6, alasan: "" }])], 2).includes("Bab 2 (Judul 2) mulai dari kartu Pictorial di Sub-Bab B"), "panduan: mengulang menunjuk kartu");
cek(R.panduanRumah([bab(1, "lulus"), bab(2, "belum")], 2).startsWith("Tantang Ananda membuka Bab 2"), "panduan: tantang bab berikutnya");
cek(R.panduanRumah([bab(1, "lulus")], 2).includes("Kelas 3"), "panduan: semua tuntas ke kelas berikut");
for (const k of [[bab(1, "belum")], [bab(1, "belajar")], []]) cek(!R.panduanRumah(k, 1).includes("\n") && R.panduanRumah(k, 1).length < 220, "panduan satu kalimat pendek");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
if (gagal > 0) process.exit(1);
