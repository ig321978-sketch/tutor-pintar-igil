// Uji capaian belajar di perangkat (src/lib/capaian.ts): pencatatan Sub-Bab, Latihan, Ujian; ringkasan; poin bulanan dan reset;
// Papan Kualifikasi; data rusak; dan aturan platform (tanpa rupiah, tanpa kamera, tanpa jaringan) pada berkas yang menyentuhnya.
// Jalankan: node --no-warnings scripts/uji-capaian.mjs
import { readFileSync } from "node:fs";

const C = await import("../src/lib/capaian.ts");

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

const BAB = "mtk-1-bab1";
const T = (s) => new Date(s);
const NOV = T("2026-11-16T10:00:00+07:00");
const DES = T("2026-12-02T10:00:00+07:00");

/* ------------------------------ Bulan Jakarta ------------------------------ */
sama(C.bulanJakarta(T("2026-11-30T20:00:00Z")), "2026-12", "30 November 20.00 UTC sudah Desember di Jakarta");
sama(C.bulanJakarta(T("2026-11-30T16:59:00Z")), "2026-11", "30 November 23.59 WIB masih November");
sama(C.bulanJakarta(NOV), "2026-11", "bulan 16 November");

/* ------------------------------ Sub-Bab ------------------------------ */
let g = {};
g = C.catatSubBab(g, BAB, "B", NOV);
g = C.catatSubBab(g, BAB, "A", NOV);
sama(g[BAB].subBab, ["A", "B"], "Sub-Bab terurut dan tanpa kembar");
const g2 = C.catatSubBab(g, BAB, "A", DES);
cek(g2 === g, "Sub-Bab yang sama dicatat dua kali tidak mengubah apa pun");
cek(g[BAB].diperbarui === NOV.toISOString(), "penanda waktu terakhir diperbarui");

/* ------------------------------ Latihan ------------------------------ */
let l = {};
for (let i = 1; i <= 9; i += 1) l = C.catatJawabanLatihan(l, BAB, String(i), i % 3 !== 0, NOV);
sama([l[BAB].latihan.length, l[BAB].poin.latihan], [9, undefined], "sembilan soal terjawab: poin Latihan belum terbit");
sama(C.ringkasBab(l[BAB], 4).skorLatihan, null, "skor Latihan belum ada sebelum sepuluh soal");
const l10 = C.catatJawabanLatihan(l, BAB, "10", true, NOV);
sama(l10[BAB].poin.latihan, "2026-11", "soal ke-10: poin Latihan terbit bulan ini");
// 3 salah (3, 6, 9) dari 10 -> 7 benar -> 70
sama(C.ringkasBab(l10[BAB], 4).skorLatihan, 70, "skor Latihan = benar dari sepuluh soal");
cek(C.catatJawabanLatihan(l10, BAB, "11", true, DES) === l10, "soal ke-11 tidak ikut dihitung");
cek(C.catatJawabanLatihan(l, BAB, "2", false, NOV) === l, "jawaban kedua untuk soal yang sama diabaikan");
const l10b = C.catatJawabanLatihan(l10, BAB, "10", false, DES);
cek(l10b === l10, "poin Latihan tidak terbit dua kali");

/* ------------------------------ Ujian ------------------------------ */
let u = {};
u = C.catatUjian(u, BAB, 80, NOV);
sama([u[BAB].ujian, u[BAB].poin.ujian], [{ terbaik: 80, percobaan: 1, lulusPertama: false }, undefined], "ujian 80: belum ada poin");
u = C.catatUjian(u, BAB, 100, NOV);
sama(u[BAB].ujian, { terbaik: 100, percobaan: 2, lulusPertama: false }, "100 di percobaan kedua: bukan lulus pertama");
sama(u[BAB].poin.ujian, "2026-11", "ujian 100: poin Ujian terbit");
u = C.catatUjian(u, BAB, 60, DES);
sama(u[BAB].ujian, { terbaik: 100, percobaan: 3, lulusPertama: false }, "nilai lebih rendah tidak menurunkan skor terbaik");
sama(u[BAB].poin.ujian, "2026-11", "poin Ujian tidak terbit ulang");
const p1 = C.catatUjian({}, BAB, 100, NOV);
sama(p1[BAB].ujian, { terbaik: 100, percobaan: 1, lulusPertama: true }, "100 di percobaan pertama: lulus pertama");
cek(C.catatUjian({}, BAB, 101, NOV) !== undefined && Object.keys(C.catatUjian({}, BAB, 101, NOV)).length === 0, "nilai di luar 0..100 ditolak");
cek(Object.keys(C.catatUjian({}, BAB, Number.NaN, NOV)).length === 0, "nilai bukan angka ditolak");

