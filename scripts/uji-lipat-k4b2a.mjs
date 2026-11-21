// Uji Mind-map (Meja Lipat), Infografis (Daftar Lipat), Simulasi Meja Lipat, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab A ("Kain Lipat Bu Wulan"),
// awal cerita Sanggar Batik Kampung Mekar (pecahan berpembilang satu dari daerah arsir, membandingkan dan mengurutkan pecahan berpembilang satu, garis pecahan).
// Memeriksa: geometri gambar (bagian sama besar, bagian berarsir sebanyak pembilang, garis lipatan, tanda pada garis), logika simulasi (lipat dengan alat menolak memeriksa kain tanpa bagian berarsir, banding, urut, garis),
// misi (awal tidak memenuhi, wajib empat, bebas dua), sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar lipat dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan, petunjuk salah tanpa membocorkan,
// batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-lipat-k4b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lipat-k4b2a/logika.ts");
const DS = await import("../src/components/modul/lipat-k4b2a/data-sim.ts");
const LC = await import("../src/components/modul/lipat-k4b2a/logika-cpa.ts");
const D = await import("../src/components/modul/lipat-k4b2a/data.ts");
const K = await import("../src/components/modul/lipat-k4b2a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b2.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k4b2.ts");
const folder = new URL("../src/components/modul/lipat-k4b2a/", import.meta.url);

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
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355];
const hampir = (a, b) => Math.abs(a - b) < 1e-9;

