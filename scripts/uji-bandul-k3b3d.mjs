// Uji Mind-map (Rak Bandul), Infografis (Papan Kenyang), Simulasi Meja Bandul, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 3 Sub-Bab D ("Bandul Dokter Hana"),
// akhir cerita Kebun Binatang Mini.
// Memeriksa: logika simulasi (rakit, kg ke g, g ke kg, jumlah, kurang), misi (awal tidak memenuhi, wajib empat, bebas dua),
// rak bandul (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), papan kenyang dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris, perayaan akhir cerita bab.
// Jalankan: node --no-warnings scripts/uji-bandul-k3b3d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bandul-k3b3d/logika.ts");
const DS = await import("../src/components/modul/bandul-k3b3d/data-sim.ts");
const DK = await import("../src/components/modul/bandul-k3b3d/data-kartu.ts");
const LC = await import("../src/components/modul/bandul-k3b3d/logika-cpa.ts");
const D = await import("../src/components/modul/bandul-k3b3d/data.ts");
const K = await import("../src/components/modul/bandul-k3b3d/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k3b3.ts");
const folderUrl = new URL("../src/components/modul/bandul-k3b3d/", import.meta.url);

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
/** Berat (gram) yang dipakai Story D (tidak boleh dipakai sebagai data CPA dan Simulasi). */
const CERITA = new Set([1200, 3000, 2000, 1250, 2300, 1400, 3700, 5000, 2200, 2800, 2500, 3800, 200]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 101, 110, 205, 316, 999, 1000, 1200, 2350, 9999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu", "seratus sepuluh", "dua ratus lima", "tiga ratus enam belas", "sembilan ratus sembilan puluh sembilan", "seribu", "seribu dua ratus", "dua ribu tiga ratus lima puluh", "sembilan ribu sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 9999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ribuan(1000), LC.ribuan(1753), LC.ribuan(250), LC.ribuan(9999)], ["1.000", "1.753", "250", "9.999"], "titik ribuan");
  sama([LC.fmtG(1200), LC.fmtKg(1, 250), LC.fmtKg(3, 0), LC.fmtBerat(2400), LC.fmtBerat(2000)], ["1.200 g", "1 kg 250 g", "3 kg", "2 kg 400 g", "2 kg"], "format ukuran");
  sama([LC.sebutKg(1, 250), LC.sebutBerat(3000), LC.sebutG(1750)], ["satu kilogram dua ratus lima puluh gram", "tiga kilogram", "seribu tujuh ratus lima puluh gram"], "ucapan ukuran tanpa digit");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BB = DS.BENDA_BANDUL;
  cek(BB.length === 3 && new Set(BB.map((b) => b.id)).size === 3 && new Set(BB.map((b) => b.emoji)).size === 3, "simulasi: tiga benda unik");
  for (const b of BB) cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama), `${b.id}: emoji dan nama sah`);
  cek(!/labu|jagung|wortel|biji|beo|kambing/i.test(BB.map((b) => b.nama).join(" ")), "simulasi: benda berbeda dari Story (labu, jagung, wortel, biji)");
  const kelipatan = (t) => t % 50 === 0 && t > 0 && t <= 9999;
  cek(DS.TARGET_RAKIT.length === 3 && DS.TARGET_RAKIT.every((t) => kelipatan(t.g) && !CERITA.has(t.g)), "simulasi: tiga sasaran rakit, kelipatan lima puluh gram, berbeda dari Story");
  cek(DS.TARGET_KGG.length === 3 && DS.TARGET_KGG.every((t) => t.kg >= 1 && t.kg <= 9 && t.g >= 0 && t.g < 1000 && t.g % 50 === 0 && !CERITA.has(t.kg * 1000 + t.g)), "simulasi: tiga kalimat kilogram ke gram, berbeda dari Story");
  cek(DS.TARGET_GKG.length === 3 && DS.TARGET_GKG.every((t) => kelipatan(t.g) && !CERITA.has(t.g)), "simulasi: tiga kalimat gram ke kilogram, berbeda dari Story");
  cek(DS.TARGET_JUMLAH.length === 3 && DS.TARGET_JUMLAH.every((t) => kelipatan(t.a) && kelipatan(t.b) && t.a + t.b <= 9999 && ![t.a, t.b, t.a + t.b].some((n) => CERITA.has(n))), "simulasi: tiga jumlah berat, berbeda dari Story");
  cek(DS.TARGET_KURANG.length === 3 && DS.TARGET_KURANG.every((t) => kelipatan(t.a) && kelipatan(t.b) && t.a > t.b && ![t.a, t.b, t.a - t.b].some((n) => CERITA.has(n))), "simulasi: tiga kurang berat, berbeda dari Story");
  cek(tanpaDigit(DS.MISI_BANDUL_TEKS) && bersih(DS.MISI_BANDUL_TEKS) && DS.MISI_BANDUL_TEKS === MT.MISI_K3B3.D && D.MISI_BANDUL_TEKS === DS.MISI_BANDUL_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b3");
  cek(tanpaDigit(MT.MISI_K3B3.D) && MT.hurufK3B3("D") === "D" && MT.misiAwalK3Bab3("D").includes(MT.MISI_K3B3.D), "misi-teks: misi awal D memuat teks misi tanpa digit");

  const a = L.awalBandul();
  cek(a.alat === "bandul" && a.mode === "rakit" && a.pasang.join() === "0,0,0,0,0" && a.rakitBenar.length === 0 && a.kggBenar.length === 0 && a.gkgBenar.length === 0 && a.jumlahBenar.length === 0 && a.kurangBenar.length === 0, "simulasi: keadaan awal kosong");
  // Rakit.
  sama([L.targetRakit(a).g, L.beratPasang(a)], [1650, 0], "rakit: sasaran pertama, piring kosong");
  cek(!L.periksaRakit(a).ok && /Pasang bandul/.test(L.petunjukRakit(a)) && tanpaDigit(L.petunjukRakit(a)), "rakit: piring kosong tidak seimbang, petunjuk memasang");
  let r = a;
  r = L.pasangBandul(L.pasangBandul(r, 4, 1).k, 3, 1).k;
  sama([L.beratPasang(r)], [1500], "rakit: satu kilogram dan setengah kilogram");
  const kurangR = L.periksaRakit(r);
  cek(!kurangR.ok && kurangR.k.salah === 1 && /masih kurang berat/.test(L.petunjukRakit(r)) && tanpaDigit(L.petunjukRakit(r)), "rakit: bandul kurang berat dinyatakan keliru dengan petunjuk");
  const lebihR = L.periksaRakit(L.pasangBandul(L.pasangBandul(r, 4, 1).k, 0, 1).k);
  cek(!lebihR.ok && /terlalu berat/.test(L.petunjukRakit(L.pasangBandul(L.pasangBandul(r, 4, 1).k, 0, 1).k)), "rakit: bandul kelebihan berat");
  r = L.pasangBandul(L.pasangBandul(r, 1, 1).k, 0, 1).k;
  const benarR = L.periksaRakit(r);
  cek(L.beratPasang(r) === 1650 && benarR.ok && benarR.k.rakitBenar.join() === "0" && benarR.k.rakitKe === 1 && benarR.k.pasang.join() === "0,0,0,0,0" && L.targetRakit(benarR.k).g === 2750, "rakit: bandul tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_D, benarR.k, new Set()), ["d-rakit"], "rakit: misi d-rakit");
  // Banyak jalan benar.
  cek(L.periksaRakit({ ...a, pasang: [3, 0, 0, 1, 1] }).ok && L.periksaRakit({ ...a, pasang: [1, 1, 0, 1, 1] }).ok && L.periksaRakit({ ...a, pasang: [1, 0, 0, 0, 1] }).ok === false && L.periksaRakit({ ...a, pasang: [1, 0, 0, 0, 1] }).k.salah === 1, "rakit: banyak susunan bandul yang seimbang");
  cek(!L.pasangBandul(a, 0, -1).ok && L.pasangBandul({ ...a, pasang: [9, 0, 0, 0, 0] }, 0, 1).ok === false && !L.pasangBandul(a, 7, 1).ok && L.pasangBandul(a, 2, 1).k.pasang.join() === "0,0,1,0,0", "rakit: banyak bandul nol sampai sembilan");
  cek(L.kosongkanRakit(r).pasang.join() === "0,0,0,0,0" && tanpaDigit(L.kalimatRakit(a)) && tanpaDigit(L.kalimatRakit(benarR.k)) && /satu kilogram enam ratus lima puluh gram/.test(L.kalimatRakit(a)), "rakit: kosongkan dan kalimat tanpa digit");
  let tigaR = a;
  for (let i = 0; i < 3; i += 1) {
    const t = L.targetRakit(tigaR).g;
    const set = LC.setDari(t);
    tigaR = L.periksaRakit({ ...tigaR, pasang: set }).k;
  }
  cek(tigaR.rakitBenar.join() === "0,1,2" && S.misiBaru(MK.MISI_D, tigaR, new Set()).includes("d-lengkap"), "rakit: tiga benda seimbang memenuhi d-lengkap");
  // Kg ke g.
  sama([L.jawabKgg(a), L.targetKgg(a).kg, L.targetKgg(a).g], [3500, 3, 500], "kg ke g: sasaran pertama");
  const salahK = L.periksaKgg({ ...a, kgg: [0, 8, 0, 0] });
  cek(!salahK.ok && salahK.k.salah === 1 && /bukan seratus gram/.test(L.petunjukKgg({ ...a, kgg: [0, 8, 0, 0] })) && tanpaDigit(L.petunjukKgg(a)), "kg ke g: lupa kali seribu dinyatakan keliru dengan petunjuk");
  const bK = L.periksaKgg({ ...a, kgg: [3, 5, 0, 0] });
  cek(bK.ok && bK.k.kggBenar.join() === "0" && bK.k.kggKe === 1 && bK.k.kgg.join() === "0,0,0,0" && L.jawabKgg(bK.k) === 6150, "kg ke g: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_D, bK.k, new Set()), ["d-kgg"], "kg ke g: misi d-kgg");
  cek(!L.ubahKgg(a, 0, -1).ok && !L.ubahKgg({ ...a, kgg: [9, 0, 0, 0] }, 0, 1).ok && !L.ubahKgg(a, 5, 1).ok && L.ubahKgg(a, 1, 1).k.kgg.join() === "0,1,0,0" && tanpaDigit(L.kalimatKgg(a)) && tanpaDigit(L.kalimatKgg(bK.k)), "kg ke g: angka nol sampai sembilan dan kalimat tanpa digit");
  // g ke kg.
  sama([L.jawabGkg(a), L.targetGkg(a).g], [4500, 4500], "g ke kg: sasaran pertama");
  const salahG = L.periksaGkg({ ...a, gkg: [4, 0, 5, 0] });
  cek(!salahG.ok && salahG.k.salah === 1 && /tiap seribu gram/.test(L.petunjukGkg(a)) && tanpaDigit(L.petunjukGkg(a)), "g ke kg: isian keliru dengan petunjuk");
  const bG = L.periksaGkg({ ...a, gkg: [4, 5, 0, 0] });
  cek(bG.ok && bG.k.gkgBenar.join() === "0" && bG.k.gkgKe === 1 && L.jawabGkg(bG.k) === 7250, "g ke kg: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_D, bG.k, new Set()), ["d-gkg"], "g ke kg: misi d-gkg");
  cek(L.ubahGkg(a, 0, 1).k.gkg.join() === "1,0,0,0" && tanpaDigit(L.kalimatGkg(a)) && tanpaDigit(L.kalimatGkg(bG.k)), "g ke kg: ubah angka dan kalimat tanpa digit");
  // Jumlah.
  sama([L.jawabJumlah(a), L.targetJumlah(a).a, L.targetJumlah(a).b], [3900, 1500, 2400], "jumlah: sasaran pertama");
  const salahJ = L.periksaJumlah({ ...a, jumlah: [3, 0, 0, 0] });
  cek(!salahJ.ok && salahJ.k.salah === 1 && /Ubah dulu ke gram/.test(L.petunjukJumlah(a)) && tanpaDigit(L.petunjukJumlah(a)), "jumlah: isian keliru dengan petunjuk ubah ke gram");
  const bJ = L.periksaJumlah({ ...a, jumlah: [3, 9, 0, 0] });
  cek(bJ.ok && bJ.k.jumlahBenar.join() === "0" && bJ.k.jumlahKe === 1 && L.jawabJumlah(bJ.k) === 4450, "jumlah: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_D, bJ.k, new Set()), ["d-jumlah"], "jumlah: misi d-jumlah");
  cek(tanpaDigit(L.kalimatJumlah(a)) && tanpaDigit(L.kalimatJumlah(bJ.k)) && L.ubahJumlah(a, 3, 1).k.jumlah.join() === "0,0,0,1", "jumlah: kalimat tanpa digit dan ubah angka");
  // Kurang.
  sama([L.jawabKurang(a), L.targetKurang(a).a, L.targetKurang(a).b], [4400, 6500, 2100], "kurang: sasaran pertama");
  const salahU = L.periksaKurang({ ...a, kurang: [8, 6, 0, 0] });
  cek(!salahU.ok && salahU.k.salah === 1 && /dikurangi/.test(L.petunjukKurang(a)) && tanpaDigit(L.petunjukKurang(a)), "kurang: isian keliru (dijumlahkan) dengan petunjuk");
  const bU = L.periksaKurang({ ...a, kurang: [4, 4, 0, 0] });
  cek(bU.ok && bU.k.kurangBenar.join() === "0" && bU.k.kurangKe === 1 && L.jawabKurang(bU.k) === 3550, "kurang: isian tepat membuka kalimat berikutnya");
  sama(S.misiBaru(MK.MISI_D, bU.k, new Set()), ["d-kurang"], "kurang: misi d-kurang");
  cek(tanpaDigit(L.kalimatKurang(a)) && tanpaDigit(L.kalimatKurang(bU.k)), "kurang: kalimat tanpa digit");
  sama([L.nilaiEmpat([1, 2, 3, 4]), L.empatDari(7250)], [1234, [7, 2, 5, 0]], "nilai empat angka dan sebaliknya");
  cek(L.pilihBendaBandul(a, 2).benda === 2 && L.pilihBendaBandul(a, 9).benda === 0, "benda: pilih benda yang ditimbang");
  cek(L.pilihModeBandul(a, "kurang").mode === "kurang", "mode: ganti alat");
  cek(L.mulaiLagiBandul().rakitKe === 0 && L.mulaiLagiBandul().kurangBenar.length === 0, "mulai lagi: kembali ke awal");
  // Misi.
  const M = MK.MISI_D;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi D: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("d-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi D: id berawalan d-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab3("D"), M, "daftarMisiK3Bab3 D");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi D: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi D: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "kurang", benda: 1, pasang: [1, 2, 3, 0, 1], kgg: [3, 5, 0, 0], gkg: [4, 5, 0, 0], jumlah: [3, 9, 0, 0], kurang: [4, 4, 0, 0] }, new Set()).length === 0, "misi D: isian yang belum diperiksa dan bandul terpasang tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: rak bandul (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_BANDUL;
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
  for (const m of ["Pasang bandul", "Jumlahkan bandul", "Sepuluh ons, seribu gram", "Kali seribu", "Ambil seribu", "Ubah ke gram dulu", "Tabel Tempat Angka", "Garis Bilangan Ganda", "Pecah Seribu-Seribu"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["timbangan kodok", "timbangan seimbang", "jumlah berat bandul", "sepuluh ons", "seribu gram", "seratus gram", "dikalikan seribu", "tiap seribu gram", "jumlahkan atau dikurangkan", "kolom kilogram mewakili ribuan gram", "garis atas untuk kilogram", "potongan seribu-seribu", "sisanya tetap gram"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|dokter hana|kak tari|pak wayan|bu lastri|kambing|wortel|labu|kebun binatang)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_BANDUL + DK.SELESAI_KARTU_BANDUL) && bersih(DK.SUARA_KARTU_BANDUL + DK.SELESAI_KARTU_BANDUL), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_BANDUL.ikon) && DK.TEMA_KARTU_BANDUL.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_BANDUL;
  cek(RG.ikon.length === DK.KARTU_BANDUL.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan kenyang (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_BANDUL;
  cek(B.length === 5 && DK.KOLOM_INFO_BANDUL.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["bandul timbangan", "kilogram, ons, gram", "kilogram ke gram", "gram ke kilogram", "jumlah dan kurang berat", "pasang bandul", "kali seribu", "ambil seribu", "pecah seribu-seribu", "ubah ke gram dulu", "sepuluh ons, seribu gram", "satu ons seratus gram"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|dokter hana|kak tari|pak wayan|bu lastri)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_BANDUL + DK.SELESAI_INFO_BANDUL) && bersih(DK.SUARA_INFO_BANDUL + DK.SELESAI_INFO_BANDUL) && emojiSah(DK.TEMA_INFO_BANDUL.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["tambah", "kurang", "kali", "bagi", "gram", "kilogram", "ons"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("dikalikan"), ["kali"], "ucapan: dikalikan berarti kali");
  sama(K.kataDariUcapan("membagi"), ["bagi"], "ucapan: membagi berarti bagi");
  sama(K.kataDariUcapan("dikurangi"), ["kurang"], "ucapan: dikurangi berarti kurang");
  sama(K.kataDariUcapan("menambahkan"), ["tambah"], "ucapan: menambahkan berarti tambah");
  sama(K.kataDariUcapan("kilo gram"), ["kilogram"], "ucapan: kilo gram berarti kilogram saja");
  sama(K.kataDariUcapan("kilo"), ["kilogram"], "ucapan: kilo berarti kilogram");
  sama(K.kataDariUcapan("kg"), ["kilogram"], "ucapan: kg berarti kilogram");
  sama(K.kataDariUcapan("gram"), ["gram"], "ucapan: gram saja");
  sama(K.kataDariUcapan("tidak kali"), [], "ucapan: tidak kali tidak dihitung");
  sama(K.kataDariUcapan("bukan bagi"), [], "ucapan: bukan bagi tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("kali", nm("bagi")).cocok && !K.cocokUcapan("kilo gram", nm("gram")).cocok && !K.cocokUcapan("gram", nm("kilogram")).cocok && !K.cocokUcapan("tambah", nm("kurang")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("tiga puluh"), [30], "angka: tiga puluh");
  sama(K.angkaDariUcapan("tiga ratus"), [300], "angka: tiga ratus");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("sepuluh"), [10], "angka: sepuluh");
  sama(K.angkaDariUcapan("30"), [30], "angka: 30 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 100; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  for (const n of [100, 200, 300, 400, 500, 600, 700, 800, 900]) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: ratusan ${n} dikenali utuh`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("tiga puluh", an(30)).cocok && !K.cocokUcapan("tiga puluh", an(3)).cocok && !K.cocokUcapan("tiga", an(30)).cocok, "cocok: bilangan dua angka dikenali utuh");
  cek(!K.cocokUcapan("lima", { jenis: "ukuran", teks: "5 g", kata: "lima gram" }).cocok, "cocok: kunci ukuran dijawab dengan ketukan, bukan suara");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "tabel", "garis", "pecah"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
/** Berat (gram) yang dipakai satu tugas. */
const beratTugas = (d) => (d.tipe === "ubah" ? [d.kg * 1000 + d.g] : d.tipe === "gabung" ? [d.a, d.b, LC.hasilGabung(d)] : d.tipe === "bandul" ? [LC.totalBandul(d)] : d.tipe === "tabel" ? [LC.totalTabel(d)] : d.tipe === "garis" ? [LC.totalGaris(d)] : d.tipe === "pecah" ? [d.total] : []);
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Kali Seribu ke Gram, Ambil Seribu ke Kilogram") && LC.NAMA_METODE.tabel.includes("Place Value Chart") && LC.NAMA_METODE.garis.includes("Double Number Line") && LC.NAMA_METODE.pecah.includes("Chunking"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Place Value Chart, Double Number Line, Chunking)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Meja Bandul") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(LC.dataSah(LC.dasarDari(ls.langkah)), `${nama} ${s.nomor} ${ls.metode}: data sah dan konsisten`);
        cek(LC.dasarDari(ls.langkah).tipe === { igil: ["ubah", "gabung", "bandul", "ons"], tabel: ["tabel"], garis: ["garis"], pecah: ["pecah"] }[ls.metode].find((t) => t === LC.dasarDari(ls.langkah).tipe), `${nama} ${s.nomor} ${ls.metode}: jenis tugas cocok dengan metode`);
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
      cek(kunci !== null && kunci.jenis === "ukuran", `${nama}: jawaban Cari kesalahan berupa ukuran bersatuan`);
      cek(x.betul === true ? kunci.teks === x.jawabTokoh : kunci.teks !== x.jawabTokoh, `${nama}: jawaban tokoh ${x.betul ? "benar" : "keliru"} sesuai data`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.betul === true), [false, true, false], "Cari kesalahan: dua jawaban keliru dan satu jawaban benar (Pictorial)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.arah), ["kg-g", "g-kg", "g-kg"], "Cari kesalahan: kilogram ke gram (Concrete), gram ke kilogram (Pictorial dan Abstract)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.tokoh), ["Raka", "Bima", "Salsa"], "Cari kesalahan: Raka, Bima, Salsa");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.benar), [1, 2, 0], "Cari kesalahan: posisi alasan benar bervariasi");
  // Posisi tombol alasan benar (rumus yang sama dengan CariSalah): tidak selalu tombol pertama.
  const posisiTombol = Object.values(TAHAP).map(([, soal]) => {
    const x = soal[0].langkah[0].langkah;
    return Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  });
  cek(posisiTombol.some((p) => p !== 0) && posisiTombol.filter((p) => p === 0).length <= 1, `Cari kesalahan: alasan benar tidak selalu tombol pertama (${posisiTombol.join(",")})`);
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.jenis === "ukuran" ? k.teks : k.n) : null);
  const ub = (arah, kg, g, kanvas, suara = "operasi") => ({ tipe: "ubah", arah, kg, g, benda: "wortel", kanvas, suara });
  const gb = (op, a, b, kanvas, suara = "operasi") => ({ tipe: "gabung", op, a, b, benda: "apel", kanvas, suara });
  const bd = (set, kanvas, suara = "satuOns") => ({ tipe: "bandul", set, benda: "kaleng", kanvas, suara });
  const on = (arah, n, kanvas) => ({ tipe: "ons", arah, n, benda: "telur", kanvas, suara: "hasil" });
  const tb = (kg, g, kanvas, suara = "kg") => ({ tipe: "tabel", kg, g, benda: "jagung", kanvas, suara });
  const gr = (arah, kg, setengah, kanvas, suara = "hasil") => ({ tipe: "garis", arah, kg, setengah, benda: "karung", kanvas, suara });
  const pc = (total, kanvas, suara = "hasil") => ({ tipe: "pecah", total, benda: "wortel", kanvas, suara });
  const tiga = (l) => ["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(l, c)));
  // Kunci tiap jenis tugas dihitung dari data.
  sama(tiga(ub("kg-g", 4, 150, "ratus")), ["4.150 g", 1, "kali"], "kunci ubah kg ke g: ukuran, angka ratusan, operasi kali");
  sama(tiga(ub("kg-g", 3, 0, "ribu")), ["3.000 g", 3, "kali"], "kunci ubah kg ke g: angka ribuan");
  sama(tiga(ub("g-kg", 2, 400, "kg", "hasil")), ["2 kg 400 g", 2, 2], "kunci ubah g ke kg: ukuran, banyak kilogram, hasil");
  sama(tiga(ub("g-kg", 6, 0, "kg")), ["6 kg", 6, "bagi"], "kunci ubah g ke kg: operasi bagi");
  sama(tiga(gb("tambah", 1700, 2400, "kg")), ["4 kg 100 g", 4, "tambah"], "kunci gabung tambah: ukuran, kilogram, operasi tambah");
  sama(tiga(gb("kurang", 7100, 2600, "ratus", "hasil")), ["4 kg 500 g", 5, 4], "kunci gabung kurang: ukuran, ratusan, hasil kilogram");
  sama(tiga(gb("kurang", 1500, 700, "ratus")), ["800 g", 8, "kurang"], "kunci gabung kurang: hasil di bawah seribu dalam gram");
  sama(tiga(bd([0, 1, 0, 1, 1], "ratus")), ["1.600 g", 6, 100], "kunci bandul: berat dijumlahkan, satu ons seratus gram");
  sama(tiga(bd([1, 0, 2, 0, 3], "ribu", "kgOns")), ["3.450 g", 3, 10], "kunci bandul: tiga kilogram dan seterusnya, satu kilogram sepuluh ons");
  sama(tiga(on("kg-ons", 3, "puluh")), ["30 ons", 3, 30], "kunci ons: kilogram ke ons");
  sama(tiga(on("ons-g", 6, "ratus")), ["600 g", 6, 600], "kunci ons: ons ke gram");
  sama(tiga(tb(3, 470, "puluh", "nGram")), ["3.470 g", 7, "gram"], "kunci tabel: berat, angka puluhan, satuan kolom gram");
  sama(tiga(tb(7, 450, "ratus", "nKg")), ["7.450 g", 4, "kilogram"], "kunci tabel: satuan kolom kilogram");
  sama(tiga(tb(4, 250, "ratus", "kg")), ["4.250 g", 2, 4], "kunci tabel: angka di kolom kilogram");
  sama(tiga(gr("kg-g", 6, false, "lompat", "atas")), ["6.000 g", 6, "kilogram"], "kunci garis: kilogram ke gram, garis atas kilogram");
  sama(tiga(gr("g-kg", 3, true, "ratus", "bawah")), ["3 kg 500 g", 5, "gram"], "kunci garis: gram ke kilogram dengan setengah, garis bawah gram");
  sama(tiga(gr("kg-g", 4, true, "ratus")), ["4.500 g", 5, 4], "kunci garis: empat setengah kilogram");
  sama(tiga(pc(7800, "potong")), ["7 kg 800 g", 7, 7], "kunci pecah: potongan seribu dan sisa");
  sama(tiga(pc(5620, "ratus", "nama")), ["5 kg 620 g", 6, "kilogram"], "kunci pecah: angka ratusan sisa, nama kilogram");
  sama(tiga(pc(3280, "puluh")), ["3 kg 280 g", 8, 3], "kunci pecah: angka puluhan sisa");
  // Data sah dan tolak data yang salah.
  cek(LC.dataSah(ub("kg-g", 4, 0, "ribu")) && !LC.dataSah(ub("kg-g", 4, 0, "ratus")) && !LC.dataSah(ub("g-kg", 4, 0, "ribu")) && !LC.dataSah(ub("kg-g", 4, 0, "kg")) && !LC.dataSah(ub("kg-g", 4, 5, "ribu")) && !LC.dataSah(ub("kg-g", 4, 0, "ribu", "hasil")), "dataSah ubah: jawaban kanvas satu angka, kilogram hanya untuk gram ke kilogram, hasil hanya gram ke kilogram");
  cek(LC.dataSah(gb("tambah", 1700, 2400, "kg")) && !LC.dataSah(gb("kurang", 1700, 2400, "kg")) && !LC.dataSah(gb("tambah", 8000, 2400, "kg")) && !LC.dataSah(gb("tambah", 1710, 2400, "kg")) && !LC.dataSah(gb("tambah", 300, 400, "kg")), "dataSah gabung: kelipatan lima puluh, tambah tidak melebihi sembilan ribu sembilan ratus, kurang awal lebih besar");
  cek(LC.dataSah(bd([0, 1, 0, 1, 1], "ratus")) && !LC.dataSah(bd([0, 0, 0, 0, 3], "ribu")) && !LC.dataSah(bd([0, 1, 1, 0, 0], "ratus")) && !LC.dataSah(bd([6, 1, 0, 0, 0], "ratus")), "dataSah bandul: paling sedikit dua jenis dan tiga bandul, tiap jenis paling banyak lima");
  cek(LC.dataSah(tb(3, 470, "puluh")) && !LC.dataSah(tb(3, 400, "puluh")) && !LC.dataSah(tb(3, 475, "puluh")) && !LC.dataSah(tb(10, 470, "puluh")), "dataSah tabel: angka kolom tertutup tidak nol");
  cek(LC.dataSah(gr("kg-g", 6, false, "lompat")) && !LC.dataSah(gr("kg-g", 6, false, "ratus")) && LC.dataSah(gr("g-kg", 3, true, "ratus")) && !LC.dataSah(gr("kg-g", 9, false, "lompat")), "dataSah garis: ratusan hanya bila setengah kilogram, kilogram paling banyak delapan");
  cek(LC.dataSah(pc(7800, "potong")) && !LC.dataSah(pc(7800, "ratus", "nama")) === false && !LC.dataSah(pc(700, "potong")) && !LC.dataSah(pc(7805, "potong")) && !LC.dataSah(pc(7800, "puluh")), "dataSah pecah: total seribu sampai sembilan ribu sembilan ratus sembilan puluh sembilan, angka sisa tidak nol");
  cek(LC.dataSah(on("kg-ons", 3, "puluh")) && !LC.dataSah(on("kg-ons", 10, "puluh")), "dataSah ons: satu sampai sembilan");
  // Pengecoh dan pilihan.
  sama(LC.pilihanKlik({ ...ub("kg-g", 4, 0, "ribu") }).includes("4.000 g"), true, "pilihan klik: memuat kunci");
  cek(LC.pilihanKlik(ub("kg-g", 4, 0, "ribu")).includes("400 g") && LC.pilihanKlik(ub("kg-g", 4, 0, "ribu")).every((p) => !p.startsWith("-")), "pilihan klik: pengecoh lupa kali seribu (seratus) ikut");
  cek(!LC.pilihanKlik(ub("g-kg", 6, 0, "kg")).includes("0 kg") && LC.pilihanKlik(ub("g-kg", 6, 0, "kg")).includes("60 kg"), "pilihan klik: pengecoh membagi seratus ikut dan tanpa nol kilogram");
  cek(LC.pilihanKlik(ub("g-kg", 1, 0, "kg")).length === 3 && new Set(LC.pilihanKlik(ub("g-kg", 1, 0, "kg"))).size === 3, "pilihan klik: tiga pilihan walau satu kilogram");
  sama(LC.kataBil(LC.totalUbah(ub("kg-g", 4, 150, "ratus"))), "empat ribu seratus lima puluh", "total ubah dalam kata");
  sama(LC.setDari(1650).join(), "1,1,0,1,1", "setDari: bandul paling sedikit untuk seribu enam ratus lima puluh gram");
  cek(LC.beratSet(LC.setDari(3450)) === 3450 && LC.beratSet([1, 1, 1, 1, 1]) === 1850 && LC.banyakBandul([1, 2, 0, 0, 3]) === 6, "setDari, beratSet, banyakBandul");
  sama(LC.barisKartu(gr("kg-g", 4, true, "ratus")), ["garis atas: 4 kg 500 g", "garis bawah: … g", "1 kg sejajar 1.000 g"], "kartu kata garis");

  const kanvasPerTahap = {};
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const klikUkuran = [];
    const suaraAngka = [];
    const tipeAda = new Set();
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        tipeAda.add(d.tipe);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Berat berbeda dari Story dan paling banyak 9.999 gram.
        const berat = beratTugas(d);
        cek(berat.every((n) => !CERITA.has(n) && n >= 100 && n <= 9999), `${tag}: berat berbeda dari Story dan paling banyak 9.999 gram (${berat.join(", ")})`);
        if (rupa === "benda" && (d.tipe === "ubah" || d.tipe === "bandul")) cek(LC.setDari(berat[0]).length === 5 && LC.beratSet(d.tipe === "bandul" ? d.set : LC.setDari(berat[0])) === berat[0] && LC.setDari(berat[0]).filter((n) => n > 0).length <= 5, `${tag}: bandul Concrete menyusun berat tepat`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          } else suaraAngka.push(kunci.n);
        }
        if (kunci?.jenis === "ukuran") {
          klikUkuran.push(kunci.teks);
          cek(s.cara === "klik" && /^\d[\d.]*( kg| g| ons)( \d+ g)?$/.test(kunci.teks) && tanpaDigit(kunci.kata) && !/\b(kg|g)\b/.test(kunci.kata), `${tag}: kunci ukuran hanya pada klik, bersatuan, ucapannya tanpa digit (${kunci.teks})`);
        }
        if (kunci?.jenis === "nama") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara === "suara", `${tag}: kunci nama satu kata, hanya pada suara`);
        // Pilihan klik: tiga ukuran unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(kunci.teks) && pil[0] !== kunci.teks, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => /^\d[\d.]*( kg| g| ons)( \d+ g)?$/.test(p) && !p.startsWith("0")), `${tag}: pilihan ukuran sah (${pil.join("/")})`);
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
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    kanvasPerTahap[namaT] = kanvasAngka;
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(klikUkuran).size === klikUkuran.length && klikUkuran.length === 4, `${namaT}: empat jawaban ukuran Klik tidak kembar (${klikUkuran.join(", ")})`);
    cek(new Set(suaraAngka).size === suaraAngka.length, `${namaT}: jawaban bilangan Suara tidak kembar (${suaraAngka.join(", ")})`);
    // Semua tipe tugas dan semua jenis jawaban tampak di tiap tahap.
    cek(["ubah", "tabel", "garis", "pecah"].every((t) => tipeAda.has(t)), `${namaT}: ubah, tabel, garis, dan pecah ada`);
    cek(soal.flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).some((k) => k?.jenis === "nama"), `${namaT}: ada jawaban berupa kata`);
  }
  sama(kanvasPerTahap, { Concrete: [6, 7, 5, 8], Pictorial: [4, 3, 7, 6], Abstract: [4, 7, 5, 8] }, "angka kanvas tiap tahap");
  const semuaDasar = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  cek(["ubah", "gabung", "bandul", "ons", "tabel", "garis", "pecah"].every((t) => semuaDasar.some((d) => d.tipe === t)), "semua tujuh jenis tugas dipakai: ubah, gabung, bandul, ons, tabel, garis, pecah");
  cek(semuaDasar.some((d) => d.tipe === "ubah" && d.arah === "kg-g") && semuaDasar.some((d) => d.tipe === "ubah" && d.arah === "g-kg") && semuaDasar.some((d) => d.tipe === "gabung" && d.op === "tambah") && semuaDasar.some((d) => d.tipe === "gabung" && d.op === "kurang"), "kilogram ke gram, gram ke kilogram, jumlah, dan kurang berat sama-sama ada");
  cek(semuaDasar.some((d) => d.tipe === "ons" && d.arah === "kg-ons") && semuaDasar.some((d) => d.tipe === "ons" && d.arah === "ons-g") && semuaDasar.some((d) => d.tipe === "garis" && d.setengah), "kilogram ke ons, ons ke gram, dan setengah kilogram ada");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["lima bandul", "jumlah berat bandul", "sama dengan 1.000 gram", "10 ons", "100 gram", "dikalikan 1.000", "tiap 1.000 gram", "1.753 gram menjadi 1 kilogram 753 gram", "satuannya sama", "tabel tempat angka", "garis bilangan ganda", "pecah seribu-seribu"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(D.POIN_PENTING_SUARA.join(" ").includes("seribu tujuh ratus lima puluh tiga gram") && D.POIN_PENTING_SUARA.join(" ").includes("sepuluh ons"), "poin penting: suara mengeja seribu tujuh ratus lima puluh tiga dan sepuluh");
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && /Dokter Hana/.test(D.PENUTUP_D) && /Kebun Binatang Mini/.test(D.PENUTUP_D) && ["Raka", "Salsa", "Bima", "Pak Joko", "Kak Tari", "Pak Wayan", "Bu Lastri"].every((n) => D.PENUTUP_D.includes(n)), "penutup D: akhir cerita bab tanpa digit, semua tokoh disebut");
  cek(Object.values(D.TEMA_BANDUL).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_BANDUL.pictorial.cara.includes("polos") && D.TEMA_BANDUL.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_BANDUL === D.CONCRETE && D.PICTORIAL_BANDUL === D.PICTORIAL && D.ABSTRACT_BANDUL === D.ABSTRACT && D.MISI_BANDUL_TEKS === DS.MISI_BANDUL_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "GambarBandul.tsx", "JawabBandul.tsx", "LangkahBandul.tsx", "TahapBandul.tsx", "SimulasiMejaBandul.tsx", "RakBandul.tsx", "PapanKenyang.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tempat-k3b1a|kayu-k3b2a|botol-k3b2b|turus-k2b8a|gambar-k2b8b|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|LangkahBotol|LangkahKayu|SubBabK3B3/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang.
  const layar = ["LangkahBandul.tsx", "TahapBandul.tsx", "SimulasiMejaBandul.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapBotol dan pola visual baru.
  const th = readFileSync(new URL("TahapBandul.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapBandul: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapBandul: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapBandul/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_D/.test(th), "TahapBandul: ekspor, Cari kesalahan, Poin Penting, penutup");
  cek(/"meja"/.test(th) && /"biru"/.test(th) && /"rekam"/.test(th) && !/"pos"|"milimeter"|"catatan"|"rak"|"kapur"|"nota"|"tirai"/.test(th), "TahapBandul: pola visual meja periksa, kertas biru pucat, rekam medis (berbeda dari bab sebelumnya)");
  cek(/KEBUN BINATANG MINI MERIAH/.test(th) && /\\u\{1F388\}/.test(th) && /konfeti/.test(th) && /perayaan-akhir-bab/.test(th), "TahapBandul: perayaan akhir bab (spanduk, balon, konfeti)");
  cek(/prefers-reduced-motion/.test(th), "TahapBandul: perayaan menghormati gerak berkurang");
  const lg = readFileSync(new URL("LangkahBandul.tsx", folderUrl), "utf8");
  cek(/export function LangkahBandul/.test(lg) && /JawabSuaraBandul/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /pilihanKlik\(l\)/.test(lg), "LangkahBandul: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, pilihan klik");
  const jw = readFileSync(new URL("JawabBandul.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabBandul: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiMejaBandul.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaBandul/.test(sim) && /onKeadaan/.test(sim) && /MISI_BANDUL_TEKS/.test(sim), "SimulasiMejaBandul: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["RakBandul.tsx", "RakBandulK3B3"], ["PapanKenyang.tsx", "PapanKenyangK3B3"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Meja Bandul.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaBandul/.test(sk) && /laporMisiBandul\(daftarMisiK3Bab3\("D"\), k, a\.capai\)/.test(sk) && !/Kelas 3 Bab 3 ·/.test(sk), "SimulasiK3Bab3: langkahMejaBandulD memasang Meja Bandul, judul tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b3.ts", "dasar-k3b3.tsx", "diagram-k3b3.tsx", "naskah-k3b3.ts", "video-k3b3-umum.tsx", "atur-k3b3.tsx", "eja-k3b3.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/place value chart/i.test(ej) && /double number line/i.test(ej) && /chunking/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