/* ------------------------------ Ringkasan dan Papan Kualifikasi ------------------------------ */
let semua = {};
for (const h of ["A", "B", "C", "D"]) semua = C.catatSubBab(semua, BAB, h, NOV);
semua = C.catatUjian(semua, BAB, 100, NOV);
const r = C.ringkasBab(semua[BAB], 4);
sama([r.materiPersen, r.ujianSempurna, r.lulusPertama, r.kualifikasi], [100, true, true, true], "bab tuntas dengan ujian 100 pertama: Papan Kualifikasi");
const r2 = C.ringkasBab(C.catatUjian(Object.fromEntries(["A", "B", "C"].map((h) => [h, 0])) && C.catatSubBab(C.catatSubBab(C.catatSubBab({}, BAB, "A", NOV), BAB, "B", NOV), BAB, "C", NOV), BAB, 100, NOV)[BAB], 4);
sama([r2.materiPersen, r2.kualifikasi], [75, false], "sub-bab belum semua tuntas: bukan Papan Kualifikasi");
sama(C.ringkasBab(undefined, 4), { mulai: false, materiPersen: 0, latihanTerjawab: 0, latihanSelesai: false, skorLatihan: null, skorUjian: null, percobaan: 0, ujianSempurna: false, lulusPertama: false, kualifikasi: false }, "bab tanpa catatan");
sama(C.ringkasBab(semua[BAB], 0).materiPersen, 0, "total Sub-Bab nol tidak membagi nol");

/* ------------------------------ Poin bulanan dan reset ------------------------------ */
let p = C.catatUjian(C.catatJawabanLatihan({}, "mtk-1-bab1", "1", true, NOV), "mtk-1-bab1", 100, NOV);
for (let i = 2; i <= 10; i += 1) p = C.catatJawabanLatihan(p, "mtk-1-bab1", String(i), true, NOV);
p = C.catatUjian(p, "mtk-1-bab2", 100, NOV);
sama(C.poinBulanIni(p, "2026-11"), { latihan: 30, ujian: 140, praktikum: 0, total: 170 }, "November: latihan bab 1, ujian bab 1 dan 2");
sama(C.poinBulanIni(p, "2026-12"), { latihan: 0, ujian: 0, praktikum: 0, total: 0 }, "Desember: poin kembali 0 (reset bulanan)");
sama(C.ringkasBab(p["mtk-1-bab1"], 4).ujianSempurna, true, "ketuntasan bab tetap tersimpan setelah ganti bulan");
sama(C.poinBulanIni(p, "2026-11", ["2026-11", "2026-10", null]), { latihan: 30, ujian: 140, praktikum: 50, total: 220 }, "praktikum bulan ini ikut, bulan lain tidak");
sama(C.POIN_PER_BLOK_PENUH, 450, "satu blok penuh = 450 poin");
sama([C.POIN_LATIHAN, C.POIN_UJIAN, C.POIN_PRAKTIKUM, C.BAB_PER_BLOK], [30, 70, 50, 4], "konstanta poin sama dengan aturan platform");

