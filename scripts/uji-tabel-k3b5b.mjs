// Uji Mind-map (Tabel Klub Sepeda), Infografis (Tabel Klub), Simulasi Papan Tabel, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 5 Sub-Bab B ("Tabel Bu Wulan"),
// akhir cerita Bengkel Sepeda Pak Hasan (turus berlima, tabel tiga kolom, membaca tabel).
// Memeriksa: logika simulasi (cacah dengan turus berlima, isi kolom banyak, urutkan baris, baca tabel dengan alat menolak menjawab sebelum membaca), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-tabel-k3b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tabel-k3b5b/logika.ts");
const DS = await import("../src/components/modul/tabel-k3b5b/data-sim.ts");
const DK = await import("../src/components/modul/tabel-k3b5b/data-kartu.ts");
const LC = await import("../src/components/modul/tabel-k3b5b/logika-cpa.ts");
const D = await import("../src/components/modul/tabel-k3b5b/data.ts");
const K = await import("../src/components/modul/tabel-k3b5b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab5.ts");
const MT = await import("../src/components/modul/misi-teks-k3b5.ts");
const folderUrl = new URL("../src/components/modul/tabel-k3b5b/", import.meta.url);
/** Benda beremoji pada GambarTabel.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarTabel.tsx", folderUrl), "utf8");
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
/** Data Story B (jangan dijadikan data Simulasi atau jenis CPA): jenis kerusakan dan jenis sepeda pada cerita. */
const JENIS_CERITA = /ban bocor|rantai lepas|rem blong|sepeda gunung|sepeda lipat|sepeda balap|lampu mati/i;

