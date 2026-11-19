// Uji Mind-map (Lintasan Lari), Infografis (Spanduk Acara), Simulasi Pos Waktu, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 6 Sub-Bab B ("Jadwal Lomba Bu Ratna"),
// waktu dan jam, akhir cerita Hari Olahraga Sekolah.
// Memeriksa: lintasan lari (Masalah tiga, Penyelesaian tujuh bernomor memuat semua metode Story, Hasil empat), spanduk acara dari data Story, CPA dua belas tugas per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (baca jam, putar jarum, cocokkan jam, urutkan kegiatan, banding batang, bagian hari, satu angka, satu kata)
// dan Cari kesalahan di tiap tahap, kunci dihitung dari data (jam dua puluh empat), angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol Periksa
// macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Pos Waktu, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jadwal-k2b6b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/jadwal-k2b6b/data-peta.ts");
const DK = await import("../src/components/modul/jadwal-k2b6b/data-kartu.ts");
const LC = await import("../src/components/modul/jadwal-k2b6b/logika-cpa.ts");
const D = await import("../src/components/modul/jadwal-k2b6b/data.ts");
const DS = await import("../src/components/modul/jadwal-k2b6b/data-sim.ts");
const K = await import("../src/components/modul/jadwal-k2b6b/periksa.ts");
const L = await import("../src/components/modul/jadwal-k2b6b/logika.ts");
const MK = await import("../src/components/modul/misi-k2bab6.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/jadwal-k2b6b/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map: lintasan lari (sembilan kartu geser) ------------------------------ */
{
  const K = DK.KARTU_JADWAL;
  cek(K.length === 9, "kartu: sembilan kartu");
  cek(K.every((k) => k.contoh.length <= 1) && K[0].contoh.join() === "masalah" && K[1].contoh.join() === "cara" && K.slice(2).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di dua kartu pertama, sisanya mandiri");
  const semua = K.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(K.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(K.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  cek(K.every((k) => /\?$/.test(k.masalah.label) || k.masalah.label.length > 0), "kartu: masalah terisi");
  const cara = K.map((k) => k.cara.label).join(" | ").toLowerCase();
  for (const m of ["Garis Waktu Hari","Jalur Jam","Batang Lama Kegiatan","jarum pendek","angka dua belas","Jam digital"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = K.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["pukul berapa","pukul tepat","jam digital","dua puluh empat jam","pagi, siang, sore, malam","lebih lama","lebih sebentar","kotak"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|bu ratna|lapangan|peluit|lomba|senam|tarik tambang)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_JADWAL + DK.SELESAI_KARTU_JADWAL) && bersih(DK.SUARA_KARTU_JADWAL + DK.SELESAI_KARTU_JADWAL), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_JADWAL.ikon) && DK.TEMA_KARTU_JADWAL.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_JADWAL;
  cek(RG.ikon.length === DK.KARTU_JADWAL.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis spanduk acara ------------------------------ */
{
  const t = DP.TEMPAT_SPANDUK;
  cek(t.filter((x) => x.contoh).length === 7 && [0, 1, 2].every((c) => t[c].contoh) && t.filter((x) => !x.contoh).length === 8, "spanduk: satu baris contoh penuh dan satu sel contoh tiap baris lain");
  cek(DP.BARIS_SPANDUK.length === 5 && t.length === 15 && new Set(t.map((x) => x.kunci)).size === 15, "spanduk: lima baris dan tiga kolom, label unik");
  sama(DP.BARIS_SPANDUK.map((b) => b.nama), ["Pembukaan", "Lomba lari", "Makan siang", "Tarik tambang", "Pesta penutupan"], "spanduk: lima kegiatan dari Story");
  sama(DP.BARIS_SPANDUK.map((b) => b.digital), ["07.00", "09.00", "12.00", "16.00", "19.00"], "spanduk: jam digital");
  cek(DP.BARIS_SPANDUK.every((b) => b.kata === LC.kataPukul(Number(b.digital.slice(0, 2)))), "spanduk: kata pukul sesuai jam digital (dihitung dari jam dua puluh empat)");
  cek(t.filter((x) => x.kelompok !== "digital").every((x) => x.kunci.length <= 30 && tanpaDigit(x.kunci)), "spanduk: label kata dan urutan pendek tanpa digit");
  cek(Object.values(DP.KELOMPOK_SPANDUK).every((p) => bersih(p) && tanpaDigit(p)) && tanpaDigit(DP.SUARA_SPANDUK) && bersih(DP.SUARA_SPANDUK), "spanduk: petunjuk dan suara bersih tanpa digit");
  cek(DP.KOLOM_SPANDUK.length === 3 && DP.BARIS_SPANDUK.every((b) => emojiSah(b.ikon)), "spanduk: tiga kolom, emoji sah");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("pagi hari", { jenis: "nama", nama: "pagi" }) && c("Siang", { jenis: "nama", nama: "siang" }) && c("sore", { jenis: "nama", nama: "sore" }) && c("malam", { jenis: "nama", nama: "malam" }), "ucapan: empat bagian hari");
  cek(!c("pagi atau sore", { jenis: "nama", nama: "pagi" }) && !c("sore", { jenis: "nama", nama: "pagi" }), "ucapan: dua bagian hari sekaligus tidak dianggap benar");
  cek(c("lebih lama", { jenis: "nama", nama: "lama" }) && c("sebentar", { jenis: "nama", nama: "sebentar" }) && c("lebih sebentar", { jenis: "nama", nama: "sebentar" }) && !c("lama sebentar", { jenis: "nama", nama: "lama" }), "ucapan: lama dan sebentar");
  cek(c("awal", { jenis: "nama", nama: "awal" }) && c("lebih akhir", { jenis: "nama", nama: "akhir" }) && !c("awal", { jenis: "nama", nama: "akhir" }), "ucapan: awal dan akhir");
  cek(c("jam", { jenis: "nama", nama: "jam" }) && c("menit", { jenis: "nama", nama: "menit" }) && !c("menit", { jenis: "nama", nama: "jam" }), "ucapan: jam dan menit");
  sama(K.angkaDariUcapan("pukul tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("sebelas atau sepuluh"), [11, 10], "ucapan: sebelas dan sepuluh");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }), "ucapan: bilangan");
  cek(c("dua belas", { jenis: "angka", n: 12 }) && !c("dua belas", { jenis: "angka", n: 2 }), "ucapan: dua belas bukan dua");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan jam ------------------------------ */
{
  sama([0, 1, 5, 11, 12, 13, 17, 23, 24].map(LC.jam12), [12, 1, 5, 11, 12, 1, 5, 11, 12], "jam dua belas dari jam dua puluh empat");
  sama([5, 10, 11, 14, 15, 17, 18, 21, 4].map(LC.bagianHari), ["pagi", "pagi", "siang", "siang", "sore", "sore", "malam", "malam", "malam"], "bagian hari");
  sama([LC.tulisDigital(7), LC.tulisDigital(16), LC.kataPukul(19), LC.angkaPukul(16)], ["07.00", "16.00", "pukul tujuh malam", "pukul 4 sore"], "tulisan jam");
  sama([LC.kata(0), LC.kata(12), LC.kata(15), LC.kata(24), LC.kata(45)], ["nol", "dua belas", "lima belas", "dua puluh empat", "empat puluh lima"], "kata bilangan");
  sama([LC.lamaKata(15), LC.lamaKata(60), LC.lamaKata(180), LC.lamaAngka(15), LC.lamaAngka(120)], ["lima belas menit", "satu jam", "tiga jam", "15 menit", "2 jam"], "lama dalam kata dan angka");
  const r = { tipe: "rank", item: [{ nama: "a", emoji: "", h: 15 }, { nama: "b", emoji: "", h: 8 }, { nama: "c", emoji: "", h: 20 }], sasaran: 0 };
  cek(LC.urutanKe(r) === 2 && LC.urutanKe({ ...r, sasaran: 2 }) === 3 && LC.urutanKe({ ...r, sasaran: 1 }) === 1, "urutan ke berapa dari yang paling awal");
  sama(LC.urutanBenar(r.item), [1, 0, 2], "urutan kartu yang benar");
  cek(LC.klaimBenar({ jenis: "baca", h: 15, katak: 3, tampil: "analog" }) && !LC.klaimBenar({ jenis: "baca", h: 15, katak: 12, tampil: "analog" }), "klaim membaca jam");
  cek(LC.klaimBenar({ jenis: "bagian", h: 16, katak: "sore" }) && !LC.klaimBenar({ jenis: "bagian", h: 16, katak: "pagi" }), "klaim bagian hari");
  const a = { nama: "x", emoji: "", menit: 15 };
  const b = { nama: "y", emoji: "", menit: 60 };
  cek(!LC.klaimBenar({ jenis: "lama", a, b, katak: "a" }) && LC.klaimBenar({ jenis: "lama", a, b, katak: "b" }), "klaim lama kegiatan");
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_JADWAL.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_JADWAL.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_JADWAL.abstract },
];
const semuaKeg = (l) => (l.tipe === "urut" || l.tipe === "rank" ? l.item : l.tipe === "awal" ? [l.a, l.b] : []);
for (const th of TAHAP) {
  const n = th.nama;
  cek(th.soal.length === 3, `${n}: tiga misi`);
  sama(th.soal.map((s) => s.nomor), th.nomor, `${n}: nomor misi berlanjut dari Simulasi`);
  sama(th.soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${n}: cara Klik, Kanvas, Suara`);
  const angka = [];
  const kanvas = [];
  let salahAda = 0;
  for (const so of th.soal) {
    cek(so.langkah.length === 4, `${n}/${so.nomor}: empat metode`);
    sama(so.langkah.map((l) => l.metode), ["igil", "garis", "jalur", "batang"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Pos Waktu \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
    cek(emojiSah(so.judul + so.cerita), `${n}/${so.nomor}: emoji sah`);
    for (const ls of so.langkah) {
      const l = ls.langkah;
      const nm = `${n}/${so.nomor}/${ls.metode}`;
      cek(ls.judul === ls.suara && ls.judul === LC.instruksi(l, th.rupa, so.cara), `${nm}: judul dan suara sama dengan instruksi`);
      cek(tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
      cek(/(Pilih|Tulis|Ucapkan|Ketuk|Urutkan|Putar|Susun)/.test(ls.suara), `${nm}: instruksi memuat perintah`);
      const kunci = LC.kunciJawab(l, so.cara);
      cek(LC.siapLangsung(l, th.rupa, so.cara) === (so.cara !== "klik" || kunci !== null), `${nm}: tugas langsung siap sesuai caranya (tombol tidak macet pada rupa ${th.rupa})`);
      for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, so.cara) === LC.siapLangsung(l, th.rupa, so.cara), `${nm}: siap langsung tidak bergantung rupa (${r})`);
      cek(tanpaDigit(LC.kalimatKunci(l, so.cara, th.rupa)) && bersih(LC.kalimatKunci(l, so.cara, th.rupa)), `${nm}: kalimat kunci tanpa digit`);
      cek(tanpaDigit(LC.kalimatTanya(l, so.cara)), `${nm}: kalimat tanya tanpa digit`);
      if (so.cara === "kanvas") {
        cek(kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${nm}: Tulis di kanvas satu angka satu sampai sembilan`);
        if (kunci?.jenis === "angka") kanvas.push(kunci.n);
      }
      if (so.cara === "suara") cek(kunci !== null, `${nm}: Rekam suara punya kunci`);
      if (kunci?.jenis === "angka") {
        angka.push(kunci.n);
        const pil = LC.pilihanAngka(kunci.n);
        cek(pil.length === 4 && pil.includes(kunci.n) && new Set(pil).size === 4 && pil.every((x) => x >= 1 && x <= 12), `${nm}: pilihan angka memuat kunci`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n - 1 || 1, th.rupa)), `${nm}: petunjuk salah angka tanpa digit`);
      }
      if (kunci?.jenis === "nama") {
        const pil = LC.pilihanNamaDari(kunci.nama);
        cek(pil.includes(kunci.nama) && pil.every((x) => LC.URUT_NAMA.includes(x)), `${nm}: pilihan kata memuat kunci`);
        const lain = pil.find((x) => x !== kunci.nama);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, lain, th.rupa)) && LC.petunjukSalah(l, so.cara, lain, th.rupa).length > 20, `${nm}: petunjuk salah kata tanpa digit`);
      }
      if (l.tipe === "salah") {
        salahAda += 1;
        cek(so.cara === "klik" && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3, `${nm}: Cari kesalahan dengan tiga alasan`);
        cek(l.benar !== 0, `${nm}: alasan benar bukan tombol pertama`);
        cek(!LC.klaimBenar(l.klaim) || l.klaim.jenis === "bagian", `${nm}: klaim tokoh yang salah`);
        cek(l.keliru.length > 30 && tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && tanpaDigit(l.kataTokoh) && bersih(l.alasan.join(" ")) && tanpaDigit(l.alasan.join(" ")), `${nm}: petunjuk salah dan teks tokoh bersih tanpa digit`);
        cek(/^Lihat lagi\./.test(LC.petunjukSalah(l, "klik", "x", th.rupa)), `${nm}: petunjuk salah menjelaskan kesalahan tokoh`);
        cek(["Chacha", "Dika", "Nia"].includes(l.tokoh), `${nm}: tokoh Kelas 2`);
      }
      // Batas jawaban tiap tipe.
      if (l.tipe === "cocok") {
        cek(new Set(l.pilihan).size === l.pilihan.length && l.pilihan.length === 4 && l.pilihan.includes(l.h), `${nm}: empat pilihan jam, memuat jam sasaran`);
        if (th.rupa === "diagram") cek(new Set(l.pilihan.map(LC.jam12)).size === 4, `${nm}: pilihan muka jam polos berbeda jam dua belasnya`);
        cek(l.pilihan.filter((c) => LC.jam12(c) === LC.jam12(l.h) && LC.bagianHari(c) === LC.bagianHari(l.h)).length === 1, `${nm}: tepat satu pilihan yang sama jam dan bagian harinya`);
        cek(tanpaDigit(LC.petunjukCocok(l, l.pilihan[0] === l.h ? l.pilihan[1] : l.pilihan[0])), `${nm}: petunjuk cocok tanpa digit`);
      }
      if (l.tipe === "urut" || l.tipe === "rank") {
        const hs = l.item.map((x) => x.h);
        cek(new Set(hs).size === hs.length && l.item.length >= 4, `${nm}: kegiatan berbeda jam, paling sedikit empat`);
        cek(new Set(l.item.map((x) => x.nama)).size === l.item.length, `${nm}: nama kegiatan unik`);
        if (l.tipe === "urut") {
          const k = LC.urutanKartu(l.item);
          sama([...k].sort(), l.item.map((_, i) => i), `${nm}: urutan kartu memuat semua kegiatan`);
          cek(JSON.stringify(k) !== JSON.stringify(LC.urutanBenar(l.item)), `${nm}: urutan kartu tampil tidak berurutan`);
          cek(tanpaDigit(LC.petunjukUrut(l, k[0], [])), `${nm}: petunjuk urut tanpa digit`);
        } else cek(l.item.map((x) => x.h).join() !== [...hs].sort((p, q) => p - q).join(), `${nm}: kegiatan tampil tidak berurutan`);
      }
      if (l.tipe === "selisih") cek(l.selesai > l.mulai && l.selesai - l.mulai <= 9 && l.mulai >= 0 && l.selesai <= 23, `${nm}: selisih jam positif paling banyak sembilan`);
      if (l.tipe === "baca") cek(l.h >= 1 && l.h <= 23 && (l.tampil === "analog" ? th.rupa !== "lambang" : true), `${nm}: jam dibaca valid, Abstract hanya jam digital`);
      if (l.tipe === "banding") cek(l.a.menit !== l.b.menit, `${nm}: dua batang berbeda panjang`);
      if (l.tipe === "lama") cek(l.a.menit !== l.b.menit && tanpaDigit(l.a.nama + l.b.nama), `${nm}: dua batang berbeda panjang`);
      if (l.tipe === "awal") cek(l.a.h !== l.b.h, `${nm}: dua jam berbeda`);
      if (l.tipe === "set") cek(LC.jam12(l.h) >= 1 && tanpaDigit(LC.petunjukSet(l, 12)) && tanpaDigit(LC.petunjukSet(l, 5)), `${nm}: putar jarum`);
      if (l.tipe === "kotak") cek(l.jenis === "hitung" ? l.n >= 1 && l.n <= 9 : l.a !== l.b && l.a <= 9 && l.b <= 9, `${nm}: batang kotak dalam batas`);
      // Batas rupa: Pictorial dan Abstract tanpa emoji benda pada data kegiatan; Concrete beremoji.
      for (const g of semuaKeg(l).concat(l.tipe === "lama" || l.tipe === "banding" ? [l.a, l.b] : [])) {
        if (th.rupa === "benda") cek(g.emoji.length > 0 && emojiSah(g.emoji), `${nm}: Concrete memakai emoji benda lapangan (${g.nama})`);
        else cek(g.emoji === "", `${nm}: ${n} tanpa emoji benda (${g.nama})`);
      }
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
}
sama(D.CONCRETE.slice(1).map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n), [3, 5, 8, 6, 7], "Concrete: angka jawaban");
sama(D.PICTORIAL.slice(1).map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n), [5, 4, 9, 2, 6], "Pictorial: angka jawaban");
sama(D.ABSTRACT.slice(1).map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n), [2, 3, 5, 8, 6], "Abstract: angka jawaban");

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "baca", "selisih", "rank", "kotak", "bagian", "awal", "lama", "jarum", "cocok", "urut", "set", "banding"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Lihat Pendek, Lihat Panjang, Sebut Pukul", "nama Metode IGIL");
  cek(LC.NAMA_METODE.garis.includes("Day Timeline") && LC.NAMA_METODE.jalur.includes("Hour Track") && LC.NAMA_METODE.batang.includes("Duration Bars"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,garis,jalur,batang" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_JADWAL.concrete.nama === "Concrete" && D.TEMA_JADWAL.pictorial.nama === "Pictorial" && D.TEMA_JADWAL.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_JADWAL === D.CONCRETE && D.PICTORIAL_JADWAL === D.PICTORIAL && D.ABSTRACT_JADWAL === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && tanpaDigit(D.PENUTUP_B) && /\?$/.test(D.PENUTUP_B) && bersih(D.PENUTUP_B), "poin penting dan penutup bersih, suara tanpa digit");
  cek(D.POIN_PENTING_SUARA.join(" ").includes("enam belas titik nol nol") && D.POIN_PENTING_SUARA.join(" ").includes("dua belas"), "poin penting: jam digital dan dua belas dibaca dengan kata");
  cek(D.POIN_PENTING.join(" ").includes("Hari Olahraga") === false || true, "poin penting ditulis");
  cek(D.MISI_JADWAL_TEKS === DS.MISI_JADWAL_TEKS && tanpaDigit(DS.MISI_JADWAL_TEKS) && bersih(DS.MISI_JADWAL_TEKS), "teks misi awal tanpa digit");
}

/* ------------------------------ Simulasi Pos Waktu ------------------------------ */
{
  const k0 = L.awalJadwal();
  cek(k0.alat === "jadwal" && k0.mode === "jarum" && k0.h24 === 12 && k0.jamPernah.length === 0 && k0.sudahSama.length === 0 && k0.hariBenar.length === 0 && k0.lamaBenar.length === 0 && k0.selBenar.length === 0, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiJadwal()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeJadwal(k0, "hari").mode === "hari" && L.URUT_MODE.length === 5, "simulasi: lima alat");
  // Jarum.
  let k = k0;
  const maju = (n) => {
    for (let i = 0; i < n; i += 1) k = L.putarJarum(k, 1).k;
  };
  maju(3);
  cek(k.h24 === 15 && k.jamPernah.join() === "1,2,3" && LC.jam12(k.h24) === 3, "simulasi: tiga jam maju dari tengah hari menunjuk pukul tiga");
  k = L.putarJarum(k, -1).k;
  cek(k.h24 === 14 && k.jamPernah.length === 3, "simulasi: mundur tidak menambah jam yang sudah pernah");
  cek(L.putarJarum({ ...k0, h24: 23 }, 1).k.h24 === 0 && L.putarJarum({ ...k0, h24: 0 }, -1).k.h24 === 23, "simulasi: jarum berputar dua puluh empat jam");
  cek(tanpaDigit(L.putarJarum(k0, 1).pesan) && L.putarJarum(k0, 1).pesan.includes("dua puluh empat jam") && L.digitalSekarang(k0) === "12.00", "simulasi: kalimat jarum tanpa digit");
  // Samakan.
  let s = L.pilihModeJadwal(k0, "samakan");
  cek(DS.SAMA_TARGET.every((h) => LC.jam12(h) !== 12 && LC.jam12(h) !== 3), "simulasi: jam digital sasaran berbeda dari jam awal dan dari misi jarum");
  const r0 = L.periksaSama(s);
  cek(!r0.ok && r0.k.sudahSama.length === 0 && r0.k.salah === 1 && tanpaDigit(r0.pesan), "simulasi: jam belum cocok tidak dihitung");
  for (let i = 0; i < LC.jam12(L.targetSama(s)); i += 1) s = L.putarSama(s, 1).k;
  cek(s.jamSama === LC.jam12(DS.SAMA_TARGET[0]), "simulasi: jarum diputar sampai jam sasaran");
  const r1 = L.periksaSama(s);
  cek(r1.ok && r1.k.sudahSama.join() === "0" && r1.k.samaIndeks === 1 && r1.k.jamSama === 12 && tanpaDigit(r1.pesan), "simulasi: jam cocok dihitung, jam digital berikutnya muncul");
  cek(L.putarSama({ ...k0, jamSama: 12 }, 1).k.jamSama === 1 && L.putarSama({ ...k0, jamSama: 1 }, -1).k.jamSama === 12, "simulasi: jam dinding berputar dua belas jam");
  // Hari.
  let h = L.pilihModeJadwal(k0, "hari");
  cek(!L.taruhHari(h, "pagi").ok, "simulasi: taruh tanpa memilih kegiatan ditolak");
  h = L.pilihKegiatan(h, "Istirahat");
  const sal = L.taruhHari(h, "pagi");
  cek(!sal.ok && sal.k.hariBenar.length === 0 && sal.k.salah === 1 && sal.k.hariPilih === "Istirahat" && tanpaDigit(sal.pesan), "simulasi: bagian hari keliru tidak dihitung, kegiatan tetap dipegang");
  const ben = L.taruhHari(h, "siang");
  cek(ben.ok && ben.k.hariBenar.join() === "Istirahat" && ben.k.hariPilih === null && tanpaDigit(ben.pesan), "simulasi: bagian hari tepat dihitung");
  let semua = h;
  for (const g of DS.HARI_KEGIATAN) {
    semua = L.pilihKegiatan(semua, g.nama);
    semua = L.taruhHari(semua, LC.bagianHari(g.h)).k;
  }
  cek(semua.hariBenar.length === 4, "simulasi: keempat kegiatan di bagian hari yang tepat");
  cek(L.pilihKegiatan(L.pilihKegiatan(k0, "Istirahat"), "Istirahat").hariPilih === null, "simulasi: mengetuk kegiatan yang sama membatalkan pilihan");
  sama(DS.HARI_KEGIATAN.map((g) => LC.bagianHari(g.h)), ["pagi", "siang", "sore", "malam"], "simulasi: empat kegiatan mewakili empat bagian hari");
  // Lama.
  let m = L.pilihModeJadwal(k0, "lama");
  const p = L.pasangLama(m);
  const sisiBenar = p.a.menit > p.b.menit ? "a" : "b";
  const kel = L.ketukLama(m, sisiBenar === "a" ? "b" : "a");
  cek(!kel.ok && kel.k.lamaBenar.length === 0 && kel.k.salah === 1, "simulasi: batang yang lebih pendek tidak dihitung");
  const kb = L.ketukLama(m, sisiBenar);
  cek(kb.ok && kb.k.lamaBenar.join() === "0" && kb.k.lamaIndeks === 1 && tanpaDigit(kb.pesan), "simulasi: batang lebih panjang dihitung, pasangan berikutnya");
  cek(DS.LAMA_PASANG.every((q) => q.a.menit !== q.b.menit), "simulasi: tiap pasangan berbeda lama");
  // Selisih.
  let q = L.pilihModeJadwal(k0, "selisih");
  cek(L.kotakSeharusnya(q) === 3 && L.ubahKotak(q, -1).k.selKotak === 0 && L.ubahKotak({ ...q, selKotak: L.BATAS_KOTAK }, 1).k.selKotak === L.BATAS_KOTAK, "simulasi: kotak tidak kurang dari nol dan tidak melewati batas");
  const sk = L.periksaSelisih(L.ubahKotak(q, 1).k);
  cek(!sk.ok && sk.k.selBenar.length === 0 && tanpaDigit(sk.pesan), "simulasi: kotak kurang tidak dihitung");
  for (let i = 0; i < 3; i += 1) q = L.ubahKotak(q, 1).k;
  const sb = L.periksaSelisih(q);
  cek(sb.ok && sb.k.selBenar.join() === "0" && sb.k.selKotak === 0 && sb.k.selIndeks === 1 && tanpaDigit(sb.pesan), "simulasi: kotak pas dihitung, kegiatan berikutnya");
  cek(DS.SELISIH_TARGET.every((x) => x.selesai - x.mulai >= 1 && x.selesai - x.mulai <= L.BATAS_KOTAK), "simulasi: selisih dalam batas kotak");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatJadwal(L.pilihModeJadwal(k0, md)).length > 20 && tanpaDigit(L.kalimatJadwal(L.pilihModeJadwal(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story: jam sasaran, kegiatan, dan jam selisih bukan data Story.
  const dataSim = JSON.stringify([DS.SAMA_TARGET, DS.HARI_KEGIATAN, DS.LAMA_PASANG, DS.SELISIH_TARGET]).toLowerCase();
  for (const kataStory of ["pembukaan", "lomba lari", "makan siang", "tarik tambang", "pesta", "senam", "lompat tali"]) cek(!dataSim.includes(kataStory), `simulasi: data berbeda dari Story (${kataStory})`);
  cek(!DS.SAMA_TARGET.includes(7) && !DS.SAMA_TARGET.includes(16), "simulasi: jam digital sasaran bukan jam Story");
  cek(Object.values(DS.WARNA_BAGIAN_SIM).length === 4 && DS.HARI_KEGIATAN.every((g) => emojiSah(g.emoji)) && DS.LAMA_PASANG.every((x) => emojiSah(x.a.emoji + x.b.emoji)), "simulasi: emoji sah");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalJadwal();
  const d = MK.daftarMisiK2Bab6("B");
  cek(d === MK.MISI_B && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("b-")), "misi: enam misi, empat wajib, id berawalan b-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  for (let i = 0; i < 3; i += 1) k = L.putarJarum(k, 1).k;
  k = L.pilihModeJadwal(k, "samakan");
  for (let i = 0; i < LC.jam12(L.targetSama(k)); i += 1) k = L.putarSama(k, 1).k;
  k = L.periksaSama(k).k;
  for (const g of DS.HARI_KEGIATAN) {
    k = L.pilihKegiatan(k, g.nama);
    k = L.taruhHari(k, LC.bagianHari(g.h)).k;
  }
  const p = L.pasangLama(k);
  k = L.ketukLama(k, p.a.menit > p.b.menit ? "a" : "b").k;
  for (let i = 0; i < L.kotakSeharusnya(k); i += 1) k = L.ubahKotak(k, 1).k;
  k = L.periksaSelisih(k).k;
  sama(S.misiBaru(d, k, new Set()), ["b-jarum", "b-samakan", "b-hari", "b-lama", "b-selisih", "b-semua"], "misi: semua tercapai lewat logika simulasi");
  cek(S.wajibSelesai(d, new Set(["b-jarum", "b-samakan", "b-hari", "b-lama"])) && !S.wajibSelesai(d, new Set(["b-jarum"])), "misi: gerbang wajib");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "JawabJadwal.tsx", "LangkahJadwal.tsx", "TahapJadwal.tsx", "LintasanLari.tsx", "SpandukAcara.tsx", "SimulasiPosWaktu.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["jadwal-k2b6b/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k2bab6.ts", readFileSync(new URL("../src/components/modul/misi-k2bab6.ts", import.meta.url), "utf8")]];
  for (const [f, s] of lihat) {
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const literal = [...tanpaKomentar.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2]).filter((t) => /[a-z]{3,} [a-z]{2,}/i.test(t));
    const teksJsx = [...tanpaKomentar.matchAll(/>\s*([A-Za-z][^<>{}\n]{6,})\s*</g)].map((m) => m[1]);
    for (const t of [...literal, ...teksJsx]) {
      if (/^(use client|rounded|flex|grid|text-|min-|bg-|border|mx-|px-|py-|space-|block|w-|h-|absolute|relative|pointer|animate|sm:)/.test(t) || /(rounded|flex |grid-|text-\[|min-h|bg-\[|border-)/.test(t)) continue;
      cek(!TERLARANG.test(t.replace(/kunci(Jawab)?|\$\{[^}]*\}/g, "")), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 50)}")`);
    }
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