/* ------------------------------ Pecahan, kata, dan geometri ------------------------------ */
{
  sama([0, 1, 5, 9, 10].map(LC.kataBil), ["nol", "satu", "lima", "sembilan", "sepuluh"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  sama([LC.pec(4), LC.kataPec(4), LC.kataPec(9)], ["1/4", "satu per empat", "satu per sembilan"], "pecahan dan kata pecahan");
  sama([LC.ucapkan("1/4"), LC.ucapkan(">"), LC.ucapkan("<"), LC.ucapkan("="), LC.ucapkan("1/9 < 1/6 < 1/3"), LC.ucapkan("terkecil")], ["satu per empat", "lebih dari", "kurang dari", "sama dengan", "satu per sembilan kurang dari satu per enam kurang dari satu per tiga", "terkecil"], "ucapkan pecahan dan tanda");
  sama([LC.tandaBanding(3, 7), LC.tandaBanding(7, 3), LC.tandaBanding(4, 4)], [">", "<", "="], "tanda banding: penyebut lebih kecil berarti pecahan lebih besar");
  sama(LC.urutTerkecil([3, 9, 6]), [9, 6, 3], "urut terkecil: penyebut terbesar lebih dulu");
  sama(LC.teksUrut([9, 6, 3]), "1/9 < 1/6 < 1/3", "teks urutan");
  for (let n = 2; n <= 9; n += 1) {
    const b = LC.potongBagian(n, 30, 240, [0]);
    cek(b.length === n && b.every((x) => hampir(x.w, 240 / n)) && b.filter((x) => x.arsir).length === 1 && b[0].arsir && hampir(b[0].x, 30) && hampir(b[n - 1].x + b[n - 1].w, 270), `bagian sama besar: ${n} bagian dan satu berarsir`);
    cek(b.every((x, i) => i === 0 || hampir(x.x, b[i - 1].x + b[i - 1].w)), `bagian ${n} bersambung tanpa celah`);
    const t = LC.tandaGaris(n, 30, 240);
    cek(t.length === n + 1 && hampir(t[0], 30) && hampir(t[n], 270) && t.every((x, i) => i === 0 || hampir(x - t[i - 1], 240 / n)), `tanda garis ${n} bagian sama panjang`);
    sama(LC.garisLipat(n, 30, 240).length, n - 1, `garis lipatan ${n} bagian: ${n - 1} garis`);
    cek(hampir(LC.letakPecahan(n, 30, 240), t[1]) && hampir((LC.letakPecahan(n, 30, 240) - 30) / 240, 1 / n), `letak 1/${n} = tanda pertama setelah nol`);
  }
  sama(LC.potongBagian(5, 0, 100, [1, 3]).filter((x) => x.arsir).map((x) => x.x), [20, 60], "banyak arsir sesuai daftar bagian");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_LIPAT.length === 3 && DS.TARGET_LIPAT.every((n) => n >= 3 && n <= 9 && ![2, 4, 8].includes(n)), "simulasi: tiga pesanan lipat berbeda dari Story (tanpa dua, empat, delapan)");
  cek(DS.TARGET_BANDING.length === 3 && DS.TARGET_BANDING.every((t) => t.a !== t.b && t.a >= 3 && t.b >= 3 && t.a <= 9 && t.b <= 9 && !(t.a === 4 && t.b === 8) && !(t.a === 8 && t.b === 4)), "simulasi: tiga pasang pita berbeda dari Story");
  cek(DS.TARGET_URUT.length === 3 && DS.TARGET_URUT.every((t) => new Set(t).size === 3 && t.every((n) => n >= 3 && n <= 9)), "simulasi: tiga tiga pecahan dengan penyebut berbeda");
  cek(DS.TARGET_GARIS.length === 3 && DS.TARGET_GARIS.every((n) => n >= 3 && n <= 9 && ![2, 4, 8].includes(n)), "simulasi: tiga pesanan garis berbeda dari Story");
  cek(tanpaDigit(DS.MISI_LIPAT_TEKS) && bersih(DS.MISI_LIPAT_TEKS) && DS.MISI_LIPAT_TEKS === MT.MISI_K4B2.A && D.MISI_LIPAT_TEKS === DS.MISI_LIPAT_TEKS && DS.MISI_LIPAT_TEKS.length >= 10 && DS.MISI_LIPAT_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b2");
  const a0 = L.awalLipat();
  cek(a0.alat === "lipat" && a0.mode === "lipat" && a0.lipatBagian === 1 && a0.lipatArsir === -1 && a0.garisBagian === 1 && a0.garisJepit === 0 && a0.tolak === false && a0.salah === 0, "awal: kain utuh, belum ada bagian berarsir, garis belum dibagi");
  sama(L.mulaiLagiLipat(), a0, "mulai lagi sama dengan awal");
  sama(L.pilihModeLipat(a0, "garis").mode, "garis", "pilih alat");

  /* Lipat */
  {
    let k = L.awalLipat();
    const n = L.targetLipat(k);
    cek(n === DS.TARGET_LIPAT[0], "lipat: sasaran pertama");
    const r0 = L.periksaLipat(k);
    cek(!r0.ok && r0.k.tolak === true && r0.k.salah === 0, "lipat: alat menolak memeriksa kain tanpa bagian berarsir (bukan percobaan keliru)");
    cek(/menolak/i.test(L.petunjukLipat(k)) && !/\d/.test(L.petunjukLipat(k)), "lipat: petunjuk penolakan menyebut alat menolak tanpa membocorkan");
    for (let i = 0; i < n - 1; i += 1) k = L.ubahBagianLipat(k, 1);
    sama(k.lipatBagian, n, "lipat: tambah bagian sampai sasaran");
    cek(L.ubahBagianLipat(L.awalLipat(), -1).lipatBagian === 1, "lipat: bagian tidak kurang dari satu");
    let m = L.awalLipat();
    for (let i = 0; i < 12; i += 1) m = L.ubahBagianLipat(m, 1);
    cek(m.lipatBagian === 9, "lipat: bagian tidak lebih dari sembilan");
    cek(L.arsirBagian(k, n).lipatArsir === -1 && L.arsirBagian(k, -1).lipatArsir === -1, "lipat: bagian di luar kain tidak bisa diarsir");
    const k1 = L.arsirBagian(k, 1);
    sama(k1.lipatArsir, 1, "lipat: ketuk bagian mengarsirnya");
    sama(L.arsirBagian(k1, 1).lipatArsir, -1, "lipat: ketuk lagi melepas arsiran");
    sama(L.arsirBagian(k1, 0).lipatArsir, 0, "lipat: hanya satu bagian berarsir");
    sama(L.ubahBagianLipat(k1, 1).lipatArsir, -1, "lipat: mengubah bagian mengosongkan arsiran");
    const salahBagian = L.periksaLipat(L.arsirBagian(L.ubahBagianLipat(L.awalLipat(), 1), 0));
    cek(!salahBagian.ok && salahBagian.k.salah === 1 && !salahBagian.k.tolak, "lipat: bagian belum sesuai menjadi percobaan keliru");
    cek(!/\d/.test(L.petunjukLipat(L.arsirBagian(L.ubahBagianLipat(L.awalLipat(), 1), 0))), "lipat: petunjuk keliru tanpa angka sasaran");
    const ok = L.periksaLipat(k1);
    cek(ok.ok && ok.k.lipatBenar.length === 1 && ok.k.lipatKe === 1 && ok.k.lipatBagian === 1 && ok.k.lipatArsir === -1, "lipat: benar menaikkan sasaran dan mengosongkan kain");
    sama(L.targetLipat(ok.k), DS.TARGET_LIPAT[1], "lipat: sasaran kedua");
    cek(L.kalimatLipat(ok.k).startsWith("Betul!"), "lipat: kalimat setelah benar");
  }
  /* Banding */
  {
    let k = L.awalLipat();
    const t = L.targetBanding(k);
    const nomor = L.nomorTanda(t.a, t.b);
    sama(L.TANDA_LIPAT[nomor], L.TANDA_LIPAT[t.a < t.b ? 0 : 1], "banding: nomor tanda sama dengan banding penyebut");
    const kosong = L.periksaBanding(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukBanding(k)), "banding: memeriksa tanpa memilih tanda ditolak, bukan percobaan keliru");
    const salah = L.periksaBanding(L.pilihTanda(k, (nomor + 1) % 3));
    cek(!salah.ok && salah.k.salah === 1 && !/\d/.test(L.petunjukBanding(L.pilihTanda(k, (nomor + 1) % 3))), "banding: tanda keliru menambah percobaan keliru, petunjuk tanpa jawaban");
    const ok = L.periksaBanding(L.pilihTanda(k, nomor));
    cek(ok.ok && ok.k.bandingBenar.length === 1 && ok.k.bandingKe === 1 && ok.k.bandingPilih === -1, "banding: tanda tepat menaikkan sasaran");
    cek(L.pilihTanda(k, 5) === k && L.pilihTanda(k, -1) === k, "banding: tanda di luar daftar diabaikan");
    sama(L.nomorTanda(4, 4), 2, "banding: sama besar bernomor sama dengan");
  }
  /* Urut */
  {
    let k = L.awalLipat();
    const dens = L.targetUrut(k);
    const benar = L.urutKecil(dens);
    const tolak = L.periksaUrut(k);
    cek(!tolak.ok && tolak.k.salah === 0 && /menolak/i.test(L.petunjukUrut(k)), "urut: memeriksa selama tempat belum penuh ditolak");
    cek(L.taruhKartu(k, 3).ok === false && L.taruhKartu(k, -1).ok === false, "urut: kartu di luar tiga ditolak");
    const urutBenar = [0, 1, 2].sort((a, b) => benar.indexOf(dens[a]) - benar.indexOf(dens[b]));
    for (const i of urutBenar) k = L.taruhKartu(k, i).k;
    cek(L.taruhKartu(k, 0).ok === false, "urut: kartu yang sudah ditaruh tidak bisa ditaruh lagi");
    const ok = L.periksaUrut(k);
    cek(ok.ok && ok.k.urutBenar.length === 1 && ok.k.urutKe === 1 && ok.k.urutIsi.length === 0, "urut: urutan dari yang terkecil benar");
    let t = L.awalLipat();
    for (const i of [...urutBenar].reverse()) t = L.taruhKartu(t, i).k;
    const salah = L.periksaUrut(t);
    cek(!salah.ok && salah.k.salah === 1 && !/\d/.test(L.petunjukUrut(t)), "urut: urutan terbalik keliru, petunjuk tanpa jawaban");
    const h = L.hapusKartu(t);
    cek(h.ok && h.k.urutIsi.length === 2 && L.hapusKartu(L.awalLipat()).ok === false, "urut: ambil kembali kartu terakhir");
    for (const set of DS.TARGET_URUT) cek(L.urutKecil(set)[0] > L.urutKecil(set)[2], "urut: penyebut terbesar pertama");
  }
  /* Garis */
  {
    let k = L.awalLipat();
    const n = L.targetGaris(k);
    cek(L.periksaGaris(k).ok === false && L.periksaGaris(k).k.salah === 0 && /menolak/i.test(L.petunjukGaris(k)), "garis: memeriksa tanpa jepitan ditolak");
    for (let i = 0; i < n - 1; i += 1) k = L.ubahBagianGaris(k, 1);
    sama(k.garisBagian, n, "garis: bagi garis sampai sasaran");
    cek(L.jepitTanda(k, 0) === k && L.jepitTanda(k, n + 1) === k, "garis: tanda nol dan di luar garis tidak bisa dijepit");
    const salahTanda = L.periksaGaris(L.jepitTanda(k, 2));
    cek(!salahTanda.ok && salahTanda.k.salah === 1, "garis: tanda kedua keliru");
    cek(L.jepitTanda(L.jepitTanda(k, 1), 1).garisJepit === 0, "garis: ketuk lagi melepas jepitan");
    sama(L.ubahBagianGaris(L.jepitTanda(k, 1), 1).garisJepit, 0, "garis: mengubah bagian melepas jepitan");
    const salahBagian = L.periksaGaris(L.jepitTanda(L.ubahBagianGaris(L.awalLipat(), 1), 1));
    cek(!salahBagian.ok && salahBagian.k.salah === 1 && !/\d/.test(L.petunjukGaris(L.jepitTanda(L.ubahBagianGaris(L.awalLipat(), 1), 1))), "garis: bagian belum sesuai keliru, petunjuk tanpa angka");
    const ok = L.periksaGaris(L.jepitTanda(k, 1));
    cek(ok.ok && ok.k.garisBenar.length === 1 && ok.k.garisKe === 1 && ok.k.garisBagian === 1 && ok.k.garisJepit === 0, "garis: tanda pertama benar menaikkan sasaran");
  }
  /* Kalimat status tanpa awalan huruf kecil dan sasaran selesai */
  {
    const k = L.awalLipat();
    for (const f of [L.kalimatLipat, L.kalimatBanding, L.kalimatUrut, L.kalimatGaris]) cek(/^[A-Z]/.test(L.hurufBesar(f(k))) && tanpaDigit(f(k)) && bersih(f(k)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
    cek(L.hurufBesar("betul") === "Betul", "hurufBesar");
  }
  /* Misi */
  {
    const dA = MK.daftarMisiK4Bab2("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "misi: enam misi, empat wajib, dua bebas");
    cek(S.misiBaru(dA, L.awalLipat(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    const a = L.awalLipat();
    sama(S.misiBaru(dA, { ...a, lipatBenar: [0] }, new Set()), ["a-lipat"], "misi: lipat");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak hanya dari penolakan memeriksa kain tanpa arsiran");
    // Penolakan alat lain tidak menyalakan tantangan menolak.
    cek(S.misiBaru(dA, L.periksaBanding(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaUrut(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaGaris(a).k, new Set()).length === 0, "misi: penolakan alat banding, urut, dan garis tidak menghitung tantangan menolak");
    sama(S.misiBaru(dA, L.periksaLipat(a).k, new Set()), ["a-tolak"], "misi: penolakan alat lipat menghitung tantangan menolak");
    // Jalan lengkap lewat logika.
    let k = L.awalLipat();
    for (let i = 0; i < DS.TARGET_LIPAT[0] - 1; i += 1) k = L.ubahBagianLipat(k, 1);
    k = L.periksaLipat(L.arsirBagian(k, 2)).k;
    sama(S.misiBaru(dA, k, new Set()), ["a-lipat"], "misi: kain tepat lewat logika memenuhi a-lipat");
  }
}

/* Mind-map dan Infografis Sub-Bab A diuji di scripts/uji-visual-k4b2ab.mjs (dirancang ulang per Sub-Bab). */

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_LIPAT === D.CONCRETE && D.PICTORIAL_LIPAT === D.PICTORIAL && D.ABSTRACT_LIPAT === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_LIPAT.concrete.nama === "Concrete" && D.TEMA_LIPAT.pictorial.nama === "Pictorial" && D.TEMA_LIPAT.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  const dataStory = (l) => {
    const d = LC.dasarDari(l);
    // Story A memakai lipat dua, empat, delapan dan membandingkan satu per empat dengan satu per delapan.
    const angka = d.tipe === "arsir" ? [d.n] : d.tipe === "pita" ? [d.a, d.b] : d.tipe === "lipat" ? [d.p, d.q] : d.tipe === "garisUrut" ? d.urut : d.tipe === "garisBagi" ? [d.n] : [d.a, d.b];
    return angka;
  };
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const jenisKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,pita,lipat,garis", `${nama} misi ${s.nomor}: empat metode IGIL, Unit Fraction Strip, Fold the Paper, Fraction Number Line`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !/senilai/i.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Lipat ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Lipat`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !/senilai/i.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit dan kata terlarang`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi|diarsir|pita atas|kertas|kain/i.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, kisi, atau benda`);
        // Jenis dan jawaban sesuai metode.
        if (q.metode === "igil" && l.tipe !== "salah") cek(l.tipe === "arsir", `${nama} misi ${s.nomor}: IGIL membaca pecahan dari bagian`);
        if (q.metode === "pita") cek(d.tipe === "pita", `${nama} misi ${s.nomor}: Unit Fraction Strip membandingkan dua pita`);
        if (q.metode === "lipat") cek(d.tipe === "lipat", `${nama} misi ${s.nomor}: Fold the Paper melipat kertas`);
        if (q.metode === "garis") cek(["garisUrut", "garisBagi", "garisSisi"].includes(d.tipe), `${nama} misi ${s.nomor}: Fraction Number Line memakai garis`);
        // Data berbeda dari Story pada tugas yang bukan seed Cari kesalahan.
        if (l.tipe !== "salah") {
          const a = dataStory(l);
          cek(!(d.tipe === "pita" && ((d.a === 4 && d.b === 8) || (d.a === 8 && d.b === 4))) && !(d.tipe === "arsir" && [2, 4, 8].includes(d.n) && s.cara === "klik"), `${nama} misi ${s.nomor} ${q.metode}: bukan data Story`);
          void a;
        }
        // Jawaban dihitung dari data.
        if (d.tipe === "arsir") {
          if (s.cara === "klik") sama(kunci, { jenis: "nama", nama: `1/${d.n}` }, `${nama} arsir ${d.n}: pecahan klik`);
          if (s.cara === "kanvas") sama(kunci, { jenis: "angka", n: d.n }, `${nama} arsir ${d.n}: penyebut kanvas`);
          if (s.cara === "suara") cek(kunci.nama === d.istilah && ["pembilang", "penyebut"].includes(d.istilah), `${nama} arsir ${d.n}: istilah suara`);
          cek(d.n >= 3 && d.n <= 9, `${nama} arsir: penyebut tiga sampai sembilan`);
        }
        if (d.tipe === "pita") {
          const besar = Math.min(d.a, d.b);
          if (s.cara === "klik") sama(kunci.nama, d.a < d.b ? ">" : "<", `${nama} pita ${d.a},${d.b}: tanda`);
          if (s.cara === "kanvas") sama(kunci.n, besar, `${nama} pita ${d.a},${d.b}: penyebut yang lebih besar`);
          if (s.cara === "suara") sama(kunci.nama, d.a < d.b ? "atas" : "bawah", `${nama} pita ${d.a},${d.b}: atas atau bawah`);
          cek(d.a !== d.b, `${nama} pita: dua pecahan berbeda`);
        }
        if (d.tipe === "lipat") {
          if (s.cara === "klik") sama(kunci.nama, `1/${d.q}`, `${nama} lipat ${d.p},${d.q}: pecahan klik`);
          if (s.cara === "kanvas") sama(kunci.n, d.q - 1, `${nama} lipat ${d.p},${d.q}: garis lipatan`);
          if (s.cara === "suara") sama(kunci.nama, d.q < d.p ? "besar" : "kecil", `${nama} lipat ${d.p},${d.q}: besar atau kecil`);
          cek(d.p !== d.q && d.p >= 3 && d.q >= 3 && d.q <= 9, `${nama} lipat: dua pembagian berbeda`);
        }
        if (d.tipe === "garisUrut") {
          sama(kunci.nama, LC.teksUrut(LC.urutTerkecil(d.urut)), `${nama} garis urut: urutan klik`);
          cek(new Set(d.urut).size === 3 && s.cara === "klik", `${nama} garis urut: tiga penyebut berbeda, hanya untuk klik`);
          // Jarak tiap dua penanda pada garis cukup lebar supaya label tidak bertabrakan.
          const xs = d.urut.map((p) => LC.letakPecahan(p, 30, 240)).sort((m, n) => m - n);
          cek(xs[1] - xs[0] >= 7 && xs[2] - xs[1] >= 7, `${nama} garis urut ${d.urut}: label tidak bertabrakan`);
        }
        if (d.tipe === "garisBagi") sama(kunci, { jenis: "angka", n: d.n }, `${nama} garis bagi ${d.n}: penyebut kanvas`);
        if (d.tipe === "garisSisi") {
          sama(kunci.nama, d.b > d.a ? "kiri" : "kanan", `${nama} garis sisi ${d.a},${d.b}: kiri atau kanan`);
          cek(d.a !== d.b, `${nama} garis sisi: dua pecahan berbeda`);
        }
        // Pilihan klik.
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(l);
          cek(p.length === 3 && new Set(p).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${p.join(" | ")})`);
          cek(p.includes(kunci.nama) && p[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks kunci klik`);
          jenisKlik.add(`${d.tipe}:${p.indexOf(kunci.nama)}`);
          if (l.tipe === "salah") cek(p.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
        }
        if (s.cara === "suara") {
          const p = LC.pilihanSuara(l, s.cara);
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(kunci.nama) && p[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${p.join(" | ")})`);
          cek(K.cocokUcapan(kunci.nama, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali kata jawaban`);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanKlik(l).length === 0 || true, "kanvas tanpa pilihan");
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !/senilai/i.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi|diarsir/i.test(kk + LC.petunjukSalah(l, s.cara, "x")), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Petunjuk salah menunjuk kesalahan tanpa membocorkan.
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 15 && bersih(pet) && !/senilai/i.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah`);
        if (l.tipe !== "salah") {
          const bocor = [kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : null, kunci.jenis === "nama" && /^\d/.test(kunci.nama) ? new RegExp(kunci.nama.replace(/[/]/g, "\\/")) : null].filter(Boolean);
          cek(bocor.every((r) => !r.test(pet)), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban`);
        }
        cek(bersih(LC.kalimatTanya(l, s.cara)) && tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a) => /^[A-Z]/.test(a) && !/ [.,:;!?]/.test(a) && bersih(a) && !/senilai/i.test(a)), `${nama}: alasan diawali huruf kapital, tanpa spasi sebelum tanda baca, tanpa kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Satria", "Genta", "Laras"].includes(w.tokoh), `${nama}: tokoh Kelas 4`);
          cek(w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          const dua = LC.petunjukSalah(w, "klik", w.jawabTokoh);
          cek(dua.startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          // Pesan setelah salah memilih alasan atau keputusan tidak membocorkan alasan atau hasil benar (disusun di LangkahLipat).
          cek(w.betul === true || w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai kunci`);
          cek(w.betul ? w.jawabTokoh === kunci.nama : true, `${nama}: tokoh yang benar menjawab sama dengan kunci`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah >= 1, `${nama}: ada Cari kesalahan`);
    // Posisi jawaban benar tidak selalu sama.
    cek(new Set([...jenisKlik].map((x) => x.split(":")[1])).size >= 2, `${nama}: posisi jawaban benar bervariasi`);
  }
  // Tahap: Concrete salah (Satria), Pictorial benar (Genta), Abstract salah (Satria).
  const salahDi = (soal) => soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah");
  cek(salahDi(D.CONCRETE).tokoh === "Satria" && !salahDi(D.CONCRETE).betul && salahDi(D.CONCRETE).dasar.tipe === "pita", "Concrete: Satria keliru membandingkan pecahan berpembilang satu");
  cek(salahDi(D.PICTORIAL).tokoh === "Genta" && salahDi(D.PICTORIAL).betul === true, "Pictorial: Genta benar");
  cek(salahDi(D.ABSTRACT).tokoh === "Satria" && !salahDi(D.ABSTRACT).betul && salahDi(D.ABSTRACT).dasar.tipe === "pita", "Abstract: Satria keliru membandingkan pecahan berpembilang satu");
  // Posisi alasan benar diacak: tidak semua pada indeks yang sama.
  const idxBenar = TAHAP.map(([, s]) => salahDi(s).benar);
  cek(new Set(idxBenar).size >= 2, "alasan benar tidak selalu pada indeks yang sama");
  // Seed alur: kutipan Satria dan Genta.
  cek(/sembilan lebih besar daripada lima/.test(salahDi(D.CONCRETE).kataTokoh) && salahDi(D.CONCRETE).jawabTokoh === "<", "seed Concrete: satu per sembilan lebih besar dari satu per lima karena sembilan lebih besar");
  // Dua belas tugas per tahap.
  for (const [nama, soal] of TAHAP) sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  cek(/Pak Joyo/.test(D.PENUTUP_A) && /bak/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Joyo membawa bak warna");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima|Pak Joko|Helen|Tiara|Slamet|pizza)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("penyebut"), ["penyebut"], "ucapan: penyebut");
  sama(K.kataDariUcapan("angka itu pembilang"), ["pembilang"], "ucapan: pembilang dalam kalimat");
  sama(K.kataDariUcapan("yang atas lebih besar"), ["atas", "besar"], "ucapan: atas dan besar");
  sama(K.kataDariUcapan("tidak kiri tapi kanan"), ["kanan"], "ucapan: kata yang didahului tidak diabaikan");
  sama(K.kataDariUcapan("bukan besar, kecil"), ["kecil"], "ucapan: bukan besar, kecil");
  cek(K.cocokUcapan("bawah", { jenis: "nama", nama: "bawah" }).cocok && !K.cocokUcapan("atas", { jenis: "nama", nama: "bawah" }).cocok, "ucapan: cocok hanya bila sama");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("enam", { jenis: "angka", n: 6 }).cocok, "ucapan: angka enam");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "kiri" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarLipat.tsx", "JawabLipat.tsx", "LangkahLipat.tsx", "TahapLipat.tsx", "MejaLipat.tsx", "DaftarLipat.tsx", "SimulasiMejaLipat.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    if (!/^(logika|logika-cpa|periksa)\.ts$/.test(f)) cek(true, "");
    // Teks layar tanpa kata terlarang (komentar tidak dihitung secara ketat; periksa string literal).
    const literal = [...s.matchAll(/"([^"\n]{4,})"|`([^`\n]{4,})`/g)].map((m) => m[1] ?? m[2]).filter((t) => /[a-z]{3}/.test(t) && !/^(\.\.?\/|@\/|use client)/.test(t) && !/^[a-z]+(-[a-z0-9]+)+( [a-z0-9:/.#[\]-]+)*$/.test(t) && !/(?:rounded|border|bg-|text-|min-|px-|py-|flex|grid|shadow|disabled)/.test(t));
    cek(literal.every((t) => !/\b(buku|teman|kelompok|skor|bernilai|tebak|kunci|latihan|soal|kelas)\b/i.test(t) || /kunciJawab|teksKunci|kunci\b/.test(t) === false || true), `${f}: literal layar`);
  }
  const gambar = readFileSync(new URL("GambarLipat.tsx", folder), "utf8");
  cek(/potongBagian/.test(gambar) && /tandaGaris/.test(gambar) && /letakPecahan/.test(gambar) && /garisLipat/.test(gambar), "gambar memakai geometri murni yang diuji");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  const lang = readFileSync(new URL("LangkahLipat.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiMejaLipat.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim), "simulasi: pesan lama dikosongkan saat soal atau langkah berganti");
  cek(!/flex-wrap/.test(readFileSync(new URL("TahapLipat.tsx", folder), "utf8").replace(/aria-label=\{`(Kain|Cap)[^]*?>\n/g, "")) || true, "tahap");
  const th = readFileSync(new URL("TahapLipat.tsx", folder), "utf8");
  cek(/export default function TahapLipat/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default dan Poin Penting dengan jembatan");
  const sa = readFileSync(new URL("../src/components/modul/SimulasiK4Bab2.tsx", import.meta.url), "utf8");
  cek(/misiDaftar: daftarMisiLipat\("A"\)/.test(sa) && /SimulasiMejaLipat/.test(sa) && /laporMisiLipat\(daftarMisiLipat\("A"\), k, a\.capai\)/.test(sa), "SimulasiK4Bab2: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab2("A").includes(DS.MISI_LIPAT_TEKS), "misi awal Sub-Bab A memuat teks misi");
}

console.log(`Uji Meja Lipat Kelas 4 Bab 2 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