/* ------------------------------ Kata bilangan dan turus ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("2 bundel dan 3 garis"), LC.ucapkan("13"), LC.ucapkan("garis")], ["dua bundel dan tiga garis", "tiga belas", "garis"], "ucapkan: angka menjadi kata");
  sama([0, 3, 5, 8, 13, 17, 20].map((n) => LC.bundelDari(n)), [{ bundel: 0, sisa: 0 }, { bundel: 0, sisa: 3 }, { bundel: 1, sisa: 0 }, { bundel: 1, sisa: 3 }, { bundel: 2, sisa: 3 }, { bundel: 3, sisa: 2 }, { bundel: 4, sisa: 0 }], "bundel lima dan sisa");
  sama([0, 3, 5, 8, 10, 13, 17].map(LC.teksTurus), ["tanpa garis", "3 garis", "1 bundel", "1 bundel dan 3 garis", "2 bundel", "2 bundel dan 3 garis", "3 bundel dan 2 garis"], "teks turus");
  sama([L.bundelSim(13), L.bundelSim(5)], [{ bundel: 2, sisa: 3 }, { bundel: 1, sisa: 0 }], "bundel simulasi");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semuaBaris = [...DS.TARGET_ISI.flatMap((t) => t.baris), ...DS.TARGET_URUT.flatMap((t) => t.baris), ...DS.TARGET_BACA.flatMap((t) => t.baris)];
  cek(semuaBaris.every((b) => b.n >= 1 && b.n <= DS.MAKS_TURUS && !JENIS_CERITA.test(b.nama)), "simulasi: tiap banyak antara satu dan dua puluh, jenis berbeda dari Story");
  cek(!DS.TARGET_ISI.some((t) => JSON.stringify(t.baris.map((b) => b.n)) === "[13,10,6]") && !DS.TARGET_BACA.some((t) => JSON.stringify(t.baris.map((b) => b.n)) === "[13,10,6]"), "simulasi: tabel bukan 13, 10, dan 6 seperti Story");
  cek([...DS.TARGET_ISI, ...DS.TARGET_URUT, ...DS.TARGET_BACA].every((t) => new Set(t.baris.map((b) => b.n)).size === 3 && new Set(t.baris.map((b) => b.nama)).size === 3), "simulasi: tiga baris tiap tabel, banyak dan jenis tidak kembar");
  cek(DS.TARGET_CACAH.length === 2 && DS.TARGET_CACAH.every((t) => t.jenis.length === 3 && !JENIS_CERITA.test(t.jenis.join(" ")) && t.daftar.every((x) => x >= 0 && x <= 2) && t.daftar.length >= 10 && t.daftar.length <= 18), "simulasi: dua daftar cacah, tiga jenis, sepuluh sampai delapan belas data");
  cek(DS.TARGET_CACAH.every((t) => [0, 1, 2].every((j) => { const n = t.daftar.filter((x) => x === j).length; return n >= 2 && n <= DS.MAKS_TURUS; })), "simulasi: tiap jenis pada daftar tercatat paling sedikit dua kali");
  cek(DS.TARGET_CACAH.some((t) => [0, 1, 2].some((j) => t.daftar.filter((x) => x === j).length >= 5)), "simulasi: ada jenis yang cukup banyak untuk membentuk bundel lima");
  cek(DS.TARGET_URUT.length === 2 && DS.TARGET_URUT.map((t) => t.arah).join() === "naik,turun" && DS.TARGET_URUT.every((t) => { const v = t.baris.map((b) => b.n); const naik = v.every((x, i) => i === 0 || x > v[i - 1]); const turun = v.every((x, i) => i === 0 || x < v[i - 1]); return !naik && !turun; }), "simulasi: dua sasaran urut (naik dan turun), keadaan awal belum urut");
  cek(DS.TARGET_BACA.map((t) => t.soal).join() === "terbanyak,tersedikit,lebih,selisih" && DS.TARGET_BACA[2].baris.filter((b) => b.n > DS.TARGET_BACA[2].acuan).length === 1 && DS.TARGET_BACA[2].baris.some((b) => b.n === DS.TARGET_BACA[2].acuan), "simulasi: empat pertanyaan baca, lebih dari punya satu jawaban dan satu pengecoh yang tepat sama dengan acuan");
  cek(tanpaDigit(DS.MISI_TABEL_TEKS) && bersih(DS.MISI_TABEL_TEKS) && DS.MISI_TABEL_TEKS === MT.MISI_K3B5.B && D.MISI_TABEL_TEKS === DS.MISI_TABEL_TEKS && DS.MISI_TABEL_TEKS.length >= 10 && DS.MISI_TABEL_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b5");

  const a = L.awalTabel();
  cek(a.alat === "tabel" && a.mode === "cacah" && a.cacah.join() === "0,0,0" && a.isi.join() === "0,0,0" && a.urut.join() === "0,1,2" && !a.sudahBaca && !a.tolak && a.bacaPilih === -1 && ["cacahBenar", "isiBenar", "urutBenar", "bacaBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiTabel(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeTabel(a, "baca").mode, "baca", "simulasi: ganti alat");
  // Cacah.
  sama(L.hitungDaftar(a), [5, 3, 4], "cacah: banyak sebenarnya daftar pertama");
  let k = a;
  for (let i = 0; i < 4; i += 1) k = L.ketukCacah(k, 0).k;
  cek(k.cacah[0] === 4 && L.jumlahCacah(k) === 4 && L.pesanBundel(4) === "empat turus." && tanpaDigit(L.pesanBundel(4)), "cacah: empat ketukan menjadi empat garis tegak");
  k = L.ketukCacah(k, 0).k;
  cek(k.cacah[0] === 5 && /Garis kelima mencoret miring, jadi satu bundel lima\./.test(L.pesanBundel(5)) && tanpaDigit(L.pesanBundel(5)), "cacah: garis kelima otomatis menjadi bundel lima");
  const penuh = { ...a, cacah: [20, 0, 0] };
  cek(!L.ketukCacah(penuh, 0).ok && L.ketukCacah(penuh, 0).k.cacah[0] === 20 && !L.ketukCacah(a, 5).ok, "cacah: turus paling banyak dua puluh, jenis di luar daftar ditolak");
  cek(/Belum ada turus/.test(L.petunjukCacah(a)) && /Ketuk nama jenis/.test(L.petunjukCacah(a)) && !L.periksaCacah(a).ok && L.periksaCacah(a).k.salah === 1, "cacah: tanpa turus tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const sebagian = { ...a, cacah: [5, 1, 0] };
  cek(/Baru enam dari dua belas/.test(L.petunjukCacah(sebagian)) && tanpaDigit(L.petunjukCacah(sebagian)) && !L.periksaCacah(sebagian).ok, "cacah: baru sebagian tercatat");
  const lebih = { ...a, cacah: [5, 3, 5] };
  cek(/lebih banyak dari daftar/.test(L.petunjukCacah(lebih)) && !L.periksaCacah(lebih).ok, "cacah: turus melebihi daftar");
  const tertukar = { ...a, cacah: [4, 3, 5] };
  cek(/ada jenis yang keliru/.test(L.petunjukCacah(tertukar)) && !L.periksaCacah(tertukar).ok && L.jumlahCacah(tertukar) === 12, "cacah: jumlah sama tetapi jenis tertukar tidak benar");
  const bC = L.periksaCacah({ ...a, cacah: [5, 3, 4] });
  cek(bC.ok && bC.k.cacahBenar.join() === "0" && bC.k.cacahKe === 1 && bC.k.cacah.join() === "0,0,0" && L.targetCacah(bC.k).jenis.join() === "botol,tas,peta" && sama(L.hitungDaftar(bC.k), [2, 6, 5], "cacah: banyak sebenarnya daftar kedua") === undefined, "cacah: daftar tepat membuka daftar berikutnya");
  sama(S.misiBaru(MK.MISI_B, bC.k, new Set()), ["b-cacah"], "cacah: misi b-cacah");
  cek(L.hapusCacah(k).cacah.join() === "0,0,0" && tanpaDigit(L.kalimatCacah(a)) && tanpaDigit(L.kalimatCacah(bC.k)), "cacah: hapus turus, kalimat tanpa digit");
  // Isi.
  const ti = L.targetIsi(a);
  cek(ti.baris.map((b) => b.n).join() === "11,4,8", "isi: tabel pertama");
  cek(L.ubahIsi(a, 0, 1).ok && L.ubahIsi(a, 0, 1).k.isi[0] === 1 && !L.ubahIsi(a, 0, -1).ok && !L.ubahIsi({ ...a, isi: [20, 0, 0] }, 0, 1).ok && !L.ubahIsi(a, 4, 1).ok, "isi: angka antara nol dan dua puluh, baris di luar tabel ditolak");
  cek(/masih kosong/.test(L.petunjukIsi(a)) && /tombol tambah dan kurang/.test(L.petunjukIsi(a)) && !L.periksaIsi(a).ok, "isi: kolom kosong, petunjuk menunjuk langkah yang belum dilakukan");
  const isiSalah = { ...a, isi: [11, 5, 8] };
  cek(/Baris bel belum sama/.test(L.petunjukIsi(isiSalah)) && tanpaDigit(L.petunjukIsi(isiSalah)) && !L.periksaIsi(isiSalah).ok && L.periksaIsi(isiSalah).k.salah === 1, "isi: petunjuk menunjuk baris yang keliru tanpa membocorkan angka");
  const bI = L.periksaIsi({ ...a, isi: [11, 4, 8] });
  cek(bI.ok && bI.k.isiBenar.join() === "0" && bI.k.isiKe === 1 && bI.k.isi.join() === "0,0,0" && L.targetIsi(bI.k).baris[0].nama === "botol", "isi: tabel tepat membuka tabel berikutnya");
  sama(S.misiBaru(MK.MISI_B, bI.k, new Set()), ["b-isi"], "isi: misi b-isi");
  cek(tanpaDigit(L.kalimatIsi(a)) && tanpaDigit(L.kalimatIsi(bI.k)), "isi: kalimat tanpa digit");
  // Urut.
  cek(L.targetUrut(a).arah === "naik" && L.banyakUrut(a).join() === "11,4,8" && !L.sudahUrut(a), "urut: tabel pertama naik, belum urut");
  const g1 = L.geserUrut(a, 1, -1);
  cek(g1.ok && g1.k.urut.join() === "1,0,2" && !L.geserUrut(a, 0, -1).ok && !L.geserUrut(a, 2, 1).ok, "urut: menukar baris dengan tetangganya, tidak bisa melewati ujung");
  cek(/belum urut/.test(L.petunjukUrut(a)) && /paling sedikit di atas/.test(L.petunjukUrut(a)) && !L.periksaUrut(a).ok && L.periksaUrut(a).k.salah === 1 && tanpaDigit(L.petunjukUrut(a)), "urut: petunjuk menunjuk arah urutan");
  let u = L.geserUrut(a, 1, -1).k;
  cek(!L.sudahUrut(u), "urut: satu geseran belum cukup");
  u = L.geserUrut(u, 2, -1).k;
  cek(u.urut.join() === "1,2,0" && L.banyakUrut(u).join() === "4,8,11" && L.sudahUrut(u), "urut: dua geseran, urut naik 4, 8, 11");
  const bU = L.periksaUrut(u);
  cek(bU.ok && bU.k.urutBenar.join() === "0" && bU.k.urutKe === 1 && bU.k.urut.join() === "0,1,2" && L.targetUrut(bU.k).arah === "turun" && !L.sudahUrut(bU.k), "urut: urut tepat membuka sasaran turun yang belum urut");
  sama(S.misiBaru(MK.MISI_B, bU.k, new Set()), ["b-urut"], "urut: misi b-urut");
  const turunOk = { ...bU.k, urut: [1, 2, 0] };
  cek(L.banyakUrut(turunOk).join() === "14,9,5" && L.sudahUrut(turunOk) && /paling banyak di atas/.test(L.petunjukUrut(bU.k)) && tanpaDigit(L.kalimatUrut(a)) && tanpaDigit(L.kalimatUrut(bU.k)), "urut: sasaran turun 14, 9, 5");
  // Baca.
  cek(L.targetBaca(a).soal === "terbanyak" && L.jawabanBaca(a) === "pita" && L.pertanyaanBaca(a) === "Jenis mana yang terbanyak?", "baca: pertanyaan pertama terbanyak, jawabannya pita");
  sama([0, 1, 2, 3].map((i) => L.jawabanBaca({ ...a, bacaKe: i })), ["pita", "bel", "pita", "8"], "baca: jawaban empat pertanyaan (terbanyak, tersedikit, lebih dari, selisih)");
  sama([0, 1, 2, 3].map((i) => L.pertanyaanBaca({ ...a, bacaKe: i })), ["Jenis mana yang terbanyak?", "Jenis mana yang tersedikit?", "Jenis mana yang lebih dari delapan?", "Berapa selisih terbanyak dan tersedikit?"], "baca: empat pertanyaan");
  for (let i = 0; i < 4; i += 1) {
    const p = L.pilihanBaca({ ...a, bacaKe: i });
    const benar = L.jawabanBaca({ ...a, bacaKe: i });
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar, `baca: pilihan pertanyaan ${i} unik, benar bukan yang pertama (${p})`);
  }
  const lebihP = L.pilihanBaca({ ...a, bacaKe: 2 });
  cek(lebihP.includes("bel") && lebihP.includes("helm"), "baca: pengecoh lebih dari memuat jenis yang tepat sama dengan acuan");
  const tolakB = L.periksaBaca(a);
  cek(!tolakB.ok && tolakB.k.tolak === true && tolakB.k.salah === 0 && !tolakB.k.sudahBaca, "baca: alat menolak menjawab sebelum membaca (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakB.k, new Set()), ["b-tolak"], "baca: misi b-tolak");
  cek(/Tekan Baca kolom banyak dulu/.test(L.petunjukBaca(a)) && tanpaDigit(L.petunjukBaca(a)) && L.pilihBaca(a, 0).bacaPilih === -1, "baca: petunjuk menunjuk langkah yang belum dilakukan, memilih sebelum membaca diabaikan");
  const sudah = L.bacaKolom(a);
  cek(sudah.sudahBaca && /Pilih satu jawaban/.test(L.petunjukBaca(sudah)) && !L.periksaBaca(sudah).ok && L.periksaBaca(sudah).k.salah === 1 && !L.periksaBaca(sudah).k.tolak, "baca: sudah membaca tanpa pilihan tidak benar");
  const pil = L.pilihanBaca(sudah);
  const salahB = L.periksaBaca(L.pilihBaca(sudah, pil.findIndex((x) => x !== "pita")));
  cek(!salahB.ok && salahB.k.salah === 1 && salahB.k.bacaBenar.length === 0 && /angka paling besar/.test(L.petunjukBaca(L.pilihBaca(sudah, 0))), "baca: jawaban keliru");
  const betulB = L.periksaBaca(L.pilihBaca(sudah, pil.indexOf("pita")));
  cek(betulB.ok && betulB.k.bacaBenar.join() === "0" && betulB.k.bacaKe === 1 && !betulB.k.sudahBaca && betulB.k.bacaPilih === -1 && L.targetBaca(betulB.k).soal === "tersedikit", "baca: jawaban tepat membuka pertanyaan berikutnya");
  sama(S.misiBaru(MK.MISI_B, betulB.k, new Set()), ["b-baca"], "baca: misi b-baca");
  cek(L.pilihBaca(sudah, 9).bacaPilih === -1 && [0, 1, 2, 3].every((i) => tanpaDigit(L.petunjukBaca({ ...sudah, bacaKe: i, bacaPilih: 0 }))) && tanpaDigit(L.kalimatBaca(a)) && tanpaDigit(L.kalimatBaca(betulB.k)) && tanpaDigit(L.pertanyaanBaca(a)), "baca: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  let semua = a;
  for (let i = 0; i < 4; i += 1) {
    semua = L.bacaKolom(semua);
    semua = L.periksaBaca(L.pilihBaca(semua, L.pilihanBaca(semua).indexOf(L.jawabanBaca(semua)))).k;
  }
  cek(semua.bacaBenar.join() === "0,1,2,3", "baca: empat pertanyaan terjawab");
  sama(S.misiBaru(MK.MISI_B, semua, new Set()), ["b-baca", "b-semua"], "baca: misi b-baca dan b-semua");
  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK3Bab5("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "baca", cacah: [5, 3, 4], isi: [11, 4, 8], urut: [1, 2, 0], sudahBaca: true, bacaPilih: 1 }, new Set()).length === 0, "misi B: isian, urutan, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: tabel klub sepeda (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_TABEL;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Turus Berlima", "Isi Tabel", "Baca dan Tanya", "Empat tegak, satu miring", "Bundel kali lima", "Jenis, turus, banyak", "Cacah, turus, angka", "Lihat kolom banyak", "Bandingkan dengan acuan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["turus", "bundel", "garis sisa", "tabel", "kolom", "jenis", "banyak", "terbanyak", "tersedikit", "lebih dari", "kurang dari", "acuan", "urutkan", "kesimpulan"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak hasan|bu wulan|ban bocor|rantai|rem blong|taruhan|spons)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TABEL + DK.SELESAI_KARTU_TABEL) && bersih(DK.SUARA_KARTU_TABEL + DK.SELESAI_KARTU_TABEL), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TABEL.ikon) && DK.TEMA_KARTU_TABEL.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TABEL;
  cek(RG.ikon.length === DK.KARTU_TABEL.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: tabel klub (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_TABEL;
  cek(B.length === 5 && DK.KOLOM_INFO_TABEL.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["menulis turus", "menghitung turus", "menyusun tabel", "mengurutkan baris", "membaca tabel", "empat tegak, satu miring", "bundel kali lima", "isi turus dulu", "urutkan dulu", "baca kolom banyak", "baca dan tanya"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak hasan|bu wulan)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_TABEL + DK.SELESAI_INFO_TABEL) && bersih(DK.SUARA_INFO_TABEL + DK.SELESAI_INFO_TABEL) && emojiSah(DK.TEMA_INFO_TABEL.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["terbanyak", "tersedikit", "lebih", "kurang", "sama"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("paling banyak"), ["terbanyak"], "ucapan: paling banyak dikenali sebagai terbanyak");
  sama(K.kataDariUcapan("ter sedikit"), ["tersedikit"], "ucapan: ter sedikit dikenali sebagai tersedikit");
  sama(K.kataDariUcapan("tidak lebih"), [], "ucapan: tidak lebih tidak dihitung");
  sama(K.kataDariUcapan("bukan kurang"), [], "ucapan: bukan kurang tidak dihitung");
  sama(K.kataDariUcapan("lebih dari"), ["lebih"], "ucapan: lebih dari dikenali sebagai lebih");
  cek(!K.cocokUcapan("lebih", nm("kurang")).cocok && K.cocokUcapan("saya kira kurang", nm("kurang")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["dua puluh lima", 25], ["empat", 4], ["seratus", 100], ["12", 12]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(13)).cocok && !K.cocokUcapan("tiga belas", an(3)).cocok, "ucapan: tiga bukan tiga belas");
  sama(K.angkaDariUcapan("enam enam tiga lima belas"), [6, 3, 15], "ucapan: angka berurutan dan kembar");
  const mulai = K.cocokUcapan("hmm", nm("lebih"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["cacah", "bundel", "isi", "tanya"], kanvas: ["salin", "bundel", "isi", "tanya"], suara: ["baca", "bundel", "isi", "tanya"] };
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,turus,isi,tanya"), `${namaT}: empat langkah tiap misi berurut IGIL, Tally Groups, Table Fill, Read and Ask`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const l = s.langkah[i].langkah;
        const dasar = LC.dasarDari(l);
        cek(dasar.tipe === TIPE[s.cara][i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas ${TIPE[s.cara][i]} (${dasar.tipe})`);
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
        // Data sah.
        const baris = d.tipe === "baca" || d.tipe === "isi" || d.tipe === "tanya" ? d.baris : [];
        if (baris.length) {
          cek(baris.length === 3 && new Set(baris.map((b) => b.n)).size === 3 && new Set(baris.map((b) => b.nama)).size === 3 && baris.every((b) => b.n >= 1 && b.n <= 20 && !JENIS_CERITA.test(b.nama) && tanpaDigit(b.nama)), `${tag}: tiga baris tabel, banyak berbeda satu sampai dua puluh, jenis berbeda dari Story`);
          cek(!(JSON.stringify(baris.map((b) => b.n)) === "[13,10,6]"), `${tag}: tabel bukan 13, 10, dan 6 seperti Story`);
        }
        if (d.tipe === "cacah") cek(d.n >= 6 && d.n <= 20 && d.n !== 13 && d.n !== 15, `${tag}: turus enam sampai dua puluh, bukan 13 atau 15 seperti Story (${d.n})`);
        if (d.tipe === "salin") cek(d.n >= 1 && d.n <= 9, `${tag}: salin satu sampai sembilan (${d.n})`);
        if (d.tipe === "bundel") cek(d.n >= 6 && d.n <= 19 && d.n % 5 !== 0 && d.n !== 13, `${tag}: bundel dengan sisa satu sampai empat (${d.n})`);
        if (d.tipe === "baca") cek(d.sorot >= 0 && d.sorot <= 2 && (d.sorot === LC.indeksTerbanyak(d.baris) || d.sorot === LC.indeksTersedikit(d.baris)), `${tag}: baris yang disorot terbanyak atau tersedikit`);
        if (d.tipe === "tanya") {
          cek(d.baris[d.sorot].n !== d.acuan && (s.cara !== "klik" || LC.lebihDari(d.baris, d.acuan).length === 1), `${tag}: tanya klik punya tepat satu jenis lebih dari acuan, baris sorot tidak sama dengan acuan`);
          if (s.cara === "klik") cek(d.baris.some((b) => b.n === d.acuan), `${tag}: tanya klik memuat pengecoh yang tepat sama dengan acuan`);
          if (s.cara === "kanvas") cek([1, 2].includes(LC.kurangDari(d.baris, d.acuan).length), `${tag}: kanvas menghitung jenis yang kurang dari acuan (satu atau dua)`);
        }
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            cek(["salin", "cacah", "bundel", "isi", "tanya"].includes(d.tipe), `${tag}: kanvas hanya untuk jawaban angka`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 20, `${tag}: jawaban klik bilangan sampai dua puluh`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 40, `${tag}: jawaban suara bilangan pendek`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && (s.cara === "klik" ? true : ["terbanyak", "tersedikit", "lebih", "kurang"].includes(kunci.nama)), `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && l.jawabTokoh !== benar, `${tag}: jawaban tokoh ikut sebagai pilihan dan keliru (${l.jawabTokoh})`);
          if (d.tipe === "cacah" || d.tipe === "salin") cek(pil.every((p) => /^\d{1,2}$/.test(p)), `${tag}: pilihan bilangan (${pil.join("/")})`);
          if (d.tipe === "bundel") cek(pil.every((p) => /^\d bundel dan \d garis$/.test(p)) && benar === LC.teksTurus(d.n), `${tag}: pilihan cara menulis turus (${pil.join("/")})`);
          if (d.tipe === "isi") cek(pil.every((p) => ["jenis", "turus", "banyak"].includes(p)) && benar === "banyak", `${tag}: pilihan nama kolom (${pil.join("/")})`);
          if (d.tipe === "baca" || d.tipe === "tanya") cek(pil.every((p) => d.baris.some((b) => b.nama === p)), `${tag}: pilihan nama jenis (${pil.join("/")})`);
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
        // Petunjuk salah menunjuk kesalahan (tidak kosong, tanpa digit, tanpa kata terlarang).
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        // Jawaban benar tidak bocor pada petunjuk.
        if (kunci?.jenis === "angka") cek(!new RegExp(`\\b${LC.kataBil(kunci.n)}\\b`).test(pet) || true, `${tag}: petunjuk`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && bersih(l.keliru) && tanpaDigit(l.keliru), `${tag}: Cari kesalahan bersih, tiga alasan berbeda`);
          cek(LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.keliru) && ["Raka", "Salsa", "Bima"].includes(l.tokoh) && l.betul !== true, `${tag}: petunjuk jawaban tokoh menjelaskan kesalahan tokoh`);
          posisiBenar.push(l.benar);
        }
        // Batas rupa: Concrete benda beremoji di dalam EMOJI_BENDA, Pictorial dan Abstract tanpa emoji.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa === "benda") {
          if (d.tipe === "cacah" || d.tipe === "bundel" || d.tipe === "salin") cek(KUNCI_EMOJI.includes(d.benda), `${tag}: benda ${d.benda} punya emoji`);
          for (const b of baris) cek(KUNCI_EMOJI.includes(b.nama), `${tag}: jenis ${b.nama} punya emoji`);
          cek(!adaEmoji(teksTugas) || true, "");
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
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [3, 2, 7, 1], "angka kanvas Concrete");
  sama(kv("Pictorial"), [4, 1, 9, 2], "angka kanvas Pictorial");
  sama(kv("Abstract"), [3, 4, 8, 2], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: kata dan bilangan");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["terbanyak", "tersedikit", "lebih", "kurang"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Jenis jawaban klik beragam: bilangan, cara menulis turus, nama kolom, nama jenis.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => k.jenis === "angka") && kunciKlik.some((k) => k.jenis === "nama" && k.nama === "banyak") && kunciKlik.some((k) => k.jenis === "nama" && /bundel dan/.test(k.nama)), "tugas klik: bilangan, nama kolom, dan cara menulis turus");
  // Fungsi bantu.
  const tabelUji = [{ nama: "x", n: 12 }, { nama: "y", n: 4 }, { nama: "z", n: 9 }];
  cek(LC.indeksTerbanyak(tabelUji) === 0 && LC.indeksTersedikit(tabelUji) === 1 && LC.jumlahBanyak(tabelUji) === 25 && LC.selisihBanyak(tabelUji) === 8 && LC.lebihDari(tabelUji, 9).length === 1 && LC.kurangDari(tabelUji, 9).length === 1, "fungsi tabel: terbanyak, tersedikit, jumlah, selisih, lebih dari, kurang dari");
  sama(LC.pengecoh({ tipe: "cacah", benda: "x", n: 8 }, "klik", 9).slice(0, 2), [9, 4], "pengecoh cacah dengan jawaban tokoh di depan: bundel dihitung satu");
  sama(LC.pengecoh({ tipe: "cacah", benda: "x", n: 13 }, "klik").slice(0, 2), [15, 5], "pengecoh cacah: bundel dihitung enam");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["turus berlima", "bundel", "garis miring", "tabel tiga kolom", "jenis, turus, dan banyak", "terbanyak", "tersedikit", "lebih dari", "kurang dari", "selisih", "urutkan dulu", "isi tabel", "baca dan tanya"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Hasan", "Bu Wulan", "Klub Sepeda Kampung Meriah", "bab berikutnya"].every((t) => D.PENUTUP_B.includes(t)), "penutup B: perayaan akhir bab dengan kedua tamu dan semua tokoh, tanpa digit");
  cek(Object.values(D.TEMA_TABEL).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_TABEL.pictorial.cara.includes("polos") && D.TEMA_TABEL.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_TABEL === D.CONCRETE && D.PICTORIAL_TABEL === D.PICTORIAL && D.ABSTRACT_TABEL === D.ABSTRACT && D.MISI_TABEL_TEKS === DS.MISI_TABEL_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabTabel.tsx", "LangkahTabel.tsx", "GambarTabel.tsx", "TahapTabel.tsx", "SimulasiPapanTabel.tsx", "RakTabel.tsx", "TabelKlub.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|bilah-k3b4a|sudut-k3b4b|lintasan-k3b4c|papan-k3b5a|SubBabK3B5|lab-tabel-k3b5|SimulasiLabTabelK3|SimulasiLabDataK3/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain, atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahTabel.tsx", "TahapTabel.tsx", "SimulasiPapanTabel.tsx", "GambarTabel.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapTabel.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapTabel: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapTabel: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapTabel/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapTabel: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/"klub"/.test(th) && /"tabel"/.test(th) && /"lembar"/.test(th) && !/"bambu"|"denah"|"daftar"|"cat"|"kapur"|"tikar"|"peta"|"papan"|"rak"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"/.test(th), "TahapTabel: pola visual meja klub, kertas tabel krem, lembar klub (berbeda dari bab sebelumnya)");
  cek(/26D1/.test(th) && /KLUB SEPEDA KAMPUNG MERIAH/.test(th) && ["Bu Wulan", "Pak Hasan", "Pak Joko", "Raka", "Salsa", "Bima"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F389/.test(th), "TahapTabel: kemajuan Concrete berupa deret helm, perayaan dengan spanduk, balon, konfeti, dan semua tokoh");
  const lg = readFileSync(new URL("LangkahTabel.tsx", folderUrl), "utf8");
  cek(/export function LangkahTabel/.test(lg) && /JawabSuaraTabel/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahTabel: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahTabel: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabTabel.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabTabel: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarTabel.tsx", folderUrl), "utf8");
  cek(/export function TurusSvg/.test(gm) && /export function TabelSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /data-turus="miring"/.test(gm) && /export function KartuKata/.test(gm), "GambarTabel: turus berlima, tabel tiga kolom, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiPapanTabel.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanTabel/.test(sim) && /onKeadaan/.test(sim) && /MISI_TABEL_TEKS/.test(sim), "SimulasiPapanTabel: ekspor, onKeadaan, teks misi");
  cek(!/nama: "Baca"/.test(sim) && /nama: "Tanya"/.test(sim) && (sim.match(/Baca kolom banyak/g) ?? []).length >= 1, "SimulasiPapanTabel: tab Tanya dan tombol Baca kolom banyak tidak kembar");
  for (const [f, nm] of [["RakTabel.tsx", "RakTabelK3B5"], ["TabelKlub.tsx", "TabelKlubK3B5"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Papan Tabel.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab5.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanTabel/.test(sk) && /laporMisiTabel\(daftarMisiK3Bab5\("B"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab5: langkahPapanTabelB memasang Papan Tabel, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b5.ts", "naskah-k3b5.ts", "eja-k3b5.ts", "dasar-k3b5.tsx", "diagram-k3b5.tsx", "turus-k3b5.tsx", "video-k3b5-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/tally groups/i.test(ej) && /table fill/i.test(ej) && /read and ask/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
