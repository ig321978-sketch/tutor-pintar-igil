// Uji Mind-map (Kotak Busur), Infografis (Tabel Sudut), Simulasi Lapangan Sudut, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 4 Sub-Bab B ("Sudut Kak Anton"),
// tengah cerita Festival Layang-layang Kampung (sudut pada bidang datar).
// Memeriksa: logika simulasi (putar kaki sudut dan bandingkan dengan pojok kertas, busur menolak membaca sebelum dipasang benar, jenis sudut, pasangan satu putaran), misi (awal tidak memenuhi,
// wajib empat, bebas dua), kotak busur (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), tabel sudut dari kejadian Story, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-sudut-k3b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/sudut-k3b4b/logika.ts");
const DS = await import("../src/components/modul/sudut-k3b4b/data-sim.ts");
const DK = await import("../src/components/modul/sudut-k3b4b/data-kartu.ts");
const LC = await import("../src/components/modul/sudut-k3b4b/logika-cpa.ts");
const D = await import("../src/components/modul/sudut-k3b4b/data.ts");
const K = await import("../src/components/modul/sudut-k3b4b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab4.ts");
const MT = await import("../src/components/modul/misi-teks-k3b4.ts");
const folderUrl = new URL("../src/components/modul/sudut-k3b4b/", import.meta.url);
/** Benda beremoji pada GambarSudut.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarSudut.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) DG_EMOJI[m[1] ?? m[2]] = true;
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Besar sudut yang dipakai Story B (jangan dijadikan data CPA atau Simulasi, kecuali sudut acuan 90 dan 180, dan seed Cari kesalahan). */
const CERITA = new Set([50, 130, 120, 300, 60]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 140, 180, 250, 360].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus empat puluh", "seratus delapan puluh", "dua ratus lima puluh", "tiga ratus enam puluh"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 360; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("50°"), LC.ucapkan("140°"), LC.ucapkan("busur"), LC.ucapkan("40° dan 90°")], ["lima puluh derajat", "seratus empat puluh derajat", "busur", "empat puluh derajat dan sembilan puluh derajat"], "ucapkan: derajat menjadi kata");
  sama([LC.jenisDari(10), LC.jenisDari(89), LC.jenisDari(90), LC.jenisDari(91), LC.jenisDari(179), LC.jenisDari(180), LC.jenisDari(181), LC.jenisDari(359)], ["lancip", "lancip", "siku-siku", "tumpul", "tumpul", "lurus", "refleks", "refleks"], "jenis sudut menurut besarnya");
  cek(DS.jenisDari === LC.jenisDari || DS.jenisDari(90) === "siku-siku", "jenis sudut sama di data simulasi dan CPA");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_PUTAR.map((t) => t.awal), ...DS.TARGET_BUSUR.map((t) => t.deg), ...DS.TARGET_JENIS.map((t) => t.deg), ...DS.TARGET_PASANG.flatMap((t) => [t.refleks, 360 - t.refleks])];
  cek(semua.every((n) => n >= 10 && n <= 350 && !CERITA.has(n)), `simulasi: besar sudut berbeda dari Story (${semua.filter((n) => CERITA.has(n))})`);
  cek(DS.TARGET_PUTAR.length === 5 && sama0(DS.TARGET_PUTAR.map((t) => t.jenis), ["tumpul", "lancip", "refleks", "siku-siku", "lurus"]) && DS.TARGET_PUTAR.every((t) => DS.jenisDari(t.awal) !== t.jenis && t.awal % 10 === 0), "simulasi: lima sasaran jenis, sudut awal bukan jenis sasaran dan kelipatan sepuluh");
  function sama0(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  cek(DS.TARGET_BUSUR.length === 3 && DS.TARGET_BUSUR.some((t) => t.sisi === "kanan") && DS.TARGET_BUSUR.some((t) => t.sisi === "kiri") && DS.TARGET_BUSUR.every((t) => t.deg >= 10 && t.deg <= 170 && t.deg % 10 === 0), "simulasi: tiga sudut untuk busur, kaki pertama di kanan dan kiri");
  cek(DS.TARGET_JENIS.length === 4 && new Set(DS.TARGET_JENIS.map((t) => DS.jenisDari(t.deg))).size === 4, "simulasi: empat sudut jenis berbeda");
  cek(DS.TARGET_PASANG.length === 3 && DS.TARGET_PASANG.every((t) => t.refleks > 180 && t.refleks < 360 && t.refleks % 10 === 0), "simulasi: tiga sudut refleks untuk pasangan");
  cek(tanpaDigit(DS.MISI_SUDUT_TEKS) && bersih(DS.MISI_SUDUT_TEKS) && DS.MISI_SUDUT_TEKS === MT.MISI_K3B4.B && D.MISI_SUDUT_TEKS === DS.MISI_SUDUT_TEKS && DS.MISI_SUDUT_TEKS.length >= 10 && DS.MISI_SUDUT_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b4");

  const a = L.awalSudut();
  cek(a.alat === "sudut" && a.mode === "putar" && a.deg === 30 && a.putarKe === 0 && !a.tolak && !a.tengah && !a.nol && !a.sudahBaca && a.putarBenar.length === 0 && a.busurBenar.length === 0 && a.jenisBenar.length === 0 && a.pasangBenar.length === 0 && a.salah === 0, "simulasi: keadaan awal");
  // Putar.
  const p1 = L.putarSudut(a, 10);
  cek(p1.ok && p1.k.deg === 40 && !L.putarSudut({ ...a, deg: 10 }, -10).ok && !L.putarSudut({ ...a, deg: 350 }, 10).ok && L.putarSudut({ ...a, deg: 340 }, 10).ok, "putar: kaki sudut diputar tiap sepuluh derajat, tidak di luar sepuluh sampai tiga ratus lima puluh");
  cek(/Putar kaki sudut dulu/.test(L.petunjukPutar(a)) && tanpaDigit(L.petunjukPutar(a)) && !L.periksaPutar(a).ok && L.periksaPutar(a).k.salah === 1, "putar: Periksa sebelum memutar menunjuk langkah yang belum dilakukan");
  cek(/masih lebih kecil daripada pojok kertas/.test(L.petunjukPutar({ ...a, deg: 60, putarKe: 4 })) || /lebih kecil daripada pojok kertas/.test(L.petunjukPutar({ ...a, deg: 60 })), "putar: petunjuk membandingkan dengan pojok kertas");
  let g = a;
  for (let i = 0; i < 6; i += 1) g = L.putarSudut(g, 10).k;
  cek(g.deg === 90 && !L.periksaPutar(g).ok, "putar: sudut siku-siku belum tumpul");
  g = L.putarSudut(g, 10).k;
  const bP = L.periksaPutar(g);
  cek(bP.ok && bP.k.putarBenar.join() === "0" && bP.k.putarKe === 1 && bP.k.deg === 150 && L.targetPutar(bP.k).jenis === "lancip", "putar: sudut tumpul ditemukan, sasaran berikutnya lancip dengan sudut awal bukan lancip");
  sama(S.misiBaru(MK.MISI_B, bP.k, new Set()), ["b-putar"], "putar: misi b-putar");
  sama([90, 91, 179, 180, 181].map(L.bandingPojok), ["pas dengan pojok kertas", "lebih besar daripada pojok kertas, tetapi belum lurus", "lebih besar daripada pojok kertas, tetapi belum lurus", "lurus, sama dengan dua pojok kertas", "lebih besar daripada sudut lurus"], "putar: perbandingan dengan pojok kertas");
  cek(tanpaDigit(L.kalimatBesarSudut(a)) && L.kalimatBesarSudut(a) === "Sudut sekarang tiga puluh derajat, lebih kecil daripada pojok kertas." && tanpaDigit(L.kalimatPutar(a)) && tanpaDigit(L.kalimatPutar(bP.k)), "putar: kalimat tanpa digit");
  let semuaP = a;
  const urut = [];
  for (const t of DS.TARGET_PUTAR) {
    while (DS.jenisDari(semuaP.deg) !== t.jenis) semuaP = L.putarSudut(semuaP, semuaP.deg < (t.jenis === "lancip" ? 10 : t.jenis === "tumpul" ? 100 : t.jenis === "siku-siku" ? 90 : t.jenis === "lurus" ? 180 : 190) ? 10 : -10).k;
    semuaP = L.periksaPutar(semuaP).k;
    urut.push(t.jenis);
  }
  cek(semuaP.putarBenar.join() === "0,1,2,3,4" && L.targetPutar(semuaP).jenis === "tumpul", "putar: lima jenis berturut-turut lalu kembali ke sasaran pertama");
  sama(S.misiBaru(MK.MISI_B, semuaP, new Set()), ["b-putar", "b-tiga"], "putar: lima jenis memenuhi b-putar dan b-tiga");
  // Busur.
  const tolak = L.bacaBusur(a);
  cek(!tolak.ok && tolak.k.tolak === true && tolak.k.salah === 0 && !tolak.k.sudahBaca, "busur: alat menolak membaca sebelum dipasang (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolak.k, new Set()), ["b-tolak"], "busur: misi b-tolak");
  cek(/Pasang titik tengah/.test(L.petunjukBusur(a)) && tanpaDigit(L.petunjukBusur(a)) && !L.periksaBusur(a).ok, "busur: petunjuk saat belum memasang menunjuk titik tengah");
  const t1 = L.pasangBusur(a, "tengah");
  cek(t1.tengah && !t1.nol && !L.terpasang(t1) && /Pasang garis nol/.test(L.petunjukBusur(t1)) && !L.bacaBusur(t1).ok, "busur: baru titik tengah, garis nol belum, alat menolak");
  const n1 = L.pasangBusur(a, "nol");
  cek(n1.nol && !n1.tengah && /Pasang titik tengah/.test(L.petunjukBusur(n1)) && !L.bacaBusur(n1).ok, "busur: garis nol saja belum cukup");
  const tn = L.pasangBusur(t1, "nol");
  cek(L.terpasang(tn) && /Tekan Baca/.test(L.petunjukBusur(tn)) && !L.periksaBusur(tn).ok, "busur: terpasang tetapi belum membaca, petunjuk menunjuk langkah yang belum dilakukan");
  const bc = L.bacaBusur(tn);
  cek(bc.ok && bc.k.sudahBaca && !bc.k.tolak, "busur: terpasang benar, alat mau membaca");
  const pb = L.pilihanBusur(bc.k);
  cek(pb.length === 3 && new Set(pb).size === 3 && pb.includes(70) && pb.includes(110) && pb[0] !== 70 && pb.every((x) => x >= 10 && x <= 170), `busur: pilihan unik, memuat bacaan skala yang salah (110), jawaban benar bukan yang pertama (${pb})`);
  cek(/Pilih satu bacaan/.test(L.petunjukBusur(bc.k)) && !L.periksaBusur(bc.k).ok, "busur: tanpa pilihan tidak benar");
  const salahB = L.periksaBusur(L.pilihBacaBusur(bc.k, pb.indexOf(110)));
  cek(!salahB.ok && salahB.k.salah === 1 && salahB.k.busurBenar.length === 0 && /skala yang dimulai dari garis nol/.test(L.petunjukBusur(L.pilihBacaBusur(bc.k, pb.indexOf(110)))), "busur: bacaan dari skala yang salah keliru");
  const betulB = L.periksaBusur(L.pilihBacaBusur(bc.k, pb.indexOf(70)));
  cek(betulB.ok && betulB.k.busurBenar.join() === "0" && betulB.k.busurKe === 1 && !betulB.k.tengah && !betulB.k.nol && !betulB.k.sudahBaca && betulB.k.bacaPilih === -1 && L.targetBusur(betulB.k).benda === "bilah pagar", "busur: bacaan tepat membuka sudut berikutnya dengan busur terlepas");
  sama(S.misiBaru(MK.MISI_B, betulB.k, new Set()), ["b-busur"], "busur: misi b-busur");
  cek(L.pilihBacaBusur(a, 0).bacaPilih === -1 && L.pilihBacaBusur(bc.k, 9).bacaPilih === -1, "busur: memilih sebelum membaca atau di luar daftar diabaikan");
  cek(!L.periksaBusur({ ...bc.k, tengah: false, bacaPilih: pb.indexOf(70) }).ok, "busur: busur yang dilepas lagi setelah membaca tidak dihitung");
  cek(L.lepasBusur(bc.k).tengah === false && L.lepasBusur(bc.k).sudahBaca === false && L.pasangBusur(bc.k, "tengah").sudahBaca === false, "busur: melepas atau memasang ulang membatalkan bacaan");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, busurKe: i };
    const d = DS.TARGET_BUSUR[i].deg;
    cek(L.pilihanBusur(k)[0] !== d && new Set(L.pilihanBusur(k)).size === 3 && L.pilihanBusur(k).includes(d), `busur: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  cek(L.kalimatBusur(a) === "Pasang titik tengah busur di titik sudut." && tanpaDigit(L.kalimatBusur(tn)) && tanpaDigit(L.kalimatBusur(betulB.k)), "busur: kalimat tanpa digit");
  // Jenis.
  const pj = L.pilihanJenis(a);
  cek(pj.length === 3 && new Set(pj).size === 3 && pj.includes("lancip") && pj[0] !== "lancip", `jenis: tiga pilihan unik, jawaban benar bukan yang pertama (${pj})`);
  for (let i = 0; i < 4; i += 1) {
    const k = { ...a, jenisKe: i };
    const benar = DS.jenisDari(DS.TARGET_JENIS[i].deg);
    cek(L.pilihanJenis(k)[0] !== benar && L.pilihanJenis(k).includes(benar) && new Set(L.pilihanJenis(k)).size === 3, `jenis: pilihan sasaran ${i} memuat jawaban benar bukan yang pertama`);
  }
  cek(/Pilih satu jenis/.test(L.petunjukJenis(a)) && !L.periksaJenis(a).ok, "jenis: tanpa pilihan tidak benar");
  const salahJ = L.periksaJenis(L.pilihJenisSudut(a, pj.findIndex((x) => x !== "lancip")));
  cek(!salahJ.ok && salahJ.k.salah === 1 && /pojok kertas/.test(L.petunjukJenis(L.pilihJenisSudut(a, 0))) && tanpaDigit(L.petunjukJenis(L.pilihJenisSudut(a, 0))), "jenis: jenis keliru, petunjuk membandingkan dengan pojok kertas");
  const bJ = L.periksaJenis(L.pilihJenisSudut(a, pj.indexOf("lancip")));
  cek(bJ.ok && bJ.k.jenisBenar.join() === "0" && bJ.k.jenisKe === 1 && bJ.k.jenisPilih === -1, "jenis: jenis tepat membuka sudut berikutnya");
  sama(S.misiBaru(MK.MISI_B, bJ.k, new Set()), ["b-jenis"], "jenis: misi b-jenis");
  cek(L.pilihJenisSudut(a, 8).jenisPilih === -1 && tanpaDigit(L.kalimatJenis(a)) && tanpaDigit(L.kalimatJenis(bJ.k)), "jenis: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Pasangan.
  const ps = L.pilihanPasang(a);
  cek(ps.length === 3 && new Set(ps).size === 3 && ps.includes(110) && ps[0] !== 110 && L.pasanganDari(250) === 110, `pasang: tiga pilihan unik, yang benar bukan yang pertama (${ps})`);
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, pasangKe: i };
    const n = 360 - DS.TARGET_PASANG[i].refleks;
    cek(L.pilihanPasang(k)[0] !== n && new Set(L.pilihanPasang(k)).size === 3 && L.pilihanPasang(k).includes(n), `pasang: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  const salahP = L.periksaPasang(L.pilihPasangan(a, ps.findIndex((x) => x !== 110)));
  cek(!salahP.ok && salahP.k.salah === 1 && /mengurangkan/.test(L.petunjukPasang(L.pilihPasangan(a, 0))) && tanpaDigit(L.petunjukPasang(L.pilihPasangan(a, 0))), "pasang: bilangan keliru");
  cek(/Pilih satu bilangan/.test(L.petunjukPasang(a)) && !L.periksaPasang(a).ok, "pasang: tanpa pilihan tidak benar");
  const bS = L.periksaPasang(L.pilihPasangan(a, ps.indexOf(110)));
  cek(bS.ok && bS.k.pasangBenar.join() === "0" && bS.k.pasangKe === 1 && bS.k.pasangPilih === -1, "pasang: pasangan tepat membuka sudut refleks berikutnya");
  sama(S.misiBaru(MK.MISI_B, bS.k, new Set()), ["b-pasang"], "pasang: misi b-pasang");
  cek(L.pilihPasangan(a, 5).pasangPilih === -1 && tanpaDigit(L.kalimatPasang(a)) && tanpaDigit(L.kalimatPasang(bS.k)), "pasang: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiSudut().putarKe === 0 && L.mulaiLagiSudut().deg === 30 && !L.mulaiLagiSudut().tolak && L.pilihModeSudut(a, "busur").mode === "busur", "mulai lagi dan ganti alat");
  // Misi.
  const B = MK.MISI_B;
  cek(B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(B.map((m) => m.id)).size === 6 && B.every((m) => m.id.startsWith("b-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi B: id berawalan b-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab4("B"), B, "daftarMisiK3Bab4 B");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "pasang", deg: 140, tengah: true, nol: true, sudahBaca: true, bacaPilih: 2, jenisPilih: 1, pasangPilih: 0 }, new Set()).length === 0, "misi B: pilihan yang belum diperiksa dan sudut yang diputar tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: kotak busur (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_SUDUT;
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
  for (const m of ["Lipat Kertas", "Sudut Acuan", "Langkah Busur", "Dua kaki bertemu", "Lipat kertas dua kali", "Banding dengan pojok", "Pakai satuan derajat", "Ukur dengan busur"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["titik sudut", "kaki sudut", "siku-siku", "pojok kertas", "lancip", "tumpul", "lurus", "refleks", "satuan baku", "derajat", "busur", "garis nol", "skala"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak anton|pak samsul|layang|tali|bambu|lapangan)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_SUDUT + DK.SELESAI_KARTU_SUDUT) && bersih(DK.SUARA_KARTU_SUDUT + DK.SELESAI_KARTU_SUDUT), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_SUDUT.ikon) && DK.TEMA_KARTU_SUDUT.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_SUDUT;
  cek(RG.ikon.length === DK.KARTU_SUDUT.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: tabel sudut (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_SUDUT;
  cek(B.length === 5 && DK.KOLOM_INFO_SUDUT.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["memeriksa dengan pojok kertas", "menamai jenis sudut", "mengukur dengan busur", "membaca skala busur", "mencari sudut pasangan", "lipat kertas dua kali", "siku-siku atau bukan", "lancip atau tumpul", "titik tengah di titik sudut", "garis nol", "satu putaran"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak anton|pak samsul)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_SUDUT + DK.SELESAI_INFO_SUDUT) && bersih(DK.SUARA_INFO_SUDUT + DK.SELESAI_INFO_SUDUT) && emojiSah(DK.TEMA_INFO_SUDUT.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["busur", "derajat", "lancip", "siku-siku", "tumpul", "lurus", "refleks", "penggaris", "meteran", "sentimeter", "meter"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("siku siku"), ["siku-siku"], "ucapan: siku siku dikenali sebagai siku-siku");
  sama(K.kataDariUcapan("sudut siku-siku"), ["siku-siku"], "ucapan: sudut siku-siku");
  sama(K.kataDariUcapan("sentimeter"), ["sentimeter"], "ucapan: sentimeter bukan meter");
  sama(K.kataDariUcapan("meteran"), ["meteran"], "ucapan: meteran bukan meter");
  sama(K.kataDariUcapan("tidak lancip"), [], "ucapan: tidak lancip tidak dihitung");
  sama(K.kataDariUcapan("bukan siku-siku"), [], "ucapan: bukan siku-siku tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("tumpul", nm("lancip")).cocok && !K.cocokUcapan("lurus", nm("refleks")).cocok && !K.cocokUcapan("busur", nm("derajat")).cocok && !K.cocokUcapan("sentimeter", nm("meter")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("tujuh puluh derajat"), [70], "angka: tujuh puluh derajat");
  sama(K.angkaDariUcapan("seratus empat puluh"), [140], "angka: seratus empat puluh");
  sama(K.angkaDariUcapan("seratus sepuluh"), [110], "angka: seratus sepuluh");
  sama(K.angkaDariUcapan("seratus delapan puluh"), [180], "angka: seratus delapan puluh");
  sama(K.angkaDariUcapan("dua ratus lima puluh"), [250], "angka: dua ratus lima puluh");
  sama(K.angkaDariUcapan("tiga ratus enam puluh"), [360], "angka: tiga ratus enam puluh");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("70"), [70], "angka: 70 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 360; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("seratus empat puluh derajat", an(140)).cocok && !K.cocokUcapan("seratus empat puluh", an(40)).cocok && !K.cocokUcapan("empat puluh", an(140)).cocok, "cocok: bilangan tiga angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "lipat", "acuan", "busur"];
/** Jenis tugas dasar yang diharapkan per cara dan urutan metode. */
const TIPE = { klik: ["baca", "jenis", "jenis", "langkah"], kanvas: ["hitung", "cacah", "cacah", "langkah"], suara: ["sebut", "jenis", "jenis", "baca"] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Pojok Kertas, Busur dari Nol, Baca Skala") && LC.NAMA_METODE.lipat.includes("Paper Folding") && LC.NAMA_METODE.acuan.includes("Benchmark Angles") && LC.NAMA_METODE.busur.includes("Protractor Walk"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Paper Folding, Benchmark Angles, Protractor Walk)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Sudut") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), nama === "Pictorial" && s.cara === "klik" ? ["jenis", "jenis", "jenis", "langkah"] : TIPE[s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Paper Folding|Benchmark Angles|Protractor Walk|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
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
      const kunciS = LC.kunciJawab(x, "klik");
      cek(kunciS !== null, `${nama}: jawaban sendiri ada`);
      const teksBenar = LC.teksKunciKlik(x);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan kunci`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`) || x.betul === true, `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  const dasarSalah = Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe);
  sama(dasarSalah, ["baca", "jenis", "baca"], "Cari kesalahan: membaca busur (Concrete dan Abstract), jenis sudut dengan pojok kertas (Pictorial)");
  cek(D.PICTORIAL[0].langkah[0].langkah.betul === true && !D.CONCRETE[0].langkah[0].langkah.betul && !D.ABSTRACT[0].langkah[0].langkah.betul, "Cari kesalahan: satu jawaban tokoh benar (Pictorial), dua keliru");
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.dasar.deg === 140 && sC.dasar.sisi === "kiri" && sC.jawabTokoh === "40°" && LC.teksKunciKlik(sC) === "140°" && sC.tokoh === "Raka", "Cari kesalahan Concrete: busur dibaca dari skala yang salah, tumpul 40 padahal 140 (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.dasar.deg === 90 && sP.jawabTokoh === "siku-siku" && LC.teksKunciKlik(sP) === "siku-siku" && sP.tokoh === "Bima", "Cari kesalahan Pictorial: pojok kertas lipat siku-siku benar (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.dasar.deg === 180 && sA.jawabTokoh === "90°" && LC.teksKunciKlik(sA) === "180°" && sA.tokoh === "Raka", "Cari kesalahan Abstract: sudut lurus 90 keliru, 180 (seed alur)");
  // Batas isi tiap tugas: besar sudut sungguh sah dan berbeda dari Story (kecuali seed Cari kesalahan dan acuan).
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        const degs = d.tipe === "baca" || d.tipe === "jenis" || d.tipe === "hitung" ? [d.deg] : d.tipe === "cacah" ? d.daftar : [];
        cek(degs.every((n) => n >= 10 && n <= 360 && n % 5 === 0), `${tag}: besar sudut sah (${degs})`);
        if (ls.langkah.tipe !== "salah") cek(degs.every((n) => !CERITA.has(n)), `${tag}: besar sudut berbeda dari Story (${degs})`);
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda], `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        if (d.tipe === "baca") cek(d.deg >= 10 && d.deg <= 180 && (d.sisi === "kanan" || d.sisi === "kiri"), `${tag}: membaca busur dengan sudut sampai 180`);
        if (d.tipe === "jenis" && !d.acuan) cek(["lancip", "siku-siku", "tumpul"].includes(DS.jenisDari(d.deg)), `${tag}: pembanding pojok kertas hanya untuk lancip, siku-siku, tumpul (${d.deg})`);
        if (d.tipe === "jenis" && d.acuan) cek(["tumpul", "lurus", "refleks"].includes(DS.jenisDari(d.deg)), `${tag}: sudut acuan untuk tumpul, lurus, refleks (${d.deg})`);
        if (d.tipe === "jenis" && !d.acuan && DS.jenisDari(d.deg) !== "siku-siku") cek(Math.abs(d.deg - 90) >= 20, `${tag}: sudut jelas berbeda dari pojok kertas (${d.deg})`);
        if (d.tipe === "hitung") cek([180, 270, 360].includes(d.deg), `${tag}: sudut kelipatan pojok kertas (${d.deg})`);
        if (d.tipe === "cacah") {
          cek(d.daftar.length >= 6 && d.daftar.length <= 8 && d.daftar.every((x) => x === 90 || Math.abs(x - 90) >= 20), `${tag}: deret sudut jelas berbeda dari siku-siku (${d.daftar})`);
          cek(LC.jumlahJenis(d) >= 2 && LC.jumlahJenis(d) <= 6 && d.daftar.length > LC.jumlahJenis(d), `${tag}: banyak sudut ${d.jenis} (${LC.jumlahJenis(d)})`);
        }
        if (d.tipe === "langkah") cek(d.nomor >= 1 && d.nomor <= 4, `${tag}: nomor langkah (${d.nomor})`);
      }
  // Tiap metode global tampak di tiap tahap: tiap tahap memuat semua jenis tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["baca", "jenis", "hitung", "cacah", "langkah", "sebut"].every((t) => tipe.has(t)), `${nama}: semua jenis tugas (baca, jenis, hitung, cacah, langkah, sebut) ada`);
    const jenis = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "jenis").map((d) => DS.jenisDari(d.deg))));
    cek(jenis.size >= 3, `${nama}: paling sedikit tiga jenis sudut berbeda dalam tugas jenis (${[...jenis]})`);
  }
  const semuaJenis = new Set(Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "jenis").map((d) => DS.jenisDari(d.deg)))));
  cek(["lancip", "siku-siku", "tumpul", "lurus", "refleks"].every((j) => semuaJenis.has(j)), `kelima jenis sudut muncul di tugas jenis (${[...semuaJenis]})`);
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "baca", benda: "x", deg: 70, sisi: "kanan" }, c))), [70, 70], "kunci baca: besar sudut");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "jenis", benda: "x", deg: 110, acuan: false }, c))), ["tumpul", "tumpul"], "kunci jenis: tumpul");
  sama([35, 90, 110, 180, 250].map((d) => nama(LC.kunciJawab({ tipe: "jenis", benda: "x", deg: d, acuan: false }, "klik"))), ["lancip", "siku-siku", "tumpul", "lurus", "refleks"], "kunci jenis: menurut besarnya");
  sama(["kanvas"].map((c) => nama(LC.kunciJawab({ tipe: "hitung", benda: "x", deg: 270 }, c))), [3], "kunci hitung: sudut dibagi sembilan puluh");
  sama(nama(LC.kunciJawab({ tipe: "cacah", benda: "x", daftar: [90, 30, 90, 150], jenis: "siku-siku" }, "kanvas")), 2, "kunci cacah: banyak sudut siku-siku");
  sama(nama(LC.kunciJawab({ tipe: "cacah", benda: "x", daftar: [20, 150, 65, 35], jenis: "lancip" }, "kanvas")), 3, "kunci cacah: banyak sudut lancip");
  sama([nama(LC.kunciJawab({ tipe: "langkah", benda: "x", nomor: 3 }, "kanvas")), nama(LC.kunciJawab({ tipe: "langkah", benda: "x", nomor: 3 }, "klik"))], [3, "lihat kaki kedua, baca skala dari nol"], "kunci langkah: nomor atau kegiatan");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "sebut", benda: "x", tanya: "alat" }, c))), ["busur", "busur"], "kunci sebut: alat busur");
  sama(nama(LC.kunciJawab({ tipe: "sebut", benda: "x", tanya: "satuan" }, "suara")), "derajat", "kunci sebut: satuan derajat");
  // Pengecoh.
  sama(LC.pengecoh({ tipe: "baca", benda: "x", deg: 140, sisi: "kiri" }).slice(0, 3), [40, 130, 150], "pengecoh baca: bacaan skala yang salah, sepuluh lebih kecil dan lebih besar");
  cek(LC.pengecoh({ tipe: "baca", benda: "x", deg: 180, sisi: "kanan" }).every((x) => x !== 180 && x >= 10 && x <= 180), "pengecoh: bukan kunci dan sah");
  sama(LC.pengecoh({ tipe: "baca", benda: "x", deg: 140, sisi: "kiri" }, 40).slice(0, 2), [40, 130], "pengecoh dengan jawaban tokoh di depan");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            cek(["hitung", "cacah", "langkah"].includes(d.tipe), `${namaT} ${s.nomor} ${ls.metode}: kanvas hanya untuk jawaban satu angka`);
          }
          if (s.cara === "klik") cek(kunci.n >= 10 && kunci.n <= 180, `${namaT} ${s.nomor} ${ls.metode}: jawaban klik besar sudut dalam derajat`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && tanpaDigit(kunci.nama) && (s.cara === "klik" || !/\s/.test(kunci.nama)), `${namaT} ${s.nomor} ${ls.metode}: kunci nama, kata tunggal untuk suara, bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{2,3}°$/.test(p)) && benar === `${kunci.n}°`, `${namaT} ${s.nomor}: pilihan besar sudut dalam derajat (${pil.join("/")})`);
          else if (d.tipe === "langkah") cek(pil.every((p) => LC.LANGKAH_TEKS.includes(p)), `${namaT} ${s.nomor}: pilihan kegiatan langkah busur (${pil.join("/")})`);
          else cek(pil.every((p) => /^[a-z-]+$/.test(p)), `${namaT} ${s.nomor}: pilihan nama jenis atau alat (${pil.join("/")})`);
          if (d.tipe === "jenis") cek(pil.every((p) => LC.daftarJenis(d).includes(p)), `${namaT} ${s.nomor}: pilihan jenis sesuai cara membandingkan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${namaT} ${s.nomor} ${ls.metode}: kunci suara bukan pilihan pertama`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          if (kunci.jenis === "angka") cek(K.cocokUcapan(`${LC.teksKunciPilihan(kunci)} derajat`, kunci).cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan dengan satuan juga dikenali`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 3 && baris.every((b) => typeof b === "string" && b.length > 3), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${namaT} ${s.nomor} ${ls.metode}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [4, 2, 5, 3], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [3, 4, 6, 1], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [2, 3, 5, 4], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["busur", "derajat", "lancip", "siku-siku", "tumpul", "lurus", "refleks"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/°/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan lambang derajat");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["titik sudut", "siku-siku", "lancip", "tumpul", "lurus", "refleks", "derajat", "busur derajat", "garis nol", "pasangan", "lipat kertas", "sudut acuan", "langkah busur", "360°"]) cek(poin.includes(m.replace("pasangan", "berpasangan")) || poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && /Pak Samsul/.test(D.PENUTUP_B) && /tali lintasan/.test(D.PENUTUP_B) && D.PENUTUP_B.endsWith("?"), "penutup B: jembatan ke Sub-Bab C tanpa digit");
  cek(Object.values(D.TEMA_SUDUT).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_SUDUT.pictorial.cara.includes("polos") && D.TEMA_SUDUT.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_SUDUT === D.CONCRETE && D.PICTORIAL_SUDUT === D.PICTORIAL && D.ABSTRACT_SUDUT === D.ABSTRACT && D.MISI_SUDUT_TEKS === DS.MISI_SUDUT_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabSudut.tsx", "LangkahSudut.tsx", "GambarSudut.tsx", "TahapSudut.tsx", "SimulasiLapanganSudut.tsx", "KotakBusur.tsx", "TabelSudut.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|bilah-k3b4a|lintasan-k3b4c|SubBabK3B4|diagram-k3b4/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahSudut.tsx", "TahapSudut.tsx", "SimulasiLapanganSudut.tsx", "GambarSudut.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "tanpa kelas CSS capitalize (satuan tidak menjadi huruf besar)");
  const th = readFileSync(new URL("TahapSudut.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapSudut: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapSudut: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapSudut/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapSudut: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"rumput"/.test(th) && /"busur"/.test(th) && /"lembar"/.test(th) && !/"cat"|"denah"|"kapur"|"tikar"|"peta"|"papan"|"rak"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"/.test(th), "TahapSudut: pola visual tanah lapang berumput, papan busur, lembar Kak Anton (berbeda dari bab sebelumnya)");
  cek(/1FA81/.test(th), "TahapSudut: kemajuan Concrete berupa deret layang-layang");
  const lg = readFileSync(new URL("LangkahSudut.tsx", folderUrl), "utf8");
  cek(/export function LangkahSudut/.test(lg) && /JawabSuaraSudut/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahSudut: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahSudut: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabSudut.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabSudut: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarSudut.tsx", folderUrl), "utf8");
  cek(/export function BusurSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm), "GambarSudut: busur derajat, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiLapanganSudut.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiLapanganSudut/.test(sim) && /onKeadaan/.test(sim) && /MISI_SUDUT_TEKS/.test(sim), "SimulasiLapanganSudut: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["KotakBusur.tsx", "KotakBusurK3B4"], ["TabelSudut.tsx", "TabelSudutK3B4"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Lapangan Sudut.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab4.tsx", import.meta.url), "utf8");
  cek(/SimulasiLapanganSudut/.test(sk) && /laporMisiSudut\(daftarMisiK3Bab4\("B"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab4: langkahLapanganSudutB memasang Lapangan Sudut, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b4.ts", "naskah-k3b4.ts", "eja-k3b4.ts", "dasar-k3b4b.tsx", "diagram-k3b4b.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/paper folding/i.test(ej) && /benchmark angles/i.test(ej) && /protractor walk/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