/* ------------------------------ Gabungan catatan lama dan bab berikutnya ------------------------------ */
const sempurna = C.babUjianSempurna(p, ["mtk-1-bab3"]);
sama([...sempurna].sort(), ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3"], "ujian sempurna: catatan baru digabung catatan lama");
sama(C.babBerikutnya(["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4"], sempurna), "mtk-1-bab4", "bab berikutnya yang belum 100%");
sama(C.babBerikutnya(["mtk-1-bab1"], new Set(["mtk-1-bab1"])), null, "semua tuntas: tidak ada bab berikutnya");

/* ------------------------------ Sertifikat ------------------------------ */
sama([C.kodeAplikasiDariServer("k1-mat-bab3"), C.kodeAplikasiDariServer("k6-mat-bab12"), C.kodeAplikasiDariServer("k1-pai-bab1")], ["mtk-1-bab3", "mtk-6-bab12", "k1-pai-bab1"], "kode bab server ke kode aplikasi");
const BLOK1 = { id: "mtk-1-blok1", bab: ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4"] };
const WAJIB4 = BLOK1.bab;
const WAJIB8 = Array.from({ length: 8 }, (_, i) => `mtk-1-bab${i + 1}`);
sama(C.blokDibutuhkan(WAJIB4, [BLOK1]).map((b) => b.id), ["mtk-1-blok1"], "sertifikat 4 bab membutuhkan praktikum blok 1");
sama(C.blokDibutuhkan(WAJIB8, [BLOK1]).map((b) => b.id), ["mtk-1-blok1"], "sertifikat 8 bab membutuhkan praktikum blok yang sudah ada");
sama(C.blokDibutuhkan(["mtk-1-bab1", "mtk-1-bab2"], [BLOK1]).length, 0, "dua bab saja tidak membutuhkan blok 1 utuh");
const buka = (tuntas, kirim, wajibPraktikum = true, babWajib = WAJIB4) => C.sertifikatTerbuka({ babWajib, tuntas: new Set(tuntas), wajibPraktikum, blok: [BLOK1], praktikumTerkirim: new Set(kirim) });
cek(!buka(WAJIB4.slice(0, 3), ["mtk-1-blok1"]), "tiga dari empat bab: sertifikat tetap terkunci");
cek(!buka(WAJIB4, []), "empat bab 100% tanpa Praktikum: terkunci (praktikum wajib)");
cek(buka(WAJIB4, ["mtk-1-blok1"]), "empat bab 100% dan Praktikum terkirim: terbuka");
cek(buka(WAJIB4, [], false), "sertifikat tanpa kewajiban Praktikum: terbuka setelah bab tuntas");
cek(!buka(WAJIB8.slice(0, 7), ["mtk-1-blok1"], true, WAJIB8), "tujuh dari delapan bab: terkunci");
cek(buka(WAJIB8, ["mtk-1-blok1"], true, WAJIB8), "delapan bab dan praktikum blok 1: terbuka");

/* ------------------------------ Urai data rusak ------------------------------ */
sama(C.urai(null), {}, "tanpa data");
sama(C.urai(""), {}, "teks kosong");
sama(C.urai("{rusak"), {}, "JSON rusak");
sama(C.urai("[1,2]"), {}, "bentuk larik ditolak");
sama(C.urai('{"x":5}'), {}, "isi bab bukan objek diabaikan");
const bulat = C.urai(JSON.stringify(p));
sama(C.urai(JSON.stringify(bulat)), bulat, "tulis lalu baca ulang tidak mengubah apa pun");
sama([bulat["mtk-1-bab1"].poin.latihan, bulat["mtk-1-bab1"].poin.ujian, bulat["mtk-1-bab2"].ujian.terbaik, bulat["mtk-1-bab1"].latihan.length], [p["mtk-1-bab1"].poin.latihan, p["mtk-1-bab1"].poin.ujian, 100, 10], "isi penting selamat setelah tulis dan baca");
const aneh = C.urai(JSON.stringify({ b: { subBab: ["A", 3, null], latihan: [{ id: "1", benar: true }, { id: 2, benar: true }, { benar: false }], ujian: { terbaik: "100", percobaan: 2 }, poin: { latihan: 7 } } }));
sama(aneh.b, { subBab: ["A"], latihan: [{ id: "1", benar: true }], ujian: { terbaik: null, percobaan: 2, lulusPertama: false }, poin: {}, diperbarui: "" }, "bidang bertipe salah dibersihkan");
const banyak = C.urai(JSON.stringify({ b: { latihan: Array.from({ length: 15 }, (_, i) => ({ id: String(i), benar: true })) } }));
sama(banyak.b.latihan.length, 10, "lembar lebih dari sepuluh dipotong");

/* ------------------------------ Aturan platform pada berkas ------------------------------ */
const berkas = ["src/lib/capaian.ts", "src/lib/capaian-klien.ts"];
for (const f of berkas) {
  const s = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
  cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|getUserMedia|face|biometri[^k]/i.test(s.replace(/biometrik|tanpa kamera/gi, "")), `${f}: tanpa jaringan, model bahasa, kamera, atau biometrik`);
  cek(!/rupiah|\bRp\b|kurs/i.test(s.replace(/tanpa nilai tukar rupiah/i, "")), `${f}: tanpa rupiah atau kurs`);
  cek(!s.includes("\r"), `${f}: akhir baris LF`);
}
const klien = readFileSync(new URL("../src/lib/capaian-klien.ts", import.meta.url), "utf8");
cek(/try\s*\{[\s\S]*localStorage\.setItem[\s\S]*catch/.test(klien) && /try\s*\{[\s\S]*localStorage\.getItem[\s\S]*catch/.test(klien), "penyimpanan dibungkus try/catch");
cek(/useSyncExternalStore\(langgan, \(\) => bacaMentah\(\) \|\| "\{\}", \(\) => ""\)/.test(klien), "hook: snapshot server kosong supaya hidrasi aman");

/* ------------------------------ Terpasang di modul ------------------------------ */
const player = readFileSync(new URL("../src/components/IgilModulePlayer.tsx", import.meta.url), "utf8");
cek(/catatSubBabSelesai\(bab, activeSubBab\)/.test(player), "pemutar mencatat Sub-Bab selesai");
cek(/catatLatihanDinilai\(bab, kunci, balasan\.hasil\.benar\)/.test(player), "pemutar mencatat Latihan hanya dari jawaban yang dinilai server");
const belajar = readFileSync(new URL("../src/components/modul/BelajarServer.tsx", import.meta.url), "utf8");
cek(/catatUjianDinilai\(bab, res\.nilai\)/.test(belajar), "UjianServer mencatat nilai dari server");

/* ------------------------------ Halaman Rapor memakai data nyata ------------------------------ */
const raporSrc = readFileSync(new URL("../src/components/rapor/RaporHalaman.tsx", import.meta.url), "utf8");
cek(/useCapaian\(\)/.test(raporSrc) && /poinBulanIni\(/.test(raporSrc) && /babDariCapaian\(/.test(raporSrc), "Rapor membaca capaian nyata (useCapaian, babDariCapaian, poinBulanIni)");
cek(!/sampleChaptersProgress|SpanduContoh|Tampilan contoh/.test(raporSrc), "Rapor tidak lagi memakai data contoh bab 1");
cek(/sertifikatTerbuka\(/.test(raporSrc) && /kodeAplikasiDariServer/.test(raporSrc), "Sertifikat memakai syarat nyata (bab 100% dan Praktikum terkirim)");
cek(!/rupiah|Rp|kurs/i.test(raporSrc.replace(/biaya server Rp 0/gi, "")), "Rapor tanpa rupiah atau kurs poin");
cek(/Bukan uang tunai/.test(raporSrc) && /di-reset ke 0 setiap akhir bulan/.test(raporSrc), "Rapor menyebut poin bukan uang tunai dan reset bulanan");
cek(!/getUserMedia|kamera aktif|face/i.test(raporSrc), "Rapor tanpa kamera atau deteksi wajah");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
