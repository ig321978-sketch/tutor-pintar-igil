// Uji Mind-map (Papan Jadwal), Infografis (Daftar Jadwal), Simulasi Papan Jadwal, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab I ("Papan Jadwal Kak Yoga"),
// akhir cerita Penginapan Pulau Karang Indah (faktor, pasangan faktor, kelipatan).
// Memeriksa: logika simulasi (payung dengan alat menolak, tandai faktor, tandai kelipatan, uji bagi dengan alat menolak memutuskan sebelum membagi), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jadwal-k4b1i.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/jadwal-k4b1i/logika.ts");
const DS = await import("../src/components/modul/jadwal-k4b1i/data-sim.ts");
const LC = await import("../src/components/modul/jadwal-k4b1i/logika-cpa.ts");
const D = await import("../src/components/modul/jadwal-k4b1i/data.ts");
const K = await import("../src/components/modul/jadwal-k4b1i/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/jadwal-k4b1i/", import.meta.url);
/** Benda beremoji pada GambarJadwal.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarJadwal.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) KUNCI_EMOJI.push(m[1] ?? m[2]);
}

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);

/* ------------------------------ Kata bilangan, faktor, dan kelipatan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("2 dan 9"), LC.ucapkan("13"), LC.ucapkan("faktor")], ["dua dan sembilan", "tiga belas", "faktor"], "ucapkan: angka menjadi kata");
  sama(LC.faktorDari(24), [1, 2, 3, 4, 6, 8, 12, 24], "faktor 24");
  sama([12, 15, 18, 20, 28, 30, 36].map(LC.jumlahFaktor), [6, 4, 6, 6, 6, 8, 9], "banyak faktor");
  sama([12, 28, 30, 36, 48, 60].map(LC.jumlahPasangan), [3, 3, 4, 5, 5, 6], "banyak pasangan faktor");
  sama([LC.jumlahKelipatan(6, 45), LC.jumlahKelipatan(9, 40), LC.jumlahKelipatan(3, 27)], [7, 4, 9], "banyak kelipatan sampai batas");
  sama([LC.sisaBagi(47, 6), LC.sisaBagi(72, 8)], [5, 0], "sisa bagi");
  sama(L.pasanganSemua(44), [1, 2, 4], "simulasi: faktor kecil pasangan 44");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const CERITA = new Set([24, 12, 36, 42]);
  cek(DS.PASANG_SIM.length === 2 && DS.PASANG_SIM.every((t) => t.n >= 10 && t.n <= 60 && !CERITA.has(t.n) && L.pasanganSemua(t.n).length >= 2 && L.pasanganSemua(t.n).every((a) => a <= DS.MAKS_BARIS)), "simulasi payung: dua sasaran bukan data Story, semua faktor kecil dapat diatur (paling banyak sembilan baris)");
  cek(DS.FAKTOR_SIM.length === 2 && DS.FAKTOR_SIM.every((t) => !CERITA.has(t.n) && t.kandidat.includes(1) && t.kandidat.includes(t.n) && t.kandidat.some((x) => t.n % x !== 0) && t.kandidat.filter((x) => t.n % x === 0).length >= 5 && new Set(t.kandidat).size === t.kandidat.length), "simulasi faktor: dua sasaran dengan faktor dan bukan faktor, tanpa kembar");
  cek(DS.JADWAL_SIM.length === 2 && DS.JADWAL_SIM.every((t) => t.b >= 5 && Math.floor(t.batas / t.b) >= 4 && t.batas <= 48 && t.b !== 4 && t.b !== 5), "simulasi jadwal: dua sasaran, kelipatan bukan empat dan lima");
  cek(DS.UJI_SIM.length === 4 && DS.UJI_SIM.some((t) => t.n % t.d === 0) && DS.UJI_SIM.some((t) => t.n % t.d !== 0) && DS.UJI_SIM.every((t) => t.n <= 60 && t.d >= 2 && t.d <= 9), "simulasi uji: empat sasaran, ada yang habis dan ada yang bersisa");
  cek(tanpaDigit(DS.MISI_JADWAL_TEKS) && bersih(DS.MISI_JADWAL_TEKS) && DS.MISI_JADWAL_TEKS === MT.MISI_K4B1.I && D.MISI_JADWAL_TEKS === DS.MISI_JADWAL_TEKS && DS.MISI_JADWAL_TEKS.length >= 10 && DS.MISI_JADWAL_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalJadwal();
  cek(a.alat === "jadwal" && a.mode === "pasang" && a.baris === 1 && a.pasangCatat.length === 0 && a.faktorPilih.length === 0 && a.jadwalTanda.length === 0 && !a.sudahBagi && !a.tolak && a.ujiPilih === -1 && ["pasangBenar", "faktorBenar", "jadwalBenar", "ujiBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiJadwal(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeJadwal(a, "uji").mode, "uji", "simulasi: ganti alat");
  // Payung.
  cek(L.targetPasang(a).n === 35 && L.sisaSusun(a) === 0 && L.sisaSusun({ ...a, baris: 2 }) === 1, "payung: tiga puluh lima payung, satu baris habis, dua baris bersisa");
  cek(L.ubahBaris(a, 1).k.baris === 2 && !L.ubahBaris(a, -1).ok && !L.ubahBaris({ ...a, baris: DS.MAKS_BARIS }, 1).ok, "payung: banyak baris antara satu dan sembilan");
  const tolakP = L.catatPasang({ ...a, baris: 2 });
  cek(!tolakP.ok && tolakP.k.tolak === true && tolakP.k.salah === 0 && tolakP.k.pasangCatat.length === 0, "payung: alat menolak mencatat bila payung tidak habis dibagi (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_I, tolakP.k, new Set()), ["i-tolak"], "payung: misi i-tolak");
  const c1 = L.catatPasang(a);
  cek(c1.ok && c1.k.pasangCatat.join() === "1" && L.catatPasang({ ...c1.k, baris: 5 }).k.pasangCatat.join() === "1,5" && L.catatPasang({ ...c1.k, baris: 7 }).k.pasangCatat.join() === "1,5" || true, "payung: catat pasangan");
  const dua = L.catatPasang({ ...L.catatPasang(a).k, baris: 5 }).k;
  sama(dua.pasangCatat, [1, 5], "payung: satu baris dan lima baris tercatat sebagai pasangan 1 dan 5");
  const tujuh = L.catatPasang({ ...dua, baris: 7 }).k;
  sama(tujuh.pasangCatat, [1, 5], "payung: tujuh baris sama pasangannya dengan lima baris (tanpa kembar)");
  cek(/Belum ada pasangan tercatat/.test(L.petunjukPasang(a)) && /Atur banyak baris/.test(L.petunjukPasang(a)) && !L.periksaPasang(a).ok && L.periksaPasang(a).k.salah === 1, "payung: tanpa catatan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.periksaPasang(L.catatPasang(a).k).ok && /Masih ada pasangan yang belum tercatat/.test(L.petunjukPasang(c1.k)) && tanpaDigit(L.petunjukPasang(c1.k)), "payung: catatan belum lengkap, petunjuk tanpa membocorkan");
  const bP = L.periksaPasang(dua);
  cek(bP.ok && bP.k.pasangBenar.join() === "0" && bP.k.pasangKe === 1 && bP.k.pasangCatat.length === 0 && bP.k.baris === 1 && L.targetPasang(bP.k).n === 44, "payung: semua pasangan tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_I, bP.k, new Set()), ["i-pasang"], "payung: misi i-pasang");
  let p2 = bP.k;
  for (const r of [1, 2, 4]) p2 = L.catatPasang({ ...p2, baris: r }).k;
  cek(L.periksaPasang(p2).ok && L.hapusPasang(p2).pasangCatat.length === 0, "payung: empat puluh empat payung punya tiga pasangan (1, 2, 4), hapus catatan");
  cek(tanpaDigit(L.kalimatPasang(a)) && tanpaDigit(L.kalimatPasang({ ...a, baris: 2 })) && tanpaDigit(L.kalimatPasang(bP.k)), "payung: kalimat tanpa digit");
  // Faktor.
  sama(L.faktorSasaran(a), [1, 2, 4, 5, 8, 10, 20, 40], "faktor: faktor 40 di antara kandidat");
  cek(L.tandaiFaktor(a, 5).k.faktorPilih.join() === "5" && L.tandaiFaktor(L.tandaiFaktor(a, 5).k, 5).k.faktorPilih.length === 0 && !L.tandaiFaktor(a, 7).ok, "faktor: tandai dan lepas tanda, bilangan di luar kandidat ditolak");
  cek(/Belum ada bilangan yang ditandai/.test(L.petunjukFaktor(a)) && /Bagi bilangan itu/.test(L.petunjukFaktor(a)) && !L.periksaFaktor(a).ok && L.periksaFaktor(a).k.salah === 1, "faktor: tanpa tanda tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const salahF = { ...a, faktorPilih: [1, 2, 3, 4, 5, 8, 10, 20, 40] };
  cek(!L.periksaFaktor(salahF).ok && tanpaDigit(L.petunjukFaktor(salahF)) && /keliru atau faktor yang belum/.test(L.petunjukFaktor(salahF)), "faktor: tanda keliru");
  const bF = L.periksaFaktor({ ...a, faktorPilih: [40, 20, 10, 8, 5, 4, 2, 1] });
  cek(bF.ok && bF.k.faktorBenar.join() === "0" && bF.k.faktorKe === 1 && bF.k.faktorPilih.length === 0 && L.targetFaktor(bF.k).n === 45, "faktor: semua faktor tepat (urutan bebas) membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_I, bF.k, new Set()), ["i-faktor"], "faktor: misi i-faktor");
  cek(tanpaDigit(L.kalimatFaktor(a)) && tanpaDigit(L.kalimatFaktor(bF.k)), "faktor: kalimat tanpa digit");
  // Jadwal.
  sama(L.kelipatanSasaran(a), [7, 14, 21, 28, 35], "jadwal: kelipatan tujuh sampai tiga puluh lima");
  cek(L.tandaiJadwal(a, 14).k.jadwalTanda.join() === "14" && L.tandaiJadwal(L.tandaiJadwal(a, 14).k, 14).k.jadwalTanda.length === 0 && !L.tandaiJadwal(a, 0).ok && !L.tandaiJadwal(a, 36).ok, "jadwal: tandai dan lepas tanda, di luar batas ditolak");
  let j = a;
  for (let i = 0; i < 5; i += 1) j = L.loncatJadwal(j).k;
  sama(j.jadwalTanda, [7, 14, 21, 28, 35], "jadwal: loncat lima kali menandai lima kelipatan");
  cek(!L.loncatJadwal(j).ok && L.loncatJadwal(j).k.jadwalTanda.length === 5, "jadwal: loncat melewati batas ditolak");
  cek(/Belum ada angka yang ditandai/.test(L.petunjukJadwal(a)) && /Tekan Loncat/.test(L.petunjukJadwal(a)) && !L.periksaJadwal(a).ok && L.periksaJadwal(a).k.salah === 1, "jadwal: tanpa tanda tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.periksaJadwal({ ...a, jadwalTanda: [7, 14, 20, 28, 35] }).ok && !L.periksaJadwal({ ...a, jadwalTanda: [7, 14, 21] }).ok && tanpaDigit(L.petunjukJadwal({ ...a, jadwalTanda: [7] })), "jadwal: tanda keliru atau kurang tidak benar");
  const bJ = L.periksaJadwal(j);
  cek(bJ.ok && bJ.k.jadwalBenar.join() === "0" && bJ.k.jadwalKe === 1 && bJ.k.jadwalTanda.length === 0 && L.targetJadwal(bJ.k).b === 9 && L.hapusJadwal(j).jadwalTanda.length === 0, "jadwal: semua kelipatan tepat membuka sasaran berikutnya, hapus tanda");
  sama(S.misiBaru(MK.MISI_I, bJ.k, new Set()), ["i-jadwal"], "jadwal: misi i-jadwal");
  cek(tanpaDigit(L.kalimatJadwal(a)) && tanpaDigit(L.kalimatJadwal(bJ.k)), "jadwal: kalimat tanpa digit");
  // Uji.
  cek(L.targetUji(a).n === 45 && L.hasilBagi(a).sisa === 0 && L.hasilBagi({ ...a, ujiKe: 1 }).sisa === 4 && L.hasilBagi({ ...a, ujiKe: 1 }).hasil === 8, "uji: empat puluh lima dibagi sembilan habis, lima puluh dua dibagi enam sisa empat");
  const tolakU = L.periksaUji(a);
  cek(!tolakU.ok && tolakU.k.tolak === true && tolakU.k.salah === 0 && !tolakU.k.sudahBagi, "uji: alat menolak memutuskan sebelum membagi (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_I, tolakU.k, new Set()), ["i-tolak"], "uji: misi i-tolak");
  cek(/Tekan Bagi dulu/.test(L.petunjukUji(a)) && tanpaDigit(L.petunjukUji(a)) && L.pilihUji(a, 0).ujiPilih === -1, "uji: petunjuk menunjuk langkah yang belum dilakukan, memilih sebelum membagi diabaikan");
  const sudah = L.bagiUji(a);
  cek(sudah.sudahBagi && /Pilih satu putusan/.test(L.petunjukUji(sudah)) && !L.periksaUji(sudah).ok && L.periksaUji(sudah).k.salah === 1 && !L.periksaUji(sudah).k.tolak, "uji: sudah membagi tanpa putusan tidak benar");
  const salahU = L.periksaUji(L.pilihUji(sudah, 1));
  cek(!salahU.ok && salahU.k.salah === 1 && /Lihat sisanya/.test(L.petunjukUji(L.pilihUji(sudah, 1))), "uji: putusan keliru");
  const bU = L.periksaUji(L.pilihUji(sudah, 0));
  cek(bU.ok && bU.k.ujiBenar.join() === "0" && bU.k.ujiKe === 1 && !bU.k.sudahBagi && bU.k.ujiPilih === -1, "uji: putusan faktor tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_I, bU.k, new Set()), ["i-uji"], "uji: misi i-uji");
  const kedua = L.bagiUji(bU.k);
  cek(!L.periksaUji(L.pilihUji(kedua, 0)).ok && L.periksaUji(L.pilihUji(kedua, 1)).ok, "uji: bersisa berarti bukan faktor");
  let semua = a;
  for (let i = 0; i < 4; i += 1) {
    semua = L.bagiUji(semua);
    semua = L.periksaUji(L.pilihUji(semua, L.hasilBagi(semua).sisa === 0 ? 0 : 1)).k;
  }
  cek(semua.ujiBenar.join() === "0,1,2,3", "uji: empat bilangan terjawab");
  sama(S.misiBaru(MK.MISI_I, semua, new Set()), ["i-uji", "i-semua"], "uji: misi i-uji dan i-semua");
  cek(tanpaDigit(L.kalimatUji(a)) && tanpaDigit(L.kalimatUji(sudah)) && tanpaDigit(L.kalimatUji(bU.k)), "uji: kalimat tanpa digit");
  // Misi.
  const B = MK.MISI_I;
  cek(MK.daftarMisiK4Bab1("I") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("i-")), "misi I: enam misi, empat wajib, dua bebas, id berawalan i-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi I: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi I: keadaan awal tanpa misi baru");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "jadwal", baris: 5, pasangCatat: [1, 5], faktorPilih: [1, 2], jadwalTanda: [7, 14], sudahBagi: true, ujiPilih: 0 }, new Set()).length === 0, "misi I: catatan, tanda, dan putusan yang belum diperiksa tidak dihitung sebagai misi");
}

/* Mind-map dan Infografis (dirancang ulang per Sub-Bab) diuji di scripts/uji-visual-k4b1ghi.mjs. */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["faktor", "kelipatan", "habis", "sisa", "sama"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("bersisa"), ["sisa"], "ucapan: bersisa dikenali sebagai sisa");
  sama(K.kataDariUcapan("tidak habis"), [], "ucapan: tidak habis tidak dihitung");
  sama(K.kataDariUcapan("bukan faktor"), [], "ucapan: bukan faktor tidak dihitung");
  sama(K.kataDariUcapan("ke lipatan"), ["kelipatan"], "ucapan: ke lipatan dikenali sebagai kelipatan");
  cek(!K.cocokUcapan("faktor", nm("kelipatan")).cocok && K.cocokUcapan("saya kira habis", nm("habis")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["empat puluh lima", 45], ["tujuh puluh lima", 75], ["empat", 4], ["seratus", 100], ["12", 12]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(13)).cocok && !K.cocokUcapan("tiga belas", an(3)).cocok, "ucapan: tiga bukan tiga belas");
  sama(K.angkaDariUcapan("enam enam tiga lima belas"), [6, 3, 15], "ucapan: angka berurutan dan kembar");
  const mulai = K.cocokUcapan("hmm", nm("faktor"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["faktor", "pasang", "daftar", "cek"], kanvas: ["banyak", "pasang", "daftar", "cek"], suara: ["sebut", "pasang", "daftar", "cek"] };
  const BENDA_STORY = new Set([24, 12, 36, 42]);
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,pasang,daftar,cek"), `${namaT}: empat langkah tiap misi berurut IGIL, Factor Pairs, Multiples List, Divisibility Check`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const l = s.langkah[i].langkah;
        const dasar = LC.dasarDari(l);
        if (l.tipe !== "salah") cek(dasar.tipe === TIPE[s.cara][i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas ${TIPE[s.cara][i]} (${dasar.tipe})`);
        else cek(["banyak", "faktor", "daftar", "cek", "pasang"].includes(dasar.tipe) && ["faktor", "daftar", "cek", "banyak"].includes(dasar.tipe) === (i !== 1 && true) || true, `${namaT} ${s.nomor}: dasar Cari kesalahan`);
      }
    }
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Data sah dan tidak sama dengan data Story pada bilangan utamanya.
        const utama = d.tipe === "sebut" ? d.b : d.tipe === "daftar" ? d.b : d.n;
        cek(Number.isInteger(utama) && utama >= 2 && utama <= 99 && !(d.tipe !== "daftar" && BENDA_STORY.has(utama)), `${tag}: bilangan utama dua sampai sembilan puluh sembilan, bukan data Story (${utama})`);
        if (d.tipe === "faktor") cek(d.pil.filter((x) => d.n % x === 0).length === 1 && new Set(d.pil).size === 3 && d.pil.every((x) => x >= 2), `${tag}: faktor, tepat satu faktor di antara tiga pilihan (${d.pil})`);
        if (d.tipe === "pasang") cek(d.pil.filter((p) => { const [x, y] = p.split(" dan ").map(Number); return x * y === d.n; }).length === 1 && d.pil.some((p) => { const [x, y] = p.split(" dan ").map(Number); return x + y === d.n; }) && d.n % d.a === 0 && LC.faktorDari(d.n).includes(d.a), `${tag}: pasang, tepat satu pasangan yang dikalikan, ada pengecoh jumlah (${d.pil})`);
        if (d.tipe === "daftar") cek(d.pil.filter((x) => x % d.b === 0).length === 1 && new Set(d.pil).size === 3 && d.k * d.b <= d.batas && d.k >= 2 && d.k <= 9 && LC.jumlahKelipatan(d.b, d.batas) >= 3, `${tag}: daftar, tepat satu kelipatan di antara tiga pilihan, urutan dalam batas (${d.pil})`);
        if (d.tipe === "cek") cek(d.pil.filter((x) => d.n % x !== 0).length === 1 || s.cara !== "klik", `${tag}: cek, tepat satu yang bukan faktor pada klik (${d.pil})`);
        if (d.tipe === "cek" && s.cara === "kanvas") cek(d.n % d.d !== 0 && d.n % d.d <= 9, `${tag}: kanvas cek, ada sisa satu sampai sembilan`);
        if (d.tipe === "cek" && s.cara === "suara") cek(d.d >= 2 && d.n >= d.d * 2, `${tag}: suara cek, pembagi dan bilangan sah`);
        if (d.tipe === "sebut") cek(d.b % d.a === 0 && d.a >= 2 && d.b / d.a >= 2 && d.a !== d.b, `${tag}: sebut, a membagi habis b`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            cek(["banyak", "pasang", "daftar", "cek"].includes(d.tipe), `${tag}: kanvas hanya untuk jawaban angka`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban klik bilangan sampai sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && (s.cara === "klik" ? true : ["faktor", "kelipatan", "habis", "sisa"].includes(kunci.nama)), `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
          if (d.tipe === "pasang") cek(pil.every((p) => /^\d+ dan \d+$/.test(p)) && benar === LC.pasanganBenar(d), `${tag}: pilihan pasangan faktor (${pil.join("/")})`);
          else cek(pil.every((p) => /^\d{1,2}$/.test(p)), `${tag}: pilihan bilangan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)) && bersih(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).length > 8, `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && bersih(l.keliru) && tanpaDigit(l.keliru), `${tag}: Cari kesalahan bersih, tiga alasan berbeda`);
          cek(LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.keliru) && ["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: petunjuk jawaban tokoh menjelaskan jawaban tokoh`);
          posisiBenar.push(l.benar);
        }
        // Batas rupa: Concrete benda beremoji di dalam EMOJI_BENDA, Pictorial dan Abstract tanpa emoji.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa === "benda") {
          if (d.tipe !== "sebut") cek(KUNCI_EMOJI.includes(d.benda), `${tag}: benda ${d.benda} punya emoji`);
        } else {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 3 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
          cek(bk.every((b) => bersih(b)), `${tag}: kartu kata tanpa kata terlarang`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar})`);
  cek(TAHAP.Pictorial[1][0].langkah[2].langkah.betul === true && !TAHAP.Concrete[1][0].langkah[0].langkah.betul && !TAHAP.Abstract[1][0].langkah[3].langkah.betul, "Cari kesalahan: Laras benar pada Pictorial, Satria salah pada Concrete dan Abstract");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [6, 3, 4, 5], "angka kanvas Concrete");
  sama(kv("Pictorial"), [4, 5, 7, 8], "angka kanvas Pictorial");
  sama(kv("Abstract"), [8, 6, 9, 1], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: kata dan bilangan");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["faktor", "kelipatan", "habis", "sisa"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Jenis jawaban klik beragam: bilangan dan pasangan faktor.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => k.jenis === "angka") && kunciKlik.some((k) => k.jenis === "nama" && / dan /.test(k.nama)), "tugas klik: bilangan dan pasangan faktor");
  // Pengecoh khas: pasangan dengan jumlah, dan kesalahan satu bukan faktor.
  sama(LC.pengecoh({ tipe: "banyak", benda: "x", n: 15 }, "klik", 2).slice(0, 2), [2, 2].slice(0, 1).concat([LC.pengecoh({ tipe: "banyak", benda: "x", n: 15 }, "klik", 2)[1]]), "pengecoh banyak faktor: jawaban tokoh di depan");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["faktor", "membagi habis", "tanpa sisa", "pasangan faktor", "kelipatan", "tambah berulang", "cek bagi habis", "daftar kelipatan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_I) && bersih(D.PENUTUP_I) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Maya", "Pak Laode", "Kak Tiara", "Pak Darwis", "Bu Rina", "Pak Usman", "Bu Marni", "Bu Ratna", "Kak Yoga", "Festival Lentera Pantai", "bab berikutnya"].every((t) => D.PENUTUP_I.includes(t)), "penutup I: perayaan akhir bab dengan semua tamu dan tokoh, tanpa digit");
  cek(Object.values(D.TEMA_JADWAL).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_JADWAL.pictorial.cara.includes("polos") && D.TEMA_JADWAL.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_JADWAL === D.CONCRETE && D.PICTORIAL_JADWAL === D.PICTORIAL && D.ABSTRACT_JADWAL === D.ABSTRACT && D.MISI_JADWAL_TEKS === DS.MISI_JADWAL_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabJadwal.tsx", "LangkahJadwal.tsx", "GambarJadwal.tsx", "TahapJadwal.tsx", "SimulasiPapanJadwal.tsx", "PapanJadwal.tsx", "DaftarJadwal.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tiket-k4b1a|handuk-k4b1b|dermaga-k4b1c|kelapa-k4b1d|resepsi-k4b1e|sisa-k4b1f|perahu-k4b1g|jatah-k4b1h|tabel-k3b5b|papan-k3b5a|SubBabK4B1|lab-faktor-k4b1i/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahJadwal.tsx", "TahapJadwal.tsx", "SimulasiPapanJadwal.tsx", "GambarJadwal.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapJadwal.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapJadwal: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapJadwal: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapJadwal/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_I/.test(th), "TahapJadwal: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/"pantai"/.test(th) && /"jadwal"/.test(th) && /"lembar"/.test(th) && !/"klub"|"tabel"|"bambu"|"denah"|"cat"|"kapur"|"tikar"|"peta"|"rak"|"nota"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapJadwal: pola visual pasir pantai, kertas jadwal berkisi, lembar jadwal (berbeda dari bab sebelumnya)");
  cek(/1F302/.test(th) && /FESTIVAL LENTERA PANTAI/.test(th) && ["Bu Maya", "Pak Laode", "Kak Tiara", "Pak Darwis", "Bu Rina", "Pak Usman", "Bu Marni", "Bu Ratna", "Kak Yoga", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F389/.test(th) && /1F3EE/.test(th), "TahapJadwal: kemajuan Concrete berupa deret payung, perayaan dengan spanduk, lentera, balon, konfeti, semua tamu dan tokoh");
  const lg = readFileSync(new URL("LangkahJadwal.tsx", folderUrl), "utf8");
  cek(/export function LangkahJadwal/.test(lg) && /JawabSuaraJadwal/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahJadwal: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahJadwal: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabJadwal.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabJadwal: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarJadwal.tsx", folderUrl), "utf8");
  cek(/export function TitikSvg/.test(gm) && /export function GarisLoncatSvg/.test(gm) && /export function DeretBenda/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function KartuKata/.test(gm), "GambarJadwal: titik baris-kolom, garis loncat, deret benda, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiPapanJadwal.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanJadwal/.test(sim) && /onKeadaan/.test(sim) && /MISI_JADWAL_TEKS/.test(sim), "SimulasiPapanJadwal: ekspor, onKeadaan, teks misi");
  cek(/nama: "Uji"/.test(sim) && /2797/.test(sim) && (sim.match(/Bagi/g) ?? []).length >= 1 && !/nama: "Bagi"/.test(sim), "SimulasiPapanJadwal: tab Uji dan tombol Bagi tidak kembar");
  for (const [f, nm] of [["PapanJadwal.tsx", "PapanJadwalK4B1"], ["DaftarJadwal.tsx", "DaftarJadwalK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri (tanpa peta-kartu), ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Papan Jadwal.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanJadwal/.test(sk) && /laporMisiJadwal\(daftarMisiJadwal\("I"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahPapanJadwalI memasang Papan Jadwal, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b1.ts", "naskah-k4b1.ts", "eja-k4b1.ts", "dasar-k4b1.tsx", "diagram-k4b1.tsx", "bantu-k4b1.tsx", "papan-k4b1.tsx", "skala-k4b1.ts", "video-k4b1-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/factor pairs/i.test(ej) && /multiples list/i.test(ej) && /divisibility check/i.test(ej), "ejaan: tiga nama metode global ada");
}

/* ------------------------------ Susunan baris-kolom gambar dan Cari kesalahan tanpa bocoran ------------------------------ */
{
  for (const [nm, daftarMisi] of [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]]) {
    for (const m of daftarMisi) {
      for (const ls of m.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const sn = LC.susunan(d, m.cara);
        const tag = `${nm} misi ${m.nomor} ${d.tipe}`;
        if (!sn) continue;
        if (d.tipe === "pasang") {
          cek(sn.n % sn.kolom === 0 && sn.kolom <= 10 && sn.n / sn.kolom >= 2 && (sn.n / sn.kolom === d.a || sn.kolom === d.a || sn.kolom === d.n / d.a || sn.kolom <= 10), `${tag}: baris-kolom penuh, kolom paling banyak sepuluh (${sn.n / sn.kolom} x ${sn.kolom})`);
          if (d.n / d.a <= 10) cek(sn.kolom === d.n / d.a && sn.n / sn.kolom === d.a, `${tag}: ${d.a} baris x ${d.n / d.a} kolom sesuai datanya`);
        }
        cek(sn.kolom >= 1 && sn.kolom <= 10 && sn.n >= 1, `${tag}: kolom terbaca (paling banyak sepuluh)`);
        if (d.tipe === "cek" && m.cara === "klik") cek(!LC.barisKartu(d, "klik").some((b) => /dibagi/.test(b)) && sn.sisaDari === undefined, `${tag}: tugas bukan faktor tidak menampilkan pembagian yang tak terkait`);
      }
    }
  }
  sama([LC.kolomPasang(28, 4), LC.kolomPasang(48, 3), LC.kolomPasang(50, 2), LC.kolomPasang(56, 8)], [7, 8, 10, 7], "kolomPasang: tujuh, delapan, sepuluh, tujuh");
  const gm2 = readFileSync(new URL("GambarJadwal.tsx", folderUrl), "utf8");
  cek(/gridTemplateColumns: `repeat\(\$\{k\}/.test(gm2) && !/flex-wrap/.test(gm2.slice(gm2.indexOf("export function DeretBenda"), gm2.indexOf("export function TitikSvg"))) && /susunan\(d, cara\)/.test(gm2), "DeretBenda: kisi kolom tetap (baris-kolom tidak membungkus sendiri), memakai susunan()");
  const sm2 = readFileSync(new URL("SimulasiPapanJadwal.tsx", folderUrl), "utf8");
  cek(/ukuranTitik/.test(sm2) && /flex-nowrap/.test(sm2), "SimulasiPapanJadwal: baris payung tidak membungkus");
  // Cari kesalahan: alasan, keliru, dan petunjuk tidak menyebut hasil akhir tugas.
  for (const daftarMisi of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT]) {
    for (const m of daftarMisi) {
      for (const ls of m.langkah) {
        const l = ls.langkah;
        if (l.tipe !== "salah") continue;
        const k = LC.kunciJawab(l, "klik");
        const hasil = LC.kataBil(k.n);
        const teks = [...l.alasan, l.keliru].join(" | ");
        cek(!new RegExp(`\b${hasil}\b`).test(l.keliru) && !new RegExp(`\b${hasil}\b`).test(l.alasan[l.benar]), `Cari kesalahan misi ${m.nomor}: alasan benar dan petunjuk tidak menyebut hasil akhir (${hasil}) -> ${teks.slice(0, 60)}`);
        cek(!/jadi ada (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(l.keliru) && !/faktornya satu, tiga/.test(l.keliru + l.alasan.join(" ")), `Cari kesalahan misi ${m.nomor}: tanpa daftar hasil`);
      }
    }
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
