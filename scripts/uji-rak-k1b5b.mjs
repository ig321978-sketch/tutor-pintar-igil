// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab B ("Rak Akuarium Bernomor"), lanjutan Akuarium Ikan Hias Abang.
// Memeriksa: pompa udara dengan selang aerator (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), catatan tutup kaleng pakan dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, sepuluh angka jawaban tidak kembar per tahap dan berbeda
// dari Story, batas rupa (Concrete hewan air, Pictorial kotak polos, Abstract kata dan angka), tata letak kanvas, simulasi rak akuarium dan usulan misinya,
// emoji dan akhir baris.
// Misi Sub-Bab B ada di misi-bab5.ts (MISI_B); tab di SimulasiBab5.tsx.
// Jalankan: node --no-warnings scripts/uji-rak-k1b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/rak-k1b5b/logika.ts");
const D = await import("../src/components/modul/rak-k1b5b/data.ts");
const K = await import("../src/components/modul/rak-k1b5b/periksa.ts");
const M = await import("../src/components/modul/misi-bab5.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|kali|bagi|dikali|dibagi)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);

/* ------------------------------ Dasar ------------------------------ */
{
  sama(L.deret(8, 11), [8, 9, 10, 11], "deret maju");
  sama(L.deret(12, 9), [12, 11, 10, 9], "deret mundur");
  sama([L.arahDeret(3, 7), L.arahDeret(7, 3)], ["maju", "mundur"], "arah deret");
  sama([L.akhirLompat({ dari: 3, langkah: 4, arah: "maju" }), L.akhirLompat({ dari: 11, langkah: 5, arah: "mundur" })], [7, 6], "akhir lompat");
  sama(["atas", "bawah", "kiri", "kanan"].map((p) => L.kotakPetunjuk(9, p)), [-1, 19, 8, 10], "kotak petunjuk kisi");
  sama([L.kotakTetangga("sebelum"), L.kotakTetangga("antara"), L.kotakTetangga("sesudah")], [0, 1, 2], "kotak tetangga");
  sama(L.tetanggaDari({ n: 5, tanya: "antara" }), [4, null, 6], "isi kotak di antara");
  sama(L.rentangLompat({ dari: 0, langkah: 6, arah: "maju" }), [0, 7], "rentang lompat dari nol");
  sama(L.rentangLompat({ dari: 16, langkah: 3, arah: "maju" }), [15, 20], "rentang lompat sampai dua puluh");
  sama(L.pilihanDari({ tipe: "tetangga", n: 1, tanya: "sebelum", jenis: "titik" }), [0, 1, 2], "pilihan untuk nol");
}

/* ------------------------------ Mind-map pompa udara ------------------------------ */
{
  const t = D.TEMPAT_AERATOR;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "aerator: tiga masalah, tujuh katup, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && tanpaDigit(x.kunci)), "aerator: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "aerator: katup bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["hitung maju", "hitung mundur", "sebelum dan sesudah", "di antara", "hilang", "lompat di garis bilangan", "kisi bilangan"]) cek(gab.includes(k), `aerator: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["makin besar", "makin kecil", "tambah sepuluh", "tepat sekali"]) cek(hasil.includes(k), `aerator: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(ikan|cupang|akuarium|rak|pakan|lampu|igil|kaka|abang|mamah)\b/i.test(x.kunci)), "aerator: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci)), "aerator: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_AERATOR + D.PETUNJUK_URUT_AERATOR) && !TERLARANG.test(D.SUARA_AERATOR), "aerator: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 53);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "aerator: katup hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis tutup kaleng pakan ------------------------------ */
{
  const b = D.BARIS_KALENG;
  sama(b.length, 5, "kaleng: lima baris");
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama([angka(b[0].petunjuk), angka(b[0].hasil), b[0].cara], [[8], [15], "hitung maju"], "kaleng: pakan maju dari delapan sampai lima belas");
  sama([angka(b[1].petunjuk), angka(b[1].hasil), b[1].cara], [[20], [12], "hitung mundur"], "kaleng: lampu mundur dari dua puluh sampai dua belas");
  sama([angka(b[2].petunjuk), angka(b[2].hasil)], [[14, 16], [15]], "kaleng: di antara empat belas dan enam belas");
  cek(angka(b[2].hasil)[0] === (angka(b[2].petunjuk)[0] + angka(b[2].petunjuk)[1]) / 2, "kaleng: di antara dihitung dari tetangga");
  sama([angka(b[3].petunjuk), angka(b[3].hasil)], [[12, 14, 16, 18], [13, 17]], "kaleng: nomor hilang tiga belas dan tujuh belas");
  cek(angka(b[3].hasil).every((h, i) => h === angka(b[3].petunjuk)[2 * i] + 1 && h === angka(b[3].petunjuk)[2 * i + 1] - 1), "kaleng: nomor hilang dihitung dari tetangganya");
  sama([angka(b[4].petunjuk), angka(b[4].hasil)], [[1, 10], [11, 20]], "kaleng: kisi atas dan bawah");
  cek(angka(b[4].hasil).every((h, i) => h === angka(b[4].petunjuk)[i] + 10) && /sepuluh/.test(b[4].cara), "kaleng: kisi bawah tambah sepuluh");
  const s8 = L.deret(8, 15);
  cek(s8.length === 8 && L.deret(20, 12).length === 9, "kaleng: deret Story utuh");
  sama(D.TEMPAT_KALENG.length, 15, "kaleng: lima belas kotak");
  cek(new Set(D.TEMPAT_KALENG.map((x) => x.kunci)).size === 15, "kaleng: label unik");
  cek(D.TEMPAT_KALENG.every((x) => x.kunci.length <= 20) && tanpaDigit(D.SUARA_KALENG) && !TERLARANG.test(D.SUARA_KALENG), "kaleng: label pendek, suara tanpa digit");
  cek(Object.keys(D.KELOMPOK_KALENG).every((k) => D.TEMPAT_KALENG.some((x) => x.kelompok === k)) && D.KOLOM_KALENG.length === 3, "kaleng: tiga kolom");
}

