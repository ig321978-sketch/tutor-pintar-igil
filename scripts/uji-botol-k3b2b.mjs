// Uji Mind-map (Pos Jaga), Infografis (Catatan Persediaan), Simulasi Pos Persediaan, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 2 Sub-Bab B ("Botol Air Pak Darto"),
// akhir cerita Perkemahan Akhir Pekan.
// Memeriksa: logika simulasi (bagikan, dikurangkan, awal, periksa, pasangan), misi (awal tidak memenuhi, wajib empat, bebas dua),
// pos jaga (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), catatan persediaan dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris, perayaan akhir cerita bab.
// Jalankan: node --no-warnings scripts/uji-botol-k3b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/botol-k3b2b/logika.ts");
const DS = await import("../src/components/modul/botol-k3b2b/data-sim.ts");
const DK = await import("../src/components/modul/botol-k3b2b/data-kartu.ts");
const LC = await import("../src/components/modul/botol-k3b2b/logika-cpa.ts");
const D = await import("../src/components/modul/botol-k3b2b/data.ts");
const K = await import("../src/components/modul/botol-k3b2b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k3b2.ts");
const folderUrl = new URL("../src/components/modul/botol-k3b2b/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Bilangan yang dipakai Story B (tidak boleh dipakai sebagai data CPA dan Simulasi). */
const CERITA = new Set([90, 35, 55, 40, 28, 68, 100, 45, 60, 27, 72, 80, 32, 48]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 101, 110, 205, 316, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu", "seratus sepuluh", "dua ratus lima", "tiga ratus enam belas", "sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BP = DS.BARANG_POS;
  cek(BP.length === 3 && new Set(BP.map((b) => b.id)).size === 3 && new Set(BP.map((b) => b.emoji)).size === 3, "simulasi: tiga benda persediaan unik");
  for (const b of BP) cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama) && b.satuan.length === 2 && b.satuan.every((x) => tanpaDigit(x) && bersih(x) && x.length >= 3), `${b.id}: emoji dan nama sah, dua satuan`);
  cek(!/botol|biskuit/i.test(BP.map((b) => b.nama).join(" ")), "simulasi: benda berbeda dari Story (botol, biskuit)");
  cek(DS.TARGET_BAGIKAN.length === 3 && DS.TARGET_BAGIKAN.every((t) => t.awal <= 100 && t.sisa < t.awal && !CERITA.has(t.awal) && !CERITA.has(t.sisa) && !CERITA.has(t.awal - t.sisa)), "simulasi: tiga sasaran bagikan, bilangan berbeda dari Story");
  cek(DS.TARGET_KURANG.length === 3 && DS.TARGET_KURANG.every((t) => t.awal <= 100 && t.sisa < t.awal && !CERITA.has(t.awal) && !CERITA.has(t.sisa) && !CERITA.has(t.awal - t.sisa)), "simulasi: tiga kalimat dikurangkan, bilangan berbeda dari Story");
  cek(DS.TARGET_AWAL.length === 3 && DS.TARGET_AWAL.every((t) => t.kurang + t.sisa <= 99 && !CERITA.has(t.kurang) && !CERITA.has(t.sisa) && !CERITA.has(t.kurang + t.sisa)), "simulasi: tiga kalimat awal, bilangan berbeda dari Story");
  cek(DS.TARGET_PERIKSA.length === 3 && DS.TARGET_PERIKSA.every((t) => t.awal <= 100 && !CERITA.has(t.awal) && !CERITA.has(t.kurang) && !CERITA.has(t.sisa)), "simulasi: tiga catatan periksa, bilangan berbeda dari Story");
  cek(DS.TARGET_PERIKSA.filter((t) => t.awal - t.kurang === t.sisa).length === 2 && DS.TARGET_PERIKSA.filter((t) => t.awal - t.kurang !== t.sisa).length === 1, "simulasi: dua catatan cocok dan satu tidak cocok");
  cek(DS.AWAL_PASANGAN === 100, "simulasi: pasangan untuk seratus");
  cek(tanpaDigit(DS.MISI_PERSEDIAAN_TEKS) && bersih(DS.MISI_PERSEDIAAN_TEKS) && DS.MISI_PERSEDIAAN_TEKS === MT.MISI_K3B2.B && D.MISI_PERSEDIAAN_TEKS === DS.MISI_PERSEDIAAN_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b2");
  cek(tanpaDigit(MT.MISI_K3B2.B) && MT.hurufK3B2("B") === "B" && MT.misiAwalK3Bab2("B").includes(MT.MISI_K3B2.B), "misi-teks: misi awal B memuat teks misi tanpa digit");

  const a = L.awalPersediaan();
  cek(a.alat === "persediaan" && a.mode === "bagikan" && a.dibagikan === 0 && a.bagikanBenar.length === 0 && a.kurangBenar.length === 0 && a.awalBenar.length === 0 && a.periksaBenar.length === 0 && a.pasangan.length === 0, "simulasi: keadaan awal kosong");
  // Bagikan.
  const t0 = L.targetBagikan(a);
  sama([t0.awal, t0.sisa, L.sisaBagikan(a)], [57, 34, 57], "bagikan: sasaran pertama");
  let b = a;
  b = L.bagikanBenda(L.bagikanBenda(b, 10).k, 10).k;
  cek(b.dibagikan === 20 && L.sisaBagikan(b) === 37, "bagikan: dua krat sepuluh");
  const salahBg = L.periksaBagikan(b);
  cek(!salahBg.ok && salahBg.k.salah === 1 && salahBg.k.bagikanBenar.length === 0 && /lebih banyak/.test(L.petunjukBagikan(b)) && tanpaDigit(L.petunjukBagikan(b)), "bagikan: sisa terlalu banyak dinyatakan keliru dengan petunjuk");
  const kebanyakan = L.periksaBagikan({ ...a, dibagikan: 40 });
  cek(!kebanyakan.ok && /terlalu sedikit/.test(L.petunjukBagikan({ ...a, dibagikan: 40 })), "bagikan: sisa terlalu sedikit");
  b = L.bagikanBenda(L.bagikanBenda(L.bagikanBenda(b, 1).k, 1).k, 1).k;
  const bBg = L.periksaBagikan(b);
  cek(b.dibagikan === 23 && bBg.ok && bBg.k.bagikanBenar.join() === "0" && bBg.k.bagikanKe === 1 && bBg.k.dibagikan === 0 && L.targetBagikan(bBg.k).awal === 82, "bagikan: sisa tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_B, bBg.k, new Set()), ["b-bagikan"], "bagikan: misi b-bagikan");
  cek(!L.bagikanBenda({ ...a, dibagikan: 50 }, 10).ok && L.bagikanBenda({ ...a, dibagikan: 47 }, 10).ok && !L.bagikanBenda(a, 0).ok, "bagikan: tidak melebihi isi rak");
  cek(L.kembalikanBagikan(b).dibagikan === 0 && tanpaDigit(L.kalimatBagikan(a)) && tanpaDigit(L.kalimatBagikan(bBg.k)) && /lima puluh tujuh/.test(L.kalimatBagikan(a)), "bagikan: kembalikan dan kalimat tanpa digit");
  // Dikurangkan.
  sama([L.jawabKurang(a), L.targetKurang(a).awal, L.targetKurang(a).sisa], [47, 93, 46], "dikurangkan: sasaran pertama");
  let kr = L.pilihModePersediaan(a, "kurang");
  kr = L.ubahKurang(L.ubahKurang(kr, 0, 1).k, 1, 1).k;
  const salahK = L.periksaKurang(kr);
  cek(!salahK.ok && salahK.k.salah === 1 && salahK.k.kurangBenar.length === 0 && /awal dikurangi sisa/.test(L.petunjukKurang(kr)) && tanpaDigit(L.petunjukKurang(kr)), "dikurangkan: isian keliru dengan petunjuk awal dikurangi sisa");
  cek(/lebih besar daripada bilangan awal/.test(L.petunjukKurang({ ...a, kurang: [9, 9] })), "dikurangkan: petunjuk bila lebih besar daripada awal");
  kr = { ...kr, kurang: [4, 7] };
  const bK = L.periksaKurang(kr);
  cek(bK.ok && bK.k.kurangBenar.join() === "0" && bK.k.kurangKe === 1 && bK.k.kurang.join() === "0,0" && L.jawabKurang(bK.k) === 26, "dikurangkan: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_B, bK.k, new Set()), ["b-kurang"], "dikurangkan: misi b-kurang");
  cek(!L.ubahKurang(a, 0, -1).ok && !L.ubahKurang({ ...a, kurang: [9, 0] }, 0, 1).ok && !L.ubahKurang(a, 5, 1).ok && L.ubahKurang(a, 1, 1).k.kurang.join() === "0,1", "dikurangkan: angka nol sampai sembilan");
  let tiga = a;
  for (let i = 0; i < 3; i += 1) {
    const j = L.jawabKurang(tiga);
    tiga = L.periksaKurang({ ...tiga, kurang: [Math.floor(j / 10), j % 10] }).k;
  }
  cek(tiga.kurangBenar.join() === "0,1,2" && S.misiBaru(MK.MISI_B, tiga, new Set()).includes("b-lengkap"), "dikurangkan: tiga kalimat memenuhi b-lengkap");
  cek(tanpaDigit(L.kalimatKurang(a)) && tanpaDigit(L.kalimatKurang(bK.k)), "dikurangkan: kalimat tanpa digit");
  // Awal.
  sama([L.jawabAwal(a), L.targetAwal(a).kurang, L.targetAwal(a).sisa], [81, 29, 52], "awal: sasaran pertama");
  const salahA = L.periksaAwal({ ...a, awal: [2, 3] });
  cek(!salahA.ok && salahA.k.salah === 1 && /menambah, bukan dikurangkan/.test(L.petunjukAwal({ ...a, awal: [2, 3] })) && /tambah/.test(L.petunjukAwal({ ...a, awal: [9, 9] })) && tanpaDigit(L.petunjukAwal(a)), "awal: isian keliru (lebih kecil daripada sisa) dengan petunjuk menambah");
  const bA = L.periksaAwal({ ...a, awal: [8, 1] });
  cek(bA.ok && bA.k.awalBenar.join() === "0" && bA.k.awalKe === 1 && L.jawabAwal(bA.k) === 77, "awal: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_B, bA.k, new Set()), ["b-awal"], "awal: misi b-awal");
  cek(!L.periksaAwal({ ...a, awal: [2, 9] }).ok && L.ubahAwal(a, 0, 1).k.awal.join() === "1,0" && tanpaDigit(L.kalimatAwal(a)), "awal: ubah angka dan kalimat tanpa digit");
  // Periksa.
  const tp = L.targetPeriksa(a);
  cek(tp.awal === 86 && L.hasilPengurangan(a) === 49 && L.catatanCocok(a) && L.catatanCocok({ ...a, periksaKe: 2 }) && !L.catatanCocok({ ...a, periksaKe: 1 }), "periksa: hasil pengurangan dan kecocokan dihitung dari data");
  cek(!L.periksaPeriksa(a).ok && /pilih/i.test(L.petunjukPeriksa(a)), "periksa: tanpa pilihan tidak benar");
  const salahPr = L.periksaPeriksa(L.pilihPeriksa(a, 1));
  cek(!salahPr.ok && salahPr.k.salah === 1 && /dikurangi/.test(L.petunjukPeriksa(L.pilihPeriksa(a, 1))) && tanpaDigit(L.petunjukPeriksa(L.pilihPeriksa(a, 1))), "periksa: memilih tidak cocok untuk catatan yang cocok keliru");
  const bPr = L.periksaPeriksa(L.pilihPeriksa(a, 0));
  cek(bPr.ok && bPr.k.periksaBenar.join() === "0" && bPr.k.periksaKe === 1 && bPr.k.periksaPilih === -1, "periksa: memilih cocok untuk catatan yang cocok benar");
  cek(L.periksaPeriksa(L.pilihPeriksa({ ...a, periksaKe: 1 }, 1)).ok && !L.periksaPeriksa(L.pilihPeriksa({ ...a, periksaKe: 1 }, 0)).ok, "periksa: catatan yang tidak cocok dijawab tidak cocok");
  sama(S.misiBaru(MK.MISI_B, bPr.k, new Set()), ["b-periksa"], "periksa: misi b-periksa");
  cek(L.pilihPeriksa(a, 7).periksaPilih === -1 && tanpaDigit(L.kalimatPeriksa(bPr.k)), "periksa: pilihan di luar daftar diabaikan");
  // Pasangan.
  let ps = L.pilihModePersediaan(a, "pasangan");
  cek(!L.catatPasangan(ps).ok && L.catatPasangan(ps).alasan === "kosong", "pasangan: nol terjual tidak dicatat");
  ps = L.ubahTerjual(L.ubahTerjual(ps, 0, 1).k, 1, 1).k;
  sama([L.banyakTerjual(ps), L.sisaPasangan(ps)], [11, 89], "pasangan: terjual dan sisa seratus");
  const c1 = L.catatPasangan({ ...ps, terjual: [3, 0] });
  cek(c1.ok && c1.k.pasangan.join() === "30" && L.catatPasangan(c1.k).alasan === "kembar", "pasangan: pasangan dicatat, kembar ditolak");
  const c2 = L.catatPasangan({ ...c1.k, terjual: [6, 5] });
  cek(c2.ok && c2.k.pasangan.join() === "30,65" && S.misiBaru(MK.MISI_B, c2.k, new Set()).join() === "b-pasangan", "pasangan: dua pasangan memenuhi b-pasangan");
  cek(!L.catatPasangan({ ...a, terjual: [9, 9] }).ok === false && L.sisaPasangan({ ...a, terjual: [9, 9] }) === 1 && !L.ubahTerjual({ ...a, terjual: [9, 9] }, 0, 1).ok && tanpaDigit(L.kalimatPasangan(a)) && tanpaDigit(L.kalimatPasangan(ps)), "pasangan: batas angka dan kalimat tanpa digit");
  cek(L.pilihBarangPos(a, 2).barang === 2 && L.pilihBarangPos(a, 9).barang === 0 && L.satuanBarangPos(L.pilihBarangPos(a, 1))[1] === "kotak", "barang: pilih benda persediaan");
  cek(L.pilihModePersediaan(a, "periksa").mode === "periksa", "mode: ganti alat");
  cek(L.mulaiLagiPersediaan().kurangKe === 0 && L.mulaiLagiPersediaan().pasangan.length === 0, "mulai lagi: kembali ke awal");
  // Misi.
  const B = MK.MISI_B;
  cek(B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(B.map((m) => m.id)).size === 6 && B.every((m) => m.id.startsWith("b-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi B: id berawalan b-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab2("B"), B, "daftarMisiK3Bab2 B");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "pasangan", barang: 1, dibagikan: 30, kurang: [4, 7], awal: [8, 1], periksaPilih: 0, terjual: [3, 0] }, new Set()).length === 0, "misi B: isian yang belum diperiksa dan benda di rak tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: pos jaga (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_BOTOL;
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
  for (const m of ["Keluarga Fakta", "Menghitung Naik", "Garis Bilangan", "Awal dikurangi sisa", "Dikurangkan ditambah sisa", "Gambar bagan", "Kurangkan lagi", "Cari pasangan", "Tulis titik-titik"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["kalimat matematika", "titik-titik", "bilangan yang dikurangkan", "bilangan awal", "bagan", "cocok dengan sisa", "banyak kemungkinan", "dua kalimat tambah dan dua kalimat kurang", "puluhan terdekat", "lompatan", "sisanya"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak darto|kak rina|botol|biskuit|ransel|kemah|hutan)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_BOTOL + DK.SELESAI_KARTU_BOTOL) && bersih(DK.SUARA_KARTU_BOTOL + DK.SELESAI_KARTU_BOTOL), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_BOTOL.ikon) && DK.TEMA_KARTU_BOTOL.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_BOTOL;
  cek(RG.ikon.length === DK.KARTU_BOTOL.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: catatan persediaan (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_BOTOL;
  cek(B.length === 5 && DK.KOLOM_INFO_BOTOL.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["kalimat titik-titik", "mencari yang dikurangkan", "mencari bilangan awal", "memeriksa hasil", "hanya awal diketahui", "awal dikurangi sisa", "dikurangkan ditambah sisa", "kurangkan lagi", "cocok dengan sisa", "cari pasangan", "banyak kemungkinan"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak darto|kak rina)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_BOTOL + DK.SELESAI_INFO_BOTOL) && bersih(DK.SUARA_INFO_BOTOL + DK.SELESAI_INFO_BOTOL) && emojiSah(DK.TEMA_INFO_BOTOL.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["tambah", "kurang", "bagi", "mundur", "maju", "diam"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("dikurangi"), ["kurang"], "ucapan: dikurangi berarti kurang");
  sama(K.kataDariUcapan("menambahkan"), ["tambah"], "ucapan: menambahkan berarti tambah");
  sama(K.kataDariUcapan("ke belakang"), ["mundur"], "ucapan: ke belakang berarti mundur");
  sama(K.kataDariUcapan("tidak kurang"), [], "ucapan: tidak kurang tidak dihitung");
  sama(K.kataDariUcapan("bukan tambah"), [], "ucapan: bukan tambah tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("tambah", nm("kurang")).cocok && !K.cocokUcapan("maju", nm("mundur")).cocok && !K.cocokUcapan("bagi", nm("tambah")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("lima puluh lima"), [55], "angka: lima puluh lima");
  sama(K.angkaDariUcapan("tiga belas"), [13], "angka: tiga belas");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("sembilan puluh sembilan"), [99], "angka: sembilan puluh sembilan");
  sama(K.angkaDariUcapan("47"), [47], "angka: 47 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 100; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("empat puluh tiga", an(43)).cocok && !K.cocokUcapan("empat puluh tiga", an(3)).cocok && !K.cocokUcapan("empat puluh", an(43)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "fakta", "naik", "garis"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Awal Dikurangi Sisa, Dikurangkan Ditambah Sisa") && LC.NAMA_METODE.fakta.includes("Fact Family") && LC.NAMA_METODE.naik.includes("Counting Up") && LC.NAMA_METODE.garis.includes("Number Line"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Fact Family, Counting Up, Number Line)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Pos Persediaan") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(LC.dataSah(LC.dasarDari(ls.langkah)), `${nama} ${s.nomor} ${ls.metode}: data sah dan konsisten`);
      }
    }
    // Cari kesalahan di tiap tahap, di tugas klik IGIL.
    const salahL = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahL.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu Cari kesalahan, di Klik IGIL`);
    for (const l of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && kunci.jenis === "angka", `${nama}: jawaban Cari kesalahan berupa bilangan`);
      cek(x.betul === true ? String(kunci.n) === String(x.jawabTokoh) : String(kunci.n) !== String(x.jawabTokoh), `${nama}: jawaban tokoh ${x.betul ? "benar" : "keliru"} sesuai data`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.betul === true), [false, true, false], "Cari kesalahan: dua jawaban keliru dan satu jawaban benar (Pictorial)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.hilang), ["awal", "kurang", "awal"], "Cari kesalahan: bilangan awal (Concrete), dikurangkan (Pictorial), bilangan awal (Abstract)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.benar), [1, 2, 2], "Cari kesalahan: posisi alasan benar bervariasi");
  // Posisi tombol alasan benar (rumus yang sama dengan CariSalah): tidak selalu tombol pertama.
  const posisiTombol = Object.values(TAHAP).map(([, soal]) => {
    const x = soal[0].langkah[0].langkah;
    return Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  });
  cek(posisiTombol.some((p) => p !== 0) && posisiTombol.filter((p) => p === 0).length <= 1, `Cari kesalahan: alasan benar tidak selalu tombol pertama (${posisiTombol.join(",")})`);
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const kal = (awal, kurang, sisa, hilang, kanvas, suara = "hilang") => ({ tipe: "kalimat", awal, kurang, sisa, hilang, benda: "botol", kanvas, suara });
  const fak = (awal, b1, b2, hilang, kanvas, suara = "hilang") => ({ tipe: "fakta", awal, b1, b2, hilang, benda: "botol", kanvas, suara });
  const nai = (awal, sisa, kanvas) => ({ tipe: "naik", awal, sisa, benda: "botol", kanvas, suara: "jarak" });
  const gar = (awal, kurang, kanvas, suara = "sisa") => ({ tipe: "garis", awal, kurang, benda: "botol", kanvas, suara });
  const per = (awal, kurang, sisa, kanvas, suara) => ({ tipe: "periksa", awal, kurang, sisa, benda: "botol", kanvas, suara });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal(53, 19, 34, "awal", "satuan", "operasi"), c))), [53, 3, "tambah"], "kunci kalimat awal: bilangan, satuan, operasi tambah");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal(52, 6, 46, "kurang", "hilang", "operasi"), c))), [6, 6, "kurang"], "kunci kalimat dikurangkan: bilangan, kanvas, operasi kurang");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal(74, 43, 31, "kurang", "puluhan"), c))), [43, 4, 43], "kunci kalimat: puluhan di kanvas, suara bilangan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(fak(71, 34, 37, "awal", "puluhan", "operasi"), c))), [71, 7, "tambah"], "kunci fakta awal hilang: operasi tambah");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(fak(85, 39, 46, "b1", "satuan", "operasi"), c))), [39, 9, "kurang"], "kunci fakta bagian hilang: operasi kurang");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(nai(70, 46, "langkah"), c))), [24, 4, 24], "kunci naik: jarak dan langkah pertama");
  sama([nama(LC.kunciJawab(nai(50, 26, "puluh"), "kanvas")), LC.langkahPertama(nai(50, 26, "puluh")), LC.lompatPuluh(nai(50, 26, "puluh")), LC.puluhanTerdekat(26), LC.puluhanTerdekat(30)], [2, 4, 2, 30, 40], "kunci naik: lompatan puluhan dan puluhan terdekat");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(gar(84, 37, "satuan"), c))), [47, 7, 47], "kunci garis: tempat mendarat dan satuan");
  sama([nama(LC.kunciJawab(gar(87, 34, "puluh"), "kanvas")), nama(LC.kunciJawab(gar(65, 26, "puluh", "arah"), "suara"))], [3, "mundur"], "kunci garis: lompatan puluhan dan arah mundur");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(per(79, 33, 46, "satuan", "hasil"), c))), [46, 6, 46], "kunci periksa: hasil pengurangan");
  sama([nama(LC.kunciJawab(per(79, 33, 46, "satuan", "operasi"), "suara"))], ["kurang"], "kunci periksa: cara memeriksa kurang");
  // Data sah dan tolak data yang salah.
  cek(LC.dataSah(kal(37, 14, 23, "awal", "satuan")) && !LC.dataSah(kal(37, 14, 24, "awal", "satuan")) && !LC.dataSah(kal(52, 6, 46, "kurang", "puluhan")) && !LC.dataSah(kal(101, 50, 51, "awal", "satuan")), "dataSah kalimat: jumlah konsisten, jawaban kanvas satu angka, awal paling banyak seratus");
  cek(LC.dataSah(nai(70, 46, "langkah")) && !LC.dataSah(nai(70, 40, "langkah")) && !LC.dataSah(nai(75, 46, "langkah")) && !LC.dataSah(nai(50, 49, "langkah")), "dataSah naik: awal kelipatan sepuluh, sisa bukan kelipatan sepuluh, masih ada lompatan puluhan");
  cek(LC.dataSah(gar(84, 37, "satuan")) && !LC.dataSah(gar(84, 30, "satuan")) && !LC.dataSah(gar(84, 9, "puluh")), "dataSah garis: dikurangkan bukan kelipatan sepuluh, paling sedikit sebelas");
  // Pengecoh.
  sama(LC.pengecoh(37, 9, [9]).slice(0, 3), [9, 47, 27], "pengecoh dengan jawaban tokoh di depan");
  cek(LC.pengecoh(100).every((x) => x !== 100 && x >= 1 && x <= 100) && LC.pengecoh(1).every((x) => x >= 1) && LC.pengecoh(50).length >= 4, "pengecoh: sah, 1 sampai 100");
  sama(LC.pilihanKlik({ ...kal(83, 54, 29, "kurang", "satuan") }).includes("112"), false, "pilihan klik: pengecoh tidak melebihi seratus");
  cek(LC.pilihanKlik(kal(83, 54, 29, "kurang", "satuan")).includes("54"), "pilihan klik: memuat kunci");
  sama(LC.kataBil(LC.nilaiKalimat(kal(37, 14, 23, "awal", "satuan"))), "tiga puluh tujuh", "nilai kalimat awal");
  sama(LC.kalimatLayar(kal(37, 14, 23, "awal", "satuan")), "… − 14 = 23", "kalimat layar: titik-titik di depan");
  sama(LC.kalimatLayar(kal(52, 6, 46, "kurang", "hilang")), "52 − … = 46", "kalimat layar: titik-titik di tengah");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const semuaAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Bilangan berbeda dari Story.
        const angkaData = d.tipe === "fakta" ? [d.awal, d.b1, d.b2] : d.tipe === "naik" ? [d.awal, d.sisa, d.awal - d.sisa] : d.tipe === "garis" ? [d.awal, d.kurang, d.awal - d.kurang] : [d.awal, d.kurang, d.sisa];
        cek(angkaData.every((n) => !CERITA.has(n) && n >= 1 && n <= 100), `${tag}: bilangan berbeda dari Story dan paling banyak seratus (${angkaData.join(", ")})`);
        if (kunci?.jenis === "angka") {
          semuaAngka.push(`${s.cara}:${kunci.n}`);
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 2 && kunci.n <= 99, `${tag}: jawaban klik bilangan paling banyak sembilan puluh sembilan`);
        }
        if (kunci?.jenis === "nama") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara === "suara", `${tag}: kunci nama satu kata, hanya pada suara`);
        // Pilihan klik: tiga pilihan bilangan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(kunci.n)) && pil[0] !== String(kunci.n), `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 1 && Number(p) <= 100), `${tag}: pilihan bilangan sah`);
        }
        if (s.cara !== "klik" && kunci !== null) {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan ketuk memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${tag}: kunci bukan pilihan pertama`);
          if (s.cara === "suara") {
            const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
            cek(c.cocok, `${tag}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
            for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan kunci`);
          }
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${tag}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(semuaAngka.filter((x) => !x.startsWith("kanvas"))).size === semuaAngka.filter((x) => !x.startsWith("kanvas")).length, `${namaT}: jawaban bilangan klik dan suara tidak kembar dalam satu tahap (${semuaAngka.join(", ")})`);
    // Semua tipe tugas dan semua jenis jawaban tampak di tiap tahap.
    const dasar = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)));
    cek(["kalimat", "fakta", "naik", "garis"].every((t) => dasar.some((d) => d.tipe === t)), `${namaT}: kalimat, fakta, naik, dan garis ada`);
    cek(dasar.some((d) => d.tipe === "kalimat" && d.hilang === "kurang") && dasar.some((d) => d.tipe === "kalimat" && d.hilang === "awal"), `${namaT}: bilangan dikurangkan dan bilangan awal sama-sama dicari`);
    cek(soal.flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).some((k) => k?.jenis === "nama"), `${namaT}: ada jawaban berupa kata`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [6, 7, 3, 9], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [4, 6, 9, 3], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [8, 7, 2, 1], "angka kanvas Abstract");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["titik-titik", "bilangan awal dikurangi sisa", "menambahkan bilangan yang dikurangkan dan sisa", "bagan batang", "mengurangkan lagi", "banyak kemungkinan", "keluarga fakta", "menghitung naik", "garis bilangan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(D.POIN_PENTING_SUARA.join(" ").includes("seratus"), "poin penting: suara mengeja seratus");
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && /Pak Darto/.test(D.PENUTUP_B) && /api unggun/i.test(D.PENUTUP_B), "penutup B: akhir cerita bab tanpa digit");
  cek(Object.values(D.TEMA_BOTOL).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_BOTOL.pictorial.cara.includes("polos") && D.TEMA_BOTOL.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_BOTOL === D.CONCRETE && D.PICTORIAL_BOTOL === D.PICTORIAL && D.ABSTRACT_BOTOL === D.ABSTRACT && D.MISI_PERSEDIAAN_TEKS === DS.MISI_PERSEDIAAN_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabBotol.tsx", "LangkahBotol.tsx", "TahapBotol.tsx", "SimulasiPosPersediaan.tsx", "PosJaga.tsx", "CatatanPersediaan.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tempat-k3b1a|kayu-k3b2a|turus-k2b8a|gambar-k2b8b|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|LangkahTempat|LangkahKayu|SubBabK3B2/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang.
  const layar = ["LangkahBotol.tsx", "TahapBotol.tsx", "SimulasiPosPersediaan.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapGambar dan pola visual baru.
  const th = readFileSync(new URL("TahapBotol.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapBotol: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapBotol: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapBotol/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapBotol: ekspor, Cari kesalahan, Poin Penting, penutup");
  cek(/"pos"/.test(th) && /"milimeter"/.test(th) && /"catatan"/.test(th) && !/"rak"|"kapur"|"nota"|"tirai"/.test(th), "TahapBotol: pola visual pos jaga, kertas milimeter, lembar catatan (berbeda dari bab sebelumnya)");
  cek(/PERKEMAHAN SERU MERIAH/.test(th) && /\\u\{1F525\}/.test(th) && /\\u\{2B50\}/.test(th) && /konfeti/.test(th) && /perayaan-akhir-bab/.test(th), "TahapBotol: perayaan akhir bab (spanduk, api unggun, bintang, konfeti)");
  cek(/prefers-reduced-motion/.test(th), "TahapBotol: perayaan menghormati gerak berkurang");
  const lg = readFileSync(new URL("LangkahBotol.tsx", folderUrl), "utf8");
  cek(/export function LangkahBotol/.test(lg) && /JawabSuaraBotol/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg), "LangkahBotol: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  const jw = readFileSync(new URL("JawabBotol.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabBotol: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiPosPersediaan.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPosPersediaan/.test(sim) && /onKeadaan/.test(sim) && /MISI_PERSEDIAAN_TEKS/.test(sim), "SimulasiPosPersediaan: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["PosJaga.tsx", "PosJagaK3B2"], ["CatatanPersediaan.tsx", "CatatanPersediaanK3B2"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Pos Persediaan.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab2.tsx", import.meta.url), "utf8");
  cek(/SimulasiPosPersediaan/.test(sk) && /laporMisiPersediaan\(daftarMisiK3Bab2\("B"\), k, a\.capai\)/.test(sk) && !/Kelas 3 Bab 2 ·/.test(sk), "SimulasiK3Bab2: langkahPosPersediaanB memasang Pos Persediaan, judul tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b2.ts", "dasar-k3b2.tsx", "naskah-k3b2.ts", "diagram-k3b2.tsx", "video-k3b2-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/fact family/i.test(ej) && /counting up/i.test(ej) && /number line/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