/* ------------------------------ CPA ------------------------------ */
// Story: pakan delapan sampai lima belas, lampu dua puluh sampai dua belas, hilang tiga belas dan tujuh belas, lima belas di antara empat belas dan enam belas.
const STORY = new Set([8, 12, 13, 14, 15, 16, 17, 20]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Lapak Ikan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 20 && !STORY.has(n)), `${nama}: angka nol sampai dua puluh, berbeda dari Story (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 3, `${nama}: ada belasan dan satuan`);
  const arahDipakai = new Set();
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    // Batas rupa.
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: hewan ${l.jenis} punya gambar dan warna`);
    else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    if (l.tipe === "urut") {
      const d = L.deret(l.dari, l.ke);
      cek(d.length >= 5 && d.length <= 8 && d.every((n) => n >= 0 && n <= 20), `${nama}: deret lima sampai delapan nomor`);
      if (l.jawab === "arah") {
        sama(k, null, `${nama}: kunci arah tanpa angka`);
        cek(x.cara !== "suara", `${nama}: arah bukan untuk suara`);
        arahDipakai.add(L.arahDeret(l.dari, l.ke));
      } else {
        cek(d.slice(1, -1).includes(l.hilang), `${nama}: nomor hilang di tengah deret`);
        sama(k, l.hilang, `${nama}: kunci nomor hilang`);
        const i = d.indexOf(l.hilang);
        cek(d[i - 1] + d[i + 1] === 2 * l.hilang, `${nama}: nomor hilang di antara tetangganya`);
      }
    }
    if (l.tipe === "lompat") {
      const akhir = l.dari + (l.arah === "maju" ? l.langkah : -l.langkah);
      sama(k, akhir, `${nama}: kunci lompat dihitung ulang`);
      cek(l.langkah >= 2 && l.langkah <= 7 && akhir >= 0 && akhir <= 20, `${nama}: lompat dua sampai tujuh langkah`);
      const [a, b] = L.rentangLompat(l);
      cek(b - a + 1 <= 10 && a <= Math.min(l.dari, akhir) && b >= Math.max(l.dari, akhir), `${nama}: rentang lompat muat sepuluh tempat`);
      let p = l.dari;
      for (let i = 0; i < l.langkah; i += 1) p = L.lompatBerikut(p, l.arah);
      sama(p, k, `${nama}: lompat satu-satu sampai kunci`);
    }
    if (l.tipe === "kisi") {
      sama(k, l.kosong, `${nama}: kunci kisi`);
      const h = L.kotakPetunjuk(l.kosong, l.petunjuk);
      cek(h >= 1 && h <= 20, `${nama}: kotak petunjuk di dalam kisi (${l.kosong} ${l.petunjuk})`);
      if (l.petunjuk === "kiri" || l.petunjuk === "kanan") cek((h <= 10) === (l.kosong <= 10), `${nama}: petunjuk kiri atau kanan sebaris`);
      if (l.petunjuk === "atas") sama(l.kosong, h + 10, `${nama}: bawah tambah sepuluh`);
    }
    if (l.tipe === "tetangga") {
      sama(k, { sebelum: l.n - 1, sesudah: l.n + 1, antara: l.n }[l.tanya], `${nama}: kunci tetangga dihitung ulang`);
      cek(k >= 0 && k <= 20 && L.tetanggaDari(l).every((v) => v === null || (v >= 0 && v <= 20)), `${nama}: tetangga nol sampai dua puluh`);
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  // Cari kesalahan: tokoh sudah menjawab salah, anak memutuskan lalu memilih alasan.
  const cariSalah = semua.filter((x) => x.langkah.tipe === "cari");
  cek(cariSalah.length >= 1, `${nama}: ada soal Cari kesalahan`);
  for (const x of cariSalah) {
    const c = x.langkah;
    cek(["Igil", "Kaka", "Abang"].includes(c.tokoh) && c.klaim.includes(c.tokoh), `${nama} cari: tokoh yang menjawab`);
    cek(c.klaimAngka !== c.kunci && c.klaim.includes(String(c.klaimAngka)) && !c.klaim.match(/\d+/g).includes(String(c.kunci)), `${nama} cari: jawaban tokoh salah (${c.klaimAngka} bukan ${c.kunci})`);
    cek(c.alasan.length === 3 && new Set(c.alasan.map((a) => a.teks)).size === 3 && [0, 1, 2].includes(c.benar), `${nama} cari: tiga alasan berbeda`);
    cek(c.alasan[c.benar].teks.includes(String(c.kunci)), `${nama} cari: alasan benar memuat kunci`);
    cek(c.alasan.every((a, i) => i === c.benar || (a.tunjuk.length >= 20 && !a.teks.match(/\d+/g)?.includes(String(c.kunci)) )), `${nama} cari: alasan salah berpetunjuk dan tidak memuat kunci`);
    cek(c.tunjuk.length >= 20 && c.tunjuk.includes(String(c.klaimAngka)), `${nama} cari: petunjuk menunjuk kesalahan tokoh`);
    cek(c.alasan.some((a, i) => i !== c.benar && a.tunjuk.includes(c.tokoh)), `${nama} cari: ada petunjuk yang menyebut kesalahan tokoh`);
    cek(c.visual.length <= 8 && (rupa === "lambang" ? c.visual.length === 0 : c.visual.length >= 3), `${nama} cari: gambar sesuai rupa`);
    cek(c.nyala >= -1 && c.nyala < c.visual.length, `${nama} cari: kotak menyala di dalam gambar`);
    cek(!TERLARANG.test(c.kisah + c.klaim + c.tunjuk + c.alasan.map((a) => a.teks + a.tunjuk).join(" ")), `${nama} cari: teks bersih`);
    cek(tanpaDigit(L.ucapAngka(c.kisah + c.klaim + c.tunjuk + c.alasan.map((a) => a.teks + a.tunjuk).join(" "))), `${nama} cari: ucapan tanpa digit`);
    cek(x.cara === "klik", `${nama} cari: ada di kelompok Klik`);
  }
  sama([...arahDipakai].sort(), ["maju", "mundur"], `${nama}: soal arah memuat maju dan mundur`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal arah di Klik dan Kanvas`);
  sama(new Set(semua.filter((x) => x.langkah.tipe === "tetangga").map((x) => x.langkah.tanya)).size, 3, `${nama}: sebelum, sesudah, dan di antara`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["maju", "mundur", "sesudah", "sebelum", "di antara", "hilang", "tambah sepuluh"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_RAK === D.CONCRETE && D.PICTORIAL_RAK === D.PICTORIAL && D.ABSTRACT_RAK === D.ABSTRACT && D.TEMA_RAK === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (let n = 5; n <= 8; n += 1)
    for (let i = 0; i < n; i += 1) {
      const p = K.letakUrut(i, n);
      cek(p.x - K.KARTU_URUT.w / 2 >= 0 && p.x + K.KARTU_URUT.w / 2 <= W && p.y - K.KARTU_URUT.h / 2 >= 30, `urut ${i}/${n} masuk kanvas`);
      if (i > 0) cek(p.x - K.letakUrut(i - 1, n).x >= K.KARTU_URUT.w + 2, `urut ${i}/${n} tidak bertumpuk`);
    }
  for (let i = 0; i < 2; i += 1) {
    const p = K.letakArah(i);
    cek(p.x - K.LEBAR_ARAH / 2 >= 0 && p.x + K.LEBAR_ARAH / 2 <= W && p.y - 16 > K.letakUrut(0, 8).y + K.KARTU_URUT.h / 2 && p.y + 16 <= H, `kartu arah ${i} di bawah deret`);
  }
  cek(K.letakArah(1).x - K.letakArah(0).x > K.LEBAR_ARAH, "kartu arah tidak bertumpuk");
  for (let n = 3; n <= 10; n += 1)
    for (let i = 0; i < n; i += 1) {
      const p = K.letakLompat(i, n);
      cek(p.x - 13 >= 0 && p.x + 13 <= W && p.y + 30 <= H, `lompat ${i}/${n} masuk kanvas`);
      if (i > 0) cek(p.x - K.letakLompat(i - 1, n).x >= 26, `lompat ${i}/${n} berjarak untuk tanda`);
    }
  for (let n = 1; n <= 20; n += 1) {
    const p = K.letakKisi(n);
    cek(p.x - K.SEL_KISI.w / 2 >= 0 && p.x + K.SEL_KISI.w / 2 <= W && p.y - K.SEL_KISI.h / 2 >= 30 && p.y + K.SEL_KISI.h / 2 <= H - 20, `kisi ${n} masuk kanvas`);
    if (n % 10 !== 1) cek(p.x - K.letakKisi(n - 1).x >= K.SEL_KISI.w, `kisi ${n} tidak bertumpuk`);
  }
  sama([K.letakKisi(4).x, K.letakKisi(14).x], [K.letakKisi(14).x, K.letakKisi(4).x], "kisi: sebelas sampai dua puluh tepat di bawah satu sampai sepuluh");
  cek(K.letakKisi(14).y - K.letakKisi(4).y >= K.SEL_KISI.h, "kisi: dua baris tidak bertumpuk");
  for (let i = 0; i < 3; i += 1) {
    const p = K.letakTetangga(i);
    cek(p.x - K.KOTAK_TETANGGA / 2 >= 0 && p.x + K.KOTAK_TETANGGA / 2 <= W && p.y + K.KOTAK_TETANGGA / 2 <= H, `kotak tetangga ${i} masuk kanvas`);
    if (i > 0) cek(p.x - K.letakTetangga(i - 1).x > K.KOTAK_TETANGGA, `kotak tetangga ${i} tidak bertumpuk`);
  }
  const coret = (p) => [{ x: p.x - 5, y: p.y - 5 }, { x: p.x + 5, y: p.y + 5 }];
  // Kisi: tanda di kotak kosong diterima, tanda di kotak sebelahnya ditolak.
  const kosong = K.letakKisi(9);
  cek(K.periksaCentang([coret(kosong)], [kosong], 14).benar, "kisi: tanda di kotak kosong diterima");
  cek(!K.periksaCentang([coret(K.letakKisi(10))], [kosong], 14).benar, "kisi: tanda di kotak sebelah ditolak");
  // Lompat: tanda di tiap tempat mendarat.
  const tempat = [1, 2, 3, 4, 5, 6].map((i) => K.letakLompat(i, 8));
  cek(K.periksaCentang(tempat.map(coret), tempat, 13).benar, "lompat: tanda di enam tempat mendarat diterima");
  cek(!K.periksaCentang(tempat.slice(0, 5).map(coret), tempat, 13).benar, "lompat: kurang satu tanda ditolak");
  cek(!K.periksaCentang([...tempat.map(coret), coret(K.letakLompat(0, 8))], tempat, 13).benar, "lompat: tanda di tempat mulai ditolak");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const deret = Array.from({ length: 7 }, (_, i) => K.letakUrut(i, 7));
  cek(K.periksaLingkari([lingkar(deret[3], 17, 26)], deret, deret.map((_, i) => i === 3)).benar, "urut: lingkari satu kartu hilang diterima");
  cek(!K.periksaLingkari([lingkar(deret[3], 40, 26)], deret, deret.map((_, i) => i === 3)).benar, "urut: lingkaran ikut tetangga ditolak");
  const arah = [0, 1].map(K.letakArah);
  cek(K.periksaLingkari([lingkar(arah[1], 50, 22)], arah, [false, true]).benar, "urut: lingkari kata mundur diterima");
  const tg = [0, 1, 2].map(K.letakTetangga);
  cek(K.periksaCentang([coret(tg[0])], [tg[0]], 30).benar && !K.periksaCentang([coret(tg[1])], [tg[0]], 30).benar, "tetangga: tanda hanya di kotak yang dicari");
  // Pengenal ucapan sampai dua puluh dari Sub-Bab A.
  for (const n of [0, 1, 7, 11, 18, 19]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi rak akuarium dan usulan misi ------------------------------ */
{
  const H = D.HILANG_SIM;
  sama([...H], [...M.HILANG_RAK_B], "rak: label jatuh sama dengan misi");
  cek(H.every((n) => !STORY.has(n) && n >= 1 && n <= 20) && H.some((n) => n <= 10) && H.some((n) => n > 10), "rak: label jatuh berbeda dari Story, satu di tiap tingkat");
  cek(tanpaDigit(D.MISI_RAK) && !TERLARANG.test(D.MISI_RAK), "rak: teks misi tanpa digit");
  let k = L.awalRak(H);
  sama([k.alat, k.posisi, k.awal, k.terbaikMaju, k.pakan.length, k.label["9"], k.tetangga, k.kisi, k.turun], ["rak", 1, 1, 0, 21, null, false, false, 0], "rak: awal");
  sama(L.langkah(k, "mundur").posisi, 1, "rak: tidak mundur dari ujung kiri");
  k = L.mulaiDari(k, 3);
  for (let i = 0; i < 4; i += 1) k = L.langkah(k, "maju");
  sama([k.posisi, k.beruntun, k.terbaikMaju], [7, 4, 4], "rak: maju empat langkah dari tiga");
  k = L.langkah(k, "mundur");
  sama([k.posisi, k.beruntun, k.terbaikMaju, k.terbaikMundur], [6, 1, 4, 1], "rak: berbalik arah memulai hitungan baru");
  k = L.mulaiDari(k, 20);
  sama(L.langkah(k, "maju").posisi, 20, "rak: tidak maju dari ujung kanan");
  k = L.pindahTingkat(L.mulaiDari(k, 4));
  sama([k.posisi, k.turun], [14, 1], "rak: turun tambah sepuluh");
  k = L.pindahTingkat(k);
  sama([k.posisi, k.turun], [4, 1], "rak: naik kurang sepuluh");
  k = L.beriPakan(L.beriPakan(k));
  sama([L.sudahPakan(k), L.pakanDobel(k)], [1, [4]], "rak: pakan dobel tercatat");
  sama(L.sudahPakan(L.ulangPakan(k)), 0, "rak: ulang pakan");
  k = L.geserLabel(k, 9, 1);
  sama(k.label["9"], 10, "rak: label mulai dari sepuluh");
  k = L.geserLabel(k, 9, -1);
  sama([k.label["9"], L.labelTepatRak(k)], [9, 1], "rak: label sembilan tepat");
  sama(L.geserLabel(k, 5, 1), k, "rak: label yang tidak jatuh tidak berubah");
  for (let n = 1; n <= 20; n += 1) {
    const x = L.nyalakan(L.mulaiDari(L.awalRak(H), n), "tetangga");
    cek(tanpaDigit(L.kalimatRak(x)) && !TERLARANG.test(L.kalimatRak(x)), `rak: kalimat ${n} tanpa digit`);
  }

  const daftar = M.daftarMisiBab5("B");
  cek(daftar === M.MISI_B, "misi B: daftar Sub-Bab B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalRak(H);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("b-")), "misi B: id unik berawalan b-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi B: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi B: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "ikan" })), "misi B: keadaan alat lain tidak memenuhi");
  cek(daftar.every((x) => !x.cek({ alat: "deret", awal: 18, n: 20, maju: 9, mundur: 9, sembunyi: true, tetangga: true, kisi: true })), "misi B: alat deret lama tidak memenuhi");
  const jalan = (st, arah, n) => {
    for (let i = 0; i < n; i += 1) st = L.langkah(st, arah);
    return st;
  };
  cek(ada(jalan(L.mulaiDari(awal, 4), "maju", 5), "b-maju") && !ada(jalan(L.mulaiDari(awal, 4), "maju", 4), "b-maju"), "misi B: maju lima langkah");
  cek(!ada(jalan(L.langkah(jalan(awal, "maju", 3), "mundur"), "maju", 2), "b-maju"), "misi B: maju harus berturut-turut");
  cek(ada(jalan(L.mulaiDari(awal, 11), "mundur", 5), "b-mundur") && !ada(jalan(L.mulaiDari(awal, 11), "mundur", 4), "b-mundur"), "misi B: mundur lima langkah");
  let lb = awal;
  for (const n of H) for (let i = 0; i < Math.abs(n - 10) + 1; i += 1) lb = L.geserLabel(lb, n, n >= 10 ? 1 : -1);
  sama(H.map((n) => lb.label[String(n)]), [...H], "rak: dua label dipasang");
  cek(ada(lb, "b-label") && !ada(L.geserLabel(lb, H[1], 1), "b-label"), "misi B: dua label tepat");
  let pk = awal;
  for (let n = 1; n <= 20; n += 1) pk = L.beriPakan(n === 1 ? pk : L.langkah(pk, "maju"));
  sama(L.sudahPakan(pk), 20, "rak: dua puluh akuarium diberi pakan");
  cek(ada(pk, "b-pakan") && !ada(L.beriPakan(pk), "b-pakan") && !ada(L.beriPakan(awal), "b-pakan"), "misi B: pakan tepat sekali, tidak terlewat");
  cek(ada(L.nyalakan(L.mulaiDari(awal, 19), "tetangga"), "b-tetangga") && !ada(L.mulaiDari(awal, 19), "b-tetangga") && !ada(L.nyalakan(L.mulaiDari(awal, 18), "tetangga"), "b-tetangga"), "misi B: tetangga sembilan belas");
  cek(ada(L.pindahTingkat(L.nyalakan(awal, "kisi")), "b-kisi") && !ada(L.pindahTingkat(awal), "b-kisi") && !ada(L.pindahTingkat(L.nyalakan(L.mulaiDari(awal, 15), "kisi")), "b-kisi"), "misi B: turun satu tingkat di kisi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/rak-k1b5b/", import.meta.url);
  const berkas = readdirSync(folder);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahRak.tsx", "TahapRak.tsx", "PipaAerator.tsx", "TutupKalengPakan.tsx", "SimulasiRakAkuarium.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapRak.tsx", folder), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap), "TahapRak: Abstract diakhiri Poin Penting");
  for (const f of ["LangkahRak.tsx", "TahapRak.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folder), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahRak.tsx", folder), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !readdirSync(folder).includes("Jawab20.tsx"), "LangkahRak: Jawab20 dipakai ulang lewat impor, tidak disalin");
  const sim = readFileSync(new URL("SimulasiRakAkuarium.tsx", folder), "utf8");
  cek(/onKeadaan/.test(sim) && /awalRak/.test(sim), "SimulasiRakAkuarium: melaporkan keadaan rak");
}

{
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab5.tsx", import.meta.url), "utf8");
  cek(/B: "Misi Lapak Ikan[^"\d]*"/.test(ms), "SimulasiBab5: teks misi B tanpa digit");
  cek(ms.includes("SimulasiRakAkuarium") && /huruf === "B" \? \[rakAkuarium\]/.test(ms), "SimulasiBab5: tab Sub-Bab B memakai rak akuarium");
  for (const f of ["misi-bab5.ts", "SimulasiBab5.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

{ const sl = readFileSync(new URL("../src/components/modul/rak-k1b5b/LangkahRak.tsx", import.meta.url), "utf8"); cek(sl.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(sl) && sl.includes("onBenar={(t) => jawab(n, \"\", t)}"), "rak-k1b5b/LangkahRak: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar."); }
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
